import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getResultTest: builder.query<
			TEST.GetResultTestResponse,
			TEST.GetResultTestRequest
		>({
			query: (testId) => ({
				url: `/api/test/findById/${testId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		}),
		SendAccessResultTest: builder.mutation({
			query: (testId) => ({
				url: `/api/test/enableToStart/${testId}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['rating']
		}),
		GetResultTestOfStudent: builder.query({
			query: (resultTestId) => ({
				url: `/api/answerTest/resultTestOfStudent/${resultTestId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		})
	})
});
export const {
	useGetResultTestQuery,
	useSendAccessResultTestMutation,
	useGetResultTestOfStudentQuery
} = api;
