export type Entry = {
	key: string,
	value: string | string[],
};

export type Result = {
	text?: string,
	grade?: number,
};

export type Question = {
	text: string,
	answer: string | string[],
	word: Entry[],
	result?: Result,
	grades: number[],
};
