import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">Quiz App</Link>
          <div>
            <Link to="/" className="mr-4 hover:text-blue-200">Home</Link>
            <Link to="/create" className="mr-4 hover:text-blue-200">Create Quiz</Link>
            <Link to="/login" className="mr-4 hover:text-blue-200">Login</Link>
            <Link to="/register" className="hover:text-blue-200">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
