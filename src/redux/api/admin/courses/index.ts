import { api as index } from '../../../api';
export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAdminCourse: builder.query<
			ADMINCOURSES.CoursesAdminResponse,
			ADMINCOURSES.CoursesAdminRequest
		>({
			query: () => ({
				url: '/api/course/findAllCourse',
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		createAdminCourse: builder.mutation<
			ADMINCOURSES.CreateAdminCourseResponse,
			ADMINCOURSES.CreateAdminCourseRequest
		>({
			query: (newCourse) => ({
				url: '/api/course/createCourse',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),

		updateAdminCourse: builder.mutation<
			ADMINCOURSES.UpdateCourseResponse,
			ADMINCOURSES.UpdateCourseRequest
		>({
			query: ({ newCourse, saveId }) => ({
				url: `/createCourse/${saveId}`,
				method: 'PATCH',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourse: builder.mutation({
			query: (deleteById) => ({
				url: `/createCourse/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['courses']
		}),
		fileCourse: builder.mutation({
			query: (file) => ({
				url: `/file`,
				method: 'POST',
				body: file
			}),
			invalidatesTags: ['courses']
		})
	})
});

export const {
	useGetAdminCourseQuery,
	useCreateAdminCourseMutation,
	useUpdateAdminCourseMutation,
	useDeleteCourseMutation,
	useFileCourseMutation
} = api;
