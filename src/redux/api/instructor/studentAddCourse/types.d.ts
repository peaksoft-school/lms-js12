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
	};
	type TablesStudentRequest = void;

	type PostStudentToGroupPropsResponse = {
		course: number;
		selectedIds: number | null;
	};
	type PostStudentToGroupPropsRequest = {
		course: number;
		selectedIds: number | null;
	};

	type Student = {
		id: number;
		groupName: string;
	};
	type TableStudentResponse = Student[];
	type TableStudentRequest = {
		course: number;

		page: string;
		size: string;
	};
}
