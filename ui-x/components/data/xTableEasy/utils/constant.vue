<script lang="ts">
export default async function () {
	// 包装 utils/constant.js，供当前 _.$importVue 体系直接加载使用
	const KEY_CODES = {
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
	};

	const ICON_NAMES = {
		FILTER: "filter",
		DOUBLE_RIGHT_ARROW: "double-right-arrow",
		DOUBLE_LEFT_ARROW: "double-left-arrow",
		TOP_ARROW: "top-arrow",
		RIGHT_ARROW: "right-arrow",
		BOTTOM_ARROW: "bottom-arrow",
		LEFT_ARROW: "left-arrow",
		SORT_TOP_ARROW: "sort-top-arrow",
		SORT_BOTTOM_ARROW: "sort-bottom-arrow",
		SEARCH: "search"
	};

	const MOUSE_EVENT_CLICK_TYPE = {
		LEFT_MOUSE: 1,
		MIDDLE_MOUSE: 2,
		RIGHT_MOUSE: 2
	};

	return {
		KEY_CODES,
		ICON_NAMES,
		MOUSE_EVENT_CLICK_TYPE
	};
}
</script>
