import type { Result, Question } from '$lib/model';

const FOUND_COLOR = 'green';
const NOT_FOUND_COLOR = 'red';

export function grade(question: Question, value: string, maxTokenLength: number): Result {
	const { answer } = question;
	if (answer === value) {
		return {
			text: `<span style="color: ${FOUND_COLOR}">${question.text}</span>`,
			grade: question.word.length
		};
	}

	const result = gradeResult(question, maxTokenLength, value);

	return question.word.reduce((acc, part, index) => {
		const qPart = part.key;
		const found = result[index];

		const color = found ? FOUND_COLOR : NOT_FOUND_COLOR;
		acc.text = acc.text + `<span style="color: ${color}">${qPart}</span>`;
		acc.grade += found ? 1 : 0;

		return acc;
	}, { text: '', grade: 0 });
}

export function gradeAnswer(question: Question, answer: string, value: string, maxTokenLength: number): number {
	if (!value) {
		return -1;
	} else if (answer === value) {
		return 1;
	}

	const result = gradeResult(question, maxTokenLength, value);
	return result.every(value => value) ? 1 : 0;
}

function gradeResult(question: Question, maxTokenLength: number, value: string) {
	let start = 0;
	let notFound = 0;

	const result: boolean[] = [];
	question.word.forEach(part => {
		const end = start + ((notFound + 1) * maxTokenLength) - notFound;
		const slice = value.slice(start, end);
		const sliceIndex = slice.indexOf(part.value as string);

		const found = notFound === 0 ? sliceIndex === 0 : sliceIndex !== -1;
		start = start + (found ? sliceIndex + part.value.length : 1);
		notFound = found ? 0 : notFound + 1;

		result.push(found);
	});

	// last found must be at the end
	if (notFound === 0 && value.slice(start).length > 0) {
		result[result.length - 1] = false;
	}
	return result;
}
