<script>
	import add from './add.svg'
	import edit from './edit.svg'
	import settings from './settings.svg'
	import close from './close.svg'

	let icons = {
		add,
		edit,
		settings,
		close
	}

	export let name

	$: icon = icons[name]
</script>

{@html icon}
