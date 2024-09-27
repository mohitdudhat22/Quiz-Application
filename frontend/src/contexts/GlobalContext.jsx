import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../services/api';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch Courses
  const { data: courses, isLoading: coursesLoading, isError: coursesError } = useQuery(
    ['courses'],
    apiService.fetchCourses,
    { onError: (error) => console.error('Error fetching courses:', error) }
  );

  // Create Course Mutation
  const createCourseMutation = useMutation(apiService.createCourse, {
    onSuccess: (newCourse) => {
      queryClient.setQueryData(['courses'], (oldCourses) => [...oldCourses, newCourse]);
    },
    onError: (error) => console.error('Error creating course:', error),
  });

  const createCourse = (courseData) => createCourseMutation.mutate(courseData);

  // Update Course Mutation
  const updateCourseMutation = useMutation(({ courseId, courseData }) => apiService.updateCourse(courseId, courseData), {
    onSuccess: () => queryClient.invalidateQueries(['courses']),
    onError: (error) => console.error('Error updating course:', error),
  });

  const updateCourse = (courseId, courseData) => updateCourseMutation.mutate({ courseId, courseData });

  // Delete Course Mutation
  const deleteCourseMutation = useMutation(apiService.deleteCourse, {
    onSuccess: (courseId) => queryClient.invalidateQueries(['courses']),
    onError: (error) => console.error('Error deleting course:', error),
  });

  const deleteCourse = (courseId) => deleteCourseMutation.mutate(courseId);

  // Fetch Assignments
  const { data: assignments, isLoading: assignmentsLoading, isError: assignmentsError } = useQuery(
    ['assignments'],
    apiService.fetchAssignments,
    { onError: (error) => console.error('Error fetching assignments:', error) }
  );

  // Create Assignment Mutation
  const createAssignmentMutation = useMutation(apiService.createAssignment, {
    onSuccess: (newAssignment) => {
      queryClient.setQueryData(['assignments'], (oldAssignments) => [...oldAssignments, newAssignment]);
    },
    onError: (error) => console.error('Error creating assignment:', error),
  });

  const createAssignment = (assignmentData) => createAssignmentMutation.mutate(assignmentData);

  // Update Assignment Mutation
  const updateAssignmentMutation = useMutation(({ assignmentId, assignmentData }) =>
    apiService.updateAssignment(assignmentId, assignmentData), {
    onSuccess: () => queryClient.invalidateQueries(['assignments']),
    onError: (error) => console.error('Error updating assignment:', error),
  });

  const updateAssignment = (assignmentId, assignmentData) => updateAssignmentMutation.mutate({ assignmentId, assignmentData });

  // Delete Assignment Mutation
  const deleteAssignmentMutation = useMutation(apiService.deleteAssignment, {
    onSuccess: (assignmentId) => queryClient.invalidateQueries(['assignments']),
    onError: (error) => console.error('Error deleting assignment:', error),
  });

  const deleteAssignment = (assignmentId) => deleteAssignmentMutation.mutate(assignmentId);

  // Fetch Submissions
  const { data: submissions, isLoading: submissionsLoading, isError: submissionsError } = useQuery(
    ['submissions'],
    apiService.fetchSubmissions,
    { onError: (error) => console.error('Error fetching submissions:', error) }
  );

  // Submit Assignment Mutation
  const submitAssignmentMutation = useMutation(apiService.submitAssignment, {
    onSuccess: (newSubmission) => {
      queryClient.setQueryData(['submissions'], (oldSubmissions) => [...oldSubmissions, newSubmission]);
    },
    onError: (error) => console.error('Error submitting assignment:', error),
  });

  const submitAssignment = (submissionData) => submitAssignmentMutation.mutate(submissionData);

  // Grade Submission Mutation
  const gradeSubmissionMutation = useMutation(({ submissionId, gradeData }) =>
    apiService.gradeSubmission(submissionId, gradeData), {
    onSuccess: () => queryClient.invalidateQueries(['submissions']),
    onError: (error) => console.error('Error grading submission:', error),
  });

  const gradeSubmission = (submissionId, gradeData) => gradeSubmissionMutation.mutate({ submissionId, gradeData });

  // Fetch Analytics
  const fetchAnalytics = async (key, fetchFunction) => {
    try {
      const response = await fetchFunction();
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      throw error;
    }
  };

  const { data: courseCompletionRates } = useQuery(
    ['courseCompletionRates'],
    () => fetchAnalytics('courseCompletionRates', apiService.fetchCourseCompletionRates)
  );

  const { data: averageGradesPerCourse } = useQuery(
    ['averageGradesPerCourse'],
    () => fetchAnalytics('averageGradesPerCourse', apiService.fetchAverageGradesPerCourse)
  );

  const { data: studentsPerTeacher } = useQuery(
    ['studentsPerTeacher'],
    () => fetchAnalytics('studentsPerTeacher', apiService.fetchStudentsPerTeacher)
  );

  const { data: assignmentSubmissionRate } = useQuery(
    ['assignmentSubmissionRate'],
    () => fetchAnalytics('assignmentSubmissionRate', apiService.fetchAssignmentSubmissionRate)
  );

  const { data: topPerformingStudents } = useQuery(
    ['topPerformingStudents'],
    () => fetchAnalytics('topPerformingStudents', apiService.fetchTopPerformingStudents)
  );

  const { data: coursePopularity } = useQuery(
    ['coursePopularity'],
    () => fetchAnalytics('coursePopularity', apiService.fetchCoursePopularity)
  );

  return (
    <GlobalContext.Provider
      value={{
        courses,
        coursesLoading,
        coursesError,
        createCourse,
        updateCourse,
        deleteCourse,
        assignments,
        assignmentsLoading,
        assignmentsError,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        submissions,
        submissionsLoading,
        submissionsError,
        submitAssignment,
        gradeSubmission,
        courseCompletionRates,
        averageGradesPerCourse,
        studentsPerTeacher,
        assignmentSubmissionRate,
        topPerformingStudents,
        coursePopularity
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
