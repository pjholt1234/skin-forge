import Factory from './Factory';

class ItemFactory extends Factory {
    constructor(
        private store: boolean = false,
        private marketName?: string | null,
        private marketId?: string| null,
        private price?: number| null,
        private type?: string| null,
        private imageUrl?: string| null,
        private inspectUrl?: string| null,
    ) {
        super(true);
    }

    protected fakeParameters(): void {
        this.marketId = this.faker.number.int({ min: 1000000, max: 9999999 }).toString();

        if(!this.price) {
            this.price = this.faker.number.float({ min: 0.03, max: 100, multipleOf: 0.01 });
        }

        if(!this.type) {
            this.type = this.faker.helpers.arrayElement(['Sticker', 'Nova', 'MP9', 'AK-47']);
        }

        if(!this.imageUrl) {
            this.imageUrl = this.faker.image.url();
        }

        if(!this.inspectUrl) {
            this.inspectUrl = this.faker.image.url();
        }

        if(!this.marketName) {
            this.marketName = this.getMarketName();
        }
    }

    private getMarketName(): string
    {
        return `${this.type} | ${this.faker.commerce.productName()} (${this.getItemCondition()})`;
    }

    private getItemCondition(): string
    {
        return this.faker.helpers.arrayElement(['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred']);
    }

    public async create(count: number = 1): Promise<any[]>
    {
        if(count === 1) {
            return await this.createItem();
        }

        const items: any[] = [];

        for (let i = 0; i < count; i++) {
            items.push(await this.createItem());
        }

        return items;
    }

    private async createItem(): Promise<any>
    {
        this.fakeParameters();

        const data = {
            market_name: this.marketName,
            market_id: this.marketId,
            price: this.price,
            type: this.type,
            image_url: this.imageUrl,
            inspect_url: this.inspectUrl,
        };

        if(!this.store) {
            return data;
        }

        return await this.prisma.item.create({data});

    }
}

export default ItemFactory;