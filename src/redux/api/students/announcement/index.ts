import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getAnnouncementStudent: builder.query<
			ANNOUNCEMENT.GetAnnouncementStudentResponse,
			ANNOUNCEMENT.GetAnnouncementStudentRequest
		>({
			query: () => ({
				url: `/api/announcement?page=1&size=3&isView=true`,
				method: 'GET'
			}),
			providesTags: ['announcementStudent']
		})
	})
});

export const { useGetAnnouncementStudentQuery } = api;
