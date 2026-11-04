import express, { Request, Response } from 'express';
import { prisma, User } from '@puc/storage';

const app = express();
app.use(express.json());

app.post('/users', async (req: Request, res: Response) => {
    const { email, name } = req.body;

    try {
        const newUser: User = await prisma.user.create({
            data: { email, name },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Não foi possível criar o usuário.' });
    }
});

app.listen(3000, () => console.log('Server rodando na porta 3000'));
