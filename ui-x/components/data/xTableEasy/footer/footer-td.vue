<template>
	<td
		:class="cpt_footer_td_class"
		:style="cpt_footer_td_style"
		:rowspan="cpt_cell_span.rowspan"
		:colspan="cpt_cell_span.colspan"
		@click="handleCellClick"
		@dblclick="handleCellDblclick"
		@contextmenu="handleCellContextmenu"
		@mouseenter="handleCellMouseenter"
		@mouseleave="handleCellMouseleave"
		@mousemove="handleCellMousemove"
		@mouseover="handleCellMouseover"
		@mousedown="handleCellMousedown"
		@mouseup="handleCellMouseup">
		{{ cpt_render_content }}
	</td>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_FOOTER_TD,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			column: {
				type: Object,
				required: true
			},
			rowIndex: {
				type: Number,
				required: true
			},
			footerData: {
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
			// footer row data
			cpt_row_data() {
				return this.footerData[this.rowIndex] || {};
			},
			// is last left fixed column
			cpt_is_last_left_fixed_column() {
				let result = false;

				const { column } = this;
				const { fixed } = column;

				if (fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT) {
					const { field } = column;
					const leftFixedColumns = this.$parent.colgroups.filter(
						x => x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
					);
					const index = leftFixedColumns.findIndex(x => x.field === field);

					if (index === leftFixedColumns.length - 1) {
						result = true;
					}
				}
				return result;
			},
			// is first right fixed column
			cpt_is_first_right_fixed_column() {
				let result = false;

				const { column } = this;
				const { fixed } = column;

				if (fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT) {
					const { field } = column;
					const rightFixedColumns = this.$parent.colgroups.filter(
						x => x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
					);

					if (rightFixedColumns[0] && rightFixedColumns[0].field === field) {
						result = true;
					}
				}
				return result;
			},
			// footer td class
			cpt_footer_td_class() {
				let result = {
					[Vue._X_TABLE_EASY_UTILS.clsName("footer-td")]: true
				};

				const { column, cpt_row_data, rowIndex, cellStyleOption } = this;
				const { fixed } = column;

				// column fixed
				if (fixed) {
					result[Vue._X_TABLE_EASY_UTILS.clsName("fixed-left")] =
						fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT;
					result[Vue._X_TABLE_EASY_UTILS.clsName("fixed-right")] =
						fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT;
					result[Vue._X_TABLE_EASY_UTILS.clsName("last-left-fixed-column")] =
						this.cpt_is_last_left_fixed_column;
					result[Vue._X_TABLE_EASY_UTILS.clsName("first-right-fixed-column")] =
						this.cpt_is_first_right_fixed_column;
				}

				// cell style option
				if (cellStyleOption && typeof cellStyleOption.footerCellClass === "function") {
					const customClass = cellStyleOption.footerCellClass({
						row: cpt_row_data,
						column,
						rowIndex
					});
					if (customClass) {
						result[customClass] = true;
					}
				}

				return result;
			},
			// footer td style
			cpt_footer_td_style() {
				let result = {};

				const { column, rowIndex, $parent } = this;
				const { key, align, fixed } = column;

				// text align
				result["text-align"] = align || "center";

				// fixed left total width or right total width
				if (fixed) {
					let totalWidth = 0;
					// column index
					const columnIndex = $parent.colgroups.findIndex(x => x.key === key);
					if (
						(fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT &&
							columnIndex > 0) ||
						(fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT &&
							columnIndex < $parent.colgroups.length - 1)
					) {
						totalWidth = Vue._X_TABLE_EASY_UTILS.getFixedTotalWidthByColumnKey({
							colgroups: $parent.colgroups,
							colKey: key,
							fixed
						});

						totalWidth = Vue._X_TABLE_EASY_UTILS.getValByUnit(totalWidth);
					}

					result["left"] =
						fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
							? totalWidth
							: "";
					result["right"] =
						fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
							? totalWidth
							: "";
				}

				return result;
			},
			// cell span
			cpt_cell_span() {
				const { cellSpanOption, cpt_row_data, column, rowIndex } = this;
				let rowspan = 1;
				let colspan = 1;

				if (cellSpanOption) {
					const { footerCellSpan } = cellSpanOption;

					if (typeof footerCellSpan === "function") {
						const result = footerCellSpan({
							row: cpt_row_data,
							column,
							rowIndex
						});

						if (typeof result === "object") {
							rowspan = result.rowspan;
							colspan = result.colspan;
						}
					}
				}

				return { rowspan, colspan };
			},
			// render content
			cpt_render_content() {
				const { column, cpt_row_data, rowIndex } = this;

				// has render function
				if (typeof column.renderFooterCell === "function") {
					const renderResult = column.renderFooterCell({
						row: cpt_row_data,
						column,
						rowIndex
					});

					return renderResult;
				} else {
					return cpt_row_data[column.field];
				}
			},
			// custom events
			cpt_custom_events() {
				const { eventCustomOption, cpt_row_data, column, rowIndex } = this;
				let customEvents = {};

				if (eventCustomOption) {
					const { footerCellEvents } = eventCustomOption;
					customEvents = footerCellEvents
						? footerCellEvents({ row: cpt_row_data, column, rowIndex })
						: {};
				}

				return customEvents;
			}
		},
		methods: {
			// cell click
			handleCellClick(e) {
				const { click } = this.cpt_custom_events;
				if (typeof click === "function") {
					click(e);
				}
			},
			// cell dblclick
			handleCellDblclick(e) {
				const { dblclick } = this.cpt_custom_events;
				if (typeof dblclick === "function") {
					dblclick(e);
				}
			},
			// cell contextmenu
			handleCellContextmenu(e) {
				const { contextmenu } = this.cpt_custom_events;
				if (typeof contextmenu === "function") {
					contextmenu(e);
				}
			},
			// cell mouseenter
			handleCellMouseenter(e) {
				const { mouseenter } = this.cpt_custom_events;
				if (typeof mouseenter === "function") {
					mouseenter(e);
				}
			},
			// cell mouseleave
			handleCellMouseleave(e) {
				const { mouseleave } = this.cpt_custom_events;
				if (typeof mouseleave === "function") {
					mouseleave(e);
				}
			},
			// cell mousemove
			handleCellMousemove(e) {
				const { mousemove } = this.cpt_custom_events;
				if (typeof mousemove === "function") {
					mousemove(e);
				}
			},
			// cell mouseover
			handleCellMouseover(e) {
				const { mouseover } = this.cpt_custom_events;
				if (typeof mouseover === "function") {
					mouseover(e);
				}
			},
			// cell mousedown
			handleCellMousedown(e) {
				const { mousedown } = this.cpt_custom_events;
				if (typeof mousedown === "function") {
					mousedown(e);
				}
			},
			// cell mouseup
			handleCellMouseup(e) {
				const { mouseup } = this.cpt_custom_events;
				if (typeof mouseup === "function") {
					mouseup(e);
				}
			}
		}
	});
}
</script>

<style lang="less">
// 表尾单元格样式
@{VE_TABLE_PREFIX-cls} {
	&-footer-td {
		padding: 12px 16px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 500;
		border-top: 1px solid #e8e8e8;
		position: relative;

		&.fixed-left {
			position: sticky;
			left: 0;
			background-color: #fafafa;
			z-index: 10;

			&.last-left-fixed-column {
				border-right: 1px solid #e8e8e8;
			}
		}

		&.fixed-right {
			position: sticky;
			right: 0;
			background-color: #fafafa;
			z-index: 10;

			&.first-right-fixed-column {
				border-left: 1px solid #e8e8e8;
			}
		}
	}
}
</style>
