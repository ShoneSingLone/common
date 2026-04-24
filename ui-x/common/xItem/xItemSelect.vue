<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs"],
		data() {
			return {
				xSelectInner: null
			};
		},
		computed: {
			selectOptions() {
				return this.options || _.$val(this, "configs.options") || [];
			}
		},
		mounted() {
			// 在 nextTick 中获取 xSelect 实例
			this.$nextTick(() => {
				const xSelectVm = this.$children.find(child => child.$options.name === 'xSelect');
				if (xSelectVm) {
					this.xSelectInner = xSelectVm;
				}
			});
		},
		methods: {
			/**
			 * 获取内部的 xSelect 组件实例
			 * @returns {Vue} xSelect 组件实例
			 * @example
			 * const xItemVm = Vue._X_ITEM_VM_S['your-item-id'];
			 * const xItemSelectVm = xItemVm.childVm;
			 * const xSelectVm = xItemSelectVm.getXSelect();
			 * // 现在可以调用 xSelect 的方法，如：xSelectVm.toggleMenu()
			 */
			getXSelect() {
				return this.xSelectInner;
			}
		},
		render() {
			const vm = this;
			let attrs = {};
			if (_.isFunction(_.$val(_xUtils, "globalConfigs.xItemSelect.defaultProps"))) {
				attrs = _xUtils.globalConfigs.xItemSelect.defaultProps(vm, vm.$attrs);
			}
			const selectProps = mergeProps4h([
				vm.configs,
				{
					attrs: {
						...vm.$attrs,
						...attrs
					},
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.x_item_value = val;
					}
				},
				_.$val(vm, "$vnode.data")
			]);
			console.log("🚀 ~ selectProps:", selectProps);
			const children = (() => {
				if (_.$val(vm, "configs.optionsRender")) {
					return [vm.configs.optionsRender({ options: vm.selectOptions, vm })];
				} else {
					return _.map(vm.selectOptions, (item, key) => {
						return h("xOption", {
							key: item.value || item.label,
							value: item.value,
							label: item.label,
							disabled: item.disabled || false
						});
					});
				}
			})();

			if (vm.readonly) {
				const item = _.find(vm.selectOptions, { value: vm.x_item_value });
				return h("xInput", {
					readonly: true,
					value: _.$val(item, "label") || vm.x_item_value
				});
			}

			return h("xSelect", selectProps, children);
		}
	});
}
</script>
