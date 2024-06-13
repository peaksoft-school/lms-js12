/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TASK {
	type TaskResponse = {
		id: number;
		title: string;
		description: string!;
		file: File | undefined;
		deadline: Dayjs | null | undefined;
	}[];
	type TaskRequest = void;
	type CreateTaskResponse = {
		id: number;
		title: string;
		description: string!;
		file: File | undefined;
		deadline: Dayjs | null | undefined;
	}[];
	type CreateTaskRequest = {
		title: string;
		description: string!;
		file: File | undefined;
		deadline: Dayjs | null | undefined;
	};
	type Base64Image = `data:image/${'jpeg' | 'png' | 'gif'};base64,${string}`;

	type UpdateTaskResponse = {
		getTaskId: string | null;
		newtask: {
			title: string;
			description: string!;
			file: File | undefined;
			deadline: Dayjs | null | undefined;
		};
	}[];
	type UpdateTaskRequest = {
		getTaskId: string | null;
		newtask: {
			title: string;
			description: string!;
			file: File | undefined;
			deadline: Dayjs | null | undefined;
		};
	};
	type getTask = {
		resultTask: string | null;
		text: string;
		description: string!;
		file: File | undefined;
		image: string;
		point: number;
		taskAnswerStatus: 'Late';
		comment: {
			author: string;
			role: string;
			content: string;
		}[];
	};

	type patchTaskResponse = {
		point: number;
		comment: string;
		isAccept: true;
	};
}
