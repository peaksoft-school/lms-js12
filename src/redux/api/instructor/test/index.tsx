// import { fetchData } from './fetchData';

// // GET запрос
// const getMaterials = async () => {
//   try {
//     const response = await fetchData(
//       'https://api-v2.elchocrud.pro/api/v1/2d8f930acb970953189fa55d863a79ee/test',
//       'GET'
//     );
//     console.log('Materials:', response);
//     return response;
//   } catch (error) {
//     console.error('Error getting materials:', error);
//   }
// };

// // POST запрос
// const postMaterials = async (newLesson) => {
//   try {
//     const response = await fetchData(
//       'https://api-v2.elchocrud.pro/api/v1/2d8f930acb970953189fa55d863a79ee/test',
//       'POST',
//       newLesson
//     );
//     console.log('Response:', response);
//     return response;
//   } catch (error) {
//     console.error('Error posting materials:', error);
//   }
// };

// export { getMaterials, postMaterials };

import { api as index } from '../..';

export const api = index.injectEndpoints({
	endpoints: (builder) => ({
		// ! get
		getMaterialTest: builder.query<
			TEST.TestMaterialResponse,
			TEST.TestMaterialRequest
		>({
			query: () => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/2d8f930acb970953189fa55d863a79ee/test',
				method: 'GET'
			}),
			providesTags: ['test']
		}),
		// ! post
		postMaterialTest: builder.mutation<
			TEST.TestMaterialResponse,
			TEST.TestMaterialPropsRequest
		>({
			query: (newAnnouncement) => ({
				url: 'https://api-v2.elchocrud.pro/api/v1/2d8f930acb970953189fa55d863a79ee/test',
				method: 'POST',
				body: newAnnouncement
			}),
			invalidatesTags: ['test']
		})
	})
});

export const { useGetMaterialTestQuery, usePostMaterialTestMutation } = api;
