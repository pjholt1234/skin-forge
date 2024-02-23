import axios, {AxiosResponse} from "axios";
import importEnv from "../ImportEnv";
import {PrismaClient} from "@prisma/client";
import itemTypes from "../data/itemTypes";
class UpdateItems {

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

        response.data.map((item: any) => {
            this.updateItem(item);
        });
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
        const dbItem = await this.prisma.item.findUnique({
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