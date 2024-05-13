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
		}),
		patchVideoLesson: builder.mutation<
			VIDEO_LESSON.VideoLessonPatchResponse,
			VIDEO_LESSON.VideoLessonPatchRequest
		>({
			query: ({ newVideoLesson, deleteById }) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/43dfa948f2c259145e952f54b5fc3d20/q/${deleteById}`,
				method: 'PATCH',
				body: newVideoLesson
			}),
			invalidatesTags: ['videoLesson']
		}),
		deleteVideoLesson: builder.mutation<
			VIDEO_LESSON.VideoLessonDeleteResponse,
			VIDEO_LESSON.VideoLessonDeleteRequest
		>({
			query: (deleteId) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/43dfa948f2c259145e952f54b5fc3d20/q/${deleteId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['videoLesson']
		})
	})
});

export const {
	useGetVideoLessonQuery,
	usePostVideoLessonMutation,
	usePatchVideoLessonMutation,
	useDeleteVideoLessonMutation
} = api;
