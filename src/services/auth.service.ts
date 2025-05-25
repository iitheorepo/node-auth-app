import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class AuthService {
    static async register(data: { email: string; password: string }) {
        const repo = AppDataSource.getRepository(User);
        const hashed = await bcyrpt.hash(data.password, 10);
        const user = repo.create({ email: data.email, password: hashed });
        await repo.save(user);
        return user;
    }

    static async login(data: { email: string; password: string }) {
        const repo = AppDataSource.getRepository(User);
        const user = await repo.findOneBy({ email: data.email });
        if (!user || !(await bcyrpt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }
        return jwt.sign({id: user.id}, process.env.JWT_SECRET!, {expiresIn: '1h'})
    }
}