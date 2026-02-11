<template>
	<div
		v-if="cpt_selection_borders_visibility"
		:class="cpt_selection_wrapper_class"
		:style="cpt_selection_wrapper_style">
		<!-- fixed left -->
		<div :class="cpt_selection_fixed_left_class">
			<!-- current -->
			<div
				v-if="cpt_fixed_left_selection_current.selectionCurrent"
				v-html="cpt_fixed_left_selection_current.selectionCurrent"></div>
			<!-- area -->
			<div
				v-if="cpt_fixed_left_selection_area.normalArea"
				v-html="cpt_fixed_left_selection_area.normalArea"></div>
			<!-- auto fill -->
			<div v-if="cpt_fixed_left_auto_fill_area" v-html="cpt_fixed_left_auto_fill_area"></div>
			<!-- area layer -->
			<div
				v-if="cpt_fixed_left_selection_area.normalAreaLayer"
				v-html="cpt_fixed_left_selection_area.normalAreaLayer"></div>
		</div>

		<!-- middle -->
		<div :class="cpt_selection_middle_class">
			<!-- current -->
			<div
				v-if="cpt_middle_selection_current.selectionCurrent"
				v-html="cpt_middle_selection_current.selectionCurrent"></div>
			<!-- area -->
			<div
				v-if="cpt_middle_selection_area.normalArea"
				v-html="cpt_middle_selection_area.normalArea"></div>
			<!-- auto fill -->
			<div v-if="cpt_middle_auto_fill_area" v-html="cpt_middle_auto_fill_area"></div>
			<!-- area layer -->
			<div
				v-if="cpt_middle_selection_area.normalAreaLayer"
				v-html="cpt_middle_selection_area.normalAreaLayer"></div>
		</div>

		<!-- fixed right -->
		<div :class="cpt_selection_fixed_right_class">
			<!-- current -->
			<div
				v-if="cpt_fixed_right_selection_current.selectionCurrent"
				v-html="cpt_fixed_right_selection_current.selectionCurrent"></div>
			<!-- area -->
			<div
				v-if="cpt_fixed_right_selection_area.normalArea"
				v-html="cpt_fixed_right_selection_area.normalArea"></div>
			<!-- auto fill -->
			<div
				v-if="cpt_fixed_right_auto_fill_area"
				v-html="cpt_fixed_right_auto_fill_area"></div>
			<!-- area layer -->
			<div
				v-if="cpt_fixed_right_selection_area.normalAreaLayer"
				v-html="cpt_fixed_right_selection_area.normalAreaLayer"></div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_SELECTION,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			tableEl: {
				type: HTMLTableElement,
				default: null
			},
			allRowKeys: {
				type: Array,
				required: true
			},
			colgroups: {
				type: Array,
				required: true
			},
			parentRendered: {
				type: Boolean,
				required: true
			},
			hooks: {
				type: Object,
				required: true
			},
			// cell autofill option
			cellAutofillOption: {
				type: [Object, Boolean],
				default: function () {
					return null;
				}
			},
			cellSelectionData: {
				type: Object,
				required: true
			},
			cellSelectionRangeData: {
				type: Object,
				required: true
			},
			isAutofillStarting: {
				type: Boolean,
				required: true
			},
			currentCellSelectionType: {
				type: String,
				default: ""
			},
			// is scrolling
			showVirtualScrollingPlaceholder: {
				type: Boolean,
				default: false
			},
			isVirtualScroll: {
				type: Boolean,
				default: false
			},
			virtualScrollVisibleIndexs: {
				type: Object,
				required: true
			},
			isCellEditing: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				// current cell
				currentCellEl: null,
				normalEndCellEl: null,
				autoFillEndCellEl: null,
				// cell selection rect
				cellSelectionRect: {
					// current cell element rect
					currentCellRect: {
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					// normal end cell element rect
					normalEndCellRect: {
						left: 0,
						top: 0,
						width: 0,
						height: 0
					},
					// auto fill end cell element rect
					autoFillEndCellRect: {
						left: 0,
						top: 0,
						width: 0,
						height: 0
					}
				}
			};
		},

		computed: {
			// selection borders visibility
			cpt_selection_borders_visibility() {
				let result = true;
				if (this.isVirtualScroll) {
					const {
						showVirtualScrollingPlaceholder,
						cellSelectionData,
						virtualScrollVisibleIndexs,
						currentCellSelectionType
					} = this;

					if (showVirtualScrollingPlaceholder) {
						result = false;
					} else {
						const { currentCell, normalEndCell } = cellSelectionData;

						if (
							currentCellSelectionType ===
							Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
						) {
							if (
								currentCell.rowIndex < virtualScrollVisibleIndexs.start ||
								currentCell.rowIndex > virtualScrollVisibleIndexs.end
							) {
								result = false;
							}
						}

						if (
							currentCellSelectionType ===
							Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.RANGE
						) {
							if (
								(currentCell.rowIndex < virtualScrollVisibleIndexs.start &&
									normalEndCell.rowIndex < virtualScrollVisibleIndexs.start) ||
								(currentCell.rowIndex > virtualScrollVisibleIndexs.end &&
									normalEndCell.rowIndex > virtualScrollVisibleIndexs.end)
							) {
								result = false;
							}
						}
					}
				}
				return result;
			},
			// show corner
			cpt_show_corner() {
				let result = true;
				const { cellAutofillOption } = this;
				if (cellAutofillOption) {
					const { directionX, directionY } = this.cellAutofillOption;
					if (
						Vue._X_TABLE_EASY_UTILS.isBoolean(directionY) &&
						!directionY &&
						Vue._X_TABLE_EASY_UTILS.isBoolean(directionX) &&
						!directionX
					) {
						result = false;
					}
				} else {
					result = false;
				}

				return result;
			},
			// corner cell info
			cpt_corner_cell_info() {
				const { allRowKeys, colgroups, cellSelectionRangeData } = this;

				const { rightColKey, bottomRowKey } = cellSelectionRangeData;

				let isLastColumn = false;
				if (Vue._X_TABLE_EASY_UTILS.isLastColumnByColKey(rightColKey, colgroups)) {
					isLastColumn = true;
				} else {
					const index = colgroups.findIndex(x => x.key === rightColKey);
					// right col is right fixed and current col is not right fixed
					if (
						colgroups[index + 1].fixed ===
							Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT &&
						colgroups[index].fixed !==
							Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
					) {
						isLastColumn = true;
					}
				}

				let isLastRow = false;
				if (Vue._X_TABLE_EASY_UTILS.isLastRowByRowKey(bottomRowKey, allRowKeys)) {
					isLastRow = true;
				}

				return {
					isLastColumn,
					isLastRow
				};
			},
			// is first selection row
			cpt_is_first_selection_row() {
				const { allRowKeys, cellSelectionRangeData } = this;
				return allRowKeys[0] === cellSelectionRangeData.topRowKey;
			},
			// is first selection column
			cpt_is_first_selection_col() {
				const { colgroups, cellSelectionRangeData } = this;
				return colgroups[0].key === cellSelectionRangeData.leftColKey;
			},
			// is first not fixed selection column
			cpt_is_first_not_fixed_selection_col() {
				let result = false;

				const { colgroups, cellSelectionRangeData } = this;

				if (
					colgroups.find(
						x => x.fixed === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
					)
				) {
					const col = colgroups.find(x => !x.fixed);
					if (col && col.field === cellSelectionRangeData.leftColKey) {
						result = true;
					}
				}

				return result;
			},
			// selection wrapper class
			cpt_selection_wrapper_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("selection-wrapper")]: true
				};
			},
			// selection wrapper style
			cpt_selection_wrapper_style() {
				return {
					visibility: this.isCellEditing ? "hidden" : ""
				};
			},
			// selection fixed left class
			cpt_selection_fixed_left_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("selection-fixed-left")]: true
				};
			},
			// selection middle class
			cpt_selection_middle_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("selection-middle")]: true
				};
			},
			// selection fixed right class
			cpt_selection_fixed_right_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("selection-fixed-right")]: true
				};
			},
			// fixed left selection current
			cpt_fixed_left_selection_current() {
				return this.cpt_get_selection_current({
					fixedType: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
				});
			},
			// fixed left selection area
			cpt_fixed_left_selection_area() {
				return this.cpt_get_selection_areas({
					fixedType: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT
				});
			},
			// fixed left auto fill area
			cpt_fixed_left_auto_fill_area() {
				const { cpt_fixed_left_selection_current, cpt_fixed_left_selection_area } = this;
				return (
					cpt_fixed_left_selection_current.autoFillArea ||
					cpt_fixed_left_selection_area.autoFillArea
				);
			},
			// middle selection current
			cpt_middle_selection_current() {
				return this.cpt_get_selection_current({ fixedType: "" });
			},
			// middle selection area
			cpt_middle_selection_area() {
				return this.cpt_get_selection_areas({ fixedType: "" });
			},
			// middle auto fill area
			cpt_middle_auto_fill_area() {
				const { cpt_middle_selection_current, cpt_middle_selection_area } = this;
				return (
					cpt_middle_selection_current.autoFillArea ||
					cpt_middle_selection_area.autoFillArea
				);
			},
			// fixed right selection current
			cpt_fixed_right_selection_current() {
				return this.cpt_get_selection_current({
					fixedType: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
				});
			},
			// fixed right selection area
			cpt_fixed_right_selection_area() {
				return this.cpt_get_selection_areas({
					fixedType: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
				});
			},
			// fixed right auto fill area
			cpt_fixed_right_auto_fill_area() {
				const { cpt_fixed_right_selection_current, cpt_fixed_right_selection_area } = this;
				return (
					cpt_fixed_right_selection_current.autoFillArea ||
					cpt_fixed_right_selection_area.autoFillArea
				);
			}
		},

		watch: {
			parentRendered: {
				handler: function (val) {
					if (val) {
						// add table container scroll hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_CONTAINER_SCROLL,
							() => {
								this.cpt_set_cell_els();
								this.debounceSetCellEls();

								this.cpt_reset_cell_positions();
								// debounce reset cell positions
								this.debounceResetCellPositions();
							}
						);
						// add table size change hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_SIZE_CHANGE,
							() => {
								// debounce reset cell positions
								this.debounceResetCellPositions();
							}
						);
						// add table td width change hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_CELL_WIDTH_CHANGE,
							() => {
								this.$nextTick(() => {
									this.cpt_reset_cell_positions();
								});
							}
						);

						// add clipboard cell value change hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.CLIPBOARD_CELL_VALUE_CHANGE,
							() => {
								this.$nextTick(() => {
									this.cpt_reset_cell_positions();
								});
							}
						);
					}
				},
				immediate: true
			},
			// watch current cell
			"cellSelectionData.currentCell": {
				handler: function (val) {
					const { rowKey, colKey } = val;
					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
					) {
						this.cpt_set_current_cell_el();
						this.cpt_set_selection_positions({ type: "currentCell" });
					} else {
						this[
							Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.CLEAR_CURRENT_CELL_RECT
						]();
					}
					this.cpt_set_cell_selection_range_data();
				},
				deep: true,
				immediate: true
			},
			// watch normal end cell
			"cellSelectionData.normalEndCell": {
				handler: function (val) {
					const { rowKey, colKey } = val;
					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
					) {
						// set normal end cell el
						this.cpt_set_normal_end_cell_el();
						this.cpt_set_selection_positions({ type: "normalEndCell" });
					} else {
						this[
							Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.CLEAR_NORMAL_END_CELL_RECT
						]();
					}
					this.cpt_set_cell_selection_range_data();
				},
				deep: true,
				immediate: true
			},
			// watch autofill cell
			"cellSelectionData.autoFillEndCell": {
				handler: function (val) {
					const { rowKey, colKey } = val;
					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
					) {
						this.cpt_set_autofill_end_cell_el();
						this.cpt_set_selection_positions({ type: "autoFillEndCell" });
					} else {
						this.cpt_clear_autofill_end_cell_rect();
					}
				},
				deep: true,
				immediate: true
			}
		},

		methods: {
			// reset cell position
			cpt_reset_cell_positions() {
				const { currentCell, normalEndCell } = this.cellSelectionData;
				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.colKey)
				) {
					this.cpt_set_selection_positions({
						type: "currentCell"
					});
				}

				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(normalEndCell.rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(normalEndCell.colKey)
				) {
					this.cpt_set_selection_positions({
						type: "normalEndCell"
					});
				}
			},

			// set cell els
			cpt_set_cell_els() {
				if (this.isVirtualScroll && this.cpt_selection_borders_visibility) {
					this.cpt_set_current_cell_el();
					this.cpt_set_normal_end_cell_el();
				}
			},

			// set cell selection range data
			cpt_set_cell_selection_range_data() {
				const { currentCellSelectionType } = this;
				const { currentCell, normalEndCell } = this.cellSelectionData;

				let result = {};

				if (
					currentCellSelectionType ===
					Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
				) {
					result = {
						leftColKey: currentCell.colKey,
						rightColKey: currentCell.colKey,
						topRowKey: currentCell.rowKey,
						bottomRowKey: currentCell.rowKey
					};
				} else if (
					currentCellSelectionType ===
					Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.RANGE
				) {
					const leftmostColKey = Vue._X_TABLE_EASY_UTILS.getLeftmostColKey({
						colgroups: this.colgroups,
						colKeys: [currentCell.colKey, normalEndCell.colKey]
					});

					/*
          current cell col key is leftmost colKey
          需要用 colKey 的位置进行判断，不能根据当前单元格 left 值判断（固定列时）
          */
					if (leftmostColKey === currentCell.colKey) {
						result.leftColKey = currentCell.colKey;
						result.rightColKey = normalEndCell.colKey;
					} else {
						result.leftColKey = normalEndCell.colKey;
						result.rightColKey = currentCell.colKey;
					}

					if (currentCell.rowIndex < normalEndCell.rowIndex) {
						result.topRowKey = currentCell.rowKey;
						result.bottomRowKey = normalEndCell.rowKey;
					} else {
						result.topRowKey = normalEndCell.rowKey;
						result.bottomRowKey = currentCell.rowKey;
					}
				} else {
					// clear
					result = {
						leftColKey: "",
						rightColKey: "",
						topRowKey: "",
						bottomRowKey: ""
					};
				}

				this.$emit(
					Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.CELL_SELECTION_RANGE_DATA_CHANGE,
					result
				);
			},

			// get cell position
			cpt_get_cell_position({ cellEl, tableLeft, tableTop }) {
				if (!this.cpt_selection_borders_visibility) {
					return false;
				}

				const {
					left: cellLeft,
					top: cellTop,
					height: cellHeight,
					width: cellWidth
				} = cellEl.getBoundingClientRect();

				if (cellHeight && cellWidth) {
					return {
						left: cellLeft - tableLeft,
						top: cellTop - tableTop,
						width: cellWidth,
						height: cellHeight
					};
				}
			},

			// get cell position by column key
			cpt_get_cell_position_by_col_key({
				tableLeft,
				tableTop,
				colKey,
				isFirstRow,
				isLastRow
			}) {
				if (!this.cpt_selection_borders_visibility) {
					return false;
				}

				let cellEl;
				if (isFirstRow) {
					cellEl = this.cpt_get_table_first_row_cell_by_col_key(colKey);
				} else if (isLastRow) {
					cellEl = this.cpt_get_table_last_row_cell_by_col_key(colKey);
				}

				if (!cellEl) {
					return;
				}

				const {
					left: cellLeft,
					top: cellTop,
					//height: cellHeight,
					width: cellWidth
				} = cellEl.getBoundingClientRect();

				if (cellWidth) {
					return {
						left: cellLeft - tableLeft,
						top: cellTop - tableTop,
						width: cellWidth
					};
				}
			},

			// set selection positions
			cpt_set_selection_positions({ type }) {
				const {
					allRowKeys,
					tableEl,
					currentCellEl,
					normalEndCellEl,
					autoFillEndCellEl,
					cellSelectionData,
					virtualScrollVisibleIndexs
				} = this;

				// table empty
				if (allRowKeys.length === 0) {
					return false;
				}

				if (!tableEl) {
					return false;
				}

				const { left: tableLeft, top: tableTop } = tableEl.getBoundingClientRect();

				let isCurrentCellOverflow = false;
				let isNormalEndCellOverflow = false;
				// set current cell position
				if (type === "currentCell") {
					isCurrentCellOverflow = true;
					if (currentCellEl) {
						const rect = this.cpt_get_cell_position({
							cellEl: currentCellEl,
							tableLeft,
							tableTop
						});
						if (rect) {
							isCurrentCellOverflow = false;
							this.cellSelectionRect.currentCellRect = rect;
						}
					}
				}

				// set nromal end cell position`
				if (type === "normalEndCell") {
					isNormalEndCellOverflow = true;
					if (normalEndCellEl) {
						const rect = this.cpt_get_cell_position({
							cellEl: normalEndCellEl,
							tableLeft,
							tableTop
						});
						if (rect) {
							isNormalEndCellOverflow = false;
							this.cellSelectionRect.normalEndCellRect = rect;
						}
					}
				}

				// current cell overflow or normal end cell overflow && is virtual scroll
				if ((isCurrentCellOverflow || isNormalEndCellOverflow) && this.isVirtualScroll) {
					const { currentCell, normalEndCell } = cellSelectionData;
					// 弥补的
					let mackUpColKey;
					let mackUpRowIndex;

					if (isCurrentCellOverflow) {
						mackUpColKey = currentCell.colKey;
						mackUpRowIndex = currentCell.rowIndex;
					} else {
						mackUpColKey = normalEndCell.colKey;
						mackUpRowIndex = normalEndCell.rowIndex;
					}

					let mackUpRect;
					/* 
          当没有 currentCellRect 或 normalCellRect 时 进行纠正，否则只更新top值
          */
					if (
						(isCurrentCellOverflow && !this.cellSelectionRect.currentCellRect.height) ||
						(isNormalEndCellOverflow &&
							!this.cellSelectionRect.normalEndCellRect.height)
					) {
						let mackUpRectParams = {
							tableLeft,
							tableTop,
							colKey: mackUpColKey
						};
						// 上方超出
						if (mackUpRowIndex < virtualScrollVisibleIndexs.start) {
							mackUpRect = this.cpt_get_cell_position_by_col_key({
								...mackUpRectParams,
								isFirstRow: true
							});
						}
						// 下方超出
						else if (mackUpRowIndex > virtualScrollVisibleIndexs.end) {
							mackUpRect = this.cpt_get_cell_position_by_col_key({
								...mackUpRectParams,
								isLastRow: true
							});
						}
					}
					// 仅更新 top 值
					else {
						// 上方超出
						if (mackUpRowIndex < virtualScrollVisibleIndexs.start) {
							mackUpRect = {
								top: 0
							};
						}
						// 下方超出
						else if (mackUpRowIndex > virtualScrollVisibleIndexs.end) {
							mackUpRect = {
								top: tableEl.clientHeight
							};
						}
					}

					if (isCurrentCellOverflow) {
						Object.assign(this.cellSelectionRect.currentCellRect, mackUpRect);
					} else {
						Object.assign(this.cellSelectionRect.normalEndCellRect, mackUpRect);
					}
				}

				if (autoFillEndCellEl && type === "autoFillEndCell") {
					const rect = this.cpt_get_cell_position({
						cellEl: autoFillEndCellEl,
						tableLeft,
						tableTop
					});

					if (rect) {
						this.cellSelectionRect.autoFillEndCellRect = rect;
					}
				}
			},

			/*
      get selection current
      1、selection current
      2、auto fill area
      */
			cpt_get_selection_current({ fixedType }) {
				let result = {
					selectionCurrent: null,
					autoFillArea: null
				};

				const { cellSelectionRect, colgroups, cellSelectionData } = this;

				const { currentCellRect, normalEndCellRect } = cellSelectionRect;

				if (!currentCellRect.width) {
					return result;
				}

				const borders = {
					borderWidth: currentCellRect.width + 1,
					borderHeight: currentCellRect.height,

					topBorder: {
						show: true,
						width: 0,
						height: 2,
						top: currentCellRect.top - 1,
						left: currentCellRect.left - 1
					},
					rightBorder: {
						show: true,
						width: 2,
						height: 0,
						top: currentCellRect.top,
						left: currentCellRect.left + currentCellRect.width - 2
					},
					bottomBorder: {
						show: true,
						width: 0,
						height: 2,
						top: currentCellRect.top + currentCellRect.height - 2,
						left: currentCellRect.left - 1
					},
					leftBorder: {
						show: true,
						width: 2,
						height: 0,
						top: currentCellRect.top,
						left: currentCellRect.left - 1
					},
					corner: {
						show: !normalEndCellRect.width,
						top: 0,
						left: 0
					}
				};

				borders.corner.top = borders.bottomBorder.top - 3;
				borders.corner.left = borders.rightBorder.left - 3;

				// cell selection single autofill
				if (!normalEndCellRect.width) {
					result.autoFillArea = this.cpt_get_selection_autofill_area({
						areaPostions: borders,
						fixedType
					});
				}

				const totalColKeys = [cellSelectionData.currentCell.colKey];

				const fixedColKeys = Vue._X_TABLE_EASY_UTILS.getColKeysByFixedTypeWithinColKeys({
					colKeys: totalColKeys,
					fixedType,
					colgroups
				});

				result.selectionCurrent = this.cpt_get_borders({
					...borders,
					showCorner: !normalEndCellRect.width,
					className: "selection-current",
					fixedType,
					totalColKeys,
					fixedColKeys
				});

				return result;
			},

			/*
      get selection areas
      1、normal area
      2、auto fill area
      */
			cpt_get_selection_areas({ fixedType }) {
				let result = {
					normalArea: null,
					autoFillArea: null
				};

				const { currentCell, normalEndCell } = this.cellSelectionData;

				const { cellSelectionRect, cellSelectionRangeData, colgroups } = this;

				const { currentCellRect, normalEndCellRect } = cellSelectionRect;

				if (!currentCellRect.width || !normalEndCellRect.width) {
					return result;
				}

				const borders = {
					borderWidth: 0,
					borderHeight: 0,

					topBorder: {
						show: true,
						width: 0,
						height: 1,
						top: 0,
						left: 0
					},
					rightBorder: {
						show: true,
						width: 1,
						height: 0,
						top: 0,
						left: 0
					},
					bottomBorder: {
						show: true,
						width: 0,
						height: 1,
						top: 0,
						left: 0
					},
					leftBorder: {
						show: true,
						width: 1,
						height: 0,
						top: 0,
						left: 0
					},
					corner: {
						show: true,
						top: 0,
						left: 0
					}
				};

				const leftmostColKey = Vue._X_TABLE_EASY_UTILS.getLeftmostColKey({
					colgroups: this.colgroups,
					colKeys: [currentCell.colKey, normalEndCell.colKey]
				});

				// end cell column key right
				if (leftmostColKey === currentCell.colKey) {
					borders.borderWidth =
						normalEndCellRect.left - currentCellRect.left + normalEndCellRect.width + 1;

					borders.topBorder.left = currentCellRect.left - 1;
					borders.bottomBorder.left = currentCellRect.left - 1;
					borders.leftBorder.left = currentCellRect.left - 1;
					borders.rightBorder.left = normalEndCellRect.left + normalEndCellRect.width - 1;
				}
				// end cell column key left or equal
				else if (leftmostColKey === normalEndCell.colKey) {
					borders.borderWidth =
						currentCellRect.left - normalEndCellRect.left + currentCellRect.width + 1;

					borders.topBorder.left = normalEndCellRect.left - 1;
					borders.rightBorder.left = currentCellRect.left + currentCellRect.width - 1;
					borders.bottomBorder.left = normalEndCellRect.left - 1;
					borders.leftBorder.left = normalEndCellRect.left - 1;
				}

				// end cell below
				if (normalEndCellRect.top > currentCellRect.top) {
					borders.borderHeight =
						normalEndCellRect.top - currentCellRect.top + normalEndCellRect.height;

					borders.topBorder.top = currentCellRect.top - 1;
					borders.rightBorder.top = currentCellRect.top;
					borders.bottomBorder.top = normalEndCellRect.top + normalEndCellRect.height - 1;
					borders.leftBorder.top = currentCellRect.top;
				}
				// end cell above or equal
				else if (normalEndCellRect.top <= currentCellRect.top) {
					borders.borderHeight =
						currentCellRect.top - normalEndCellRect.top + currentCellRect.height;

					borders.topBorder.top = normalEndCellRect.top - 1;
					borders.rightBorder.top = normalEndCellRect.top;
					borders.bottomBorder.top = currentCellRect.top + currentCellRect.height - 1;
					borders.leftBorder.top = normalEndCellRect.top;
				}

				borders.corner.top = borders.bottomBorder.top - 4;
				borders.corner.left = borders.rightBorder.left - 4;

				if (normalEndCellRect.width) {
					result.autoFillArea = this.cpt_get_selection_autofill_area({
						areaPostions: borders,
						fixedType
					});
				}

				const { leftColKey, rightColKey } = cellSelectionRangeData;
				const totalColKeys = Vue._X_TABLE_EASY_UTILS.getColKeysByRangeColKeys({
					colKey1: leftColKey,
					colKey2: rightColKey,
					colgroups
				});

				const fixedColKeys = Vue._X_TABLE_EASY_UTILS.getColKeysByFixedTypeWithinColKeys({
					colKeys: totalColKeys,
					fixedType,
					colgroups
				});

				result.normalArea = this.cpt_get_borders({
					...borders,
					className: "selection-normal-area",
					fixedType,
					totalColKeys,
					fixedColKeys
				});

				result.normalAreaLayer = this.cpt_get_area_layer({
					...borders,
					className: "selection-normal-area-layer",
					fixedType,
					totalColKeys,
					fixedColKeys
				});

				return result;
			},

			// get selection auto fill
			cpt_get_selection_autofill_area({ areaPostions, fixedType }) {
				let result = null;

				const {
					cellAutofillOption,
					cellSelectionRangeData,
					cellSelectionRect,
					cellSelectionData,
					isAutofillStarting,
					currentCellSelectionType,
					colgroups
				} = this;

				if (!isAutofillStarting) {
					return result;
				}

				const { currentCellRect, autoFillEndCellRect } = cellSelectionRect;

				if (!currentCellRect.width || !autoFillEndCellRect.width) {
					return result;
				}

				if (!areaPostions) {
					return result;
				}

				const borders = {
					borderWidth: 0,
					borderHeight: 0,

					topBorder: {
						show: true,
						width: 0,
						height: 1,
						top: 0,
						left: 0
					},
					rightBorder: {
						show: true,
						width: 1,
						height: 0,
						top: 0,
						left: 0
					},
					bottomBorder: {
						show: true,
						width: 0,
						height: 1,
						top: 0,
						left: 0
					},
					leftBorder: {
						show: true,
						width: 1,
						height: 0,
						top: 0,
						left: 0
					},
					corner: {
						show: false,
						top: 0,
						left: 0
					}
				};

				const { currentCell, autoFillEndCell } = cellSelectionData;

				let { leftColKey, rightColKey } = cellSelectionRangeData;
				if (
					currentCellSelectionType ===
					Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
				) {
					leftColKey = currentCell.colKey;
					rightColKey = currentCell.colKey;
				}

				let leftmostColKey;
				if (leftColKey !== autoFillEndCell.colKey) {
					leftmostColKey = Vue._X_TABLE_EASY_UTILS.getLeftmostColKey({
						colgroups,
						colKeys: [leftColKey, autoFillEndCell.colKey]
					});
				}

				let rightmostColKey;
				if (rightColKey !== autoFillEndCell.colKey) {
					rightmostColKey = Vue._X_TABLE_EASY_UTILS.getRightmostColKey({
						colgroups,
						colKeys: [rightColKey, autoFillEndCell.colKey]
					});
				}

				// autofilling direction
				let autofillingDirection;

				let rangeColKey1;
				let rangeColKey2;

				// auto fill end cell below
				if (autoFillEndCellRect.top > areaPostions.bottomBorder.top) {
					autofillingDirection = Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.DOWN;

					rangeColKey1 = leftColKey;
					rangeColKey2 = rightColKey;

					borders.topBorder.show = false;

					borders.borderWidth = areaPostions.borderWidth;
					borders.borderHeight =
						autoFillEndCellRect.top -
						areaPostions.bottomBorder.top +
						autoFillEndCellRect.height;

					borders.rightBorder.top = areaPostions.bottomBorder.top;
					borders.rightBorder.left = areaPostions.rightBorder.left;
					if (
						currentCellSelectionType ===
						Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
					) {
						borders.rightBorder.left++;
					}

					borders.leftBorder.top = areaPostions.bottomBorder.top;
					borders.leftBorder.left = areaPostions.leftBorder.left;

					borders.bottomBorder.top =
						autoFillEndCellRect.top + autoFillEndCellRect.height - 1;
					borders.bottomBorder.left = areaPostions.bottomBorder.left;
				}
				// end cell above
				else if (autoFillEndCellRect.top < areaPostions.topBorder.top) {
					autofillingDirection = Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.UP;

					rangeColKey1 = leftColKey;
					rangeColKey2 = rightColKey;

					borders.bottomBorder.show = false;

					borders.borderWidth = areaPostions.borderWidth;
					borders.borderHeight = areaPostions.topBorder.top - autoFillEndCellRect.top;

					borders.topBorder.top = autoFillEndCellRect.top - 1;
					borders.topBorder.left = areaPostions.topBorder.left;

					borders.rightBorder.top = autoFillEndCellRect.top;
					borders.rightBorder.left = areaPostions.rightBorder.left;
					if (
						currentCellSelectionType ===
						Vue._X_TABLE_EASY_CONSTANTS.CURRENT_CELL_SELECTION_TYPES.SINGLE
					) {
						borders.rightBorder.left++;
					}

					borders.leftBorder.top = autoFillEndCellRect.top;
					borders.leftBorder.left = areaPostions.leftBorder.left;
				}
				// auto fill end cell right
				else if (
					rightmostColKey === autoFillEndCell.colKey &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rightmostColKey)
				) {
					autofillingDirection = Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.RIGHT;

					rangeColKey1 = Vue._X_TABLE_EASY_UTILS.getNextColKey({
						colgroups,
						currentColKey: rightColKey
					});
					rangeColKey2 = autoFillEndCell.colKey;

					borders.leftBorder.show = false;

					borders.borderWidth =
						autoFillEndCellRect.left -
						areaPostions.rightBorder.left +
						autoFillEndCellRect.width +
						1;
					borders.borderHeight = areaPostions.borderHeight;

					borders.topBorder.top = areaPostions.topBorder.top;
					borders.topBorder.left = areaPostions.rightBorder.left - 1;

					borders.rightBorder.top = areaPostions.topBorder.top;
					borders.rightBorder.left =
						autoFillEndCellRect.left + autoFillEndCellRect.width - 1;

					borders.bottomBorder.top = areaPostions.bottomBorder.top;
					borders.bottomBorder.left = areaPostions.rightBorder.left - 1;
				}
				// auto fill end cell left
				else if (
					leftmostColKey === autoFillEndCell.colKey &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(leftmostColKey)
				) {
					autofillingDirection = Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.LEFT;

					rangeColKey1 = Vue._X_TABLE_EASY_UTILS.getPreviewColKey({
						colgroups,
						currentColKey: leftColKey
					});
					rangeColKey2 = autoFillEndCell.colKey;

					borders.rightBorder.show = false;

					borders.borderWidth =
						areaPostions.leftBorder.left - autoFillEndCellRect.left + 1;
					borders.borderHeight = areaPostions.borderHeight;

					borders.topBorder.top = areaPostions.topBorder.top;
					borders.topBorder.left = autoFillEndCellRect.left;

					borders.rightBorder.left = areaPostions.topBorder.left;

					borders.bottomBorder.top = areaPostions.bottomBorder.top;
					borders.bottomBorder.left = autoFillEndCellRect.left;

					borders.leftBorder.top = areaPostions.topBorder.top;
					borders.leftBorder.left = autoFillEndCellRect.left;
				} else {
					return result;
				}

				const { directionX, directionY } = cellAutofillOption;
				if (Vue._X_TABLE_EASY_UTILS.isBoolean(directionX) && !directionX) {
					if (
						autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.LEFT ||
						autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.RIGHT
					) {
						return false;
					}
				}

				if (Vue._X_TABLE_EASY_UTILS.isBoolean(directionY) && !directionY) {
					if (
						autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.UP ||
						autofillingDirection ===
							Vue._X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.DOWN
					) {
						return false;
					}
				}

				const totalColKeys = Vue._X_TABLE_EASY_UTILS.getColKeysByRangeColKeys({
					colKey1: rangeColKey1,
					colKey2: rangeColKey2,
					colgroups
				});

				let fixedColKeys = Vue._X_TABLE_EASY_UTILS.getColKeysByFixedTypeWithinColKeys({
					colKeys: totalColKeys,
					fixedType,
					colgroups
				});

				result = this.cpt_get_borders({
					className: "selection-autofill-area",
					...borders,
					fixedType,
					totalColKeys,
					fixedColKeys
				});

				if (result) {
					this.dispatch(
						Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
						Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.AUTOFILLING_DIRECTION_CHANGE,
						autofillingDirection
					);
				}

				return result;
			},

			// get borders
			cpt_get_borders({
				borderWidth,
				borderHeight,
				topBorder,
				rightBorder,
				bottomBorder,
				leftBorder,
				corner,
				className,
				fixedType,
				totalColKeys,
				fixedColKeys
			}) {
				const {
					cpt_corner_cell_info,
					colgroups,
					cpt_is_first_selection_row,
					cpt_is_first_selection_col,
					cpt_is_first_not_fixed_selection_col,
					cpt_show_corner
				} = this;

				let isRender = true;

				if (fixedType) {
					isRender = Vue._X_TABLE_EASY_UTILS.isExistGivenFixedColKey({
						fixedType,
						colKeys: totalColKeys,
						colgroups
					});
				}
				// middle normal area
				else {
					isRender = Vue._X_TABLE_EASY_UTILS.isExistNotFixedColKey({
						colKeys: totalColKeys,
						colgroups
					});
				}

				if (!isRender) {
					return null;
				}

				// fixed columns total width
				let fixedColsTotalWidth = 0;
				if (fixedColKeys.length) {
					fixedColsTotalWidth = Vue._X_TABLE_EASY_UTILS.getTotalWidthByColKeys({
						colKeys: fixedColKeys,
						colgroups
					});
				}

				if (fixedType) {
					borderWidth = fixedColsTotalWidth;
					if (fixedType === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT) {
						borderWidth += 1;
					}
				}

				if (fixedType === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT) {
					if (totalColKeys.length !== fixedColKeys.length) {
						rightBorder.show = false;
						corner.show = false;
					}
				}

				if (fixedType === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT) {
					if (totalColKeys.length !== fixedColKeys.length) {
						leftBorder.show = false;
					}

					topBorder.left = rightBorder.left - borderWidth + 1;
					bottomBorder.left = rightBorder.left - borderWidth + 1;
				}

				// solved first row、first column、first not fixed column selection border hidden
				if (cpt_is_first_selection_row) {
					topBorder.top += 1;
				}
				if (cpt_is_first_selection_col) {
					leftBorder.left += 1;
				}
				if (cpt_is_first_not_fixed_selection_col) {
					leftBorder.left += 1;
				}

				let cornerTop = corner.top;
				let cornerLeft = corner.left;
				let cornerBorderRightWidth = "1px";
				let cornerBorderBottomtWidth = "1px";

				if (cpt_corner_cell_info.isLastRow) {
					cornerTop -= 3;
					cornerBorderBottomtWidth = "0px";
				}

				if (cpt_corner_cell_info.isLastColumn) {
					cornerLeft -= 3;
					cornerBorderRightWidth = "0px";
				}

				if (!cpt_show_corner) {
					corner.show = false;
				}

				// corner props
				const cornerProps = {
					class: Vue._X_TABLE_EASY_UTILS.clsName("selection-corner"),
					style: {
						display: corner.show ? "block" : "none",
						top: cornerTop + "px",
						left: cornerLeft + "px",
						borderWidth: `1px ${cornerBorderRightWidth} ${cornerBorderBottomtWidth} 1px`
					},
					on: {
						mousedown: e => {
							this.dispatch(
								Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
								Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.SELECTION_CORNER_MOUSEDOWN,
								{
									event: e
								}
							);
						},
						mouseup: e => {
							this.dispatch(
								Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
								Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.SELECTION_CORNER_MOUSEUP,
								{
									event: e
								}
							);
						}
					}
				};

				let html = `<div class="${Vue._X_TABLE_EASY_UTILS.clsName(className)}">`;

				// top
				html += `<div style="display: ${topBorder.show ? "block" : "none"}; width: ${borderWidth}px; height: ${topBorder.height}px; top: ${topBorder.top}px; left: ${topBorder.left}px" class="${Vue._X_TABLE_EASY_UTILS.clsName("selection-border")}"></div>`;

				// right
				html += `<div style="display: ${rightBorder.show ? "block" : "none"}; width: ${rightBorder.width}px; height: ${borderHeight}px; top: ${rightBorder.top}px; left: ${rightBorder.left}px" class="${Vue._X_TABLE_EASY_UTILS.clsName("selection-border")}"></div>`;

				// bottom
				html += `<div style="display: ${bottomBorder.show ? "block" : "none"}; width: ${borderWidth}px; height: ${bottomBorder.height}px; top: ${bottomBorder.top}px; left: ${bottomBorder.left}px" class="${Vue._X_TABLE_EASY_UTILS.clsName("selection-border")}"></div>`;

				// left
				html += `<div style="display: ${leftBorder.show ? "block" : "none"}; width: ${leftBorder.width}px; height: ${borderHeight}px; top: ${leftBorder.top}px; left: ${leftBorder.left}px" class="${Vue._X_TABLE_EASY_UTILS.clsName("selection-border")}"></div>`;

				// corner
				html += `<div class="${cornerProps.class}" style="${Object.entries(
					cornerProps.style
				)
					.map(([key, value]) => `${key}: ${value}`)
					.join(
						"; "
					)}" onmousedown="${cornerProps.on.mousedown.toString()}" onmouseup="${cornerProps.on.mouseup.toString()}"></div>`;

				html += "</div>";

				return html;
			},

			// get area rect
			cpt_get_area_layer({
				borderWidth,
				borderHeight,
				topBorder,
				className,
				fixedType,
				totalColKeys,
				fixedColKeys
			}) {
				const { colgroups } = this;

				let isRender = true;

				if (fixedType) {
					isRender = Vue._X_TABLE_EASY_UTILS.isExistGivenFixedColKey({
						fixedType,
						colKeys: totalColKeys,
						colgroups
					});
				}
				// middle normal area
				else {
					isRender = Vue._X_TABLE_EASY_UTILS.isExistNotFixedColKey({
						colKeys: totalColKeys,
						colgroups
					});
				}

				if (!isRender) {
					return null;
				}

				// fixed columns total width
				let fixedColsTotalWidth = 0;
				if (fixedColKeys.length) {
					fixedColsTotalWidth = Vue._X_TABLE_EASY_UTILS.getTotalWidthByColKeys({
						colKeys: fixedColKeys,
						colgroups
					});
				}

				if (fixedType) {
					borderWidth = fixedColsTotalWidth;
					if (fixedType === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT) {
						borderWidth += 1;
					}
				}

				return `<div class="${Vue._X_TABLE_EASY_UTILS.clsName(className)}" style="top: ${topBorder.top}px; left: ${topBorder.left}px; width: ${borderWidth}px; height: ${borderHeight}px"></div>`;
			},

			/* 
      get table first row cell by col key
      用作跨页单元格选择，表格大小变化或者存在横向滚动条时，区域选择位置自动校准
      */
			cpt_get_table_first_row_cell_by_col_key(colKey) {
				let result = null;

				const { tableEl } = this;

				if (tableEl) {
					result = tableEl.querySelector(
						`tbody.ve-table-body tr td[col-key="${colKey}"]`
					);
				}
				return result;
			},

			/* 
      get table last row cell by col key
      用作跨页单元格选择，表格大小变化或者存在横向滚动条时，区域选择位置自动校准
      */
			cpt_get_table_last_row_cell_by_col_key(colKey) {
				let result = null;

				const { tableEl } = this;

				if (tableEl) {
					result = tableEl.querySelector(
						`tbody.ve-table-body tr:last-child td[col-key="${colKey}"]`
					);
				}
				return result;
			},

			// get table el
			cpt_get_table_cell_el({ rowKey, colKey }) {
				let result = null;

				const { tableEl } = this;

				if (tableEl) {
					result = tableEl.querySelector(
						`tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`
					);
				}
				return result;
			},

			// set current cell el
			cpt_set_current_cell_el() {
				const { cellSelectionData } = this;

				const { rowKey, colKey } = cellSelectionData.currentCell;

				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
				) {
					const cellEl = this.cpt_get_table_cell_el({
						rowKey,
						colKey
					});
					if (cellEl) {
						this.currentCellEl = cellEl;
					}
				}
			},

			// set normal end cell el
			cpt_set_normal_end_cell_el() {
				const { cellSelectionData } = this;

				const { rowKey, colKey } = cellSelectionData.normalEndCell;

				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
				) {
					const cellEl = this.cpt_get_table_cell_el({
						rowKey,
						colKey
					});
					if (cellEl) {
						this.normalEndCellEl = cellEl;
					}
				}
			},

			// set auto fill cell el
			cpt_set_autofill_end_cell_el() {
				const { cellSelectionData, tableEl } = this;

				const { rowKey, colKey } = cellSelectionData.autoFillEndCell;

				if (tableEl) {
					const autoFillEndCellEl = tableEl.querySelector(
						`tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`
					);

					if (autoFillEndCellEl) {
						this.autoFillEndCellEl = autoFillEndCellEl;
					}
				}
			},

			// clear auto fill end cell rect
			cpt_clear_autofill_end_cell_rect() {
				this.autoFillEndCellEl = null;
				this.cellSelectionRect.autoFillEndCellRect = {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				};
			},

			// clear current cell rect
			[Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.CLEAR_CURRENT_CELL_RECT]() {
				this.currentCellEl = null;
				this.cellSelectionRect.currentCellRect = {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				};
			},

			// clear normal end cell rect
			[Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.CLEAR_NORMAL_END_CELL_RECT]() {
				this.normalEndCellEl = null;
				this.cellSelectionRect.normalEndCellRect = {
					left: 0,
					top: 0,
					width: 0,
					height: 0
				};
			}
		},

		created() {
			// debounce reset cell positions
			this.debounceResetCellPositions = _.debounce(this.cpt_reset_cell_positions, 210);
			// debounce set cell els
			this.debounceSetCellEls = _.debounce(this.cpt_set_cell_els, 200);
		}
	});
}
</script>

<style lang="less">
// 选择区域样式
@{VE_TABLE_PREFIX-cls} {
	&-selection-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
		z-index: 100;
	}

	&-selection-fixed-left,
	&-selection-middle,
	&-selection-fixed-right {
		position: absolute;
		top: 0;
		bottom: 0;
		pointer-events: none;
	}

	&-selection-fixed-left {
		left: 0;
	}

	&-selection-middle {
		left: 0;
		right: 0;
	}

	&-selection-fixed-right {
		right: 0;
	}

	&-selection-border {
		position: absolute;
		background-color: #1890ff;
		pointer-events: none;
	}

	&-selection-corner {
		position: absolute;
		border: 1px solid #1890ff;
		background-color: #fff;
		width: 6px;
		height: 6px;
		cursor: crosshair;
		pointer-events: auto;
	}

	&-selection-normal-area-layer {
		position: absolute;
		background-color: rgba(24, 144, 255, 0.1);
		pointer-events: none;
	}

	&-selection-autofill-area {
		position: absolute;
		background-color: rgba(24, 144, 255, 0.1);
		pointer-events: none;
	}
}
</style>
