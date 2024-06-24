<script lang="ts">
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 font-semibold">Welcome to quiz-jp</h2>
		<!-- Animated Logo -->
		<figure>
			<section class="img-bg" />
			<img src="/quiz-jp.svg" alt="クイズ-jp"
					 width="256" height="256"
					 class="dark:hidden"
			/>
			<img src="/quiz-jp-dark.svg" alt="クイズ-jp"
					 width="256" height="256"
					 class="hidden dark:block"
			/>
		</figure>
		<!-- / -->
		<div class="flex flex-col justify-center space-y-3">
			<a
				class="btn variant-filled"
				href="/hiragana"
			>
				Hiragana to Romaji
			</a>
			<a
				class="btn variant-filled"
				href="/katakana"
			>
				Katakana to Romaji
			</a>
			<a
				class="btn variant-filled"
				href="/romaji"
			>
				Romaji to Hiragana and Katakana
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
    figure {
        @apply flex relative flex-col;
    }

    figure svg,
    .img-bg {
        @apply w-64 h-64 md:w-80 md:h-80;
    }

    .img-bg {
        @apply absolute z-[-1] rounded-full blur-[50px] transition-all;
        animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
        glow 5s linear infinite;
    }

    @keyframes glow {
        0% {
            @apply bg-primary-400/50;
        }
        33% {
            @apply bg-secondary-400/50;
        }
        66% {
            @apply bg-tertiary-400/50;
        }
        100% {
            @apply bg-primary-400/50;
        }
    }

    @keyframes pulse {
        50% {
            transform: scale(1.5);
        }
    }
</style>
