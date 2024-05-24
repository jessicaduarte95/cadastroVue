<script setup lang="ts">
import { defineProps } from 'vue';

type TabProps = {
	itens?: any;
};

const props = defineProps<TabProps>();

</script>

<template>
	<div class="table">
		<table>
			<thead>
				<tr>
					<th>Nome</th>
					<th>Email</th>
					<th>Excluir</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>João</td>
					<td>30</td>
					<td>Excluir</td>
				</tr>
				<tr>
					<td>Maria</td>
					<td>25</td>
					<td>Excluir</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 2.5rem;
	width: 35rem;
	@media (max-width: 600px) {
		width: 17rem;
	}
}

th,
td {
	border: 1px solid #ddd;
	padding: 8px;
	text-align: left;
}

th {
	background-color: #f2f2f2;
	font-weight: bold;
}
</style>
