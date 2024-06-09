/* eslint-disable @typescript-eslint/no-unused-vars */
namespace VIDEO_LESSON {
	type VideoLessonGetResponse = {
		id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	}[];

	type VideoLessonGetRequest = number;

	type VideoIDGetResponse = {
		id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	};

	type VideoIDGetRequest = number;

	type VideoLessonPostResponse = {
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	};

	type VideoLessonPostRequest = {
		lessonId: number;
		postData: {
			titleOfVideo: string;
			description: string;
			linkOfVideo: string;
		};
	};

	type VideoLessonPatchResponse = {
		newVideoLesson: {
			titleOfVideo: string;
			description: string;
			linkOfVideo: string;
		};
	};

	type VideoLessonPatchRequest = {
		saveIdElement: number;
		newVideoLesson: {
			titleOfVideo: string;
			description: string;
			linkOfVideo: string;
		};
	};

	type VideoLessonDeleteResponse = void;
	type VideoLessonDeleteRequest = number;
}
