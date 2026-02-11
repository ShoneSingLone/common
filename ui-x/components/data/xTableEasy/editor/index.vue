<template>
	<div :class="cpt_container_class" :style="cpt_container_style">
		<textarea
			ref="textareaInputRef"
			:class="cpt_textarea_class"
			v-focus="{ focus: isEditCellFocus }"
			:value="rawCellValue"
			:tabindex="-1"
			@input="handleTextareaInput"
			@click="handleTextareaClick"
			@copy="handleTextareaCopy"
			@paste="handleTextareaPaste"
			@cut="handleTextareaCut"></textarea>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_EDIT_INPUT,
		directives: {
			focus: Vue._X_TABLE_EASY_DIRECTIVES.focus
		},
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			parentRendered: {
				type: Boolean,
				required: true
			},
			hooks: {
				type: Object,
				required: true
			},
			// start input value every time
			inputStartValue: {
				type: [String, Number],
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			// table data
			tableData: {
				type: Array,
				required: true
			},
			colgroups: {
				type: Array,
				required: true
			},
			// cell selection option
			cellSelectionData: {
				type: Object,
				required: true
			},
			// editing cell
			editingCell: {
				type: Object,
				required: true
			},
			// is editing cell
			isCellEditing: {
				type: Boolean,
				required: true
			},
			// has horizontal scroll bar
			hasXScrollBar: {
				type: Boolean,
				required: true
			},
			// has vertical scroll bar
			hasYScrollBar: {
				type: Boolean,
				required: true
			},
			// has right fixed column
			hasRightFixedColumn: {
				type: Boolean,
				required: true
			},
			scrollBarWidth: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				textareaInputRef: "textareaInputRef",
				// raw cell value
				rawCellValue: "",
				// display textarea
				displayTextarea: false,
				// virtual scroll overflowViewport
				overflowViewport: false,
				// textarea element rect
				textareaRect: {
					left: 0,
					top: 0
				},
				// table element
				tableEl: null,
				// cell element
				cellEl: null,
				// auto resize
				autoResize: null,
				// is edit cell focus
				isEditCellFocus: false
			};
		},
		computed: {
			// current column
			cpt_current_column() {
				let result = null;

				const { colgroups, cellSelectionData } = this;

				const { currentCell } = cellSelectionData;

				if (
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.rowKey) &&
					!Vue._X_TABLE_EASY_UTILS.isEmptyValue(currentCell.colKey)
				) {
					result = colgroups.find(x => x.key === currentCell.colKey);
				}

				return result;
			},

			// container class
			cpt_container_class() {
				let result = null;

				const { displayTextarea, overflowViewport } = this;

				result = {
					[Vue._X_TABLE_EASY_UTILS.clsName("edit-input-container")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("edit-input-container-show")]:
						displayTextarea && !overflowViewport
				};

				return result;
			},

			// container style
			cpt_container_style() {
				let result = {};

				const {
					displayTextarea,
					overflowViewport,
					textareaRect,
					cpt_current_column: column
				} = this;

				const { top, left } = textareaRect;

				if (displayTextarea && !overflowViewport) {
					result = {
						top: top + "px",
						left: left + "px",
						height: null,
						// because @ve-fixed-body-cell-index: 10;
						"z-index": column.fixed ? 10 : 0,
						opacity: 1
					};
				} else {
					result = {
						top: top + "px",
						left: left + "px",
						height: "1px",
						"z-index": -1,
						opacity: 0
					};
				}

				return result;
			},

			// textarea class
			cpt_textarea_class() {
				let result = null;

				result = {
					[Vue._X_TABLE_EASY_UTILS.clsName("edit-input")]: true
				};

				return result;
			}
		},

		watch: {
			parentRendered: {
				handler: function (val) {
					if (val) {
						// fixed #471
						this.cpt_set_table_el();

						// add table container scroll hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_CONTAINER_SCROLL,
							() => {
								if (this.displayTextarea) {
									if (!this.cellEl) {
										this.cpt_set_cell_el();
									}
								}
								this.debounceSetCellEl();
								this.cpt_set_textarea_position();
								this.debounceSetTextareaPosition();
							}
						);
						// add table size change hook
						this.hooks.addHook(
							Vue._X_TABLE_EASY_CONSTANTS.HOOKS_NAME.TABLE_SIZE_CHANGE,
							() => {
								this.cpt_set_textarea_position();
							}
						);
					}
				},
				immediate: true
			},
			// cell selection key data
			"cellSelectionData.currentCell": {
				handler: function (val) {
					this.isEditCellFocus = false;

					const { rowKey, colKey } = val;
					if (
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(rowKey) &&
						!Vue._X_TABLE_EASY_UTILS.isEmptyValue(colKey)
					) {
						this.cpt_set_cell_el();
						// wait for selection cell rendered
						this.$nextTick(() => {
							this.cpt_set_textarea_position();
							setTimeout(() => {
								this.isEditCellFocus = true;
							});
						});
					}
				},
				deep: true,
				immediate: true
			},
			// watch normal end cell
			"cellSelectionData.normalEndCell": {
				handler: function (val) {
					/*
          trigger editor(textarea) element select
          解决通过点击的区域选择，无法复制的问题
          */
					if (!Vue._X_TABLE_EASY_UTILS.isEmptyValue(val.colKey)) {
						this[Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.TEXTAREA_SELECT]();
					}
				},
				deep: true,
				immediate: true
			},
			// is editing cell
			isCellEditing: {
				handler: function (val) {
					if (val) {
						this.cpt_show_textarea();
					} else {
						this.cpt_hide_textarea();
					}
				},
				deep: true,
				immediate: true
			},
			inputStartValue: {
				handler: function () {
					this.cpt_set_raw_cell_value();
				},
				immediate: true
			}
		},

		methods: {
			// set table element
			cpt_set_table_el() {
				this.$nextTick(() => {
					const tableEl = this.$el.previousElementSibling;
					this.tableEl = tableEl;
				});
			},

			// set cell element
			cpt_set_cell_el() {
				const { cellSelectionData, tableEl } = this;

				const { rowKey, colKey } = cellSelectionData.currentCell;

				if (tableEl) {
					const cellEl = tableEl.querySelector(
						`tbody.ve-table-body tr[row-key="${rowKey}"] td[col-key="${colKey}"]`
					);

					if (cellEl) {
						this.cellEl = cellEl;
						this.overflowViewport = false;
					}
				}
			},

			// set textarea position
			cpt_set_textarea_position() {
				const {
					hasXScrollBar,
					hasYScrollBar,
					scrollBarWidth,
					colgroups,
					hasRightFixedColumn,
					cpt_current_column: column,
					cellEl,
					tableEl
				} = this;

				if (cellEl && tableEl) {
					const {
						left: tableLeft,
						top: tableTop,
						right: tableRight,
						bottom: tableBottom
					} = tableEl.getBoundingClientRect();

					const {
						left: cellLeft,
						top: cellTop,
						height: cellHeight,
						width: cellWidth,
						right: cellRight,
						bottom: cellBottom
					} = cellEl.getBoundingClientRect();

					if (cellHeight && cellWidth) {
						let maxHeight = cellHeight + tableBottom - cellBottom;
						let maxWidth = cellWidth + tableRight - cellRight;

						// has horizontal scroll bar
						if (hasXScrollBar) {
							maxHeight -= scrollBarWidth;
						}

						// has vertical scroll bar
						if (hasYScrollBar) {
							maxWidth -= scrollBarWidth;
						}

						/* 
            If the right fixed column is included, the max width of the textarea needs to be subtracted from the sum of the right fixed columns
            如果包含右固定列，编辑框最大宽度需要去减去右固定列之和的宽度
            */
						if (hasRightFixedColumn) {
							if (column && !column.fixed) {
								const rightFixedTotalWidth =
									Vue._X_TABLE_EASY_UTILS.getFixedTotalWidthByColumnKey({
										colgroups,
										colKey: column.key,
										fixed: Vue._X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT
									});
								if (rightFixedTotalWidth) {
									maxWidth -= rightFixedTotalWidth;
								}
							}
						}

						this.autoResize.init(
							this.$refs[this.textareaInputRef],
							{
								minHeight: Math.min(cellHeight, maxHeight),
								maxHeight: maxHeight, // TEXTAREA should never be higher than visible part of the viewport (should not cover the scrollbar)
								minWidth: Math.min(cellWidth, maxWidth),
								maxWidth: maxWidth // TEXTAREA should never be wider than visible part of the viewport (should not cover the scrollbar)
							},
							true // observe textarea change\cut\paste etc.
						);

						this.textareaRect = {
							left: cellLeft - tableLeft,
							top: cellTop - tableTop
						};
					} else {
						/*
            存在以下可能：
            1、虚拟滚动超出viewport
            2、单元格被删除（通过右键菜单等方式）
            */

						// fixed #477
						this.textareaRect = {
							left: 0,
							top: 0
						};
						this.cellEl = null;
						this.overflowViewport = true;
					}
				}
			},

			// show textarea
			cpt_show_textarea() {
				this.cpt_set_raw_cell_value();
				this.displayTextarea = true;
			},

			// hide textarea
			cpt_hide_textarea() {
				this.displayTextarea = false;
				this.cpt_textarea_un_observe();
			},

			// textarea unObserve
			cpt_textarea_un_observe() {
				if (this.autoResize) {
					this.autoResize.unObserve();
				}
			},

			// set raw cell value
			cpt_set_raw_cell_value() {
				this.rawCellValue = this.inputStartValue;
			},

			// textarea value change
			cpt_textarea_value_change(val) {
				this.$emit(Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.EDIT_INPUT_VALUE_CHANGE, val);
			},

			// textarea select
			[Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.TEXTAREA_SELECT]() {
				const textareaInputEl = this.$refs[this.textareaInputRef];
				if (textareaInputEl) {
					textareaInputEl.select();
				}
			},

			// textarea add new line
			[Vue._X_TABLE_EASY_CONSTANTS.INSTANCE_METHODS.TEXTAREA_ADD_NEW_LINE]() {
				const { isCellEditing, editingCell } = this;

				if (isCellEditing) {
					const textareaInputEl = this.$refs[this.textareaInputRef];

					const caretPosition = Vue._X_TABLE_EASY_UTILS.getCaretPosition(textareaInputEl);

					let value = editingCell.row[editingCell.colKey];
					// solve error of number slice method
					value += "";

					const newValue = `${value.slice(0, caretPosition)}\n${value.slice(caretPosition)}`;

					// 直接更新 textarea 值
					textareaInputEl.value = newValue;

					// 手动赋值不会触发textarea 文本变化事件,需要手动更新 editingCell 值
					this.cpt_textarea_value_change(newValue);

					Vue._X_TABLE_EASY_UTILS.setCaretPosition(textareaInputEl, caretPosition + 1);
				}
			},

			// handle textarea input
			handleTextareaInput(e) {
				if (this.isCellEditing) {
					this.cpt_textarea_value_change(e.target.value);
					this.rawCellValue = e.target.value;
				}
			},

			// handle textarea click
			handleTextareaClick() {
				this.$emit(Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.EDIT_INPUT_CLICK);
			},

			// handle textarea copy
			handleTextareaCopy(e) {
				this.$emit(Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.EDIT_INPUT_COPY, e);
			},

			// handle textarea paste
			handleTextareaPaste(e) {
				this.$emit(Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.EDIT_INPUT_PASTE, e);
			},

			// handle textarea cut
			handleTextareaCut(e) {
				this.$emit(Vue._X_TABLE_EASY_CONSTANTS.EMIT_EVENTS.EDIT_INPUT_CUT, e);
			}
		},
		created() {
			// debounce set textarea position
			this.debounceSetTextareaPosition = _.debounce(this.cpt_set_textarea_position, 210);
			// debounce set cell el
			this.debounceSetCellEl = _.debounce(() => {
				if (this.displayTextarea) {
					if (!this.cellEl) {
						this.cpt_set_cell_el();
					}
				}
			}, 200);
		},
		mounted() {
			this.autoResize = Vue._X_TABLE_EASY_UTILS.autoResize();
		},
		destroyed() {
			this.cpt_textarea_un_observe();
		}
	});
}
</script>

<style lang="less">
// 编辑框样式
@{VE_TABLE_PREFIX-cls} {
	&-edit-input-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 0;
		z-index: 100;
		pointer-events: none;

		&.@{VE_TABLE_PREFIX-cls}-edit-input-container-show {
			pointer-events: auto;
		}
	}

	&-edit-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		border: 1px solid #1890ff;
		border-radius: 2px;
		background-color: #fff;
		font-size: 14px;
		line-height: 1.5;
		color: #333;
		resize: none;
		outline: none;
		box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
		pointer-events: auto;
	}
}
</style>
