/* eslint-disable @typescript-eslint/no-unused-vars */
namespace GROUPS {
	type GroupResponses = {
		id: number;
		title: string;
		dateOfEnd: string;
		description: string;
		image: string;
	};

	type GroupsResponse = {
		groupResponses: GroupResponses[];
		page: number;
		size: number
	};
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
