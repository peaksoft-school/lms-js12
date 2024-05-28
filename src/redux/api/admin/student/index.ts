import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentTable: builder.query<
			STUDENT.TablesStudentResponse,
			STUDENT.TablesStudentRequest
		>({
			query: () => ({
				url: '/api/students',
				method: 'GET'
			}),
			providesTags: ['student']
		}),
		// ! post
		postStudentTable: builder.mutation<
			STUDENT.TablesStudentResponse,
			STUDENT.PostStudentPropsRequest
		>({
			query: (newStudent) => ({
				url: '/api/students',
				method: 'POST',
				body: newStudent
			}),
			invalidatesTags: ['student']
		}),
		// ! delete
		deleteStudentTable: builder.mutation<
			STUDENT.DeleteStudentPropsResponse,
			STUDENT.DeleteStudentPropsRequest
		>({
			query: (id) => ({
				url: `/api/students/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['student']
		}),
		// ! patch request
		patchStudentTable: builder.mutation<
			STUDENT.PatchStudentPropsResponse,
			STUDENT.PatchStudentPropsRequest
		>({
			query: ({ editStudent, saveIdElement }) => ({
				url: `/api/students/${saveIdElement}`,
				method: 'PATCH',
				body: editStudent
			}),
			invalidatesTags: ['student']
		}),

		// ! patch isBlock
		patchCompletedMutation: builder.mutation({
			query: ({ updated, saveIdElement }) => ({
				url: `/api/students/isBlock/${saveIdElement}`,
				method: 'PATCH',
				body: updated
			}),
			invalidatesTags: ['student']
		})
	})
});

export const {
	useGetStudentTableQuery,
	usePostStudentTableMutation,
	useDeleteStudentTableMutation,
	usePatchStudentTableMutation,
	usePatchCompletedMutationMutation
} = api;
