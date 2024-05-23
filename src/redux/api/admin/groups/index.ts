import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getGroup: builder.query<GROUPS.GroupsResponse, GROUPS.GroupsRequest>({
			query: () => ({
				url: '/api/groups?page=1&size=8',
				method: 'GET'
			}),
			// https://04c2c825595e3dcc.mokky.dev/group
			providesTags: ['groups']
		}),
		createGroup: builder.mutation<
			GROUPS.CreateGroupResponse,
			GROUPS.CreateGroupRequest
		>({
			query: (newGroup) => ({
				url: '/api/groups',
				method: 'POST',
				body: newGroup
			}),
			// https://04c2c825595e3dcc.mokky.dev/group
			invalidatesTags: ['groups']
		}),
		updateGroup: builder.mutation<
			GROUPS.UpdateGroupResponse,
			GROUPS.UpdateGroupRequest
		>({
			query: ({ newGroup, saveId }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/group/${saveId}`,
				method: 'PATCH',
				body: newGroup
			}),
			// https://04c2c825595e3dcc.mokky.dev/group/${saveId}
			invalidatesTags: ['groups']
		}),
		deleteGroup: builder.mutation({
			query: (deleteById) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/group/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['groups']
		}),
		getGroupStudent: builder.query({
			query: (groupId) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/group/${groupId}`,
				method: 'GET'
			}),
			providesTags: ['groups']
		})
	})
});

export const {
	useGetGroupQuery,
	useCreateGroupMutation,
	useUpdateGroupMutation,
	useDeleteGroupMutation,
	useGetGroupStudentQuery
} = api;
