<script>
	import MenuButton from '../menu-button/menu-button.svelte'
	import Link from '../link/link.svelte'
	import Icon from '../icon/icon.svelte'

	let menuIsOpen = false

	const toggleMenu = () => menuIsOpen = !menuIsOpen

	function poof(node) {
		return {
			duration: 100,
			css: t => {
				// https://easings.net/#easeOutExpo
				const eased = (t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t))(t)
				return `transform: translateY(${ 100 - (eased * 100)}%)`
			}
		}
	}
</script>

<nav
	class="menu-bar menu-container">
	<button
		aria-label="Open menu"
		class="menu-button"
		on:click|preventDefault={ toggleMenu }>
			<Icon name="menu" />
			Menu
	</button>
	{#if menuIsOpen}
	<ul
		aria-label="Site menu"
		class="menu-modal menu-container flat-list"
		in:poof
		on:click|preventDefault={ toggleMenu }>
		<li>
			<MenuButton
				path="/"
				icon="add"
				label="New entry"
			/>
		</li>
		<li>
			<MenuButton
				path="/editall"
				icon="edit-alt"
				label="Edit journal"
			/>
		</li>
		<li>
			<MenuButton
				path="/settings"
				icon="settings"
				label="Settings"
			/>
		</li>
		<li>
			<MenuButton
				icon="close"
				label="Close"
			/>
		</li>
	</ul>
	{/if}
</nav>

<style>
	.menu-button {
		border: 0;
		background: transparent;
		color: var(--color-white);
		padding: var(--spacing-default);
	}

	.menu-button :global(svg) {
		fill: var(--color-white);
	}

	.menu-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		background: var(--color-dark);
	}

	.menu-bar {
		z-index: var(--z-index-high);
		height: calc(5 * var(--spacing-default));
	}

	.menu-modal {
		z-index: var(--z-index-highest);
		padding: var(--spacing-small) var(--spacing-small) calc(2 * var(--spacing-default));
	}
</style>
