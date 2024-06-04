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
				url: `/api/test/findById/${testId}`,
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
		editPresentation: builder.mutation({
			query: ({ newPresentation, saveIdElement }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e4ceabb8449720a434bf0d470eb288cd/prezentation/${saveIdElement}`,
				method: 'PUT',
				body: newPresentation
			}),
			invalidatesTags: ['test']
		})
	})
});
export const {
	useGetTestQuery,
	useGetInsideTestQuery,
	usePostTestMutation,
	useDeleteTestMutation
} = api;
