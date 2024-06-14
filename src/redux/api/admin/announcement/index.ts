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
			query: (newAnnouncement) => ({
				url: '/api/announcement',
				method: 'POST',
				body: newAnnouncement
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
		editAnnouncement: builder.mutation<
			ANNOUNCEMENT.EditAnnouncementResponse,
			ANNOUNCEMENT.EditAnnouncementRequest
		>({
			query: ({ editAnnounCement, saveIdElement }) => ({
				url: `/api/announcement/${saveIdElement}`,
				method: 'PATCH',
				body: editAnnounCement
			}),
			invalidatesTags: ['announcement']
		}),
		showAnnouncement: builder.mutation<
			ANNOUNCEMENT.ShowAnnouncementResponse,
			ANNOUNCEMENT.ShowAnnouncementRequest
		>({
			query: ({ deleteById, newAnnoun }) => ({
				url: `/api/announcement/view/${deleteById}`,
				method: 'PUT',
				body: newAnnoun
			}),
			invalidatesTags: ['announcement']
		})
	})
});
export const {
	useGetAnnouncementTableQuery,
	usePostAnnouncementTableMutation,
	useDeleteAnnouncementTableMutation,
	useEditAnnouncementMutation,
	useShowAnnouncementMutation
} = api;
