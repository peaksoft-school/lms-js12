/* eslint-disable @typescript-eslint/no-unused-vars */
namespace COURSES {
	type CoursesResponse = {
		_id: number;
		file: File | undefined;
		title: string;
		description: string;
		dedline: Dayjs | null | undefined;
	}[];
	type CoursesRequest = void;
	type CreateCourseResponse = {
		newCourse: {
			file: File | undefined;
			title: string;
			description: string;
			dedline: Dayjs | null | undefined;
		};
	}[];
	type CreateCourseRequest = {
		file: File | undefined;
		title: string;
		description: string;
		dedline: Dayjs | null | undefined;
	};
	type UpdateCourseResponse = {
		saveId: string | null;
		newCourse: {
			file: File | undefined;
			title: string | undefined;
			description: string | undefined;
			dedline: Dayjs | null | undefined;
		};
	}[];
	type UpdateCourseRequest = {
		saveId: string | null;
		newCourse: {
			file: File | undefined;
			title: string | undefined;
			description: string | undefined;
			dedline: Dayjs | null | undefined;
		};
	};
}
