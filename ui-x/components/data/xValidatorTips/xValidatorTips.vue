<template>
	<div>{{ THIS_FILE_URL }}</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { THIS_FILE_URL };
		}
	});
}
</script>
