<script lang="ts">
	import WriteTest from '$lib/components/write-quiz.svelte';
	import { QuizService } from '$lib/services/quiz.service';
	import { hiragana, katakana } from '$lib/data';
	import type { Entry } from '$lib/model';

	const pairs: Entry[] = Object.entries(hiragana.basic)
		.map(e => {
			const k: string = (katakana.basic[e[0]] as string);
			return { key: e[0], value: [e[1], k] };
		});

	const factory = new QuizService();
	factory.pairs = pairs;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 font-semibold">Rōmaji - ローマ字</h2>
		<div>
			<WriteTest factory={factory} />
		</div>
	</div>
</div>
