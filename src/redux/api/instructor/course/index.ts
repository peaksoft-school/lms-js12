import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCourseInstructor: builder.query<
			InstructorCourses.CoursesResponse,
			InstructorCourses.CoursesRequest
		>({
			query: () => ({
				url: '/api/course/myCourse?page=1&size=8',
				method: 'GET'
				// ${page !== null ? page : '1'${size !== null ? size : '12'}
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem('token')}`
				// }
			}),
			providesTags: ['courses']
		})
	})
});

export const { useGetCourseInstructorQuery } = api;
