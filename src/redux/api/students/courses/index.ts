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
			}),
			providesTags: ['courses']
		})
	})
});

export const { useGetStudentsCourseQuery } = api;
