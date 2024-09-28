import express from 'express';
const router = express.Router();
import { createQuiz, deleteQuiz, getQuizById, getQuizzes, submitQuiz, updateQuiz } from '../controller/quizController.js';
import authorize from '../middlewares/roleMiddleware.js';

router.post('/quizzes', authorize('admin'), createQuiz);
router.get('/quizzes',authorize('user', 'admin'), getQuizzes);
router.get('/quizzes/:id',authorize('user', 'admin'), getQuizById);
router.put('/quizzes/:id',authorize('admin'), updateQuiz);
router.delete('/quizzes/:id',authorize('admin'), deleteQuiz);
router.post('/quizzes/submit',authorize('user', 'admin'), submitQuiz);

export default router;