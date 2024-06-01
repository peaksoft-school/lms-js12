import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTrash: builder.query<TRASH.GetCardsResponse, TRASH.GetCardsRequest>({
			query: () => ({
				url: '/api/trash/findAll',
				method: 'GET'
			}),
			providesTags: ['trash']
		}),
		UpdatedTrash: builder.mutation({
			query: (id) => ({
				url: `/api/trash/return/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['trash']
		}),
		DeleteTrash: builder.mutation({
			query: (id) => ({
				url: `/api/trash/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['trash']
		})
	})
});

export const {
	useGetTrashQuery,
	useUpdatedTrashMutation,
	useDeleteTrashMutation
} = api;
