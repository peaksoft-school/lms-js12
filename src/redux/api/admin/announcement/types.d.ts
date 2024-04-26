/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANNOUNCEMENT {
	type Table = {
		_id: Key | null | undefined;
		id: number;
		announcement: string;
		group: string;
	};

	type TablesAnnouncementResponse = Table[];
	type TablesAnnouncementRequest = void;

	type PostAnnouncementPropsResponse = {
		id: number;
		announcement: string;
		group: string;
	}[];
	type PostAnnouncementPropsRequest = object;
	type DeleteAnnouncementPropsResponse = number;
	type DeleteAnnouncementPropsRequest = number | null;

	type PatchAnnouncementPropsResponse = {
		id: number;
		announcement: string;
		group: string;
	};

	type PatchAnnouncementPropsRequest = {
		saveIdElement: number | null;
		editAnnouncement: {
			id: number;
			announcement: string;
			group: string;
		};
	};
	type PatchAnnouncementCompletedPropsResponse = boolean;
	type PatchAnnouncementCompletedPropsRequest = boolean;
}
