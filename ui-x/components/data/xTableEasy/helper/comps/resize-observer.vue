<style lang="less"></style>
<script lang="ts">
export default async function () {
	const [{ addResizeListener, removeResizeListener }] = await _.$importVue([
		"/common/utils/utils.vue"
	]);
	return defineComponent({
		name: "vue-dom-resize-observer",
		props: {
			tagName: {
				type: String,
				required: true
			},
			id: {
				type: [String, Number],
				default: null
			}
		},
		methods: {
			resizeListener(contentRect) {
				const { left, top, width, height } = contentRect;
				this.$emit("on-dom-resize-change", {
					key: this.id,
					left,
					top,
					width,
					height
				});
			}
		},
		mounted() {
			addResizeListener(this.$el, this.resizeListener);
		},
		destroyed() {
			removeResizeListener(this.$el, this.resizeListener);
		},
		render() {
			return h(this.tagName, this.$slots.default);
		}
	});
}
</script>
