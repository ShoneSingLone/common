<template>
	<div class="x-table-easy" ref="tableRootRef">
		<div
			:class="tableContainerClass"
			:style="tableContainerWrapperStyle"
			ref="tableContainerWrapperRef">
			<div
				:class="['table-container', tableContainerClass]"
				:style="tableContainerStyle"
				ref="tableContainerRef">
				<div ref="tableContentWrapperRef">
					<table :class="tableClass" :style="tableStyle" ref="tableRef">
						<!-- 表列定义 -->
						<colgroup v-for="(colgroup, index) in colgroups" :key="index">
							<col
								v-for="(col, colIndex) in colgroup"
								:key="colIndex"
								:width="col.width"
								:name="col.colKey" />
						</colgroup>

						<!-- 表头 -->
						<thead v-if="showHeader">
							<tr
								v-for="(headerRow, rowIndex) in headerRows"
								:key="rowIndex"
								:style="{ height: headerRow.rowHeight + 'px' }">
								<th
									v-for="(column, colIndex) in colgroups[rowIndex]"
									:key="colIndex"
									:width="column.width"
									:class="column.class"
									:col-key="column.colKey"
									:col-index="colIndex"
									:row-index="rowIndex"
									:row-key="''">
									{{ column.title }}
								</th>
							</tr>
						</thead>

						<!-- 表体 -->
						<tbody :class="tableBodyClass" ref="tableBodyRef">
							<!-- 虚拟滚动占位符 -->
							<tr
								v-if="isVirtualScroll && showVirtualScrollingPlaceholder"
								:class="['virtual-placeholder']"
								:style="{ height: virtualScrollPlaceholderHeight + 'px' }">
								<td :colspan="colgroups[0].length"></td>
							</tr>

							<!-- 数据行 -->
							<tr
								v-for="(row, rowIndex) in actualRenderTableData"
								:key="rowIndex"
								:row-key="row[rowKeyFieldName]"
								:class="getRowClass(row, rowIndex)"
								@click="handleRowClick(row, rowIndex)"
								@dblclick="handleRowDblClick(row, rowIndex)"
								@contextmenu="handleRowContextmenu(row, rowIndex, $event)">
								<td
									v-for="(column, colIndex) in colgroups[0]"
									:key="colIndex"
									:width="column.width"
									:col-key="column.colKey"
									:col-index="colIndex"
									:row-index="rowIndex"
									:row-key="row[rowKeyFieldName]"
									:class="getColumnClass(column, row, rowIndex, colIndex)"
									@click="handleCellClick(row, rowIndex, column, colIndex)"
									@dblclick="handleCellDblClick(row, rowIndex, column, colIndex)"
									@contextmenu="
										handleCellContextmenu(
											row,
											rowIndex,
											column,
											colIndex,
											$event
										)
									">
									{{ row[column.field] }}
								</td>
							</tr>
						</tbody>

						<!-- 表尾 -->
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
					</table>
				</div>

				<!-- 单元格选择覆盖层 -->
				<div
					v-if="enableCellSelection"
					:class="['cell-selection', { visible: isCellSelectionVisible }]"
					ref="cellSelectionRef"></div>

				<!-- 上下文菜单 -->
				<div
					v-if="showContextmenu"
					:class="['contextmenu', contextMenuType]"
					ref="contextmenuRef"></div>

				<!-- 编辑输入框 -->
				<div v-if="isCellEditing" :class="['edit-input-wrapper']" ref="editInputRef"></div>

				<!-- 列调整大小指示器 -->
				<div
					v-if="isColumnResizing"
					:class="['column-resizer-indicator']"
					:style="columnResizerIndicatorStyle"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasy",
		directives: { "click-outside": null },
		mixins: [],
		props: {
			tableData: { required: true, type: Array },
			footerData: {
				type: Array,
				default: function () {
					return [];
				}
			},
			showHeader: { type: Boolean, default: true },
			columns: { type: Array, required: true },
			rowKeyFieldName: { type: String, default: null },
			scrollWidth: { type: [Number, String], default: null },
			maxHeight: { type: [Number, String], default: null },
			fixedHeader: { type: Boolean, default: true },
			fixedFooter: { type: Boolean, default: true },
			borderAround: { type: Boolean, default: true },
			borderX: { type: Boolean, default: true },
			borderY: { type: Boolean, default: false },
			eventCustomOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			cellStyleOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			cellSpanOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			rowStyleOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			virtualScrollOption: { type: Object, default: null },
			sortOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			expandOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			checkboxOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			radioOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			cellSelectionOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			cellAutofillOption: {
				type: [Object, Boolean],
				default: function () {
					return null;
				}
			},
			editOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		data() {
			return {
				hooks: {},
				parentRendered: false,
				tableViewportWidth: 0,
				columnsOptionResetTime: 0,
				tableRootRef: "tableRootRef",
				tableContainerWrapperRef: "tableContainerWrapperRef",
				tableContainerRef: "tableContainerRef",
				tableRef: "tableRef",
				tableBodyRef: "tableBodyRef",
				tableContentWrapperRef: "tableContentWrapperRef",
				virtualPhantomRef: "virtualPhantomRef",
				editInputRef: "editInputRef",
				cellSelectionRef: "cellSelectionRef",
				contextmenuRef: "contextmenuRef",
				cloneColumns: [],
				isGroupHeader: false,
				headerRows: [],
				footerRows: [],
				colgroups: [],
				groupColumns: [],
				hiddenColumns: [],
				virtualScrollVisibleData: [],
				virtualScrollVisibleIndexs: { start: -1, end: -1 },
				defaultVirtualScrollBufferScale: 1,
				defaultVirtualScrollMinRowHeight: 40,
				defaultPlaceholderPerScrollingRowCount: 8,
				virtualScrollStartIndex: 0,
				previewVirtualScrollStartIndex: 0,
				virtualScrollEndIndex: 0,
				showVirtualScrollingPlaceholder: false,
				disablePointerEventsTimeoutId: null,
				isLeftScrolling: false,
				isRightScrolling: false,
				isVerticalScrolling: false,
				hasXScrollBar: false,
				hasYScrollBar: false,
				scrollBarWidth: 0,
				previewTableContainerScrollLeft: null,
				headerIndicatorColKeys: {
					startColKey: "",
					startColKeyIndex: -1,
					endColKey: "",
					endColKeyIndex: -1
				},
				bodyIndicatorRowKeys: {
					startRowKey: "",
					startRowKeyIndex: -1,
					endRowKey: "",
					endRowKeyIndex: -1
				},
				cellSelectionData: {
					currentCell: { rowKey: "", colKey: "", rowIndex: -1 },
					normalEndCell: { rowKey: "", colKey: "", rowIndex: -1 },
					autoFillEndCell: { rowKey: "", colKey: "" }
				},
				cellSelectionRangeData: {
					leftColKey: "",
					rightColKey: "",
					topRowKey: "",
					bottomRowKey: ""
				},
				isHeaderCellMousedown: false,
				isBodyCellMousedown: false,
				isBodyOperationColumnMousedown: false,
				isAutofillStarting: false,
				autofillingDirection: null,
				currentCellSelectionType: "",
				tableOffestHeight: 0,
				tableHeight: 0,
				highlightRowKey: "",
				editingCell: { rowKey: "", colKey: "", row: null, column: null },
				editorInputStartValue: "",
				enableStopEditing: true,
				contextmenuEventTarget: "",
				contextmenuOptions: [],
				isColumnResizerHover: false,
				isColumnResizing: false,
				columnResizerPosition: 0,
				contextmenuHeaderOption: null,
				contextmenuBodyOption: null,
				columnWidthResizeOption: null
			};
		},
		computed: {
			actualRenderTableData: function () {
				return this.isVirtualScroll ? this.virtualScrollVisibleData : this.tableData;
			},
			allRowKeys: function () {
				var e2 = [],
					t2 = this.tableData,
					n2 = this.rowKeyFieldName;
				return (
					n2 &&
						(e2 = t2.map(function (e3) {
							return e3[n2];
						})),
					e2
				);
			},
			virtualScrollBufferCount: function () {
				var e2 = 0,
					t2 = this.virtualScrollOption,
					n2 = this.defaultVirtualScrollBufferScale,
					o2 = this.virtualScrollVisibleCount;
				if (t2) {
					var i2 = t2.bufferScale;
					e2 = (typeof i2 === "number" && i2 > 0 ? i2 : n2) * o2;
				}
				return e2;
			},
			virtualScrollVisibleCount: function () {
				var e2 = 0,
					t2 = this.isVirtualScroll,
					n2 = this.virtualScrollOption,
					o2 = this.defaultVirtualScrollMinRowHeight,
					i2 = this.maxHeight,
					r2 = this.tableOffestHeight;
				if (t2 && i2) {
					var l2 = typeof n2.minRowHeight === "number" ? n2.minRowHeight : o2;
					typeof i2 === "number"
						? (e2 = Math.ceil(i2 / l2))
						: r2 && (e2 = Math.ceil(r2 / l2));
				}
				return e2;
			},
			virtualScrollPlaceholderHeight: function () {
				var e2 = 0,
					t2 = this.isVirtualScroll,
					n2 = this.virtualScrollOption,
					o2 = this.defaultVirtualScrollMinRowHeight;
				if (t2 && this.tableData.length > 0) {
					var i2 = typeof n2.minRowHeight === "number" ? n2.minRowHeight : o2;
					e2 = this.tableData.length * i2;
				}
				return e2;
			},
			tableContainerWrapperStyle: function () {
				return { width: "100%" };
			},
			tableContainerStyle: function () {
				var e2 = this.maxHeight,
					t2 = null;
				this.isVirtualScroll
					? e2
						? (t2 = typeof e2 === "number" ? e2 + "px" : e2)
						: console.error(
								"maxHeight prop is required when 'virtualScrollOption.enable = true'"
							)
					: ((t2 = this.tableHeight),
						this.hasXScrollBar && (t2 += this.getScrollBarWidth()),
						(t2 = typeof t2 === "number" ? t2 + "px" : t2));
				return { "max-height": typeof e2 === "number" ? e2 + "px" : e2, height: t2 };
			},
			tableStyle: function () {
				return {
					width:
						typeof this.scrollWidth === "number"
							? this.scrollWidth + "px"
							: this.scrollWidth
				};
			},
			tableClass: function () {
				var e2 = {};
				return ((e2["border-x"] = this.borderX), (e2["border-y"] = this.borderY), e2);
			},
			tableContainerClass: function () {
				var e2 = {},
					t2 = this.isVirtualScroll,
					n2 = this.isLeftScrolling,
					o2 = this.isRightScrolling,
					i2 = this.isVerticalScrolling,
					r2 = this.isCellEditing,
					l2 = this.isAutofillStarting,
					a2 = this.enableCellSelection;
				return (
					(e2["container"] = true),
					(e2["virtual-scroll"] = t2),
					(e2["container-left-scrolling"] = n2),
					(e2["container-right-scrolling"] = o2),
					(e2["container-vertical-scrolling"] = i2),
					(e2["is-cell-editing"] = r2),
					(e2["autofilling"] = l2),
					(e2["enable-cell-selection"] = a2),
					e2
				);
			},
			tableBodyClass: function () {
				var e2 = {},
					t2 = this.rowStyleOption,
					n2 = true,
					o2 = true,
					i2 = false;
				return (
					t2 && ((n2 = t2.hoverHighlight), (o2 = t2.clickHighlight), (i2 = t2.stripe)),
					(e2["stripe"] = true === i2),
					(e2["row-hover"] = false !== n2),
					(e2["row-highlight"] = false !== o2),
					e2
				);
			},
			isVirtualScroll: function () {
				var e2 = this.virtualScrollOption;
				return e2 && e2.enable;
			},
			hasFixedColumn: function () {
				return this.colgroups.some(function (e2) {
					return e2.fixed === "left" || e2.fixed === "right";
				});
			},
			hasLeftFixedColumn: function () {
				return this.colgroups.some(function (e2) {
					return e2.fixed === "left";
				});
			},
			hasRightFixedColumn: function () {
				return this.colgroups.some(function (e2) {
					return e2.fixed === "right";
				});
			},
			isCellEditing: function () {
				var e2 = this.editingCell;
				return e2.rowKey !== "" && e2.colKey !== "";
			},
			hasEditColumn: function () {
				return this.colgroups.some(function (e2) {
					return e2.edit;
				});
			},
			enableHeaderContextmenu: function () {
				var e2 = false,
					t2 = this.contextmenuHeaderOption;
				if (t2) {
					var n2 = t2.contextmenus;
					Array.isArray(n2) && n2.length && (e2 = true);
				}
				return e2;
			},
			enableBodyContextmenu: function () {
				var e2 = false,
					t2 = this.contextmenuBodyOption;
				if (t2) {
					var n2 = t2.contextmenus;
					Array.isArray(n2) && n2.length && (e2 = true);
				}
				return e2;
			},
			contextMenuType: function () {
				return this.headerIndicatorColKeys.startColKeyIndex > -1
					? "headerContextmenu"
					: "bodyContextmenu";
			},
			enableCellSelection: function () {
				var e2 = true,
					t2 = this.cellSelectionOption;
				return (
					(this.rowKeyFieldName === "" ||
						(t2 && typeof t2.enable === "boolean" && false === t2.enable)) &&
						(e2 = false),
					e2
				);
			},
			enableClipboard: function () {
				return this.rowKeyFieldName;
			},
			enableColumnResize: function () {
				var e2 = false,
					t2 = this.columnWidthResizeOption;
				if (t2) {
					var n2 = t2.enable;
					typeof n2 === "boolean" && (e2 = n2);
				}
				return e2;
			},
			headerTotalHeight: function () {
				var e2 = 0;
				return (
					this.showHeader &&
						(e2 = this.headerRows.reduce(function (e3, t2) {
							return t2.rowHeight + e3;
						}, 0)),
					e2
				);
			},
			footerTotalHeight: function () {
				return this.footerRows.reduce(function (e2, t2) {
					return t2.rowHeight + e2;
				}, 0);
			},
			isCellSelectionVisible: function () {
				var e2 = this.cellSelectionData;
				return (
					e2.currentCell.rowKey !== "" ||
					e2.normalEndCell.rowKey !== "" ||
					e2.autoFillEndCell.rowKey !== ""
				);
			},
			showContextmenu: function () {
				return this.contextmenuOptions.length > 0;
			},
			columnResizerIndicatorStyle: function () {
				return {
					left: this.columnResizerPosition + "px"
				};
			}
		},
		watch: {
			tableData: {
				handler: function (e2, t2) {
					(this.initVirtualScrollPositions(), t2 && this.initVirtualScroll());
				},
				immediate: true
			},
			allRowKeys: {
				handler: function (e2) {
					if (Array.isArray(e2)) {
						var t2 = this.cellSelectionData.currentCell;
						t2.rowIndex > -1 &&
							-1 === e2.indexOf(t2.rowKey) &&
							this.clearCellSelectionCurrentCell();
					}
				},
				immediate: false
			},
			columns: {
				handler: function (e2, t2) {
					(this.initColumns(),
						this.initGroupColumns(),
						this.initColumnWidthByColumnResize(),
						e2 != t2 && t2 && (this.columnsOptionResetTime++, this.initScrolling()));
				},
				immediate: true
			},
			cloneColumns: {
				handler: function () {
					(this.initGroupColumns(),
						this.initColumnWidthByColumnResize(),
						this.columnsOptionResetTime++,
						this.initScrolling());
				},
				immediate: false
			},
			groupColumns: {
				handler: function (e2) {
					!(Array.isArray(e2) && e2.length > 0) || this.initHeaderRows();
				},
				immediate: true
			},
			footerData: {
				handler: function (e2) {
					!(Array.isArray(e2) && e2.length > 0) || this.initFooterRows();
				},
				immediate: true
			},
			"virtualScrollOption.enable": {
				handler: function (e2) {
					e2
						? (this.initVirtualScrollPositions(), this.initVirtualScroll())
						: this.setTableContentTopValue({ top: 0 });
				},
				immediate: false
			},
			isAutofillStarting: {
				handler: function (e2) {
					e2 ||
						(this.setCellSelectionByAutofill(),
						this.clearCellSelectionAutofillEndCell());
				}
			},
			"cellSelectionData.currentCell": {
				handler: function () {
					this.setCurrentCellSelectionType();
				},
				deep: true,
				immediate: true
			},
			"cellSelectionData.normalEndCell": {
				handler: function () {
					this.setCurrentCellSelectionType();
				},
				deep: true,
				immediate: true
			},
			headerIndicatorColKeys: {
				handler: function () {
					this.setRangeCellSelectionByHeaderIndicator();
				},
				deep: true
			},
			bodyIndicatorRowKeys: {
				handler: function () {
					this.setRangeCellSelectionByBodyIndicator();
				},
				deep: true
			}
		},
		methods: {
			// 核心初始化方法
			initColumns: function () {
				// 初始化列配置
				this.cloneColumns = JSON.parse(JSON.stringify(this.columns));
				this.initColgroups();
			},
			initColgroups: function () {
				// 初始化列组
				if (!this.cloneColumns || this.cloneColumns.length === 0) {
					this.colgroups = [];
					return;
				}

				this.isGroupHeader = this.cloneColumns.some(
					column => column.children && column.children.length > 0
				);

				if (this.isGroupHeader) {
					// 处理分组表头
					this.initGroupColumns();
				} else {
					// 处理普通表头
					this.colgroups = [this.cloneColumns];
				}
			},
			initGroupColumns: function () {
				// 初始化分组列
				this.groupColumns = [];
				// 实现分组列逻辑
			},
			initHeaderRows: function () {
				var e2 = this.groupColumns;
				Array.isArray(e2) &&
					(this.headerRows = e2.map(function () {
						return { rowHeight: 0 };
					}));
			},
			initFooterRows: function () {
				var e2 = this.footerData;
				Array.isArray(e2) &&
					(this.footerRows = e2.map(function () {
						return { rowHeight: 0 };
					}));
			},
			initVirtualScroll: function () {
				// 初始化虚拟滚动
			},
			initVirtualScrollPositions: function () {
				// 初始化虚拟滚动位置
				if (!this.isVirtualScroll) return;

				this.virtualScrollVisibleData = this.tableData.slice(
					0,
					this.virtualScrollVisibleCount + this.virtualScrollBufferCount
				);
				this.virtualScrollVisibleIndexs = {
					start: 0,
					end:
						Math.min(
							this.virtualScrollVisibleCount + this.virtualScrollBufferCount,
							this.tableData.length
						) - 1
				};
				this.virtualScrollStartIndex = 0;
				this.virtualScrollEndIndex = this.virtualScrollVisibleIndexs.end;
			},
			initScrolling: function () {
				// 初始化滚动
			},
			initColumnWidthByColumnResize: function () {
				// 初始化列宽调整
			},
			// 行相关方法
			getRowClass: function (row, rowIndex) {
				// 获取行样式类
				var rowClass = {};
				var rowKey = this.rowKeyFieldName ? row[this.rowKeyFieldName] : rowIndex;

				// 高亮行
				if (rowKey === this.highlightRowKey) {
					rowClass["row-highlighted"] = true;
				}

				// 斑马纹
				if (this.rowStyleOption && this.rowStyleOption.stripe) {
					rowClass["row-stripe"] = rowIndex % 2 === 1;
				}

				return rowClass;
			},
			// 列相关方法
			getColumnClass: function (column, row, rowIndex, colIndex) {
				// 获取列样式类
				var colClass = {};
				var rowKey = this.rowKeyFieldName ? row[this.rowKeyFieldName] : rowIndex;

				// 当前编辑单元格
				if (
					this.editingCell.rowKey === rowKey &&
					this.editingCell.colKey === column.colKey
				) {
					colClass["cell-editing"] = true;
				}

				// 选择的单元格
				if (this.isCellInSelectionRange(rowKey, column.colKey)) {
					colClass["cell-selected"] = true;
				}

				return colClass;
			},
			// 事件处理方法
			handleRowClick: function (row, rowIndex, event) {
				// 处理行点击事件
				this.$emit("row-click", { row, rowIndex, event });
			},
			handleRowDblClick: function (row, rowIndex, event) {
				// 处理行双击事件
				this.$emit("row-dblclick", { row, rowIndex, event });
			},
			handleRowContextmenu: function (row, rowIndex, event) {
				// 处理行右键菜单事件
				event.preventDefault();
				this.$emit("row-contextmenu", { row, rowIndex, event });
			},
			handleCellClick: function (row, rowIndex, column, colIndex, event) {
				// 处理单元格点击事件
				this.$emit("cell-click", { row, rowIndex, column, colIndex, event });
			},
			handleCellDblClick: function (row, rowIndex, column, colIndex, event) {
				// 处理单元格双击事件
				this.$emit("cell-dblclick", { row, rowIndex, column, colIndex, event });
			},
			handleCellContextmenu: function (row, rowIndex, column, colIndex, event) {
				// 处理单元格右键菜单事件
				event.preventDefault();
				this.$emit("cell-contextmenu", { row, rowIndex, column, colIndex, event });
			},
			// 单元格选择相关方法
			isCellInSelectionRange: function (rowKey, colKey) {
				// 检查单元格是否在选择范围内
				var range = this.cellSelectionRangeData;
				if (
					!range ||
					!range.leftColKey ||
					!range.rightColKey ||
					!range.topRowKey ||
					!range.bottomRowKey
				) {
					return false;
				}

				// 实现单元格选择范围检查逻辑
				return false;
			},
			clearCellSelectionCurrentCell: function () {
				// 清除当前单元格选择
				this.cellSelectionData.currentCell = { rowKey: "", colKey: "", rowIndex: -1 };
			},
			setCellSelectionByAutofill: function () {
				// 通过自动填充设置单元格选择
			},
			clearCellSelectionAutofillEndCell: function () {
				// 清除自动填充结束单元格选择
				this.cellSelectionData.autoFillEndCell = { rowKey: "", colKey: "" };
			},
			setCurrentCellSelectionType: function () {
				// 设置当前单元格选择类型
			},
			setRangeCellSelectionByHeaderIndicator: function () {
				// 通过表头指示器设置范围单元格选择
			},
			setRangeCellSelectionByBodyIndicator: function () {
				// 通过表体指示器设置范围单元格选择
			},
			// 虚拟滚动相关方法
			setTableContentTopValue: function (e2) {
				// 设置表格内容顶部值
			},
			// 滚动条相关方法
			getScrollBarWidth: function () {
				// 获取滚动条宽度
				return this.scrollBarWidth || 0;
			}
		},
		mounted() {
			// 表格组件挂载逻辑
		},
		beforeDestroy() {
			// 表格组件销毁逻辑
		}
	};
}
</script>

