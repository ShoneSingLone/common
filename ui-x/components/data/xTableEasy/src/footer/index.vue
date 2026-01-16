<template>
	<tfoot v-if="footerData.length > 0">
		<tr
			v-for="(footerRow, rowIndex) in footerRows"
			:key="rowIndex"
			:style="{ height: footerRow.rowHeight + 'px' }">
			<td
				v-for="(column, colIndex) in colgroups[rowIndex]"
				:key="colIndex"
				:width="column.width">
				{{ footerData[rowIndex][column.field] }}
			</td>
		</tr>
	</tfoot>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyFooter",
		props: {
			footerData: {
				type: Array,
				default: () => []
			},
			footerRows: {
				type: Array,
				default: () => []
			},
			colgroups: {
				type: Array,
				required: true
			}
		}
	};
}
</script>

<style scoped>
/* 表尾样式 */
tfoot {
	background-color: #fafafa;
}

tfoot td {
	padding: 12px 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 500;
	border-top: 1px solid #e8e8e8;
}
</style>
