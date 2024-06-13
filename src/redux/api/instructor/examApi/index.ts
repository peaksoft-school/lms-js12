import { api as index } from '../..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getExamInstructor: builder.query<EXAM.GetExamResponse, EXAM.GetExamRequest>(
			{
				query: (test) => ({
					url: `/api/exam/${test}`,
					method: 'GET'
				}),
				providesTags: ['exam']
			}
		),
		createExamInstructor: builder.mutation<
			EXAM.PostExamResponse,
			EXAM.PostExamRequest
		>({
			query: ({ courseId, examData }) => ({
				url: `/api/exam/${courseId}`,
				method: 'POST',
				body: examData
			}),
			invalidatesTags: ['exam']
		}),
		deleteExam: builder.mutation({
			query: (deleteExamId) => ({
				url: `/api/exam/${deleteExamId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['exam']
		})
	})
});

export const {
	useCreateExamInstructorMutation,
	useGetExamInstructorQuery,
	useDeleteExamMutation
} = api;
