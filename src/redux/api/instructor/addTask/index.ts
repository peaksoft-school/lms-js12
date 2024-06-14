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
			query: ({ newTask, lessonId }) => ({
				url: `/api/tasks/${lessonId}`,
				method: 'POST',
				body: newTask
			}),
			invalidatesTags: ['addTask']
		}),
		editTaskInstructor: builder.mutation<
			TASK.UpdateTaskResponse,
			TASK.UpdateTaskRequest
		>({
			query: ({ newTask, getTask }) => ({
				url: `/api/tasks/${getTask}`,
				method: 'PATCH',
				body: newTask
			}),
			invalidatesTags: ['addTask']
		}),
		deleteTaskInstructor: builder.mutation({
			query: (deleteById) => ({
				url: `/api/tasks/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['addTask']
		}),
		getInstructorTask: builder.query<TASK.getTaskResponse, TASK.getTaskRequest>(
			{
				query: (answerId) => ({
					url: `/api/resultTask/${answerId}`,
					method: 'GET'
				}),
				providesTags: ['addTask']
			}
		),

		patchTaskInstructor: builder.mutation<
			TASK.patchTaskResponse,
			TASK.patchTaskResponse
		>({
			query: ({ newComment, answerId }) => ({
				url: `/api/resultTask/${answerId}`,
				method: 'PATCH',
				body: newComment
			}),
			invalidatesTags: ['addTask']
		})
	})
});

export const {
	useGetTaskInstructorQuery,
	useCreateTaskInstructorMutation,
	useEditTaskInstructorMutation,
	useDeleteTaskInstructorMutation,
	useGetInstructorTaskQuery,
	usePatchTaskInstructorMutation
} = api;
