/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type getResponsePresentation = {
		_id: number;
		title: string;
		presentation: string;
		description: string;
	}[];
	type getRequestPresentation = void;

	type CreateResponsePresentation = {
		title: string;
		presentation: File | null;
		description: string;
	}[];
	type CreateRequestPresentation = {
		title: string;
		presentation: File | null;
		description: string;
	};
}
