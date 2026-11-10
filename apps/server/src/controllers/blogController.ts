import { Request, Response } from 'express';

export const getAllPosts = (req: Request, res: Response) => {
    res.json({ message: 'Retornando lista de posts.' });
};

export const createPost = (req: Request, res: Response) => {
    const { title, content, isPublic } = req.body;
    res.status(201).json({ 
        message: 'Post criado com sucesso!', 
        post: { title, content, isPublic } 
    });
};

export const updatePost = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `Post com ID ${id} atualizado com sucesso.` });
};

export const deletePost = (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ message: `Post com ID ${id} deletado com sucesso.` });
};