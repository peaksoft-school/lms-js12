/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type getResponsePresentation = {
		_id: number;
		title: string;
		presentation: string;
		discription: string;
	}[];
	type getResquestPresentation = void;

	type CreateResponsePresentation = {
		title: string;
		presentation: File | null;
		discription: string;
	}[];
	type CreateResquestPresentation = {
		title: string;
		presentation: File | null;
		discription: string;
	};
}
