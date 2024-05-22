<template>
	<div id="inputFields">
		<label id="label">{{ label }}</label>
		<input id="input" placeholder="Digite aqui" />
	</div>
</template>

<script>
export default {
	name: 'InputComponent',
	props: {
		label: String
	}
};
</script>

<style scoped>
#inputFields {
	display: flex;
	flex-direction: column;
}

#label {
	display: flex;
}

#input {
	margin-top: 0.5rem;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	&:focus {
		outline: 0.5px solid #4791db;
		border-color: #4791db;
	}
}
</style>
