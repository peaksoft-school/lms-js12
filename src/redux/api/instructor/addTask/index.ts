import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTaskInstructor: builder.query<TASK.TaskResponse, TASK.TaskRequest>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask',
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		createTaskInstructor: builder.mutation<
			TASK.CreateTaskResponse,
			TASK.CreateTaskRequest
		>({
			query: (newtask) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask',
				method: 'POST',
				body: newtask
			}),
			invalidatesTags: ['addTask']
		}),
		editTaskInstructor: builder.mutation<
			TASK.UpdateTaskResponse,
			TASK.UpdateTaskRequest
		>({
			query: ({ newtask, getTaskId }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask/${getTaskId}`,
				method: 'PATCH',
				body: newtask
			}),
			invalidatesTags: ['addTask']
		}),
		deleteTaskInstructor: builder.mutation({
			query: (deleteById) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['addTask']
		})
	})
});

export const {
	useGetTaskInstructorQuery,
	useCreateTaskInstructorMutation,
	useEditTaskInstructorMutation,
	useDeleteTaskInstructorMutation
} = api;
