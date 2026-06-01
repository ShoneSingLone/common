<template>
	<xBlock class="flex vertical center xItem-pos left top width100">
		<div
			class="flex middle center mb8"
			style="
				max-width: 500px;
				--xItem-flex-flow: row nowrap;
				--xItem-layout-align-items: center;
			"
			v-if="!cpt_disabled">
			<xItem :configs="configsKey" />
			<xGap l="4" />
			<span>=</span>
			<xGap l="4" />
			<xItem :configs="configsVal" />
			<xGap l="4" />
			<xBtn :configs="configsAddBtn" />
		</div>
		<div v-if="cpt_notice" class="mb">
			<xRender :render="cpt_notice" />
		</div>
		<div>
			<span
				v-for="(val, key) in x_item_value"
				:key="key"
				style="display: inline-block; margin: 4px; cursor: pointer">
				<xTag
					:closable="!cpt_disabled"
					@close="$event => removeTag(key)"
					@click="$event => editTag(key)"
					>{{ key }}={{ val }}</xTag
				>
			</span>
		</div>
	</xBlock>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return defineComponent({
		inject: ["APP"],
		mixins: [mixins],
		props: ["options"],
		data() {
			const vm = this;
			return {
				configsKey: {
					value: "",
					placeholder: "请输入键",
					rules: [
						_rules.keyVal(),
						_rules.lessThan(63),
						{
							async validator({ val }) {
								if (!val) {
									return "";
								}
								if (!/([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9]/.test(val)) {
									return "值必须为大小写字母、数字、-、_或.组成，且只能以大小写字母、数字开头或结尾";
								}
								return "";
							},
							trigger: ["change"]
						}
					]
				},
				configsVal: {
					value: "",
					placeholder: "请输入值",
					rules: [
						_rules.keyVal(),
						_rules.lessThan(63),
						{
							async validator({ val }) {
								if (!val) {
									return "";
								}
								if (!/([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9]/.test(val)) {
									return "值必须为大小写字母、数字、-、_或.组成，且只能以大小写字母、数字开头或结尾";
								}
								return "";
							},
							trigger: ["change"]
						}
					]
				}
			};
		},
		mounted() {},
		computed: {
			cpt_notice() {
				return this.configs.notice || false;
			},
			cpt_disabled() {
				return this.$xItemAttr("disabled");
			},
			configsAddBtn() {
				const vm = this;
				let label = i18n("添加");
				if (Object.keys(vm.x_item_value).includes(vm.configsKey.value)) {
					label = i18n("修改");
				}
				return {
					label,
					preset: "blue",
					disabled() {
						return !_.every([vm.configsKey.value, vm.configsVal.value], _.$isInput);
					},
					onClick: () => vm.add()
				};
			}
		},
		methods: {
			editTag(key) {
				this.configsKey.value = key;
				this.configsVal.value = this.x_item_value[key];
			},
			removeTag(key) {
				const oldTags = { ...this.x_item_value };
				delete oldTags[key];
				this.x_item_value = oldTags;
			},
			async add(podObj) {
				if (podObj) {
					this.x_item_value = _.merge({}, this.x_item_value, podObj);
					return;
				} else {
					const [error] = await _.$validateForm(this.$el);
					if (error) {
						return;
					}
					podObj = {
						[this.configsKey.value]: this.configsVal.value
					};
					this.x_item_value = _.merge({}, this.x_item_value, podObj);
					this.configsKey.value = "";
					this.configsVal.value = "";
				}
			}
		}
	});
}
</script>

<style lang="less"></style>
