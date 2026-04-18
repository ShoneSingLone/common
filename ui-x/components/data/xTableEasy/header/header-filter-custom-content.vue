<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 显式导入下拉与图标组件，避免依赖全局字符串组件注册
	const [xDropdown, { COMPS_NAME }, { clsName }, { ICON_NAMES }] = await Promise.all([
		_.$importVue("/common/ui-x/components/navigation/xDropdown/xDropdown.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/utils/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_HEADER_FILTER_CUSTOM_CONTENT,
		props: {
			column: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				internalVisible: false
			};
		},
		watch: {
			column: {
				handler: function (column) {
					if (column.filterCustom && _.isBoolean(column.filterCustom.defaultVisible)) {
						this.internalVisible = column.filterCustom.defaultVisible;
					}
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			// visible change
			visibleChange(visible) {
				this.internalVisible = visible;
			},
			// get custom content
			getCustomContent(h) {
				let result = null;

				const { render } = this.column.filterCustom;
				if (_.isFunction(render)) {
					const props = {
						slot: "custom-content"
					};

					result = h("div", props, [
						render(
							{
								showFn: this.show,
								closeFn: this.close
							},
							h
						)
					]);
				}
				return result;
			},
			// get icon
			getIcon(h) {
				let result;
				const { filterIcon } = this.column.filterCustom;
				if (_.isFunction(filterIcon)) {
					result = filterIcon(h);
				} else {
					result = h("xIcon", {
						props: {
							icon: ICON_NAMES.FILTER
						}
					});
				}
				return result;
			},

			close() {
				this.internalVisible = false;
			},
			show() {
				this.internalVisible = true;
			}
		},
		render(h) {
			const compProps = {
				props: {
					visible: this.internalVisible,
					beforeVisibleChange: this.column.filterCustom.beforeVisibleChange
				},
				on: {
					"visible-change": this.visibleChange
				}
			};

			return h(xDropdown, compProps, [
				// icon
				h("span", { class: clsName("filter") }, [
					h("span", { class: clsName("filter-icon") }, [this.getIcon(h)])
				]),
				// custom content
				this.getCustomContent(h)
			]);
		}
	};
}
</script>
