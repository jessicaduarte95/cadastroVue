<template>
	<div v-if="isVisible" class="modal">
		<div class="modal-content">
			<span class="close" @click="closeModal">&times;</span>
			<p>Conteúdo da modal aqui...</p>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
	props: {
		isVisible: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		closeModal() {
			this.$emit('fechar-modal');
		}
	}
});
</script>

<style scoped>
.modal {
	display: block; /* Use block since v-if will handle visibility */
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
	background-color: #fefefe;
	margin: 15% auto;
	padding: 20px;
	border: 1px solid #888;
	width: 80%;
}

.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}
</style>
