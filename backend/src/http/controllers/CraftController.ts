import ControllerInterface from "./ControllerInterface";
import {PrismaClient} from "@prisma/client";

export default class CraftController implements ControllerInterface {
    public static async stickers(req: any, res: any) {
        const prisma = new PrismaClient();
        console.log('Fetching stickers...');
        try {
            const stickers = await prisma.items.findMany({
                where: {
                    type: 'Sticker',
                },
            });
            res.status(200).send(stickers);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error.');
        }
    }
}