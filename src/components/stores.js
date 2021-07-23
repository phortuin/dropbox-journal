import { writable } from 'svelte/store'

export const activeRoute = writable('/')
export const entry = createLocalStorageWritable('entry', '')
export const date = createLocalStorageWritable('date', new Date().toISOString().substring(0, 10))

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
