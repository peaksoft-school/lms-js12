import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementTable: builder.query<
			ANNOUNCEMENT.TablesAnnouncementResponse,
			ANNOUNCEMENT.TablesAnnouncementRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
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
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
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
			query: (_id) => ({
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${_id}`,
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
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${saveIdElement}`,
				method: 'PATCH',
				body: editAnnouncement
			}),
			invalidatesTags: ['announcement']
		}),
		patchCompletedMutation: builder.mutation({
			query: ({ updated, saveIdElement }) => ({
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${saveIdElement}`,
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
	usePatchCompletedMutationMutation
} = api;
