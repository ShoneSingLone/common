<script lang="ts">
export default async function () {
	// 为 utils/resize-event.vue 提供 polyfill 包装
	const polyfillModule = await _.$importVue("resize-observer-polyfill");
	const ResizeObserver =
		polyfillModule && polyfillModule.default ? polyfillModule.default : polyfillModule;

	return {
		default: ResizeObserver
	};
}
</script>
