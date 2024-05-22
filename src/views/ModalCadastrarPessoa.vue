<template>
	<div v-if="visible">
		<ModalComponent>
			<div>
				<h2>Cadastrar Pessoa</h2>
				<button class="close-button" @click="closeModalCadastro">x</button>
			</div>
		</ModalComponent>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ModalComponent from '../components/ModalComponent.vue';

@Component({
	components: {
		ModalComponent
	}
})
export default class App extends Vue {
	name = 'ModalCadastrarPessoa';
	@Prop() visible!: boolean;

	async closeModalCadastro() {}
}
</script>

<style>
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
