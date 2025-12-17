<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const { useProps } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const RULES = await _.$importVue("/common/utils/rules.vue");
	const { EVENT_ARRAY } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	const { useAutoResize } = _xUtils;

	/* 懒加载对应的渲染器  */
	const _xItem_lazyLoadRender = {
		ItemAsWrapper: false,
		NormalRender: false,
		ReadonlyAsRender: false
	};

	/* TODO:
  xForm disabled
  xTable disabled
  xTableRow disabled
  xTableCol disabled
  */
	/* cpt_configs {
		  label:string
		  disabled:boolean||function
		  isHide:boolean||function
		  itemType?:默认xItemInput，
		  once:function 挂载的时候调用一次
		  onEmitValue:function value每次变动后触发
   } */

	return {
		name: "xItem",
		componentName: "xItem",
		props: [
			"readonly",
			"configs",
			"value",
			"payload",
			"readOnlyAs",
			/* 直接加在xItem上 */
			"label",
			"rules",
			"disabled"
		],

		provide() {
			const xItem = this;
			return {
				xItem: xItem
			};
		},
		inject: {
			X_ITEM_READONLY: {
				type: Boolean,
				default: false
			}
		},
		model: {
			prop: "value",
			event: "change"
		},
		setup(props) {
			const vm = this;

			const { onMounted: configsOnMounted } = vm.configs || {};

			if (configsOnMounted) {
				onMounted(() => {
					configsOnMounted.call(vm.cpt_configs, {
						xItem: vm,
						props
					});
				});
			}

			/*** xItem对外暴露自身实例*/
			vm.$emit("setup", { xItem: vm });
			const { cptPlaceholder } = useProps(vm);

			function forceUpdate() {
				vm.$forceUpdate();
			}

			_.$single.win.on("X_ITEM_RENDER_UPDATE", forceUpdate);

			onBeforeUnmount(() => {
				_.$single.win.off("X_ITEM_RENDER_UPDATE", forceUpdate);
			});

			/**
			 * 配合modifyItemsAttrs的私有变量
			 */
			const privateState = reactive({
				isDisabled: ""
			});

			const cpt_configs = computed({
				get() {
					if (vm.configs) {
						return vm.configs;
					} else if (vm.CONFIGS_ONLY_AS_WRAPPER) {
						return vm.CONFIGS_ONLY_AS_WRAPPER;
					} else if (this.$slots.default) {
						/*<xItem :label="'X_ITEM_LABEL_IS_EMPTY' :rule="rules"/>
						 * 可以为自定义空间提供validator方法
						 * X_ITEM_LABEL_IS_EMPTY为不显示label
						 * 不同于label 为“”，
						 * */
						vm.CONFIGS_ONLY_AS_WRAPPER = new Proxy(
							{
								THIS_CONFIGS_ONLY_FOR_LABEL: true,
								label: this.label
							},
							{
								get(obj, prop) {
									return obj[prop];
								},
								set(obj, prop, value) {
									obj[prop] = value;
									return true;
								}
							}
						);

						if (this.rules) {
							vm.CONFIGS_ONLY_AS_WRAPPER.rules = this.rules;
						}
						return vm.CONFIGS_ONLY_AS_WRAPPER;
					} else {
						console.error("xItem configs either not set or not a function.", vm);
						return {};
					}
				},
				set(val) {
					vm.CONFIGS_ONLY_AS_WRAPPER = val;
				}
			});

			// cpt_configs.value = reactive(cpt_configs.value);
			Vue._X_ITEM_VM_S = Vue._X_ITEM_VM_S || {};

			/* options\disabled\readOnly\做统一处理，其他的使用透传 */

			/* options()计算后的数组，有find等数组的方法 */
			vm._calOptionsArray = [];
			let cpt_options = computed(() => {
				const optionsProperty = _.find(
					cpt_configs.value,
					(val, prop) => prop === "options"
				);
				if (
					_.isFunction(optionsProperty) ||
					_.$val(cpt_configs, "value.options._is_function")
				) {
					cpt_configs.value.options._is_function = true;
					cpt_configs.value.options = new Proxy(cpt_configs.value.options, {
						get(obj, prop) {
							try {
								return vm._calOptionsArray[prop];
							} catch (error) {
								return obj[prop];
							}
						}
					});
					vm._calOptionsArray = cpt_configs.value.options({
						xItem: this
					});
					return vm._calOptionsArray;
				}
				return optionsProperty || vm._calOptionsArray;
			});

			/*场景： 获取xItem 的 options 函数中，需要使用其他value，而且这个value是动态变化的 */
			/* TODO: rename queryData => depdata */
			let cptDepdata = computed(() => {
				if (_.isFunction(_.$val(cpt_configs, "value.queryData"))) {
					cpt_configs.value.queryData = _.$callFn(cpt_configs, "value.queryData")();
					return cpt_configs.value.queryData;
				}
			});

			let cpt_origin_disabled_value = computed(() => {
				if (privateState.isDisabled === "disabled") {
					return true;
				}
				if (this.disabled) {
					return true;
				}
				if (_.isFunction(_.$val(vm, "cpt_configs.disabled"))) {
					return vm.cpt_configs.disabled.call(vm.cpt_configs, {
						xItem: vm,
						val: vm.cpt_value
					});
				} else {
					return _.$val(vm, "cpt_configs.disabled");
				}
			});

			let cptDisabled = computed(() => {
				return Boolean(cpt_origin_disabled_value.value);
			});

			let cptDisabledTips = computed(() => {
				if (cpt_origin_disabled_value.value) {
					if (_.isString(cpt_origin_disabled_value.value)) {
						return cpt_origin_disabled_value.value;
					}
				}

				return "";
			});

			(() => {
				let timer;
				onMounted(() => {
					/* FIXED: xItem xItem_controller overflow-hidden 高度产生滑动条 */
					if (cpt_configs.value.KEEP_SCROLL_TOP_0) {
						timer = setInterval(() => {
							try {
								const xItem_controller = $(this.$el).find(".xItem_controller");
								if (xItem_controller[0]) {
									const scrollTop = xItem_controller[0].scrollTop;
									if (scrollTop !== 0) {
										xItem_controller[0].scrollTop = 0;
									}
								}
							} catch (e) {}
						}, 50);
					}
				});
				onBeforeUnmount(() => {
					timer && clearInterval(timer);
				});
			})();

			onMounted(() => {
				/* TODO:优化逻辑 */
				Vue._X_ITEM_VM_S[this.cpt_id] = this;
				if (_.$val(cpt_configs, "value.once")) {
					cpt_configs.value.once.call(cpt_configs.value, { xItem: this });
				}
				if (cpt_configs.value.style) {
					this.$watch("cpt_configs.style", this.updateStyle);
				}
				if (cpt_configs.value.attrs) {
					this.$watch("cpt_configs.attrs", this.setAttrs);
				}
				if (cpt_configs.value.multiple) {
					this.$watch("cpt_configs.multiple", this.setAttrs);
				}
				if (cpt_configs.value.placeholder) {
					this.$watch("cpt_configs.placeholder", this.setAttrs);
				}
				if (cpt_configs.value.value !== undefined) {
					this.$watch("cpt_configs.value", this.emitValueChange);
				}
				if (this.value !== undefined) {
					this.$watch("value", this.emitValueChange, { deep: true });
				}
				this.$watch("cpt_value", this.emitValueChange, { deep: true });

				this.updateStyle();
				this.setProps();
				this.setAttrs();
				this.setListeners();
				this.emitValueChange(this.cpt_value);
			});

			onBeforeUnmount(() => {
				delete Vue._X_ITEM_VM_S[this.cpt_id];
			});
			const { height, width: labelWidth, sizer } = useAutoResize(props);

			return {
				height,
				labelWidth,
				refItemLabel: sizer,
				privateState,
				cpt_origin_disabled_value,
				cptDisabled,
				cptDisabledTips,
				cpt_options,
				cptDepdata,
				cptPlaceholder,
				cpt_configs
			};
		},
		onUpdate() {
			console.log("xItem onUpdate");
		},
		computed: {
			cpt_visible_is_hide(vm) {
				if (
					_.isBoolean(_.$val(vm, "cpt_configs.visibleIsHide")) &&
					_.$val(vm, "cpt_configs.visibleIsHide")
				) {
					return true;
				}
				if (_.isFunction(_.$val(vm, "cpt_configs.visibleIsHide"))) {
					return vm.cpt_configs.visibleIsHide.call(vm.cpt_configs, {
						xItem: vm,
						val: vm.cpt_value
					});
				}
				return !!_.$val(vm, "cpt_configs.visibleIsHide");
			},
			cptReadonly(vm) {
				if (vm.X_ITEM_READONLY) {
					return true;
				}
				if (vm.readonly || _.$val(vm, "cpt_configs.attrs.readonly")) {
					return true;
				}
				if (_.isFunction(_.$val(vm, "cpt_configs.readonly"))) {
					return vm.cpt_configs.readonly.call(vm.cpt_configs, {
						xItem: vm,
						val: vm.cpt_value
					});
				} else {
					return !!_.$val(vm, "cpt_configs.readonly");
				}
			},
			cptIsShowItemColon() {
				if (_.$isInput(this.cpt_configs.isShowItemColon)) {
					return this.cpt_configs.isShowItemColon;
				} else {
					return PRIVATE_GLOBAL.x_item_is_show_item_colon;
				}
			},
			cptStyle() {
				const vm = this;
				return {
					"--xItem-msg-padding-left": `${vm.labelWidth + 16}px`
				};
			},
			cpt_value: {
				get() {
					const isValueUndefined = _.isUndefined(this.value);
					const isModelValueUndefined = _.isUndefined(_.$val(this, "cpt_configs.value"));
					return (() => {
						if (!isValueUndefined) {
							return this.value;
						}
						if (!isModelValueUndefined) {
							return this.cpt_configs.value;
						}

						if (this.cpt_configs.THIS_CONFIGS_ONLY_FOR_LABEL) {
							return "";
						}
						debugger;
						console.error(
							"For xItem configuration items, the value property must be present in either v-model or configs",
							this
						);
					})();
				},
				set(val) {
					this.emitValueChange(val);
					return;
				}
			},
			cpt_bindProps() {
				return {
					class: this.cpt_class,
					style: this.p_style,
					props: {
						...this.p_props,
						options: this.cpt_options,
						queryData: this.cptDepdata
					},
					attrs: {
						...this.p_props,
						options: this.cpt_options,
						queryData: this.cptDepdata
					}
				};
			},
			cpt_class() {
				return {
					"form-controller": true,
					[this.componentTag]: true,
					"show-error": this.errorTips
				};
			},
			cpt_id() {
				return `x_form_id_${this._uid}`;
			},
			cpt_label() {
				if (_.isString(_.$val(this, "cpt_configs.label"))) {
					return this.cpt_configs.label;
				}
				if (_.isFunction(_.$val(this, "cpt_configs.label"))) {
					return this.cpt_configs.label();
				}
				return false;
			},
			cpt_is_required() {
				try {
					return _.some(this.cpt_configs.rules, rule => rule.name === "required");
				} catch (error) {
					return false;
				}
			},
			cpt_rules_by_trigger() {
				return (
					_.reduce(
						_.$val(this, "cpt_configs.rules"),

						(rulesByTrigger, rule) => {
							_.each(rule.trigger, triggerName => {
								rulesByTrigger[triggerName] = rulesByTrigger[triggerName] || [];
								rulesByTrigger[triggerName].push(rule);
							});
							return rulesByTrigger;
						},
						{}
					) || {}
				);
			},
			cpt_is_hide() {
				const vm = this;
				if (_.isBoolean(_.$val(vm, "cpt_configs.isHide"))) {
					return vm.cpt_configs.isHide;
				}
				if (_.isFunction(_.$val(vm, "cpt_configs.isHide"))) {
					return vm.cpt_configs.isHide();
				}
				return false;
			},
			itemType() {
				return this.cpt_configs.itemType || "xItemInput";
			}
		},
		data() {
			const vm = this;
			/* vm.emitValueChange = _.debounce(vm.emitValueChange, 32); */
			setTimeout(() => {
				/* 前3s（即初始化之后）不校验， */
				vm.p_debounceValidate = _.debounce(vm.validate, 1000);
			}, 1000 * 3);
			return {
				hide_by_manually: false,
				componentName: "xItem",
				errorTips: "",
				p_style: {},
				p_props: {},
				p_attrs: {},
				p_listeners: {},
				curUid: 0
			};
		},
		watch: {
			cpt_visible_is_hide(visible_is_hide) {
				if (visible_is_hide) {
					$(this.$el).addClass("x-item-hide-by-manually");
				} else {
					$(this.$el).removeClass("x-item-hide-by-manually");
				}
			}
		},
		methods: {
			calTips() {
				if (this.$slots.tips) {
					return this.$slots.tips;
				}
				if (_.isString(this.cpt_configs.tips)) {
					return this.cpt_configs.tips;
				}
				if (_.isFunction(_.$val(this, "cpt_configs.tips"))) {
					return this.cpt_configs.tips.call(this.cpt_configs, { xItem: this });
				}
				return this.cpt_configs.tips || "";
			},
			calMsg() {
				/* msg之前一直是计算属性，但是msg可用作为render函数，里面的组件可能是懒加载，懒加载完成后触发update，由于计算属性的缓存机制无法更新，所以改用方法tips */
				if (
					_.isString(_.$val(this, "cpt_configs.msg")) &&
					_.$val(this, "cpt_configs.msg")
				) {
					return hDiv({ staticClass: "xItem-msg-content" }, [this.cpt_configs.msg]);
				}
				if (_.isFunction(_.$val(this, "cpt_configs.msg"))) {
					return this.cpt_configs.msg.call(this.cpt_configs, { xItem: this });
				}

				if (_.$val(this, "cpt_configs.msg.TYPE_IS_VNODE")) {
					return this.cpt_configs.msg;
				}
				return null;
			},
			async asyncLoadRender(renderName) {
				if (_xItem_lazyLoadRender[renderName]) {
					return;
				}
				if (_.isString(_xItem_lazyLoadRender[renderName])) {
					return;
				}
				_xItem_lazyLoadRender[renderName] = "";
				const item = {
					ItemAsWrapper: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemItemAsWrapper.vue"
						),
					NormalRender: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemNormalRender.vue"
						),
					ReadonlyAsRender: () =>
						_.$importVue(
							"/common/ui-x/common/xItem/controllerRender/xItemReadonlyAsRender.vue"
						)
				};
				const getter = item[renderName];
				const render = await getter();
				console.log(
					renderName,
					`this.$root.broadcast("xItem", "xItemRenderUpdate", render);`
				);
				_xItem_lazyLoadRender[renderName] = render;
				_.$single.win.trigger("X_ITEM_RENDER_UPDATE");
			},
			triggerOnEmitValue(val) {
				try {
					if (_.$val(this, "cpt_configs.onEmitValue")) {
						this.cpt_configs.onEmitValue.call(this.cpt_configs, {
							val,
							...(_.$val(this, "cpt_configs.payload") || {}),
							xItem: this
						});
					}
				} catch (error) {
					console.error(error);
				}
			},
			emitValueChange(val) {
				// set=>emit=>prop=>render
				const isRended = this.cpt_value === val;
				// prop=>render=>emit
				const isEmited = this.emitValueChange.val === val;

				if (isRended && isEmited) {
					return;
				}

				const next = () => {
					this.emitValueChange.val = val;
					/* 设置了configs.value，未设置model ；二者只能取其一*/
					if (
						_.$val(this, "cpt_configs.value") !== undefined &&
						this.value === undefined
					) {
						this.cpt_configs.value = val;
					}
					this.$emit("change", val);
					this.triggerOnEmitValue(val);
					const rule = this.cpt_rules_by_trigger["change"];
					if (rule) {
						this.debounceValidate();
					}
				};

				if (_.isFunction(this.cpt_configs.beforeChange)) {
					(async () => {
						const isContinue = await this.cpt_configs.beforeChange.call(
							this.cpt_configs,
							{
								val,
								old_val: this.cpt_value,
								xItem: this
							}
						);
						if (isContinue) {
							next();
						}
					})();
				} else {
					next();
				}
			},
			debounceValidate() {
				if (this.p_debounceValidate) {
					/* 表单初始化之后的数据3s内不检查 */
					this.p_debounceValidate();
				}
			},
			reset() {},
			async validate(payload) {
				if (this.cpt_configs.rules && this.cpt_configs.rules.length > 0) {
					for await (const rule of this.cpt_configs.rules) {
						const msg = await rule.validator.call(this.cpt_configs, {
							val: this.cpt_value,
							xItem: this,
							payload
						});
						if (msg) {
							this.errorTips = msg;
							break;
						} else {
							this.errorTips = "";
						}
					}
				}
				return this.errorTips;
			},
			updateStyle() {
				this.p_style = (() => {
					return _.merge(
						{
							width: "100%"
						},
						this.cpt_configs.style
					);
				})();
			},
			setProps() {
				const vm = this;
				const _props = {
					...(vm.cpt_configs.props || {}),
					...(vm.p_attrs || {}),
					cpt_configs: vm.cpt_configs
				};
				this.p_props = _props;
			},
			setAttrs() {
				const vm = this;
				const clearable =
					vm.cpt_configs.clearable === undefined ? false : vm.cpt_configs.clearable;

				this.p_attrs = {
					...(vm.cpt_configs.attrs || {}),
					clearable,
					multiple: !!_.$val(vm, "cpt_configs.multiple"),
					placeholder: vm.cptPlaceholder
				};
				this.setProps();
			},
			setListeners() {
				/* TODO:透传机制，onEmitEvent,AOP */
				const vm = this;
				const handleListener = (listeners, eventName) => {
					listeners[eventName] = function (value, $event) {
						const on = vm.cpt_configs.on;
						/*除非主动调用 _.$validateForm，只有对应的事件才会触发校验*/
						const rule = vm.cpt_rules_by_trigger[eventName];
						if (rule) {
							vm.debounceValidate();
						}
						if (_.$val(on, `${eventName}`)) {
							on[eventName]({
								val: value,
								$event,
								xItem: vm
							});
						} else {
							vm.$emit(eventName, value);
						}
					};
					return listeners;
				};

				this.p_listeners = EVENT_ARRAY.reduce(handleListener, {});
			}
		},
		render() {
			if (this.hide_by_manually) {
				return null;
			}
			if (!this.cpt_configs) {
				debugger;
			}
			const xItemVnode = (() => {
				/* TODO:只读模式 */
				if (this.readOnlyAs) {
					if (_xItem_lazyLoadRender.ReadonlyAsRender) {
						return _xItem_lazyLoadRender.ReadonlyAsRender.call(this);
					} else {
						this.asyncLoadRender("ReadonlyAsRender");
					}
				}

				/* 与表单一致，只为了统一样式 */
				if (_.$val(this, "cpt_configs.THIS_CONFIGS_ONLY_FOR_LABEL")) {
					if (_xItem_lazyLoadRender.ItemAsWrapper) {
						return _xItem_lazyLoadRender.ItemAsWrapper.call(this);
					} else {
						this.asyncLoadRender("ItemAsWrapper");
					}
				}

				/* 正常 */
				if (_xItem_lazyLoadRender.NormalRender) {
					return _xItem_lazyLoadRender.NormalRender.call(this);
				} else {
					this.asyncLoadRender("NormalRender");
				}

				/* 骨架 */
				return hDiv({ staticClass: "el-skeleton is-animated " }, [
					hDiv({
						staticClass: "el-skeleton__item el-skeleton__p el-skeleton__paragraph"
					})
				]);
			})();

			return xItemVnode;
		}
	};
}
</script>
<style lang="less">
.xItem-wrapper {
	overflow: hidden;
	width: var(--xItem-wrapper-width, 320px);
	height: var(--xItem-wrapper-height, auto);
	min-width: 1px;

	&.x-item-hide-by-manually {
		position: absolute;
		visibility: hidden;
		opacity: 0;
		z-index: -1;
	}

	.x-item-label-controller-wrapper {
		width: var(--x-item-label-controller-wrapper-width, unset);
		height: var(--x-item-label-controller-wrapper-height, unset);
		position: relative;
		display: flex;
		flex-flow: var(--xItem-flex-flow, row nowrap);
		justify-content: var(--xItem-layout-justify-content, center);
		align-items: var(--xItem-layout-align-items, center);
		flex: 1;

		.xItem_label {
			width: var(--xItem-label-width, 120px);
			height: var(--xItem-label-height, unset);
			display: flex;
			flex-flow: row nowrap;
			justify-content: var(--xItem-label-position, flex-end);
			align-items: flex-end;
			margin: var(--xItem-label-margin, 0 16px 0 0);
		}

		.xItem_controller {
			width: var(--xItem-controller-width, unset);
			height: var(--xItem-controller-height, unset);
			min-height: var(--xItem-controller-min-height, var(--ui-height));
			display: flex;
			flex: var(--xItem-controller-flex, 1);
			flex-flow: row nowrap;
			align-items: center;

			> [disabled="disabled"] {
				// opacity: 0.5;
				&:hover {
					cursor: not-allowed;
				}
			}

			.after-flex1 + * {
				flex: 1;
			}

			> [class^="el-"] {
				width: 100%;
			}

			> .xCascader,
			.el-descriptions {
				width: 100%;
			}

			&.el-form-item {
				margin-bottom: unset;
			}

			&.center {
				align-self: center;
			}

			.show-error {
				[class$="__inner"],
				.el-textarea__inner,
				.el-input__inner,
				> input {
					border: 1px solid var(--ui-danger);
				}
			}
		}
	}

	.xItem-msg {
		max-width: 100%;
		overflow: var(--xItem-info-msg-overflow, hidden);
		color: var(--el-text-color-secondary);
		padding-left: var(--xItem-msg-padding-left);

		.xItem-msg-content {
			margin-top: var(--xItem-msg-content-margin-top, 10px);
		}
	}
}

