import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: (courseId) => ({
				url: `/api/lessons/all/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		// /api/videos/All/${lessonId}
		postMaterials: builder.mutation<
			MATERIALS.MaterialsPostResponse,
			MATERIALS.MaterialsPostRequest
		>({
			query: ({ postData, courseId }) => ({
				url: `/api/lessons/${courseId}`,
				method: 'POST',
				body: postData
			}),
			invalidatesTags: ['material']
		}),
		patchMaterial: builder.mutation<
			MATERIALS.MaterialsPatchResponse,
			MATERIALS.MaterialsPatchRequest
		>({
			query: ({ updateMaterial, deleteById }) => ({
				url: `/api/lessons/${deleteById}`,
				method: 'PATCH',
				body: updateMaterial
			}),
			invalidatesTags: ['material']
		}),
		// /api/lessons/{lessonId}
		deleteMaterial: builder.mutation<
			MATERIALS.MaterialsDeleteResponse,
			MATERIALS.MaterialsDeleteRequest
		>({
			query: (deleteById) => ({
				url: `/api/lessons/${deleteById}`,
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
