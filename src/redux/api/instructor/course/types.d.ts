/* eslint-disable @typescript-eslint/no-unused-vars */
namespace InstructorCourses {
	type CoursesResponse = {
		courses: {
			id: number;
			title: string;
			dateOfEnd: string;
			description: string;
			image: string;
		}[];
	};
	type CoursesRequest = void;
	type CoursesRequest = {
		page: number;
		size: string;
	};
	type CoursesRequest = void;
	type CreateCourseResponse = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	}[];
}
