import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: () => ({
				url: '/api/instructors',
				method: 'GET'
			}),
			providesTags: ['teacher']
		}),
		postTeacher: builder.mutation<
			TABLE.CreateTeachersResponse,
			TABLE.CreateTeachersRequest
		>({
			query: (newTeacher) => ({
				url: '/api/instructors',
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
				url: `/api/instructors/${deleteById}`,
				method: 'PATCH',
				body: updateTeacher
			}),
			invalidatesTags: ['teacher']
		}),
		deleteTeacher: builder.mutation<
			TABLE.DeleteTeacherResponse,
			TABLE.DeleteTeacherRequest
		>({
			query: (deleteById) => ({
				url: `/api/instructors/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['teacher']
		}),
		appointTeacher: builder.query<
			TABLE.GetTeachersResponse,
			TABLE.GetTeacherRequest
		>({
			query: (instructorId) => ({
				url: `/api/instructors/${instructorId}`,
				method: 'GET'
			}),
			providesTags: ['teacher']
		})
	})
});

export const {
	useGetTeacherQuery,
	usePostTeacherMutation,
	usePatchTeacherMutation,
	useDeleteTeacherMutation
} = api;
