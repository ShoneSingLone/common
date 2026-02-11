<template>
	<div :class="cpt_table_root_class" :ref="tableRootRef">
		<div :class="cpt_table_container_wrapper_class" :ref="tableContainerWrapperRef">
			<div
				:class="cpt_table_container_class"
				:ref="tableContainerRef"
				:style="cpt_table_container_style"
				@scroll="handleTableContainerScroll"
				@mousedown="handleTableContainerMousedown"
				@mouseup="handleTableContainerMouseup"
				@mousemove="handleTableContainerMousemove"
				@click="handleTableContainerClick">
				<div :class="cpt_table_content_wrapper_class" :ref="tableContentWrapperRef">
					<!-- Table -->
					<table :class="cpt_table_class" :ref="tableRef" :style="cpt_table_style">
						<!-- Colgroup -->
						<colgroup-component
							:colgroups="colgroups"
							:columns-option-reset-time="columnsOptionResetTime" />

						<!-- Header -->
						<header-component
							v-if="showHeader"
							:colgroups="colgroups"
							:group-columns="groupColumns"
							:header-rows="headerRows"
							:has-left-fixed-column="cpt_has_left_fixed_column"
							:has-right-fixed-column="cpt_has_right_fixed_column"
							:enable-header-contextmenu="cpt_enable_header_contextmenu"
							:enable-column-resize="cpt_enable_column_resize"
							:event-custom-option="eventCustomOption"
							:cell-style-option="cellStyleOption"
							:row-style-option="rowStyleOption"
							:cell-span-option="cellSpanOption"
							:sort-option="sortOption"
							:column-width-resize-option="columnWidthResizeOption"
							:contextmenu-header-option="contextmenuHeaderOption"
							:column-hidden-option="columnHiddenOption"
							:is-group-header="isGroupHeader"
							:is-column-resizing="isColumnResizing"
							:is-column-resizer-hover="isColumnResizerHover"
							@header-row-height-change="headerRowHeightChange"
							@header-indicator-col-keys-change="headerIndicatorColKeysChange"
							@set-column-width="setColumnWidth"
							@update-colgroups-by-sort-change="updateColgroupsBySortChange"
							@body-indicator-row-keys-change="bodyIndicatorRowKeysChange" />

						<!-- Body -->
						<body-component
							:table-data="cpt_actual_render_table_data"
							:colgroups="colgroups"
							:group-columns="groupColumns"
							:header-rows="headerRows"
							:footer-rows="footerRows"
							:has-left-fixed-column="cpt_has_left_fixed_column"
							:has-right-fixed-column="cpt_has_right_fixed_column"
							:enable-body-contextmenu="cpt_enable_body_contextmenu"
							:enable-cell-selection="cpt_enable_cell_selection"
							:enable-clipboard="cpt_enable_clipboard"
							:enable-column-resize="cpt_enable_column_resize"
							:event-custom-option="eventCustomOption"
							:cell-style-option="cellStyleOption"
							:row-style-option="rowStyleOption"
							:cell-span-option="cellSpanOption"
							:sort-option="sortOption"
							:expand-option="expandOption"
							:checkbox-option="checkboxOption"
							:radio-option="radioOption"
							:edit-option="editOption"
							:cell-autofill-option="cellAutofillOption"
							:column-width-resize-option="columnWidthResizeOption"
							:contextmenu-body-option="contextmenuBodyOption"
							:clipboard-option="clipboardOption"
							:row-key-field-name="rowKeyFieldName"
							:is-group-header="isGroupHeader"
							:is-virtual-scroll="cpt_is_virtual_scroll"
							:virtual-scroll-start-index="virtualScrollStartIndex"
							:is-column-resizing="isColumnResizing"
							:is-column-resizer-hover="isColumnResizerHover"
							:editing-cell="editingCell"
							:cell-selection-data="cellSelectionData"
							:cell-selection-range-data="cellSelectionRangeData"
							:header-indicator-col-keys="headerIndicatorColKeys"
							:body-indicator-row-keys="bodyIndicatorRowKeys"
							:highlight-row-key="highlightRowKey"
							:is-cell-editing="cpt_is_cell_editing"
							:is-autofill-starting="isAutofillStarting"
							:autofilling-direction="autofillingDirection"
							@body-cell-width-change="bodyCellWidthChange"
							@cell-selection-current-cell-change="cellSelectionCurrentCellChange"
							@cell-selection-normal-end-cell-change="
								cellSelectionNormalEndCellChange
							"
							@cell-selection-autofill-cell-change="cellSelectionAutofillCellChange"
							@cell-selection-range-data-change="cellSelectionRangeDataChange"
							@autofilling-direction-change="autofillingDirectionChange"
							@body-indicator-row-keys-change="bodyIndicatorRowKeysChange"
							@selected-all-change="selectedAllChange"
							@set-selected-all-info="setSelectedAllInfo"
							@start-editing-cell="startEditingCell"
							@stop-editing-cell="stopEditingCell"
							@editing-cell-change="editingCellChange"
							@editor-input-start-value-change="editorInputStartValueChange"
							@enable-stop-editing-change="enableStopEditingChange"
							@contextmenu-event-target-change="contextmenuEventTargetChange"
							@contextmenu-options-change="contextmenuOptionsChange"
							@is-column-resizer-hover-change="isColumnResizerHoverChange"
							@is-column-resizing-change="isColumnResizingChange"
							@is-body-cell-mousedown-change="isBodyCellMousedownChange"
							@is-body-operation-column-mousedown-change="
								isBodyOperationColumnMousedownChange
							"
							@is-autofill-starting-change="isAutofillStartingChange"
							@highlight-row-key-change="highlightRowKeyChange" />

						<!-- Footer -->
						<footer-component
							v-if="cpt_has_footer_data"
							:footer-data="footerData"
							:colgroups="colgroups"
							:group-columns="groupColumns"
							:header-rows="headerRows"
							:footer-rows="footerRows"
							:has-left-fixed-column="cpt_has_left_fixed_column"
							:has-right-fixed-column="cpt_has_right_fixed_column"
							:event-custom-option="eventCustomOption"
							:cell-style-option="cellStyleOption"
							:row-style-option="rowStyleOption"
							:cell-span-option="cellSpanOption"
							:is-group-header="isGroupHeader"
							@foot-row-height-change="footRowHeightChange" />
					</table>

					<!-- Virtual Scroll Phantom -->
					<div
						v-if="cpt_is_virtual_scroll"
						:class="cpt_virtual_phantom_class"
						:ref="virtualPhantomRef"
						:style="cpt_virtual_phantom_style"></div>
				</div>
			</div>
		</div>

		<!-- Edit Input -->
		<edit-input-component
			:ref="editInputRef"
			:editing-cell="editingCell"
			:cell-style-option="cellStyleOption"
			:event-custom-option="eventCustomOption"
			:edit-option="editOption"
			:row-key-field-name="rowKeyFieldName"
			@stop-editing-cell="stopEditingCell"
			@editing-cell-change="editingCellChange"
			@editor-input-start-value-change="editorInputStartValueChange"
			@enable-stop-editing-change="enableStopEditingChange" />

		<!-- Cell Selection -->
		<selection-component
			:ref="cellSelectionRef"
			:cell-selection-data="cellSelectionData"
			:cell-selection-range-data="cellSelectionRangeData"
			:colgroups="colgroups"
			:header-rows="headerRows"
			:footer-rows="footerRows"
			:has-left-fixed-column="cpt_has_left_fixed_column"
			:has-right-fixed-column="cpt_has_right_fixed_column"
			:is-group-header="isGroupHeader" />

		<!-- Contextmenu -->
		<contextmenu-component
			v-if="cpt_has_contextmenu_options"
			:ref="contextmenuRef"
			:options="contextmenuOptions"
			:event-target="contextmenuEventTarget"
			@contextmenu-option-click="handleContextmenuOptionClick" />
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
		directives: {
			"click-outside": Vue._X_TABLE_EASY_DIRECTIVES.clickoutside
		},
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			tableData: {
				required: true,
				type: Array
			},
			footerData: {
				type: Array,
				default: function () {
					return [];
				}
			},
			showHeader: {
				type: Boolean,
				default: true
			},
			columns: {
				type: Array,
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			scrollWidth: {
				type: [Number, String],
				default: null
			},
			maxHeight: {
				type: [Number, String],
				default: null
			},
			fixedHeader: {
				type: Boolean,
				default: true
			},
			fixedFooter: {
				type: Boolean,
				default: true
			},
			borderAround: {
				type: Boolean,
				default: true
			},
			borderX: {
				type: Boolean,
				default: true
			},
			borderY: {
				type: Boolean,
				default: false
			},
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
			virtualScrollOption: {
				type: Object,
				default: null
			},
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
			columnHiddenOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			contextmenuHeaderOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			contextmenuBodyOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			clipboardOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			columnWidthResizeOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		data() {
			return {
				// Hooks instance
				hooks: {},
				// is parent rendered
				parentRendered: false,
				// table viewport width except scroll bar width
				tableViewportWidth: 0,
				// 列配置变化次数
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
				// is group header
				isGroupHeader: false,
				// header rows created by groupColumns
				headerRows: [],
				// footer rows created by footerData
				footerRows: [],
				// colgroups
				colgroups: [],
				// groupColumns
				groupColumns: [],
				// 存储当前隐藏列信息
				hiddenColumns: [],
				// virtual scroll visible data
				virtualScrollVisibleData: [],
				// virtual scroll visible indexs
				virtualScrollVisibleIndexs: {
					start: -1,
					end: -1
				},
				// default virtual scroll buffer scale
				defaultVirtualScrollBufferScale: 1,
				// default virtual scroll min row height
				defaultVirtualScrollMinRowHeight: 40,
				// default placeholder per scrolling row count
				defaultPlaceholderPerScrollingRowCount: 8,
				//起始索引
				virtualScrollStartIndex: 0,
				// preview virtual scroll start index
				previewVirtualScrollStartIndex: 0,
				//结束索引
				virtualScrollEndIndex: 0,
				// is scrolling
				showVirtualScrollingPlaceholder: false,
				// disable pointer events timeout id
				disablePointerEventsTimeoutId: null,
				// is scrolling left
				isLeftScrolling: false,
				// is scrolling right
				isRightScrolling: false,
				// is scrolling vertically
				isVerticalScrolling: false,
				// has horizontal scroll bar
				hasXScrollBar: false,
				// has vertical scroll bar
				hasYScrollBar: false,
				// scroll bar width
				scrollBarWidth: 0,
				// preview table container scrollLeft （处理左列或右列固定效果）
				previewTableContainerScrollLeft: null,
				// header cell selection colKeys
				headerIndicatorColKeys: {
					startColKey: "",
					startColKeyIndex: -1,
					endColKey: "",
					endColKeyIndex: -1
				},
				// body indicator rowKeys
				bodyIndicatorRowKeys: {
					startRowKey: "",
					startRowKeyIndex: -1,
					endRowKey: "",
					endRowKeyIndex: -1
				},
				// cell selection data
				cellSelectionData: {
					currentCell: {
						rowKey: "",
						colKey: "",
						rowIndex: -1
					},
					normalEndCell: {
						rowKey: "",
						colKey: "",
						rowIndex: -1
					},
					autoFillEndCell: {
						rowKey: "",
						colKey: ""
					}
				},
				// cell selection range data
				cellSelectionRangeData: {
					leftColKey: "",
					rightColKey: "",
					topRowKey: "",
					bottomRowKey: ""
				},
				// is header cell mousedown
				isHeaderCellMousedown: false,
				// is body cell mousedown
				isBodyCellMousedown: false,
				// is body operation column mousedown
				isBodyOperationColumnMousedown: false,
				// is cell selection corner mousedown
				isAutofillStarting: false,
				// autofilling direction
				autofillingDirection: null,
				// current cell selection type
				currentCellSelectionType: "",
				// table offest height（开启虚拟滚动时使用）
				tableOffestHeight: 0,
				// table height
				tableHeight: 0,
				// highlight row key
				highlightRowKey: "",
				// editing cell
				editingCell: {
					rowKey: "",
					colKey: "",
					row: null,
					column: null
				},
				// 编辑单元格每次开始编辑前的初始值
				editorInputStartValue: "",
				// 是否允许按下方向键时，停止编辑并移动选中单元格
				enableStopEditing: true,
				// contextmenu event target
				contextmenuEventTarget: "",
				// contextmenu options
				contextmenuOptions: [],
				// column resize cursor
				isColumnResizerHover: false,
				// is column resizing
				isColumnResizing: false
			};
		},
		computed: {
			// actual render table data
			cpt_actual_render_table_data() {
				return this.cpt_is_virtual_scroll ? this.virtualScrollVisibleData : this.tableData;
			},
			// table root class
			cpt_table_root_class() {
				const { borderAround } = this;
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("root")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("border-around")]: borderAround
				};
			},
			// table container wrapper class
			cpt_table_container_wrapper_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("container-wrapper")]: true
				};
			},
			// table container class
			cpt_table_container_class() {
				const {
					cpt_is_virtual_scroll,
					isLeftScrolling,
					isRightScrolling,
					isVerticalScrolling,
					cpt_is_cell_editing,
					isAutofillStarting,
					cpt_enable_cell_selection
				} = this;

				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("container")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("virtual-scroll")]: cpt_is_virtual_scroll,
					[Vue._X_TABLE_EASY_UTILS.clsName("container-left-scrolling")]: isLeftScrolling,
					[Vue._X_TABLE_EASY_UTILS.clsName("container-right-scrolling")]:
						isRightScrolling,
					[Vue._X_TABLE_EASY_UTILS.clsName("container-vertical-scrolling")]:
						isVerticalScrolling,
					[Vue._X_TABLE_EASY_UTILS.clsName("is-cell-editing")]: cpt_is_cell_editing,
					[Vue._X_TABLE_EASY_UTILS.clsName("autofilling")]: isAutofillStarting,
					[Vue._X_TABLE_EASY_UTILS.clsName("enable-cell-selection")]:
						cpt_enable_cell_selection
				};
			},
			// table content wrapper class
			cpt_table_content_wrapper_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("content-wrapper")]: true
				};
			},
			// table class
			cpt_table_class() {
				const { borderX, borderY } = this;
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("table")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("border-x")]: borderX,
					[Vue._X_TABLE_EASY_UTILS.clsName("border-y")]: borderY
				};
			},
			// table style
			cpt_table_style() {
				return {
					width: Vue._X_TABLE_EASY_UTILS.getValByUnit(this.scrollWidth)
				};
			},
			// table container style
			cpt_table_container_style() {
				let maxHeight = Vue._X_TABLE_EASY_UTILS.getValByUnit(this.maxHeight);

				let tableContainerHeight = null;
				if (this.cpt_is_virtual_scroll) {
					if (maxHeight) {
						tableContainerHeight = maxHeight;
					} else {
						console.error(
							"maxHeight prop is required when 'virtualScrollOption.enable = true'"
						);
					}
				} else {
					const { tableHeight, hasXScrollBar } = this;
					tableContainerHeight = tableHeight;
					// 有横向滚动条时，表格高度需要加上滚动条的宽度
					if (hasXScrollBar) {
						tableContainerHeight += this.getScrollBarWidth();
					}

					tableContainerHeight =
						Vue._X_TABLE_EASY_UTILS.getValByUnit(tableContainerHeight);
				}

				return {
					"max-height": maxHeight,
					height: tableContainerHeight
				};
			},
			// virtual phantom class
			cpt_virtual_phantom_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("virtual-phantom")]: true
				};
			},
			// virtual phantom style
			cpt_virtual_phantom_style() {
				return {
					height: this.tableHeight + "px"
				};
			},
			// is virtual scroll
			cpt_is_virtual_scroll() {
				const { virtualScrollOption } = this;
				return virtualScrollOption && virtualScrollOption.enable;
			},
			// has fixed column
			cpt_has_fixed_column() {
				return this.colgroups.some(
					x =>
						x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT ||
						x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
				);
			},
			// has left fixed column
			cpt_has_left_fixed_column() {
				return this.colgroups.some(
					x => x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
				);
			},
			// has right fixed column
			cpt_has_right_fixed_column() {
				return this.colgroups.some(
					x => x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
				);
			},
			// is editing cell
			cpt_is_cell_editing() {
				const { editingCell } = this;

				return (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(editingCell.rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(editingCell.colKey)
				);
			},
			// has edit column
			cpt_has_edit_column() {
				return this.colgroups.some(x => x.edit);
			},
			// enable header contextmenu
			cpt_enable_header_contextmenu() {
				let result = false;

				const { contextmenuHeaderOption } = this;
				if (contextmenuHeaderOption) {
					const { contextmenus } = contextmenuHeaderOption;

					if (Array.isArray(contextmenus) && contextmenus.length) {
						result = true;
					}
				}
				return result;
			},
			// enable body contextmenu
			cpt_enable_body_contextmenu() {
				let result = false;

				const { contextmenuBodyOption } = this;
				if (contextmenuBodyOption) {
					const { contextmenus } = contextmenuBodyOption;

					if (Array.isArray(contextmenus) && contextmenus.length) {
						result = true;
					}
				}
				return result;
			},
			// contextmenu type
			cpt_context_menu_type() {
				if (this.headerIndicatorColKeys.startColKeyIndex > -1) {
					return Vue._X_TABLE_EASY_CONSTANTS.CONTEXTMENU_TYPES.HEADER_CONTEXTMENU;
				} else {
					return Vue._X_TABLE_EASY_CONSTANTS.CONTEXTMENU_TYPES.BODY_CONTEXTMENU;
				}
			},
			// enable cell selection
			cpt_enable_cell_selection() {
				let result = true;

				const { cellSelectionOption, rowKeyFieldName } = this;

				if (Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKeyFieldName)) {
					result = false;
				} else if (
					cellSelectionOption &&
					Vue._X_TABLE_EASY_UTILS.isBoolean(cellSelectionOption.enable) &&
					cellSelectionOption.enable === false
				) {
					result = false;
				}
				return result;
			},
			// enable clipboard
			cpt_enable_clipboard() {
				return this.rowKeyFieldName;
			},
			// enable width resize
			cpt_enable_column_resize() {
				let result = false;
				const { columnWidthResizeOption } = this;
				if (columnWidthResizeOption) {
					const { enable } = columnWidthResizeOption;
					if (Vue._X_TABLE_EASY_UTILS.isBoolean(enable)) {
						result = enable;
					}
				}
				return result;
			},
			// header total height
			cpt_header_total_height() {
				let result = 0;
				if (this.showHeader) {
					result = this.headerRows.reduce((total, currentVal) => {
						return currentVal.rowHeight + total;
					}, 0);
				}
				return result;
			},
			// footer total height
			cpt_footer_total_height() {
				return this.footerRows.reduce((total, currentVal) => {
					return currentVal.rowHeight + total;
				}, 0);
			},
			// has contextmenu options
			cpt_has_contextmenu_options() {
				return this.contextmenuOptions && this.contextmenuOptions.length > 0;
			},
			// has footer data
			cpt_has_footer_data() {
				return this.footerData && this.footerData.length > 0;
			}
		},
		watch: {
			// watch clone table data
			tableData: {
				handler(newVal, oldVal) {
					this.initVirtualScrollPositions();
					// 第一次不需要触发，仅数据变更触发
					if (oldVal) {
						this.initVirtualScroll();
					}
				},
				immediate: true
			},
			// watch columns
			columns: {
				handler(newVal, oldVal) {
					this.initColumns();
					this.initGroupColumns();
					this.initColumnWidthByColumnResize();

					// 排除首次
					if (newVal != oldVal && oldVal) {
						this.columnsOptionResetTime++;
						// 需要等待 initColumns 和 initGroupColumns 先执行
						this.initScrolling();
					}
				},
				immediate: true
			},
			// watch cloneColumns
			cloneColumns: {
				handler() {
					this.initGroupColumns();
					// 右键（取消）固定列会操作 cloneColumns
					this.initColumnWidthByColumnResize();

					this.columnsOptionResetTime++;
					// 需要等待 initColumns 和 initGroupColumns 先执行
					this.initScrolling();
				},
				immediate: false
			},
			// group columns change watch
			groupColumns: {
				handler(val) {
					if (!Vue._X_TABLE_EASY_UTILS.isEmptyArray(val)) {
						this.initHeaderRows();
					}
				},
				immediate: true
			},
			// footer data
			footerData: {
				handler(val) {
					if (!Vue._X_TABLE_EASY_UTILS.isEmptyArray(val)) {
						this.initFooterRows();
					}
				},
				immediate: true
			},
			// watch virtualScrollOption enable
			"virtualScrollOption.enable": {
				handler(newVal) {
					// enable virtual scroll
					if (newVal) {
						this.initVirtualScrollPositions();
						this.initVirtualScroll();
					}
					// disable virtual scroll
					else {
						// clear table content top value
						this.setTableContentTopValue({ top: 0 });
					}
				},
				immediate: false
			},
			// is auto fill starting
			isAutofillStarting: {
				handler(val) {
					if (!val) {
						this.setCellSelectionByAutofill();
						this.clearCellSelectionAutofillEndCell();
					}
				}
			},
			// watch current cell
			"cellSelectionData.currentCell": {
				handler: function () {
					this.setCurrentCellSelectionType();
				},
				deep: true,
				immediate: true
			},
			// watch normal end cell
			"cellSelectionData.normalEndCell": {
				handler: function () {
					this.setCurrentCellSelectionType();
				},
				deep: true,
				immediate: true
			},
			// watch header indicator colKeys
			headerIndicatorColKeys: {
				handler: function () {
					this.setRangeCellSelectionByHeaderIndicator();
				},
				deep: true
			},
			// watch body indicator rowKeys
			bodyIndicatorRowKeys: {
				handler: function () {
					this.setRangeCellSelectionByBodyIndicator();
				},
				deep: true
			}
		},
		mounted() {
			this.init();
			this.addGlobalEventListeners();
		},
		beforeDestroy() {
			this.removeGlobalEventListeners();
			this.clearVirtualScrollTimer();
		},
		methods: {
			// init
			init() {
				this.initHooks();
				this.initColumns();
				this.initGroupColumns();
				this.initColumnWidthByColumnResize();
				this.initScrolling();
				this.setScrollBarStatus();
			},

			// init hooks
			initHooks() {
				this.hooks = new Vue._X_TABLE_EASY_UTILS.Hooks();
			},

			// int header rows
			initHeaderRows() {
				const { groupColumns } = this;

				if (Array.isArray(groupColumns)) {
					this.headerRows = groupColumns.map(() => {
						return { rowHeight: 0 };
					});
				}
			},

			// int footer rows
			initFooterRows() {
				const { footerData } = this;

				if (Array.isArray(footerData)) {
					this.footerRows = footerData.map(() => {
						return { rowHeight: 0 };
					});
				}
			},

			// header tr height resize
			headerRowHeightChange({ rowIndex, height }) {
				this.headerRows.splice(rowIndex, 1, { rowHeight: height });
			},

			// footer row height resize
			footRowHeightChange({ rowIndex, height }) {
				this.footerRows.splice(rowIndex, 1, { rowHeight: height });
			},

			// body cell width change
			bodyCellWidthChange(colWidths) {
				this.colgroups = this.colgroups.map(item => {
					item._realTimeWidth = colWidths.get(item.key);
					return item;
				});

				this.hooks.triggerHook(
					Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_CELL_WIDTH_CHANGE
				);
			},

			// set column width for column resize
			setColumnWidth({ colKey, width }) {
				this.colgroups = this.colgroups.map(item => {
					if (item.key === colKey) {
						item._columnResizeWidth = width;
					}
					return item;
				});
				this.$nextTick(() => {
					this.setScrollBarStatus();
				});
				this.hooks.triggerHook(
					Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_CELL_WIDTH_CHANGE
				);
			},

			// update colgroups by sort change
			updateColgroupsBySortChange(sortColumns) {
				this.colgroups = this.colgroups.map(item => {
					// update colgroups by sort columns
					if (Object.keys(sortColumns).indexOf(item.field) > -1) {
						item.sortBy = sortColumns[item.field];
					}
					return item;
				});
			},

			// init column width by column resize
			initColumnWidthByColumnResize() {
				const { cpt_enable_column_resize } = this;

				const columnDefaultWidth = 50;
				if (cpt_enable_column_resize) {
					this.colgroups = this.colgroups.map(item => {
						let columnWidth = columnDefaultWidth;
						if (Vue._X_TABLE_EASY_UTILS.isNumber(item.width)) {
							columnWidth = item.width;
						}
						item._columnResizeWidth = columnWidth;
						return item;
					});
				}
			},

			// init columns
			initColumns() {
				const { columnHiddenOption } = this;
				if (columnHiddenOption) {
					const { defaultHiddenColumnKeys } = columnHiddenOption;

					if (!Vue._X_TABLE_EASY_UTILS.isEmptyArray(defaultHiddenColumnKeys)) {
						this.hiddenColumns = defaultHiddenColumnKeys;
					}
				}

				this.showOrHideColumns();
			},

			// show or hide columns
			showOrHideColumns() {
				let cloneColumns = Vue._X_TABLE_EASY_UTILS.cloneDeep(this.columns);

				cloneColumns = cloneColumns.map(col => {
					// 操作列默认左固定
					if (col.operationColumn) {
						col.fixed = Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT;
					}
					return col;
				});

				const { hiddenColumns } = this;

				if (!Vue._X_TABLE_EASY_UTILS.isEmptyArray(hiddenColumns)) {
					//  recursive remove column key
					hiddenColumns.forEach(key => {
						cloneColumns = Vue._X_TABLE_EASY_UTILS.recursiveRemoveColumnByKey(
							cloneColumns,
							key
						);
					});
				}

				this.cloneColumns = cloneColumns;
			},

			// 初始化分组表头
			initGroupColumns() {
				const result = Vue._X_TABLE_EASY_UTILS.initGroupColumns(this.cloneColumns);

				// set is group header
				this.isGroupHeader = result.isGroupHeader;
				// set colgroups
				this.colgroups = result.colgroups;
				// set groupColumns
				this.groupColumns = result.groupColumns;
			},

			// scroll bar width
			getScrollBarWidth() {
				let result = 0;

				const { scrollBarWidth } = this;

				if (scrollBarWidth) {
					result = scrollBarWidth;
				} else {
					result = Vue._X_TABLE_EASY_UTILS.getScrollbarWidth();
					this.scrollBarWidth = result;
				}

				return result;
			},

			// selected all change
			selectedAllChange({ isSelected }) {
				this.broadcast(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY,
					Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE,
					{
						isSelected
					}
				);
			},

			// set selected all info
			setSelectedAllInfo({ isSelected, isIndeterminate }) {
				this.broadcast(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_HEADER_CHECKBOX_CONTENT,
					Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO,
					{
						isSelected,
						isIndeterminate
					}
				);
			},

			// cell selection current cell change
			cellSelectionCurrentCellChange({ rowKey, colKey }) {
				this.cellSelectionData.currentCell.colKey = colKey;
				this.cellSelectionData.currentCell.rowKey = rowKey;
				this.cellSelectionData.currentCell.rowIndex = this.allRowKeys.indexOf(rowKey);
			},

			// cell selection end cell change
			cellSelectionNormalEndCellChange({ rowKey, colKey }) {
				this.cellSelectionData.normalEndCell.colKey = colKey;
				this.cellSelectionData.normalEndCell.rowKey = rowKey;
				this.cellSelectionData.normalEndCell.rowIndex = this.allRowKeys.indexOf(rowKey);
			},

			// cell selection auto fill cell change
			cellSelectionAutofillCellChange({ rowKey, colKey }) {
				this.cellSelectionData.autoFillEndCell.colKey = colKey;
				this.cellSelectionData.autoFillEndCell.rowKey = rowKey;
			},

			// clear cell selection current cell
			clearCellSelectionCurrentCell() {
				this.cellSelectionCurrentCellChange({
					rowKey: "",
					colKey: "",
					rowIndex: -1
				});
			},

			// clear cell selection normal end cell
			clearCellSelectionNormalEndCell() {
				this.cellSelectionNormalEndCellChange({
					rowKey: "",
					colKey: "",
					rowIndex: -1
				});
			},

			// clear cell selection autofill end cell
			clearCellSelectionAutofillEndCell() {
				this.cellSelectionAutofillCellChange({ rowKey: "", colKey: "" });
			},

			// header indicator colKeys change
			headerIndicatorColKeysChange({ startColKey, endColKey }) {
				const { colgroups } = this;
				this.headerIndicatorColKeys.startColKey = startColKey;
				this.headerIndicatorColKeys.startColKeyIndex = colgroups.findIndex(
					x => x.key === startColKey
				);
				this.headerIndicatorColKeys.endColKey = endColKey;
				this.headerIndicatorColKeys.endColKeyIndex = colgroups.findIndex(
					x => x.key === endColKey
				);
			},

			// clear header indicator colKeys
			clearHeaderIndicatorColKeys() {
				this.headerIndicatorColKeys.startColKey = "";
				this.headerIndicatorColKeys.startColKeyIndex = -1;
				this.headerIndicatorColKeys.endColKey = "";
				this.headerIndicatorColKeys.endColKeyIndex = -1;
			},

			// body indicator rowKeys change
			bodyIndicatorRowKeysChange({ startRowKey, endRowKey }) {
				const { allRowKeys } = this;
				this.bodyIndicatorRowKeys.startRowKey = startRowKey;
				this.bodyIndicatorRowKeys.startRowKeyIndex = allRowKeys.indexOf(startRowKey);
				this.bodyIndicatorRowKeys.endRowKey = endRowKey;
				this.bodyIndicatorRowKeys.endRowKeyIndex = allRowKeys.indexOf(endRowKey);
			},

			// clear body indicator RowKeys
			clearBodyIndicatorRowKeys() {
				this.bodyIndicatorRowKeys.startRowKey = "";
				this.bodyIndicatorRowKeys.startRowKeyIndex = -1;
				this.bodyIndicatorRowKeys.endRowKey = "";
				this.bodyIndicatorRowKeys.endRowKeyIndex = -1;
			},

			// set cell selection by autofill
			setCellSelectionByAutofill() {
				const {
					cellAutofillOption,
					cellSelectionRangeData,
					colgroups,
					allRowKeys,
					autofillingDirection,
					currentCellSelectionType
				} = this;
				const { autoFillEndCell, currentCell } = this.cellSelectionData;

				const { rowKey, colKey } = autoFillEndCell;

				if (
					Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) ||
					Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
				) {
					return false;
				}

				let currentCellData = {};
				let normalEndCellData = {};

				const { leftColKey, rightColKey, topRowKey, bottomRowKey } = cellSelectionRangeData;

				// cell selection range auto fill
				if (
					currentCellSelectionType ===
					Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.RANGE
				) {
					if (
						!Vue._X_TABLE_EASY_UTILS.isCellInSelectionRange({
							cellData: autoFillEndCell,
							cellSelectionRangeData,
							colgroups,
							allRowKeys
						})
					) {
						if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.RIGHT
						) {
							currentCellData = {
								rowKey: topRowKey,
								colKey: leftColKey
							};
							normalEndCellData = { rowKey: bottomRowKey, colKey };
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.DOWN
						) {
							currentCellData = {
								rowKey: topRowKey,
								colKey: leftColKey
							};
							normalEndCellData = { rowKey, colKey: rightColKey };
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.UP
						) {
							currentCellData = {
								rowKey,
								colKey: leftColKey
							};
							normalEndCellData = {
								rowKey: bottomRowKey,
								colKey: rightColKey
							};
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.LEFT
						) {
							currentCellData = { rowKey: topRowKey, colKey };
							normalEndCellData = {
								rowKey: bottomRowKey,
								colKey: rightColKey
							};
						}
					} else {
						// return if within the range
						return false;
					}
				}
				// cell selection single auto fill
				else if (
					currentCellSelectionType ===
					Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
				) {
					if (currentCell.rowKey !== rowKey || currentCell.colKey !== colKey) {
						if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.RIGHT
						) {
							currentCellData = {
								rowKey,
								colKey: leftColKey
							};
							normalEndCellData = {
								rowKey,
								colKey
							};
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.DOWN
						) {
							currentCellData = {
								rowKey: topRowKey,
								colKey: leftColKey
							};
							normalEndCellData = {
								rowKey,
								colKey: leftColKey
							};
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.UP
						) {
							currentCellData = {
								rowKey,
								colKey: leftColKey
							};
							normalEndCellData = {
								rowKey: bottomRowKey,
								colKey: leftColKey
							};
						} else if (
							autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.LEFT
						) {
							currentCellData = {
								rowKey,
								colKey
							};
							normalEndCellData = {
								rowKey,
								colKey: rightColKey
							};
						}
					} else {
						// return if within the range
						return false;
					}
				}

				const cellAutofillParams = {
					tableData: this.tableData,
					allRowKeys: this.allRowKeys,
					colgroups: this.colgroups,
					rowKeyFieldName: this.rowKeyFieldName,
					direction: autofillingDirection,
					currentCellSelectionType,
					cellSelectionRangeData,
					nextCurrentCell: currentCellData,
					nextNormalEndCell: normalEndCellData
				};

				if (cellAutofillOption) {
					const { beforeAutofill, afterAutofill } = cellAutofillOption;

					if (Vue._X_TABLE_EASY_UTILS.isFunction(beforeAutofill)) {
						// before autofill
						const autofillResponse = Vue._X_TABLE_EASY_UTILS.cellAutofill({
							isReplaceData: false,
							...cellAutofillParams
						});
						const callback = beforeAutofill(autofillResponse);
						if (Vue._X_TABLE_EASY_UTILS.isBoolean(callback) && !callback) {
							return false;
						}
					}

					// after autofill
					const autofillResponse = Vue._X_TABLE_EASY_UTILS.cellAutofill({
						isReplaceData: true,
						...cellAutofillParams
					});
					if (Vue._X_TABLE_EASY_UTILS.isFunction(afterAutofill)) {
						afterAutofill(autofillResponse);
					}
				}

				if (!Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCellData.rowKey)) {
					this.cellSelectionCurrentCellChange({
						rowKey: currentCellData.rowKey,
						colKey: currentCellData.colKey
					});
				}

				if (!Vue._X_TABLE_EASY_UTILS.isEmptyValue(normalEndCellData.rowKey)) {
					this.cellSelectionNormalEndCellChange({
						rowKey: normalEndCellData.rowKey,
						colKey: normalEndCellData.colKey
					});
				}
			},

			// cell selection range data change
			cellSelectionRangeDataChange(newData) {
				this.cellSelectionRangeData = Object.assign(this.cellSelectionRangeData, newData);
			},

			// autofilling direction change
			autofillingDirectionChange(direction) {
				this.autofillingDirection = direction;
			},

			// set current cell selection type
			setCurrentCellSelectionType() {
				const { currentCell, normalEndCell } = this.cellSelectionData;

				let result;

				if (
					Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.rowKey) ||
					Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.colKey)
				) {
					result = "";
				} else {
					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(normalEndCell.rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(normalEndCell.colKey)
					) {
						result = Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.RANGE;
					} else {
						result = Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE;
					}
				}

				this.currentCellSelectionType = result;
			},

			// deal keydown event
			dealKeydownEvent(event) {
				const { colgroups, cellSelectionData, enableStopEditing, cpt_is_cell_editing } =
					this;

				const { keyCode, ctrlKey, shiftKey, altKey } = event;

				const { rowKey, colKey } = cellSelectionData.currentCell;

				const currentColumn = colgroups.find(x => x.key === colKey);

				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
				) {
					switch (keyCode) {
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.TAB: {
							let direction;
							if (shiftKey) {
								direction =
									Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.LEFT;
							} else {
								direction =
									Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.RIGHT;
							}

							this.selectCellByDirection({
								direction
							});

							this.clearCellSelectionNormalEndCell();

							this.stopEditingCell();
							event.preventDefault();
							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_LEFT: {
							const direction =
								Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.LEFT;
							if (enableStopEditing) {
								this.selectCellByDirection({
									direction
								});

								this.clearCellSelectionNormalEndCell();

								this.stopEditingCell();
								event.preventDefault();
							}

							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_RIGHT: {
							const direction =
								Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.RIGHT;

							if (enableStopEditing) {
								this.selectCellByDirection({
									direction
								});

								this.clearCellSelectionNormalEndCell();

								this.stopEditingCell();
								event.preventDefault();
							}
							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_UP: {
							const direction =
								Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.UP;

							if (enableStopEditing) {
								this.selectCellByDirection({
									direction
								});

								this.clearCellSelectionNormalEndCell();

								this.stopEditingCell();
								event.preventDefault();
							}
							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_DOWN: {
							const direction =
								Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.DOWN;

							if (enableStopEditing) {
								this.selectCellByDirection({
									direction
								});

								this.clearCellSelectionNormalEndCell();

								this.stopEditingCell();
								event.preventDefault();
							}
							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ENTER: {
							let direction;
							// add new line
							if (altKey) {
								const editInputEditor = this.$refs[this.editInputRef];

								editInputEditor.textareaAddNewLine();
							}
							// direction up
							else if (shiftKey) {
								direction = Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.UP;
								this.stopEditingCell();
							}
							// stop editing and stay in current cell
							else if (ctrlKey) {
								this.stopEditingCell();
							}
							// direction down
							else {
								direction =
									Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.DOWN;
								this.stopEditingCell();
							}

							if (direction) {
								this.clearCellSelectionNormalEndCell();
								this.selectCellByDirection({
									direction
								});
							}
							event.preventDefault();
							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.SPACE: {
							if (!cpt_is_cell_editing) {
								// start editing and enter a space
								this.startEditingCell({
									rowKey,
									colKey,
									defaultValue: " "
								});
								event.preventDefault();
							}

							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.BACK_SPACE: {
							if (!cpt_is_cell_editing) {
								// start editing and clear value
								this.startEditingCell({
									rowKey,
									colKey,
									defaultValue: ""
								});
								event.preventDefault();
							}

							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.DELETE: {
							if (!cpt_is_cell_editing) {
								// delete cell selection range value
								this.deleteCellSelectionRangeValue();
								event.preventDefault();
							}

							break;
						}
						case Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.F2: {
							if (!cpt_is_cell_editing) {
								if (currentColumn.edit) {
									// start editing cell and don't allow stop eidting by direction key
									this.enableStopEditing = false;
									this.startEditingCell({
										rowKey,
										colKey
									});
								}
								event.preventDefault();
							}

							break;
						}
						default: {
							// enter text directly
							if (Vue._X_TABLE_EASY_UTILS.isInputKeyCode(event)) {
								this.startEditingCell({
									rowKey,
									colKey,
									defaultValue: ""
								});
							}
							break;
						}
					}
				}
			},

			// select cell by direction
			selectCellByDirection({ direction }) {
				const { colgroups, allRowKeys, cellSelectionData } = this;

				const { rowKey, colKey } = cellSelectionData.currentCell;

				let columnIndex = colgroups.findIndex(x => x.key === colKey);
				let rowIndex = allRowKeys.indexOf(rowKey);

				if (direction === Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.LEFT) {
					if (columnIndex > 0) {
						let nextColumn = colgroups[columnIndex - 1];
						this.cellSelectionData.currentCell.colKey = nextColumn.key;
						this.columnToVisible(nextColumn);
					}
				} else if (
					direction === Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.RIGHT
				) {
					if (columnIndex < colgroups.length - 1) {
						let nextColumn = colgroups[columnIndex + 1];
						this.cellSelectionData.currentCell.colKey = nextColumn.key;
						this.columnToVisible(nextColumn);
					}
				} else if (direction === Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.UP) {
					if (rowIndex > 0) {
						const nextRowKey = allRowKeys[rowIndex - 1];
						this.rowToVisible(
							Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_UP,
							nextRowKey
						);
					}
				} else if (
					direction === Vue._X_TABLE_EASY_CONSTANTS.CELL_SELECTION_DIRECTION.DOWN
				) {
					if (rowIndex < allRowKeys.length - 1) {
						const nextRowKey = allRowKeys[rowIndex + 1];
						this.rowToVisible(
							Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_DOWN,
							nextRowKey
						);
					}
				}
			},

			// column to visible
			columnToVisible(nextColumn) {
				const { hasXScrollBar, colgroups } = this;

				if (!hasXScrollBar) {
					return false;
				}

				const tableContainerRef = this.$refs[this.tableContainerRef];

				const { scrollWidth, clientWidth, scrollLeft } = tableContainerRef;

				if (!nextColumn.fixed) {
					const leftTotalWidth = Vue._X_TABLE_EASY_UTILS.getNotFixedTotalWidthByColumnKey(
						{
							colgroups,
							colKey: nextColumn.key,
							fixed: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
						}
					);

					const rightTotalWidth =
						Vue._X_TABLE_EASY_UTILS.getNotFixedTotalWidthByColumnKey({
							colgroups,
							colKey: nextColumn.key,
							fixed: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
						});

					if (scrollLeft) {
						const diff = scrollLeft - leftTotalWidth;
						if (diff > 0) {
							tableContainerRef.scrollLeft = scrollLeft - diff;
						}
					}

					const scrollRight = scrollWidth - clientWidth - scrollLeft;
					if (scrollRight) {
						const diff = scrollRight - rightTotalWidth;
						if (diff > 0) {
							tableContainerRef.scrollLeft = scrollLeft + diff;
						}
					}
				}
			},

			// row to visible
			rowToVisible(keyCode, nextRowKey) {
				const tableContainerRef = this.$refs[this.tableContainerRef];
				const tableContentWrapperRef = this.$refs[this.tableContentWrapperRef].$el;

				const { cpt_is_virtual_scroll, cpt_header_total_height, cpt_footer_total_height } =
					this;

				const { clientHeight: containerClientHeight, scrollTop: containerScrollTop } =
					tableContainerRef;

				const nextRowEl = this.$el.querySelector(
					`tbody tr[${Vue._X_TABLE_EASY_CONSTANTS.COMPS_CUSTOM_ATTRS.BODY_ROW_KEY}="${nextRowKey}"]`
				);

				if (nextRowEl) {
					const { offsetTop: trOffsetTop, clientHeight: trClientHeight } = nextRowEl;

					const parentOffsetTop = tableContentWrapperRef.offsetTop;

					// arrow up
					if (keyCode === Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_UP) {
						if (trOffsetTop < containerScrollTop) {
							tableContainerRef.scrollTop = trOffsetTop - parentOffsetTop;
						}
					}
					// arrow down
					else if (keyCode === Vue._X_TABLE_EASY_CONSTANTS.KEY_CODES.ARROW_DOWN) {
						if (
							trOffsetTop + trClientHeight >
							containerScrollTop + containerClientHeight
						) {
							tableContainerRef.scrollTop =
								trOffsetTop +
								trClientHeight -
								containerClientHeight +
								parentOffsetTop;
						}
					}
				}
			},

			// get all row keys
			allRowKeys() {
				let result = [];

				const { tableData, rowKeyFieldName } = this;

				if (rowKeyFieldName) {
					result = tableData.map(x => {
						return x[rowKeyFieldName];
					});
				}

				return result;
			},

			// init scrolling
			initScrolling() {
				this.$nextTick(() => {
					this.calculateTableHeight();
					this.setScrollBarStatus();
					this.initVirtualScroll();
				});
			},

			// calculate table height
			calculateTableHeight() {
				if (!this.cpt_is_virtual_scroll) {
					const tableBodyRef = this.$refs[this.tableBodyRef];
					if (tableBodyRef) {
						const { offsetHeight } = tableBodyRef;
						this.tableHeight =
							this.cpt_header_total_height +
							offsetHeight +
							this.cpt_footer_total_height;
					}
				}
			},

			// set scroll bar status
			setScrollBarStatus() {
				this.$nextTick(() => {
					const tableContainerRef = this.$refs[this.tableContainerRef];
					const tableRef = this.$refs[this.tableRef];

					if (tableContainerRef && tableRef) {
						const { scrollWidth, clientWidth } = tableContainerRef;
						this.hasXScrollBar = scrollWidth > clientWidth;

						const { scrollHeight, clientHeight } = tableContainerRef;
						this.hasYScrollBar = scrollHeight > clientHeight;
					}
				});
			},

			// init virtual scroll
			initVirtualScroll() {
				if (this.cpt_is_virtual_scroll) {
					this.calculateTableHeight();
					this.setVirtualScrollVisibleData();
				}
			},

			// init virtual scroll positions
			initVirtualScrollPositions() {
				// 虚拟滚动位置初始化逻辑
			},

			// set virtual scroll visible data
			setVirtualScrollVisibleData() {
				// 虚拟滚动可见数据设置逻辑
			},

			// set table content top value
			setTableContentTopValue({ top }) {
				const tableContentWrapperRef = this.$refs[this.tableContentWrapperRef];
				if (tableContentWrapperRef) {
					tableContentWrapperRef.$el.style.transform = `translateY(${top}px)`;
				}
			},

			// clear virtual scroll timer
			clearVirtualScrollTimer() {
				if (this.disablePointerEventsTimeoutId) {
					Vue._X_TABLE_EASY_UTILS.cancelAnimationTimeout(
						this.disablePointerEventsTimeoutId
					);
					this.disablePointerEventsTimeoutId = null;
				}
			},

			// handle table container scroll
			handleTableContainerScroll(event) {
				// 滚动处理逻辑
			},

			// handle table container mousedown
			handleTableContainerMousedown(event) {
				// 鼠标按下处理逻辑
			},

			// handle table container mouseup
			handleTableContainerMouseup(event) {
				// 鼠标释放处理逻辑
			},

			// handle table container mousemove
			handleTableContainerMousemove(event) {
				// 鼠标移动处理逻辑
			},

			// handle table container click
			handleTableContainerClick(event) {
				// 点击处理逻辑
			},

			// start editing cell
			startEditingCell({ rowKey, colKey, defaultValue }) {
				// 开始编辑单元格逻辑
			},

			// stop editing cell
			stopEditingCell() {
				// 停止编辑单元格逻辑
			},

			// editing cell change
			editingCellChange(editingCell) {
				this.editingCell = editingCell;
			},

			// editor input start value change
			editorInputStartValueChange(value) {
				this.editorInputStartValue = value;
			},

			// enable stop editing change
			enableStopEditingChange(value) {
				this.enableStopEditing = value;
			},

			// contextmenu event target change
			contextmenuEventTargetChange(target) {
				this.contextmenuEventTarget = target;
			},

			// contextmenu options change
			contextmenuOptionsChange(options) {
				this.contextmenuOptions = options;
			},

			// is column resizer hover change
			isColumnResizerHoverChange(value) {
				this.isColumnResizerHover = value;
			},

			// is column resizing change
			isColumnResizingChange(value) {
				this.isColumnResizing = value;
			},

			// is body cell mousedown change
			isBodyCellMousedownChange(value) {
				this.isBodyCellMousedown = value;
			},

			// is body operation column mousedown change
			isBodyOperationColumnMousedownChange(value) {
				this.isBodyOperationColumnMousedown = value;
			},

			// is autofill starting change
			isAutofillStartingChange(value) {
				this.isAutofillStarting = value;
			},

			// highlight row key change
			highlightRowKeyChange(value) {
				this.highlightRowKey = value;
			},

			// handle contextmenu option click
			handleContextmenuOptionClick({ option, event }) {
				// 上下文菜单选项点击处理逻辑
			},

			// add global event listeners
			addGlobalEventListeners() {
				document.addEventListener("keydown", this.dealKeydownEvent.bind(this));
			},

			// remove global event listeners
			removeGlobalEventListeners() {
				document.removeEventListener("keydown", this.dealKeydownEvent.bind(this));
			},

			// delete cell selection range value
			deleteCellSelectionRangeValue() {
				// 删除单元格选择范围值逻辑
			},

			// set range cell selection by header indicator
			setRangeCellSelectionByHeaderIndicator() {
				// 头部指示器设置范围单元格选择逻辑
			},

			// set range cell selection by body indicator
			setRangeCellSelectionByBodyIndicator() {
				// 身体指示器设置范围单元格选择逻辑
			}
		},
		components: {
			ColgroupComponent: Vue._X_TABLE_EASY_COMPONENTS.Colgroup,
			HeaderComponent: Vue._X_TABLE_EASY_COMPONENTS.Header,
			BodyComponent: Vue._X_TABLE_EASY_COMPONENTS.Body,
			FooterComponent: Vue._X_TABLE_EASY_COMPONENTS.Footer,
			EditInputComponent: Vue._X_TABLE_EASY_COMPONENTS.EditInput,
			SelectionComponent: Vue._X_TABLE_EASY_COMPONENTS.Selection,
			ContextmenuComponent: Vue._X_TABLE_EASY_COMPONENTS.Contextmenu
		}
	});
}
</script>

<style lang="less">
// 表格组件样式
.@{VE_TABLE_PREFIX-cls} {
	&-root {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	&-container-wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	&-container {
		width: 100%;
		overflow: auto;
		position: relative;

		&-left-scrolling {
			cursor: w-resize;
		}

		&-right-scrolling {
			cursor: e-resize;
		}

		&-vertical-scrolling {
			cursor: ns-resize;
		}
	}

	&-content-wrapper {
		position: relative;
	}

	&-table {
		width: 100%;
		border-collapse: collapse;
		border-spacing: 0;
	}

	&-virtual-phantom {
		position: absolute;
		top: 0;
		left: 0;
		width: 1px;
		pointer-events: none;
	}

	&-border-around {
		border: 1px solid @VE_TABLE_BORDER_COLOR;
	}

	&-border-x {
		tbody tr {
			border-bottom: 1px solid @VE_TABLE_BORDER_COLOR;
		}
	}

	&-border-y {
		th,
		td {
			border-right: 1px solid @VE_TABLE_BORDER_COLOR;
		}
	}

	&-stripe {
		tbody tr:nth-child(even) {
			background-color: @VE_TABLE_STRIPE_COLOR;
		}
	}

	&-row-hover {
		tbody tr:hover {
			background-color: @VE_TABLE_HOVER_COLOR;
		}
	}

	&-row-highlight {
		tbody tr[ve-table-body-row-key] {
			&.highlight {
				background-color: @VE_TABLE_HIGHLIGHT_COLOR;
			}
		}
	}

	&-enable-cell-selection {
		user-select: none;
	}

	&-is-cell-editing {
		.@{VE_TABLE_PREFIX-cls}-container {
			cursor: text;
		}
	}

	&-autofilling {
		.@{VE_TABLE_PREFIX-cls}-container {
			cursor: crosshair;
		}
	}
}
</style>
