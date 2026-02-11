<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_HEADER_FILTER_CUSTOM_CONTENT,
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
					if (
						column.filterCustom &&
						Vue._X_TABLE_EASY_UTILS.isBoolean(column.filterCustom.defaultVisible)
					) {
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
				if (Vue._X_TABLE_EASY_UTILS.isFunction(render)) {
					result = h(
						"div",
						{
							slot: "custom-content"
						},
						[
							render(
								{
									showFn: this.show,
									closeFn: this.close
								},
								h
							)
						]
					);
				}
				return result;
			},
			// getIcon
			getIcon(h) {
				let result;
				const { filterIcon } = this.column.filterCustom;
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
					isCustomContent: true,
					isControlled: true,
					visible: this.internalVisible,
					beforeVisibleChange: this.column.filterCustom.beforeVisibleChange
				},
				on: {
					"on-dropdown-visible-change": this.visibleChange
				}
			};

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
				),
				// custom content
				this.getCustomContent(h)
			]);
		}
	});
}
</script>
