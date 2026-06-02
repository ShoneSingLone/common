<template>
	<div class="xItemAdvanceConfig flex vertical width100">
		<!-- Switch 开关 -->
		<div v-if="cpt_is_show_switch" class="mb8">
			<xSwitch
				v-model="isChecked"
				:active-text="cpt_activeText"
				:inactive-text="cpt_inactiveText" />
		</div>
		<!-- 子内容区域 -->
		<div v-if="cpt_is_checked" class="advance-children width100 mt8">
			<slot />
			<template v-if="!cpt_hasSlot && cpt_subItems.length">
				<xItem
					v-for="(item, idx) in cpt_subItems"
					:key="item._key || idx"
					:configs="item" />
			</template>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		mixins: [ItemMixins],
		props: {
			required: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isChecked: false
			};
		},
		created() {
			if (this.x_item_value === true) {
				this.isChecked = true;
			}
		},
		computed: {
			cpt_activeText() {
				return (this.configs && this.configs.activeText) || i18n("开启");
			},
			cpt_inactiveText() {
				return (this.configs && this.configs.inactiveText) || i18n("关闭");
			},
			cpt_is_show_switch() {
				if (this.required) return false;
				if (this.readonly) return false;
				if (this.configs && this.configs.required) return false;
				return true;
			},
			cpt_is_checked() {
				if (this.required) return true;
				if (this.configs && this.configs.required) return true;
				return this.isChecked;
			},
			cpt_subItems() {
				return (this.configs && this.configs.subItems) || [];
			},
			cpt_hasSlot() {
				return !!this.$slots.default;
			}
		},
		watch: {
			isChecked(val) {
				this.x_item_value = val;
			}
		}
	});
}
</script>

<style lang="less">
.xItemAdvanceConfig {
	.advance-children {
		width: 100%;
	}
}
</style>
