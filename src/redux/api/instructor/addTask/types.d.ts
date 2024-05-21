/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TASK {
	type TaskResponse = {
		_id: number;
		title: string;
		description: string;
		file: File | undefined;
		dedline: Dayjs | null | undefined;
	}[];
	type TaskRequest = void;
	type CreateTaskResponse = {
		_id: number;
		title: string;
		description: string;
		file: File | undefined;
		dedline: Dayjs | null | undefined;
	}[];
	type CreateTaskRequest = {
		title: string;
		description: string;
		file: File | undefined;
		dedline: Dayjs | null | undefined;
	};
	type UpdateTaskResponse = {
		task: number | null;
		newtask: {
			title: string;
			description: string;
			file: File | undefined;
			dedline: Dayjs | null | undefined;
		};
	}[];
	type UpdateTaskRequest = {
		task: number | null;
		newtask: {
			title: string;
			description: string;
			file: File | undefined;
			dedline: Dayjs | null | undefined;
		};
	};
}
