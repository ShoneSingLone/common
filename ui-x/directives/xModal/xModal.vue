<template>
	<transition name="viewer-fade">
		<div class="x-modal-mask-container" :style="cptWrapperStyle" @click.self="handleMaskClick">
			<div
				role="dialog"
				:class="[dialog_class, { 'is-focused': isFocused }]"
				:style="dialogStyle"
				ref="refDialog"
				@mousedown="toTop">
				<div class="el-dialog__header" v-if="!isHideHeader">
					<div class="el-dialog__title-bar" v-xmove="moveOptions" />
					<span class="el-dialog__title">
						<span class="xModel-title_prefixe"></span>
						<xRender :render="cpt_title" />
					</span>
					<button
						v-if="isShowMinimize"
						type="button"
						aria-label="Minimize"
						class="x-dialog__headerbtn minimize"
						@click="minimize">
						<xIcon icon="minus" />
					</button>
					<button
						v-if="isShowFullScreen"
						type="button"
						aria-label="Close"
						class="x-dialog__headerbtn fullscreen"
						@click="toggleFullScreen">
						<xIcon
							v-if="dialog_class.fullscreen"
							class="el-icon el-icon-copy-document"
							icon="copy-document"
							style="transform: rotate(180deg)"></xIcon>
						<xIcon
							v-else
							class="el-icon el-icon-full-screen"
							icon="full-screen"></xIcon>
					</button>
					<button
						type="button"
						aria-label="Close"
						class="x-dialog__headerbtn close"
						@click="closeModal({ isClickCloseIcon: true })">
						<!-- <i class="el-dialog__close el-icon el-icon-close"></i> -->
						<xIcon :icon="cptCloseIcon" class="el-dialog__close" />
					</button>
				</div>
				<component
					:is="ContentComponent"
					ref="refContent"
					:closeModal="closeModal"
					@hook:mounted="setDialogOffset" />
				<div
					v-if="isShowResize && !dialog_class.fullscreen"
					class="x-modal-resize-handle"
					v-xmove="resizeOptions" />
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL, options, modalConfigs }) {
	modalConfigs = modalConfigs || {};
	options = options || {};

	const isHideHeader = options.isHideHeader || false;
	const isMask = options.mask !== false;

	function useMask(vm) {
		onMounted(() => {
			vm.deviceSupportInstall();
			document.body.appendChild(vm.$el);
			if (isMask) {
				vm.styleOverflow = document.body.style.overflow;
				// vm.stylePointerEvents = document.body.style.pointerEvents;
				document.body.style.overflow = "hidden";
				// document.body.style.pointerEvents = "none";
			}
		});

		onBeforeUnmount(() => {
			if (isMask) {
				document.body.style.overflow = vm.styleOverflow;
			}
			// document.body.style.pointerEvents = vm.stylePointerEvents;
			if (vm.$el && vm.$el.parentNode) {
				vm.$el.parentNode.removeChild(vm.$el);
			}
		});
	}

	return defineComponent({
		name: "xModal",
		provide() {
			return {
				INJECT_MODAL: this
			};
		},
		async mounted() {
			const vm = this;
			/* 兼容废弃代码 */
			if (options._VueCtor) {
				vm.ContentComponent = options._VueCtor;
			} else {
				options.$DIALOG_VM = this;
				vm.ContentComponent = await _.$importVue(options.url, options);
			}
		},
		setup(props) {
			const vm = getCurrentInstance().proxy;
			useMask(vm);
			const { useAutoResize } = _xUtils;

			const {
				height: refDialogRectHeight,
				width: refDialogRectWidth,
				sizer: refDialog
			} = useAutoResize(props);

			const {
				height: refContentHeight,
				width: refContentWidth,
				sizer: refContent
			} = useAutoResize(props);

			// 添加状态标记避免重复计算
			let isCalculating = false;
			let lastCalculatedValues = null;
			let isUserInteracting = false;
			const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
			const toNumber = val => {
				if (_.isNumber(val)) return val;
				if (!_.$isInput(val)) return NaN;
				const n = parseInt(val);
				return _.isNaN(n) ? NaN : n;
			};
			const getViewport = () => ({
				width: _.$single.win.width(),
				height: _.$single.win.height()
			});
			const clampRectToViewport = ({ left, top, width, height }) => {
				const viewport = getViewport();
				const minWidth = Math.min(
					viewport.width,
					Math.max(200, toNumber(options.minWidth) || 200)
				);
				const minHeight = Math.min(
					viewport.height,
					Math.max(100, toNumber(options.minHeight) || 100)
				);
				let w = clamp(width, minWidth, viewport.width);
				let h = clamp(height, minHeight, viewport.height);
				let l = clamp(left, 0, Math.max(0, viewport.width - w));
				let t = clamp(top, 0, Math.max(0, viewport.height - h));
				return { left: l, top: t, width: w, height: h, viewport };
			};

			const setDialogOffset = _.debounce(() => {
				try {
					// 防止重复计算或在用户交互过程中重置位置
					if (isCalculating || isUserInteracting) return;
					isCalculating = true;

					const winWidth = _.$single.win.width();
					const winHeight = _.$single.win.height();

					// 响应式全屏处理
					if (modalConfigs.responsiveMaximize) {
						const threshold = _.isNumber(modalConfigs.responsiveMaximize)
							? modalConfigs.responsiveMaximize
							: 768; // 默认阈值 768px

						if (winWidth <= threshold) {
							if (!vm.dialog_class.fullscreen) {
								vm.dialog_class.fullscreen = true;
							}
						}
					}

					// 检查是否需要重新计算
					const currentValues = {
						width: refDialogRectWidth.value,
						height: refDialogRectHeight.value,
						winWidth,
						winHeight,
						fullscreen: vm.dialog_class.fullscreen
					};

					// 如果值没有变化，跳过计算
					if (
						lastCalculatedValues &&
						JSON.stringify(currentValues) === JSON.stringify(lastCalculatedValues)
					) {
						isCalculating = false;
						return;
					}

					let left = (() => {
						if (vm.dialog_class.fullscreen) {
							return 0;
						}

						if (modalConfigs.center === false) {
							return options.style && _.$isInput(options.style.left)
								? parseInt(options.style.left)
								: 0;
						}

						if (options.style && _.$isInput(options.style.left)) {
							return parseInt(options.style.left);
						}

						let left = (currentValues.winWidth - currentValues.width) / 2;
						return left < 0 ? 0 : left;
					})();

					let topOnepice = (() => {
						if (vm.dialog_class.fullscreen) {
							return 0;
						}

						if (modalConfigs.center === false) {
							return options.style && _.$isInput(options.style.top)
								? parseInt(options.style.top)
								: 0;
						}

						if (options.style && _.$isInput(options.style.top)) {
							return parseInt(options.style.top);
						}

						let topOnepice = 2;
						const topTotal = currentValues.winHeight - currentValues.height;
						if (topTotal >= 4) {
							topOnepice = topTotal / 4;
						}
						return topOnepice;
					})();

					const widthForClamp = _.$isInput(options.style && options.style.width)
						? toNumber(options.style.width)
						: currentValues.width;
					const heightForClamp = _.$isInput(options.style && options.style.height)
						? toNumber(options.style.height)
						: currentValues.height;
					const rect = clampRectToViewport({
						left,
						top: topOnepice,
						width: widthForClamp,
						height: heightForClamp
					});
					left = rect.left;
					topOnepice = rect.top;
					const persistLeft =
						modalConfigs.center === false ||
						(options.style && _.$isInput(options.style.left));
					const persistTop =
						modalConfigs.center === false ||
						(options.style && _.$isInput(options.style.top));
					if (persistLeft || persistTop) {
						if (!options.style) options.style = {};
						if (persistLeft) options.style.left = rect.left;
						if (persistTop) options.style.top = rect.top;
					}
					if (options.style && _.$isInput(options.style.width))
						options.style.width = rect.width;
					if (options.style && _.$isInput(options.style.height))
						options.style.height = rect.height;

					// 使用 requestAnimationFrame 确保样式更新在下一帧执行
					requestAnimationFrame(() => {
						const style = {
							"margin-top": "0",
							opacity: vm.dialog_class.minimized ? 0 : 1,
							left: `${left}px`,
							top: `${topOnepice}px`,
							"max-width": `${rect.viewport.width}px`,
							"max-height": `${rect.viewport.height}px`,
							transform: "none",
							visibility: vm.dialog_class.minimized ? "hidden" : "visible",
							pointerEvents: vm.dialog_class.minimized ? "none" : "auto"
						};

						// 如果用户已经手动调整过大小，或者初始配置了大小，则锁定宽高
						if (options.style && _.$isInput(options.style.width)) {
							style.width = `${rect.width}px`;
						}
						if (options.style && _.$isInput(options.style.height)) {
							style.height = `${rect.height}px`;
						}

						if (vm.dialog_class.fullscreen) {
							vm.dialogStyle = {
								...style,
								left: "0",
								top: "0",
								width: "100vw",
								height: "100vh"
							};
						} else {
							vm.dialogStyle = style;
						}
						lastCalculatedValues = currentValues;
						isCalculating = false;
					});
				} catch (error) {
					isCalculating = false;
					return {};
				}
			}, 50);

			const handleWindowResize = _.debounce(() => {
				if (vm.dialog_class.fullscreen) return;
				lastCalculatedValues = null;
				setDialogOffset();
			}, 50);

			onMounted(() => {
				window.addEventListener("resize", handleWindowResize);
			});

			onBeforeUnmount(() => {
				window.removeEventListener("resize", handleWindowResize);
			});

			watch(
				() => [
					refDialogRectHeight.value,
					refDialogRectWidth.value,
					refContentHeight.value,
					refContentWidth.value
				],
				rectArray => {
					if (_.every(rectArray, val => val && val > 0)) {
						// 如果发生了 resize 且尚未锁定尺寸，捕获当前尺寸
						if (
							!options.style ||
							(!_.$isInput(options.style.width) && !isUserInteracting)
						) {
							// 仅在首次渲染或内容导致的大小变化时触发
						}
						setDialogOffset();
					}
				},
				{ flush: "post" }
			);

			let ticking = false;
			const setPosition = function ({ left, top }) {
				if (!ticking) {
					requestAnimationFrame(() => {
						vm.dialogStyle = {
							...vm.dialogStyle,
							left: `${left}px`,
							top: `${top}px`
						};
						ticking = false;
					});
					ticking = true;
				}
			};

			return {
				title: ref(options.title),
				isHideHeader: ref(isHideHeader),
				toggleFullScreen() {
					if (vm.dialog_class.fullscreen) {
						vm.dialog_class.fullscreen = false;
						lastCalculatedValues = null;
						vm.setDialogOffset();
					} else {
						vm.dialog_class.fullscreen = true;
						vm.dialogStyle = {
							...vm.dialogStyle,
							left: "0",
							top: "0",
							width: "100vw",
							height: "100vh",
							opacity: 1,
							visibility: "visible",
							pointerEvents: "auto"
						};
					}
				},
				setPosition,
				setDialogOffset,
				refDialog,
				refContent,
				moveOptions: {
					left: 0,
					top: 0,
					onStart() {
						isUserInteracting = true;
						$(vm.$refs.refDialog).addClass("dragging");
						vm.toTop();
						const { left, top, width, height } =
							vm.$refs.refDialog.getBoundingClientRect();
						const rect = clampRectToViewport({ left, top, width, height });
						vm.moveOptions.left = rect.left;
						vm.moveOptions.top = rect.top;

						// 拖拽开始即锁定当前尺寸
						if (!options.style) options.style = {};
						if (!_.$isInput(options.style.width)) options.style.width = rect.width;
						if (!_.$isInput(options.style.height)) options.style.height = rect.height;
						options.style.left = rect.left;
						options.style.top = rect.top;

						vm.dialogStyle = {
							...vm.dialogStyle,
							width: `${rect.width}px`,
							height: `${rect.height}px`,
							left: `${rect.left}px`,
							top: `${rect.top}px`
						};

						if (_.$single && _.$single.mask) {
							_.$single.mask.css("cursor", "move").show();
						}

						$(document).one("mouseup", () => {
							isUserInteracting = false;
							$(vm.$refs.refDialog).removeClass("dragging");
							if (_.$single && _.$single.mask) {
								_.$single.mask.hide();
							}
						});
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetLeft = movingEvent.clientX - clickEvent.clientX;
						const offsetTop = movingEvent.clientY - clickEvent.clientY;
						let left = vm.moveOptions.left + offsetLeft;
						let top = vm.moveOptions.top + offsetTop;

						const winWidth = _.$single.win.width();
						const winHeight = _.$single.win.height();
						const width = refDialogRectWidth.value;
						const height = refDialogRectHeight.value;

						if (width >= winWidth) left = 0;
						else left = clamp(left, 0, Math.max(0, winWidth - width));

						if (height >= winHeight) top = 0;
						else top = clamp(top, 0, Math.max(0, winHeight - height));

						if (!options.style) options.style = {};
						options.style.left = left;
						options.style.top = top;

						setPosition({ left, top });
					}
				},
				resizeOptions: {
					width: 0,
					height: 0,
					onStart() {
						isUserInteracting = true;
						$(vm.$refs.refDialog).addClass("dragging");
						vm.toTop();
						const { width, height, left, top } =
							vm.$refs.refDialog.getBoundingClientRect();
						const rect = clampRectToViewport({ left, top, width, height });
						vm.resizeOptions.width = rect.width;
						vm.resizeOptions.height = rect.height;

						// 缩放开始即锁定当前位置
						if (!options.style) options.style = {};
						options.style.left = rect.left;
						options.style.top = rect.top;
						if (_.$isInput(options.style.width)) options.style.width = rect.width;
						if (_.$isInput(options.style.height)) options.style.height = rect.height;

						vm.dialogStyle = {
							...vm.dialogStyle,
							width: `${rect.width}px`,
							height: `${rect.height}px`,
							left: `${rect.left}px`,
							top: `${rect.top}px`
						};

						if (_.$single && _.$single.mask) {
							_.$single.mask.css("cursor", "nwse-resize").show();
						}

						$(document).one("mouseup", () => {
							isUserInteracting = false;
							$(vm.$refs.refDialog).removeClass("dragging");
							if (_.$single && _.$single.mask) {
								_.$single.mask.hide();
							}
						});
					},
					onMoving({ clickEvent, movingEvent }) {
						const offsetWidth = movingEvent.clientX - clickEvent.clientX;
						const offsetHeight = movingEvent.clientY - clickEvent.clientY;
						let width = vm.resizeOptions.width + offsetWidth;
						let height = vm.resizeOptions.height + offsetHeight;

						const winWidth = _.$single.win.width();
						const winHeight = _.$single.win.height();
						const { left, top } = vm.$refs.refDialog.getBoundingClientRect();

						const maxWidth = Math.max(0, winWidth - Math.max(0, left));
						const maxHeight = Math.max(0, winHeight - Math.max(0, top));
						const minWidth = Math.min(
							maxWidth,
							Math.max(200, toNumber(options.minWidth) || 200)
						);
						const minHeight = Math.min(
							maxHeight,
							Math.max(100, toNumber(options.minHeight) || 100)
						);
						width = clamp(width, minWidth, maxWidth);
						height = clamp(height, minHeight, maxHeight);

						if (!options.style) options.style = {};
						options.style.width = width;
						options.style.height = height;
						options.style.left = clamp(
							toNumber(options.style.left) || 0,
							0,
							Math.max(0, winWidth - width)
						);
						options.style.top = clamp(
							toNumber(options.style.top) || 0,
							0,
							Math.max(0, winHeight - height)
						);

						$(vm.$el).find(".xDialog.xDialog-wrapper").addClass("custom-manual-resize");

						requestAnimationFrame(() => {
							vm.dialogStyle = {
								...vm.dialogStyle,
								width: `${width}px`,
								height: `${height}px`,
								left: `${options.style.left}px`,
								top: `${options.style.top}px`
							};
						});
					}
				}
			};
		},
		// beforeDestroy() {
		// 	/* 清理content组件 */
		// 	if (this.$refs?.refContent) {
		// 		this.$refs.refContent.$destroy();
		// 	}
		// },
		data() {
			return {
				/* TODO: 动画闪烁 */
				// ContentComponent: defineComponent({ template: `<div class="el-skeleton is-animated flex vertical x-padding" style="min-width: 200px;"><div class="el-skeleton__item el-skeleton__p is-first"></div><div class="el-skeleton__item el-skeleton__p el-skeleton__paragraph is-last mt"></div></div>` }),
				ContentComponent: "",
				isShowFullScreen: "fullscreen" in modalConfigs,
				isShowMinimize: modalConfigs.minimizable === true,
				isShowResize: modalConfigs.resize === true,
				isShowKeyboard: modalConfigs.keyboard === true,
				id: options.id || "",
				viewerZIndex: 0,
				left: 0,
				dialog_class: {
					"el-dialog": true,
					fullscreen: !!modalConfigs.fullscreen,
					minimized: false
				},
				dialogStyle: {
					transform: "unset",
					marginTop: 0,
					opacity: 0,
					left: 0,
					top: 0
				}
			};
		},
		methods: {
			deviceSupportInstall() {},
			async closeModal(closeOptions) {
				closeOptions = closeOptions || {};
				const { isClickCloseIcon } = closeOptions;
				let isClose = true;

				if (closeOptions.onCancel) {
					isClose = await closeOptions.onCancel();
				}

				/* 【需求】2026-08-04 未保存离场拦截：支持打开窗口时注入异步关闭守卫，dirty 草稿确认前阻止销毁 */
				if (isClose && _.isFunction(options.onCancel)) {
					isClose = await options.onCancel({ id: this.id, isClickCloseIcon });
				}

				if (isClose) {
					// 记录当前位置和大小以便下次恢复
					const { top, left } = _.$getLeftTopFromAbsolute($(this.$refs.refDialog));
					const width = $(this.$refs.refDialog).width();
					const height = $(this.$refs.refDialog).height();
					if (this.id) {
						_.$lStorage[`window_state_${this.id}`] = { top, left, width, height };
					}

					this.dialogStyle = {
						...this.dialogStyle,
						opacity: 0
					};
					setTimeout(() => {
						this.isClickCloseIcon = isClickCloseIcon;
						this.$destroy();
					}, 300);
				}
			},
			minimize() {
				this.dialog_class.minimized = true;
				this.dialogStyle = {
					...this.dialogStyle,
					opacity: 0,
					visibility: "hidden",
					pointerEvents: "none"
				};
			},
			restore() {
				this.dialog_class.minimized = false;
				lastCalculatedValues = null;
				this.setDialogOffset();
			},
			toTop() {
				if (this.id) {
					_.$ModalManager.toTop(this.id);
				}
			},
			handleMaskClick() {
				if (isMask && options.closeOnClickMask === true) {
					this.closeModal();
				}
			}
		},
		computed: {
			isFocused() {
				return (
					_.$ModalManager &&
					_.$ModalManager.getFocusedId &&
					_.$ModalManager.getFocusedId() === this.id
				);
			},
			isMinimized() {
				return this.dialog_class.minimized;
			},
			cptCloseIcon() {
				return PRIVATE_GLOBAL.x_modal_close_icon;
			},
			cpt_title() {
				return this.title;
			},
			cptWrapperStyle() {
				const isVisible = !this.dialog_class.minimized;
				return {
					"--xModal-zIndex": this.viewerZIndex,
					"pointer-events": isMask && isVisible ? "auto" : "none",
					visibility: isVisible ? "visible" : "hidden"
				};
			}
		},
		watch: {
			// "dialog_class.fullscreen"(isFullScreen) {}
		}
	});
}
</script>
<style lang="less">
// * { outline: 1px solid red; }

