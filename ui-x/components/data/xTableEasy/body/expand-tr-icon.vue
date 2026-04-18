<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [{ COMPS_NAME, COLUMN_TYPES }, { clsName }, { ICON_NAMES }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/utils/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_EXPAND_TR_ICON,
		props: {
			column: {
				type: Object,
				required: true
			},
			// 展开行选项
			expandOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			rowData: {
				type: Object,
				required: true
			},
			// 已展开的行键
			expandedRowkeys: {
				type: Array,
				default: function () {
					return [];
				}
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			// 行展开点击事件
			cellClick: {
				type: Function,
				default: null
			}
		},
		computed: {
			// 是否展开
			cpt_is_expanded() {
				let result = false;

				const { column, rowData, expandedRowkeys, rowKeyFieldName } = this;

				if (column.type === COLUMN_TYPES.EXPAND) {
					const rowKey = rowData[rowKeyFieldName];
					result = expandedRowkeys.includes(rowKey);
				}

				return result;
			},
			// 展开行图标类名
			cpt_expand_row_icon_container_class() {
				return {
					[clsName("row-expand-icon")]: true,
					[clsName("expand-icon-collapsed")]: this.cpt_is_expanded
				};
			}
		},
		render(h) {
			let content = null;

			const { cellClick, column, cpt_expand_row_icon_container_class } = this;

			if (column.type === COLUMN_TYPES.EXPAND) {
				content = h(
					"span",
					{
						class: cpt_expand_row_icon_container_class,
						on: {
							click: function (e) {
								cellClick(e);
							}
						}
					},
					[h("xIcon", { props: { icon: ICON_NAMES.RIGHT_ARROW } })]
				);
			}
			return content;
		}
	};
}
</script>
