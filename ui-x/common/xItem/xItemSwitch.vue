<template>
	<div class="xItemSwitch flex middle">
		<div v-if="readonly">{{ cpt_readonly_label }}</div>
		<xSwitch v-else v-model="x_item_value" v-bind="mixin_attrs" v-on="mixin_listeners" />
		<xGap f />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [ItemMixins],
		setup() {
			const vm = this;
			const cpt_activeText = computed(() => {
				return _.$val(vm, "mixin_attrs.activeText") || i18n("是");
			});
			const cpt_inactiveText = computed(() => {
				return _.$val(vm, "mixin_attrs.inactiveText") || i18n("否");
			});
			const cpt_readonly_label = computed(() => {
				if (this.readonly) {
					return vm.x_item_value ? cpt_activeText.value : cpt_inactiveText.value;
				} else {
					return "";
				}
			});
			return { cpt_readonly_label };
		}
	});
}
</script>
<style lang="less">
.xItemSwitch {
	height: var(--ui-height);
}
</style>
