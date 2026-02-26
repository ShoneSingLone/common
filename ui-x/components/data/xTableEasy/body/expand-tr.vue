<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [{ clsName }, { COMPS_NAME }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_EXPAND_TR,
		props: {
			tableViewportWidth: {
				type: Number,
				default: 0
			},
			// expand column
			expandColumn: {
				type: Object,
				default: function () {
					return null;
				}
			},
			colgroups: {
				type: Array,
				required: true
			},
			// expand row option
			expandOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// expanded row keys
			expandedRowkeys: {
				type: Array,
				default: function () {
					return [];
				}
			},
			rowData: {
				type: Object,
				required: true
			},
			rowIndex: {
				type: Number,
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			}
		},
		computed: {
			// get column count
			cpt_column_count() {
				return this.colgroups.length;
			},
			// current row key
			cpt_current_row_key() {
				return this.rowData[this.rowKeyFieldName];
			},
			// is row expanded
			cpt_is_row_expanded() {
				let result = false;

				const { expandOption, expandedRowkeys, cpt_current_row_key } = this;

				// defalut expand all rows
				if (expandOption.defaultExpandAllRows) {
					result = true;
				}
				// defaultExpandedRowKeys includes currentRowKey
				else if (expandedRowkeys.includes(cpt_current_row_key)) {
					result = true;
				}

				return result;
			},
			// expand row class
			cpt_expan_row_class() {
				let result = {
					[clsName("expand-tr")]: true
				};
				return result;
			},

			// has left fixed column
			cpt_has_left_fixed_column() {
				return this.colgroups.some(x => x.fixed === "left");
			},

			// expand td content style
			cpt_expand_td_content_style() {
				let result = {};

				const { cpt_has_left_fixed_column, tableViewportWidth } = this;

				if (cpt_has_left_fixed_column) {
					// table width
					if (tableViewportWidth) {
						result["width"] = tableViewportWidth + "px";
					}
				}

				return result;
			}
		},
		methods: {
			// get expande row content
			getExpandRowContent(h) {
				const { expandOption } = this;
				let result =
					expandOption.render &&
					expandOption.render(
						{
							row: this.rowData,
							column: this.expandColumn,
							rowIndex: this.rowIndex
						},
						h
					);

				return result;
			}
		},
		render(h) {
			const { cpt_is_row_expanded, cpt_column_count, getExpandRowContent } = this;

			let result = null;

			if (cpt_is_row_expanded) {
				let content = getExpandRowContent(h);
				result = h(
					"tr",
					{
						class: this.cpt_expan_row_class
					},
					[
						h(
							"td",
							{
								class: clsName("expand-td"),
								attrs: {
									colSpan: cpt_column_count
								}
							},
							[
								h(
									"div",
									{
										class: clsName("expand-td-content"),
										style: this.cpt_expand_td_content_style
									},
									[content]
								)
							]
						)
					]
				);
			}

			return result;
		}
	};
}
</script>
