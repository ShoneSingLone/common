<template>
	<tbody :class="tableBodyClass" ref="tableBodyRef">
		<!-- 虚拟滚动占位符 -->
		<tr
			v-if="isVirtualScroll && showVirtualScrollingPlaceholder"
			:class="['virtual-placeholder']"
			:style="{ height: virtualScrollPlaceholderHeight + 'px' }">
			<td :colspan="colgroups[0].length + (expandOption?.enable ? 1 : 0)"></td>
		</tr>

		<!-- 数据行 -->
		<template v-for="(row, rowIndex) in actualRenderTableData" :key="rowIndex">
			<tr
				:row-key="row[rowKeyFieldName]"
				:class="getRowClass(row, rowIndex)"
				@click="handleRowClick(row, rowIndex)"
				@dblclick="handleRowDblClick(row, rowIndex)"
				@contextmenu="handleRowContextmenu(row, rowIndex, $event)">
				<!-- 展开图标列 -->
				<td
					v-if="expandOption?.enable"
					class="expand-column"
					@click.stop="toggleRowExpand(row, rowIndex)">
					<i :class="['expand-icon', { expanded: isRowExpanded(row) }]"></i>
				</td>
				<!-- 数据列 -->
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
					@contextmenu="handleCellContextmenu(row, rowIndex, column, colIndex, $event)">
					{{ row[column.field] }}
				</td>
			</tr>
			<!-- 展开内容行 -->
			<tr v-if="expandOption?.enable && isRowExpanded(row)" class="expand-content-row">
				<td :colspan="colgroups[0].length + 1" class="expand-content-cell">
					<slot name="expand" :row="row" :rowIndex="rowIndex"></slot>
				</td>
			</tr>
		</template>
	</tbody>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyBody",
		props: {
			actualRenderTableData: {
				type: Array,
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
			expandOption: {
				type: Object,
				default: null
			},
			isVirtualScroll: {
				type: Boolean,
				default: false
			},
			showVirtualScrollingPlaceholder: {
				type: Boolean,
				default: false
			},
			virtualScrollPlaceholderHeight: {
				type: Number,
				default: 0
			},
			tableBodyClass: {
				type: Object,
				default: () => ({})
			},
			expandedRowKeys: {
				type: Set,
				default: () => new Set()
			}
		},
		methods: {
			getRowClass(row, rowIndex) {
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

			isRowExpanded(row) {
				// 检查行是否展开
				var rowKey = this.rowKeyFieldName ? row[this.rowKeyFieldName] : row;
				return this.expandedRowKeys.has(rowKey);
			},

			toggleRowExpand(row, rowIndex) {
				// 切换行展开状态
				var rowKey = this.rowKeyFieldName ? row[this.rowKeyFieldName] : rowIndex;
				if (this.expandedRowKeys.has(rowKey)) {
					this.expandedRowKeys.delete(rowKey);
					this.$emit("row-collapse", { row, rowIndex });
				} else {
					this.expandedRowKeys.add(rowKey);
					this.$emit("row-expand", { row, rowIndex });
				}
				this.$emit("expand-change", {
					rowKey,
					expanded: this.expandedRowKeys.has(rowKey),
					row,
					rowIndex
				});
			},

			getColumnClass(column, row, rowIndex, colIndex) {
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

			handleRowClick(row, rowIndex, event) {
				// 处理行点击事件
				this.$emit("row-click", { row, rowIndex, event });
			},

			handleRowDblClick(row, rowIndex, event) {
				// 处理行双击事件
				this.$emit("row-dblclick", { row, rowIndex, event });
			},

			handleRowContextmenu(row, rowIndex, event) {
				// 处理行右键菜单事件
				event.preventDefault();
				this.$emit("row-contextmenu", { row, rowIndex, event });
			},

			handleCellClick(row, rowIndex, column, colIndex, event) {
				// 处理单元格点击事件
				this.$emit("cell-click", { row, rowIndex, column, colIndex, event });
			},

			handleCellDblClick(row, rowIndex, column, colIndex, event) {
				// 处理单元格双击事件
				this.$emit("cell-dblclick", { row, rowIndex, column, colIndex, event });
			},

			handleCellContextmenu(row, rowIndex, column, colIndex, event) {
				// 处理单元格右键菜单事件
				event.preventDefault();
				this.$emit("cell-contextmenu", { row, rowIndex, column, colIndex, event });
			},

			isCellInSelectionRange(rowKey, colKey) {
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
			}
		}
	};
}
</script>

<style scoped>
/* 行样式 */
.row-hover tr:hover {
	background-color: #f5f7fa;
}

.row-highlighted {
	background-color: #e6f7ff;
}

.stripe tr:nth-child(even),
.row-stripe {
	background-color: #fafafa;
}

/* 虚拟滚动样式 */
.virtual-scroll {
	overflow: auto;
}

/* 虚拟滚动占位符样式 */
.virtual-placeholder {
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
</style>
