import { api as index } from '../';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAnalyticsGroups: builder.query<
			ANALYTIC.AnalyticsResponse,
			ANALYTIC.AnalyticsRequest
		>({
			query: () => ({
				url: '/api/analytics/getAllCoursesCount',
				method: 'GET'
			}),
			providesTags: ['analyticsSections']
		}),
		// getAnalyticsStudents: builder.mutation<
		// 	ANALYTIC.AnotherDataResponse,
		// 	ANALYTIC.AnotherDataRequest
		// >({
		// 	query: () => ({
		// 		url: '/api/analytics/getAllStudentsCount',
		// 		method: 'GET'
		// 	}),
		// 	providesTags: ['analyticsSections']
		// })
	})
});

export const { useGetAnalyticsGroupsQuery
	// ,useGetAnalyticsStudentsQuery 
} = api;
