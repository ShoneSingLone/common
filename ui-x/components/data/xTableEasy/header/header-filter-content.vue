<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [
		VeDropdown,
		{ COMPS_NAME, EMIT_EVENTS, LOCALE_COMP_NAME },
		{ clsName },
		VeIcon,
		{ ICON_NAMES }
	] = await Promise.all([
		_.$importVue("vue-easytable/packages/ve-dropdown"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("vue-easytable/packages/ve-icon"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/utils/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_HEADER_FILTER_CONTENT,
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
				if (_.isFunction(filterIcon)) {
					result = filterIcon(h);
				} else {
					// 使用 h 函数替代 JSX
					result = h(VeIcon, {
						props: {
							name: ICON_NAMES.FILTER
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
					confirmFilterText: i18n("confirmFilter"),
					resetFilterText: i18n("resetFilter"),
					beforeVisibleChange: beforeVisibleChange
				},
				on: {
					[EMIT_EVENTS.HEADER_FILTER_CONFIRM]: this.filterConfirm,
					[EMIT_EVENTS.HEADER_FILTER_RESET]: this.filterReset,
					// v-model
					input: val => {
						this.filterList = val;
					}
				}
			};

			if (typeof maxHeight === "number") {
				compProps.props.maxHeight = maxHeight;
			}

			// 使用 h 函数替代 JSX
			return h(VeDropdown, compProps, [
				// icon
				h(
					"span",
					{
						class: clsName("filter")
					},
					[
						h(
							"span",
							{
								class: clsName("filter-icon")
							},
							[this.getIcon(h)]
						)
					]
				)
			]);
		}
	};
}
</script>
