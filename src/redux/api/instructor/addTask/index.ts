import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTaskInstructor: builder.query<TASK.TaskResponse, TASK.TaskRequest>({
			query: (lessonId) => ({
				url: `/api/tasks/taskOfLesson/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		createTaskInstructor: builder.mutation<
			TASK.CreateTaskResponse,
			TASK.CreateTaskRequest
		>({
			query: ({ newtask, lessonId }) => ({
				url: `/api/tasks/${lessonId}`,
				method: 'POST',
				body: newtask
			}),
			invalidatesTags: ['addTask']
		}),
		editTaskInstructor: builder.mutation<
			TASK.UpdateTaskResponse,
			TASK.UpdateTaskRequest
		>({
			query: ({ newtask, getTaskId,taskId }) => ({
				url: `/api/tasks/${taskId}`,
				method: 'PATCH',
				body: newtask
			}),
			invalidatesTags: ['addTask']
		}),
		deleteTaskInstructor: builder.mutation({
			query: ({deleteById,taskId}) => ({
				url: `/api/tasks/${taskId}`,
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
