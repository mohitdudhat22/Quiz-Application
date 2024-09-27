import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000', // Fallback to localhost
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = {
  // Auth
  login: (userData) => api.post('/api/auth/login', userData),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
  fetchUser: () => api.get('/api/users/profile'),

  // Quizzes
  createQuiz: (quizData) => api.post('/api/quizzes', quizData),
  getQuizzes: (page = 1, limit = 10) => api.get(`/api/quizzes?page=${page}&limit=${limit}`).then((res) => res.data.docs),
  getQuizById: (quizId) => api.get(`/api/quizzes/${quizId}`).then((res) => res.data),
  updateQuiz: (quizId, quizData) => api.put(`/api/quizzes/${quizId}`, quizData),
  deleteQuiz: (quizId) => api.delete(`/api/quizzes/${quizId}`),
  submitQuiz: (submissionData) => api.post('/api/quizzes/submit', submissionData),
};

export default apiService;
