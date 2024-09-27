import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
function QuizDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, quizzesLoading, quizzesError, deleteQuiz, updateQuiz } = useGlobal();

  // Handle loading state
  if (quizzesLoading) return <div className="text-center">Loading quizzes...</div>;

  // Handle error state
  if (quizzesError) return <div className="text-center">Error loading quizzes. Please try again.</div>;

  // Find the quiz by ID
  const quiz = quizzes.find(q => q._id === id);

  // Handle case where quiz is not found
  if (!quiz) return <div className="text-center">Quiz not found.</div>;

  // Function to handle delete action
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (confirmDelete) {
      try {
        await deleteQuiz(quiz._id);
        toast.success('Quiz deleted successfully!');
        navigate('/quizzes'); // Redirect to quizzes list after deletion
      } catch (error) {
        toast.error('Error deleting quiz. Please try again.');
      }
    }
  };

  // Function to handle update action (you can redirect to an update form or modal)
  const handleUpdate = () => {
    navigate(`/create/${quiz._id}`); // Assuming there's an edit route for the quiz
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };
  return (
    <motion.div
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="px-8 py-12 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <motion.h1
            className="text-4xl font-extrabold text-white mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            {quiz.title}
          </motion.h1>
          <motion.p
            className="text-white text-opacity-90 text-lg leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {quiz.description}
          </motion.p>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update Quiz
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Quiz
            </motion.button>
          </div>
          <motion.div
            className="inline-block"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/take/${id}`}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
            >
              Take This Quiz
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default QuizDetails;
