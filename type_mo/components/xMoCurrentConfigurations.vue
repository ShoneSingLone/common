<template>
	<xCard
		:header="i18n('current_allocation')"
		class="xMoCurrentConfigurations ml"
		:bodyClass="{
			'height1px overflow-auto': true
		}">
		<xForm col="1" style="width: var(--xMoCurrentConfigurations-width)">
			<xDesc
				:item="itemConfigs"
				v-for="(itemConfigs, prop) in items"
				:key="prop"
				:value="getValue(prop)" />
		</xForm>
	</xCard>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["items", "itemsValue"],
		methods: {
			getValue(prop) {
				return this.itemsValue ? this.itemsValue[prop] : undefined;
			}
		}
	});
}
</script>
<style lang="less">
.xMoCurrentConfigurations {
	max-height: 100%;
	overflow: hidden;
	--xItem-label-width: var(--xMoCurrentConfigurations-label-width, 80px);
	&.xBlock {
		display: flex;
		flex-flow: column nowrap;
		.el-card__header + .el-card__body {
			flex: 1;
			overflow: auto;
			overflow-x: hidden;
		}
	}
	.xForm .xFormItem {
		margin: 0;
	}
}
</style>
