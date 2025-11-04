<script lang="ts">
export default async function () {
	return function render() {
		const vm = this;
		return h(
			"div",
			{
				vIf: !vm.cpt_is_hide,
				staticClass: "xItem-wrapper flex vertical",
				attrs: {
					"data-form-item-type": vm.itemType,
					"data-form-item-id": vm.cpt_id,
					key: vm.itemType + vm.cpt_id
				},
				props: {
					key: vm.itemType + vm.cpt_id
				}
			},
			[
				h(
					"div",
					{
						staticClass: "x-item-label-controller-wrapper"
					},
					[
						/* label */
						h(
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
								)
							]
						),
						h("xRender", {})
					]
				)
			]
		);
	};
}
</script>
