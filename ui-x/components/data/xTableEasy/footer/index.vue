<template>
	<tfoot v-if="cpt_has_footer_data">
		<tr
			v-for="(footerRow, rowIndex) in footerRows"
			:key="rowIndex"
			:style="{ height: footerRow.rowHeight + 'px' }"
			:class="cpt_footer_row_class">
			<footer-td-component
				v-for="(column, colIndex) in colgroups"
				:key="colIndex"
				:column="column"
				:row-index="rowIndex"
				:footer-data="footerData"
				:has-left-fixed-column="hasLeftFixedColumn"
				:has-right-fixed-column="hasRightFixedColumn"
				:event-custom-option="eventCustomOption"
				:cell-style-option="cellStyleOption"
				:row-style-option="rowStyleOption"
				:cell-span-option="cellSpanOption"
				:is-group-header="isGroupHeader"
				@foot-row-height-change="$emit('foot-row-height-change', { rowIndex, height })" />
		</tr>
	</tfoot>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_FOOTER,
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
			},
			groupColumns: {
				type: Array,
				default: () => []
			},
			headerRows: {
				type: Array,
				default: () => []
			},
			hasLeftFixedColumn: {
				type: Boolean,
				default: false
			},
			hasRightFixedColumn: {
				type: Boolean,
				default: false
			},
			eventCustomOption: {
				type: Object,
				default: null
			},
			cellStyleOption: {
				type: Object,
				default: null
			},
			rowStyleOption: {
				type: Object,
				default: null
			},
			cellSpanOption: {
				type: Object,
				default: null
			},
			isGroupHeader: {
				type: Boolean,
				default: false
			}
		},
		emits: ["foot-row-height-change"],
		computed: {
			// has footer data
			cpt_has_footer_data() {
				return this.footerData && this.footerData.length > 0;
			},
			// footer row class
			cpt_footer_row_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("footer-row")]: true
				};
			}
		}
	});
}
</script>

<style lang="less">
// 表尾样式
@{VE_TABLE_PREFIX-cls} {
	&-footer-row {
		background-color: #fafafa;
	}

	&-footer-row td {
		padding: 12px 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 500;
		border-top: 1px solid #e8e8e8;
	}
}
</style>
