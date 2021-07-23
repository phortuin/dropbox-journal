<script>
	import { journal } from './stores.js'

	journal.read()

	$: journalHtml = $journal.replace(/\n/g, '<br>')
</script>

<style>
	article {
		margin-left: calc(-1 * var(--spacing-default));
		margin-right: calc(-1 * var(--spacing-default));
		padding: var(--spacing-default);
		padding-bottom: var(--spacing-wide);
		letter-spacing: var(--letter-spacing);
		background: var(--color-whitesmoke);
		min-height: 100vh;
		word-break: break-word;
	}
</style>

<article>
	{@html journalHtml}
</article>
