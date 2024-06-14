/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MATERIALS {
	type Lesson = {
		[x: string]: number | null;
		id: number;
		title: string;
		createdAt: string;
	};
	type MaterialsGetResponse = {
		course: number;
		lessonResponses: Lesson[];
	};
	type MaterialsGetRequest = number;

	type MaterialsPostResponse = {
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

	type getResponseLinkStudents = {
		linkResponses: {
			id: number;
			title: string;
			url: string;
		}[];
	};
	type getRequestLinkStudents = number;
}
