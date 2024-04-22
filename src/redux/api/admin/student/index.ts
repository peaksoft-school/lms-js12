import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentTable: builder.query<
			STUDENT.TablesStudentResponse,
			STUDENT.TablesStudentRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
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
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
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
			query: (_id) => ({
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${_id}`,
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
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${saveIdElement}`,
				method: 'PATCH',
				body: editStudent
			}),
			invalidatesTags: ['student']
		}),
		patchCompletedMutation: builder.mutation({
			query: ({ updated, saveIdElement }) => ({
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${saveIdElement}`,
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
