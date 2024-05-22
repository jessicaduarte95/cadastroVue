<template>
	<div>
		<button @click="$emit('click')">{{ children }}</button>
	</div>
</template>

<script>
export default {
	name: 'ButtonComponent',
	props: {
		children: String
	}
};
</script>

<style scoped>
button {
	padding: 0.5rem 0.8rem;
	background-color: #115293;
	border: none;
	border-radius: 5px;
	color: #ffffff;
	&:active {
		border: none;
		background-color: #1567b9;
	}
}
</style>
