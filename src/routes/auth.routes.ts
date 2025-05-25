import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import express from 'express';

const router = Router();

const meHandler = async (req: express.Request, res: express.Response): Promise<void> => {
    res.json({ message: 'Protected Route Accessed' });
}

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, meHandler);

export default router;