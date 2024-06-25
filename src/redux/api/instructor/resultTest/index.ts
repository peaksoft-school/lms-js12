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
			query: ({ testId, isTrue }) => ({
				url: `/api/test/enableToStart/${testId}?accessToStart=${encodeURIComponent(isTrue)}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['test']
		}),
		GetResultTestOfStudent: builder.query<
			TEST.getTestResultResponse,
			TEST.getTestResultRequest
		>({
			query: (resultTest) => ({
				url: `/api/answerTest/resultTestOfStudent/${resultTest}`,
				method: 'GET'
			}),
			providesTags: ['test']
		})
	})
});
export const {
	useGetResultTestQuery,
	useSendAccessResultTestMutation,
	useGetResultTestOfStudentQuery
} = api;
