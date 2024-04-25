import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCourse: builder.query<COURSES.CoursesResponse, COURSES.CoursesRequest>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst',
				method: 'GET'
			}),
			providesTags: ['courses']
		}),
		createCourse: builder.mutation<
			COURSES.CreateCourseResponse,
			COURSES.CreateCourseRequest
		>({
			query: (newCourse) => ({
				url: 'https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst',
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
				url: `https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst/${saveId}`,
				method: 'PATCH',
				body: newCourse
			}),
			invalidatesTags: ['courses']
		}),
		deleteCourse: builder.mutation({
			query: (deleteById) => ({
				url: `https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst/${deleteById}`,
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
