<template>
	<div class="x-item-advance-wrapper" style="width: 100%">
		<xForm col="1" v-if="cpt_is_show_switch">
			<xItem :configs="configs_is_use_adv" v-model="cpt_is_checked" />
		</xForm>
		<transition name="fade" mode="out-in">
			<div class="xItem-wrapper mt8" style="width: 100%">
				<div class="x-item-label-controller-wrapper flex">
					<label class="xItem_label flex middle" />
					<xBlock
						v-if="cpt_is_checked"
						class="flex width100 flex1"
						:bodyStyle="{ width: '100%' }"
						:bodyClass="{ 'flex vertical': true }">
						<slot />
					</xBlock>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			checked: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: false
			}
		},
		data(vm) {
			return {
				isChecked: false,
				required: false,
				configs_is_use_adv: {
					label: "高级设置",
					itemType: "xItemSwitch"
				}
			};
		},
		computed: {
			cpt_is_show_switch() {
				if (this.required) {
					return false;
				}
				if (this.readonly) {
					return false;
				}
				return true;
			},
			cpt_is_checked: {
				get() {
					/* 如果有必填项，不可折叠 */
					if (this.required) {
						return true;
					}

					if (this.isChecked) {
						return true;
					}
					return false;
				},
				set(val) {
					/* 如果有必填项，不可折叠, 保持原有值 */
					if (this.required) {
						return true;
					}

					this.isChecked = val;
				}
			}
		},
		methods: {}
	});
}
</script>

<style lang="less"></style>
