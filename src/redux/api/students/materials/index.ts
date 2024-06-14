import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: (course) => ({
				url: `/api/lessons/all/${course}`,
				method: 'GET'
			}),
			providesTags: ['material']
		}),
		getLinkStudents: builder.query<
			MATERIALS.getResponseLinkStudents,
			MATERIALS.getRequestLinkStudents
		>({
			query: (lesson) => ({
				url: `/api/links/findAll/${lesson}`,
				method: 'GET'
			}),
			providesTags: ['link']
		})
	})
});

export const { useGetStudentMaterialsQuery, useGetLinkStudentsQuery } = api;
