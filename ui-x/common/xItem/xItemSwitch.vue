<template>
	<div class="xItemSwitch flex middle">
		<xSwitch v-model="mixin_value" v-bind="mixin_attrs" v-on="mixin_listeners" />
		<xGap f />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [ItemMixins],
		setup() {
			return {};
		}
	});
}
</script>
<style lang="less">
.xItemSwitch {
	height: var(--ui-height);
}
</style>
