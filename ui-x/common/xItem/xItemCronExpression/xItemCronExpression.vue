<template>
	<div class="flex middle">
		<xInput v-model="x_item_value" :readonly="readonly" />
		<xBtn v-if="!readonly" @click="openCronExpressionDialog">{{ cptLabel }}</xBtn>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");

	return defineComponent({
		mixins: [mixins],
		props: ["value", "configs"],
		components: {
			/* 【需求】2026-08-19 Cron 表达式组件使用 $syncSkeleton，加载期显示表单占位 */
			xItemCronExpression: _.$syncSkeleton(
				"/common/ui-x/common/xItem/xItemCronExpression/xItemCronExpression.vue",
				{ skeleton: { skeletonType: "form", skeletonRows: 2 } }
			)
		},
		data() {
			return {};
		},
		computed: {
			cptLabel() {
				return i18n("generate_expression");
			}
		},
		methods: {
			onInput(e) {
				debugger;
				this.x_item_value = e;
			},
			async openCronExpressionDialog() {
				_.$openModal({
					title: "Cron表达式生成器",
					url: "/common/ui-x/common/xItem/xItemCronExpression/xItemCronExpression.dialog.vue"
				});
			}
		}
	});
}
</script>
