<template>
	<div class="xItemSwitch flex middle">
		<div v-if="readonly">{{ cpt_readonly_label }}</div>
		<xSwitch v-else v-model="mixin_value" v-bind="mixin_attrs" v-on="mixin_listeners" />
		<xGap f />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [ItemMixins],
		setup() {
			const cpt_readonly_label = computed(() => {
				if (this.readonly) {
					const item = _.find(vm.selectOptions, { value: vm.mixin_value });
					return _.$val(item, "label") || vm.mixin_value;
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
