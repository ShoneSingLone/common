<template>
	<thead v-if="showHeader">
		<tr
			v-for="(rowColumns, rowIndex) in groupColumns"
			:key="rowIndex"
			:style="{ height: (headerRows[rowIndex]?.rowHeight || 40) + 'px' }">
			<th
				v-for="(column, colIndex) in rowColumns"
				:key="colIndex"
				:width="column._columnResizeWidth || column.width"
				:class="column.class"
				:col-key="column.colKey"
				:col-index="colIndex"
				:row-index="rowIndex"
				:row-key="''"
				:colspan="column.colspan || 1"
				:rowspan="column.rowspan || 1"
				@mousemove="handleHeaderCellMouseMove($event, column, colIndex, rowIndex)"
				@mouseleave="handleHeaderCellMouseLeave"
				@mousedown="handleHeaderCellMouseDown($event, column, colIndex, rowIndex)"
				@click="console.log('Header cell clicked:', column)"
				style="position: relative;">
				{{ column.title }}
			</th>
		</tr>
	</thead>
	<!-- 列宽调整组件 -->
	<xTableEasyColumnResizer
		v-if="enableColumnResize"
		:parent-rendered="parentRendered"
		:table-container-el="tableContainerEl"
		:hooks="hooks"
		:colgroups="colgroups"
		:is-column-resizer-hover="isColumnResizerHover"
		:is-column-resizing="isColumnResizing"
		:set-is-column-resizer-hover="setIsColumnResizerHover"
		:set-is-column-resizing="setIsColumnResizing"
		:set-column-width="setColumnWidth"
		:column-width-resize-option="columnWidthResizeOption"
	/>
</template>

