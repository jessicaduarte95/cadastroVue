<template>
	<div id="app">
		<HeaderComponent msg="Cadastro de Pessoas" />
    <div id="container">
      <div id="search">
        
      </div>
    </div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComponent from './components/HeaderComponent.vue';

@Component({
	components: {
		HeaderComponent
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
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #f7f7f7;
}

#search {

}
</style>
