/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type Lesson = {
		id: number;
		title: string;
		createdAt: string;
	};
	type MaterialsGetResponse = {
		lessonResponses: Lesson[];
	};
	type MaterialsGetRequest = void;

	type MaterialsPostResponse = {
		id: number;
		title: string;
		createdAt: string;
	};

	type MaterialsPostRequest = {
		title: string;
		createdAt: string;
	};

	type MaterialsPatchResponse = {
		updateMaterial: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsPatchRequest = {
		deleteById: number | null;
		updateMaterial: {
			title: string;
			createdAt: string;
		};
	};

	type MaterialsDeleteResponse = void;
	type MaterialsDeleteRequest = number | null;
}
