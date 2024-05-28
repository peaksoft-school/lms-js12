/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENT {
	type Table = {
		[x: string]: ReactNode;
		id: ReactNode;
		fullName: string;
		email: string;
		groupName: string;
		phoneNumber: string;
		studyFormat: string;
		// password: string;
		isBlock: boolean;
	};

	type TablesStudentResponse = {
		students: Table[];
		page: number;
		size: number;
	};
	type TablesStudentRequest = void;

	type PostStudentPropsResponse = {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		groupName: string;
		studyFormat: string;
		// password: string;
		isBlock: boolean;
	}[];
	type PostStudentPropsRequest = object;
	type DeleteStudentPropsResponse = number;
	type DeleteStudentPropsRequest = number | null;

	type PatchStudentPropsResponse = {
		id: number;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		groupName: string[];
		studyFormat: string[];
		// password: string;
		isBlock: boolean;
	};

	type PatchStudentPropsRequest = {
		saveIdElement: number | null;
		editStudent: {
			firstName: string;
			lastName: string;
			email: string;
			groupName: string[];
			phoneNumber: string;
			studyFormat: string[];
			// password: string;
			isBlock: boolean;
		};
	};
	type PatchStudentCompletedPropsResponse = boolean;
	type PatchStudentCompletedPropsRequest = boolean;
}
