/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GROUPS {
	type Group = {
		id: number;
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	};

	type GroupsResponse = Group[];
	type GroupsRequest = void;
	type CreateGroupResponse = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	}[];
	type CreateGroupRequest = {
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	};
	type UpdateGroupResponse = {
		saveId: number | null;
		newGroup: {
			title: string;
			dateOfEnd: string;
			description: string;
			image: string;
		};
	}[];
	type UpdateGroupRequest = {
		saveId: number | null;
		newGroup: {
			title: string;
			dateOfEnd: string;
			description: string;
			image: string;
		};
	};
}
