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
	name: 'ModalEditarPessoa',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		closeModalEditar: {
			type: Function as PropType<any>
		},
		dataPerson: {
			type: Object as PropType<any>
		},
		updatePersonList: {
			type: Function as PropType<any>
		}
	},
	components: {
		ModalComponent,
		ButtonComponent
	},
	setup(props: any) {
		type Form = {
			_id: number | null;
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
			nome: { required },
			email: { required, email }
		};

		const formV$ = useVuelidate(rules, form);

		const errorNome = ref(false);
		const errorEmail = ref(false);

		onUpdated(() => {
			if (form.value.nome == '' && form.value.email == '') {
				form.value._id = props.dataPerson._id;
				form.value.nome = props.dataPerson.nome;
				form.value.email = props.dataPerson.email;
			}
			errorNome;
			errorEmail;
		});

		const closeModalEditar = () => {
			form.value._id = null;
			form.value.nome = '';
			form.value.email = '';
			errorNome.value = false;
			errorEmail.value = false;
			props.closeModalEditar();
		};

		const submitFormUpdate = async (event: Event) => {
			event.preventDefault();
			const result = await formV$.value.$validate();
			const id = form.value._id;
			if (result) {
				await axios
					.put<Form>(`http://localhost:5000/api/pessoa/${id}`, {
						nome: form.value.nome,
						email: form.value.email
					})
					.then(response => {
						props.updatePersonList(response.data);
						Vue.notify({
							group: 'success',
							title: 'Sucesso',
							text: 'Ação realizada com sucesso!'
						});
					})
					.catch(error => {
						console.log('Erro: ', error);
					})
					.finally(() => {
						closeModalEditar();
					});
			} else {
				if (formV$.value.$errors[0].$property == 'nome') {
					errorNome.value = true;
				}
				if (formV$.value.$errors[0].$property == 'email' || formV$.value.$errors[1]?.$property == 'email') {
					errorEmail.value = true;
				}
			}
		};

		return {
			formV$,
			form,
			submitFormUpdate,
			closeModalEditar,
			errorNome,
			errorEmail
		};
	}
};
</script>

<template>
	<div v-if="visible">
		<ModalComponent>
			<form id="submitFormUpdate" @submit="submitFormUpdate">
				<div class="modal-container">
					<div>
						<h2>Editar Dados</h2>
						<button class="close-button" @click="closeModalEditar">x</button>
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
