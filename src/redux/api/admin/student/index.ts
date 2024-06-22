import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentTable: builder.query<
			STUDENT.TablesStudentResponse,
			STUDENT.TablesStudentRequest
		>({
			query: ({ page, size }) => ({
				url: `/api/students?${page}&${size}`,
				method: 'GET'
			}),
			providesTags: ['student']
		}),
		getGroupAll: builder.query<
			STUDENT.TableGetAllGroupResponse,
			STUDENT.TablesGetAllGroupRequest
		>({
			query: () => ({
				url: '/api/groups/getAll',
				method: 'GET'
			}),
			providesTags: ['student']
		}),
		// ! post
		postStudentTable: builder.mutation<
			STUDENT.PostStudentPropsResponse,
			STUDENT.PostStudentPropsRequest
		>({
			query: ({ newStudent, newData }) => ({
				url: `/api/students?linkForPassword=${encodeURIComponent(newData.link)}`,
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
			query: ({ editStudent, saveIdElement, link }) => ({
				url: `/api/students/${saveIdElement}?linkForPassword=${encodeURIComponent(link.linkForPassword)}`,
				method: 'PATCH',
				body: editStudent
			}),
			invalidatesTags: ['student']
		}),

		// ! patch isBlock
		isBlockStudent: builder.mutation({
			query: (saveIdElement) => ({
				url: `/api/students/isBlock/${saveIdElement}`,
				method: 'PATCH'
			}),
			invalidatesTags: ['student']
		}),
		postExcelStudent: builder.mutation({
			query: ({ excelFile, selectedFile, newLink }) => {
				{
					const newData = new FormData();
					newData.append('file', selectedFile);

					return {
						url: `/api/students/importStudents/${excelFile}?link=${encodeURIComponent(newLink.link)}`,
						method: 'POST',
						body: newData
					};
				}
			},
			invalidatesTags: ['student']
		})
	})
});

export const {
	useGetStudentTableQuery,
	usePostStudentTableMutation,
	useDeleteStudentTableMutation,
	usePatchStudentTableMutation,
	useIsBlockStudentMutation,
	usePostExcelStudentMutation,
	useGetGroupAllQuery
} = api;
