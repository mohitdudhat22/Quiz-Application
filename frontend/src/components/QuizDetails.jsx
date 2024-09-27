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
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-700 mb-6">{quiz.description}</p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
        >
          Update Quiz
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Delete Quiz
        </button>
      </div>
      <Link
        to={`/take/${id}`}
        className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Take This Quiz
      </Link>
    </div>
  );
}

export default QuizDetails;
