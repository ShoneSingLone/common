<template>
	<label
		class="el-radio-button xRadioButton"
		:class="[
			size ? 'el-radio-button--' + size : '',
			{ 'is-active': value === label },
			{ 'is-disabled': isDisabled },
			{ 'is-focus': focus }
		]"
		role="radio"
		:aria-checked="value === label"
		:aria-disabled="isDisabled"
		:tabindex="tabIndex"
		@keydown.space.stop.prevent="value = isDisabled ? value : label">
		<input
			class="el-radio-button__orig-radio"
			:value="label"
			type="radio"
			v-model="value"
			:name="name"
			@change="handleChange"
			:disabled="isDisabled"
			tabindex="-1"
			@focus="focus = true"
			@blur="focus = false"
			autocomplete="off" />
		<span
			class="el-radio-button__inner"
			:style="value === label ? activeStyle : null"
			@keydown.stop>
			<slot></slot>
			<template v-if="!$slots.default">{{ label }}</template>
		</span>
	</label>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		name: "xRadioButton",
		inject: {
			elForm: {
				default: ""
			},
			elFormItem: {
				default: ""
			}
		},

		props: {
			label: {},
			disabled: Boolean,
			name: String
		},
		data() {
			return {
				focus: false
			};
		},
		computed: {
			value: {
				get() {
					return this._radioGroup.value;
				},
				set(value) {
					this._radioGroup.$emit("input", value);
				}
			},
			_radioGroup() {
				let parent = this.$parent;
				while (parent) {
					if (parent.$options.componentName !== "xRadioGroup") {
						parent = parent.$parent;
					} else {
						return parent;
					}
				}
				return false;
			},
			activeStyle() {
				return {
					backgroundColor: this._radioGroup.fill || "",
					borderColor: this._radioGroup.fill || "",
					boxShadow: this._radioGroup.fill ? `-1px 0 0 0 ${this._radioGroup.fill}` : "",
					color: this._radioGroup.textColor || ""
				};
			},
			_elFormItemSize() {
				return (this.elFormItem || {}).elFormItemSize;
			},
			size() {
				return (
					this._radioGroup.radioGroupSize ||
					this._elFormItemSize ||
					(this.$ELEMENT || {}).size
				);
			},
			isDisabled() {
				return this.disabled || this._radioGroup.disabled || (this.elForm || {}).disabled;
			},
			tabIndex() {
				return this.isDisabled || (this._radioGroup && this.value !== this.label) ? -1 : 0;
			}
		},

		methods: {
			handleChange() {
				this.$nextTick(() => {
					this.dispatch("xRadioGroup", "handleChange", this.value);
				});
			}
		}
	});
}
</script>

<style lang="less">
.el-radio-group {
	display: inline-block;
	line-height: 1;
	vertical-align: middle;
	/* 【修复】消除 inline-block 空白字符导致的按钮间隙（表现为中间出现小缝） */
	font-size: 0;
}

.el-radio-button {
	position: relative;
	display: inline-block;
	outline: 0;
	/* 【修复】xRadioButton 的圆角/高度/横向内边距改为变量驱动，便于 tiny 主题与业务侧通过 CSS 变量覆盖定制 */
	--xRadioButton-border-radius-cur: var(--xRadioButton-border-radius, var(--border-radius));
	--xRadioButton-height-cur: var(--xRadioButton-height, var(--ui-height));
	--xRadioButton-padding-x-cur: var(--xRadioButton-padding-x, 20px);
	--xRadioButton-font-size-cur: 14px;
	&.el-radio-button--small {
		--xRadioButton-border-radius-cur: var(
			--xRadioButton-border-radius--small,
			var(--border-radius--small)
		);
		--xRadioButton-height-cur: var(--xRadioButton-height--small, var(--ui-height));
		--xRadioButton-padding-x-cur: var(--xRadioButton-padding-x--small, 15px);
		--xRadioButton-font-size-cur: 12px;
	}
	&.el-radio-button--mini {
		--xRadioButton-border-radius-cur: var(
			--xRadioButton-border-radius--mini,
			var(--border-radius--mini)
		);
		--xRadioButton-height-cur: var(
			--xRadioButton-height--mini,
			var(--xRadioButton-height--small, var(--ui-height))
		);
		--xRadioButton-padding-x-cur: var(--xRadioButton-padding-x--mini, 15px);
		--xRadioButton-font-size-cur: 12px;
	}
}

