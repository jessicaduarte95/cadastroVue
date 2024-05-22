<template>
	<div id="app">
		<HeaderComponent msg="Cadastro de Pessoas" />
		<div id="container">
			<div id="search">
				<div id="containerInput">
					<InputComponent label="Nome" />
					<InputComponent label="E-mail" />
				</div>
				<div id="containerButton"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';
import InputComponent from './components/InputComponent.vue';

@Component({
	components: {
		HeaderComponent,
		InputComponent
	}
})
export default class App extends Vue {}
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
	height: 8rem;
	flexdirection: column;
}

#containerInput {
	display: flex;
	flex-direction: row;
	gap: 1rem;
}
</style>
