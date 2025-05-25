import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    static async register(req: Request, res: Response): Promise<void> {
        const user = await AuthService.register(req.body);
        res.json(user);
    }

    static async login(req: Request, res: Response): Promise<void> {
        const token = await AuthService.login(req.body);
        res.json({ token });
    }
}