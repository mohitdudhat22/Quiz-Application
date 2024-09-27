import express from 'express';
const router = express.Router();
import { createQuiz, deleteQuiz, getQuizById, getQuizzes, submitQuiz, updateQuiz } from '../controller/quizController.js';

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);
router.post('/quizzes/submit', submitQuiz);

export default router;