<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	// util/index.vue
	const { clsName } = await _.$importVue(
		"/common/ui-x/components/data/xTableEasy/util/index.vue"
	);

	// footer-tr.vue
	const FooterTr = await _.$importVue(
		"/common/ui-x/components/data/xTableEasy/footer/footer-tr.vue"
	);

	// util/constant.vue
	const { COMPS_NAME } = await _.$importVue(
		"/common/ui-x/components/data/xTableEasy/util/constant.vue"
	);

	return {
		name: COMPS_NAME.VE_TABLE_FOOTER,
		props: {
			colgroups: {
				type: Array,
				required: true
			},
			footerData: {
				type: Array,
				required: true
			},
			hasFixedColumn: {
				type: Boolean,
				default: false
			},
			allRowKeys: {
				type: Array,
				required: true
			},
			rowKeyFieldName: {
				type: String,
				default: null
			},
			// cell style option
			cellStyleOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// event custom option
			eventCustomOption: {
				type: Object,
				default: function () {
					return null;
				}
			},
			// footer rows
			footerRows: {
				type: Array,
				default: function () {
					return [];
				}
			},
			// fixed footer
			fixedFooter: {
				type: Boolean,
				default: true
			},
			// cell span option
			cellSpanOption: {
				type: Object,
				default: function () {
					return null;
				}
			}
		},
		computed: {
			// footer class
			cpt_footerClass() {
				return {
					[clsName("fixed-footer")]: this.fixedFooter
				};
			}
		},
		methods: {
			// get tr key
			getTrKey({ rowData, rowIndex }) {
				let result = rowIndex;

				const { rowKeyFieldName } = this;
				if (rowKeyFieldName) {
					result = rowData[rowKeyFieldName];
				}
				return result;
			}
		},
		render(h) {
			const { colgroups, rowKeyFieldName, cellStyleOption } = this;

			return h(
				"tfoot",
				{
					class: this.cpt_footerClass
				},
				this.footerData.map((rowData, rowIndex) => {
					const trProps = {
						key: this.getTrKey({ rowData, rowIndex }),
						props: {
							rowIndex,
							rowData,
							colgroups,
							rowKeyFieldName,
							cellStyleOption,
							footerRows: this.footerRows,
							fixedFooter: this.fixedFooter,
							cellSpanOption: this.cellSpanOption,
							eventCustomOption: this.eventCustomOption
						}
					};

					return h(FooterTr, trProps);
				})
			);
		}
	};
}
</script>
