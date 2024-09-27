import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobal } from '../contexts/GlobalContext';
import toast from 'react-hot-toast';

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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="px-8 py-12 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <h1 className="text-4xl font-extrabold text-white mb-4">{quiz.title}</h1>
          <p className="text-white text-opacity-90 text-lg leading-relaxed">{quiz.description}</p>
        </div>
        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleUpdate}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
            >
              Update Quiz
            </button>
            <button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
            >
              Delete Quiz
            </button>
          </div>
          <Link
            to={`/take/${id}`}
            className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-lg"
          >
            Take This Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizDetails;
