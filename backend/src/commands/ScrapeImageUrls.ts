import puppeteer from 'puppeteer';

class CsMoneyImageScraper {
    public itemName: string;
    private urlPrefix: string = 'https://wiki.cs.money/weapons';

    constructor(itemName: string) {
        this.itemName = itemName;
    }

    public async scrape(): Promise<string | null> {
        try {
            const url = this.buildUrl();

            if (!url) {
                return null;
            }

            return await this.scrapePage(url);
        } catch (error) {
            console.error('Error scraping page:', error);
            return;
        }
    }

    private async scrapePage(url): Promise<string | null> {
        // Launch headless browser
        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2", });

        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        const imageUrl = await page.evaluate(() => {
            const imgs = document.getElementsByTagName('img');

            for (let i = 0; i < imgs.length; i++) {
                if(imgs[i].src.includes('preview')){
                    return imgs[i].src;
                }
            }

            return null;
        });

        await browser.close();

        return imageUrl;
    }

    private buildUrl() {
        const regex = /^([^|]+) \| ([^(]+)/;
        const matches = this.itemName.match(regex);

        if (!matches) {
            return null;
        }

        const gunName = matches[1].trim();
        const finishName = matches[2].trim();

        const gunNameSlug = gunName.toLowerCase().replace(' ', '-');
        const finishNameSlug = finishName.toLowerCase().replace(' ', '-');

        return `${this.urlPrefix}/${gunNameSlug}/${finishNameSlug}`;
    }
}

export default CsMoneyImageScraper;