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
			query: (getTaskId) => ({
				url: `/api/test/findByIdForEdit/${getTaskId}`,
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
			query: ({ newTest, getTaskId }) => ({
				url: `/api/test/update/${getTaskId}`,
				method: 'PATCH',
				body: newTest
			}),
			invalidatesTags: ['test']
		})
	})
});
export const {
	useGetTestQuery,
	useGetInsideTestQuery,
	usePostTestMutation,
	useDeleteTestMutation,
	useEditTestMutation
} = api;
