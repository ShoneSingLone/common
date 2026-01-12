<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		computed: {},
		render(h) {
			const vm = this;

			if (vm.readonly) {
				return h("xInput", {
					readonly: true,
					value: vm.x_item_value
				});
			}

			return h(
				"xIpAddress",
				mergeProps4h([
					{
						attrs: vm.$attrs,
						on: vm.mixin_listeners
						/* configs,value */
					},
					_.$val(this, "$vnode.data")
				])
			);
		}
	});
}
</script>
