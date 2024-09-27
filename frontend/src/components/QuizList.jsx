import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import { motion } from 'framer-motion';
function QuizList() {
  const { quizzes, quizzesLoading, quizzesError, deleteQuiz } = useGlobal();

  if (quizzesLoading) return <div className="text-center">Loading quizzes...</div>;
  if (quizzesError) return <div className="text-center text-red-500">Error loading quizzes.</div>;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
    className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 text-center">
        Available Quizzes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <motion.div
            key={quiz._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-200"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h2>
              <p className="text-gray-600 mb-8 line-clamp-3">{quiz.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150 ease-in-out"
                >
                  View Details
                </Link>
                <Link
                  to={`/take/${quiz._id}`}
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
                >
                  Take Quiz
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
              <motion.button
                onClick={() => deleteQuiz(quiz._id)}
                className="text-red-500 hover:text-red-700 font-medium transition duration-150 ease-in-out"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete Quiz
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
  );
}

export default QuizList;