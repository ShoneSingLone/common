<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {
			selectOptions() {
				return this.options || _.$val(this, "configs.options") || [];
			}
		},
		mounted() {},
		render() {
			const vm = this;
			let attrs = {};
			if (_.isFunction(_.$val(_xUtils, "globalConfigs.xItemSelect.defaultProps"))) {
				attrs = _xUtils.globalConfigs.xItemSelect.defaultProps(vm, vm.$attrs);
			}

			const selectProps = mergeProps4h([
				{
					attrs,
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.x_item_value = val;
					}
				},
				_.$val(vm, "$vnode.data")
			]);

			const children = (() => {
				if (_.$val(vm, "configs.optonsRender")) {
					return [vm.configs.optonsRender({ options: vm.selectOptions, vm })];
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
