/* eslint-disable @typescript-eslint/no-unused-vars */
namespace INSTRUCTOR {
	interface TrashType {
		id: Key | null | undefined;
		id: number;
		name: string;
		date: number;
	}

	type GetCardsResponse = { objects: TrashType[] };
	type GetCardsRequest = string | void;
}
