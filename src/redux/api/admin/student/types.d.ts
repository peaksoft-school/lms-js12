/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENT {
	type Table = {
		[x: string]: ReactNode;
		_id: ReactNode;
		id: number;
		firstName: string;
		lastName: string;
		email: string;
		group: string;
		phone_number: string;
		TrainingFormat: string;
		password: string;
		isCompleted: boolean;
	};

	type TablesStudentResponse = Table[];
	type TablesStudentRequest = void;

	type PostStudentPropsResponse = {
		firstName: string;
		lastName: string;
		email: string;
		group: string;
		phone_number: string;
		TrainingFormat: string;
		password: string;
		isCompleted: boolean;
	}[];
	type PostStudentPropsRequest = object;
	type DeleteStudentPropsResponse = number;
	type DeleteStudentPropsRequest = number | null;

	type PatchStudentPropsResponse = {
		_id: number;
		firstName: string;
		lastName: string;
		email: string;
		group: string[];
		phone_number: string;
		TrainingFormat: string[];
		password: string;
		isCompleted: boolean;
	};

	type PatchStudentPropsRequest = {
		saveIdElement: number | null;
		editStudent: {
			firstName: string;
			lastName: string;
			email: string;
			group: string[];
			phone_number: string;
			TrainingFormat: string[];
			password: string;
			isCompleted: boolean;
		};
	};
	type PatchStudentCompletedPropsResponse = boolean;
	type PatchStudentCompletedPropsRequest = boolean;
}
