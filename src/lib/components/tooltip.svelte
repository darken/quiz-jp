<script lang="ts">
	import { computePosition, offset, arrow, shift, autoUpdate } from '@floating-ui/dom';

	export let tooltipContent = '';

	let button: HTMLButtonElement;
	let tooltip: HTMLDivElement;
	let arrowEl: HTMLDivElement;

	let tooltipVisible = false;

	const showTooltip = () => {
		tooltipVisible = true;
		computePosition(button, tooltip, {
			placement: 'top', // Set the placement to top
			middleware: [
				offset(47),
				arrow({ element: arrowEl }),
				shift()
			]
		}).then(({ x, y, placement, middlewareData }) => {
			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`
			});

			const arrowOffset = middlewareData.arrow;
			const side = placement.split('-')[0];
			const staticSide = {
				top: 'bottom',
				right: 'left',
				bottom: 'top',
				left: 'right'
			}[side];

			Object.assign(arrowEl.style, {
				left: arrowOffset?.x ? `${arrowOffset.x}px` : '',
				top: arrowOffset?.y ? `${arrowOffset.y}px` : '',
				[staticSide]: '4px'
			});
		});

		autoUpdate(button, tooltip, () => {
			computePosition(button, tooltip, {
				placement: 'top', // Set the placement to top
				middleware: [
					offset(7),
					arrow({ element: arrowEl }),
					shift()
				]
			}).then(({ x, y, placement, middlewareData }) => {
				Object.assign(tooltip.style, {
					left: `${x}px`,
					top: `${y}px`
				});

				const arrowOffset = middlewareData.arrow;
				const side = placement.split('-')[0];
				const staticSide = {
					top: 'bottom',
					right: 'left',
					bottom: 'top',
					left: 'right'
				}[side];

				Object.assign(arrowEl.style, {
					left: arrowOffset?.x ? `${arrowOffset.x}px` : '',
					top: arrowOffset?.y ? `${arrowOffset.y}px` : '',
					[staticSide]: '-4px'
				});
			});
		});
	};

	const hideTooltip = () => {
		tooltipVisible = false;
	};
</script>

<div>
	<button
		bind:this={button} on:mouseenter={showTooltip} on:mouseleave={hideTooltip}
		class="btn-icon btn-icon-sm variant-glass text-xl font-semibold"
	>
		?
	</button>

	<div class="tooltip variant-filled-tertiary" bind:this={tooltip} data-show={tooltipVisible}>
		{tooltipContent}
		<div class="arrow variant-filled-tertiary" bind:this={arrowEl}></div>
	</div>
</div>

<style>
    .tooltip {
        /*absolute bg-secondary-300-600-token p-2 rounded text-sm whitespace-nowrap z-10*/
        /*@apply absolute bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap;*/
        position: absolute;
        padding: 5px 10px;
        border-radius: 4px;
        white-space: nowrap;
        z-index: 10;
        transition: opacity 0.3s;
    }

    .tooltip[data-show="true"] {
        opacity: 1;
        pointer-events: auto;
    }

    .tooltip[data-show="false"] {
        opacity: 0;
        pointer-events: none;
    }

    .arrow {
        position: absolute;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        z-index: -1;
    }
</style>
