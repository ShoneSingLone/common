<script lang="ts">
export default async function () {
	const X_MOVE_CLASS_NAME = "data-xmove";
	const { xLayerTools } = await _.$importVue("/common/libs/layer/xLayer.vue");

	_.$single.body.on(`mousedown.${X_MOVE_CLASS_NAME}`, `.${X_MOVE_CLASS_NAME}`, function (event) {
		const $ele = $(this);
		_.$single.mask.show();
		const clickInfo = _.$getLeftTopFromAbsolute($ele);
		clickInfo.w = $ele.width();
		clickInfo.h = $ele.height();
		/* @ts-ignore */
		const { top, left } = _.$getLeftTopFromTranslate($ele);

		clickInfo.translateX = left;
		clickInfo.translateY = top;

		const id = $ele.attr(X_MOVE_CLASS_NAME);
		const xMoveConfigs = MOVE_ITEM_BINDING[id];

		if (_.$val(xMoveConfigs, "onStart")) {
			xMoveConfigs.onStart({
				$ele,
				clickInfo,
				clickEvent: event
			});
		}
		if (_.$val(xMoveConfigs, "onMoving")) {
			xLayerTools.onMoving = movingEvent => {
				xMoveConfigs.onMoving({
					$ele,
					clickInfo,
					clickEvent: event,
					movingEvent
				});
			};
		}
	});

	const MOVE_ITEM_BINDING = {};

	Vue.directive("xmove", {
		inserted(el, binding) {
			if (binding.value) {
				if (binding.value.onMoving) {
					const $ele = $(el);
					const id = _.$genId("xmove");
					MOVE_ITEM_BINDING[id] = binding.value;
					$ele.addClass(X_MOVE_CLASS_NAME);
					$ele.attr(X_MOVE_CLASS_NAME, id);
				}
			}
		},
		unbind(el) {
			const $ele = $(el);
			const id = $ele.attr(X_MOVE_CLASS_NAME);
			delete MOVE_ITEM_BINDING[id];
		}
	});
}
</script>
