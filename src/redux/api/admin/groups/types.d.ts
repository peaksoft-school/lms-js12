/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GROUPS {
	type Group = {
		id: number;
		title: string;
		date: string;
		text: string;
		img: string;
	};

	type GroupsResponse = Group[];
	type GroupsRequest = void;
	type CreateGroupResponse = {
		title: string;
		date: string;
		text: string;
		img: string;
	}[];
	type CreateGroupRequest = {
		title: string;
		date: string;
		text: string;
		img: string;
	};
	type UpdateGroupResponse = {
		saveId: number | null;
		newGroup: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	}[];
	type UpdateGroupRequest = {
		saveId: number | null;
		newGroup: {
			title: string;
			date: string;
			text: string;
			img: string;
		};
	};
}
