import Factory from './Factory';
import bcrypt from "bcrypt";

class UserFactory extends Factory {
    private passwordHashed: string = '';
    constructor(
        private email?: string | null,
        private name?: string | null,
        private password?: string | null,
    ) {
        super(true);
    }

    protected fakeParameters(): void {
        this.email = this.email || this.faker.internet.email();
        this.name = this.name || this.faker.person.firstName();
        this.password = this.password || this.faker.internet.password();
        this.passwordHashed = this.generatePassword(this.password);
    }

    public create(count: number = 1): any | any[]
    {
        const users: any[] = [];

        if(count === 1) {
            return this.createItem();
        }

        for (let i = 0; i < count; i++) {
            users.push(this.createItem());
        }

        return users;
    }

    private createItem(): Promise<any>
    {
        this.fakeParameters();

        return this.prisma.user.create({
            data: {
                email: this.email,
                name: this.name,
                password: this.passwordHashed,
            },
        })
        .then((item: any) => {
            return item;
        })
    }

    private generatePassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }
}

export default UserFactory;