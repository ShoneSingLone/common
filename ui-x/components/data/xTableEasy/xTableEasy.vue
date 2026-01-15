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
						<xTableEasyColgroup :colgroups="colgroups" />

						<!-- 表头 -->
						<xTableEasyHeader
							:show-header="showHeader"
							:group-columns="groupColumns"
							:header-rows="headerRows" />

						<!-- 表体 -->
						<xTableEasyBody
							:actual-render-table-data="actualRenderTableData"
							:colgroups="colgroups"
							:row-key-field-name="rowKeyFieldName"
							:expand-option="expandOption"
							:is-virtual-scroll="isVirtualScroll"
							:show-virtual-scrolling-placeholder="showVirtualScrollingPlaceholder"
							:virtual-scroll-placeholder-height="virtualScrollPlaceholderHeight"
							:table-body-class="tableBodyClass"
							:expanded-row-keys="expandedRowKeys"
							@row-click="handleRowClick"
							@row-dblclick="handleRowDblClick"
							@row-contextmenu="handleRowContextmenu"
							@row-expand="handleRowExpand"
							@row-collapse="handleRowCollapse"
							@expand-change="handleExpandChange"
							@cell-click="handleCellClick"
							@cell-dblclick="handleCellDblClick"
							@cell-contextmenu="handleCellContextmenu" />

						<!-- 表尾 -->
						<xTableEasyFooter
							:footer-data="footerData"
							:footer-rows="footerRows"
							:colgroups="colgroups" />
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
	// 导入子组件和指令
	const [
		xTableEasyColgroup,
		xTableEasyHeader,
		xTableEasyBody,
		xTableEasyFooter,
		// 导入指令
		Clickoutside,
		// 导入常量和工具
		constant,
		clipboard,
		store,
		util
	] = await Promise.all([
		_.$importVue("./colgroup/index.vue"),
		_.$importVue("./header/index.vue"),
		_.$importVue("./body/index.vue"),
		_.$importVue("./footer/index.vue"),
		// 导入指令
		_.$importVue("/common/ui-x/directive/clickoutside.vue"),
		// 导入常量和工具
		_.$importVue("./util/constant.vue"),
		_.$importVue("./util/clipboard.vue"),
		_.$importVue("./util/store.vue"),
		_.$importVue("./util/index.vue")
	]);

	return {
		name: "xTableEasy",
		components: {
			xTableEasyColgroup,
			xTableEasyHeader,
			xTableEasyBody,
			xTableEasyFooter
		},
		directives: { "click-outside": Clickoutside },
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
			},
			// 列隐藏配置
			columnHiddenOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// 表头上下文菜单配置
			contextmenuHeaderOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// 表体上下文菜单配置
			contextmenuBodyOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// 剪贴板配置
			clipboardOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// 列宽调整配置
			columnWidthResizeOption: {
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
				// 展开行相关
				expandedRowKeys: new Set()
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
				// 初始化列隐藏配置
				var e2 = this.columnHiddenOption;
				if (e2) {
					var t2 = e2.defaultHiddenColumnKeys;
					Array.isArray(t2) && t2.length && (this.hiddenColumns = t2);
				}
				this.showOrHideColumns();
			},
			// 显示或隐藏列
			showOrHideColumns: function () {
				var e2 = JSON.parse(JSON.stringify(this.columns));
				e2 = e2.map(function (e3) {
					return (e3.operationColumn && (e3.fixed = "left"), e3);
				});
				var t2 = this.hiddenColumns;
				if (Array.isArray(t2) && t2.length) {
					t2.forEach(function (t3) {
						e2 = this.recursiveRemoveColumnByKey(e2, t3);
					});
				}
				((this.cloneColumns = e2), this.initColgroups());
			},
			// 递归根据key移除列
			recursiveRemoveColumnByKey: function (columns, key) {
				// 使用工具函数递归移除列
				return util.recursiveRemoveColumnByKey(columns, key);
			},
			// 初始化列组
			initColgroups: function () {
				// 初始化列组
				if (!this.cloneColumns || this.cloneColumns.length === 0) {
					this.colgroups = [];
					this.groupColumns = [];
					return;
				}

				this.isGroupHeader = this.cloneColumns.some(
					column => column.children && column.children.length > 0
				);

				// 处理分组列
				this.initGroupColumns();
			},
			// 初始化分组列
			initGroupColumns: function () {
				// 使用工具函数初始化分组列
				const result = util.initGroupColumns(this.cloneColumns);
				this.isGroupHeader = result.isGroupHeader;
				this.colgroups = result.colgroups;
				this.groupColumns = result.groupColumns;
			},
			// 初始化表头行
			initHeaderRows: function () {
				var e2 = this.groupColumns;
				Array.isArray(e2) &&
					(this.headerRows = e2.map(function () {
						return { rowHeight: 0 };
					}));
			},
			// 初始化表尾行
			initFooterRows: function () {
				var e2 = this.footerData;
				Array.isArray(e2) &&
					(this.footerRows = e2.map(function () {
						return { rowHeight: 0 };
					}));
			},
			// 表头行高调整
			headerRowHeightChange: function (e2) {
				var t2 = e2.rowIndex,
					n2 = e2.height;
				this.headerRows.splice(t2, 1, { rowHeight: n2 });
			},
			// 表尾行高调整
			footRowHeightChange: function (e2) {
				var t2 = e2.rowIndex,
					n2 = e2.height;
				this.footerRows.splice(t2, 1, { rowHeight: n2 });
			},
			// 单元格宽度变化
			bodyCellWidthChange: function (e2) {
				this.colgroups = this.colgroups.map(function (t2) {
					return ((t2._realTimeWidth = e2.get(t2.key)), t2);
				});
			},
			// 设置列宽
			setColumnWidth: function (e2) {
				var t2 = e2.colKey,
					n2 = e2.width;
				this.colgroups = this.colgroups.map(function (e3) {
					return (e3.key === t2 && (e3._columnResizeWidth = n2), e3);
				});
				this.$nextTick(this.setScrollBarStatus);
			},
			// 更新滚动条状态
			setScrollBarStatus: function () {
				// 实现滚动条状态更新
			},
			// 更新分组列排序
			updateColgroupsBySortChange: function (e2) {
				this.colgroups = this.colgroups.map(function (t2) {
					return (
						Object.keys(e2).indexOf(t2.field) > -1 && (t2.sortBy = e2[t2.field]),
						t2
					);
				});
			},
			// 单元格选择相关方法
			cellSelectionCurrentCellChange: function (e2) {
				var t2 = e2.rowKey,
					n2 = e2.colKey;
				this.cellSelectionData.currentCell.colKey = n2;
				this.cellSelectionData.currentCell.rowKey = t2;
				this.cellSelectionData.currentCell.rowIndex = this.allRowKeys.indexOf(t2);
			},
			// 单元格选择结束单元格变化
			cellSelectionNormalEndCellChange: function (e2) {
				var t2 = e2.rowKey,
					n2 = e2.colKey;
				this.cellSelectionData.normalEndCell.colKey = n2;
				this.cellSelectionData.normalEndCell.rowKey = t2;
				this.cellSelectionData.normalEndCell.rowIndex = this.allRowKeys.indexOf(t2);
			},
			// 清除单元格选择结束单元格
			clearCellSelectionNormalEndCell: function () {
				this.cellSelectionData.normalEndCell = { rowKey: "", colKey: "", rowIndex: -1 };
			},
			// 清除当前单元格选择
			clearCellSelectionCurrentCell: function () {
				this.cellSelectionData.currentCell = { rowKey: "", colKey: "", rowIndex: -1 };
			},
			// 清除自动填充结束单元格
			clearCellSelectionAutofillEndCell: function () {
				this.cellSelectionData.autoFillEndCell = { rowKey: "", colKey: "" };
			},
			// 设置自动填充后的单元格选择
			setCellSelectionByAutofill: function () {
				// 通过自动填充设置单元格选择
			},
			// 设置当前单元格选择类型
			setCurrentCellSelectionType: function () {
				// 设置当前单元格选择类型
			},
			// 表头指示器列键变化
			headerIndicatorColKeysChange: function (e2) {
				var t2 = e2.startColKey,
					n2 = e2.endColKey;
				var o2 = this.colgroups;
				this.headerIndicatorColKeys.startColKey = t2;
				this.headerIndicatorColKeys.startColKeyIndex = o2.findIndex(function (e3) {
					return e3.key === t2;
				});
				this.headerIndicatorColKeys.endColKey = n2;
				this.headerIndicatorColKeys.endColKeyIndex = o2.findIndex(function (e3) {
					return e3.key === n2;
				});
			},
			// 清除表头指示器列键
			clearHeaderIndicatorColKeys: function () {
				this.headerIndicatorColKeys.startColKey = "";
				this.headerIndicatorColKeys.startColKeyIndex = -1;
				this.headerIndicatorColKeys.endColKey = "";
				this.headerIndicatorColKeys.endColKeyIndex = -1;
			},
			// 设置通过表头指示器的范围单元格选择
			setRangeCellSelectionByHeaderIndicator: function () {
				// 通过表头指示器设置范围单元格选择
			},
			// 表体指示器行键变化
			bodyIndicatorRowKeysChange: function (e2) {
				var t2 = e2.startRowKey,
					n2 = e2.endRowKey;
				var o2 = this.allRowKeys;
				this.bodyIndicatorRowKeys.startRowKey = t2;
				this.bodyIndicatorRowKeys.startRowKeyIndex = o2.indexOf(t2);
				this.bodyIndicatorRowKeys.endRowKey = n2;
				this.bodyIndicatorRowKeys.endRowKeyIndex = o2.indexOf(n2);
			},
			// 清除表体指示器行键
			clearBodyIndicatorRowKeys: function () {
				this.bodyIndicatorRowKeys.startRowKey = "";
				this.bodyIndicatorRowKeys.startRowKeyIndex = -1;
				this.bodyIndicatorRowKeys.endRowKey = "";
				this.bodyIndicatorRowKeys.endRowKeyIndex = -1;
			},
			// 设置通过表体指示器的范围单元格选择
			setRangeCellSelectionByBodyIndicator: function () {
				// 通过表体指示器设置范围单元格选择
			},
			// 初始化列宽调整
			initColumnWidthByColumnResize: function () {
				var e2 = this.enableColumnResize;
				var t2 = 50;
				if (e2) {
					this.colgroups = this.colgroups.map(function (e3) {
						var n2 = t2;
						typeof e3.width === "number" && (n2 = e3.width);
						return Object.assign({}, e3, { _columnResizeWidth: n2 });
					});
				}
			},
			// 初始化滚动
			initScrolling: function () {
				// 初始化滚动
			},
			// 初始化虚拟滚动
			initVirtualScroll: function () {
				// 初始化虚拟滚动
				if (!this.isVirtualScroll) return;

				this.initVirtualScrollPositions();
				this.bindScrollEvent();
			},
			// 初始化虚拟滚动位置
			initVirtualScrollPositions: function () {
				// 初始化虚拟滚动位置
				if (!this.isVirtualScroll) return;

				const visibleCount = this.virtualScrollVisibleCount;
				const bufferCount = this.virtualScrollBufferCount;
				const totalCount = this.tableData.length;

				// 计算可见数据范围
				const startIndex = Math.max(0, this.virtualScrollStartIndex);
				const endIndex = Math.min(
					totalCount - 1,
					startIndex + visibleCount + bufferCount * 2
				);

				this.virtualScrollVisibleData = this.tableData.slice(startIndex, endIndex + 1);
				this.virtualScrollVisibleIndexs = {
					start: startIndex,
					end: endIndex
				};
				this.virtualScrollEndIndex = endIndex;
			},
			// 绑定滚动事件
			bindScrollEvent: function () {
				// 绑定滚动事件
				const container = this.$refs.tableContainerRef;
				if (!container) return;

				// 移除之前的事件监听器，避免重复绑定
				container.removeEventListener("scroll", this.handleScroll);
				container.addEventListener("scroll", this.handleScroll);
			},
			// 处理滚动事件
			handleScroll: function (event) {
				// 处理滚动事件
				const container = event.target;
				const scrollTop = container.scrollTop;

				if (this.isVirtualScroll) {
					this.updateVirtualScrollData(scrollTop);
				}

				// 触发滚动事件
				this.$emit("scroll", { scrollTop, scrollLeft: container.scrollLeft });
			},
			// 更新虚拟滚动数据
			updateVirtualScrollData: function (scrollTop) {
				// 更新虚拟滚动数据
				if (!this.isVirtualScroll) return;

				const minRowHeight =
					this.virtualScrollOption?.minRowHeight || this.defaultVirtualScrollMinRowHeight;
				const visibleCount = this.virtualScrollVisibleCount;
				const bufferCount = this.virtualScrollBufferCount;
				const totalCount = this.tableData.length;

				// 计算当前可见区域的起始行索引
				let startIndex = Math.floor(scrollTop / minRowHeight) - bufferCount;
				startIndex = Math.max(0, startIndex);

				// 计算结束行索引
				let endIndex = startIndex + visibleCount + bufferCount * 2;
				endIndex = Math.min(totalCount - 1, endIndex);

				// 只有当可见范围变化时才更新数据
				if (
					startIndex !== this.virtualScrollStartIndex ||
					endIndex !== this.virtualScrollEndIndex
				) {
					this.virtualScrollStartIndex = startIndex;
					this.virtualScrollEndIndex = endIndex;
					this.initVirtualScrollPositions();

					// 触发虚拟滚动事件
					this.$emit("virtual-scroll", {
						startIndex,
						endIndex,
						visibleCount: endIndex - startIndex + 1
					});
				}
			},
			// 设置表格内容顶部值
			setTableContentTopValue: function (e2) {
				// 设置表格内容顶部值
			},
			// 行相关事件处理
			handleRowClick(row, rowIndex, event) {
				this.$emit("row-click", { row, rowIndex, event });
			},

			handleRowDblClick(row, rowIndex, event) {
				this.$emit("row-dblclick", { row, rowIndex, event });
			},

			handleRowContextmenu(row, rowIndex, event) {
				this.$emit("row-contextmenu", { row, rowIndex, event });
			},

			handleRowExpand(row, rowIndex) {
				this.$emit("row-expand", { row, rowIndex });
			},

			handleRowCollapse(row, rowIndex) {
				this.$emit("row-collapse", { row, rowIndex });
			},

			handleExpandChange(params) {
				this.$emit("expand-change", params);
			},

			handleCellClick(row, rowIndex, column, colIndex, event) {
				this.$emit("cell-click", { row, rowIndex, column, colIndex, event });
			},

			handleCellDblClick(row, rowIndex, column, colIndex, event) {
				this.$emit("cell-dblclick", { row, rowIndex, column, colIndex, event });
			},

			handleCellContextmenu(row, rowIndex, column, colIndex, event) {
				this.$emit("cell-contextmenu", { row, rowIndex, column, colIndex, event });
			},
			// 滚动条相关方法
			getScrollBarWidth: function () {
				// 获取滚动条宽度
				return this.scrollBarWidth || 0;
			}
		},
		mounted() {
			// 表格组件挂载逻辑
			this.$nextTick(() => {
				if (this.isVirtualScroll) {
					this.initVirtualScroll();
				}
				// 初始化列宽调整
				this.initColumnWidthByColumnResize();
				// 触发表格就绪事件
				this.$emit("ready", this);
			});
		},
		beforeDestroy() {
			// 表格组件销毁逻辑
			// 移除滚动事件监听器
			const container = this.$refs.tableContainerRef;
			if (container) {
				container.removeEventListener("scroll", this.handleScroll);
			}
			// 清理定时器
			if (this.disablePointerEventsTimeoutId) {
				clearTimeout(this.disablePointerEventsTimeoutId);
			}
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

/* 展开行样式 */
.x-table-easy .expand-column {
	width: 30px;
	text-align: center;
	cursor: pointer;
	user-select: none;
	padding: 0;
}

.x-table-easy .expand-icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	font-size: 12px;
	color: #999;
	transition:
		transform 0.3s,
		color 0.3s;
}

.x-table-easy .expand-icon::before {
	content: "";
}

.x-table-easy .expand-icon.expanded::before {
	content: "";
}

.x-table-easy .expand-icon:hover {
	color: #1890ff;
}

.x-table-easy .expand-content-row {
	background-color: #fafafa;
}

.x-table-easy .expand-content-cell {
	padding: 16px;
	border-top: 1px solid #e8e8e8;
	border-bottom: 1px solid #e8e8e8;
	background-color: #fafafa;
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
