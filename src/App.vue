<template>
	<div>
		<Pessoas />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Pessoas from './views/Pessoas.vue';

@Component({
	components: {
		Pessoas
	}
})
export default class App extends Vue {}
</script>

<style></style>
