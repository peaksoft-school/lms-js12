import { api as index } from '../../../api';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		getGroup: builder.query<GROUPS.GroupsResponse, GROUPS.GroupsRequest>({
			query: () => ({
				url: '/api/groups?page=1&size=8',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			}),
			providesTags: ['groups']
		}),
		createGroup: builder.mutation<
			GROUPS.CreateGroupResponse,
			GROUPS.CreateGroupRequest
		>({
			query: ({ dateOfEnd, image, description, title }) => ({
				url: '/api/groups',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json' // Убедитесь, что заголовок Content-Type установлен правильно
				},
				body: JSON.stringify({ dateOfEnd, image, description, title }) // Преобразуем тело запроса в JSON
			}),
			invalidatesTags: ['groups']
		}),
		updateGroup: builder.mutation<
			GROUPS.UpdateGroupResponse,
			GROUPS.UpdateGroupRequest
		>({
			query: ({ newGroup, saveId }) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/group/${saveId}`,
				method: 'PATCH',
				body: JSON.stringify(newGroup),
				headers: {
					'Content-Type': 'application/json'
				}
			}),
			invalidatesTags: ['groups']
		}),
		deleteGroup: builder.mutation({
			query: (deleteById) => ({
				url: `https://04c2c825595e3dcc.mokky.dev/group/${deleteById}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
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
