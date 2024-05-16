// const fetchData = async (url, method, body = null) => {
//   try {
//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: body ? JSON.stringify(body) : null,
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export default fetchData

/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TEST {
	type Table = {
		id: Key | null | undefined;
		id: number;
		announcement: string;
		group: string;
		show: boolean;
	};

	type TestMaterialResponse = Table[];
	type TestMaterialRequest = void;

	type TestMaterialResponse = {
		id: number;
		announcement: string;
		group: string;
	}[];
	type TestMaterialPropsRequest = {
		announcement: string;
		group: string[];
		show: boolean;
	};
}
