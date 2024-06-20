/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TABLE {
	type Teacher = {
		id: number | null;
		fullName: string;
		login: string;
		specialization: string;
		email: string;
		phoneNumber: string;
	};

	type GetTeachersResponse = {
		instructorResponses: Teacher[];
		page: string;
		size: string;
	};
	type GetTeacherRequest = {
		page: string;
		size: string;
	};

	type CreateTeachersResponse = {
		firstName: string;
		lastName: string;
		specialization: string;
		email: string;
		phoneNumber: string;
		linkForPassword: string;
	}[];
	type CreateTeachersRequest = {
		firstName: string;
		lastName: string;
		specialization: string;
		email: string;
		phoneNumber: string;
		linkForPassword: string;
	};
	type ChangeTeachersResponse = {
		updateTeacher: {
			firstName: string;
			lastName: string;
			specialization: string;
			email: string;
			phoneNumber: string;
			courseIds: string;
		};
	}[];

	type ChangeTeachersRequest = {
		deleteById: number | null;
		updateTeacher: {
			firstName: string;
			lastName: string;
			specialization: string;
			email: string;
			phoneNumber: string;
			courseIds: string;
		};
	};
	type DeleteTeacherResponse = void;
	type DeleteTeacherRequest = number | null;

	type appointAllTeacherResponse = {
		Id: number;
		instructorName: string;
	}[];
	type appointAllTeacherRequest = void;
}
