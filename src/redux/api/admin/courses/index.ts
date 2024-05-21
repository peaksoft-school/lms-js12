import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAdminCourse: builder.query<
			ADMINCOURSES.CoursesAdminResponse,
			ADMINCOURSES.CoursesAdminRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/cb34195f8b96cae710c21e9eb21c8c08/createCourse',
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		createAdminCourse: builder.mutation<
			ADMINCOURSES.CreateAdminCourseResponse,
			ADMINCOURSES.CreateAdminCourseRequest
		>({
			query: (newCourse) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/cb34195f8b96cae710c21e9eb21c8c08/createCourse',
				method: 'POST',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		updateAdminCourse: builder.mutation<
			ADMINCOURSES.UpdateCourseResponse,
			ADMINCOURSES.UpdateCourseRequest
		>({
			query: ({ newCourse, saveId }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/cb34195f8b96cae710c21e9eb21c8c08/createCourse${saveId}`,
				method: 'PATCH',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourse: builder.mutation({
			query: (deleteById) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/cb34195f8b96cae710c21e9eb21c8c08/createCourse${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['courses']
		})
	})
});

export const {
	useGetAdminCourseQuery,
	useCreateAdminCourseMutation,
	useUpdateAdminCourseMutation,
	useDeleteCourseMutation
} = api;
