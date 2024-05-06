/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type MaterialsGetResponse = {
		_id: number;
		title: string;
		date: string;
	}[];
	type MaterialsGetRequest = void;

	type MaterialsPostResponse = {
		_id: number;
		title: string;
		date: string;
	};

	type MaterialsPostRequest = {
		title: string;
		date: string;
	};

	type MaterialsPatchResponse = {
		updateMaterial: {
			title: string;
			date: string;
		};
	};

	type MaterialsPatchRequest = {
		deleteById: number | null;
		updateMaterial: {
			title: string;
			date: string;
		};
	};

	type MaterialsDeleteResponse = void;
	type MaterialsDeleteRequest = number | null;
}
