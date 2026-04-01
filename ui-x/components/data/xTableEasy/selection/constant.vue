<script lang="ts">
export default async function () {
	// 实例方法常量，供 selection/index.vue 动态导入使用
	const INSTANCE_METHODS = {
		CLEAR_CURRENT_CELL_RECT: "clearCurrentCellRect",
		CLEAR_NORMAL_END_CELL_RECT: "clearNormalEndCellRect"
	};

	return {
		INSTANCE_METHODS
	};
}
</script>
