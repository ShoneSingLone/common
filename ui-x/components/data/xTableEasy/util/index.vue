<script>
export default async function () {
	const [Clickoutside] = await Promise.all([
		_.$importVue("/common/ui-x/directive/clickoutside.vue")
	]);

	const X_TABLE_EASY_CONSTANTS = {
		PREFIX_CLS: "ve-table-",
		COLUMN_FIXED_TYPE: {
			LEFT: "left",
			RIGHT: "right"
		},
		AUTOFILLING_DIRECTION: {
			UP: "up",
			RIGHT: "right",
			DOWN: "down",
			LEFT: "left"
		},
		CURRENT_CELL_SELECTION_TYPES: {
			SINGLE: "single",
			RANGE: "range"
		},
		CELL_SELECTION_DIRECTION: {
			UP: "up",
			RIGHT: "right",
			DOWN: "down",
			LEFT: "left"
		},
		CONTEXTMENU_TYPES: {
			HEADER_CONTEXTMENU: "headerContextmenu",
			BODY_CONTEXTMENU: "bodyContextmenu"
		},
		CONTEXTMENU_NODE_TYPES: {
			SEPARATOR: "SEPARATOR",
			CUT: "CUT",
			COPY: "COPY",
			INSERT_ROW_ABOVE: "INSERT_ROW_ABOVE",
			INSERT_ROW_BELOW: "INSERT_ROW_BELOW",
			REMOVE_ROW: "REMOVE_ROW",
			EMPTY_ROW: "EMPTY_ROW",
			EMPTY_COLUMN: "EMPTY_COLUMN",
			EMPTY_CELL: "EMPTY_CELL",
			LEFT_FIXED_COLUMN_TO: "LEFT_FIXED_COLUMN_TO",
			CANCEL_LEFT_FIXED_COLUMN_TO: "CANCEL_LEFT_FIXED_COLUMN_TO",
			RIGHT_FIXED_COLUMN_TO: "RIGHT_FIXED_COLUMN_TO",
			CANCEL_RIGHT_FIXED_COLUMN_TO: "CANCEL_RIGHT_FIXED_COLUMN_TO"
		},
		KEY_CODES: {
			BACK_SPACE: 8,
			TAB: 9,
			ENTER: 13,
			SHIFT: 16,
			SPACE: 32,
			ARROW_LEFT: 37,
			ARROW_UP: 38,
			ARROW_RIGHT: 39,
			ARROW_DOWN: 40,
			DELETE: 46,
			F2: 113
		},
		HOOKS_NAME: {
			TABLE_CONTAINER_SCROLL: "table-container-scroll",
			TABLE_SIZE_CHANGE: "table-size-change",
			TABLE_CELL_WIDTH_CHANGE: "table-cell-width-change",
			CLIPBOARD_CELL_VALUE_CHANGE: "clipboard-cell-value-change",
			HEADER_CELL_MOUSEMOVE: "header-cell-mousemove",
			BODY_CELL_MOUSEMOVE: "body-cell-mousemove"
		},
		EMIT_EVENTS: {
			CHECKBOX_SELECTED_ALL_CHANGE: "on-checkbox-selected-all-change",
			CHECKBOX_SELECTED_ALL_INFO: "on-checkbox-selected-all-info"
		},
		COMPS_NAME: {
			VE_TABLE: "VeTable"
		}
	};

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

	const X_TABLE_EASY_UTILS = {
		clsName: function (cls) {
			return X_TABLE_EASY_CONSTANTS.PREFIX_CLS + cls;
		},
		getValByUnit: function (val) {
			if (typeof val === "number") {
				return val + "px";
			}
			return val;
		},
		isEmptyValue: function (val) {
			return val === null || val === undefined || val === "";
		},
		isEmptyArray: function (val) {
			return !Array.isArray(val) || val.length === 0;
		},
		isBoolean: function (val) {
			return typeof val === "boolean";
		},
		isNumber: function (val) {
			return typeof val === "number";
		},
		isFunction: function (val) {
			return typeof val === "function";
		},
		isInputKeyCode: function (event) {
			const keyCode = event.keyCode;
			return (
				(keyCode >= 48 && keyCode <= 57) ||
				(keyCode >= 65 && keyCode <= 90) ||
				(keyCode >= 96 && keyCode <= 111) ||
				(keyCode >= 186 && keyCode <= 222)
			);
		},
		getScrollbarWidth: function () {
			const scrollDiv = document.createElement("div");
			scrollDiv.style.cssText =
				"width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
			document.body.appendChild(scrollDiv);
			const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
			return scrollbarWidth;
		},
		cloneDeep: function (obj) {
			return _.cloneDeep(obj);
		},
		Hooks: class {
			constructor() {
				this.hooks = {};
			}
			addHook(name, callback) {
				if (!this.hooks[name]) {
					this.hooks[name] = [];
				}
				this.hooks[name].push(callback);
			}
			triggerHook(name, data) {
				if (this.hooks[name]) {
					this.hooks[name].forEach(callback => callback(data));
				}
			}
		},
		recursiveRemoveColumnByKey: function (columns, key) {
			return columns.filter(item => {
				if ("children" in item) {
					item.children = X_TABLE_EASY_UTILS.recursiveRemoveColumnByKey(
						item.children,
						key
					);
				}
				return item.key !== key && item.colKey !== key;
			});
		},
		initGroupColumns,
		isCellInSelectionRange: function ({
			cellData,
			cellSelectionRangeData,
			colgroups,
			allRowKeys
		}) {
			const { leftColKey, rightColKey, topRowKey, bottomRowKey } = cellSelectionRangeData;

			const index1 = colgroups.findIndex(x => x.key === leftColKey);
			const index2 = colgroups.findIndex(x => x.key === rightColKey);
			const beginColIndex = index1 < index2 ? index1 : index2;
			const endColIndex = index1 < index2 ? index2 : index1;
			const colKeys = colgroups.slice(beginColIndex, endColIndex + 1).map(x => x.key);

			const beginRowIndex = allRowKeys.indexOf(topRowKey);
			const endRowIndex = allRowKeys.indexOf(bottomRowKey);
			const rowKeys = allRowKeys.slice(beginRowIndex, endRowIndex + 1);

			if (colKeys.indexOf(cellData.colKey) > -1 && rowKeys.indexOf(cellData.rowKey) > -1) {
				return true;
			}
			return false;
		},
		cellAutofill: function ({ tableData, cellSelectionRangeData, direction }) {
			const { leftColKey, rightColKey, topRowKey, bottomRowKey } = cellSelectionRangeData;

			const leftColIndex = colgroups.findIndex(x => x.key === leftColKey);
			const rightColIndex = colgroups.findIndex(x => x.key === rightColKey);
			const topRowIndex = allRowKeys.indexOf(topRowKey);
			const bottomRowIndex = allRowKeys.indexOf(bottomRowKey);

			const startColIndex = Math.min(leftColIndex, rightColIndex);
			const endColIndex = Math.max(leftColIndex, rightColIndex);
			const startRowIndex = Math.min(topRowIndex, bottomRowIndex);
			const endRowIndex = Math.max(topRowIndex, bottomRowIndex);

			let result = null;

			if (direction === X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.RIGHT) {
				for (let i = startRowIndex; i <= endRowIndex; i++) {
					const row = tableData[i];
					for (let j = startColIndex; j <= endColIndex; j++) {
						const column = colgroups[j];
						if (column.field) {
							const value = row[column.field];
							for (let k = endColIndex + 1; k < colgroups.length; k++) {
								const nextColumn = colgroups[k];
								if (nextColumn.field) {
									row[nextColumn.field] = value;
								}
							}
						}
					}
				}
			} else if (direction === X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.DOWN) {
				for (let i = startColIndex; i <= endColIndex; i++) {
					const column = colgroups[i];
					if (column.field) {
						for (let j = startRowIndex; j <= endRowIndex; j++) {
							const row = tableData[j];
							const value = row[column.field];
							for (let k = endRowIndex + 1; k < tableData.length; k++) {
								const nextRow = tableData[k];
								nextRow[column.field] = value;
							}
						}
					}
				}
			} else if (direction === X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.UP) {
				for (let i = startColIndex; i <= endColIndex; i++) {
					const column = colgroups[i];
					if (column.field) {
						for (let j = startRowIndex; j <= endRowIndex; j++) {
							const row = tableData[j];
							const value = row[column.field];
							for (let k = startRowIndex - 1; k >= 0; k--) {
								const prevRow = tableData[k];
								prevRow[column.field] = value;
							}
						}
					}
				}
			} else if (direction === X_TABLE_EASY_CONSTANTS.AUTOFILLING_DIRECTION.LEFT) {
				for (let i = startRowIndex; i <= endRowIndex; i++) {
					const row = tableData[i];
					for (let j = startColIndex; j <= endColIndex; j++) {
						const column = colgroups[j];
						if (column.field) {
							const value = row[column.field];
							for (let k = startColIndex - 1; k >= 0; k--) {
								const prevColumn = colgroups[k];
								if (prevColumn.field) {
									row[prevColumn.field] = value;
								}
							}
						}
					}
				}
			}

			return result;
		},
		getNotFixedTotalWidthByColumnKey: function ({ colgroups, colKey, fixed }) {
			const currentIndex = colgroups.findIndex(x => x.key === colKey);

			let result = 0;

			if (fixed === X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.LEFT) {
				result = colgroups.reduce((total, currentVal, index) => {
					return index < currentIndex && !currentVal.fixed
						? currentVal._realTimeWidth + total
						: total;
				}, 0);
			} else if (fixed === X_TABLE_EASY_CONSTANTS.COLUMN_FIXED_TYPE.RIGHT) {
				result = colgroups.reduce((total, currentVal, index) => {
					return index > currentIndex && !currentVal.fixed
						? currentVal._realTimeWidth + total
						: total;
				}, 0);
			}

			return result;
		}
	};

	const X_TABLE_EASY_COMPONENTS = {
		Colgroup: null,
		Header: null,
		Body: null,
		Footer: null,
		EditInput: null,
		Selection: null,
		Contextmenu: null
	};

	const X_TABLE_EASY_DIRECTIVES = {
		clickoutside: Clickoutside
	};

	const X_TABLE_EASY_MIXINS = {
		emitter: null
	};

	const X_TABLE_EASY_COMPS_NAME = {
		VE_TABLE: "VeTable"
	};

	return {
		initGroupColumns,
		getChildColumnCount,
		recursiveRemoveColumnByKey,
		clsName,
		X_TABLE_EASY_CONSTANTS,
		X_TABLE_EASY_UTILS,
		X_TABLE_EASY_COMPONENTS,
		X_TABLE_EASY_DIRECTIVES,
		X_TABLE_EASY_MIXINS,
		X_TABLE_EASY_COMPS_NAME
	};
}
</script>
