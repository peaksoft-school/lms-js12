/* eslint-disable @typescript-eslint/no-unused-vars */
namespace VIDEO_LESSON {
	type VideoLessonGetResponse = {
		id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
		createdAt: number;
	};
	type VideoLessonGetResponse = {
		lessonVideoResponses: Lesson[];
	};

	type VideoLessonGetRequest = void;

	type VideoLessonPostResponse = {
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
		createdAt: number;
	};

	type VideoLessonPostRequest = {
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
		createdAt: number;
	};

	type VideoLessonPatchResponse = {
		newVideoLesson: {
			titleOfVideo: string;
			description: string;
			linkOfVideo: string;
			createdAt: number;
		};
	};

	type VideoLessonPatchRequest = {
		deleteById: number | null;
		newVideoLesson: {
			titleOfVideo: string;
			description: string;
			linkOfVideo: string;
			createdAt: number;
		};
	};

	type VideoLessonDeleteResponse = void;
	type VideoLessonDeleteRequest = number | null;
}
