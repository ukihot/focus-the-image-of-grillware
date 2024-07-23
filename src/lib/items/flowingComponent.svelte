<script>
	import { css } from 'styled-system/css'
	export let text = 'Default Text'
</script>

<div
	class={css({
		display: 'inline-block',
		whiteSpace: 'nowrap',
		animation: 'slide'
	})}
>
	{text}
</div>
