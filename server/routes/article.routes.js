import express from 'express';
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle, addComment } from '../controllers/article.controllers.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/:id', getArticleById);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.post('/:id/comments', addComment);

export default router;
