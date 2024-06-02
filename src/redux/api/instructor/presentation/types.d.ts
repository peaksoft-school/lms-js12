/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TEST {
	type Test = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
	};
	type getTestResponse = {
		testResponseForGetAll: Test[];
	};
	type getTestRequest = void;

	// type getTestInsideResponse = {
	// 	title: string;
	// 	hour: number;
	// 	minute: number;
	// 	questionRequests: [
	// 		{
	// 			title: string;
	// 			point: number;
	// 			questionType: string;
	// 			optionRequests: [
	// 				{
	// 					option: string;
	// 					isTrue: boolean;
	// 				}
	// 			];
	// 		}
	// 	];
	// }[];

	type Question = {
		questionId: number;
		title: string;
		point: number;
		questionType: string;
		optionResponses;
	};

	type Option = {
		optionId: number;
		option: string;
		isTrue: boolean;
	};
	type Test = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
	};

	type getTestInsideResponse = {
		testId: number;
		title: string;
		hour: number;
		minute: number;
		questionResponseList: [
			{
				questionId: number;
				title: string;
				point: number;
				questionType: string;
				optionResponses: [
					{
						optionId: number;
						option: string;
						isTrue: boolean;
					}
				];
			}
		];
	}[];

	type getTestInsideRequest = void;

	type CreateTestResponse = {
		title: string;
		hour: number;
		minute: number;
		questionRequests: [
			{
				title: string;
				point: number;
				questionType: string;
				optionRequests: [
					{
						option: string;
						isTrue: boolean;
					}
				];
			}
		];
	}[];
	type CreateTestRequest = {
		title: string;
		hour: number;
		minute: number;
		questionRequests: [
			{
				title: string;
				point: number;
				questionType: string;
				optionRequests: [
					{
						option: string;
						isTrue: boolean;
					}
				];
			}
		];
	};
}
