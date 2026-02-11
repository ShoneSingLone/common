<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_EXPAND_TR_ICON,
		props: {
			column: {
				type: Object,
				required: true
			},
			// expand row option
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
			// expanded row keys
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
			// row expand click event
			cellClick: {
				type: Function,
				default: null
			}
		},
		computed: {
			// is row expanded
			cpt_is_expanded() {
				let result = false;

				const { column, rowData, expandedRowkeys, rowKeyFieldName } = this;

				if (column.type === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_TYPES.EXPAND) {
					const rowKey = rowData[rowKeyFieldName];
					result = expandedRowkeys.includes(rowKey);
				}

				return result;
			},
			// expand row icon class
			cpt_expand_row_icon_container_class() {
				return {
					[Vue._X_TABLE_EASY_UTILS.clsName("row-expand-icon")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("expand-icon-collapsed")]: this.cpt_is_expanded
				};
			}
		},
		render(h) {
			let content = null;

			const { cellClick, column, cpt_expand_row_icon_container_class } = this;

			if (column.type === Vue._X_TABLE_EASY_CONSTANTS.COLUMN_TYPES.EXPAND) {
				content = h(
					"span",
					{
						class: cpt_expand_row_icon_container_class,
						on: {
							click: e => cellClick(e)
						}
					},
					[
						h(Vue._X_TABLE_EASY_COMPONENTS.VeIcon, {
							props: {
								name: Vue._X_TABLE_EASY_ICON_NAMES.RIGHT_ARROW
							}
						})
					]
				);
			}
			return content;
		}
	});
}
</script>
