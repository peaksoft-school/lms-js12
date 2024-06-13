/* eslint-disable @typescript-eslint/no-unused-vars */
namespace INSTRUCTORTASK {
	type TaskResponse = {
		id: number;
		title: string;
		description: string!;
		file: File | undefined;
		deadline: Dayjs | null | undefined;
	};
	type TaskRequest = void;

	type GetStudentResultResponse = {
		answerTasId: number;
		studentName: string;
	}[];
	type GetStudentResultRequest = {
		answerTasId: number;
		studentName: string;
	};
}

export type GetTaskResultResponse = TASK.ResultResponse;
