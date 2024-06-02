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
