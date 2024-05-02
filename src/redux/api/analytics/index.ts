import { api as index } from '../../api';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAnalytics: builder.query<
			ANALYTIC.AnalyticsResponse,
			ANALYTIC.AnalyticsRequest
		>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/analytic',
				method: 'GET'
			}),
			providesTags: ['analyticsSections']
		})
	})
});

export const { useGetAnalyticsQuery } = api;
