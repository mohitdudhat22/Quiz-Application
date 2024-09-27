import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/api';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch Quizzes
  const { data: quizzes, isLoading: quizzesLoading, isError: quizzesError } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => apiService.getQuizzes(1, 10),
    onError: (error) => console.error('Error fetching quizzes:', error),
  });



  // Create Quiz Mutation
  const createQuizMutation = useMutation({
    mutationFn: apiService.createQuiz,
    onSuccess: (newQuiz) => {
      queryClient.setQueryData(['quizzes'], (oldQuizzes) => [...oldQuizzes, newQuiz]);
    },
    onError: (error) => console.error('Error creating quiz:', error),
  });

  const createQuiz = (quizData) => createQuizMutation.mutate(quizData);

  // Update Quiz Mutation
  const updateQuizMutation = useMutation({
    mutationFn: ({ quizId, quizData }) => apiService.updateQuiz(quizId, quizData),
    onSuccess: () => queryClient.invalidateQueries(['quizzes']),
    onError: (error) => console.error('Error updating quiz:', error),
  });

  const updateQuiz = (quizId, quizData) => updateQuizMutation.mutate({ quizId, quizData });

  // Delete Quiz Mutation
  const deleteQuizMutation = useMutation({
    mutationFn: apiService.deleteQuiz,
    onSuccess: () => queryClient.invalidateQueries(['quizzes']),
    onError: (error) => console.error('Error deleting quiz:', error),
  });

  const deleteQuiz = (quizId) => deleteQuizMutation.mutate(quizId);

  // Submit Quiz Mutation
  const submitQuizMutation = useMutation({
    mutationFn: apiService.submitQuiz,
    onSuccess: () => queryClient.invalidateQueries(['quizzes']),
    onError: (error) => console.error('Error submitting quiz:', error),
  });

  const submitQuiz = async (submissionData) => {
    const result = await submitQuizMutation.mutateAsync(submissionData);
    return result.data;
  };
  

  return (
    <GlobalContext.Provider
      value={{
        quizzes,
        quizzesLoading,
        quizzesError,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        submitQuiz,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
export const useFetchQuizById = (quizId) => {
  return useQuery({
    queryKey: ['quizId', quizId],
    queryFn: () => apiService.getQuizById(quizId),
    onError: (error) => console.error('Error fetching quiz:', error),
    enabled: !!quizId,
  });
};