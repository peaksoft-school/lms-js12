import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getStudentsTable: builder.query<STUDENTS.TablesStudentResponse, string>({
			query: (courseId) => ({
				url: `/api/course/findAllInstructorsAndStudentsOfCourse/${courseId}`,
				method: 'GET'
			}),
			providesTags: ['student']
		}),

		// ! post
		postStudentTable: builder.mutation<
			STUDENTS.PostStudentPropsResponse,
			STUDENTS.PostStudentPropsRequest
		>({
			query: ({ newStudent, courseId, groupId }) => ({
				url: `/api/course/assignInGroupToCourse/${groupId}/${courseId}`,
				method: 'POST',
				body: newStudent
			}),
			invalidatesTags: ['student']
		}),
		getGroupTable: builder.query<
			STUDENTS.TableStudentResponse,
			STUDENTS.TableStudentRequest
		>({
			query: (group) => ({
				url: `/api/groups/getAll${group}`,
				method: 'GET'
			}),
			providesTags: ['student']
		})
	})
});

export const {
	useGetStudentsTableQuery,
	usePostStudentTableMutation,
	useGetGroupTableQuery
} = api;

// /api/groups/getAll
