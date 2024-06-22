/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type GetAnnouncementStudentResponse = {
		size: string;
		page: string;
		announcements: {
			announcementId: number;
			content: string;
			author: string;
			isView: boolean;
		}[];
	};

	type GetAnnouncementStudentRequest = {
		size: string;
		page: string;
		isView: boolean;
	};
}
