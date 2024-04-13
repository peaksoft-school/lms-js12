/* eslint-disable @typescript-eslint/no-unused-vars */
namespace LESSON {
	interface LessonType {
		_id: number;
		title: string;
		date: string;
		text: string;
		img: string;
	}

	type GetCardsResponse = LessonType[];
	type GetCardsRequest = string | void;
}
