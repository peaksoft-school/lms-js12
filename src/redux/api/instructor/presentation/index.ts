import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getPresentation: builder.query<
			MATERIALS.getResponsePresentation,
			MATERIALS.getRequestPresentation
		>({
			query: (lessonId) => ({
				url: `/api/presentation/All/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		// !
		getFile: builder.query<
			MATERIALS.getResponsePresentation,
			MATERIALS.getRequestPresentation
		>({
			query: (saveId) => ({
				url: `/api/presentation/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['presentation']
		}),
		// !
		postPresentation: builder.mutation<
			MATERIALS.CreateResponsePresentation,
			MATERIALS.CreateRequestPresentation
		>({
			query: ({ newPresentation, lessonId }) => ({
				url: `/api/presentation/${lessonId}`,
				method: 'POST',
				body: newPresentation
			}),
			invalidatesTags: ['presentation']
		}),
		deletePresentation: builder.mutation({
			query: (saveIdElement) => ({
				url: `/api/presentation/${saveIdElement}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['presentation']
		}),
		editPresentation: builder.mutation({
			query: ({ newPresentation, saveIdElement }) => (
				{
				url: `/api/presentation/${saveIdElement}`,
				method: 'PATCH',
				body: newPresentation
			}
		),
			invalidatesTags: ['presentation']
		}),
		createPresentationFile: builder.mutation({
			query: (fileObj) => ({
				url: '/file',
				method: 'POST',
				// headers: { 'Content-Type': 'multipart/form-data' },
				body: fileObj,
				responseHandler: 'text',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			invalidatesTags: ['presentation']
		})
	})
});
export const {
	useGetPresentationQuery,
	usePostPresentationMutation,
	useDeletePresentationMutation,
	useEditPresentationMutation,
	useGetFileQuery,
	useCreatePresentationFileMutation
} = api;
