<script>
export default async function () {
	// 初始化分组列
	function initGroupColumns(columns) {
		let result = {
			isGroupHeader: false,
			colgroups: [],
			groupColumns: []
		};

		// 标记所有列的层级和父级状态
		function markColumnLevels(columns, level) {
			let maxLevel = level;
			columns.forEach(column => {
				if (column.children && column.children.length > 0) {
					let childMaxLevel = markColumnLevels(column.children, level + 1);
					maxLevel = Math.max(maxLevel, childMaxLevel);
					column._level = level;
					column._isParent = true;
				} else {
					column._level = level;
					column._isParent = false;
				}
			});
			return maxLevel;
		}

		let maxLevel = markColumnLevels(columns, 0);
		result.isGroupHeader = maxLevel > 0;

		// 创建表头行
		let groupColumns = [];
		for (let i = 0; i <= maxLevel; i++) {
			groupColumns.push([]);
		}

		let colgroups = [];

		// 构建分组列
		function buildGroupColumns(columns, parentPath = []) {
			columns.forEach(column => {
				if (column._isParent) {
					// 处理父列
					let colspan = getChildColumnCount(column);
					let rowspan = maxLevel - column._level + 1;

					groupColumns[column._level].push({
						...column,
						colspan: colspan,
						rowspan: rowspan,
						children: null // 避免递归处理
					});

					// 递归处理子列
					buildGroupColumns(column.children, [...parentPath, column]);
				} else {
					// 处理叶子列
					for (let i = 0; i <= maxLevel; i++) {
						if (i === column._level) {
							groupColumns[i].push({
								...column,
								colspan: 1,
								rowspan: 1
							});
						}
					}

					// 添加到colgroups用于表格渲染
					colgroups.push(column);
				}
			});
		}

		buildGroupColumns(columns, []);

		// 确保colgroups是二维数组，与模板的预期一致
		result.colgroups = [colgroups];
		result.groupColumns = groupColumns;
		return result;
	}

	// 获取子列数量
	function getChildColumnCount(column) {
		let count = 0;
		if (column.children && column.children.length > 0) {
			column.children.forEach(child => {
				count += getChildColumnCount(child);
			});
		} else {
			count = 1;
		}
		return count;
	}

	// 递归根据key移除列
	function recursiveRemoveColumnByKey(columns, key) {
		let result = [];
		for (let i = 0; i < columns.length; i++) {
			let column = columns[i];
			if (column.key === key || column.colKey === key) {
				continue;
			}
			if (column.children && column.children.length > 0) {
				let filteredChildren = recursiveRemoveColumnByKey(column.children, key);
				if (filteredChildren.length > 0) {
					result.push({
						...column,
						children: filteredChildren
					});
				}
			} else {
				result.push(column);
			}
		}
		return result;
	}

	// 获取列名
	function clsName(name) {
		return `ve-table-${name}`;
	}

	return {
		initGroupColumns,
		getChildColumnCount,
		recursiveRemoveColumnByKey,
		clsName
	};
}
</script>
