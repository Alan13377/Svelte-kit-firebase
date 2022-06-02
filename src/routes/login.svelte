<script>
	import { auth } from '../firebase';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { isLoggedIn, user } from '../store';
	import { goto } from '$app/navigation';

	const login = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const response = await signInWithPopup(auth, provider);
			$user = response.user;
			$isLoggedIn = true;
			goto('/', { replace: true });
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};
</script>

<h1>Login</h1>

<button on:click={login}>Login with Google</button>
