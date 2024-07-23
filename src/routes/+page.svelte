<script>
	import FlowingComponent from '$lib/items/flowingComponent.svelte'
	import { css } from 'styled-system/css'
</script>

<div
	class={css({
		display: 'grid',
		gridTemplateColumns: 'repeat(1, 1fr)',
		gap: '2rem',
		fontFamily: 'basic'
	})}
>
	<section
		class={css({
			padding: '2rem',
			backgroundColor: 'white',
			borderRadius: '8px',
			boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
		})}
	>
		<h2>App 1</h2>
		<p>Description of App 1</p>
	</section>

	<section
		class={css({
			padding: '2rem',
			backgroundColor: 'white',
			borderRadius: '8px',
			boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
		})}
	>
		<h2>App 2</h2>
		<p>Description of App 2</p>
	</section>

	<FlowingComponent text="Welcome to the Retro Web!" />
</div>
