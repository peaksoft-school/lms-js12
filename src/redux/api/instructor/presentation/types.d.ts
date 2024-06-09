/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PRESENTATION {
	type getResponsePresentation = {
		id: number;
		title: string;
		file: string | File;
		description: string;
	}[];
	type getRequestPresentation = number;

	type CreateResponsePresentation = {
		lessonId: number;
		presentationData: {
			title: string;
			file: string | File;
			description: string;
		}[];
	};
	type CreateRequestPresentation = {
		lessonId: number;
		presentationData: {
			title: string;
			file: string | File;
			description: string;
		};
	};
}
