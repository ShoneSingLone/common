<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	// 【修复】引入 xDropdownMenu：由它接管过滤面板的显隐(v-show=showPopper)与浮层定位(Popper)，
	// 避免所有列的过滤面板同时内联渲染在表头导致"错位"
	const [
		xDropdown,
		xDropdownMenu,
		{ COMPS_NAME, EMIT_EVENTS, LOCALE_COMP_NAME },
		{ clsName },
		{ ICON_NAMES }
	] = await Promise.all([
		_.$importVue("/common/ui-x/components/navigation/xDropdown/xDropdown.vue"),
		_.$importVue("/common/ui-x/components/navigation/xDropdown/xDropdownMenu.vue"),
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
				// 【修复】选项对象数组（{label, value}），与已选值分离维护
				filterList: [],
				// 【修复】已选中的值集合（纯字符串），避免与选项对象混用导致渲染空白项
				selectedValues: []
			};
		},
		watch: {
			column: {
				handler: function (column) {
					if (column.filter && Array.isArray(column.filter.filterList)) {
						// 【修复】拆分选项对象与字符串选中值：选项为对象、选中值为字符串
						this.filterList = column.filter.filterList.filter(
							item => item && typeof item === "object"
						);
						const stringValues = column.filter.filterList.filter(
							item => typeof item === "string"
						);
						// 仅当外部显式传入字符串选中值时才同步，避免列重渲染清空已选状态
						if (stringValues.length) {
							this.selectedValues = stringValues;
						}
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
				filterConfirm && filterConfirm(this.selectedValues);
			},
			// filter reset
			filterReset() {
				this.selectedValues = [];
				const { filterReset } = this.column.filter;
				filterReset && filterReset();
			},
			/*
			 * @toggleSelect
			 * @desc  切换某选项的选中态（多选增删 / 单选替换）
			 * @param {String} value - 选项值
			 * @param {Boolean} checked - 是否选中
			 */
			toggleSelect(value, checked) {
				const isMultiple = this.column.filter && this.column.filter.isMultiple;
				if (isMultiple) {
					const index = this.selectedValues.indexOf(value);
					if (checked && index === -1) {
						this.selectedValues.push(value);
					} else if (!checked && index > -1) {
						this.selectedValues.splice(index, 1);
					}
				} else {
					// 单选：选中即替换，取消即清空
					this.selectedValues = checked ? [value] : [];
				}
				// 【修复】对齐旧版即时过滤功能点：选中变更立即生效，无需点击"确认"
				this.filterConfirm();
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
			const { beforeVisibleChange } = this.column.filter;
			// 【修复】使用拆分后的选项对象数组（this.filterList），避免渲染出空白项
			const filterList = this.filterList;

			// 【修复】过滤面板改为 click 触发，与 xTableFilter 一致；由 xDropdownMenu 控制显隐与定位
			const compProps = {
				props: {
					beforeVisibleChange: beforeVisibleChange,
					trigger: "click"
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
				// 【修复】过滤面板错位：dropdown 插槽改用 xDropdownMenu 包裹，
				// 由其接管显隐(v-show=showPopper)与浮层定位(Popper)，替换原先的内联裸 div
				h(
					xDropdownMenu,
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
											class: clsName("filter-item")
										},
										[
											// 【修复】改用 xCheckbox 渲染（替代原生 checkbox），样式与项目一致；
											// 选中态取自 selectedValues，杜绝混入字符串导致的空白项
											h(
												"xCheckbox",
												{
													props: {
														value: this.selectedValues.includes(
															item.value
														)
													},
													on: {
														change: checked =>
															this.toggleSelect(item.value, checked)
													}
												},
												[item.label]
											)
										]
									)
								)
								// 【修复】对齐旧版即时过滤：无"确认/重置"按钮，勾选即生效；
								// 重置由页面工具栏的"重置筛选"统一承担
							]
						)
					]
				)
			]);
		}
	};
}
</script>
