import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <AuthProvider>
      <GlobalProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
      </GlobalProvider>
        </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
