/* eslint-disable @typescript-eslint/no-unused-vars */
namespace VIDEO_LESSON {
	type VideoLessonGetResponse = {
		_id: number;
		title: string;
		description: string;
		link: string;
	}[];

	type VideoLessonGetRequest = void;

	type VideoLessonPostResponse = {
		title: string;
		description: string;
		link: string;
	};

	type VideoLessonPostRequest = {
		title: string;
		description: string;
		link: string;
	};

	type VideoLessonPatchResponse = {
		newVideoLesson: {
			title: string;
			description: string;
			link: string;
		};
	};

	type VideoLessonPatchRequest = {
		deleteById: number | null;
		newVideoLesson: {
			title: string;
			description: string;
			link: string;
		};
	};

	type VideoLessonDeleteResponse = void;
	type VideoLessonDeleteRequest = number | null;
}
