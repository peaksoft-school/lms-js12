import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/1bf67269259866233f57c4be5bbcd2f2/users',
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		postMaterials: builder.mutation<
			MATERIALS.MaterialsPostResponse,
			MATERIALS.MaterialsPostRequest
		>({
			query: (newLesson) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/1bf67269259866233f57c4be5bbcd2f2/users',
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
				url: `https://api-v2.elchocrud.pro/api/v1/1bf67269259866233f57c4be5bbcd2f2/users/${deleteById}`,
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
				url: `https://api-v2.elchocrud.pro/api/v1/1bf67269259866233f57c4be5bbcd2f2/users/${deleteId}`,
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
