<script lang="ts">
const X_TABLE_EASY_COMPS_NAME = {
	VE_TABLE: "VeTable",
	VE_TABLE_THADER: "VeTableHeader"
};

const X_TABLE_EASY_EMIT_EVENTS = {
	SORT_CHANGE: "sort-change"
};

const X_TABLE_EASY_CLS_NAME = "ve-table-";

const X_TABLE_EASY_COMPONENTS = {
	HeaderTr: null
};

const X_TABLE_EASY_MIXINS = {
	emitter: null
};

defineComponent({
	name: X_TABLE_EASY_COMPS_NAME.VE_TABLE_THADER,
	mixins: [X_TABLE_EASY_MIXINS.emitter],
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
				[`${X_TABLE_EASY_CLS_NAME}fixed-header`]: this.fixedHeader
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

			this.dispatch(
			X_TABLE_EASY_COMPS_NAME.VE_TABLE,
			X_TABLE_EASY_EMIT_EVENTS.SORT_CHANGE,
			sortColumns
		);

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
				cellSelectionData,
				isGroupHeader,
				cellSelectionRangeData,
				headerIndicatorColKeys,
				columnsOptionResetTime,
				eventCustomOption
			} = this;

			return h(
				"thead",
				{
					class: cpt_header_class
				},
				[
					groupColumns.map((groupColumn, rowIndex) => {
						const trProps = {
							key: rowIndex,
							props: {
								columnsOptionResetTime,
								groupColumn,
								headerRows,
								colgroups,
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

						return h(X_TABLE_EASY_COMPONENTS.HeaderTr, trProps);
					})
				]
			);
		}
	},
	mounted() {
		// receive sort change
		this.$on(X_TABLE_EASY_EMIT_EVENTS.SORT_CHANGE, params => {
			this.sortChange(params);
		});
	}
});
</script>
