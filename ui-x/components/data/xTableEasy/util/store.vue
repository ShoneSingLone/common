<script lang="ts">
export default async function () {
	return {
		// 简单的状态存储
		store: {
			data: {},
			set(key, value) {
				this.data[key] = value;
			},
			get(key) {
				return this.data[key];
			},
			remove(key) {
				delete this.data[key];
			},
			clear() {
				this.data = {};
			}
		}
	};
}
</script>
