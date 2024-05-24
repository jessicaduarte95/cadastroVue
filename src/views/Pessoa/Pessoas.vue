<script lang="ts">
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import axios from 'axios';
import ButtonComponent from '../../components/ButtonComponent.vue';
import TableComponent from '../../components/TableComponent.vue';
import ModalCadastrarPessoa from './Modais/ModalCadastrarPessoa.vue';

export default {
	name: 'Pessoas',
	components: {
		ButtonComponent,
		TableComponent,
		ModalCadastrarPessoa
	},
	setup() {
		type Form = {
			_id: any;
			nome: string;
			email: string;
		};

		const form = ref<Form>({
			_id: null,
			nome: '',
			email: ''
		});

		const rules = {
			_id: {},
			nome: {},
			email: {}
		};

		const v$ = useVuelidate(rules, form);
		const visibleModalCadastro = ref<boolean>(false);

		const openModalCadastro = () => {
			visibleModalCadastro.value = true;
		};

		const closeModalCadastro = () => {
			visibleModalCadastro.value = false;
		};

		const columns = {
			nome: 'Nome',
			email: 'E-mail',
			excluir: 'Excluir'
		};

		const listPerson = ref<Form[]>([]);

		const addPersonList = (data: any) => {
			listPerson.value.push(data);
		};

		const deletePerson = async (id: number) => {
			await axios
				.delete<Form[]>(`http://localhost:5000/api/pessoa/${id}`)
				.then(response => {
					const filteredList = listPerson.value.filter(e => e._id !== id);
					listPerson.value = filteredList;
				})
				.catch(error => {
					console.log('Teste', error);
				});
		};

		const submitForm = async (event: Event) => {
			event.preventDefault();
			await axios
				.get<Form[]>('http://localhost:5000/api/pessoa', {
					params: {
						nome: form.value.nome,
						email: form.value.email
					}
				})
				.then(response => {
					listPerson.value = response.data;
				})
				.catch(error => {
					console.log('Teste', error);
				});
		};

		return {
			v$,
			form,
			visibleModalCadastro,
			openModalCadastro,
			closeModalCadastro,
			columns,
			listPerson,
			addPersonList,
			deletePerson,
			submitForm
		};
	}
};
</script>

<template>
	<div id="app">
		<div>
			<div class="headerContainer">
				<p class="title">Cadastro de Pessoas</p>
			</div>
		</div>
		<div id="container">
			<form id="submitForm" @submit="submitForm">
				<div class="search">
					<div class="containerInput">
						<div class="inputFields">
							<label class="label">Nome</label>
							<input class="input" placeholder="Digite aqui" v-model="form.nome" />
						</div>
						<div class="inputFields">
							<label class="label">Email</label>
							<input class="input" placeholder="Digite aqui" v-model="form.email" />
						</div>
					</div>
					<div class="containerButton">
						<ButtonComponent children="Cadastrar" @click="openModalCadastro" />
						<ButtonComponent type="submit" children="Pesquisar" />
					</div>
				</div>
			</form>
			<ModalCadastrarPessoa :visible="visibleModalCadastro" @close-modal="closeModalCadastro" :closeModalCadastro="closeModalCadastro" :addPersonList="addPersonList" />
			<TableComponent :itens="listPerson" :columns="columns" :deletePerson="deletePerson" />
		</div>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
	margin: 0;
	padding: 0;
}

.headerContainer {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	width: 100%;
	height: 10rem;
	background-image: linear-gradient(90deg, #115293 20%, #4791db 80%);
}

.title {
	font-size: 3rem;
	font-weight: bold;
	color: #ffffff;
	@media (max-width: 600px) {
		font-size: 1.8rem;
	}
}

#container {
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	background-color: #f7f7f7;
}

.search {
	display: flex;
	background-color: #eeeeee;
	border-radius: 4px;
	padding: 20px;
	margin-top: 2rem;
	height: 7rem;
	width: 35rem;
	flex-direction: column;
	@media (max-width: 600px) {
		height: 12rem;
		width: 17rem;
	}
}

.containerInput {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	@media (max-width: 600px) {
		flex-direction: column;
	}
}

.inputFields {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.label {
	display: flex;
}

.input {
	margin-top: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}

.containerButton {
	display: flex;
	justify-content: flex-end;
	margin-top: 1.5rem;
	gap: 0.5rem;
}
</style>