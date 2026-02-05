<style lang="less">
.x-number-with-unit {
	.x-number-with-unit-select {
		width: 48px;
		.x-number-with-unit-select-input {
			input {
				padding: 0;
				padding-left: 8px;
			}
		}
	}
	.el-input--small .el-input__inner {
		line-height: 24px;
		height: 24px;
	}
	&-input {
		width: 100px;
	}
}
</style>
<template>
	<div class="flex middle x-number-with-unit">
		<xInput v-model="cpt_item_value" class="flex1 mr4 x-number-with-unit-input" />
		<xSelect
			placeholder=""
			v-model="cpt_item_unit"
			class="x-number-with-unit-select"
			input-class="x-number-with-unit-select-input">
			<xOption v-for="item in unitOptions" :key="item.value" :value="item.value">
				{{ item.label }}
			</xOption>
		</xSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return {
		props: ["value", "unitOptions"],
		model: {
			prop: "value",
			event: "change"
		},
		methods: {
			getValidUnit(unit) {
				// 检查单位是否在 unitOptions 中
				if (!unit || _.isEmpty(this.unitOptions)) {
					return "";
				}
				const validUnit = _.find(this.unitOptions, item => item.value === unit);
				return validUnit ? validUnit.value : "";
			}
		},
		computed: {
			innerValue: {
				get() {
					return this.value;
				},

				set(newVal) {
					this.$emit("change", newVal);
				}
			},
			cpt_item_value: {
				get() {
					// 提取数值部分，确保返回正整数
					const value = this.value || "";
					const match = value.match(/^\d+/);
					const num = match ? parseInt(match[0], 10) : 0;
					return num > 0 ? num.toString() : "";
				},
				set(val) {
					// 确保值是正整数
					const num = parseInt(val, 10);
					const validNum = num > 0 ? num.toString() : "";
					// 确保单位是有效的
					const validUnit = this.getValidUnit(this.cpt_item_unit);
					this.innerValue = validNum + validUnit;
				}
			},
			cpt_item_unit: {
				get() {
					// 提取单位部分
					const value = this.value || "";
					const unitMatch = value.match(/[^\d.]+$/);
					let unit = unitMatch ? unitMatch[0] : "";
					// 确保单位是有效的
					return this.getValidUnit(unit) || _.first(this.unitOptions)?.value || "";
				},
				set(val) {
					// 确保单位是有效的
					const validUnit = this.getValidUnit(val);
					this.innerValue = this.cpt_item_value + validUnit;
				}
			}
		}
	};
}
</script>
