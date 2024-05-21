/* eslint-disable @typescript-eslint/no-unused-vars */
namespace EXEM {
	type ExemResponse = {
		_id: number;
		title: string;
		date: string;
	}[];
	type ExemRequest = void;
	type CreateCourseResponse = {
		title: string;
		date: string;
	}[];
	type ExemCourseRequest = {
		title: string;
		date: string;
	};
	// type ExemCourseResponse = {
	// 	saveId: number | null;
	// 	newCourse: {
	// 		title: string;
	// 		date: string;
	// 		text: string;
	// 		img: string;
	// 	};
	// }[];
	// type ExemCourseRequest = {
	// 	saveId: number | null;
	// 	newCourse: {
	// 		title: string;
	// 		date: string;
	// 		text: string;
	// 		img: string;
	// 	};
	// };
}
