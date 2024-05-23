<script setup lang="ts">
import ModalComponent from '../components/ModalComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import { defineProps } from 'vue';
import axios from 'axios';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

type TabProps = {
	visible?: boolean;
};

const props = defineProps<TabProps>();

type Form = {
	id: number | null;
	nome: string;
	email: string;
};

const form = ref<Form>({
	id: null,
	nome: '',
	email: ''
});

const submitForm = async (event: Event) => {
	event.preventDefault();
	await axios
		.post<Form>('http://localhost:5000/api/pessoa', {
			nome: form.value.nome,
			email: form.value.email
		})
		.then(response => {
			console.log('Teste', response.data);
		})
		.catch(error => {
			console.log('Teste', error);
		});
};
</script>

<template>
	<div v-if="props.visible">
		<ModalComponent>
			<form @submit="submitForm">
				<div class="modal-container">
					<div>
						<h2>Cadastrar Pessoa</h2>
						<button class="close-button">x</button>
					</div>
					<div class="containerInputRegister">
						<div class="inputFields">
							<label class="label">Nome</label>
							<input class="input" placeholder="Digite aqui" v-model="form.nome" />
						</div>
						<div class="inputFields">
							<label class="label">Email</label>
							<input class="input" placeholder="Digite aqui" v-model="form.email" />
						</div>
					</div>
					<div class="button">
						<ButtonComponent children="Salvar" type="submit" />
					</div>
				</div>
			</form>
		</ModalComponent>
	</div>
</template>

<style>
.modal-container {
	width: 25rem;
	@media (max-width: 600px) {
		width: 15rem;
	}
}

.containerInputRegister {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.8rem;
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
.button {
	display: flex;
	justify-content: flex-end;
	margin-top: 0.7rem;
}
.close-button {
	position: absolute;
	top: 10px;
	right: 10px;
	background: transparent;
	border: none;
	font-size: 20px;
	cursor: pointer;
}
</style>
