<template>
	<colgroup>
		<template v-for="(colgroup, index) in colgroups">
			<col
				v-for="(col, colIndex) in colgroup"
				:key="colIndex"
				:width="col.width"
				:name="col.colKey" />
		</template>
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
