<script>
	import { isLoggedIn, user } from '../store.js';
</script>

{#if $isLoggedIn}
	<pre>{JSON.stringify($user)}</pre>
	<img src={$user.photoURL} alt={$user.displayName} />
	<h3>{$user.displayName}</h3>
	<p>{$user.email}</p>
{/if}
