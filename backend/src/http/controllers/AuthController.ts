import ControllerInterface from "./ControllerInterface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DatabaseService from "../../services/DatabaseService";

export default class AuthController implements ControllerInterface {
    public static async login(req: any, res: any) {
        const prisma = DatabaseService.getInstance().getClient();

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

            const token = jwt.sign(data, JSON.stringify(process.env.JWT_SECRET));
            return res.status(200).send({token});

        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    }

    public static async register(req: any, res: any) {
        const prisma = DatabaseService.getInstance().getClient();

        const { email, password, name } = req.body as { email: string, password: string, name: string };
        
        const validEmail = String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        
        if (!validEmail) {
            res.status(400).send({ email: 'Invalid email' });
            return;
        }
        
        if (name.length < 4) {
            res.status(400).send({name: 'Username must be at least 4 characters long'});
            return;
        }

        if (password.length < 8) {
            res.status(400).send({password: 'Password must be at least 8 characters long'});
            return;
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                  },
            });

            if (user) {
                return res.status(400).send({ email: 'Email already exists.' })
            }
        } catch (error) {
            console.log(error);
            res.status(400).send('Registration failed.');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 8);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
            });

            res.status(200).send(user);
        } catch (error) {
            res.status(400).send('Registration failed.');
        }
    }
}