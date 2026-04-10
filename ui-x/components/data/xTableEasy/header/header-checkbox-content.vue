<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [{ COMPS_NAME, EMIT_EVENTS }, { clsName }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_HEADER_CHECKBOX_CONTENT,
		props: {
			// checkbox option
			checkboxOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		data() {
			return {
				// is selected
				isSelected: false,
				isIndeterminate: false
			};
		},

		methods: {
			// selected change
			selectedChange(isSelected) {
				this.isSelected = isSelected;

				this.dispatch(COMPS_NAME.VE_TABLE, EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE, {
					isSelected
				});
			},

			// set selected all info
			setSelectedAllInfo({ isSelected, isIndeterminate }) {
				this.isSelected = isSelected;
				this.isIndeterminate = isIndeterminate;
			}
		},
		mounted() {
			// receive selected all info
			this.$on(EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO, params => {
				this.setSelectedAllInfo(params);
			});
		},
		render(h) {
			const { isSelected, isIndeterminate, selectedChange } = this;

			// 使用 h 函数创建组件
			return h("xCheckbox", {
				class: clsName("checkbox-wrapper"),
				props: {
					value: isSelected,
					indeterminate: isIndeterminate
				},
				on: {
					change: isSelectedParam => selectedChange(isSelectedParam)
				}
			});
		}
	};
}
</script>
