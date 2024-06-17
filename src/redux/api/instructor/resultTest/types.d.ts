/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TEST {
	type GetResultTestResponse = {
		id: number;
		studentTestResponses: {
			resultTestId: number;
			fullName: string;
			point: number;
			isPassed: boolean;
		}[];
	};
	type GetResultTestRequest = number;
}
