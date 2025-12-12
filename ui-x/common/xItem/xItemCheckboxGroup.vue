<template>
	<div class="xItemCheckboxGroupWrapper flex middle">
		<div v-if="readonly">{{ cpt_current_selected }}</div>
		<xCheckboxGroup v-else v-model="x_item_value" v-bind="$attrs" v-on="mixin_listeners">
			<template v-if="isButton">
				<xCheckboxButton
					v-for="option in selectOptions"
					:label="option.label"
					:key="option.value">
					{{ option.label }}
				</xCheckboxButton>
			</template>
			<template v-else>
				<xCheckbox
					v-for="option in selectOptions"
					:label="option.value"
					:key="option.label">
					{{ option.label }}
				</xCheckbox>
			</template>
		</xCheckboxGroup>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return {
		mixins: [mixins],
		props: ["value", "configs", "options"],
		computed: {
			selectOptions() {
				return this.options || _.$val(this, "configs.options") || [];
			},
			cpt_current_selected() {
				const vm = this;
				if (vm.readonly) {
					if (_.isArray(vm.x_item_value)) {
						const target = [];
						_.each(vm.x_item_value, value => {
							const item = _.find(vm.selectOptions, { value });
							target.push(_.$val(item, "label") || value);
						});
						return target.join(",");
					} else {
						const item = _.find(vm.selectOptions, { value: vm.x_item_value });
						return _.$val(item, "label") || vm.x_item_value;
					}
				}
			},
			isButton() {
				return _.$val(this, "configs.isButton") || false;
			}
		},
		data() {
			return {};
		}
	};
}
</script>
<style lang="less">
.xItemCheckboxGroupWrapper {
	min-height: var(--xItem-wrapper-height, var(--ui-height));
}
</style>
