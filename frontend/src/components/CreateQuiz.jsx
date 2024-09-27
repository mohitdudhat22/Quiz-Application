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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Update Quiz' : 'Create New Quiz'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Question {qIndex + 1}</h3>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Question text"
              required
            />
            {question.choices.map((choice, cIndex) => (
              <div key={cIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(qIndex, cIndex, e.target.value)}
                  className="flex-grow p-2 border rounded mr-2"
                  placeholder={`Choice ${cIndex + 1}`}
                  required
                />
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={question.correctAnswer === cIndex}
                  onChange={() => handleQuestionChange(qIndex, 'correctAnswer', cIndex)}
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Question
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {id ? 'Update Quiz' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
}

export default CreateQuiz;
