<script lang="ts">
defineComponent({
	name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_THADER_TR,
	mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
	props: {
		columnsOptionResetTime: {
			type: Number,
			default: 0
		},
		// group columns item
		groupColumn: {
			type: Array,
			required: true
		},
		headerRows: {
			type: Array,
			default: function () {
				return [];
			}
		},
		colgroups: {
			type: Array,
			required: true
		},
		fixedHeader: {
			type: Boolean,
			required: true
		},
		isGroupHeader: {
			type: Boolean,
			required: true
		},
		rowIndex: {
			type: Number,
			required: true
		},
		cellSelectionData: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// cell selection range data
		cellSelectionRangeData: {
			type: Object,
			default: function () {
				return null;
			}
		},
		headerIndicatorColKeys: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// checkbox option
		checkboxOption: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// sort option
		sortOption: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// sort columns
		sortColumns: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// cell style option
		cellStyleOption: {
			type: Object,
			default: function () {
				return null;
			}
		},
		// event custom option
		eventCustomOption: {
			type: Object,
			default: function () {
				return null;
			}
		}
	},
	methods: {
		// tr height change
		trHeightChange({ height }) {
			this.dispatch(
				Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
				Vue._X_TABLE_EASY_EMIT_EVENTS.HEADER_ROW_HEIGHT_CHANGE,
				{
					rowIndex: this.rowIndex,
					height: height
				}
			);
		},
		// click
		rowClick(e, fn) {
			fn && fn(e);
		},
		// dblclick
		rowDblclick(e, fn) {
			fn && fn(e);
		},
		// contextmenu
		rowContextmenu(e, fn) {
			fn && fn(e);
		},
		// mouseenter
		rowMouseenter(e, fn) {
			fn && fn(e);
		},
		// mouseleave
		rowMouseleave(e, fn) {
			fn && fn(e);
		},
		// mousemove
		rowMousemove(e, fn) {
			fn && fn(e);
		},
		// mouseover
		rowMouseover(e, fn) {
			fn && fn(e);
		},
		// mousedown
		rowMousedown(e, fn) {
			fn && fn(e);
		},
		// mouseup
		rowMouseup(e, fn) {
			fn && fn(e);
		},
		render(h) {
			const {
				groupColumn,
				colgroups,
				headerRows,
				fixedHeader,
				rowIndex,
				trHeightChange,
				checkboxOption,
				sortOption,
				sortColumns,
				cellStyleOption,
				eventCustomOption,
				cellSelectionData,
				columnsOptionResetTime,
				isGroupHeader,
				cellSelectionRangeData,
				headerIndicatorColKeys
			} = this;

			// custom on cell event
			let customEvents = {};
			if (eventCustomOption) {
				const { headerRowEvents } = eventCustomOption;
				customEvents = headerRowEvents ? headerRowEvents({ rowIndex }) : {};
			}

			const {
				click,
				dblclick,
				contextmenu,
				mouseenter,
				mouseleave,
				mousemove,
				mouseover,
				mousedown,
				mouseup
			} = customEvents;

			const events = {
				click: e => {
					this.rowClick(e, click);
				},
				dblclick: e => {
					this.rowDblclick(e, dblclick);
				},
				contextmenu: e => {
					this.rowContextmenu(e, contextmenu);
				},
				mouseenter: e => {
					this.rowMouseenter(e, mouseenter);
				},
				mouseleave: e => {
					this.rowMouseleave(e, mouseleave);
				},
				mousemove: e => {
					this.rowMousemove(e, mousemove);
				},
				mouseover: e => {
					this.rowMouseover(e, mouseover);
				},
				mousedown: e => {
					this.rowMousedown(e, mousedown);
				},
				mouseup: e => {
					this.rowMouseup(e, mouseup);
				}
			};

			return h(
				"div",
				{
					class: `${Vue._X_TABLE_EASY_CLS_NAME}header-tr-wrapper`
				},
				[
					h(
						"tr",
						{
							key: Vue._X_TABLE_EASY_UTIL.getDomResizeObserverCompKey(
								rowIndex,
								columnsOptionResetTime
							),
							class: `${Vue._X_TABLE_EASY_CLS_NAME}header-tr`,
							on: events
						},
						[
							groupColumn.map(groupColumnItem => {
								// th props
								const thProps = {
									key: groupColumnItem.key,
									props: {
										groupColumn,
										groupColumnItem,
										colgroups,
										headerRows,
										fixedHeader,
										isGroupHeader,
										rowIndex,
										checkboxOption,
										sortOption,
										sortColumns,
										cellStyleOption,
										eventCustomOption,
										cellSelectionData,
										cellSelectionRangeData,
										headerIndicatorColKeys
									}
								};

								return h(Vue._X_TABLE_EASY_COMPONENTS.HeaderTh, thProps);
							})
						]
					)
				]
			);
		}
	}
});
</script>
