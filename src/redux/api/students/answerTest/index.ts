import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMyResultTest: builder.query<
			ANSWERTEST.GetResultTestResponse,
			string
			// 	ANSWERTEST.GetResultTestRequest,
		>({
			query: (getTaskId) => ({
				url: `/api/answerTest/myResultTest/${getTaskId}`,
				method: 'GET'
			}),
			providesTags: ['answerTest']
		})
	})
});

export const { useGetMyResultTestQuery } = api;
