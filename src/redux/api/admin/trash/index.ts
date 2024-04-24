import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTrash: builder.query<TRASH.GetCardsResponse, TRASH.GetCardsRequest>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/103d602158fedf38812fe148fcd1b04e/trashurl',
				method: 'GET'
			}),
			providesTags: ['trash']
		})
	})
});

export const { useGetTrashQuery } = api;
