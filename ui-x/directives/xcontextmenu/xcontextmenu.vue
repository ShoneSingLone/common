<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	let PanelComponent;

	const REF_ID_ATTR = "data-xcontextmenu-ref";
	const OPTIONS_MAP = new Map(); /* refId → options */
	const PANEL_VM_MAP = new Map(); /* refId → panelVm */

	async function ensurePanel({ refId, event }) {
		const configs = OPTIONS_MAP.get(refId);
		const menus = Array.isArray(configs) ? configs : configs?.menus || [];
		const hasContent = !Array.isArray(configs) && configs?.content;
		if (!menus.length && !hasContent) return;

		let panelVm = PANEL_VM_MAP.get(refId);
		if (panelVm) {
			/* 右键重复触发时复用已有面板，更新位置 */
			panelVm.setPosition(event.clientX, event.clientY);
			panelVm.show();
			return;
		}

		/* 第一次触发，创建面板实例 */
		PanelComponent =
			PanelComponent ||
			(await _.$importVue("/common/ui-x/directives/xcontextmenu/xContextMenuPanel.vue"));

		/* 直接追加到 body，避免受 shadowTemplate（opacity: 0）影响 */
		const $container = $("<div/>");
		$("body").append($container);

		const vm = new Vue({
			...PanelComponent
		});
		vm.refId = refId;
		vm.menus = menus;
		vm.content = configs?.content;
		vm.onNodeClick = configs?.onNodeClick;
		vm.$mount($container[0]);
		vm.setPosition(event.clientX, event.clientY);
		vm.show();

		/* 面板关闭时各回调统一由 onClose 触发器 cleanup */
		vm.onClose = () => {
			PANEL_VM_MAP.delete(refId);
			try {
				vm.$destroy();
			} catch (e) {
				/* ignore */
			}
			const $el = $(vm.$el);
			if ($el.length) $el.remove();
		};

		PANEL_VM_MAP.set(refId, vm);
	}

	/* 【需求】6.4.51 右键菜单：点击外部关闭 + Esc 键关闭 + 滚动关闭 */
	function setupGlobalHandlers() {
		_.$single.doc
			.off("mousedown.xcontextmenu")
			.on("mousedown.xcontextmenu", event => {
				PANEL_VM_MAP.forEach(vm => {
					if (!vm.visible) return;
					const $el = $(vm.$el);
					if ($el.length && !$el.is(event.target) && !$el.has(event.target).length) {
						vm.hide();
					}
				});
			})
			.off("keydown.xcontextmenu")
			.on("keydown.xcontextmenu", event => {
				if (event.key === "Escape") {
					PANEL_VM_MAP.forEach(vm => vm.hide());
				}
			});
		/* 【需求】6.4.51 右键菜单：滚动时关闭所有可见菜单，与业界主流行为一致 */
		/* scroll 不冒泡，改用冒泡的 wheel（鼠标滚轮/触控板）和 touchmove（触摸滑动） */
		/* 如果滚动事件发生在菜单内部（如 content 模式有可滚动区域），不关闭菜单 */
		_.$single.doc
			.off("wheel.xcontextmenu touchmove.xcontextmenu")
			.on("wheel.xcontextmenu touchmove.xcontextmenu", event => {
				PANEL_VM_MAP.forEach(vm => {
					if (!vm.visible) return;
					const $el = $(vm.$el);
					if ($el.length && ($el.is(event.target) || $el.has(event.target).length)) {
						return;
					}
					vm.hide();
				});
			});
	}
	setupGlobalHandlers();

	return Vue.directive("xcontextmenu", {
		name: "xcontextmenu",
		inserted(ele, binding) {
			const configs = binding.value;
			const refId = _.$genId("xcontextmenu");

			OPTIONS_MAP.set(refId, configs);
			$(ele).attr(REF_ID_ATTR, refId);

			/* 【需求】6.4.51 右键菜单：绑定 contextmenu 事件，保存 handler 以便 cleanup */
			const handler = event => {
				event.preventDefault();
				event.stopPropagation();
				ensurePanel({ refId, event });
			};
			ele.addEventListener("contextmenu", handler);
			$(ele).data("xcontextmenu-handler", handler);
		},
		componentUpdated(ele, binding) {
			const refId = $(ele).attr(REF_ID_ATTR);
			if (refId) {
				OPTIONS_MAP.set(refId, binding.value);
			}
		},
		unbind(ele) {
			const refId = $(ele).attr(REF_ID_ATTR);
			if (refId) {
				/* 移除事件监听 */
				const handler = $(ele).data("xcontextmenu-handler");
				if (handler) {
					ele.removeEventListener("contextmenu", handler);
				}
				/* 销毁面板实例 */
				const vm = PANEL_VM_MAP.get(refId);
				if (vm) {
					vm.$destroy();
					$(vm.$el).remove();
					PANEL_VM_MAP.delete(refId);
				}
				OPTIONS_MAP.delete(refId);
				$(ele).removeAttr(REF_ID_ATTR);
			}
		}
	});
}
</script>
