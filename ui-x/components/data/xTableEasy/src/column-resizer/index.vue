<template>
	<div class="column-resizer">
		<!-- 列宽调整手柄 -->
		<div
			:class="['column-resizer-handler', { active: isColumnResizerHover || isColumnResizing }]"
			:style="{
				left: (columnResizerRect.left - columnResizerHandlerWidth) + 'px',
				top: columnResizerRect.top + 'px',
				height: columnResizerRect.height + 'px'
			}"
			@click="handleColumnResizerHandlerClick"
			@mousedown="handleColumnResizerHandlerMousedown($event)"
			@mouseenter="handleColumnResizerHandlerMouseenter"
			@mouseleave="handleColumnResizerHandlerMouseleave"
			@mouseup="handleColumnResizerHandlerMouseup($event)">
		</div>
		<!-- 列宽调整线条 -->
		<div
			class="column-resizer-line"
			:style="{
				display: isColumnResizing ? 'block' : 'none',
				left: columnResizerRect.left + 'px'
			}">
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyColumnResizer",
		props: {
			parentRendered: {
				type: Boolean,
				required: true
			},
			tableContainerEl: {
				type: Object,
				default: null
			},
			colgroups: {
				type: Array,
				required: true
			},
			isColumnResizerHover: {
				type: Boolean,
				required: true
			},
			isColumnResizing: {
				type: Boolean,
				required: true
			},
			setIsColumnResizerHover: {
				type: Function,
				required: true
			},
			setIsColumnResizing: {
				type: Function,
				required: true
			},
			setColumnWidth: {
				type: Function,
				required: true
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
				// 列宽调整开始X坐标
				columnResizerStartX: 0,
				// 当前正在调整的列
				currentResizingColumn: null,
				// 列宽调整手柄宽度
				columnResizerHandlerWidth: 5,
				// 列宽调整区域
				columnResizerRect: {
					top: 0,
					left: 0,
					height: 0
				}
			};
		},
		computed: {
			// 列最小宽度
			columnMinWidth() {
				let result = 30;
				const { columnWidthResizeOption } = this;
				if (columnWidthResizeOption) {
					const { minWidth } = columnWidthResizeOption;
					if (typeof minWidth === 'number' && minWidth > 0) {
						result = minWidth;
					}
				}
				return result;
			}
		},
		methods: {
			// 初始化列宽调整位置
			initColumnResizerPosition({ event, column }) {
				const { tableContainerEl, isColumnResizing } = this;
				if (tableContainerEl && !isColumnResizing) {
					const { left: tableContainerLeft, top: tableContainerTop } = tableContainerEl.getBoundingClientRect();
					const col = this.colgroups.find(x => x.key === column.key);
					// 表头分组，不支持分组表头列宽拖动
					if (!col) {
						return false;
					}
					if (col._realTimeWidth) {
						const target = event.target;
						const cellRect = target.getBoundingClientRect();
						const { height, left, top } = cellRect;
						this.columnResizerRect.left = left + col._realTimeWidth - tableContainerLeft;
						this.columnResizerRect.top = top - tableContainerTop;
						this.columnResizerRect.height = height;
						this.currentResizingColumn = col;
						this.columnResizerStartX = left + col._realTimeWidth;
					} else {
						console.warn('Resizer column needs set column width');
					}
				}
			},
			
			// 通过拖动设置列宽调整位置
			setColumnResizerPositionByDrag(event) {
				const { tableContainerEl, isColumnResizing, currentResizingColumn } = this;
				if (tableContainerEl && isColumnResizing) {
					const { left: tableContainerLeft } = tableContainerEl.getBoundingClientRect();
					if (isColumnResizing && currentResizingColumn) {
						const { columnResizerStartX, columnMinWidth } = this;
						// 不允许拖动小于列最小宽度
						if (currentResizingColumn._realTimeWidth + (event.clientX - columnResizerStartX) > columnMinWidth) {
							this.columnResizerRect.left = event.clientX - tableContainerLeft;
						}
					}
				}
			},
			
			// 处理列宽调整手柄点击
			handleColumnResizerHandlerClick() {
				// 空方法，防止点击事件冒泡
			},
			
			// 处理列宽调整手柄鼠标按下
			handleColumnResizerHandlerMousedown(event) {
				if (this.isColumnResizerHover) {
					this.setIsColumnResizing(true);
					// 添加文档鼠标移动监听器
					document.addEventListener('mousemove', this.setColumnResizerPositionByDrag);
					// 添加文档鼠标释放监听器
					document.addEventListener('mouseup', this.handleColumnResizerMouseup);
					// 阻止调整大小时的文本选择
					document.onselectstart = function () {
						return false;
					};
					document.ondragstart = function () {
						return false;
					};
				}
			},
			
			// 处理列宽调整手柄鼠标进入
			handleColumnResizerHandlerMouseenter() {
				this.setIsColumnResizerHover(true);
			},
			
			// 处理列宽调整手柄鼠标离开
			handleColumnResizerHandlerMouseleave() {
				this.setIsColumnResizerHover(false);
			},
			
			// 处理列宽调整手柄鼠标释放
			handleColumnResizerHandlerMouseup(event) {
				this.handleColumnResizerMouseup(event);
			},
			
			// 处理列宽调整鼠标释放
			handleColumnResizerMouseup(event) {
				const {
					isColumnResizing,
					currentResizingColumn,
					columnResizerStartX,
					setColumnWidth,
					columnWidthResizeOption,
					columnMinWidth
				} = this;
				if (!isColumnResizing || !currentResizingColumn) {
					return false;
				}
				let differWidth;
				// 拖动小于列最小宽度
				if (currentResizingColumn._realTimeWidth + (event.clientX - columnResizerStartX) < columnMinWidth) {
					differWidth = columnMinWidth - currentResizingColumn._realTimeWidth;
				} else {
					differWidth = event.clientX - columnResizerStartX;
				}
				differWidth = Math.floor(differWidth);
				// 偏差阈值，低于则不处理
				if (Math.abs(differWidth) > 1) {
					let nextColumnWidth = currentResizingColumn._realTimeWidth;
					nextColumnWidth += differWidth;
					// 设置列宽
					setColumnWidth({
						colKey: currentResizingColumn.key,
						width: nextColumnWidth
					});
					if (columnWidthResizeOption) {
						const { sizeChange } = columnWidthResizeOption;
						sizeChange && sizeChange({
							column: currentResizingColumn,
							differWidth,
							columnWidth: nextColumnWidth
						});
					}
				}
				this.clearColumnResizerStatus();
				// 移除文档鼠标移动监听器
				document.removeEventListener('mousemove', this.setColumnResizerPositionByDrag);
				// 移除文档鼠标释放监听器
				document.removeEventListener('mouseup', this.handleColumnResizerMouseup);
			},
			
			// 清除列宽调整状态
			clearColumnResizerStatus() {
				this.currentResizingColumn = null;
				this.columnResizerStartX = 0;
				this.setIsColumnResizerHover(false);
				this.setIsColumnResizing(false);
				// 启用文本选择
				document.onselectstart = function () {
					return true;
				};
				document.ondragstart = function () {
					return true;
				};
			}
		}
	};
}
</script>

<style scoped>
/* 列宽调整容器 */
.column-resizer {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	z-index: 100;
}

/* 列宽调整手柄 */
.column-resizer-handler {
	position: absolute;
	width: 5px;
	cursor: col-resize;
	background-color: transparent;
	transition: background-color 0.2s;
	pointer-events: auto;
	z-index: 101;
}

.column-resizer-handler:hover,
.column-resizer-handler.active {
	background-color: rgba(24, 144, 255, 0.2);
}

/* 列宽调整线条 */
.column-resizer-line {
	position: absolute;
	top: 0;
	width: 2px;
	height: 100%;
	background-color: #1890ff;
	pointer-events: none;
	z-index: 102;
}
</style>