<style scoped>
/* 表格组件基础样式 */
.x-table-easy {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
	font-family:
		-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	font-size: 14px;
	color: #333;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

/* 表格容器样式 */
.table-container {
	overflow: auto;
	position: relative;
	box-sizing: border-box;
}

/* 表格样式 */
.x-table-easy table {
	border-collapse: collapse;
	border-spacing: 0;
	table-layout: fixed;
	width: 100%;
	box-sizing: border-box;
}

/* 表格边框样式 */
.x-table-easy .border-x th,
.x-table-easy .border-x td {
	border-right: 1px solid #e8e8e8;
}

.x-table-easy .border-y th,
.x-table-easy .border-y td {
	border-bottom: 1px solid #e8e8e8;
}

/* 表头样式 */
.x-table-easy th {
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

.x-table-easy th:hover {
	background-color: #f0f2f5;
}

/* 表体样式 */
.x-table-easy td {
	padding: 12px 16px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	box-sizing: border-box;
	transition: background-color 0.3s;
	position: relative;
}

/* 行样式 */
.x-table-easy .row-hover tr:hover {
	background-color: #f5f7fa;
}

.x-table-easy .row-highlight tr[row-key="highlightRowKey"],
.x-table-easy tr.row-highlighted {
	background-color: #e6f7ff;
}

.x-table-easy .stripe tr:nth-child(even),
.x-table-easy tr.row-stripe {
	background-color: #fafafa;
}

/* 虚拟滚动样式 */
.x-table-easy .virtual-scroll {
	overflow: auto;
}

/* 虚拟滚动占位符样式 */
.x-table-easy .virtual-placeholder {
	overflow: hidden;
	background: linear-gradient(90deg, rgba(240, 242, 245, 0.8), rgba(248, 249, 250, 0.8));
	background-size: 200% 100%;
	animation: placeholderShimmer 1.5s infinite;
}

@keyframes placeholderShimmer {
	0% {
		background-position: -200px 0;
	}
	100% {
		background-position: 200px 0;
	}
}

/* 容器滚动样式 */
.x-table-easy .container-left-scrolling,
.x-table-easy .container-right-scrolling,
.x-table-easy .container-vertical-scrolling {
	pointer-events: none;
}

/* 单元格选择样式 */
.x-table-easy .enable-cell-selection {
	user-select: all;
}

.x-table-easy .cell-selection {
	position: absolute;
	pointer-events: none;
	background-color: rgba(102, 175, 233, 0.2);
	border: 1px solid #66afe9;
	z-index: 100;
	opacity: 0;
	transition: opacity 0.2s;
}

.x-table-easy .cell-selection.visible {
	opacity: 1;
}

.x-table-easy td.cell-selected {
	background-color: rgba(102, 175, 233, 0.2);
	border: 1px solid #66afe9;
}

/* 单元格编辑样式 */
.x-table-easy .is-cell-editing {
	/* 单元格编辑样式 */
}

.x-table-easy .edit-input-wrapper {
	position: absolute;
	z-index: 200;
	border: 1px solid #66afe9;
	background-color: #fff;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.x-table-easy td.cell-editing {
	background-color: #fff;
	border: 1px solid #66afe9;
	box-shadow: 0 0 0 2px rgba(102, 175, 233, 0.2);
}

/* 自动填充样式 */
.x-table-easy .autofilling {
	/* 自动填充样式 */
}

/* 上下文菜单样式 */
.x-table-easy .contextmenu {
	position: absolute;
	z-index: 300;
	background-color: #fff;
	border: 1px solid #d9d9d9;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	padding: 4px 0;
	min-width: 120px;
}

/* 列调整大小样式 */
.x-table-easy .column-resizer-indicator {
	position: absolute;
	z-index: 150;
	width: 2px;
	height: 100%;
	background-color: #1890ff;
	cursor: col-resize;
}

/* 禁用指针事件样式 */
.x-table-easy .disable-pointer-events {
	pointer-events: none;
}

/* 滚动条样式 */
.x-table-easy ::-webkit-scrollbar {
	width: 8px;
	height: 8px;
}

.x-table-easy ::-webkit-scrollbar-track {
	background-color: #f0f2f5;
	border-radius: 4px;
}

.x-table-easy ::-webkit-scrollbar-thumb {
	background-color: #c1c1c1;
	border-radius: 4px;
	transition: background-color 0.3s;
}

.x-table-easy ::-webkit-scrollbar-thumb:hover {
	background-color: #a8a8a8;
}

/* 表头排序指示器样式 */
.x-table-easy th .sort-indicator {
	display: inline-block;
	margin-left: 4px;
	vertical-align: middle;
}

/* 表头过滤样式 */
.x-table-easy th .filter-icon {
	margin-left: 4px;
	cursor: pointer;
	color: #999;
	transition: color 0.3s;
}

.x-table-easy th .filter-icon:hover {
	color: #1890ff;
}
</style>
