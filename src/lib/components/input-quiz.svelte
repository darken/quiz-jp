<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import type { Question } from '$lib/model';
	import { grade } from '$lib/services/grading.service';
	import { QuizService } from '$lib/services/quiz.service';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import GradeDisplay from './grade-display.svelte';

	export let factory = new QuizService();
	export let maxTokenLength = 3;

	const pairsLength = factory.length();
	const questions = factory.createQuiz();

	function onAnswerChange(question: Question, index: number, event: Event) {
		const value = (event.target as HTMLInputElement).value.toLowerCase();
		question.result = grade(question, value, maxTokenLength);
		questions[index] = question;
	}

	let finalGrade: number;
	$: finalGrade = questions.reduce((acc, r) => acc + (r.result?.grade || 0), 0);
</script>

<ProgressBar value={finalGrade} max={pairsLength} class="-mt-4 mb-8" />

<div class="flex flex-wrap flex-row gap-8 justify-center">
	{#each questions as question, index}
		<label class="label w-40">
			<span class="text-4xl font-bold mb-2 md:mb-0">
			{#if !!question.result?.text}
				{@html question.result?.text}
			{:else}
				{question.text}
			{/if}
			</span>
			<input
				class="input" type="text"
				autocomplete="off" spellcheck="false"
				maxlength={question.word.length * maxTokenLength}
				on:change={(e) => onAnswerChange(question, index, e)}
			>
		</label>
	{/each}
</div>

<GradeDisplay value={finalGrade} max={pairsLength} />
