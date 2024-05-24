<script lang="ts">
import { PropType } from 'vue';
export default {
	name: 'TableComponent',
	props: {
		itens: {
			type: Array as PropType<any[]>
		},
		columns: {
			type: Object as PropType<{
				nome: string;
				email: string;
				excluir: string;
			}>
		}
	}
};
</script>

<template>
	<div class="table">
		<table v-if="itens && itens.length">
			<thead>
				<tr>
					<th>{{ columns.nome }}</th>
					<th>{{ columns.email }}</th>
					<th>{{ columns.excluir }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in itens" :key="item._id">
					<td>{{ item.nome }}</td>
					<td>{{ item.email }}</td>
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
