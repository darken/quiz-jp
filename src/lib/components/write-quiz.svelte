<script lang="ts">
	import { type Question } from '$lib/model';
	import { QuizService } from '$lib/services/quiz.service';
	import { gradeAnswer } from '$lib/services/grading.service';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import GradeDisplay from '$lib/components/grade-display.svelte';
	import Tooltip from './tooltip.svelte';

	export let factory = new QuizService();
	export let maxTokenLength = 3;

	const questions = factory.createQuiz(2);
	const questionsLength = questions.length;

	function onAnswerChange(ansIndex: number, question: Question, index: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.toLowerCase();
		(question.result as number[])[ansIndex] = gradeAnswer(question, question.answer[ansIndex], value, maxTokenLength);
		questions[index] = question;
	}

	let finalGrade: number;
	$: finalGrade = questions.reduce((acc, q) => acc + (q.grades.every(v => v === 1) ? 1 : 0), 0);

	function resultBorder(result: number | undefined) {
		switch (result) {
			case -1:
				return 'border-gray-300 dark:border-gray-600';
			case 0:
				return 'border-red-500 dark:border-red-700';
			case 1:
				return 'border-blue-500 dark:border-blue-700';
		}
	}
</script>

<ProgressBar value={finalGrade} max={questionsLength} class="-mt-4 mb-4" />

<Tooltip tooltipContent="Use a japanese keyboard or handwriting keyboard" />

<div class="sm:columns-2 lg:columns-3 xl:columns-4 pt-2">
	{#each questions as question, index}
		<div class="columns-1 py-2">
			<div>
				<h2 class="text-5xl font-bold mb-2 md:mb-0">
					{question.text}
				</h2>
			</div>
			<div class="mt-3 pr-4">
				<input type="text" maxlength="{question.word.length * maxTokenLength}" placeholder="hiragana"
							 class="bg-gray-50 border text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
							 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
							 {resultBorder(question.grades[0])}"
							 on:change={(e) => onAnswerChange(0, question, index, e)}>
			</div>
			<div class="mt-3 pr-4">
				<input type="text" maxlength="{question.word.length * maxTokenLength}" placeholder="katakana"
							 class="bg-gray-50 border text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
							 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
							 {resultBorder(question.grades[1])}"
							 on:change={(e) => onAnswerChange(1, question, index, e)}>
			</div>
		</div>
	{/each}
</div>

<GradeDisplay value={finalGrade} max={questionsLength} />
