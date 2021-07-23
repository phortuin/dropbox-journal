import { writable } from 'svelte/store'

export const activeRoute = writable('/')

export const entry = createLocalStorageWritable('entry', '')
export const date = createLocalStorageWritable('date', new Date().toISOString().substring(0, 10))

export const journal = createJournal()

/**
 * Custom store that reads from and writes to localStorage.
 *
 * @param  {String} key
 * @param  {String} defaultValue
 * @return {Object}
 */
function createLocalStorageWritable(key, defaultValue = '') {
	const initialValue = localStorage.getItem(key) || defaultValue
	const { set, subscribe } = writable(initialValue)

	return {
		set: value => {
			localStorage.setItem(key, value)
			return set(value)
		},
		subscribe,
	}
}

/**
 * Custom store for journal. Persists to API endpoint. Journal is stored as
 * a string, not an object
 *
 * @return {Object}
 */
function createJournal() {
	const store = writable('')

	return {
		...store,
		read: async() => {
			const journal = await fetch('/api/journal')
				.then(response => response.text())
				.catch(error => {
					console.error(error)
					return 'Could not load journal'
				})
			store.set(journal)
		}
	}
}

