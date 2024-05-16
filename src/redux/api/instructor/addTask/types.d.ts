/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TASK {
	type TaskResponse = {
		id: number;
		title: string;
		date: string;
		text: string;
		img: string;
	}[];
	type TaskRequest = void;
	type CreateTaskResponse = {
		title: string;
		date: string;
		text: string;
		img: string;
	}[];
	type CreateTaskRequest = {
		title: string;
		date: string;
		text: string;
		img: string;
	};
	type UpdateTaskResponse = {
		task: number | null;
		newtask: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	}[];
	type UpdateTaskRequest = {
		task: number | null;
		newtask: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	};
}
