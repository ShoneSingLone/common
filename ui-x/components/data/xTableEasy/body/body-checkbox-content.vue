<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY_CHECKBOX_CONTENT,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
		props: {
			// checkbox option
			checkboxOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			rowKey: {
				type: [String, Number],
				required: true
			},
			internalCheckboxSelectedRowKeys: {
				type: Array,
				default: function () {
					return null;
				}
			}
		},
		data() {
			return {
				isSelected: false
			};
		},
		computed: {
			// disabled
			cpt_disabled() {
				let result = false;

				const { checkboxOption, rowKey } = this;

				if (!checkboxOption) {
					return result;
				}

				const { disableSelectedRowKeys } = checkboxOption;

				if (
					Array.isArray(disableSelectedRowKeys) &&
					disableSelectedRowKeys.includes(rowKey)
				) {
					result = true;
				}

				return result;
			},

			// 是否是受控属性（取决于selectedRowKeys）
			cpt_is_controlled_prop() {
				const { checkboxOption } = this;

				return checkboxOption && Array.isArray(checkboxOption.selectedRowKeys);
			}
		},
		watch: {
			// watch internalCheckboxSelectedRowKeys
			internalCheckboxSelectedRowKeys: {
				handler: function () {
					this.initSelected();
				},
				immediate: true
			}
		},
		methods: {
			// init selected
			initSelected() {
				let result = false;

				const { rowKey, internalCheckboxSelectedRowKeys } = this;

				if (
					Array.isArray(internalCheckboxSelectedRowKeys) &&
					internalCheckboxSelectedRowKeys.includes(rowKey)
				) {
					result = true;
				}

				this.isSelected = result;
			},

			// selected change
			selectedChange(isSelected) {
				const { cpt_is_controlled_prop } = this;

				// 非受控
				if (!cpt_is_controlled_prop) {
					this.isSelected = isSelected;
				}

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY,
					Vue._X_TABLE_EASY_EMIT_EVENTS.CHECKBOX_SELECTED_ROW_CHANGE,
					{
						rowKey: this.rowKey,
						isSelected
					}
				);
			}
		},
		render(h) {
			const { isSelected, selectedChange, cpt_disabled } = this;

			const checkboxProps = {
				class: Vue._X_TABLE_EASY_UTILS.clsName("checkbox-wrapper"),
				props: {
					isControlled: true,
					isSelected: isSelected,
					disabled: cpt_disabled
				},
				on: {
					"on-checked-change": isSelected => selectedChange(isSelected)
				}
			};

			return h(Vue._X_TABLE_EASY_COMPONENTS.VeCheckbox, checkboxProps);
		}
	});
}
</script>
