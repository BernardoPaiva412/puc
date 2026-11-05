import express, { Request, Response } from 'express';

import { prisma } from '@puc/storage';

import bcrypt from 'bcrypt'

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.post('/register', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'We need you to have a username and a password in order to allow you to create your PUC.' })
    }

    try {
        const isUsernameUnique = await prisma.card.findUnique({ where: { username } })

        if (isUsernameUnique) {
            return res.status(400).json({ error: 'We need you to have a unique username in order to allow you to create your PUC and this username is already in use.' })
        }

        const saltRounds = 10

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newCard = await prisma.card.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        return res.status(201).json({
            id: newCard.id,
            username: newCard.username
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' });
    }
});

app.post('/identification', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body

    try {
        const card = await prisma.card.findUnique({ where: { username } })

        const isPasswordCorrect = await bcrypt.compare(password, username.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Incorret password. This isn\'t you, is it?' })
        }
        
        return res.status(200).json({ message: 'You\'re welcome, sir!' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' })
    }
})

app.get('/status', async (req: Request, res: Response) => {
    return res.status(200).json({
        status: "'OK!' from TypeScript.",
        dBSystem_conected: !!prisma
    })
})

app.listen(PORT, () => {
    console.log(`App Server Node running on the port http://localhost:${PORT}!`)
});
