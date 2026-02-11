<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY_TD,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			rowData: {
				type: Object,
				required: true
			},
			column: {
				type: Object,
				required: true
			},
			columnCollection: {
				type: Array,
				required: true
			},
			rowIndex: {
				type: Number,
				required: true
			},
			colgroups: {
				type: Array,
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			allRowKeys: {
				type: Array,
				required: true
			},
			/*
        expand
        */
			// expand row option
			expandOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// is expand row
			isExpandRow: {
				type: Boolean,
				required: true
			},
			// expanded row keys
			expandedRowkeys: {
				type: Array,
				default: function () {
					return [];
				}
			},

			/*
        checkbox
        */
			// checkbox option
			checkboxOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			internalCheckboxSelectedRowKeys: {
				type: Array,
				default: function () {
					return null;
				}
			},

			/*
        radio
        */
			radioOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			internalRadioSelectedRowKey: {
				type: [String, Number],
				default: null
			},
			// cell style option
			cellStyleOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// event custom option
			eventCustomOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell selection data
			cellSelectionData: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell selection range data
			cellSelectionRangeData: {
				type: Object,
				default: function () {
					return null;
				}
			},
			bodyIndicatorRowKeys: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell span option
			cellSpanOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// edit opttion
			editOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		data() {
			return {
				// 原始单元格数据
				rawCellValue: ""
			};
		},
		computed: {
			/*
        current column collection item
        1、Cache the style、class of each column
        */
			cpt_current_column_collection_item() {
				const { columnCollection, column } = this;
				return columnCollection.find(x => x.colKey === column.key);
			},

			// current row key
			cpt_current_row_key() {
				const { rowData, rowKeyFieldName } = this;
				return rowData[rowKeyFieldName];
			}
		},
		watch: {
			// watch row data
			rowData: {
				handler(rowData) {
					const column = this.column;
					if (column) {
						this.rawCellValue = rowData[column.field];
					}
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			/*
			 * @bodyTdStyle
			 * @desc body td style
			 */
			bodyTdStyle() {
				const { cpt_current_column_collection_item } = this;

				let result = {};

				if (cpt_current_column_collection_item) {
					result = Object.assign(result, cpt_current_column_collection_item.style);
				}

				return result;
			},

			/*
			 * @bodyTdClass
			 * @desc body td class
			 */
			bodyTdClass() {
				const { cpt_current_column_collection_item } = this;

				const { fixed, operationColumn } = this.column;

				let result = {
					[Vue._X_TABLE_EASY_UTILS.clsName("body-td")]: true
				};

				const {
					cellStyleOption,
					rowData,
					column,
					rowIndex,
					allRowKeys,
					cellSelectionData,
					cellSelectionRangeData,
					bodyIndicatorRowKeys,
					cpt_current_row_key
				} = this;

				// column fixed
				if (fixed) {
					result[Vue._X_TABLE_EASY_UTILS.clsName("fixed-left")] = fixed === "left";
					result[Vue._X_TABLE_EASY_UTILS.clsName("fixed-right")] = fixed === "right";
				}

				// operation column
				if (operationColumn) {
					result[Vue._X_TABLE_EASY_UTILS.clsName("operation-col")] = true;
				}

				// cell style option
				if (cellStyleOption && typeof cellStyleOption.bodyCellClass === "function") {
					const customClass = cellStyleOption.bodyCellClass({
						row: rowData,
						column,
						rowIndex
					});
					if (customClass) {
						result[customClass] = true;
					}
				}

				if (cellSelectionData) {
					const { rowKey, colKey } = cellSelectionData.currentCell;

					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
					) {
						if (cpt_current_row_key === rowKey) {
							// cell selection
							if (column["key"] === colKey) {
								result[Vue._X_TABLE_EASY_UTILS.clsName("cell-selection")] = true;
							}
						}

						if (operationColumn) {
							const { topRowKey, bottomRowKey } = cellSelectionRangeData;
							const { startRowKeyIndex } = bodyIndicatorRowKeys;
							const isIndicatorActive = startRowKeyIndex > -1;

							let indicatorRowKeys = [];
							if (topRowKey === bottomRowKey) {
								indicatorRowKeys = [topRowKey];
							} else {
								indicatorRowKeys = Vue._X_TABLE_EASY_UTILS.getRowKeysByRangeRowKeys(
									{
										topRowKey,
										bottomRowKey,
										allRowKeys
									}
								);
							}

							//  cell indicator (operation column)
							if (indicatorRowKeys.indexOf(cpt_current_row_key) > -1) {
								if (isIndicatorActive) {
									result[
										Vue._X_TABLE_EASY_UTILS.clsName("cell-indicator-active")
									] = true;
								} else {
									result[Vue._X_TABLE_EASY_UTILS.clsName("cell-indicator")] =
										true;
								}
							}
						}
					}
				}

				if (cpt_current_column_collection_item) {
					result = Object.assign(result, cpt_current_column_collection_item.class);
				}

				return result;
			},

			// get ellipsis content style
			getEllipsisContentStyle() {
				let result = {};

				const { ellipsis } = this.column;

				if (ellipsis) {
					const { lineClamp } = ellipsis;

					let _lineClamp = Vue._X_TABLE_EASY_UTILS.isNumber(lineClamp) ? lineClamp : 1;
					result["-webkit-line-clamp"] = _lineClamp;
				}

				return result;
			},

			// get render content
			getRenderContent(h) {
				let content = null;

				const { column, rowData, rowIndex, rawCellValue } = this;

				// has render function
				if (typeof column.renderBodyCell === "function") {
					const renderResult = column.renderBodyCell(
						{
							row: rowData,
							column,
							rowIndex
						},
						h
					);

					content = renderResult;
				} else {
					content = rawCellValue;
				}

				// ellipisis
				if (column.ellipsis) {
					const { showTitle } = column.ellipsis;

					// default true
					const isShowTitle = Vue._X_TABLE_EASY_UTILS.isBoolean(showTitle)
						? showTitle
						: true;

					content = h(
						"span",
						{
							attrs: {
								title: isShowTitle ? content : ""
							},
							style: this.getEllipsisContentStyle(),
							class: Vue._X_TABLE_EASY_UTILS.clsName("body-td-span-ellipsis")
						},
						[content]
					);
				}

				return content;
			},

			// get chcekbox content
			getCheckboxContent(h) {
				if (this.column.type === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_TYPES.CHECKBOX) {
					// checkbox content props
					const checkboxProps = {
						props: {
							column: this.column,
							checkboxOption: this.checkboxOption,
							rowKey: this.rowData[this.rowKeyFieldName],
							internalCheckboxSelectedRowKeys: this.internalCheckboxSelectedRowKeys
						}
					};

					return h(Vue._X_TABLE_EASY_COMPONENTS.BodyCheckboxContent, checkboxProps);
				}
				return null;
			},

			// get radio content
			getRadioContent(h) {
				if (this.column.type === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_TYPES.RADIO) {
					// radio props
					const radioProps = {
						props: {
							column: this.column,
							radioOption: this.radioOption,
							rowKey: this.rowData[this.rowKeyFieldName],
							internalRadioSelectedRowKey: this.internalRadioSelectedRowKey
						}
					};

					return h(Vue._X_TABLE_EASY_COMPONENTS.BodyRadioContent, radioProps);
				}
				return null;
			},

			// get cell span
			getCellSpan() {
				const { cellSpanOption, rowData, column, rowIndex } = this;
				let rowspan = 1;
				let colspan = 1;

				if (cellSpanOption) {
					const { bodyCellSpan } = cellSpanOption;

					if (typeof bodyCellSpan === "function") {
						const result = bodyCellSpan({
							row: rowData,
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
			// cell click
			cellClick(e, fn) {
				fn && fn(e);

				const { column, expandOption, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_CLICK,
					{
						event: e,
						rowData,
						column
					}
				);

				if (column.type !== Vue._X_TABLE_EASY_CONSTANTS.COLUMN_TYPES.EXPAND) {
					return false;
				}

				if (expandOption) {
					const eventTargetName = e.target.nodeName;

					const trigger = expandOption.trigger;

					// expand row by click icon
					if (
						!trigger ||
						trigger === Vue._X_TABLE_EASY_CONSTANTS.EXPAND_TRIGGER_TYPES.ICON
					) {
						if (eventTargetName !== "TD") {
							e.stopPropagation();
							this.$emit(Vue._X_TABLE_EASY_EMIT_EVENTS.EXPAND_ROW_CHANGE);
						}
					}
					// expand row by click cell(td)
					else if (trigger === Vue._X_TABLE_EASY_CONSTANTS.EXPAND_TRIGGER_TYPES.CELL) {
						e.stopPropagation();
						this.$emit(Vue._X_TABLE_EASY_EMIT_EVENTS.EXPAND_ROW_CHANGE);
					}
				}
			},
			// dblclick
			cellDblclick(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_DOUBLE_CLICK,
					{
						event: e,
						rowData,
						column
					}
				);
			},
			// contextmenu
			cellContextmenu(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_CONTEXTMENU,
					{
						event: e,
						rowData,
						column
					}
				);
			},
			// mouseenter
			cellMouseenter(e, fn) {
				fn && fn(e);
			},
			// mouseleave
			cellMouseleave(e, fn) {
				fn && fn(e);
			},
			// mousemove
			cellMousemove(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_MOUSEMOVE,
					{
						event: e,
						rowData,
						column
					}
				);
			},
			// mouseover
			cellMouseover(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_MOUSEOVER,
					{
						event: e,
						rowData,
						column
					}
				);
			},
			// mousedown
			cellMousedown(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_MOUSEDOWN,
					{
						event: e,
						rowData,
						column
					}
				);
			},
			// mouseup
			cellMouseup(e, fn) {
				fn && fn(e);

				const { column, rowData } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_CELL_MOUSEUP,
					{
						event: e,
						rowData,
						column
					}
				);
			}
		},
		render(h) {
			const {
				column,
				cellClick,
				rowData,
				isExpandRow,
				expandOption,
				expandedRowkeys,
				rowKeyFieldName,
				eventCustomOption,
				rowIndex
			} = this;

			// expand icon props
			const expandIconProps = {
				props: {
					rowData,
					column,
					expandOption,
					expandedRowkeys,
					rowKeyFieldName,
					cellClick
				}
			};

			const { rowspan, colspan } = this.getCellSpan();
			if (!rowspan || !colspan) {
				return null;
			}

			// custom on cell event
			let customEvents = {};
			if (eventCustomOption) {
				const { bodyCellEvents } = eventCustomOption;

				customEvents = bodyCellEvents
					? bodyCellEvents({ row: rowData, column, rowIndex })
					: {};
			}

			const {
				click,
				dblclick,
				contextmenu,
				mouseenter,
				mouseleave,
				mousemove,
				mouseover,
				mousedown,
				mouseup
			} = customEvents;

			const events = {
				click: e => {
					this.cellClick(e, click);
				},
				dblclick: e => {
					this.cellDblclick(e, dblclick);
				},
				contextmenu: e => {
					this.cellContextmenu(e, contextmenu);
				},
				mouseenter: e => {
					this.cellMouseenter(e, mouseenter);
				},
				mouseleave: e => {
					this.cellMouseleave(e, mouseleave);
				},
				mousemove: e => {
					this.cellMousemove(e, mousemove);
				},
				mouseover: e => {
					this.cellMouseover(e, mouseover);
				},
				mousedown: e => {
					this.cellMousedown(e, mousedown);
				},
				mouseup: e => {
					this.cellMouseup(e, mouseup);
				}
			};

			// td props
			const tdProps = {
				class: this.bodyTdClass(),
				style: this.bodyTdStyle(),
				attrs: {
					rowspan,
					colspan,
					[Vue._X_TABLE_EASY_CONSTANTS.COMPS_CUSTOM_ATTRS.BODY_COLUMN_KEY]: column.key
				},
				on: events
			};

			return h("td", tdProps, [
				// expadn tr icon
				isExpandRow ? h(Vue._X_TABLE_EASY_COMPONENTS.ExpandTrIcon, expandIconProps) : null,
				// checkbox content
				this.getCheckboxContent(h),
				// radio content
				this.getRadioContent(h),
				// other cell content
				this.getRenderContent(h)
			]);
		}
	});
}
</script>
