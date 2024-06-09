import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTest: builder.query<TEST.getTestResponse, TEST.getTestRequest>({
			query: (lessonId) => ({
				url: `/api/test/findAll/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		getInsideTest: builder.query<
			TEST.getTestInsideResponse,
			TEST.getTestInsideRequest
		>({
			query: (testId) => ({
				url: `/api/test/findByIdForEdit/${testId}`,
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		postTest: builder.mutation<TEST.CreateTestResponse, TEST.CreateTestRequest>(
			{
				query: ({ newTest, lessonId }) => ({
					url: `/api/test/save/${lessonId}`,
					method: 'POST',
					body: newTest
				}),
				invalidatesTags: ['test']
			}
		),
		deleteTest: builder.mutation({
			query: (saveId) => ({
				url: `/api/test/delete/${saveId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['test']
		}),
		editTest: builder.mutation({
			query: ({ newPresentation, testId }) => ({
				url: `/api/test/update/2`,
				method: 'PATCH',
				body: newPresentation
			}),
			invalidatesTags: ['test']
		}),
		getInsideEditTest: builder.query<
			TEST.getTestInsideResponse,
			TEST.getTestInsideRequest
		>({
			query: (testId) => ({
				url: `/api/test/findByIdForEdit/2`,
				method: 'GET'
			}),
			providesTags: ['test']
		})
	})
});
export const {
	useGetTestQuery,
	useGetInsideTestQuery,
	usePostTestMutation,
	useDeleteTestMutation,
	useGetInsideEditTestQuery,
	useEditTestMutation
} = api;
