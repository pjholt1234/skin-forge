import ControllerInterface from "./ControllerInterface";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController implements ControllerInterface {
    public static async login(req: any, res: any) {

        const prisma = new PrismaClient();

        const { email, password } = req.body as { email: string, password: string };

        try {
            const user = await prisma.user.findUnique({
                where: {email},
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (password === null || user.password === null) {
                throw new Error('Password cannot be null');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id }, 'secret');
            res.status(200).send({token})

        } catch (error) {
            res.status(403).send('Authentication failed.');
        }
    }
}