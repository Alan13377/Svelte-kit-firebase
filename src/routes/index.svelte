<script>
	import Toastify from 'toastify-js';
	import 'toastify-js/src/toastify.css';
	import { addDoc, collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

	import { onDestroy } from 'svelte';
	import { db } from '../firebase';

	let task = {
		title: '',
		description: ''
	};

	let tasks = [];
	let editStatus = false;
	let currentId = '';

	const addTask = async () => {
		try {
			await addDoc(collection(db, 'task'), {
				...task,
				createdAt: new Date()
			});
			/* console.log('Tarea Guardada'); */
			Toastify({
				text: 'Nueva tarea agregada',
				duration: 1000,
				style: {
					background: 'linear-gradient(to right, #00b09b, #96c93d)'
				}
			}).showToast();
		} catch (error) {
			console.error(error);
		}
	};

	const updateTask = async () => {
		try {
			await updateDoc(doc(db, 'task', currentId), task);
		} catch (error) {
			console.error(error);
		}
	};
	const handleSubmit = async () => {
		try {
			if (editStatus) {
				updateTask();
			} else {
				addTask();
			}
		} catch (error) {
			console.error(error);
		}
		task = {
			title: '',
			description: ''
		};
		editStatus = false;
		currentId = '';
	};

	//Obtener datos
	const unsub = onSnapshot(
		collection(db, 'task'),
		//Convertir datos
		(querySnapshot) => {
			tasks = querySnapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			console.log(tasks);
		},
		(error) => {
			console.log(error);
		}
	);

	const deleteTask = async (id) => {
		try {
			await deleteDoc(doc(db, 'task', id));
			Toastify({
				text: 'Tarea Eliminada',
				duration: 1000,
				style: {
					background: 'linear-gradient(to right, red, #ff0080)'
				}
			}).showToast();
		} catch (error) {
			console.error(error);
		}
	};

	const editTask = (currentTask) => {
		task.title = currentTask.title;
		task.description = currentTask.description;
		currentId = currentTask.id;
		editStatus = true;
	};

	onDestroy(unsub);
</script>

<main class="container p-4">
	<div class="row">
		<div class="col-md-6">
			<form on:submit|preventDefault={handleSubmit} class="card card-body p-5">
				<div class="mb-3">
					<label class="text-info fs-5" for="title">Titulo</label>
					<input
						class="form-control"
						bind:value={task.title}
						type="text"
						placeholder="Escribe tu tarea"
						id="title"
					/>
				</div>

				<div class="mb-3">
					<label class="text-info fs-5" for="description">Descripción</label>
					<textarea
						class="form-control"
						bind:value={task.description}
						id="description"
						rows="3"
						placeholder="Descripcion de la tarea"
					/>
				</div>
				<button class="btn btn-outline-primary">Guardar</button>
			</form>
		</div>
		<div class="col-md-6">
			{#each tasks as task}
				<div class="card card-body mt-2 text-white bg-info ">
					<div class="d-flex justify-content-between">
						<h5>{task.title}</h5>
						<i on:click={editTask(task)} class="material-icons btn btn-outline-primary">edit</i>
					</div>

					<p>{task.description}</p>
					<div>
						<button class="btn btn-outline-danger" on:click={deleteTask(task.id)}>
							<i style="vertical-align: middle;" class="material-icons">delete</i>
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	input,
	textarea {
		display: block;
	}
</style>
