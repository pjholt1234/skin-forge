import createPrismaMock from "prisma-mock";
import DatabaseService from "../../src/services/DatabaseService";
import UserFactory from "../../src/factories/UserFactory";

describe('fetchData', () => {
    let prisma: any;

    beforeEach(async () => {
        prisma = DatabaseService.getInstance(createPrismaMock()).getClient();
    });

    it('Successfully creates a new users and retrieves record with mock client', async () => {
        const user = new UserFactory().create();

        const data = prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        expect(data).toBeDefined();
        expect(data.email).toEqual(user.email);
        expect(data.name).toEqual(user.name);
        expect(data.password).toEqual(user.password);
    });
});
