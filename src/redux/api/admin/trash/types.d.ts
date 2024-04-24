/* eslint-disable @typescript-eslint/no-unused-vars */
namespace TRASH {
	interface TrashType {
		id: Key | null | undefined;
		_id: number;
		name: string;
		date: number;
	}

	type GetCardsResponse = TrashType[];
	type GetCardsRequest = string | void;
}
