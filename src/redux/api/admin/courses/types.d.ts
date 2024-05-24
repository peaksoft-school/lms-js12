/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADMINCOURSES {
	type CoursesAdminResponse = {
		id: number;
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: string;
	}[];
	type CoursesAdminRequest = void;
	type CreateAdminCourseResponse = {
		newCourse: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	}[];
	type CreateAdminCourseRequest = {
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: string;
	};
	type UpdateCourseResponse = {
		saveId: number | null;
		newCourse: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: Dayjs | null | undefined;
		};
	}[];
	type UpdateCourseRequest = {
		saveId: number | null;
		newCourse: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: Dayjs | null | undefined;
		};
	};
}