.el-radio-button__inner {
	white-space: nowrap;
	background: #fff;
	border: 1px solid #dcdfe6;
	font-weight: 500;
	border-left: 0;
	color: var(--el-text-color-regular);
	-webkit-appearance: none;
	text-align: center;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	outline: 0;
	margin: 0;
	position: relative;
	cursor: pointer;
	-webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	/* 【修复】固定高度 + flex 垂直居中，避免图标内容撑高导致 small 视觉不一致 */
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: var(--xRadioButton-height-cur);
	padding: 0 var(--xRadioButton-padding-x-cur);
	font-size: var(--xRadioButton-font-size-cur);
	border-radius: 0;
}

.el-radio-button__inner.is-round {
	/* 【修复】保持 round 形态仅改变圆角，由变量决定；padding 仍走统一变量 */
	padding: 0 var(--xRadioButton-padding-x-cur);
}

.el-radio-button__inner:hover {
	color: var(--el-color-primary);
}

.el-radio-button__inner [class*="el-icon-"] {
	line-height: 0.9;
}

.el-radio-button__inner [class*="el-icon-"] + span {
	margin-left: 5px;
}

.el-radio-button:first-child .el-radio-button__inner {
	border-left: 1px solid #dcdfe6;
	/* 【修复】tiny 主题需要直角，首尾圆角统一改为变量（默认回退到全局圆角变量） */
	border-radius: var(--xRadioButton-border-radius-cur) 0 0 var(--xRadioButton-border-radius-cur);
	-webkit-box-shadow: none !important;
	box-shadow: none !important;
}

.el-radio-button__orig-radio {
	opacity: 0;
	outline: 0;
	position: absolute;
	z-index: -1;
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
	color: #fff;
	background-color: var(--el-color-primary);
	border-color: var(--el-color-primary);
	-webkit-box-shadow: -1px 0 0 0 var(--el-color-primary);
	box-shadow: -1px 0 0 0 var(--el-color-primary);
}

.el-radio-button__orig-radio:disabled + .el-radio-button__inner {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
	background-image: none;
	background-color: #fff;
	border-color: var(--el-border-color-lighter);
	-webkit-box-shadow: none;
	box-shadow: none;
}

.el-radio-button__orig-radio:disabled:checked + .el-radio-button__inner {
	background-color: #f2f6fc;
}

.el-radio-button:last-child .el-radio-button__inner {
	/* 【修复】tiny 主题需要直角，首尾圆角统一改为变量（默认回退到全局圆角变量） */
	border-radius: 0 var(--xRadioButton-border-radius-cur) var(--xRadioButton-border-radius-cur) 0;
}
.el-popover,
.el-radio-button:first-child:last-child .el-radio-button__inner {
	/* 【修复】单个按钮时沿用统一变量，确保 tiny 下可为 0 */
	border-radius: var(--xRadioButton-border-radius-cur);
}

.el-radio-button--medium .el-radio-button__inner {
	border-radius: 0;
}

.el-radio-button--medium .el-radio-button__inner.is-round {
	padding: 0 var(--xRadioButton-padding-x-cur);
}

.el-radio-button--small .el-radio-button__inner {
	border-radius: 0;
}

.el-radio-button--small .el-radio-button__inner.is-round {
	padding: 0 var(--xRadioButton-padding-x-cur);
}

.el-radio-button--mini .el-radio-button__inner {
	border-radius: 0;
}

.el-radio-button--mini .el-radio-button__inner.is-round {
	padding: 0 var(--xRadioButton-padding-x-cur);
}

.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
	-webkit-box-shadow: 0 0 2px 2px var(--el-color-primary);
	box-shadow: 0 0 2px 2px var(--el-color-primary);
}
</style>
