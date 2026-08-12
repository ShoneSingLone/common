<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const virtualizedListProps = buildProps({
		cache,
		estimatedItemSize,
		layout,
		initScrollOffset,
		total,
		itemSize,
		...virtualizedProps
	});
	return {
		virtualizedListProps
	};
}
</script>
