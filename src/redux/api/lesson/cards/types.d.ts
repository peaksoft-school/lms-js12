type Card = {
	[x: string];
	id: number;
	title: string;
	date: string;
	text: string;
	img: string;
};

type CardsResponse = Card[];
type CardsRequest = void;
