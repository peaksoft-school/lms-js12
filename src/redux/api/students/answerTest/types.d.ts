namespace ANSWERTEST {
	type AnswerQuestionResponse = {
		questionId: number;
		questionTitle: string;
		questionType: string;
		answerOptionResponses: AnswerOptionResponse[];
		point: number;
	};

	type AnswerOptionResponse = {
		optionId: number;
		option: string;
		yourChoice: boolean;
		true: boolean;
	};

	type GetResultTestResponse = {
		testId: number;
		testTitle: string;
		answerQuestionResponses: AnswerQuestionResponse[];
		totalPoint: number;
	};

	type GetResultTestRequest = void;
}
