<script>
	// https://icons.mono.company/

	import add from './add.svg'
	import check from './check.svg'
	import editAlt from './edit-alt.svg'
	import close from './close.svg'
	import menu from './menu.svg'
	import settings from './settings.svg'
	import save from './save.svg'

	let icons = {
		add,
		check,
		'edit-alt': editAlt,
		close,
		menu,
		settings,
		save,
	}

	export let name

	$: icon = icons[name]
</script>

{@html icon}
