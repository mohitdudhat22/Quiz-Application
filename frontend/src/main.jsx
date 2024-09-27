import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './contexts/GlobalContext'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <GlobalProvider>
    <AuthProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
    </GlobalProvider>
      </BrowserRouter>
      </QueryClientProvider>
  </StrictMode>,
)
