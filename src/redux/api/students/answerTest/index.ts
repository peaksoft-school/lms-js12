import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMyResultTest: builder.query<
			ANSWERTEST.GetResultTestResponse,
			string
			// 	ANSWERTEST.GetResultTestRequest,
		>({
			query: (testId) => ({
				url: `/api/answerTest/myResultTest/${testId}`,
				method: 'GET'
			}),
			providesTags: ['answerTest']
		})
	})
});

export const { useGetMyResultTestQuery } = api;
