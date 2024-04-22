import { api as index } from '../../api';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getAnalytics: builder.query<
			ANALYTIC.AnalyticsResponse,
			ANALYTIC.AnalyticsRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/c43275804a0b340557d27a25acf8b20f/analytics',
				method: 'GET'
			}),
			providesTags: ['analytics']
		})
	})
});

export const { useGetAnalyticsQuery } = api;
