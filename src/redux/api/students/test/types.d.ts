namespace STUDENTTEST {
	type TestResponseForGetAll = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
	};

	type GetTestsResponse = {
		testResponseForGetAll: TestResponseForGetAll[];
	};
	type GetTestsRequest = void;
	// ************************************************
	type QuestionResponseList = {
		questionId: number;
		title: string;
		point: number;
		questionType: string;
		optionResponses: OptionResponse[];
	};

	type OptionResponse = {
		optionId: number;
		option: string;
		isTrue: boolean;
	};

	type GetQuestionTestsResponse = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
		questionResponseList: QuestionResponseList[];
	};

	type GetQuestionTestsRequest = void;
	// **********************************************
	// type AnswerQuestionResponse = {
	// 	questionId: number;
	// 	questionTitle: string;
	// 	questionType: string;
	// 	answerOptionResponses: AnswerOptionResponse[];
	// 	point: number;
	// };

	// type AnswerOptionResponse = {
	// 	optionId: number;
	// 	option: string;
	// 	yourChoice: boolean;
	// 	true: boolean;
	// };

	// type GetResultTestResponse = {
	// 	testId: number;
	// 	testTitle: string;
	// 	answerQuestionResponses: AnswerQuestionResponse[];
	// 	totalPoint: number;
	// };

	// type GetResultTestRequest = void;
}
