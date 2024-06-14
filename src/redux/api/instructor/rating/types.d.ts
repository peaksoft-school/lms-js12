/* eslint-disable @typescript-eslint/no-unused-vars */
namespace RATING {
	type GetRatingStudentsResponse = {
		studentResponses: {
			id: number;
			fullName: string;
			lessonRatingResponses: {
				id: number;
				title: string;
				taskRatingResponses: {
					id: number;
					taskTitle: string;
					answerTaskRatingResponses: {
						id: number;
						point: number;
					};
				}[];
			}[];
			totalScore: number;
			completionPercentage: number;
		}[];
	};
	type GetRatingStudentsRequest = number;
}
