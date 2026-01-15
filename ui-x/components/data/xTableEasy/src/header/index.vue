<template>
	<thead v-if="showHeader">
		<tr
			v-for="(rowColumns, rowIndex) in groupColumns"
			:key="rowIndex"
			:style="{ height: (headerRows[rowIndex]?.rowHeight || 40) + 'px' }">
			<th
				v-for="(column, colIndex) in rowColumns"
				:key="colIndex"
				:width="column.width"
				:class="column.class"
				:col-key="column.colKey"
				:col-index="colIndex"
				:row-index="rowIndex"
				:row-key="''"
				:colspan="column.colspan || 1"
				:rowspan="column.rowspan || 1">
				{{ column.title }}
			</th>
		</tr>
	</thead>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyHeader",
		props: {
			showHeader: {
				type: Boolean,
				default: true
			},
			groupColumns: {
				type: Array,
				required: true
			},
			headerRows: {
				type: Array,
				default: () => []
			}
		}
	};
}
</script>

<style scoped>
/* 表头样式 */
th {
	background-color: #fafafa;
	font-weight: 500;
	text-align: left;
	padding: 12px 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	user-select: none;
	box-sizing: border-box;
	transition: background-color 0.3s;
	cursor: default;
	position: relative;
}

th:hover {
	background-color: #f0f2f5;
}
</style>
