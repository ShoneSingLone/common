<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return function render() {
		const vm = this;
		const CONFIGS = this.cpt_configs;

		const xItemWrapperProps = {
			vIf: !vm.cpt_is_hide,
			staticClass: "xItem-wrapper flex vertical",
			class: CONFIGS.class || {},
			attrs: {
				"data-form-item-selector": CONFIGS.selector || "",
				"data-form-item-type": vm.itemType,
				"data-form-item-id": vm.cpt_id,
				disabled: vm.cptDisabled,
				key: vm.itemType + vm.cpt_id
			},
			style: vm.cptStyle
		};

		const controllerWrapperProps = {
			class: {
				"xItem_controller overflow-hidden": true,
				"el-form-item is-error": !!vm.errorTips
			}
		};

		if (vm.cptDisabledTips) {
			/* @ts-ignore */
			controllerWrapperProps.directives = [
				hTipsHover({ msg: vm.cptDisabledTips, placement: "left-start" })
			];
		}

		const vNodeControllerChildren = [
			h(
				vm.itemType,
				mergeProps4h([
					CONFIGS,
					{ class: "x-item-controller-children-wrapper" },
					{
						readonly: vm.cptReadonly,
						disabled: vm.cptDisabled,
						attrs: {
							...vm.cpt_bindProps.attrs,
							readonly: vm.cptReadonly,
							disabled: vm.cptDisabled,
							queryData: vm.cptDepdata
						},
						props: {
							...vm.cpt_bindProps.props,
							readonly: vm.cptReadonly,
							disabled: vm.cptDisabled,
							queryData: vm.cptDepdata
						},
						configs: {
							...CONFIGS,
							readonly: vm.cptReadonly,
							disabled: vm.cptDisabled,
							options: vm.cpt_options
						},
						value: vm.cpt_value,
						on: vm.p_listeners,
						/* 监听配置项变化,需要主动调用 */
						onConfigschange: configs => {
							_.each(configs, (value, prop) => {
								vm.$set(vm.configs, prop, value);
							});
						},
						onChange: val => {
							vm.cpt_value = val;
						}
					}
				])
			)
		];

		if (_.$val(CONFIGS, "itemSlots.beforeController")) {
			vNodeControllerChildren.unshift(
				/* beforeController插槽 */
				h("xRender", {
					render: _.$val(CONFIGS, "itemSlots.beforeController"),
					payload: { xItem: vm }
				})
			);
		}
		if (_.$val(CONFIGS, "itemSlots.afterController")) {
			vNodeControllerChildren.push(
				/* afterController插槽 */
				h("xRender", {
					render: _.$val(CONFIGS, "itemSlots.afterController"),
					payload: { xItem: vm }
				})
			);
		}

		const vNodeLabel = h(
			"label",
			{
				ref: "refItemLabel",
				vIf: vm.cpt_label,
				staticClass: "xItem_label flex middle"
			},
			[
				h(
					"span",
					{
						vIf: vm.cpt_is_required,
						staticClass: "xItem_label-required"
					},
					["*"]
				),
				hSpan({ staticClass: "xItem_label-text" }, [
					"X_ITEM_LABEL_IS_EMPTY" === vm.cpt_label ? "" : vm.cpt_label
				]),
				h(
					"xTooltip",
					{
						vIf: vm.calTips(),
						// effect: "dark",
						content: vm.calTips(),
						placement: "top-end"
					},
					[
						h("xIcon", {
							icon: "tips",
							staticClass: "ml4"
						})
					]
				),
				h(
					"span",
					{
						staticClass: "xItem_label-colon",
						vIf: vm.cptIsShowItemColon
					},
					[":"]
				)
			]
		);

		const vNodeErrorTips = (() => {
			if (vm.errorTips) {
				if (_.isString(vm.errorTips)) {
					/* 默认 tooltips 弹窗 */
					return hDiv(
						{ class: "xItemerror-tips_wrapper flex middle" },
						h(
							"xTooltip",
							{
								effect: "dark",
								content: vm.errorTips,
								placement: "right"
							},
							[
								h("xIcon", {
									icon:
										PRIVATE_GLOBAL.x_item_error_tips_icon || "exclamationMark",
									staticClass: "xItem_error-msg ml4"
								})
							]
						)
					);
				} else {
					return h("xRender", { render: vm.errorTips });
				}
			} else {
				return null;
			}
		})();

		const vNodeController = hDiv(controllerWrapperProps, vNodeControllerChildren);

		return hDiv(xItemWrapperProps, [
			hDiv({ staticClass: "x-item-label-controller-wrapper" }, [
				/* label */
				vNodeLabel,
				/* controller */
				vNodeController,
				/* 校验错误提示 */
				vNodeErrorTips
			]),
			/* 信息提示 */
			hDiv({ vIf: vm.calMsg(), staticClass: "xItem-msg mt4" }, [vm.calMsg()])
		]);
	};
}
</script>
