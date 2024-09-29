<div>
  <h1>Quiz App</h1>

  <p>
    This is a scalable and well-structured quiz app built with the MERN stack, featuring essential functionalities for creating, managing, and participating in quizzes.
  </p>

  <h2>Features</h2>
  <ul>
    <li>User Authentication (Registration and Login)</li>
    <li>Role-Based Access Control (Admin and User roles)</li>
    <li>JWT Authentication</li>
    <li>Input Validation</li>
    <li>Centralized Error Handling</li>
    <li>API Documentation with Swagger</li>
    <li>Frontend with React and Vite</li>
    <li>State Management with Context API</li>
    <li>Protected Routes and Role-Based UI</li>
    <li>API Integration with Axios</li>
    <li>Styling with Tailwind CSS</li>
    <li>Testing with Jest and React Testing Library</li>
    <li>Deployment to Heroku and Vercel</li>
    <li>CI/CD with GitHub Actions</li>
  </ul>

  <h2>Project Structure</h2>

  <h3>Backend</h3>
  <p>
    The backend is built using Node.js, Express, and MongoDB, following a modular approach with separate routes, controllers, and services.
  </p>

  <h4>Directory Structure</h4>
  <pre>
    backend/
      config/: Configuration files
      controllers/: Route handlers
      models/: MongoDB models for quizzes, questions, and users
      routes/: API routes for quizzes and users
      services/: Business logic related to quiz functionalities
      utils/: Helper functions
      index.js: Entry point
      package.json: Dependencies and scripts
  </pre>

  <h4>Configuration</h4>
  <pre>
    config/dbConnect.js: Connects to MongoDB
    config/constants.js: Stores constants like database name and JWT secret
  </pre>

  <h3>Frontend</h3>
  <p>
    The frontend is built using React and Vite, utilizing the Context API for state management and Axios for API requests.
  </p>

  <h4>Directory Structure</h4>
  <pre>
    frontend/
      public/: Static assets
      src/
        components/: Reusable UI components (Quiz, Question, etc.)
        context/: Context API for managing quiz state
        pages/: Page components (Home, Quiz, Results, etc.)
        App.js: Main application component
        index.js: Entry point
        package.json: Dependencies and scripts
  </pre>

  <h4>Configuration</h4>
  <pre>
    frontend/vite.config.js: Vite configuration
    frontend/public/index.html: HTML template
  </pre>

  <h2>Deployment</h2>

  <h3>Backend</h3>
  <p>
    Deployed on Heroku
    <br />
    Repository: <a href="https://github.com/your-username/backend-repo">Backend</a>
  </p>

  <h3>Frontend</h3>
  <p>
    Deployed on Vercel
    <br />
    Repository: <a href="https://github.com/your-username/frontend-repo">Frontend</a>
  </p>

  <h2>CI/CD</h2>
  <p>CI/CD with GitHub Actions</p>

  <h2>Getting Started</h2>

  <h3>Backend</h3>
  <ol>
    <li>Install dependencies:
      <pre>cd backend
npm install</pre>
    </li>
    <li>Start the server:
      <pre>npm start</pre>
    </li>
  </ol>

  <h3>Frontend</h3>
  <ol>
    <li>Install dependencies:
      <pre>cd frontend
npm install</pre>
    </li>
    <li>Start the development server:
      <pre>npm run dev</pre>
    </li>
  </ol>

  <h2>Contributing</h2>
  <p>
    We welcome contributions to this project! Please read our <a href="CONTRIBUTING.md">contributing guidelines</a> for more details.
  </p>

  <h2>License</h2>
  <p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for more details.</p>
</div>
