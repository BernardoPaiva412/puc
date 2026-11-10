import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Faça login para continuar.' });
    }

    if (token === 'valid-token') {
        next();
    } else {
        return res.status(403).json({ error: 'Token inválido. Acesso negado.' });
    }
};