<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY_TR,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			rowData: {
				type: Object,
				required: true
			},
			rowIndex: {
				type: Number,
				required: true
			},
			colgroups: {
				type: Array,
				required: true
			},
			columnCollection: {
				type: Array,
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			allRowKeys: {
				type: Array,
				required: true
			},
			/*
        expand
        */
			// expand row option
			expandOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// is expand row
			isExpandRow: {
				type: Boolean,
				required: true
			},
			// expanded row keys
			expandedRowkeys: {
				type: Array,
				default: function () {
					return [];
				}
			},
			// expand row change
			expandRowChange: {
				type: Function,
				default: null
			},

			/*
        checkbox
        */
			// checkbox option
			checkboxOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			internalCheckboxSelectedRowKeys: {
				type: Array,
				default: function () {
					return null;
				}
			},

			/*
        radio
        */
			radioOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			internalRadioSelectedRowKey: {
				type: [String, Number],
				default: null
			},
			// is virtual scroll
			isVirtualScroll: {
				type: Boolean,
				default: false
			},
			// cell style option
			cellStyleOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// highlight row key
			highlightRowKey: {
				type: [String, Number],
				default: null
			},
			// event custom option
			eventCustomOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell selection data
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
			bodyIndicatorRowKeys: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell span option
			cellSpanOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// edit opttion
			editOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		computed: {
			// current row key
			cpt_current_row_key() {
				const { rowKeyFieldName } = this;
				return rowKeyFieldName ? this.rowData[rowKeyFieldName] : null;
			},
			// tr class
			cpt_tr_class() {
				let result = null;

				const { highlightRowKey, cpt_current_row_key } = this;

				let isHighlight = false;

				if (!Vue._X_TABLE_EASY_UTILS.isEmptyValue(highlightRowKey)) {
					if (highlightRowKey === cpt_current_row_key) {
						isHighlight = true;
					}
				}

				result = {
					[Vue._X_TABLE_EASY_UTILS.clsName("body-tr")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("tr-highlight")]: isHighlight
				};

				return result;
			}
		},

		methods: {
			// click
			rowClick(e, fn) {
				fn && fn(e);

				const { rowData, rowIndex } = this;

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY,
					Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_ROW_CLICK,
					{
						rowData,
						rowIndex
					}
				);
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
			}
		},

		render(h) {
			const {
				colgroups,
				expandOption,
				expandRowChange,
				isExpandRow,
				expandedRowkeys,
				checkboxOption,
				rowKeyFieldName,
				rowIndex,
				rowData,
				internalCheckboxSelectedRowKeys,
				internalRadioSelectedRowKey,
				radioOption,
				cellStyleOption,
				eventCustomOption
			} = this;

			// get td content
			const getTdContent = () => {
				return colgroups.map(column => {
					const tdProps = {
						props: {
							rowIndex,
							rowData,
							column,
							columnCollection: this.columnCollection,
							colgroups,
							expandOption,
							expandedRowkeys,
							checkboxOption,
							rowKeyFieldName,
							allRowKeys: this.allRowKeys,
							isExpandRow,
							internalCheckboxSelectedRowKeys,
							internalRadioSelectedRowKey,
							radioOption,
							cellStyleOption,
							cellSpanOption: this.cellSpanOption,
							eventCustomOption,
							cellSelectionData: this.cellSelectionData,
							cellSelectionRangeData: this.cellSelectionRangeData,
							bodyIndicatorRowKeys: this.bodyIndicatorRowKeys,
							editOption: this.editOption
						},
						on: {
							[Vue._X_TABLE_EASY_EMIT_EVENTS.EXPAND_ROW_CHANGE]: () =>
								expandRowChange(rowData, rowIndex)
						}
					};
					return h(Vue._X_TABLE_EASY_COMPONENTS.BodyTd, tdProps);
				});
			};

			let result = null;

			// custom on row event
			let customEvents = {};
			if (eventCustomOption) {
				const { bodyRowEvents } = eventCustomOption;
				customEvents = bodyRowEvents ? bodyRowEvents({ row: rowData, rowIndex }) : {};
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

			if (this.isVirtualScroll) {
				const props = {
					class: this.cpt_tr_class,
					props: {
						tagName: "tr",
						id: this.cpt_current_row_key
					},
					attrs: {
						[Vue._X_TABLE_EASY_CONSTANTS.COMPS_CUSTOM_ATTRS.BODY_ROW_KEY]:
							this.cpt_current_row_key
					},
					on: {
						"on-dom-resize-change": ({ key, height }) => {
							this.dispatch(
								Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
								Vue._X_TABLE_EASY_EMIT_EVENTS.BODY_ROW_HEIGHT_CHANGE,
								{
									rowKey: key,
									height
								}
							);
						}
					},
					nativeOn: events
				};

				result = h(
					Vue._X_TABLE_EASY_COMPONENTS.VueDomResizeObserver,
					props,
					getTdContent()
				);
			} else {
				const props = {
					class: this.cpt_tr_class,
					attrs: {
						[Vue._X_TABLE_EASY_CONSTANTS.COMPS_CUSTOM_ATTRS.BODY_ROW_KEY]:
							this.cpt_current_row_key
					},
					on: events
				};

				result = h("tr", props, getTdContent());
			}

			return result;
		}
	});
}
</script>
