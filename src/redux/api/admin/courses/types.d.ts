/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADMINCOURSES {
	type CoursesAdminResponse = {
		_id: number;
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: Dayjs | null | undefined;
	}[];
	type CoursesAdminRequest = void;
	type CreateAdminCourseResponse = {
		newCourse: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: Dayjs | null | undefined;
		};
	}[];
	type CreateAdminCourseRequest = {
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: Dayjs | null | undefined;
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
