/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type Table = {
		id: Key | null;
		id: number;
		announcement: string;
		group: string;
		show: boolean;
	};

	type TablesAnnouncementResponse = Table[];
	type TablesAnnouncementRequest = void;

	type PostAnnouncementPropsResponse = {
		id: number;
		announcement: string;
		group: string;
	}[];
	type PostAnnouncementPropsRequest = {
		announcement: string;
		group: string[];
		show: boolean;
	};

	type DeleteAnnouncementPropsResponse = void;
	type DeleteAnnouncementPropsRequest = number | null;

	type PatchAnnouncementPropsResponse = {
		editAnnouncement: {
			id: number;
			announcement: string;
			group: string[];
			show: boolean;
		};
	}[];

	type PatchAnnouncementPropsRequest = {
		saveIdElement: number | null;
		editAnnouncement: {
			announcement: string;
			group: string[];
			show: boolean;
		};
	};
}
