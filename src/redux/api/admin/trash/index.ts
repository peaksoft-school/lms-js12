import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTrash: builder.query<TRASH.GetCardsResponse, TRASH.GetCardsRequest>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/trash',
				method: 'GET'
			}),
			providesTags: ['trash']
		})
	})
});

export const { useGetTrashQuery } = api;
