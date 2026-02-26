<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// 使用 _.$importVue() 加载依赖
	const [VeRadio, { COMPS_NAME, EMIT_EVENTS }, { clsName }] = await Promise.all([
		_.$importVue("vue-easytable/packages/ve-radio"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/constant.vue"),
		_.$importVue("/common/ui-x/components/data/xTableEasy/util/index.vue")
	]);

	return {
		name: COMPS_NAME.VE_TABLE_BODY_RADIO_CONTENT,
		props: {
			// checkbox option
			radioOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			rowKey: {
				type: [String, Number],
				required: true
			},
			internalRadioSelectedRowKey: {
				type: [String, Number],
				default: null
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

				const { radioOption, rowKey } = this;

				if (!radioOption) {
					return result;
				}

				const { disableSelectedRowKeys } = radioOption;

				if (
					Array.isArray(disableSelectedRowKeys) &&
					disableSelectedRowKeys.includes(rowKey)
				) {
					result = true;
				}

				return result;
			},

			// 是否是受控属性（取决于selectedRowKey）
			isControlledProp() {
				const { radioOption } = this;

				return radioOption && Object.keys(radioOption).includes("selectedRowKey");
			}
		},
		watch: {
			// watch internal radio SelectedRowKey
			internalRadioSelectedRowKey: {
				handler: function () {
					this.initSelected();
				},
				immediate: true
			}
		},
		methods: {
			// init selected
			initSelected() {
				this.isSelected = this.internalRadioSelectedRowKey === this.rowKey;
			},

			// selected change
			selectedChange() {
				const { isControlledProp } = this;

				// 非受控
				if (!isControlledProp) {
					this.isSelected = true;
				}

				this.dispatch(COMPS_NAME.VE_TABLE_BODY, EMIT_EVENTS.RADIO_SELECTED_ROW_CHANGE, {
					rowKey: this.rowKey
				});
			}
		},
		render(h) {
			const { isSelected, selectedChange, disabled } = this;

			const radioProps = {
				class: clsName("radio-wrapper"),
				props: {
					isControlled: true,
					isSelected,
					disabled
				},
				on: {
					"on-radio-change": () => selectedChange()
				}
			};

			return h(VeRadio, radioProps);
		}
	};
}
</script>
