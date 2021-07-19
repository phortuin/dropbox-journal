<script>
	import Link from '../link/link.svelte'
	import Icon from '../icon/icon.svelte'

	export let path = '#', icon, label
</script>

<Link
	href="{ path }">
	<Icon name="{ icon }" />
	{ label }
</Link>
