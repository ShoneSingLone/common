<script lang="ts">
export default async function () {
	// 实例方法常量，供 editor/index.vue 动态导入使用
	const INSTANCE_METHODS = {
		TEXTAREA_ADD_NEW_LINE: "textareaAddNewLine",
		TEXTAREA_SELECT: "textareaSelect"
	};

	return {
		INSTANCE_METHODS
	};
}
</script>
