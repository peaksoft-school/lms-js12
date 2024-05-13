import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTaskInstructor: builder.query<
			COURSES.CoursesResponse,
			COURSES.CoursesRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask',
				method: 'GET'
			}),
			providesTags: ['addTask']
		}),
		createTaskInstructor: builder.mutation<
			COURSES.CreateCourseResponse,
			COURSES.CreateCourseRequest
		>({
			query: (newtask) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask',
				method: 'POST',
				body: newtask
			}),
			invalidatesTags: ['addTask']
		}),
		editTaskInstructor: builder.mutation<
			COURSES.UpdateCourseResponse,
			COURSES.UpdateCourseRequest
		>({
			query: ({ newtask, task }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/837063ed51b0bdbac25627a061a1efd0/addTask/${task}`,
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
