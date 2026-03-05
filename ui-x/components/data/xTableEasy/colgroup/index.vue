<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [{ getValByUnit }, { COMPS_NAME }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/utils/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_COLGROUP,
		props: {
			colgroups: {
				type: Array,
				required: true
			},
			enableColumnResize: {
				type: Boolean,
				required: true
			}
		},
		methods: {
			getValByUnit(item) {
				const { enableColumnResize } = this;

				let width;
				// 开启 column resize
				if (enableColumnResize) {
					// 解决使用 _columnResizeWidth 在多表头下宽度计算异常的问题
					width = item._columnResizeWidth ? item._columnResizeWidth : item.width;
				} else {
					width = item.width;
				}
				return getValByUnit(width);
			}
		},
		render(h) {
			return h(
				"colgroup",
				{},
				this.colgroups.map(item => {
					return h("col", {
						key: item.key,
						style: {
							width: this.getValByUnit(item)
						}
					});
				})
			);
		}
	};
}
</script>
