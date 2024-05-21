import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getExemInstructor: builder.query<EXEM.ExemResponse, EXEM.ExemRequest>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/15a32839a3c0c36b931afa002e4bfee4/createExem',
				method: 'GET'
			}),
			providesTags: ['exem']
		}),
		createExemInstructor: builder.mutation<
			EXEM.CreateCourseResponse,
			EXEM.ExemCourseRequest
		>({
			query: (postData) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/15a32839a3c0c36b931afa002e4bfee4/createExem',
				method: 'POST',
				body: postData
			}),
			invalidatesTags: ['exem']
		}),
		deleteExemInstructor: builder.mutation({
			query: (id) => ({
				url: `https://api-v2.elchocrud.pro/api/v1/15a32839a3c0c36b931afa002e4bfee4/createExem/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['exem']
		})
	})
});

export const {
	useGetExemInstructorQuery,
	useCreateExemInstructorMutation,
	useDeleteExemInstructorMutation
} = api;
