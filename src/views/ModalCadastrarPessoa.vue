<template>
	<div v-if="visible">
		<ModalComponent>
			<h2>Cadastrar Pessoa</h2>
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
}
</script>

<style></style>
