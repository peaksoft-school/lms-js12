import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentTable: builder.query<
			STUDENT.TablesStudentResponse,
			STUDENT.TablesStudentRequest
		>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/studentts',
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
				url: 'https://04c2c825595e3dcc.mokky.dev/studentts',
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
				url: `https://04c2c825595e3dcc.mokky.dev/studentts/${id}`,
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
				url: `https://04c2c825595e3dcc.mokky.dev/studentts/${saveIdElement}`,
				method: 'PATCH',
				body: editStudent
			}),
			invalidatesTags: ['student']
		}),
		patchCompletedMutation: builder.mutation({
			query: ({ updated, saveIdElement }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/studentts/${saveIdElement}`,
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
