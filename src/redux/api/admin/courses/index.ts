import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCourse: builder.query<COURSES.CoursesResponse, COURSES.CoursesRequest>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/course',
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		createCourse: builder.mutation<
			COURSES.CreateCourseResponse,
			COURSES.CreateCourseRequest
		>({
			query: (newCourse) => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/course',
				method: 'POST',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		updateCourse: builder.mutation<
			COURSES.UpdateCourseResponse,
			COURSES.UpdateCourseRequest
		>({
			query: ({ newCourse, saveId }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/course/${saveId}`,
				method: 'PATCH',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourse: builder.mutation({
			query: (deleteById) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/course/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['courses']
		})
	})
});

export const {
	useGetCourseQuery,
	useCreateCourseMutation,
	useUpdateCourseMutation,
	useDeleteCourseMutation
} = api;
