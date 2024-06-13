import { api as index } from '../../../api';
import { INSTRUCTORTASK } from './types';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTaskInsaitInstructor: builder.query<
			INSTRUCTORTASK.TaskResponse,
			INSTRUCTORTASK.TaskRequest
		>({
			query: (getTaskId) => ({
				url: `/api/tasks/${getTaskId}`,
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		getTaskResult: builder.query<
			INSTRUCTORTASK.GetStudentResultResponse,
			INSTRUCTORTASK.GetStudentResultRequest
		>({
			query: ({ getTaskId, page }) => ({
				url: `/api/resultTask/all/${getTaskId}`,
				params: {
					answerStatus: page.answerStatus
				},
				method: 'GET'
			}),
			providesTags: ['addTask']
		})
	})
});

export const { useGetTaskInsaitInstructorQuery, useGetTaskResultQuery } = api;
