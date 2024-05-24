<script lang="ts">
import { PropType, onUpdated } from 'vue';
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

		onUpdated(() => {
			if (form.value.nome == '' && form.value.email == '') {
				form.value._id = props.dataPerson._id;
				form.value.nome = props.dataPerson.nome;
				form.value.email = props.dataPerson.email;
			}
		});

		const handleClick = () => {
			form.value._id = null;
			form.value.nome = '';
			form.value.email = '';
            props.closeModalEditar();
		};

		const submitFormUpdate = async (event: Event) => {
			event.preventDefault();
			console.log('Data Person', props.dataPerson);
			const result = await formV$.value.$validate();
			const id = form.value._id;
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
						form.value._id == null;
						form.value.nome = '';
						form.value.email = '';
						props.closeModalEditar();
					});
			}
		};

		return {
			formV$,
			form,
			submitFormUpdate,
			handleClick
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
						<button class="close-button" @click="handleClick">x</button>
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