.el-dialog {
	position: relative;
	margin: 0 auto var(--xModal-margin-bottom);
	border-radius: var(--xModal-border-radius);
	box-shadow: var(--xModal-box-shadow);
	box-sizing: border-box;
	width: 50%;
	background-color: var(--xModal-bg-color);
	pointer-events: auto;

	&.is-fullscreen {
		width: 100%;
		margin-top: 0;
		margin-bottom: 0;
		height: 100%;
		overflow: auto;
	}
}

.el-dialog__header {
	padding: var(--xModal-header-padding);
}

.el-dialog__headerbtn {
	position: absolute;
	top: var(--xModal-header-btn-top);
	right: var(--xModal-header-close-right);
	padding: 0;
	background: 0 0;
	border: none;
	outline: 0;
	cursor: pointer;
	font-size: var(--xModal-header-btn-font-size);
}

.el-dialog__headerbtn .el-dialog__close {
	color: var(--el-text-color-secondary);
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
	color: var(--el-color-primary);
}

.el-dialog__title {
	line-height: var(--xModal-title-line-height);
	font-size: var(--xModal-title-font-size);
	color: var(--xModal-title-color);
}

.el-dialog__body {
	padding: var(--xModal-body-padding);
	color: var(--xModal-body-color);
	font-size: var(--xModal-body-font-size);
	word-break: break-all;
}

