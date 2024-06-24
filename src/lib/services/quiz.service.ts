import type { Question, Entry } from '$lib/model';

export class QuizService {
	#pairs: Entry[] = [];

	length() {
		return this.#pairs.length;
	}

	add(key: string, value: string) {
		this.#pairs.push({ key, value });
	}

	set pairs(pairs: Entry[]) {
		this.#pairs = pairs;
	}

	createQuiz(answerLength = 1, wordLength = 4): Question[] {
		const remainder = [...this.#pairs];
		const words: Entry[][] = [];

		let word: Entry[] = [];
		while (remainder.length !== 0) {
			const index = Math.floor(Math.random() * remainder.length);
			const pair = remainder.splice(index, 1)[0];
			word.push(pair);

			if (word.length >= wordLength) {
				words.push(word);
				word = [];
			}
		}

		if (word.length > 0) {
			words.push(word);
		}

		const questions: Question[] = [];

		words.forEach(word => {
			const multiAnswer = answerLength > 1;
			let question: Question;
			const grades: number[] = [];
			if (multiAnswer) {
				const answer: string[] = [];
				for (let i = 0; i < answerLength; i++) {
					answer.push('');
					grades.push(-1);
				}
				question = { text: '', answer, word, grades };
			} else {
				question = { text: '', answer: '', word, result: {}, grades };
			}

			word.forEach(pair => {
				question.text += pair.key;
				if (multiAnswer) {
					for (let i = 0; i < answerLength; i++) {
						(question.answer as string[])[i] = question.answer[i] + pair.value[i];
					}
				} else {
					question.answer += pair.value as string;
				}
			});
			questions.push(question);
		});
		return questions;
	}
}

export function entryFromArray(array: string[], key = 1, value = 0) {
	return { key: array[key], value: array[value] };
}
