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
		},
		deletePerson: {
			type: Function as PropType<any>
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
					<th class="table-button-delete">{{ columns.excluir }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in itens" :key="item._id">
					<td>{{ item.nome }}</td>
					<td>{{ item.email }}</td>
					<td class="table-button-delete">
						<button @click="deletePerson(item._id)" class="button-delete">
							<img src="../assets/lixo.png" width="20" height="16" alt="Descrição da imagem" />
						</button>
					</td>
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

.button-delete {
	border: none;
	background-color: #f2f2f2;
}

.table-button-delete {
	display: flex;
	justify-content: center;
	/* width: 60px; */
}
</style>
