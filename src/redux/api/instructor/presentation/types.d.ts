/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type getResponsePresentation = {
		id: number;
		title: string;
		file: string;
		description: string;
	}[];
	type getRequestPresentation = void;

	type CreateResponsePresentation = {
		lessonId: number;
		newPresentation: {
			title: string;
			file: string;
			description: string;
		}[];
	};
	type CreateRequestPresentation = {
		lessonId: number;
		newPresentation: {
			title: string;
			file: string;
			description: string;
		};
	};
}
