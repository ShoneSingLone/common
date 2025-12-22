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
			const props = mergeProps4h([
				{
					attrs: vm.mixin_attrs,
					props: vm.mixin_attrs
				},
				{
					on: vm.mixin_listeners,
					onInput(val) {
						vm.x_item_value = val;
					}
				}
			]);

			return h("xAutocomplete", props);
		}
	});
}
</script>
