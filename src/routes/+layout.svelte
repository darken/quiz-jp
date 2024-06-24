<script lang="ts">
	/* eslint-disable svelte/no-at-html-tags */
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/sidebar.svelte';
	import { initializeStores, getDrawerStore, Drawer } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();
	const drawerStore = getDrawerStore();
</script>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
</svelte:head>

<Drawer width="w-fit">
	<Sidebar />
</Drawer>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="btn-icon btn-icon-sm lg:hidden mx-2" on:click={() => drawerStore.open()}>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
							 stroke="currentColor" class="size-8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
					</svg>
				</button>
				<a href="/" class="ms-2.5">
					<img src="/quiz-jp.svg" alt="クイズ-jp"
							 width="32" height="32"
							 class="dark:hidden"
					/>
					<img src="/quiz-jp-dark.svg" alt="クイズ-jp"
							 width="32" height="32"
							 class="hidden dark:block"
					/>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ringed-surface"
					href="/results"
					rel="noreferrer"
				>
					Results
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="h-full hidden lg:block">
			<Sidebar />
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="m-10">
		<slot />
	</div>
</AppShell>
