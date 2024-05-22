<template>
	<div id="app">
		<HeaderComponent msg="Cadastro de Pessoas" />
		<div id="container">
			<form @submit="handleSubmit">
				<div id="search">
					<div id="containerInput">
						<InputComponent label="Nome" />
						<InputComponent label="E-mail" />
					</div>
					<div id="containerButton">
						<ButtonComponent children="Cadastrar" />
						<ButtonComponent children="Pesquisar" type="submit" />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import HeaderComponent from '../components/HeaderComponent.vue';
import InputComponent from '../components/InputComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';

@Component({
	components: {
		HeaderComponent,
		InputComponent,
		ButtonComponent
	}
})
export default class App extends Vue {
	data: any = null;
	error: string | null = null;

	async fetchData() {
		try {
			const response = await axios.get('http://localhost:5000/api/pessoa');
			this.data = response.data;
		} catch (error) {
			this.error = 'Erro ao buscar dados: ' + error;
		}
	}

	async handleSubmit(event: Event) {
		event.preventDefault();
		await this.fetchData();
	}
}
</script>

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

#container {
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100%;
	background-color: #f7f7f7;
}

#search {
	display: flex;
	background-color: #eeeeee;
	border-radius: 4px;
	padding: 20px;
	margin-top: 2rem;
	height: 7rem;
	flex-direction: column;
	@media (max-width: 600px) {
		height: 12rem;
	}
}

#containerInput {
	display: flex;
	flex-direction: row;
	gap: 1rem;
	@media (max-width: 600px) {
		flex-direction: column;
	}
}

#containerButton {
	display: flex;
	justify-content: flex-end;
	margin-top: 1.5rem;
	gap: 0.5rem;
}
</style>
