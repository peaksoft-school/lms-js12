import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getVideoLesson: builder.query<
			VIDEO_LESSON.VideoLessonGetResponse,
			VIDEO_LESSON.VideoLessonGetRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/43dfa948f2c259145e952f54b5fc3d20/q',
				method: 'GET'
			}),
			providesTags: ['videoLesson']
		}),
		postVideoLesson: builder.mutation<
			VIDEO_LESSON.VideoLessonPostResponse,
			VIDEO_LESSON.VideoLessonPostRequest
		>({
			query: (postData) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/43dfa948f2c259145e952f54b5fc3d20/q',
				method: 'POST',
				body: postData
			}),
			invalidatesTags: ['videoLesson']
		})
	})
});

export const { useGetVideoLessonQuery, usePostVideoLessonMutation } = api;
