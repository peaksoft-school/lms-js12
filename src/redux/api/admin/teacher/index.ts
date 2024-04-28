import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/dc47718eede209443e9c687772c93972/teacher',
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeacherssRequest
		>({
			query: (newTeacher) => ({
				url: 'https://api.elchocrud.pro/api/v1/dc47718eede209443e9c687772c93972/teacher',
				method: 'POST',
				body: newTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		patchTeacher: builder.mutation<
			TABLE.ChangeTeachersResponse,
			TABLE.ChangeTeacherssRequest
		>({
			query: ({ updateTeacher, deleteById }) => ({
				url: `https://api.elchocrud.pro/api/v1/dc47718eede209443e9c687772c93972/teacher/${deleteById}`,
				method: 'PATCH',
				body: updateTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		deleteTeacher: builder.mutation<
			TABLE.DeleteTeacherRespone,
			TABLE.DeleteTeacherRequest
		>({
			query: (deleteSt) => ({
				url: `https://api.elchocrud.pro/api/v1/dc47718eede209443e9c687772c93972/teacher/${deleteSt}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['teacher']
		})
	})
});

export const {
	useGetTeacherQuery,
	usePostTeacherMutation,
	usePatchTeacherMutation,
	useDeleteTeacherMutation
} = api;
