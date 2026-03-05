<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖模块
	const [{ clsName }, { COMPS_NAME }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_BODY_TR_SCROLLING,
		props: {
			colgroups: {
				type: Array,
				required: true
			}
		},
		computed: {
			// tr class
			cpt_tr_class() {
				let result = null;

				result = {
					[clsName("body-tr")]: true,
					[clsName("body-row-scrolling")]: true
				};

				return result;
			}
		},

		render(h) {
			const { colgroups } = this;

			const props = {
				class: this.cpt_tr_class
			};

			return h("tr", props, [
				h("td", {
					attrs: {
						colSpan: colgroups.length
					}
				})
			]);
		}
	};
}
</script>
