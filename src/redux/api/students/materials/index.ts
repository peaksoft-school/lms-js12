import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getStudentMaterials: builder.query<
			MATERIALS.MaterialsGetResponse,
			MATERIALS.MaterialsGetRequest
		>({
			query: ({ course, page, size }) => ({
				url: `/api/lessons/all/${course}?${page}&${size}`,
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
		}),
		getOneTaskName: builder.query<
			MATERIALS.GetOneTaskResponse,
			MATERIALS.GetOneTaskRequest
		>({
			query: (lesson) => ({
				url: `/api/tasks/taskOfLesson/${lesson}`,
				method: 'GET'
			}),
			providesTags: ['lesson']
		})
	})
});

export const {
	useGetStudentMaterialsQuery,
	useGetLinkStudentsQuery,
	useGetOneTaskNameQuery
} = api;
