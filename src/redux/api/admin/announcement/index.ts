import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementTable: builder.query<
			ANNOUNCEMENT.TablesAnnouncementResponse,
			ANNOUNCEMENT.TablesAnnouncementRequest
		>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/announcement',
				method: 'GET'
			}),
			providesTags: ['announcement']
		}),
		// ! post
		postAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.TablesAnnouncementResponse,
			ANNOUNCEMENT.PostAnnouncementPropsRequest
		>({
			query: (newAnnouncement) => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/announcement',
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
				url: `https://04c2c825595e3dcc.mokky.dev/announcement/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['announcement']
		}),
		// ! patch request
		patchAnnouncementTable: builder.mutation<
			ANNOUNCEMENT.PatchAnnouncementPropsResponse,
			ANNOUNCEMENT.PatchAnnouncementPropsRequest
		>({
			query: ({ editAnnouncement, saveIdElement }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/announcement/${saveIdElement}`,
				method: 'PATCH',
				body: editAnnouncement
			}),
			invalidatesTags: ['announcement']
		}),
		patchShowdMutation: builder.mutation({
			query: ({ updated, deleteById }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/announcement/${deleteById}`,
				method: 'PATCH',
				body: updated
			}),
			invalidatesTags: ['announcement']
		})
	})
});

export const {
	useGetAnnouncementTableQuery,
	usePostAnnouncementTableMutation,
	useDeleteAnnouncementTableMutation,
	usePatchAnnouncementTableMutation,
	usePatchShowdMutationMutation
} = api;
