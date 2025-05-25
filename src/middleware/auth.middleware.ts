import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = payload;
        next();
    } catch {
        res.status(401).json({message: 'Invalid token'});
    }
}