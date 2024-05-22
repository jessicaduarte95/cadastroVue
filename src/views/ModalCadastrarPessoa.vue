<template>
	<div v-if="visible">
		<ModalComponent>
			<div class="modal-container">
				<div>
					<h2>Cadastrar Pessoa</h2>
					<button class="close-button" @click="closeModalCadastro">x</button>
				</div>
				<div class="fields">
					<InputComponent label="Nome" />
					<InputComponent label="E-mail" />
				</div>
				<div class="button">
					<ButtonComponent children="Salvar" type="submit" />
				</div>
			</div>
		</ModalComponent>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ModalComponent from '../components/ModalComponent.vue';
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

@Component({
	components: {
		ModalComponent,
		InputComponent,
		ButtonComponent
	}
})
export default class App extends Vue {
	name = 'ModalCadastrarPessoa';
	@Prop() visible!: boolean;

	async closeModalCadastro() {}
}
</script>

<style>
.modal-container {
	width: 25rem;
	@media (max-width: 600px) {
		width: 15rem;
	}
}
.fields {
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
