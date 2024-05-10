import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPrezentation: builder.query<
			MATERIALS.getResponsePresentation,
			MATERIALS.getResquestPresentation
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e4ceabb8449720a434bf0d470eb288cd/prezentation',
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		postPresentation: builder.mutation<
			MATERIALS.CreateResponsePresentation,
			MATERIALS.CreateResquestPresentation
		>({
			query: (newPresentation) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e4ceabb8449720a434bf0d470eb288cd/prezentation',
				method: 'POST',
				body: newPresentation
			}),
			invalidatesTags: ['presentation']
		}),
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
export const {
	useGetPrezentationQuery,
	usePostPresentationMutation,
	useDeletePresentationMutation,
	useEditPresentationMutation
} = api;
