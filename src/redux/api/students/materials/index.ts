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
		}),
		getLinkStudents: builder.query<
			MATERIALS.getResponseLinkStudents,
			MATERIALS.getRequestLinkStudents
		>({
			query: (lessonId) => ({
				url: `/api/links/findAll/${lessonId}`,
				method: 'GET'
			}),
			providesTags: ['link']
		})
	})
});

export const { useGetStudentMaterialsQuery, useGetLinkStudentsQuery } = api;
