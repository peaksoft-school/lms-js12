import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTest: builder.query<TEST.getTestResponse, TEST.getTestResponsex>({
			query: ({ lessonId }) => ({
				url: `/api/test/findAll/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		postTest: builder.mutation<TEST.CreateTestResponse, TEST.CreateTestRequest>(
			{
				query: ({ newTest, lessonId }) => ({
					url: `/api/test/save/${lessonId}`,
					method: 'POST',
					body: newTest
				}),
				invalidatesTags: ['presentation']
			}
		),
		deletePresentation: builder.mutation({
			query: (saveIdElement) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e4ceabb8449720a434bf0d470eb288cd/prezentation/${saveIdElement}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['presentation']
		}),
		editPresentation: builder.mutation({
			query: ({ newPresentation, saveIdElement }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e4ceabb8449720a434bf0d470eb288cd/prezentation/${saveIdElement}`,
				method: 'PUT',
				body: newPresentation
			}),
			invalidatesTags: ['presentation']
		})
	})
});
export const { useGetTestQuery, usePostTestMutation } = api;
