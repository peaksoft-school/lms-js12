import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentsCourse: builder.query<
			STUDENTSCOURSES.GetStudentsResponse,
			STUDENTSCOURSES.GetStudentsRequest
		>({
			query: () => ({
				url: '/api/course/myCourse',
				method: 'GET'
				// headers: {
				// 	Authorization: `Bearer ${localStorage.getItem('token')}`
				// }
			}),
			providesTags: ['courses']
		})
	})
});

export const { useGetStudentsCourseQuery } = api;
