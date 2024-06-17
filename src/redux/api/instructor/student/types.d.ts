// import { Stack } from '@mui/material';
/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENTS {
	type Table = {
		[x: string]: ReactNode;
		id: ReactNode;
		courseName: string;
		fullName: string;
		email: string;
		// groupName: string;
		phoneNumber: string;
		specializationOrStudyFormat: string;
		isBlock: boolean;
	};

	type TablesStudentResponse = {
		getAllStudentsOfCourses: Table[];
		page: number;
		size: number;
	};
	type TablesStudentRequest = void;

	type PostStudentPropsResponse = {
		id: ReactNode;
		fullName: string;
		phoneNumber: string;
		email: string;
		specializationOrStudyFormat: string;
		isBlock: boolean;
	}[];
	type PostStudentPropsRequest = {
		id: ReactNode;
		fullName: string;
		phoneNumber: string;
		email: string;
		// groupName: string;
		specializationOrStudyFormat: string;
		isBlock: boolean;
	};

	type Student = {
		id: number;
		groupName: string;
	};
	type TableStudentResponse = {
		groups: Student[];
	};
	type TableStudentRequest = void;

	// type DeleteStudentPropsResponse = number;
	// type DeleteStudentPropsRequest = number | null;

	// type PatchStudentPropsResponse = {
	// 	id: number;
	// 	firstName: string;
	// 	lastName: string;
	// 	phoneNumber: string;
	// 	email: string;
	// 	groupName: string;
	// 	studyFormat: string;
	// 	isBlock: boolean;
	// };

	// type PatchStudentPropsRequest = {
	// 	saveIdElement: number | null;
	// 	editStudent: {
	// 		firstName: string;
	// 		lastName: string;
	// 		email: string;
	// 		groupName: string;
	// 		phoneNumber: string;
	// 		studyFormat: string;
	// 		isBlock: boolean;
	// 	};
	// };
	// type PatchStudentCompletedPropsResponse = boolean;
	// type PatchStudentCompletedPropsRequest = boolean;
}
