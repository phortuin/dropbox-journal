<script>
	import router from '../router.js'

	export let href

	/**
	 * Handles clicking on hyperlink. Uses router to open new route, which
	 * history.pushes the new path. Prevents page refreshes.
	 *
	 * @param  {Event} event
	 */
	function handleAnchorClick(event) {
		router.redirect(event.currentTarget.pathname)
	}
</script>

<a
	href={href}
	on:click|preventDefault={ handleAnchorClick }>
	<slot />
</a>

<style>
	a {
		display: flex;
		padding: var(--spacing-small);
		color: var(--color-white);
		text-decoration: none;
	}
</style>
