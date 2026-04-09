<script lang="ts">
export default async function () {
	// 导入依赖
	const { PREFIX_CLS } = await _.$importVue(
		"/common/ui-x/components/data/contextmenu/util/constant.vue"
	);

	/*
	 * @clsName
	 * @desc  get class name
	 * @param {string} cls - class
	 */
	function clsName(cls) {
		return PREFIX_CLS + cls;
	}

	return {
		clsName
	};
}
</script>
