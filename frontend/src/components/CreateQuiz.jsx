import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchQuizById, useGlobal } from '../contexts/GlobalContext';

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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
      <div className="px-8 py-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          {id ? 'Update Quiz' : 'Create New Quiz'}
        </h1>
        <p className="text-white text-opacity-90">Craft your perfect quiz!</p>
      </div>
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            rows="4"
            required
          />
        </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="border border-gray-200 p-6 rounded-xl bg-gray-50 shadow-md transition-all duration-300 hover:shadow-lg">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Question {qIndex + 1}</h3>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4 transition duration-150 ease-in-out"
              placeholder="Question text"
              required
            />
            {question.choices.map((choice, cIndex) => (
              <div key={cIndex} className="flex items-center mb-3">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                  className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mr-3 transition duration-150 ease-in-out"
                  placeholder={`Choice ${cIndex + 1}`}
                  required
                />
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`correct-${qIndex}-${cIndex}`}
                    name={`correct-${qIndex}`}
                    checked={question.correctAnswer === cIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctAnswer', cIndex)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 transition duration-150 ease-in-out"
                    required
                  />
                  <label htmlFor={`correct-${qIndex}-${cIndex}`} className="ml-2 text-sm text-gray-600">
                    Correct
                  </label>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={addQuestion} 
            className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white px-6 py-3 rounded-lg hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            Add Question
          </button>
          <button 
            type="submit" 
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
          >
            {id ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  </div>

  );
}

export default CreateQuiz;
