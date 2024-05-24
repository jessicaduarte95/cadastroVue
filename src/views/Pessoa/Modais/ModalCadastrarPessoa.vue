<script lang="ts">
import { PropType } from 'vue';
import ModalComponent from '../../../components/ModalComponent.vue';
import ButtonComponent from '../../../components/ButtonComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default {
	name: 'ModalCadastrarPessoa',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		closeModalCadastro: {
			type: Function as PropType<any>
		},
		addPersonList: {
			type: Function as PropType<any>
		}
	},
	components: {
		ModalComponent,
		ButtonComponent
	},
	setup(props: any) {
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

		const rules = {
			id: {},
			nome: { required },
			email: { required, email }
		};

		const formV$ = useVuelidate(rules, form);

		const submitFormRegister = async (event: Event) => {
			event.preventDefault();
			await formV$.value.$touch();

			const result = await formV$.value.$validate();
			if (result) {
				await axios
					.post<Form>('http://localhost:5000/api/pessoa', {
						nome: form.value.nome,
						email: form.value.email
					})
					.then(response => {
						props.addPersonList(response.data);
					})
					.catch(error => {
						console.log('Teste', error);
					})
					.finally(() => {
						form.value.nome = '';
						form.value.email = '';
						props.closeModalCadastro();
					});
			} else {
				// alert('Campos Obrigatórios')
			}
		};
		return {
			formV$,
			form,
			submitFormRegister
		};
	}
};
</script>

<template>
	<div v-if="visible">
		<ModalComponent>
			<form id="submitFormRegister" @submit="submitFormRegister">
				<div class="modal-container">
					<div>
						<h2>Cadastrar Pessoa</h2>
						<button class="close-button" @click="$emit('close-modal')">x</button>
					</div>
					<div class="containerInputRegister">
						<div class="inputFields">
							<label class="label">Nome</label>
							<input class="input" placeholder="Digite aqui" v-model="form.nome" type="text" />
						</div>
						<div class="inputFields">
							<label class="label">Email</label>
							<input class="input" placeholder="Digite aqui" v-model="form.email" type="email" />
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
