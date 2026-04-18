<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [{ COMPS_NAME, EMIT_EVENTS }, { clsName }] = await Promise.all([
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_BODY_CHECKBOX_CONTENT,
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
			disabled() {
				let result = false;

				const { checkboxOption, rowKey } = this;

				if (!checkboxOption) {
					return;
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
			isControlledProp() {
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
				const { isControlledProp } = this;

				// 非受控
				if (!isControlledProp) {
					this.isSelected = isSelected;
				}

				this.dispatch(COMPS_NAME.VE_TABLE_BODY, EMIT_EVENTS.CHECKBOX_SELECTED_ROW_CHANGE, {
					rowKey: this.rowKey,
					isSelected
				});
			}
		},
		render(h) {
			const { isSelected, selectedChange, disabled } = this;

			return h("xCheckbox", {
				class: clsName("checkbox-wrapper"),
				props: {
					value: isSelected,
					disabled
				},
				on: {
					change: isSelected => selectedChange(isSelected)
				}
			});
		}
	};
}
</script>
