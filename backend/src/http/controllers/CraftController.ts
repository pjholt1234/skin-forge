import ControllerInterface from "./ControllerInterface";
import DatabaseService from "../../services/DatabaseService";

export default class CraftController implements ControllerInterface {
    public static async stickers(req: any, res: any) {
        const prisma = DatabaseService.getInstance().getClient();
        console.log('Fetching stickers...');

        try {
            const stickers = await prisma.item.findMany({
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

    public static async weapons(req: any, res: any) {
        const prisma = DatabaseService.getInstance().getClient();;
        console.log('Fetching weapons...');

        try {
            const stickers = await prisma.item.findMany({
                where: {
                    NOT: {
                        type: 'Sticker',
                    }
                },
            });

            res.status(200).send(stickers);
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error.');
        }
    }
}