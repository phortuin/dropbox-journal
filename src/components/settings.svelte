<script>
	import { onMount } from 'svelte'
	import { dateFormats, settings as settings_ } from '../../lib/constants'

	let settings = {}
	let user = {
		name: {
			display_name: ''
		},
		profile_photo_url: '#'
	}

	onMount(async () => {
		settings = await fetch('/api/settings')
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					throw Error(response.statusText)
				}
			})
			.catch(error => {
				console.error(error)
				alert('Couldnt get settings :/')
			})
		user = await fetch('/api/me')
			.then(response => {
				if (response.ok) {
					return response.json()
				} else {
					throw Error(response.statusText)
				}
			})
			.catch(error => {
				console.error(error)
				// no real issue so dont block user
			})
	})

	async function handleSubmit(event) {
		const form = event.target
		const method = form.method
		const action = form.action
		const response = await fetch(action, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(settings)
		})
		if (response.ok) {
			alert('Settings saved')
		} else {
			alert('Could not save settings :/')
		}
	}

	function handleClick() {
		fetch('/api/auth/logout', { method: 'post' })
			.then(response => {
				if (response.ok) {
					window.location.reload()
				} else {
					throw Error('Could not logout')
				}
			})
			.catch(alert)
	}

</script>

<style>
	figure {
		margin: 0;
		display: block;
		width: 5rem;
		height: 5rem;
		background: grey;
		background-size: cover;
		border-radius: 50%;
	}
	.avatar {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	code {
		background: whitesmoke;
		color: red;
		font-family: Menlo, monospace;
		font-size: 0.875em;
		padding: 0 var(--spacing-small);
	}
</style>

<form
	method="post"
	action="/api/settings"
	on:submit|preventDefault={ handleSubmit }>
	<div
		class="avatar">
		<figure style="background-image: url('{ user.profile_photo_url }')"></figure>
		<p>{ user.name.display_name }</p>
	</div>
	<br>
	<div>
		File path (example: <code>/myfile.txt</code>)<br>
		<input type="text" bind:value={settings[settings_.FILE_LOCATION]}>
	</div>
	<br>
	<div>
		Entry on top (prepend) or at bottom (append)<br>
		<label>
			<input type=radio bind:group={settings[settings_.PREPEND]} value="1">
			Prepend
		</label>
		<br>
		<label>
			<input type=radio bind:group={settings[settings_.PREPEND]} value="0">
			Append
		</label>
	</div>
	<br>
	<div>
		Date format<br>
		<label>
			<input type=radio bind:group={settings[settings_.DATE_FORMAT]} value={dateFormats.DAY_MONTH}>
			Short date format (31/3)
		</label>
		<br>
		<label>
			<input type=radio bind:group={settings[settings_.DATE_FORMAT]} value={dateFormats.DAY_MONTH_YEAR}>
			Long date format (31/3/2019)
		</label>
	</div>
	<br>
	<button>Update settings</button>
	<br>
	<div>
		<a href="/" on:click|preventDefault={ handleClick }>
			Log out { user.name.display_name }
		</a>
	</div>
</form>
