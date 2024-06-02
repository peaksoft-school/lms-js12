/* eslint-disable @typescript-eslint/no-unused-vars */
interface Course {
	id: number;
	title: string;
	description: string;
	image: string;
	dateOfEnd: string;
}
namespace STUDENTSCOURSES {
	type GetStudentsResponse = {
		page: number;
		size: number;
		courses: Course[];
	};
	type GetStudentsRequest = void;
}
