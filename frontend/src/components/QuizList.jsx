import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';

function QuizList() {
  const { quizzes, quizzesLoading, quizzesError, deleteQuiz } = useGlobal();

  if (quizzesLoading) return <div className="text-center">Loading quizzes...</div>;
  if (quizzesError) return <div className="text-center text-red-500">Error loading quizzes.</div>;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between">
              <Link to={`/quiz/${quiz._id}`} className="text-blue-600 hover:underline">View Details</Link>
              <Link to={`/take/${quiz._id}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Take Quiz</Link>
            </div>
            <button 
              onClick={() => deleteQuiz(quiz._id)} 
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Delete Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;