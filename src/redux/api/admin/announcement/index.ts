import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementTable: builder.query<
			ANNOUNCEMENT.GetAnnouncementResponse,
			ANNOUNCEMENT.GetAnnouncementRequest
		>({
			query: () => ({
				url: '/api/announcement/search',
				method: 'GET'
			}),
			providesTags: ['announcement']
		}),
		// ! post
		postAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.PostAnnouncementPropsResponse,
			ANNOUNCEMENT.PostAnnouncementPropsRequest
		>({
			query: ({
				announcementContent,
				expirationDate,
				publishedDate,
				targetGroupIds
			}) => ({
				url: '/api/announcement',
				method: 'POST',
				body: {
					announcementContent,
					expirationDate,
					publishedDate,
					targetGroupIds
				},
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			invalidatesTags: ['announcement']
		}),
		// ! delete
		deleteAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.DeleteAnnouncementPropsResponse,
			ANNOUNCEMENT.DeleteAnnouncementPropsRequest
		>({
			query: (id) => ({
				url: `/api/announcement/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['announcement']
		}),
		// ! patch
		putAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.PutAnnouncementPropsResponse,
			ANNOUNCEMENT.PutAnnouncementPropsRequest
		>({
			query: ({ id, editAnnouncement }) => ({
				url: `/api/announcement/view/${id}`,
				method: 'PUT',
				body: editAnnouncement,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			invalidatesTags: ['announcement']
		}),
		patchShowdMutation: builder.mutation({
			query: ({ updated, deleteById }) => ({
				url: `/api/announcement/${deleteById}`,
				method: 'PATCH',
				body: updated
			}),
			invalidatesTags: ['announcement']
		}),
		putIsPublishedMutation: builder.mutation({
			query: () => ({
				url: `/api/announcement`,
				method: 'PUT',
			}),
			invalidatesTags: ['announcement']
		}),
		editAnnouncement: builder.mutation<
			ANNOUNCEMENT.EditAnnouncementResponse,
			ANNOUNCEMENT.EditAnnouncementRequest
		>({
			query: ({
				id,
				announcementContent,
				expirationDate,
				publishedDate,
				targetGroupIds,
			}) => ({
				url: `/api/announcement/${id}`,
				method: 'PATCH',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				},
				body: {
					announcementContent,
					expirationDate,
					publishedDate,
					targetGroupIds
				}
			}),
			invalidatesTags: ['announcement']
		})
	})
});

export const {
	useGetAnnouncementTableQuery,
	usePostAnnouncementTableMutation,
	useDeleteAnnouncementTableMutation,
	usePutAnnouncementTableMutation,
	usePutIsPublishedMutationMutation,
	usePatchShowdMutationMutation,
	useEditAnnouncementMutation
} = api;
