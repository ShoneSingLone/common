<template>
	<colgroup v-for="(colgroup, index) in colgroups" :key="index">
		<col
			v-for="(col, colIndex) in colgroup"
			:key="colIndex"
			:width="col.width"
			:name="col.colKey" />
	</colgroup>
</template>

<script lang="ts">
export default async function () {
	return {
		name: "xTableEasyColgroup",
		props: {
			colgroups: {
				type: Array,
				required: true
			}
		}
	};
}
</script>
