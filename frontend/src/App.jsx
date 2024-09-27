import {Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuizList from './components/QuizList';
import CreateQuiz from './components/CreateQuiz';
import QuizDetails from './components/QuizDetails';
import TakeQuiz from './components/TakeQuiz';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
      <>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="w-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<QuizList />} />
              <Route path="/create" element={<CreateQuiz />} />
              <Route path="/create/:id" element={<CreateQuiz />} />
              <Route path="/quiz/:id" element={<QuizDetails />} />
              <Route path="/take/:id" element={<TakeQuiz />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </>
  );
}

export default App;
