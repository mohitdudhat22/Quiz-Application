import Quiz from '../models/quizModel.js';

// Create a new quiz
export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;
    const newQuiz = new Quiz({ title, description, questions });
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    next(error);
  }
};

// Get all quizzes (with pagination)
export const getQuizzes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }
    };

    const aggregate = Quiz.aggregate([
      { $project: { title: 1, description: 1 } }
    ]);

    const quizzes = await Quiz.aggregatePaginate(aggregate, options);
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

// Get a specific quiz by ID
export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

// Update a quiz
export const updateQuiz = async (req, res, next) => {
  try {
    const { title, description, questions } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { title, description, questions },
      { new: true, runValidators: true }
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(updatedQuiz);
  } catch (error) {
    next(error);
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res, next) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Submit a quiz (calculate score)
export const submitQuiz = async (req, res, next) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({ message: 'Invalid number of answers' });
    }

    let score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (answers[i] === quiz.questions[i].correctAnswer) {
        score++;
      }
    }

    const percentage = (score / quiz.questions.length) * 100;

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage: percentage.toFixed(2)
    });
  } catch (error) {
    next(error);
  }
};