<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_HEADER_FILTER_CONTENT,
		props: {
			column: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				filterList: []
			};
		},
		watch: {
			column: {
				handler: function (column) {
					if (column.filter && Array.isArray(column.filter.filterList)) {
						this.filterList = column.filter.filterList;
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			/*
			 * @filterConfirm
			 * @desc  filter confirm
			 * @param {Array} val - filter list
			 */
			filterConfirm() {
				const { filterConfirm } = this.column.filter;
				filterConfirm && filterConfirm(this.filterList);
			},
			// filter reset
			filterReset() {
				const { filterReset } = this.column.filter;
				filterReset && filterReset(this.filterList);
			},
			// getIcon
			getIcon(h) {
				let result;
				const { filterIcon } = this.column.filter;
				if (Vue._X_TABLE_EASY_UTILS.isFunction(filterIcon)) {
					result = filterIcon(h);
				} else {
					result = h(Vue._X_TABLE_EASY_COMPONENTS.VeIcon, {
						props: {
							name: Vue._X_TABLE_EASY_ICON_NAMES.FILTER
						}
					});
				}
				return result;
			}
		},
		render(h) {
			const { filterList, isMultiple, maxHeight, beforeVisibleChange } = this.column.filter;

			const compProps = {
				props: {
					value: filterList,
					showOperation: true,
					isMultiple: isMultiple,
					showRadio: true, // when single selection
					confirmFilterText: Vue._X_TABLE_EASY_I18N.t("confirmFilter"),
					resetFilterText: Vue._X_TABLE_EASY_I18N.t("resetFilter"),
					beforeVisibleChange: beforeVisibleChange
				},
				on: {
					[Vue._X_TABLE_EASY_EMIT_EVENTS.HEADER_FILTER_CONFIRM]: this.filterConfirm,
					[Vue._X_TABLE_EASY_EMIT_EVENTS.HEADER_FILTER_RESET]: this.filterReset,
					// v-model
					input: val => {
						this.filterList = val;
					}
				}
			};

			if (typeof maxHeight === "number") {
				compProps.props.maxHeight = maxHeight;
			}

			return h(Vue._X_TABLE_EASY_COMPONENTS.VeDropdown, compProps, [
				// icon
				h(
					"span",
					{
						class: Vue._X_TABLE_EASY_UTILS.clsName("filter")
					},
					[
						h(
							"span",
							{
								class: Vue._X_TABLE_EASY_UTILS.clsName("filter-icon")
							},
							[this.getIcon(h)]
						)
					]
				)
			]);
		}
	});
}
</script>
