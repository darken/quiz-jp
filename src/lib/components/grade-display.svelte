<script lang="ts">
	export let value = 0;
	export let max = 0;
</script>

<div class="my-6">
	<div class="inline-block">
		<h2 class="text-4xl font-semibold">Grade</h2>
	</div>
	<div class="inline-block pl-2">
		<span class="text-3xl bg-transparent">{Math.trunc(100 * value / max)}%</span>
	</div>
</div>
