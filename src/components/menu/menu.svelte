<script>
	import MenuButton from '../menu-button/menu-button.svelte'
	import Link from '../link/link.svelte'
	import Icon from '../icon/icon.svelte'

	let openMenu = false
</script>

<style>
	nav.groetenav {
		position: fixed;
		bottom: var(--spacing-default);
	}
	div {
		position: fixed;
		z-index: 2;
		background: var(--color-blue);
		width: 100vw;
		transform: translateY(0);
		transition: 150ms cubic-bezier(0, 0.5, 0, 1);
		bottom: 0;
		left: 0;
	}
	div.closed {
		transform: translateY(100%);
	}
	ul {
		list-style: none;
		margin-left: var(--spacing-default);
		padding: 0;
	}
	li {
		font-size: var(--font-size-default);
		letter-spacing: var(--letter-spacing);
	}
	.menu-button {
		background: white;
		color: #333;
		box-shadow: 0 0 0 0.125rem black;
	}
	.menu-button :global(svg) {
		fill: #333;
	}
</style>

<nav
	class="groetenav">
	<button
		class="menu-button"
		on:click|preventDefault={ () => openMenu = true }>
			<Icon name="menu" />
			Menu
	</button>
</nav>

<div
	class:closed="{ !openMenu }"
	on:click|preventDefault={ () => openMenu = false }>
	<nav>
		<ul>
			<li>
				<MenuButton path="/" icon="add" label="New entry" />
			</li>
			<li>
				<MenuButton path="/editall" icon="edit-alt" label="Edit journal" />
			</li>
			<li>
				<MenuButton path="/settings" icon="settings" label="Settings" />
			</li>
			<li>
				<MenuButton icon="close" label="Close" />
			</li>
		</ul>
	</nav>
</div>
