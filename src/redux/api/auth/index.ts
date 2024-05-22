import { api as index } from '..';

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		postLogin: builder.mutation<AUTH.PostFindResponse, AUTH.PostFindRequest>({
			query: (newData) => ({
				url: '/api/auth/signIn',
				method: 'POST',
				body: newData
			}),
			invalidatesTags: ['auth']
		})

		// postForgot: builder.query<LOGIN.PostLoginResponse, LOGIN.PostLoginRequest>({
		// 	query: () => ({
		// 		url: '',
		// 		method: 'POST'
		// 	}),
		// 	providesTags: ['auth']
		// })
	})
});

export const { usePostLoginMutation } = api;
