/* eslint-disable @typescript-eslint/no-unused-vars */
namespace COURSES {
	type CoursesResponse = {
		id: number;
		title: string;
		date: string;
		text: string;
		img: string;
	}[];
	type CoursesRequest = void;
	type CreateCourseResponse = {
		title: string;
		date: string;
		text: string;
		img: string;
	}[];
	type CreateCourseRequest = {
		title: string;
		date: string;
		text: string;
		img: string;
	};
	type UpdateCourseResponse = {
		saveId: number | null;
		newCourse: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	}[];
	type UpdateCourseRequest = {
		saveId: number | null;
		newCourse: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	};
}
