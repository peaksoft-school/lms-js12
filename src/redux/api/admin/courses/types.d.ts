/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ADMINCOURSES {
	type Courses = {
		id: number;
		image: string | undefined;
		title: string;
		description: string;
		dateOfEnd: string;
	};
	type CoursesAdminResponse = {
		page?: number;
		size?: number;
		courses: Courses[];
	};
	type CoursesAdminRequest = {
		page: string;
		size: string;
	};
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
		newCourses: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	}[];
	type UpdateCourseRequest = {
		saveId: number | null;
		newCourses: {
			image: string | undefined;
			title: string;
			description: string;
			dateOfEnd: string;
		};
	};

	type Student = {
		id: number;
		fullName: string;
		courseName: string;
		specializationOrStudyFormat: string;
		phoneNumber: string;
		email: string;
		isBlock: false;
	};

	type GetInstructorCourseResponse = {
		page: number;
		size: number;
		saveId: number | null;
		getAllInstructorsOfCourses: Student[];
		getAllStudentsOfCourses: Student[];
	};
	type GetInstructorCourseRequest = {
		courses: number;
		pages: {
			page: number;
			size: number;
			role: string;
		};
	};
}
