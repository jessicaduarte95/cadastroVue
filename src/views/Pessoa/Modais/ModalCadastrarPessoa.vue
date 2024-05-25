<script lang="ts">
import { PropType, onUpdated } from 'vue';
import ModalComponent from '../../../components/ModalComponent.vue';
import ButtonComponent from '../../../components/ButtonComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import Vue from 'vue';

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

		const errorNome = ref(false);
		const errorEmail = ref(false);

		const closeModalCadastro = () => {
			errorNome.value = false;
			errorEmail.value = false;
			props.closeModalCadastro();
		};

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
						Vue.notify({
							group: 'success',
							title: 'Sucesso',
							text: 'Ação realizada com sucesso!'
						});
					})
					.catch(error => {
						console.log('Teste', error);
					})
					.finally(() => {
						form.value.nome = '';
						form.value.email = '';
						closeModalCadastro();
					});
			} else {
				if (formV$.value.$errors[0].$property == 'nome') {
					errorNome.value = true;
				}
				if (formV$.value.$errors[0].$property == 'email' || formV$.value.$errors[1].$property == 'email') {
					errorEmail.value = true;
				}
			}
		};

		onUpdated(() => {
			errorNome;
			errorEmail;
		});

		return {
			formV$,
			form,
			submitFormRegister,
			errorNome,
			errorEmail
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
						<button class="close-button" @click="closeModalCadastro()">x</button>
					</div>
					<div class="containerInputRegister">
						<div class="inputFields">
							<label class="label">Nome</label>
							<input class="input" placeholder="Digite aqui" v-model="form.nome" type="text" />
							<span v-if="errorNome && form.nome.length == 0" class="error">Campo obrigatório!</span>
						</div>
						<div class="inputFields">
							<label class="label">Email</label>
							<input class="input" placeholder="Digite aqui" v-model="form.email" type="email" />
							<span v-if="errorEmail && form.email.length == 0" class="error">Campo obrigatório!</span>
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

<style></style>
