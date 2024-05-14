import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPresentations: builder.query<
			PRESENTATIONS.PresentationsGetResponse,
			PRESENTATIONS.PresentationsGetRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm',
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		postPresentations: builder.mutation<
			PRESENTATIONS.PresentationsPostResponse,
			PRESENTATIONS.PresentationsPostRequest
		>({
			query: (newPresentation) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm',
				method: 'POST',
				body: newPresentation
			}),
			invalidatesTags: ['presentation']
		}),
		patchPresentation: builder.mutation<
			PRESENTATIONS.PresentationsPatchResponse,
			PRESENTATIONS.PresentationsPatchRequest
		>({
			query: ({ updatePresentation, deleteById }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm/${deleteById}`,
				method: 'PATCH',
				body: updatePresentation
			}),
			invalidatesTags: ['presentation']
		}),
		deletePresentation: builder.mutation<
			PRESENTATIONS.PresentationsDeleteResponse,
			PRESENTATIONS.PresentationsDeleteRequest
		>({
			query: (deleteId) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm/${deleteId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['presentation']
		})
	})
});
export const {
	useGetPresentationsQuery,
	usePostPresentationsMutation,
	usePatchPresentationMutation,
	useDeletePresentationMutation
} = api;
