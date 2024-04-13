import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCard: builder.query<LESSON.GetCardsResponse, LESSON.GetCardsRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			}),
			providesTags: ['lesson']
		})
	})
});

export const { useGetCardQuery } = api;
