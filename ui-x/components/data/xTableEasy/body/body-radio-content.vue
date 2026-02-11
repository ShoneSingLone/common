<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return Vue.defineComponent({
		name: Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY_RADIO_CONTENT,
		mixins: [Vue._X_TABLE_EASY_MIXINS.emitter],
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
			cpt_disabled() {
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
			cpt_is_controlled_prop() {
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
				const { cpt_is_controlled_prop } = this;

				// 非受控
				if (!cpt_is_controlled_prop) {
					this.isSelected = true;
				}

				this.dispatch(
					Vue._X_TABLE_EASY_COMPS_NAME.VE_TABLE_BODY,
					Vue._X_TABLE_EASY_EMIT_EVENTS.RADIO_SELECTED_ROW_CHANGE,
					{
						rowKey: this.rowKey
					}
				);
			}
		},
		render(h) {
			const { isSelected, selectedChange, cpt_disabled } = this;

			const radioProps = {
				class: Vue._X_TABLE_EASY_UTILS.clsName("radio-wrapper"),
				props: {
					isControlled: true,
					isSelected,
					disabled: cpt_disabled
				},
				on: {
					"on-radio-change": () => selectedChange()
				}
			};

			return h(Vue._X_TABLE_EASY_COMPONENTS.VeRadio, radioProps);
		}
	});
}
</script>
