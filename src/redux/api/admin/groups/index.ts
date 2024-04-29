import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getGroup: builder.query<GROUPS.GroupsResponse, GROUPS.GroupsRequest>({
			query: () => ({
				url: 'https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst',
				method: 'GET'
			}),
			providesTags: ['groups']
		}),
		createGroup: builder.mutation<
			GROUPS.CreateGroupResponse,
			GROUPS.CreateGroupRequest
		>({
			query: (newGroup) => ({
				url: 'https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst',
				method: 'POST',
				body: newGroup
			}),
			invalidatesTags: ['groups']
		}),
		updateGroup: builder.mutation<
			GROUPS.UpdateGroupResponse,
			GROUPS.UpdateGroupRequest
		>({
			query: ({ newGroup, saveId }) => ({
				url: `https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst/${saveId}`,
				method: 'PATCH',
				body: newGroup
			}),
			invalidatesTags: ['groups']
		}),
		deleteGroup: builder.mutation({
			query: (deleteById) => ({
				url: `https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst/${deleteById}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['groups']
		}),
		getGroupStudent: builder.query({
			query: (groupId) => ({
				url: `https://api.elchocrud.pro/api/v1/99ea37d91bc3f882eae29a2420bc4d8a/groupFirst/${groupId}`,
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
