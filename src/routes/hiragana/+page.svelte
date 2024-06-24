<script lang="ts">
	import InputTest from '$lib/components/input-quiz.svelte';
	import SelfTest from '$lib/components/self-quiz.svelte';
	import { QuizService, entryFromArray } from '$lib/services/quiz.service';
	import { hiragana } from '$lib/data';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type { Entry } from '$lib/model';

	let tabSet: number = 0;

	const pairs: Entry[] = Object.entries(hiragana.basic).map(e => entryFromArray(e));
	const factory = new QuizService();
	factory.pairs = pairs;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 font-semibold">ひらがな - Hiragana</h2>

		<TabGroup justify="justify-center">
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>Input</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>
				Self
			</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<InputTest factory={factory} />
				{:else if tabSet === 1}
					<SelfTest factory={factory} />
				{/if}
			</svelte:fragment>
		</TabGroup>

	</div>
</div>