.el-dialog__footer {
	padding: var(--xModal-footer-padding);
	text-align: right;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-dialog--center {
	text-align: center;
}

.el-dialog--center .el-dialog__body {
	text-align: initial;
	padding: 25px 25px 30px;
}

.el-dialog--center .el-dialog__footer {
	text-align: inherit;
}

.dialog-fade-enter-active {
	-webkit-animation: dialog-fade-in 0.3s;
	animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
	-webkit-animation: dialog-fade-out 0.3s;
	animation: dialog-fade-out 0.3s;
}

@-webkit-keyframes dialog-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@keyframes dialog-fade-in {
	0% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}

	100% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}
}

@-webkit-keyframes dialog-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

@keyframes dialog-fade-out {
	0% {
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		opacity: 1;
	}

	100% {
		-webkit-transform: translate3d(0, -20px, 0);
		transform: translate3d(0, -20px, 0);
		opacity: 0;
	}
}

.x-modal-mask-container {
	/* CSS 变量定义 */
	--xModal-bg-color: #fff;
	--xModal-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	--xModal-header-padding: 20px 10px;
	--xModal-header-btn-top: 20px;
	--xModal-header-btn-font-size: 16px;
	--xModal-header-close-right: 10px;
	--xModal-header-fullscreen-right: 36px;
	--xModal-header-minimize-right: 62px;
	--xModal-title-font-size: 18px;
	--xModal-title-line-height: 24px;
	--xModal-title-color: var(--el-text-color-primary);
	--xModal-body-padding: 30px 20px;
	--xModal-body-color: var(--el-text-color-regular);
	--xModal-body-font-size: 14px;
	--xModal-footer-padding: 10px 20px 20px;
	--xModal-focused-shadow:
		0 12px 32px 0 rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.16),
		0 16px 48px 16px rgba(0, 0, 0, 0.08);
	--xModal-focused-border-color: transparent;
	--xModal-border-color: transparent;
	--xModal-margin-bottom: 50px;
	--xModal-transition-duration: 0.3s;
	--xModal-move-transition-duration: 0.1s;

	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	margin: 0;
	overflow: hidden;
	z-index: var(--xModal-zIndex);
	border-radius: var(--xModal-border-radius, var(--border-radius));

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(255, 255, 255, 0.5);
		// backdrop-filter: blur(1px);
	}

	> .el-dialog {
		width: auto;
		margin: auto;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border-radius: var(--xModal-border-radius);
		box-shadow: var(--xModal-box-shadow);
		box-sizing: border-box;
		position: absolute;
		background-color: var(--xModal-bg-color);

		// 默认让内容区具备占满能力
		> :not(.el-dialog__header):not(.x-modal-resize-handle) {
			min-height: 0;
			display: flex;
			flex-direction: column;
		}

		// 用户手动 resize 后，强制占满空间
		> .custom-manual-resize {
			flex: 1;
			/* 核心：占满剩余空间 */
			max-height: none !important;
			height: 100% !important;
			/* 关键：强制撑开，不被内容挤压 */
			overflow: auto;
		}

		transition:
			opacity var(--xModal-transition-duration) ease-in-out,
			top var(--xModal-move-transition-duration) ease,
			right var(--xModal-move-transition-duration) ease,
			bottom var(--xModal-move-transition-duration) ease,
			left var(--xModal-move-transition-duration) ease,
			width var(--xModal-move-transition-duration) ease,
			height var(--xModal-move-transition-duration) ease;

		&.dragging {
			transition: none !important;
			user-select: none;
		}

		&.is-focused {
			box-shadow: var(--xModal-focused-shadow);
			border: 1px solid var(--xModal-focused-border-color);
		}

		&.fullscreen {
			display: flex;
			flex-flow: column nowrap;
			width: 100vw;
			height: 100vh;
		}

		> .el-dialog__header {
			padding: var(--xModal-header-padding);
			border-bottom: 1px solid #eee;
			position: relative;
			z-index: 2;
			flex-shrink: 0;

			.el-dialog__title-bar {
				cursor: move;
				background-color: transparent;
				position: absolute;
				top: 0;
				right: 0;
				height: 10px;
				z-index: 1;
				left: 0;
			}

			.x-dialog__headerbtn {
				position: absolute;
				top: var(--xModal-header-btn-top);
				padding: 0;
				background: 0 0;
				border: none;
				outline: 0;
				cursor: pointer;
				font-size: var(--xModal-header-btn-font-size);

				&.fullscreen {
					right: var(--xModal-header-fullscreen-right);
				}

				&.minimize {
					right: var(--xModal-header-minimize-right);
				}

				&.close {
					right: var(--xModal-header-close-right);
				}
			}
		}

		.x-modal-resize-handle {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 15px;
			height: 15px;
			cursor: nwse-resize;
			z-index: 10;
			background: linear-gradient(
				135deg,
				transparent 0%,
				transparent 50%,
				#ccc 50%,
				#ccc 60%,
				transparent 60%,
				transparent 70%,
				#ccc 70%,
				#ccc 80%,
				transparent 80%
			);

			&:hover {
				background: linear-gradient(
					135deg,
					transparent 0%,
					transparent 50%,
					var(--el-color-primary) 50%,
					var(--el-color-primary) 60%,
					transparent 60%,
					transparent 70%,
					var(--el-color-primary) 70%,
					var(--el-color-primary) 80%,
					transparent 80%
				);
			}
		}
	}
}
</style>
