<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["options"],
		data() {
			return {
				col: 4
			};
		},
		computed: {
			cpt_is_button() {
				return _.$val(this, "configs.isButton") || false;
			},
			cpt_is_multiple() {
				return _.$val(this, "configs.multiple") || false;
			},
			cptFormStyle() {
				return {
					width: `${this.col * this.minWidth}px`
				};
			},
			cptDisabled() {
				if (_.$val(this, "configs.disabled")) {
					return true;
				}

				if (hasOwn(this.$attrs, "disabled")) {
					return this.$attrs.disabled;
				}
				return false;
			},
			minWidth() {
				return _.$val(this, "configs.minWidth") || 200;
			},
			selectOptions() {
				return this.options || _.$val(this, "configs.options") || [];
			},
			cptGroupProps() {
				return mergeProps4h([
					{ attrs: this.$attrs },
					{
						staticClass: "xItemRadioGroup",
						attrs: {
							on: this.mixin_listeners,
							col: 4
						}
					}
				]);
			}
		},
		methods: {
			vDomItems() {
				const vm = this;
				/*el-radio-button*/
				const tag = _.$val(this, "configs.type") || "el-radio";
				const renderOption = _.$val(this, "configs.renderOption");
				return _.map(this.selectOptions, item => {
					let { value, label } = item;
					if (renderOption) {
						label = renderOption.call(vm.configs, item);
					}
					const radioProps = {
						label: value,
						key: value,
						value: vm.x_item_value,
						disabled: vm.cptDisabled,
						staticClass: "flex middle x-radio-in-x-item",
						nativeOn: {
							click: () => {
								if (!vm.cptDisabled) {
									vm.x_item_value = value;
								}
							}
						}
					};

					if (vm.configs.isUseBorder) {
						radioProps.attrs = { border: true };
					}

					return hDiv({ class: "width100 height100 flex middle" }, [
						h("xRadio", radioProps, [label])
					]);
				});
			},
			getCol(width, col) {
				if (col === 1) {
					return 1;
				}
				const _minWidth = width / col;
				if (_minWidth > this.minWidth) {
					return col;
				} else {
					return this.getCol(width, col - 1);
				}
			}
		},
		render() {
			const vm = this;
			if (vm.readonly) {
				const item = _.find(vm.selectOptions, { value: vm.x_item_value });
				return hDiv([_.$val(item, "label") || vm.x_item_value]);
			}
			if (vm.cpt_is_button) {
				return h(
					"xBtnGroup",
					_.map(this.selectOptions, item => {
						const props = {
							...item,
							disabled: this.cptDisabled,
							onClick: () => {
								this.x_item_value = item.value;
							}
						};
						if (item.value === this.value) {
							props.preset = "primary";
						}
						return hxBtn(props, [item.label]);
					})
				);
			}

			return h("xAutoResizer", { class: "mt" }, [
				{
					default: ({ width, height }) => {
						if (width) {
							const col = this.getCol(width, Math.ceil(width / this.minWidth));
							if (this.col != col) {
								this.col = col;
							}
							return h(
								"xForm",
								{
									...this.cptGroupProps,
									style: this.cptFormStyle,
									col: this.col
								},
								this.vDomItems()
							);
						}
					}
				}
			]);
		}
	};
}
</script>
<style lang="less">
.xForm.xItemRadioGroup {
	.xFormItem {
		min-height: var(--ui-height);
		margin-top: unset;

		&.grid-column1 {
			align-items: center;
		}

		// &+.xFormItem{ }
	}

	.el-radio__input.is-checked + .el-radio__label {
		color: var(--el-color-primary);
	}

	.x-radio-in-x-item {
		display: flex;
		width: 100%;
	}
}
</style>
