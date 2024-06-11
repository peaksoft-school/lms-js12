import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotificationInstructor: builder.query<
			NOTIFICATION.getNotificationResponse,
			NOTIFICATION.getNotificationRequest
		>({
			query: (isTrue) => ({
				url: `/api/notifications/findAll`,
				params: {
					isView: isTrue
				},
				method: 'GET'
			}),
			providesTags: ['notification']
		}),
		getOneNotificationInstructor: builder.query<
			NOTIFICATION.getNotificationResponse,
			NOTIFICATION.getNotificationRequest
		>({
			query: (saveId) => ({
				url: `/api/notifications/${saveId}`,
				method: 'GET'
			}),
			providesTags: ['notification']
		})
	})
});

export const {
	useGetNotificationInstructorQuery,
	useGetOneNotificationInstructorQuery
} = api;
