import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAdminCourse: builder.query<
			ADMINCOURSES.CoursesAdminResponse,
			ADMINCOURSES.CoursesAdminRequest
		>({
			query: () => ({
				url: `/api/course/findAllCourse`,
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
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		updateAdminCourse: builder.mutation<
			ADMINCOURSES.UpdateCourseResponse,
			ADMINCOURSES.UpdateCourseRequest
		>({
			query: ({ newCourses, saveId }) => ({
				url: `/api/course/updateCourse/${saveId}`,
				method: 'PUT',
				body: newCourses
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourse: builder.mutation({
			query: (deleteById) => ({
				url: `/api/course/deleteCourse/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['courses']
		}),
		getAllInstructorCourse: builder.query<
			ADMINCOURSES.GetInstructorCourseResponse,
			ADMINCOURSES.GetInstructorCourseRequest
		>({
			query: ({ courseId, pages }) => ({
				url: `/api/course/findAllInstructorsAndStudentsOfCourse/${courseId}`,
				params: {
					page: pages.page,
					size: pages.size,
					role: pages.role
				},
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		getAllStudentsCourse: builder.query<
			ADMINCOURSES.GetInstructorCourseResponse,
			ADMINCOURSES.GetInstructorCourseRequest
		>({
			query: ({ courseId, pages }) => ({
				url: `/api/course/findAllInstructorsAndStudentsOfCourse/${courseId}`,
				params: {
					page: pages.page,
					size: pages.size,
					role: pages.role
				},
				method: 'GET'
			}),
			providesTags: ['courses']
		}),

		appointAdminCourse: builder.mutation({
			query: ({ courseId, selectId }) => ({
				url: `/api/course/assignInInstructorToCourse/${courseId}/{instructorId}?instructorIds=${selectId}`,
				method: 'POST'
			}),
			invalidatesTags: ['courses']
		}),
		createStudentBlockCourses: builder.mutation({
			query: (id) => ({
				url: `/api/students/isBlock/${id}`,
				method: 'POST'
				// body: updated
			}),
			invalidatesTags: ['courses']
		}),
		getInstructorCourse: builder.query<
			ADMINCOURSES.GetInstructorCourseResponse,
			ADMINCOURSES.GetInstructorCourseRequest
		>({
			query: (courseId) => ({
				url: `/api/course/findAllInstructorsAndStudentsOfCourse/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['courses']
		})
	})
});

export const {
	useGetAdminCourseQuery,
	useCreateAdminCourseMutation,
	useUpdateAdminCourseMutation,
	useDeleteCourseMutation,
	useGetAllInstructorCourseQuery,
	useGetAllStudentsCourseQuery,
	useAppointAdminCourseMutation,
	useCreateStudentBlockCoursesMutation,
	useGetInstructorCourseQuery
} = api;
