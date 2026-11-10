import { Router } from 'express';
import { getAllPosts, createPost, updatePost, deletePost } from '../controllers/blogController';
import { checkAuth } from '../middlewares/auth';

const router = Router();

// Rotas Públicas
router.get('/posts/public', getAllPosts);

// Rotas Privadas
router.use(checkAuth);

router.get('/posts/private', getAllPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;