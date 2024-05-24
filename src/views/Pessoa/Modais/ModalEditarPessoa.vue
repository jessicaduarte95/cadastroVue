<script lang="ts">
import { PropType } from 'vue';
import ModalComponent from '../../../components/ModalComponent.vue';
import ButtonComponent from '../../../components/ButtonComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

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
			_id: props.dataPerson._id,
			nome: props.dataPerson.nome,
			email: props.dataPerson.email
		});

		const rules = {
			_id: {},
			nome: { required },
			email: { required, email }
		};

		const formV$ = useVuelidate(rules, form);
		const submitFormUpdate = async (event: Event) => {
			event.preventDefault();
			console.log('Data Person', props.dataPerson);
			const result = await formV$.value.$validate();
			const id = props.dataPerson.email_id;
			if (result) {
				await axios
					.put<Form>(`http://localhost:5000/api/pessoa/${id}`, {
						nome: form.value.nome,
						email: form.value.email
					})
					.then(response => {
						console.log('Dados alterados: ', response.data);
					})
					.catch(error => {
						console.log('Teste', error);
					})
					.finally(() => {
						form.value.nome = '';
						form.value.email = '';
						props.closeModalCadastro();
					});
			}
		};

		return {
			formV$,
			form,
			submitFormUpdate
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

<style></style>
