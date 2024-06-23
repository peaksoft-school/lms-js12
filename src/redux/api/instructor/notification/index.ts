import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getNotification: builder.query<
			NOTIFICATION.NotificationGetResponse,
			NOTIFICATION.NotificationGetRequest
		>({
			query: (isView) => ({
				url: `/api/notifications/findAll?isView=${encodeURIComponent(isView)}`,
				method: 'GET'
			}),
			providesTags: ['notification']
		})
	})
});
export const { useGetNotificationQuery } = api;
