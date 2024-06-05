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
}
