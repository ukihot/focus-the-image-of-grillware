<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import Header from '$lib/items/Header.svelte'
	import '../app.css'
	import { onMount } from 'svelte'

	// タイルの型を定義する
	type Tile = {
		col: number
		row: number
		width: number
		height: number
		color: string
	}

	// 白に近い色の16進数のランダム生成関数
	function randomHexWhiteColor() {
		const minBrightness = 239 // 最小の明るさ
		const maxBrightness = 255 // 最大の明るさ
		const range = maxBrightness - minBrightness

		// 各色の明るさをランダムに決定する
		const r = Math.floor(minBrightness + Math.random() * range)
		const g = Math.floor(minBrightness + Math.random() * range)
		const b = Math.floor(minBrightness + Math.random() * range)

		// RGB を 16進数に変換して返す
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
	}

	let tiles: Tile[] = []

	// 初回のみタイルを計算する関数
	function calculateTilesOnce() {
		const minSize = 30 // タイルの最小サイズ（ピクセル単位）
		const maxSize = 70 // タイルの最大サイズ（ピクセル単位）
		const numCols = Math.ceil(window.innerWidth / minSize)
		const numRows = Math.ceil(window.innerHeight / minSize)

		tiles = Array.from({ length: numCols * numRows }, (_, index) => {
			const col = index % numCols
			const row = Math.floor(index / numCols)
			const width = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
			const height = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
			const color = randomHexWhiteColor()
			return { col, row, width, height, color }
		})
	}

	onMount(() => {
		// ページ読み込み時に初回のみ計算を行う
		calculateTilesOnce()

		// リサイズイベントをリッスンしてキャッシュを利用する
		window.addEventListener('resize', () => {
			// 既にタイルが計算されていれば再計算しない
			if (tiles.length === 0) {
				calculateTilesOnce()
			}
		})

		return () => {
			// コンポーネントがアンマウントされるときにリスナーを解除
			window.removeEventListener('resize', calculateTilesOnce)
		}
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div class="container">
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>&copy; 2024 GRILLWARE, Inc. All rights reserved.</p>
	</footer>
</div>
<!-- タイルを描画する背景 -->
<div class="background">
	{#each tiles as { col, row, width, height, color }}
		<div
			class="tile"
			style="left: {col * 50}px; top: {row *
				50}px; width: {width}px; height: {height}px; --color: {color}"
		></div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	header,
	footer {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;
	}

	header {
		background-color: #f8f9fa; /* 任意の背景色 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* ヘッダーの影 */
		view-transition-name: header;
	}

	main {
		flex: 1;
	}

	footer {
		background-color: #333; /* フッターの背景色 */
		color: #fff; /* フッターの文字色 */
		text-align: center; /* 中央揃え */
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1; /* メインコンテンツの下に配置 */
	}

	.tile {
		position: absolute;
		background-color: var(--color);
		border-radius: 10px;
	}
</style>
