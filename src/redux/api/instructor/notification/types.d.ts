/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NOTIFICATION {
	type getNotificationResponse = {
		notificationId: number;
		notificationTitle: string;
		notificationDescription: string;
		notificationSendDate: string;
		notificationTaskId: number;
		isView: boolean;
	}[];
	type getNotificationRequest = void;
	type CreateCourseResponse = {
		title: string;
		date: string;
	}[];
	type ExemCourseRequest = {
		title: string;
		date: string;
	};
	// type ExemCourseResponse = {
	// 	saveId: number | null;
	// 	newCourse: {
	// 		title: string;
	// 		date: string;
	// 		text: string;
	// 		img: string;
	// 	};
	// }[];
	// type ExemCourseRequest = {
	// 	saveId: number | null;
	// 	newCourse: {
	// 		title: string;
	// 		date: string;
	// 		text: string;
	// 		img: string;
	// 	};
	// };
}
