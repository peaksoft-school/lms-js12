/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PRESENTATIONS {
	type PresentationsGetResponse = {
		_id: number;
		title: string;
		description: string;
		file: string;
	}[];
	type PresentationsGetRequest = void;

	type PresentationsPostResponse = {
		_id: number;
		title: string;
		description: string;
		file: string;
	};

	type PresentationsPostRequest = {
		title: string;
		description: string;
		file: string;
	};

	type PresentationsPatchResponse = {
		updatePresentation: {
			title: string;
			description: string;
			file: string;
		};
	};

	type PresentationsPatchRequest = {
		deleteById: number | null;
		updatePresentation: {
			title: string;
			description: string;
			file: string;
		};
	};

	type PresentationsDeleteResponse = void;
	type PresentationsDeleteRequest = number | null;
}
