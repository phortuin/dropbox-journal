<script>
	import { onMount } from 'svelte'
	import Textarea from './textarea.svelte'
	import router from './router.js'
	import Icon from './icon/icon.svelte'

	let saving = false
	let disabled = true
	let journal = 'Wait...'

	async function handleSubmit(event) {
		saving = true
		disabled = true
		const form = event.target
		const method = 'put' // cant put 'put' in form action :/
		const action = form.action
		const response = await fetch(action,
		{
		    method,
		    body: journal
		});
		saving = false
		if (response.ok) {
			let text = await response.text()
			journal = text
			disabled = false
		} else {
			alert('Something wrong :(')
			console.log(response)
		}
	}

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
				// if (json.error) {
				// 	alert(json.error)
				// }
			}
			disabled = false
			return response.text()
		})
	})
</script>

<style>
	button {
		position: fixed;
		right: 1rem;
		top: 1rem;
		z-index: 1;
	}
	button[disabled] {
		background: lightgrey;
	}
	button:focus {
		outline: none;
	}
	.button--saving {
		animation: wobble 1s ease-in-out alternate infinite;
		transform-origin: center;
	}
	@keyframes wobble {
		0% {
			transform: translateY(10px);
		}
		100% {
			transform: translateY(-10px);
		}
	}
</style>

<button
	class:button--saving="{ saving }"
	disabled={ disabled }
	form="theform">
	<Icon name="save" />
	Save
</button>

<form
	id="theform"
	method="post"
	action="/api/journal"
	on:submit|preventDefault={ handleSubmit }>
	<input type="hidden" name="_method" value="put">

	<Textarea
		bind:content={ journal } />
</form>
