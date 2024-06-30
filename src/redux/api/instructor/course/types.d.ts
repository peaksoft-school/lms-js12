/* eslint-disable @typescript-eslint/no-unused-vars */
namespace InstructorCourses {
	type CoursesResponse = {
		page: number;
		size: number;
		totalPages: number;
		totalObjects: number;
		objects: {
			id: number;
			title: string;
			dateOfEnd: string;
			description: string;
			image: string;
		}[];
	};
	type CoursesRequest = {
		page: number;
		size: number;
	};

	type CoursesRequest = void;
	type CreateCourseResponse = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	}[];
}
