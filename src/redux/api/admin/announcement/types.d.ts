/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type Table = {
		_id: number | null;
		id: string;
		content: string;
		owner: string;
		groupNames: string[];
		publishDate: string;
		endDate: string;
		isPublished: true;
	};

	type GetAnnouncementResponse = {
		announcements: Table[];
	};
	type GetAnnouncementRequest = void;

	type PostAnnouncementPropsResponse = {
		id: number;
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: number[];
		publishedDate: string;
	};
	type PostAnnouncementPropsRequest = {
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: number[];
		publishedDate: string;
	};

	type DeleteAnnouncementPropsResponse = void;
	type DeleteAnnouncementPropsRequest = number | null;

	type PutAnnouncementPropsResponse = {
		id: number;
		content: string;
		owner: string;
		groupNames: string[];
		publishDate: string;
		endDate: string;
		isPublished: true;
	};
	type PutAnnouncementPropsRequest = {
		id: number;
		editAnnouncement: {
			content: string;
			groupNames: string[];
			isPublished: true;
		};
	};

	type EditAnnouncementRequest = {
		id: number;
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: number[];
		publishedDate: string;
	};
	type EditAnnouncementResponse = {
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: number[];
		publishedDate: string;
	};
}
