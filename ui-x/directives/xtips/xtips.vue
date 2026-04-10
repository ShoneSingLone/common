<script lang="ts">
export default async function () {
	let PopoverComponent;

	const TIPS_OPTIONS_MAP = new Map();
	/* 可能是Vue实例，也可能是原始dom */
	const REFRENCE_MAP = new Map();
	const POPOVER_MAP = new Map();

	const X_TIPS_REF = "x-tips-ref";

	const SELECTOR_REFERENCE = "data-xtips-reference";
	const SELECTOR_POPOVER = "data-xtips-popover";
	const CLASS_NAME_REFERENCE = "xtips-reference";

	/* 目标元素 */
	const EVENT_UI_TARGET = "X_TARGET";
	/* 开发的时候不想关闭，可以把时间值调高 */
	// const TIMEOUT_DELAY = 200 * 10000;
	const TIMEOUT_DELAY = 200;

	function setOptions(refId, options) {
		const oldOptions = TIPS_OPTIONS_MAP.get(refId);
		if (_.isString(options)) {
			/* 简写 */
			TIPS_OPTIONS_MAP.set(refId, {
				content: options,
				placement: "top",
				trigger: "hover"
			});
		} else if (_.isPlainObject(options)) {
			if (hasOwn(options, "_btnInnerTips")) {
				/* 只有btn disabled是true的时候才会显示 */
				if (options._btnInnerTips) {
					TIPS_OPTIONS_MAP.set(refId, _.merge(oldOptions, options));
				}
			} else {
				TIPS_OPTIONS_MAP.set(refId, _.merge(oldOptions, options));
			}
		}
	}

	/* placement offset arrowOffset */
	function usePops(ele) {
		const $ele = $(ele);
		const refId = $ele.attr(SELECTOR_REFERENCE);
		const options = TIPS_OPTIONS_MAP.get(refId) || {};
		const trigger = options.trigger || "hover";
		const vmRefrence = REFRENCE_MAP.get(refId);
		const vmPopover = POPOVER_MAP.get(refId);
		const $popover = $(`[${SELECTOR_POPOVER}=${refId}]`);

		const showAble = !!options.content;
		return {
			showAble,
			trigger,
			$ele,
			refId,
			$popover,
			vmRefrence,
			vmPopover
		};
	}

	async function ensurePopover({ ele }) {
		/* 使用 usePops 获取弹出框的相关配置 */
		const { trigger, $ele, refId, $popover, vmRefrence } = usePops(ele);

		/* 如果弹出框已存在，直接返回 */
		if ($popover.length) {
			return $popover;
		}

		/* 创建一个新的弹出框元素并挂载到 DOM 中 */
		const $newPopover = $("<div/>", {
			[SELECTOR_POPOVER]: refId
		});
		_.$single.shadowTemplate.append($newPopover);

		/* 如果PopoverComponent已经加载，则不需要再加载 */
		PopoverComponent =
			PopoverComponent ||
			(await _.$importVue("/common/ui-x/directives/xtips/xtipsDefaultPopover.vue"));

		const _PopoverComponent = { ...PopoverComponent };
		_PopoverComponent.parent = vmRefrence;

		const vmPopover = new Vue(_PopoverComponent);
		POPOVER_MAP.set(refId, vmPopover);

		/* popover使用onPopoverChange */
		vmPopover.refId = refId;
		vmPopover.options = TIPS_OPTIONS_MAP.get(refId);
		vmPopover.options && (vmPopover.options.$reference = $ele);

		vmRefrence.onPopoverChange = vmRefrence.onPopoverChange || {};
		vmRefrence.onPopoverChange[refId] = val => {
			if (!val) {
				/* 如果是click，则延迟清除 */
				if (["click", "rightClick"].includes(trigger)) {
					vmRefrence.popoverClearTimer = setTimeout(() => {
						vmPopover.$destroy();
						$newPopover.remove();
						vmRefrence.popoverClearTimer = null;
					}, 32);
				} else {
					vmPopover.$destroy();
					$newPopover.remove();
				}
			}
		};

		vmPopover.$on("hook:mounted", () => {
			if (_.isFunction(vmPopover.options?.onMounted)) {
				vmPopover.options.onMounted.call(vmPopover, {
					popoverVm: vmPopover,
					referenceVm: vmRefrence
				});
			}
		});

		vmPopover.$mount(`[${SELECTOR_POPOVER}=${refId}]`);

		/* 挂载成功后即可展示，除非是manual */
		vmPopover.options.visible = trigger === "manual" ? vmPopover.options.visible : true;

		$(vmPopover.$el).attr({
			[SELECTOR_POPOVER]: refId
		});

		return $newPopover;
	}

	function handleClick(event) {
		const { trigger, showAble } = usePops(this);
		if (!showAble) return;
		if (["click", "rightClick"].includes(trigger)) {
			event.preventDefault();
			event.stopPropagation();
			ensurePopover({ ele: this });
		}
	}

	function handleEnterReference(event) {
		const { trigger, showAble } = usePops(this);
		if (!showAble) return;
		if (trigger === "hover") {
			ensurePopover({ ele: this });
		}
	}

	function handleFocusinReference(event) {
		const { trigger, showAble } = usePops(this);
		if (!showAble) return;
		if (trigger === "focus") {
			ensurePopover({ ele: this });
		}
	}

	function clear(el) {
		const { refId, vmPopover, $popover } = usePops(el);
		vmPopover && vmPopover.$destroy();
		$popover.remove();
		TIPS_OPTIONS_MAP.delete(refId);
		REFRENCE_MAP.delete(refId);
		POPOVER_MAP.delete(refId);
	}

	_.$single.doc
		/* click处理 */
		.on(`click.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleClick)
		.on(
			`contextmenu.${EVENT_UI_TARGET}`,
			`[${SELECTOR_REFERENCE}][data-trigger=rightClick]`,
			handleClick
		)
		/* hover处理 */
		.on(`mouseenter.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleEnterReference)
		/* focus处理 */
		.on(`focusin.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleFocusinReference);

	return Vue.directive("xtips", {
		name: "xtips",
		/* @ts-ignore */
		inserted(ele, binding, vnode) {
			const configs = binding.value;
			/* v-xtips绑定在dom元素上 */
			const vm = vnode.componentInstance || vnode.context;
			if (_.isFunction(binding.value.onUpdated) && vm) {
				binding.value.onUpdated(vm);
			}

			const refId = _.$genId(X_TIPS_REF);
			setOptions(refId, configs);
			REFRENCE_MAP.set(refId, vm);
			$(ele)
				.addClass(CLASS_NAME_REFERENCE)
				.attr({ [SELECTOR_REFERENCE]: refId })
				.data("oldValue", { ...configs });

			/* 如果 trigger 为 manual 且 visible 为 true，则直接显示 popover */
			if (configs.trigger === "manual" && configs.visible) {
				ensurePopover({ ele });
			}
		},
		componentUpdated(ele, binding) {
			const { refId, $popover, vmPopover, $ele } = usePops(ele);
			const oldValue = $ele.data("oldValue");
			$ele.data("oldValue", { ...binding.value });

			if (hasOwn(binding.value, "_btnInnerTips")) {
				return;
			}

			/* 合并两次比较，减少重复计算 */
			const normalizedOldValue = _.omit(oldValue, ["$reference"]);
			if (
				_.$isEqualByObjVal(binding.value, normalizedOldValue) ||
				_.$isEqualByObjVal(binding.value, oldValue)
			) {
				return;
			}

			setOptions(refId, binding.value);

			if (_.$val(binding, "value.trigger") === "manual") {
				if ($popover.length) {
					vmPopover && vmPopover.$destroy();
					$popover.remove();
				}
				ensurePopover({ ele });
			}
		},
		unbind(ele) {
			clear(ele);
		}
	});
}
</script>
<style lang="less">
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
	position: absolute;
	display: block;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
}

.el-popper .popper__arrow {
	border-width: 6px;
	-webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
	filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}

.el-popper .popper__arrow::after {
	content: " ";
	border-width: 6px;
}

.el-popper[x-placement^="top"] {
	margin-bottom: 12px;
}

.el-popper[x-placement^="top"] .popper__arrow {
	bottom: -6px;
	left: 50%;
	margin-right: 3px;
	border-top-color: var(--el-border-color-lighter);
	border-bottom-width: 0;
}

.el-popper[x-placement^="top"] .popper__arrow::after {
	bottom: 1px;
	margin-left: -6px;
	border-top-color: #fff;
	border-bottom-width: 0;
}

.el-popper[x-placement^="bottom"] {
	margin-top: 12px;
}

.el-popper[x-placement^="bottom"] .popper__arrow {
	top: -6px;
	left: 50%;
	margin-right: 3px;
	border-top-width: 0;
	border-bottom-color: var(--el-border-color-lighter);
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
	top: 1px;
	margin-left: -6px;
	border-top-width: 0;
	border-bottom-color: #fff;
}

.el-popper[x-placement^="right"] {
	margin-left: 12px;
}

.el-popper[x-placement^="right"] .popper__arrow {
	top: 50%;
	left: -6px;
	margin-bottom: 3px;
	border-right-color: var(--el-border-color-lighter);
	border-left-width: 0;
}

.el-popper[x-placement^="right"] .popper__arrow::after {
	bottom: -6px;
	left: 1px;
	border-right-color: #fff;
	border-left-width: 0;
}

.el-popper[x-placement^="left"] {
	margin-right: 12px;
}

.el-popper[x-placement^="left"] .popper__arrow {
	top: 50%;
	right: -6px;
	margin-bottom: 3px;
	border-right-width: 0;
	border-left-color: var(--el-border-color-lighter);
}

.el-popper[x-placement^="left"] .popper__arrow::after {
	right: 1px;
	bottom: -6px;
	margin-left: -6px;
	border-right-width: 0;
	border-left-color: #fff;
}
</style>
