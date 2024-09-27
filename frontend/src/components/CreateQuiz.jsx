import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchQuizById, useGlobal } from '../contexts/GlobalContext';
import { motion } from "framer-motion";
function CreateQuiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createQuiz, updateQuiz } = useGlobal();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [{ text: '', choices: ['', '', '', ''], correctAnswer: 0 }]
  });

  const { data: existingQuiz, isLoading, isError } = useFetchQuizById(id);
  // Fetch existing quiz data if updating
  useEffect(() => {
    if (existingQuiz) {
      setQuiz(existingQuiz);
    }
  }, [existingQuiz]);

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].choices[choiceIndex] = value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, { text: '', choices: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      // Update existing quiz
      await updateQuiz(id, quiz);
    } else {
      // Create new quiz
      await createQuiz(quiz);
    }
    navigate('/'); // Redirect after submit
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const questionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
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
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          {id ? 'Update Quiz' : 'Create New Quiz'}
        </motion.h1>
        <motion.p 
          className="text-white text-opacity-90"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          Craft your perfect quiz!
        </motion.p>
      </div>
      <div className="p-8">
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
              <motion.h3 
                className="text-xl font-semibold mb-4 text-gray-800"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * qIndex + 0.2 }}
              >
                Question {qIndex + 1}
              </motion.h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition duration-150 ease-in-out"
                  placeholder="Question text"
                  required
                />
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
                      checked={question.correctAnswer === cIndex}
                      onChange={() => handleQuestionChange(qIndex, 'correctAnswer', cIndex)}
                      className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      required
                    />
                    <motion.span className="text-gray-700 text-lg">{choice}</motion.span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="flex justify-between">
            <motion.button 
              type="button" 
              onClick={addQuestion} 
              className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-6 py-3 rounded-lg hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Question
            </motion.button>
            <motion.button 
              type="submit" 
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {id ? 'Update Quiz' : 'Create Quiz'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  </motion.div>

  );
}

export default CreateQuiz;
