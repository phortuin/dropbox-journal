<script>
	import { onMount } from 'svelte'
	import router from './router.js'

	export let journal = 'Loading journal...'

	onMount(async () => {
		journal = await fetch(`/api/journal`).then(response => {
			const status = response.status
			if (status !== 200) {
				if (status === 409 || status === 400) {
					router.redirect('/settings')
				}
				if (status === 403) {
					router.redirect('/login')
				}
			}
			return response.text()
		})
		journal = journal.replace(/\n/g, `<br>`)
	})
</script>

<style>
	article {
		margin-left: calc(-1 * var(--spacing-default));
		margin-right: calc(-1 * var(--spacing-default));
		padding: var(--spacing-default);
		padding-bottom: var(--spacing-wide);
		letter-spacing: var(--letter-spacing);
		background: whitesmoke;
		min-height: 100vh;
		word-break: break-word;
	}
</style>

<article>
	{@html journal }
</article>
