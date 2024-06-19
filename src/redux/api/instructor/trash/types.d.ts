/* eslint-disable @typescript-eslint/no-unused-vars */
namespace INSTRUCTOR {
	interface TrashType {
		id: Key | null | undefined;
		id: number;
		name: string;
		date: number;
	}

	type GetCardsResponse = { trashResponses: TrashType[] };
	type GetCardsRequest = string | void;
}
