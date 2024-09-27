import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchQuizById, useGlobal } from '../contexts/GlobalContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
function TakeQuiz() {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  const { submitQuiz } = useGlobal();
  const { data: quiz, isLoading, isError } = useFetchQuizById(quizId);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); // State to track if quiz has been submitted

  if (isLoading) return <div className="text-center">Loading quiz...</div>;
  if (isError) return <div className="text-center">Error loading quiz.</div>;
  if (!quiz) return <div className="text-center">Quiz not found.</div>;

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (hasSubmitted) {
      toast.error("You have already submitted this quiz.");
      return;
    }

    const submission = { quizId, answers };
    const result = await submitQuiz(submission);

    if (result) {
      setResult(result);
      setHasSubmitted(true); // Set submitted state to true
      toast.success("Quiz submitted successfully!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const questionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
    className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="px-8 py-12 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
        <motion.h1 
          className="text-4xl font-extrabold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {quiz.title}
        </motion.h1>
        <motion.p 
          className="text-white text-opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Good luck on your quiz!
        </motion.p>
      </div>
      <div className="p-8">
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {quiz.questions.map((question, qIndex) => (
              <motion.div
                key={qIndex}
                className="bg-gray-50 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg"
                variants={questionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * qIndex }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{question.text}</h3>
                <div className="space-y-3">
                  {question.choices.map((choice, cIndex) => (
                    <motion.label
                      key={cIndex}
                      className="flex items-center space-x-3 p-3 bg-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-indigo-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={cIndex}
                        checked={answers[qIndex] === cIndex}
                        onChange={() => handleAnswerChange(qIndex, cIndex)}
                        className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        required
                      />
                      <span className="text-gray-700 text-lg">{choice}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            ))}
            <div className="flex justify-center">
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Quiz
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.div 
            className="text-center bg-gray-50 rounded-xl shadow-md p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Result</h2>
            <motion.p 
              className="text-4xl font-bold mb-2 text-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {result.score} / {result.totalQuestions}
            </motion.p>
            <p className="text-2xl mb-6 text-gray-600">Score: {result.percentage}%</p>
            <motion.div 
              className="w-full bg-gray-200 rounded-full h-2.5 mb-6"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.div 
                className="bg-indigo-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${result.percentage}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              ></motion.div>
            </motion.div>
            <motion.button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-8 py-3 rounded-lg hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Quizzes
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  </motion.div>
  );
}

export default TakeQuiz;
