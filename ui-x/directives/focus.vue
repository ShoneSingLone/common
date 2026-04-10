<script lang="ts">
export default async function () {
	// 包装 focus 指令，供编辑器输入框等场景按需聚焦/选中文本
	return {
		bind: function (el, { value }, vnode) {
			if (!value) {
				return;
			}

			const { focus, select } = value;
			vnode.context.$nextTick(() => {
				if (focus) {
					el.focus();
				}
				if (select) {
					el.select();
				}
			});
		},
		update: function (el, { value }) {
			if (!value) {
				return;
			// }

			const { focus } = value;
			if (focus) {
				el.focus();
			}
		}
	};
}
</script>
