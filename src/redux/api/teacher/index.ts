import { api as index } from '../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/59dd7fe356868f1b0a863261bd7b1d9b/THTDTR',
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeacherssRequest
		>({
			query: (newTeacher) => ({
				url: 'https://api.elchocrud.pro/api/v1/59dd7fe356868f1b0a863261bd7b1d9b/THTDTR',
				method: 'POST',
				body: newTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		patchTeacher: builder.mutation<
			TABLE.ChangeTeachersResponse,
			TABLE.ChangeTeacherssRequest
		>({
			query: ({ updateTeacher, deleteSt }) => ({
				url: `https://api.elchocrud.pro/api/v1/59dd7fe356868f1b0a863261bd7b1d9b/THTDTR/${deleteSt}`,
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
				url: `https://api.elchocrud.pro/api/v1/59dd7fe356868f1b0a863261bd7b1d9b/THTDTR/${deleteSt}`,
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
