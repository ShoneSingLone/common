<script lang="ts">
export default async function () {
	/**
	 * Generate a non duplicate ID
	 */
	function getRandomId() {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}

	return {
		getRandomId
	};
}
</script>
