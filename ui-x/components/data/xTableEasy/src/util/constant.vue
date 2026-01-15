<script lang="ts">
export default async function () {
	return {
		// 常量定义
		COMPS_NAME: {
			VE_TABLE: "ve-table"
		},

		HOOKS_NAME: {
			TABLE_CELL_WIDTH_CHANGE: "table_cell_width_change"
		},

		EMIT_EVENTS: {
			CHECKBOX_SELECTED_ALL_CHANGE: "checkbox_selected_all_change",
			CHECKBOX_SELECTED_ALL_INFO: "checkbox_selected_all_info"
		},

		CONTEXTMENU_TYPES: {
			HEADER_CONTEXTMENU: "headerContextmenu",
			BODY_CONTEXTMENU: "bodyContextmenu"
		},

		CURRENT_CELL_SELECTION_TYPES: {
			RANGE: "range",
			SINGLE: "single"
		},

		AUTOFILLING_DIRECTION: {
			RIGHT: "right",
			DOWN: "down",
			UP: "up",
			LEFT: "left"
		},

		COLUMN_FIXED_TYPE: {
			LEFT: "left",
			RIGHT: "right"
		}
	};
}
</script>
