<script>
	import { onMount } from 'svelte'
	import { entry, date } from './stores.js'
	import router from './router.js'
	import Textarea from './textarea.svelte'
	import Journal from './journal.svelte'
	import Icon from './icon/icon.svelte'

	let journal
	let disabled = false

	onMount(() => {
		// if entry is empty on mount, reset the date
		// this is done to make sure that when opening the site, the current date
		// is used and not the date of the day you used it, when it was last
		// stored in localstorage
		// @fix
		// perhaps date should only be persistent if entry is set? hmmm
		if ($entry === '') {
			$date = new Date().toISOString().substring(0, 10)
		}
	})

	async function handleSubmit(event) {
		disabled = true
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action,
		{
		    method,
		    headers: {
		        'Content-Type': 'application/json'
		    },
		    body: JSON.stringify({ entry: $entry, date: $date })
		});
		if (response.ok) {
			$entry = ''
			$date = new Date().toISOString().substring(0, 10)
			router.redirect('/editall')
		} else {
			disabled = false
			console.log(response)
		}
	}

	let inputElement
	let editing = false

	$: readableDate = (new Date($date)).toLocaleDateString('nl', { day: 'numeric', month: 'long', year: 'numeric' })

	function handleBlur() {
		let d = new Date(inputElement.value)
		if (d instanceof Date && !isNaN(d)) {
			$date = d.toISOString().substring(0, 10)
		} else {
			$date = new Date().toISOString().substring(0, 10)
		}
		editing = false
	}

	function handleClick() {
		editing = true
		inputElement.focus()
		inputElement.select()
	}
</script>

<style>
	form {
		margin-bottom: var(--spacing-default);
	}
	button {
		float: right;
	}
	button[disabled] {
		background:  lightgrey;
	}
	input[name=date] {
		appearance: none;
		--webkit-appearance: none;
		border: 0;
		font-size: var(--font-size-default);
		letter-spacing: var(--letter-spacing);
		line-height: var(--line-height);
		padding: var(--spacing-small) 0;
		background: none;
		width: 100%;
		margin-bottom: var(--spacing-small);
	}
</style>

<form
	id="theform"
	method="post"
	action="/api/journal"
	on:submit|preventDefault={ handleSubmit }>

	<input
		type="date"
		id="date"
		form="theform"
		name="date"

		bind:value={ $date }
		bind:this={ inputElement }
		on:blur={ handleBlur }>

	<Textarea
		bind:content={ $entry } />

	<button
		disabled={ disabled }>
		<Icon name="check" />
		Save
	</button>
</form>

<Journal journal={ journal }/>
