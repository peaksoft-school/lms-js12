import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCourseInstructor: builder.query<
			INSTRUCTORCOURSES.CoursesResponse,
			INSTRUCTORCOURSES.CoursesRequest
		>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/course',
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		createCourseInstructor: builder.mutation<
			INSTRUCTORCOURSES.CreateCourseResponse,
			INSTRUCTORCOURSES.CreateCourseRequest
		>({
			query: (newCourse) => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/course',
				method: 'POST',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		updateCourseInstructor: builder.mutation<
			INSTRUCTORCOURSES.UpdateCourseResponse,
			INSTRUCTORCOURSES.UpdateCourseRequest
		>({
			query: ({ newCourse, saveId }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/course/${saveId}`,
				method: 'PATCH',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourseInstructor: builder.mutation({
			query: (deleteById) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/course/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['courses']
		})
	})
});

export const {
	useGetCourseInstructorQuery,
	useCreateCourseInstructorMutation,
	useUpdateCourseInstructorMutation,
	useDeleteCourseInstructorMutation
} = api;
