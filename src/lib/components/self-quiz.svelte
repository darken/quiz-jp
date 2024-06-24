<script lang="ts">
	import { QuizService } from '$lib/services/quiz.service';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import GradeDisplay from '$lib/components/grade-display.svelte';
	import Tooltip from '$lib/components/tooltip.svelte';

	export let factory = new QuizService();

	const pairsLength = factory.length();
	const questions = factory.createQuiz();
	const status: number[][] = questions.map(q => q.word.map(() => 0));

	function onCharClick(questionIndex: number, charIndex: number) {
		status[questionIndex][charIndex] += 1;
		if (status[questionIndex][charIndex] > 2) status[questionIndex][charIndex] = 0;
	}

	let finalGrade: number;
	$: finalGrade = status.reduce((acc, r) => acc + r.reduce((acc, r) => acc + (r % 2), 0), 0);

	function getButtonClasses(status: number): string {
		switch (status) {
			case 1:
				return 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
			case 2:
				return 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900 dark:focus:ring-red-950';
			default:
				return 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-100 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800';
		}
	}
</script>

<ProgressBar value={finalGrade} max={pairsLength} class="-mt-4 mb-4" />

<Tooltip tooltipContent="Tap once if your answer is correct, twice if you aren't" />

<div class="columns-md pt-2">
	{#each questions as question, questionIndex}
		<div class="columns-4 py-2">
			{#each question.word as c, charIndex}
				<div>
					<button
						on:click={() => onCharClick(questionIndex, charIndex)}
						class="btn btn-xl text-3xl text-white font-medium w-full {getButtonClasses(status[questionIndex][charIndex])}"
					>
						{#if status[questionIndex][charIndex] === 0}
							{c.value}
						{:else}
							{c.key}
						{/if}
					</button>
				</div>
			{/each}
		</div>
	{/each}
</div>

<GradeDisplay value={finalGrade} max={pairsLength} />
