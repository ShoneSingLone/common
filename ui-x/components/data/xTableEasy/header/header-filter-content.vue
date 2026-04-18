<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [xDropdown, { COMPS_NAME, EMIT_EVENTS, LOCALE_COMP_NAME }, { clsName }, { ICON_NAMES }] =
		await Promise.all([
			_.$importVue("/common/ui-x/components/navigation/xDropdown/xDropdown.vue"),
			_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
			_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
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
					result = h("xIcon", {
						props: {
							icon: ICON_NAMES.FILTER
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
					beforeVisibleChange: beforeVisibleChange
				},
				on: {
					"visible-change": () => {}
				}
			};

			// 使用 h 函数替代 JSX
			return h(xDropdown, compProps, [
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
				),
				// filter content
				h(
					"div",
					{
						slot: "dropdown"
					},
					[
						h(
							"div",
							{
								class: clsName("filter-content")
							},
							[
								// filter items
								filterList.map(item =>
									h(
										"div",
										{
											class: clsName("filter-item"),
											on: {
												click: () => {
													if (isMultiple) {
														const index = this.filterList.indexOf(
															item.value
														);
														if (index > -1) {
															this.filterList.splice(index, 1);
														} else {
															this.filterList.push(item.value);
														}
													} else {
														this.filterList = [item.value];
													}
												}
											}
										},
										[
											h("input", {
												attrs: {
													type: isMultiple ? "checkbox" : "radio",
													name: "filter",
													checked: this.filterList.includes(item.value)
												}
											}),
											h(
												"span",
												{ class: clsName("filter-item-label") },
												item.label
											)
										]
									)
								),
								// operations
								h(
									"div",
									{
										class: clsName("filter-operations")
									},
									[
										h(
											"button",
											{
												class: clsName(
													"filter-button",
													"filter-button-reset"
												),
												on: {
													click: this.filterReset
												}
											},
											i18n("resetFilter")
										),
										h(
											"button",
											{
												class: clsName(
													"filter-button",
													"filter-button-confirm"
												),
												on: {
													click: this.filterConfirm
												}
											},
											i18n("confirmFilter")
										)
									]
								)
							]
						)
					]
				)
			]);
		}
	};
}
</script>
