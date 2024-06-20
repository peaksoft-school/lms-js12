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
		isBlock: boolean;
	};

	type TablesStudentResponse = {
		page: string;
		size: string;
		students: Table[];
	};
	type TablesStudentRequest = {
		page: string;
		size: string;
	};
	type TableGetAllGroupResponse = {
		id: number;
		groupName: string;
	}[];
	type TablesGetAllGroupRequest = void;

	type PostStudentPropsResponse = {
		newStudent: {
			firstName: string;
			lastName: string;
			phoneNumber: string;
			email: string;
			groupName: string;
			studyFormat: string;
			isBlock: boolean;
		};

		newData: {
			link: string;
		};
	}[];

	type PostStudentPropsRequest = {
		newStudent: {
			firstName: string;
			lastName: string;
			phoneNumber: string;
			email: string;
			groupName: string;
			studyFormat: string;
			isBlock: boolean;
		};
		newData: {
			link: string;
		};
	};
	type DeleteStudentPropsResponse = number;
	type DeleteStudentPropsRequest = number | null;

	type PatchStudentPropsResponse = {
		id: number;
		firstName: string;
		lastName: string;
		phoneNumber: string;
		email: string;
		groupName: string;
		studyFormat: string;
		isBlock: boolean;
	};

	type PatchStudentPropsRequest = {
		saveIdElement: number | null;
		editStudent: {
			firstName: string;
			lastName: string;
			email: string;
			groupName: string;
			phoneNumber: string;
			studyFormat: string;
			// isBlock: boolean;
		};
	};
	type PatchStudentCompletedPropsResponse = boolean;
	type PatchStudentCompletedPropsRequest = boolean;
}
