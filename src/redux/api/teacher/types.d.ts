/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TABLE {
	type Teacher = {
		_id?: number;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string;
		group: string;
	};

	type GetTeachersResponse = Teacher[];
	type GetTeacherRequest = void;

	type CreateTeachersResponse = {
		_id?: number;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string;
		group: string[];
	}[];
	type CreateTeacherssRequest = {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		login: string;
		specialization: string;
		group: string[];
	};
	type ChangeTeachersResponse = {
		updateTeacher: {
			firstName: string;
			lastName: string;
			email: string;
			phoneNumber: string;
			login: string;
			specialization: string;
			group: string[];
		};
	}[];

	type ChangeTeacherssRequest = {
		deleteById: number | null;
		updateTeacher: {
			firstName: string;
			lastName: string;
			email: string;
			phoneNumber: string;
			login: string;
			specialization: string;
			group: string[];
		};
	};
	type DeleteTeacherRespone = void;
	type DeleteTeacherRequest = number | null;
}
