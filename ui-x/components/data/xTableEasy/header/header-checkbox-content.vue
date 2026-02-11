<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_HEADER_CHECKBOX_CONTENT,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
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

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE,
					Vue._X_TABLE_EASY_EMIT_EVENTS.CHECKBOX_SELECTED_ALL_CHANGE,
					{
						isSelected
					}
				);
			},

			// set selected all info
			setSelectedAllInfo({ isSelected, isIndeterminate }) {
				this.isSelected = isSelected;
				this.isIndeterminate = isIndeterminate;
			}
		},
		mounted() {
			// receive selected all info
			this.$on(Vue._X_TABLE_EASY_EMIT_EVENTS.CHECKBOX_SELECTED_ALL_INFO, params => {
				this.setSelectedAllInfo(params);
			});
		},
		render(h) {
			const { isSelected, isIndeterminate, selectedChange } = this;

			const checkboxProps = {
				class: Vue._X_TABLE_EASY_UTILS.clsName("checkbox-wrapper"),
				props: {
					isControlled: true,
					isSelected: isSelected,
					indeterminate: isIndeterminate
				},
				on: {
					"on-checked-change": isSelectedParam => selectedChange(isSelectedParam)
				}
			};

			return h(Vue._X_TABLE_EASY_COMPONENTS.VeCheckbox, checkboxProps);
		}
	});
}
</script>
