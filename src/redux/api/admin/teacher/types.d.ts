/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TABLE {
	type Teacher = {
		id?: number;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string[];
		group: string;
	};

	type GetTeachersResponse = Teacher[];
	type GetTeacherRequest = void;

	type CreateTeachersResponse = {
		id?: number;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string[];
		group: string[];
	}[];
	type CreateTeachersRequest = {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string[];
		group: string[];
	};
	type ChangeTeachersResponse = {
		updateTeacher: {
			firstName: string;
			lastName: string;
			email: string;
			phoneNumber: string;
			login: string;
			specialization: string[];
			group: string[];
		};
	}[];

	type ChangeTeachersRequest = {
		deleteById: number | null;
		updateTeacher: {
			firstName: string;
			lastName: string;
			email: string;
			phoneNumber: string;
			login: string;
			specialization: string[];
			group: string[];
		};
	};
	type DeleteTeacherResponse = void;
	type DeleteTeacherRequest = number | null;
}
