import axios, {AxiosResponse} from "axios";
import importEnv from "../ImportEnv";
import {PrismaClient} from "@prisma/client";
import itemTypes from "../data/itemTypes";
import CsMoneyImageScraper from "./ScrapeImageUrls";

class UpdateItems {

    public enableScrape: boolean = true;

    private prisma: PrismaClient;
    constructor() {
        importEnv();
        console.log('Command start');

        this.prisma = new PrismaClient();
        this.run();
    }

    private async run() {
        const response = await this.fetchItems()
            .catch((error: any) => {
                console.error('Error fetching items:', error);
                return;
            });

        if (!response) {
            return;
        }

        const limit = 1000;

        for (const item of response.data.slice(0, limit)) {
            if ((item.market_name.includes('Sticker |') || item.market_name.includes('Factory New')) && !item.market_name.includes('StatTrak™')) {
                await this.updateItem(item);
                await this.getInspectUrl(item);
            }
        }
    }

    private async fetchItems(): Promise<any> {
        const endpoint = `https://api.steamapis.com/market/items/730?api_key=${process.env.STEAM_API_KEY}`;

        try {
            const response: AxiosResponse = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error('Error fetching market items:', error);
            throw error;
        }
    }

    private async updateItem(item: any) {
        let dbItem = await this.prisma.item.findUnique({
            where: {
                market_id: item.nameID,
            },
        });

        if (dbItem) {
            console.log('Updating item:', item.nameID, item.market_hash_name);

            await this.prisma.item.update({
                where: {
                    market_id: item.nameID,
                },
                data: {
                    market_name: item.market_name,
                    market_id: item.nameID,
                    price: item.prices.avg,
                    type: this.getType(item.market_hash_name),
                    image_url: item.image,
                },
            });

            return;
        }

        const type = this.getType(item.market_hash_name);

        if (!type) {
            return;
        }

        console.log('Create item:', item.nameID, item.market_hash_name);

        await this.prisma.item.create({
            data: {
                market_name: item.market_name,
                market_id: item.nameID,
                price: item.prices.avg,
                type: type,
                image_url: item.image,
            },
        });
    }

    private async getInspectUrl(item) {
        if(!this.enableScrape) {
            return;
        }

        if(this.getType(item.market_hash_name) === 'Sticker') {
            return;
        }

        let inspectUrl = null;

        const scraper = new CsMoneyImageScraper(item.market_name);
        await scraper.scrape()
            .then((imageUrl: string | null) => {
                if (imageUrl) {
                    inspectUrl = imageUrl;
                }
            });

        if(!inspectUrl) {
            console.log('Failed to scrape inspect url for: ', item.market_name);
            return;
        }

        console.log('Scraped inspect url for: ', item.market_name);

        await this.prisma.item.update({
            where: {
                market_id: item.nameID,
            },
            data: {
                inspect_url: inspectUrl,
            },
        });
    }

    private getType(name: string): string | null
    {
        let type = null;

        itemTypes.forEach((itemType) => {
            if (name.includes(itemType + ' |')) {
                type = itemType;
            }
        });

        return type;
    }
}

new UpdateItems();