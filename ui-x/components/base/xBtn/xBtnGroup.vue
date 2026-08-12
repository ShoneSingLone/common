<template>
	<div class="el-button-group">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return {
		name: "xBtnGroup"
	};
}
</script>
