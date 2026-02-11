<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY_TR_SCROLLING,
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
					[Vue._X_TABLE_EASY_UTILS.clsName("body-tr")]: true,
					[Vue._X_TABLE_EASY_UTILS.clsName("body-row-scrolling")]: true
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
						colspan: colgroups.length
					}
				})
			]);
		}
	});
}
</script>
