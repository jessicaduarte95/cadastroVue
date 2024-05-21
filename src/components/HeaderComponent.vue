<template>
	<div id="headerContainer">
		<p id="title">{{ msg }}</p>
	</div>
</template>

<script>
export default {
	name: 'HeaderComponent',
	props: {
		msg: String
	}
};
</script>

<style scoped>
#headerContainer {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0;
	width: 100%;
	height: 10rem;
	background-image: linear-gradient(90deg, #115293 20%, #4791db 80%);
}

#title {
	font-size: 3rem;
	font-weight: bold;
	color: #ffffff;
}
</style>