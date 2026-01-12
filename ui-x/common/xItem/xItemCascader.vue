<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {},
		mounted() {},
		render() {
			const vm = this;

			const cascaderProps = mergeProps4h([
				{
					on: vm.mixin_listeners,
					/* configs,value */
					onChange(val) {
						vm.x_item_value = val;
					}
				},
				_.$val(vm, "$vnode.data")
			]);

			if (vm.readonly) {
				let displayValue = vm.x_item_value;
				if (Array.isArray(displayValue)) {
					displayValue = displayValue.join(", ");
				}
				return h("xInput", {
					readonly: true,
					value: displayValue
				});
			}

			return h("xCascader", cascaderProps);
		}
	});
}
</script>
