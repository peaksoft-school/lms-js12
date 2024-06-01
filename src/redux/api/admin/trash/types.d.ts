/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TRASH {
	interface TrashType {
		id: Key | null;
		id: number;
		name: string;
		date: number;
	}

	type GetCardsResponse = { trashResponses: TrashType[] };
	type GetCardsRequest = string | void;
}
