<script>
	import 'bootswatch/dist/morph/bootstrap.min.css';
	import { signOut, onAuthStateChanged } from 'firebase/auth';
	import { auth } from '../firebase';
	import { isLoggedIn, user } from '../store';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	const logout = async () => {
		try {
			await signOut(auth);
			$isLoggedIn = false;
			$user = {};
		} catch (error) {
			console.error(error);
		}
	};

	//Mantener sesion
	onAuthStateChanged(auth, (authUser) => {
		$user = authUser;
		$isLoggedIn = !!authUser;
		if (browser) {
			if ($isLoggedIn != true) {
				goto('/login', { replace: true });
			}
			if ($isLoggedIn != false) {
				goto('/', { replace: true });
			}
		}
	});
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<div class="container-fluid">
		<h5>Todo App</h5>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarColor01"
			aria-controls="navbarColor01"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>

		<div class="collapse navbar-collapse" id="navbarColor01">
			<ul class="navbar-nav me-auto">
				{#if $isLoggedIn}
					<li class="nav-item">
						<a class="nav-link active" href="/"
							>Inicio
							<span class="visually-hidden">(current)</span>
						</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/profile">Perfil</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/login" on:click={logout}>LogOut</a>
					</li>
				{:else}
					<li class="nav-item">
						<a class="nav-link" href="/login">Login</a>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
<slot><!-- optional fallback --></slot>
