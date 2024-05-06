import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: () => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/teacher',
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeachersRequest
		>({
			query: (newTeacher) => ({
				url: 'https://04c2c825595e3dcc.mokky.dev/teacher',
				method: 'POST',
				body: newTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		patchTeacher: builder.mutation<
			TABLE.ChangeTeachersResponse,
			TABLE.ChangeTeachersRequest
		>({
			query: ({ updateTeacher, deleteById }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/teacher/${deleteById}`,
				method: 'PATCH',
				body: updateTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		deleteTeacher: builder.mutation<
			TABLE.DeleteTeacherResponse,
			TABLE.DeleteTeacherRequest
		>({
			query: (deleteSt) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/teacher/${deleteSt}`,
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
