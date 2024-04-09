import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getCard: builder.query<CardsResponse,CardsRequest>({
			query: () => ({
				url: '',
				method: 'GET'
			})
		})
	})
});

export const { useGetCardQuery } = api;
