import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getRatingStudents: builder.query<
			RATING.GetRatingStudentsResponse,
			RATING.GetRatingStudentsRequest
		>({
			query: (courseId) => ({
				url: `/api/ratingApi/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		}),

		getResultRating: builder.query({
			query: (answerId) => ({
				url: `/api/resultTask/${answerId}`,
				method: 'GET'
			}),
			providesTags: ['rating']
		})
	})
});

export const { useGetRatingStudentsQuery, useGetResultRatingQuery } = api;
