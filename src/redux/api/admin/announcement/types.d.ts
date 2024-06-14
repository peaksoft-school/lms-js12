/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type Table = {
		id: number;
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
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: string[];
		publishedDate: string;
	};
	type PostAnnouncementPropsRequest = {
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: string[];
		publishedDate: string;
	};
	type DeleteAnnouncementPropsResponse = void;
	type DeleteAnnouncementPropsRequest = number | null;
	type PutAnnouncementPropsResponse = {
		announcementContent: string;
		expirationDate: string;
		targetGroupIds: number[];
		publishedDate: string;
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
		saveIdElement: number | null;
		editAnnouncementData: {
			announcementContent: string;
			expirationDate: string;
			targetGroupIds: number[];
			publishedDate: string;
		};
	};
	type EditAnnouncementResponse = {
		saveIdElement: number | null;
		editAnnouncementData: {
			announcementContent: string;
			expirationDate: string;
			targetGroupIds: number[];
			publishedDate: string;
		};
	};

	type ShowAnnouncementResponse = {
		deleteById: number;
		newAnnoun: {
			isPublished: boolean;
		};
	};
	type ShowAnnouncementRequest = {
		deleteById: number;
		newAnnoun: {
			isPublished: boolean;
		};
	};
}
