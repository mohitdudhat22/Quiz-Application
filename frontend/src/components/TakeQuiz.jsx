import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchQuizById, useGlobal } from '../contexts/GlobalContext';
import { toast } from 'react-hot-toast';

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

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
              {question.choices.map((choice, cIndex) => (
                <div key={cIndex} className="mb-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value={cIndex}
                      checked={answers[qIndex] === cIndex}
                      onChange={() => handleAnswerChange(qIndex, cIndex)}
                      className="form-radio"
                      required
                    />
                    <span>{choice}</span>
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Submit Quiz
          </button>
        </form>
      ) : (
        <div className="text-center bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold mb-4">Quiz Result</h2>
          <p className="text-2xl mb-2">Your score: {result.score} / {result.totalQuestions}</p>
          <p className="text-xl mb-4">Percentage: {result.percentage}%</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
}

export default TakeQuiz;
