import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeacherssRequest
		>({
			query: (newTeacher) => ({
				url: 'https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms',
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
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${deleteById}`,
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
				url: `https://api.elchocrud.pro/api/v1/1f6d495b1c4770efe810467625c7b433/lms/${deleteSt}`,
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
