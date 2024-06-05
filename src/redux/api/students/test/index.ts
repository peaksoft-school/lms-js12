import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentTests: builder.query<
			STUDENTTEST.GetTestsResponse,
			STUDENTTEST.GetTestsRequest
		>({
			query: (lessonId) => ({
				url: `/api/test/findAll/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		getQuestionListTests: builder.query<
			STUDENTTEST.GetQuestionTestsResponse,
			STUDENTTEST.GetQuestionTestsRequest
		>({
			query: (testId) => ({
				url: `/api/test/findByIdForEdit/${testId}`,
				method: 'GET'
			}),
			providesTags: ['test']
		})
	})
});

export const { useGetStudentTestsQuery, useGetQuestionListTestsQuery } = api;
