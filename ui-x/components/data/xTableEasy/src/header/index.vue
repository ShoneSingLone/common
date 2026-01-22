<template>
	<thead v-if="showHeader">
		<tr
			v-for="(rowColumns, rowIndex) in groupColumns"
			:key="rowIndex"
			:style="{ height: (headerRows[rowIndex]?.rowHeight || 40) + 'px' }">
			<th
				v-for="(column, colIndex) in rowColumns"
				:key="colIndex"
				:width="column.width"
				:class="column.class"
				:col-key="column.colKey"
				:col-index="colIndex"
				:row-index="rowIndex"
				:row-key="''"
				:colspan="column.colspan || 1"
				:rowspan="column.rowspan || 1"
				@mousemove="handleHeaderCellMouseMove($event, column, colIndex, rowIndex)"
				@mouseleave="handleHeaderCellMouseLeave"
				@mousedown="handleHeaderCellMouseDown($event, column, colIndex, rowIndex)">
				{{ column.title }}
				<!-- 列宽调整手柄 -->
				<div
					v-if="enableColumnResize"
					:class="['column-resizer', { active: isColumnResizerActive }]"
					:style="{ left: columnResizerPosition + 'px' }"
					@mousedown.stop="
						handleColumnResizerMouseDown($event, column, colIndex, rowIndex)
					">
				</div>
			</th>
		</tr>
	</thead>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyHeader",
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
			}
		},
		data() {
			return {
				isColumnResizerActive: false,
				columnResizerPosition: 0,
				isColumnResizing: false,
				currentResizingColumn: null,
				currentResizingColIndex: -1,
				currentResizingRowIndex: -1,
				startX: 0,
				startWidth: 0
			};
		},
		methods: {
			// 处理表头单元格鼠标移动
			handleHeaderCellMouseMove(event, column, colIndex, rowIndex) {
				if (!this.enableColumnResize) return;

				const th = event.currentTarget;
				const rect = th.getBoundingClientRect();
				const mouseX = event.clientX - rect.left;

				// 检测鼠标是否在列边缘
				if (rect.width - mouseX < 8) {
					this.isColumnResizerActive = true;
					this.columnResizerPosition = rect.width;
					th.style.cursor = "col-resize";
				} else {
					this.isColumnResizerActive = false;
					th.style.cursor = "default";
				}
			},

			// 处理表头单元格鼠标离开
			handleHeaderCellMouseLeave(event) {
				if (!this.enableColumnResize) return;

				const th = event.currentTarget;
				this.isColumnResizerActive = false;
				th.style.cursor = "default";
			},

			// 处理表头单元格鼠标按下
			handleHeaderCellMouseDown(event, column, colIndex, rowIndex) {
				if (!this.enableColumnResize) return;

				const th = event.currentTarget;
				const rect = th.getBoundingClientRect();
				const mouseX = event.clientX - rect.left;

				// 检测是否在列边缘按下
				if (rect.width - mouseX < 8) {
					event.preventDefault();
					this.startColumnResize(event, column, colIndex, rowIndex);
				}
			},

			// 处理列宽调整手柄鼠标按下
			handleColumnResizerMouseDown(event, column, colIndex, rowIndex) {
				if (!this.enableColumnResize) return;

				event.preventDefault();
				this.startColumnResize(event, column, colIndex, rowIndex);
			},

			// 开始列宽调整
			startColumnResize(event, column, colIndex, rowIndex) {
				this.isColumnResizing = true;
				this.currentResizingColumn = column;
				this.currentResizingColIndex = colIndex;
				this.currentResizingRowIndex = rowIndex;
				this.startX = event.clientX;
				this.startWidth = parseInt(column.width) || 100;

				// 添加全局鼠标事件监听器
				document.addEventListener("mousemove", this.handleColumnResizingMouseMove);
				document.addEventListener("mouseup", this.handleColumnResizingMouseUp);

				// 阻止文本选择
				document.body.style.userSelect = "none";
			},

			// 处理列宽调整过程中的鼠标移动
			handleColumnResizingMouseMove(event) {
				if (!this.isColumnResizing) return;

				const deltaX = event.clientX - this.startX;
				const newWidth = Math.max(50, this.startWidth + deltaX);

				// 触发列宽变化事件
				this.$emit("column-width-change", {
					column: this.currentResizingColumn,
					colIndex: this.currentResizingColIndex,
					rowIndex: this.currentResizingRowIndex,
					width: newWidth
				});
			},

			// 处理列宽调整结束的鼠标释放
			handleColumnResizingMouseUp() {
				if (!this.isColumnResizing) return;

				this.isColumnResizing = false;
				this.currentResizingColumn = null;
				this.currentResizingColIndex = -1;
				this.currentResizingRowIndex = -1;

				// 移除全局鼠标事件监听器
				document.removeEventListener("mousemove", this.handleColumnResizingMouseMove);
				document.removeEventListener("mouseup", this.handleColumnResizingMouseUp);

				// 恢复文本选择
				document.body.style.userSelect = "";

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
	background-color: transparent;
	transition: background-color 0.2s;
}

.column-resizer:hover,
.column-resizer.active {
	background-color: rgba(24, 144, 255, 0.2);
}

.column-resizer::after {
	content: "";
	position: absolute;
	top: 0;
	right: 0;
	width: 2px;
	height: 100%;
	background-color: transparent;
	transition: background-color 0.2s;
}

.column-resizer:hover::after,
.column-resizer.active::after {
	background-color: #1890ff;
}
</style>
