<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [
		{ clsName },
		{ COMPS_NAME, EMIT_EVENTS, COMPS_CUSTOM_ATTRS },
		FooterTd,
		VueDomResizeObserver
	] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/footer/footer-td.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/helper/comps/resize-observer.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_BODY_TR,
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
			rowKeyFieldName: {
				type: String,
				default: null
			},
			// cell style option
			cellStyleOption: {
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
			// event custom option
			eventCustomOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// cell selection key data
			cellSelectionData: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// footer rows
			footerRows: {
				type: Array,
				default: function () {
					return [];
				}
			},
			// fixed footer
			fixedFooter: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			// current row key
			cpt_currentRowKey() {
				const { rowKeyFieldName } = this;
				return rowKeyFieldName ? this.rowData[rowKeyFieldName] : null;
			},
			// tr class
			cpt_trClass() {
				let result = null;

				result = {
					[clsName("footer-tr")]: true
				};

				return result;
			}
		},

		methods: {
			// tr height change
			trHeightChange({ height }) {
				/*  this.$emit(EMIT_EVENTS.FOOTER_ROW_HEIGHT_CHANGE, {
                rowIndex: this.rowIndex,
                height: height
            }); */

				this.dispatch(COMPS_NAME.VE_TABLE, EMIT_EVENTS.FOOTER_ROW_HEIGHT_CHANGE, {
					rowIndex: this.rowIndex,
					height: height
				});
			},
			// click
			rowClick(e, fn) {
				fn && fn(e);

				/*   this.dispatch(COMPS_NAME.VE_TABLE_BODY, EMIT_EVENTS.BODY_TR_CLICK, {
                rowData,
                rowIndex
            }); */
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
				rowKeyFieldName,
				rowIndex,
				rowData,
				cellStyleOption,
				eventCustomOption
			} = this;

			// get td content
			const getTdContent = () => {
				return colgroups.map(column => {
					const tdProps = {
						key: column.key,
						props: {
							rowIndex,
							rowData,
							column,
							colgroups,
							rowKeyFieldName,
							cellStyleOption,
							cellSelectionData: this.cellSelectionData,
							footerRows: this.footerRows,
							fixedFooter: this.fixedFooter,
							cellSpanOption: this.cellSpanOption,
							eventCustomOption: this.eventCustomOption
						}
					};
					return h(FooterTd, tdProps);
				});
			};

			// custom on row event
			let customEvents = {};
			if (eventCustomOption) {
				const { footerRowEvents } = eventCustomOption;
				customEvents = footerRowEvents ? footerRowEvents({ row: rowData, rowIndex }) : {};
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

			const props = {
				class: this.cpt_trClass,
				props: {
					tagName: "tr"
				},
				attrs: {
					[COMPS_CUSTOM_ATTRS.BODY_ROW_KEY]: this.cpt_currentRowKey
				},
				nativeOn: events,
				on: {
					"on-dom-resize-change": this.trHeightChange
				}
			};

			return h(VueDomResizeObserver, props, getTdContent());
		}
	};
}
</script>
