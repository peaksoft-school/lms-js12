/* eslint-disable @typescript-eslint/no-unused-vars */
namespace STUDENTTEST {
	type TestGetResponse = {
		testResponseForGetAll: {
			testId: number;
			title: string;
			hour: number;
			minute: number;
		}[];
	};
	type TestGetRequest = number;

	type TestGetResultResponse = {
		testResponseResultTest: {
			testId: 0;
			testTitle: string;
			answerQuestionResponses: {
				questionId: number;
				questionTitle: string;
				questionType: string;
				answerOptionResponses: {
					optionId: number;
					option: string;
					yourChoice: boolean;
					true: boolean;
				}[];

				point: number;
			}[];

			totalPoint: number;
		}[];
	};
	type TestGetResultRequest = number;
}
