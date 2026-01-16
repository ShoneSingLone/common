<script lang="ts">
export default async function () {
	return {
		methods: {
			// 剪贴板操作相关方法
			onBeforeCopy() {
				return true;
			},

			onAfterCopy() {
				return true;
			},

			onBeforePaste() {
				return true;
			},

			onAfterPaste() {
				return true;
			},

			onBeforeCut() {
				return true;
			},

			onAfterCut() {
				return true;
			},

			onBeforeDelete() {
				return true;
			},

			onAfterDelete() {
				return true;
			}
		}
	};
}
</script>
