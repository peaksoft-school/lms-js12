import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm',
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		postMaterials: builder.mutation<
			MATERIALS.MaterialsPostResponse,
			MATERIALS.MaterialsPostRequest
		>({
			query: (newLesson) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm',
				method: 'POST',
				body: newLesson
			}),
			invalidatesTags: ['material']
		}),
		patchMaterial: builder.mutation<
			MATERIALS.MaterialsPatchResponse,
			MATERIALS.MaterialsPatchRequest
		>({
			query: ({ updateMaterial, deleteById }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm/${deleteById}`,
				method: 'PATCH',
				body: updateMaterial
			}),
			invalidatesTags: ['material']
		}),
		deleteMaterial: builder.mutation<
			MATERIALS.MaterialsDeleteResponse,
			MATERIALS.MaterialsDeleteRequest
		>({
			query: (deleteId) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/e2e52edbbeb1c03191182468eb7da6a3/mm/${deleteId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['material']
		})
	})
});
export const {
	useGetMaterialsQuery,
	usePostMaterialsMutation,
	usePatchMaterialMutation,
	useDeleteMaterialMutation
} = api;
