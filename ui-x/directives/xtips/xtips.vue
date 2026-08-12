<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 【修复】2026-08-10：注册全局 hover 前预加载弹层组件，避免首次移入仅等待异步组件、再次移入才即时显示。
	let PopoverComponent = await _.$importVue(
		"/common/ui-x/directives/xtips/xtipsDefaultPopover.vue"
	);

	const TIPS_OPTIONS_MAP = new Map();
	/* 可能是Vue实例，也可能是原始dom */
	const REFRENCE_MAP = new Map();
	const POPOVER_MAP = new Map();

	const X_TIPS_REF = "x-tips-ref";

	const SELECTOR_REFERENCE = "data-xtips-reference";
	const SELECTOR_POPOVER = "data-xtips-popover";
	// 【需求】2026-08-10：声明普通 DOM 全局提示属性与专用弹层类，复用 xtips 生命周期并隔离尺寸样式。
	const SELECTOR_DATA_TITLE = "data-xtips-title";
	// 【修复】2026-08-10：动态写入 data-xtips-title 后通过自定义事件通知全局 xtips 立即展示。
	const EVENT_DATA_TITLE_READY = "xtips-title-ready";
	const CLASS_NAME_DATA_TITLE = "x-xtips--data-title";
	const CLASS_NAME_REFERENCE = "xtips-reference";
	const GLOBAL_REF_IDS = new Set();

	/* 目标元素 */
	const EVENT_UI_TARGET = "X_TARGET";

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

		// 【需求】2026-08-10：全局属性在每次 hover 时读取实时值，动态属性无需额外监听即可生效。
		if (GLOBAL_REF_IDS.has(refId)) {
			options.content = $ele.attr(SELECTOR_DATA_TITLE) || "";
		}
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

		/* 【修复】2026-08-10：弹层组件已在指令初始化阶段加载，首次 hover 直接同步进入实例创建。 */
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
				// 【需求】2026-08-10：全局属性弹层关闭后释放临时引用，保证下一次 hover 重读最新属性值。
				if (GLOBAL_REF_IDS.has(refId)) {
					TIPS_OPTIONS_MAP.delete(refId);
					REFRENCE_MAP.delete(refId);
					POPOVER_MAP.delete(refId);
					GLOBAL_REF_IDS.delete(refId);
					$ele.removeClass(CLASS_NAME_REFERENCE).removeAttr(SELECTOR_REFERENCE);
					vmRefrence.$destroy();
					console.log("[data-xtips-title] 异步关闭提示完成", {
						element: $ele[0],
						content: vmPopover.options?.content,
						removed: !$newPopover.parent().length
					});
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
		// 【需求】2026-08-10：记录全局属性弹层创建关键结果，便于核对元素、实时内容与挂载状态。
		if (GLOBAL_REF_IDS.has(refId)) {
			console.log("[data-xtips-title] 提示创建完成", {
				element: $ele[0],
				content: vmPopover.options?.content,
				mounted: !!vmPopover.$el
			});
		}

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
		const { refId, vmPopover, vmRefrence, $popover } = usePops(el);
		vmPopover && vmPopover.$destroy();
		$popover.remove();
		TIPS_OPTIONS_MAP.delete(refId);
		REFRENCE_MAP.delete(refId);
		POPOVER_MAP.delete(refId);
		// 【需求】2026-08-10：全局属性提示关闭后移除临时引用状态，下次 hover 重新读取动态属性。
		if (GLOBAL_REF_IDS.has(refId)) {
			GLOBAL_REF_IDS.delete(refId);
			vmRefrence && vmRefrence.$destroy();
			$(el).removeClass(CLASS_NAME_REFERENCE).removeAttr(SELECTOR_REFERENCE);
		}
	}

	// 【需求】2026-08-10：通过事件委托为动态 DOM 建立临时 xtips 引用；已有 v-xtips 引用时直接让指令优先。
	function handleEnterDataTitle() {
		const $ele = $(this);
		const content = $ele.attr(SELECTOR_DATA_TITLE) || "";
		if (!content || $ele.attr(SELECTOR_REFERENCE)) return;

		const refId = _.$genId(X_TIPS_REF);
		const vmRefrence = new Vue();
		setOptions(refId, {
			content,
			placement: "top",
			trigger: "hover",
			popperClass: CLASS_NAME_DATA_TITLE
		});
		REFRENCE_MAP.set(refId, vmRefrence);
		GLOBAL_REF_IDS.add(refId);
		$ele.addClass(CLASS_NAME_REFERENCE).attr({ [SELECTOR_REFERENCE]: refId });
		console.log("[data-xtips-title] hover 创建提示请求", {
			element: this,
			content,
			refId
		});
		ensurePopover({ ele: this });
	}

	_.$single.doc
		// 【修复】2026-08-10：静态属性由 mouseenter 委托处理；列表动态补属性后由 ready 事件立即触发，避免依赖委托器执行顺序。
		.on(`mouseenter.${EVENT_UI_TARGET}`, `[${SELECTOR_DATA_TITLE}]`, handleEnterDataTitle)
		// 【修复】2026-08-10：使用委托选择器，确保 ready 事件回调中的 this 指向动态添加属性的目标元素。
		.on(
			`${EVENT_DATA_TITLE_READY}.${EVENT_UI_TARGET}`,
			`[${SELECTOR_DATA_TITLE}]`,
			handleEnterDataTitle
		)
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
