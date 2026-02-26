<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const [{ clsName }, HeaderTr, { COMPS_NAME, EMIT_EVENTS }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/header/header-tr.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_THADER,
		props: {
			columnsOptionResetTime: {
				type: Number,
				default: 0
			},
			groupColumns: {
				type: Array,
				required: true
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
			headerRows: {
				type: Array,
				default: function () {
					return [];
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
		data() {
			return {
				/*
				sort columns
				不要使用computed代替，属性动态添加会造成响应式问题
				*/
				sortColumns: {}
			};
		},
		computed: {
			// header class
			cpt_header_class() {
				return {
					[clsName("fixed-header")]: this.fixedHeader
				};
			}
		},
		watch: {
			// watch colgroups
			colgroups: {
				handler() {
					this.initSortColumns();
				},
				immediate: true
			}
		},
		methods: {
			// sort change
			sortChange({ currentField, sortResult }) {
				const { sortColumns, sortOption } = this;
				const { multipleSort, sortChange } = sortOption;

				this.sortColumns[currentField] = sortResult;

				if (!multipleSort) {
					for (const field in sortColumns) {
						if (field !== currentField) {
							sortColumns[field] = "";
						}
					}
				}

				this.dispatch(COMPS_NAME.VE_TABLE, EMIT_EVENTS.SORT_CHANGE, sortColumns);

				// invoke
				sortChange(sortColumns);
			},

			// init sort columns
			initSortColumns() {
				const { colgroups } = this;
				let sortColumns = {};
				colgroups.forEach(item => {
					if (typeof item.sortBy === "string") {
						sortColumns[item.field] = item.sortBy;
					}
				});
				this.sortColumns = sortColumns;
			}
		},
		mounted() {
			// receive sort change
			this.$on(EMIT_EVENTS.SORT_CHANGE, params => {
				this.sortChange(params);
			});
		},
		render(h) {
			const {
				cpt_header_class,
				groupColumns,
				colgroups,
				fixedHeader,
				headerRows,
				checkboxOption,
				sortOption,
				sortColumns,
				cellStyleOption,
				cellSelectionData
			} = this;

			return h(
				"thead",
				{ class: cpt_header_class },
				groupColumns.map((groupColumn, rowIndex) => {
					const trProps = {
						key: rowIndex,
						props: {
							columnsOptionResetTime: this.columnsOptionResetTime,
							groupColumn,
							headerRows,
							colgroups,
							fixedHeader,
							isGroupHeader: this.isGroupHeader,
							rowIndex,
							checkboxOption,
							sortOption,
							sortColumns,
							cellStyleOption,
							eventCustomOption: this.eventCustomOption,
							cellSelectionData,
							cellSelectionRangeData: this.cellSelectionRangeData,
							headerIndicatorColKeys: this.headerIndicatorColKeys
						}
					};
					return h(HeaderTr, trProps);
				})
			);
		}
	};
}
</script>
