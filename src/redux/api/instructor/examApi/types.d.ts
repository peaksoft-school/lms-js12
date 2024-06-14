/* eslint-disable @typescript-eslint/no-unused-vars */
namespace EXAM {
	type GetExamResponse = {
		id: number;
		studentId: number;
		studentName: string;
		exams: {
			examId: number;
			examTitle: string;
			point: number;
		}[];
	}[];
	type GetExamRequest = number;

	type PostExamResponse = {
		course: number;
		examData: {
			title: string;
			examDate: string;
		};
	};

	type PostExamRequest = {
		course: number;
		examData: {
			title: string;
			examDate: string;
		};
	};
}