/* 加在父元素上也可以 */
.xItem-pos {
	&.top {
		--xItem-label-position: flex-start;
		--xItem-label-margin: var(--ui-one) 0;
		--xItem-controller-width: 100%;
		--xItem-flex-flow: column nowrap;
		--xItem-layout-align-items: flex-start;

		&.right {
			// --xItem-layout-align-items: flex-end;
			.xItem_label {
				align-self: end;
				justify-content: flex-end;
			}
		}

		&.center {
			--xItem-label-margin: var(--ui-one);
			--xItem-label-position: center;
			--xItem-controller-width: 100%;
			--xItem-layout-align-items: flex-start;
			--xItem-flex-flow: column nowrap;
			--xItem-label-wrappr-align-self: center;

			.xItem_label {
				align-self: center;
			}
		}

		.xItem-msg {
			padding-left: 0;
		}
	}

	&.left {
		--xItem-controller-width: 100%;
		--xItem-label-position: flex-start;
		--Xitem-label-text-align: left;
	}
}

.xItem-wrapper + .xItem-wrapper {
	// margin-top: 24px;
}

.horizontal {
	.xItem-wrapper + .xItem-wrapper {
		margin-top: 0;
	}
}

.xItem_label-required {
	color: var(--ui-danger);
}

.xItem_error-msg {
	display: absolute;
	height: 20px;
	line-height: 20px;
	color: var(--ui-danger);
}

.xItem_msg {
	// border-width: 1px;
	// border-style: solid;
	// border-color: var(--el-border-color-lighter);
	display: inline-block;
	padding: 9px 12px;
	// margin-top: var(--ui-half);
	background: #ffffff;
	border-radius: var(--ui-half);
	// box-shadow:
	// 	0 6px 16px 0 rgba(0, 0, 0, 0.08),
	// 	0 3px 6px -4px rgba(0, 0, 0, 0.12),
	// 	0 9px 28px 8px rgba(0, 0, 0, 0.05);
	pointer-events: all;
}
</style>
