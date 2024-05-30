/* eslint-disable @typescript-eslint/no-unused-vars */
namespace VIDEO_LESSON {
	type VideoLessonGetResponse = {
		_id: number;
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	}[];

	type VideoLessonGetRequest = void;

	type VideoLessonPostResponse = {
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	};

	type VideoLessonPostRequest = {
		titleOfVideo: string;
		description: string;
		linkOfVideo: string;
	};

	type VideoLessonPatchResponse = {
		newVideoLesson: {
			titleOfVideo: string;
		description: string;
		linkOfVideo: string;
		};
	};

	type VideoLessonPatchRequest = {
		deleteById: number | null;
		newVideoLesson: {
			titleOfVideo: string;
		description: string;
		linkOfVideo: string;
		};
	};
  
	type VideoLessonDeleteResponse = void;
	type VideoLessonDeleteRequest = number | null;
}
