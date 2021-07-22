<script>
	import router from './router.js'
	import Menu from './menu/menu.svelte'
	import Route from './route.svelte'
	import Editor from './editor.svelte'
	import Login from './login.svelte'
	import Settings from './settings.svelte'
	import Editall from './editall.svelte'

	router.start()
</script>

<Menu />
<Route path="/" component={ Editor } />
<Route path="/login" component={ Login } />
<Route path="/settings" component={ Settings } />
<Route path="/editall" component={ Editall } />
