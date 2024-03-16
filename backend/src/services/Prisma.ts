import { PrismaClient } from '@prisma/client';

class Prisma {
    public static Prisma: PrismaClient;

    static instance() {
        this.Prisma ||= new PrismaClient();
        return this.Prisma;
    }
}

export default Prisma;