<script lang="ts">
export default async function () {
	// 导入列宽调整组件
	const [xTableEasyColumnResizer] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/src/column-resizer/index.vue")
	]);

	return {
		name: "xTableEasyHeader",
		components: {
			xTableEasyColumnResizer
		},
		props: {
			showHeader: {
				type: Boolean,
				default: true
			},
			groupColumns: {
				type: Array,
				required: true
			},
			headerRows: {
				type: Array,
				default: () => []
			},
			enableColumnResize: {
				type: Boolean,
				default: false
			},
			minWidth: {
				type: Number,
				default: 30
			},
			// 列宽调整相关props
			parentRendered: {
				type: Boolean,
				default: false
			},
			tableContainerEl: {
				type: Object,
				default: null
			},
			hooks: {
				type: Object,
				default: () => ({})
			},
			colgroups: {
				type: Array,
				required: true
			},
			isColumnResizerHover: {
				type: Boolean,
				default: false
			},
			isColumnResizing: {
				type: Boolean,
				default: false
			},
			setIsColumnResizerHover: {
				type: Function,
				default: () => {}
			},
			setIsColumnResizing: {
				type: Function,
				default: () => {}
			},
			setColumnWidth: {
				type: Function,
				default: () => {}
			},
			columnWidthResizeOption: {
				type: Object,
				default: null
			}
		},
		mounted() {
			// 组件挂载逻辑
			console.log('Header component mounted, enableColumnResize:', this.enableColumnResize);
			// 添加一个alert语句，确认组件被挂载
			// alert('Header component mounted, enableColumnResize: ' + this.enableColumnResize);
		},
		data() {
			return {
				isColumnResizing: false,
				currentResizingColumn: null,
				currentResizingColIndex: -1,
				currentResizingRowIndex: -1,
				startX: 0,
				startWidth: 0,
				// 保存事件监听器引用
				mousemoveListener: null,
				mouseupListener: null
			};
		},
		methods: {
			// 处理表头单元格鼠标移动
			handleHeaderCellMouseMove(event, column, colIndex, rowIndex) {
				console.log('handleHeaderCellMouseMove called:', { enableColumnResize: this.enableColumnResize, column: column });
				if (!this.enableColumnResize || column.disableResizing) return;

				const th = event.currentTarget;
				const rect = th.getBoundingClientRect();
				const mouseX = event.clientX - rect.left;

				// 检测鼠标是否在列边缘
				console.log('Mouse position:', { mouseX: mouseX, rectWidth: rect.width, edgeDistance: rect.width - mouseX });
				if (rect.width - mouseX < 8) {
					th.style.cursor = "col-resize";
					console.log('Setting cursor to col-resize');
				} else {
					th.style.cursor = "default";
					console.log('Setting cursor to default');
				}
			},

			// 处理表头单元格鼠标离开
			handleHeaderCellMouseLeave(event) {
				if (!this.enableColumnResize) return;

				const th = event.currentTarget;
				th.style.cursor = "default";
			},

			// 处理表头单元格鼠标按下
			handleHeaderCellMouseDown(event, column, colIndex, rowIndex) {
				console.log('handleHeaderCellMouseDown called:', { enableColumnResize: this.enableColumnResize, column: column });
				if (!this.enableColumnResize || column.disableResizing) return;

				const th = event.currentTarget;
				const rect = th.getBoundingClientRect();
				const mouseX = event.clientX - rect.left;

				// 检测是否在列边缘按下
				if (rect.width - mouseX < 8) {
					event.preventDefault();
					console.log('Before startColumnResize:', { event: event, column: column, colIndex: colIndex, rowIndex: rowIndex });
					this.startColumnResize(event, column, colIndex, rowIndex);
					console.log('After startColumnResize:', { isColumnResizing: this.isColumnResizing, currentResizingColumn: this.currentResizingColumn });
				}
			},

			// 处理列宽调整手柄鼠标按下
			handleColumnResizerMouseDown(event, column, colIndex, rowIndex) {
				console.log('handleColumnResizerMouseDown called:', { enableColumnResize: this.enableColumnResize, column: column });
				if (!this.enableColumnResize) return;

				event.preventDefault();
				console.log('Before startColumnResize:', { event: event, column: column, colIndex: colIndex, rowIndex: rowIndex });
				this.startColumnResize(event, column, colIndex, rowIndex);
				console.log('After startColumnResize:', { isColumnResizing: this.isColumnResizing, currentResizingColumn: this.currentResizingColumn });
			},

			// 开始列宽调整
			startColumnResize(event, column, colIndex, rowIndex) {
				console.log('startColumnResize called:', { event: event, column: column, colIndex: colIndex, rowIndex: rowIndex });
				this.isColumnResizing = true;
				this.currentResizingColumn = column;
				this.currentResizingColIndex = colIndex;
				this.currentResizingRowIndex = rowIndex;
				this.startX = event.clientX;
				this.startWidth = parseInt(column.width) || parseInt(column._columnResizeWidth) || 100;
				console.log('startColumnResize initialized:', { startX: this.startX, startWidth: this.startWidth });

				// 保存事件监听器引用
				this.mousemoveListener = (e) => {
					console.log('mousemoveListener called:', e.clientX);
					this.handleColumnResizingMouseMove(e);
				};
				this.mouseupListener = (e) => {
					console.log('mouseupListener called:', e.clientX);
					this.handleColumnResizingMouseUp(e);
				};

				// 添加全局鼠标事件监听器
				document.addEventListener("mousemove", this.mousemoveListener);
				document.addEventListener("mouseup", this.mouseupListener);
				console.log('Global event listeners added');

				// 阻止文本选择
				document.body.style.userSelect = "none";
				document.onselectstart = function () {
					return false;
				};
				document.ondragstart = function () {
					return false;
				};
			},


			// 处理列宽调整过程中的鼠标移动
			handleColumnResizingMouseMove(event) {
				if (!this.isColumnResizing) return;

				const deltaX = event.clientX - this.startX;
				const newWidth = Math.max(this.minWidth, this.startWidth + deltaX);
				console.log('handleColumnResizingMouseMove called:', { deltaX: deltaX, newWidth: newWidth });

				// 直接修改列宽
				if (this.currentResizingColumn) {
					this.currentResizingColumn._columnResizeWidth = newWidth;
					console.log('Column width updated:', this.currentResizingColumn);
				}

				// 触发列宽变化事件
				this.$emit("column-width-change", {
					column: this.currentResizingColumn,
					colIndex: this.currentResizingColIndex,
					rowIndex: this.currentResizingRowIndex,
					width: newWidth
				});
			},


			// 处理列宽调整结束的鼠标释放
			handleColumnResizingMouseUp(event) {
				if (!this.isColumnResizing) return;

				const deltaX = event.clientX - this.startX;
				const newWidth = Math.max(this.minWidth, this.startWidth + deltaX);
				console.log('handleColumnResizingMouseUp called:', { deltaX: deltaX, newWidth: newWidth });

				// 触发列宽变化事件
				this.$emit("column-width-change", {
					column: this.currentResizingColumn,
					colIndex: this.currentResizingColIndex,
					rowIndex: this.currentResizingRowIndex,
					width: newWidth
				});

				this.isColumnResizing = false;
				this.currentResizingColumn = null;
				this.currentResizingColIndex = -1;
				this.currentResizingRowIndex = -1;

				// 移除全局鼠标事件监听器
				if (this.mousemoveListener) {
					document.removeEventListener("mousemove", this.mousemoveListener);
					this.mousemoveListener = null;
				}
				if (this.mouseupListener) {
					document.removeEventListener("mouseup", this.mouseupListener);
					this.mouseupListener = null;
				}
				console.log('Global event listeners removed');

				// 恢复文本选择
				document.body.style.userSelect = "";
				document.onselectstart = function () {
					return true;
				};
				document.ondragstart = function () {
					return true;
				};

				// 触发列宽调整结束事件
				this.$emit("column-width-resize-end");
			}
		}
	};
}
</script>

<style scoped>
/* 表头样式 */
th {
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

th:hover {
	background-color: #f0f2f5;
}

/* 列宽调整手柄样式 */
.column-resizer {
	position: absolute;
	top: 0;
	right: 0;
	width: 8px;
	height: 100%;
	cursor: col-resize;
	z-index: 10;
	background-color: rgba(24, 144, 255, 0.1);
	transition: background-color 0.2s;
}

.column-resizer:hover {
	background-color: rgba(24, 144, 255, 0.3);
}

.column-resizer::after {
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	width: 1px;
	height: 100%;
	background-color: rgba(24, 144, 255, 0.5);
	transition: background-color 0.2s;
}

.column-resizer:hover::after {
	background-color: #1890ff;
}
</style>
