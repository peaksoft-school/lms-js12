import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotification: builder.query<
			NOTIFICATION.NotificationGetResponse,
			NOTIFICATION.NotificationGetRequest
		>({
			query: (notification) => ({
				url: `/api/notifications/findAll`,
				method: 'GET',
				params: {
					isView: notification.isView
				}
			}),
			providesTags: ['notification']
		})
	})
});
export const { useGetNotificationQuery } = api;
