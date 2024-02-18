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
            
            const now = new Date();
            const data = { 
                userId: user.id, 
                email: user.email,
                exp: now.setDate(now.getDate() + 7),
                issuer: process.env.APP_NAME,
            };

            console.log(data);

            const token = jwt.sign(data, JSON.stringify(process.env.JWT_SECRET));
            return res.status(200).send({token});

        } catch (error) {
            console.log(error);
            res.status(403).send('Authentication failed.');
        }
    }

    public static async register(req: any, res: any) {
        const prisma = new PrismaClient();

        const { email, password, name } = req.body as { email: string, password: string, name: string };

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            res.status(200).send(user);
        } catch (error) {
            console.log(error);
            res.status(403).send('Registration failed.');
        }
    }
}