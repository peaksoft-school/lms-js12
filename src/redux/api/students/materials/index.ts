import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentMaterials: builder.query<
			STUDENTLESSON.MaterialsGetResponse,
			STUDENTLESSON.MaterialsGetRequest
		>({
			query: (coursesId) => ({
				url: `/api/lessons/all/${coursesId}`,
				method: 'GET'
			}),
			providesTags: ['material']
		})
		// /api/videos/All/${lessonId}
	})
});
export const { useGetStudentMaterialsQuery } = api;
