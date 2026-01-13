<template>
	<transition name="viewer-fade">
		<div
			v-xloading="loading"
			tabindex="-1"
			ref="el-image-viewer__wrapper"
			class="el-image-viewer__wrapper"
			:style="{ 'z-index': viewerZIndex }">
			<div
				class="el-image-viewer__mask"
				@click.self="handleMaskClick"
				:style="styleViewerMask"></div>
			<!-- CLOSE -->
			<span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
				<xIcon class="el-icon-close" icon="icon_close" />
			</span>
			<!-- ARROW -->
			<template v-if="!isSingle">
				<span
					class="el-image-viewer__btn el-image-viewer__prev"
					:class="{ 'is-disabled': !infinite && isFirst }"
					@click="prev">
					<xIcon class="el-icon-arrow-left" icon="arrow-left" />
				</span>
				<span
					class="el-image-viewer__btn el-image-viewer__next"
					:class="{ 'is-disabled': !infinite && isLast }"
					@click="next">
					<xIcon class="el-icon-arrow-right" icon="arrow-right" />
				</span>
			</template>
			<!-- ACTIONS -->
			<div class="el-image-viewer__btn el-image-viewer__actions">
				<div class="el-image-viewer__actions__inner">
					<xIcon
						class="el-icon-zoom-out"
						icon="zoom-out"
						@click="handleActions('zoomOut')"></xIcon>
					<xIcon
						class="el-icon-zoom-in"
						icon="zoom-in"
						@click="handleActions('zoomIn')"></xIcon>
					<xIcon :class="mode.icon" :icon="mode.icon" @click="toggleMode"></xIcon>
					<xIcon
						class="el-icon-refresh-left"
						icon="refresh-left"
						@click="handleActions('anticlocelise')"></xIcon>
					<xIcon
						class="el-icon-refresh-right"
						icon="refresh-right"
						@click="handleActions('clocelise')"></xIcon>
					<!-- 自动播放按钮，仅当autoPlay为true时显示 -->
					<xIcon
						v-if="autoPlay"
						:class="isAutoPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"
						:icon="isAutoPlay ? 'video-pause' : 'video-play'"
						@click="toggleAutoPlay"></xIcon>
					<!-- 速度控制，仅当autoPlay为true时显示 -->
					<div v-if="autoPlay" class="el-image-viewer__speed-control flex middle">
						<xIcon class="el-icon-minus mr4" icon="minus" @click="increaseSpeed" />
						<span class="speed-text">{{ autoPlayInterval / 1000 }}s</span>
						<xIcon class="el-icon-plus ml4" icon="plus" @click="decreaseSpeed"></xIcon>
					</div>
				</div>
			</div>
			<!-- CANVAS -->
			<div class="el-image-viewer__canvas">
				<img
					v-xloading="loading"
					ref="img"
					class="el-image-viewer__img"
					:src="currentImg"
					:style="imgStyle"
					@load="handleImgLoad"
					@error="handleImgError"
					@mousedown="handleMouseDown"
					@dblclick="handleDoubleClick"
					@touchstart="handleTouchStart"
					@touchmove="handleTouchMove"
					@touchend="handleTouchEnd" />
				<!-- 图片加载时的毛玻璃效果 -->
				<!-- <div class="el-image-viewer__img-blur" v-if="loading"></div> -->
			</div>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const isMobile = /Mobile/gi.test(window.navigator.userAgent);

	let prevOverflow = "";

	const KEY_DOWN = "keydown.xImgVue";
	const MOUSE_WHEEL = "mousewheel.xImgVue";
	const MOUSE_MOVE = "mousemove.xImgVue";
	const MOUSE_UP = "mouseup.xImgVue";

	const Mode = {
		CONTAIN: {
			name: "contain",
			icon: "full-screen"
		},
		ORIGINAL: {
			name: "original",
			icon: "scale-to-original"
		}
	};

	return defineComponent({
		name: "xImageViewer",
		data() {
			return {
				index: 0,
				urlList: [],
				styleViewerMask: {},
				zIndex: 0,
				onSwitch: () => {},
				onClose: () => {},
				appendToBody: true,
				maskClosable: true,
				viewerZIndex: 0,
				isShow: false,
				infinite: true,
				loading: false,
				mode: Mode.CONTAIN,
				// 是否显示自动播放按钮
				autoPlay: false,
				transform: {
					scale: 1,
					deg: 0,
					offsetX: 0,
					offsetY: 0,
					enableTransition: false
				},
				// 触摸相关状态
				touchState: {
					isDragging: false,
					startX: 0,
					startY: 0,
					offsetX: 0,
					offsetY: 0,
					// 双指缩放相关
					isPinching: false,
					startDistance: 0,
					startScale: 1,
					// 双击检测相关
					lastTap: 0
				},
				// 幻灯片相关状态
				isAutoPlay: false,
				autoPlayInterval: 3000, // 默认3秒切换一次
				autoPlayTimer: null
			};
		},
		computed: {
			isSingle() {
				return this.urlList.length <= 1;
			},
			isFirst() {
				return this.index === 0;
			},
			isLast() {
				return this.index === this.urlList.length - 1;
			},
			currentImg() {
				return this.urlList[this.index];
			},
			imgStyle() {
				const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
				const style = {
					transform: `scale(${scale}) rotate(${deg}deg)`,
					transition: enableTransition ? "transform .3s" : "",
					"margin-left": `${offsetX}px`,
					"margin-top": `${offsetY}px`
				};
				if (this.mode === Mode.CONTAIN) {
					style.maxWidth = style.maxHeight = isMobile ? "100%" : "80%";
				}
				return style;
			}
		},
		watch: {
			index: {
				handler: function (val) {
					this.reset();
					this.onSwitch(val);
				}
			},
			currentImg(val) {
				this.$nextTick(_ => {
					const $img = this.$refs.img;
					if (!$img.complete) {
						this.loading = true;
					}
				});
			}
		},
		methods: {
			hide() {
				this.deviceSupportUninstall();
				this.onClose();
			},
			deviceSupportInstall() {
				this._keyDownHandler = e => {
					e.stopPropagation();
					const keyCode = e.keyCode;
					switch (keyCode) {
						// ESC
						case 27:
							this.hide();
							break;
						// SPACE
						case 32:
							this.toggleMode();
							break;
						// LEFT_ARROW
						case 37:
							this.prev();
							break;
						// UP_ARROW
						case 38:
							this.handleActions("zoomIn");
							break;
						// RIGHT_ARROW
						case 39:
							this.next();
							break;
						// DOWN_ARROW
						case 40:
							this.handleActions("zoomOut");
							break;
					}
				};
				this._mouseWheelHandler = _.$rafThrottle(({ originalEvent: e }) => {
					const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
					if (delta > 0) {
						this.handleActions("zoomIn", {
							zoomRate: 0.015,
							enableTransition: false
						});
					} else {
						this.handleActions("zoomOut", {
							zoomRate: 0.015,
							enableTransition: false
						});
					}
				});
				_.$single.doc
					.on(KEY_DOWN, this._keyDownHandler)
					.on(MOUSE_WHEEL, this._mouseWheelHandler);
			},
			deviceSupportUninstall() {
				this.stopAutoPlay();
				_.$single.doc
					.off(KEY_DOWN, this._keyDownHandler)
					.off(MOUSE_WHEEL, this._mouseWheelHandler);
				this._keyDownHandler = null;
				this._mouseWheelHandler = null;
			},
			handleImgLoad(e) {
				this.loading = false;
			},
			handleImgError(e) {
				this.loading = false;
				e.target.alt = i18n("el.image.error");
			},
			handleMouseDown(e) {
				if (this.loading || e.button !== 0) return;
				this.stopAutoPlay();

				const { offsetX, offsetY } = this.transform;
				const startX = e.pageX;
				const startY = e.pageY;
				this._dragHandler = _.$rafThrottle(ev => {
					this.transform.offsetX = offsetX + ev.pageX - startX;
					this.transform.offsetY = offsetY + ev.pageY - startY;
				});
				_.$single.doc.on(MOUSE_MOVE, this._dragHandler).on(MOUSE_UP, ev => {
					_.$single.doc.off(MOUSE_MOVE, this._dragHandler);
				});

				e.preventDefault();
			},
			// 触摸开始事件处理
			handleTouchStart(e) {
				if (this.loading) return;
				this.stopAutoPlay();

				const touches = e.touches;
				const { offsetX, offsetY, scale } = this.transform;

				// 单指触摸 - 准备拖动
				if (touches.length === 1) {
					this.touchState.isDragging = true;
					this.touchState.startX = touches[0].pageX;
					this.touchState.startY = touches[0].pageY;
					this.touchState.offsetX = offsetX;
					this.touchState.offsetY = offsetY;
				}
				// 双指触摸 - 准备缩放
				else if (touches.length === 2) {
					this.touchState.isPinching = true;
					this.touchState.startDistance = this.getDistance(touches[0], touches[1]);
					this.touchState.startScale = scale;
					// 禁用拖动
					this.touchState.isDragging = false;
				}

				e.preventDefault();
			},
			// 计算两点之间的距离
			getDistance(touch1, touch2) {
				const dx = touch1.pageX - touch2.pageX;
				const dy = touch1.pageY - touch2.pageY;
				return Math.sqrt(dx * dx + dy * dy);
			},
			// 触摸移动事件处理
			handleTouchMove(e) {
				if (this.loading) return;

				const touches = e.touches;

				// 单指拖动
				if (touches.length === 1 && this.touchState.isDragging) {
					const currentX = touches[0].pageX;
					const currentY = touches[0].pageY;
					this.transform.offsetX =
						this.touchState.offsetX + (currentX - this.touchState.startX);
					this.transform.offsetY =
						this.touchState.offsetY + (currentY - this.touchState.startY);
				}
				// 双指缩放
				else if (touches.length === 2 && this.touchState.isPinching) {
					const currentDistance = this.getDistance(touches[0], touches[1]);
					const scaleRatio = currentDistance / this.touchState.startDistance;
					let newScale = this.touchState.startScale * scaleRatio;

					// 限制缩放范围
					newScale = Math.max(0.2, Math.min(newScale, 10));

					this.transform.scale = parseFloat(newScale.toFixed(3));
					this.transform.enableTransition = false;
				}

				e.preventDefault();
			},
			// 触摸结束事件处理
			handleTouchEnd(e) {
				// 检测双击
				const now = Date.now();
				const lastTap = this.touchState.lastTap;
				this.touchState.lastTap = now;

				if (now - lastTap < 300 && now - lastTap > 0) {
					// 双击事件
					this.handleDoubleClick();
				}

				// 重置触摸状态
				this.touchState.isDragging = false;
				this.touchState.isPinching = false;
				e.preventDefault();
			},
			handleMaskClick() {
				// 在移动端，只能通过关闭按钮关闭弹窗，点击背景不关闭
				const isMobile = window.innerWidth <= 768;
				if (this.maskClosable && !isMobile) {
					this.hide();
				}
			},
			// 处理双击事件
			handleDoubleClick() {
				if (this.loading) return;
				this.stopAutoPlay();

				// 在移动端，允许双击切换模式
				const isMobile = window.innerWidth <= 768;
				if (isMobile) {
					const modeNames = Object.keys(Mode);
					const modeValues = Object.values(Mode);
					const index = modeValues.indexOf(this.mode);
					const nextIndex = (index + 1) % modeNames.length;
					this.mode = Mode[modeNames[nextIndex]];
					this.reset();
				}
			},
			reset() {
				this.transform = {
					scale: 1,
					deg: 0,
					offsetX: 0,
					offsetY: 0,
					enableTransition: false
				};
			},
			toggleMode() {
				if (this.loading) return;
				this.stopAutoPlay();

				const modeNames = Object.keys(Mode);
				const modeValues = Object.values(Mode);
				const index = modeValues.indexOf(this.mode);
				const nextIndex = (index + 1) % modeNames.length;
				this.mode = Mode[modeNames[nextIndex]];
				this.reset();
			},
			prev(manual = true) {
				if (this.loading || (this.isFirst && !this.infinite)) return;
				if (manual) {
					this.stopAutoPlay();
				}
				const len = this.urlList.length;
				this.index = (this.index - 1 + len) % len;
			},
			next(manual = true) {
				if (this.loading || (this.isLast && !this.infinite)) return;
				if (manual) {
					this.stopAutoPlay();
				}
				const len = this.urlList.length;
				this.index = (this.index + 1) % len;
			},
			handleActions(action, options = {}) {
				if (this.loading) return;
				this.stopAutoPlay();
				const { zoomRate, rotateDeg, enableTransition } = {
					zoomRate: 0.2,
					rotateDeg: 90,
					enableTransition: true,
					...options
				};
				const { transform } = this;

				switch (action) {
					case "zoomOut":
						if (transform.scale > 0.2) {
							transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
						}
						break;
					case "zoomIn":
						transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
						break;
					case "clocelise":
						transform.deg += rotateDeg;
						break;
					case "anticlocelise":
						transform.deg -= rotateDeg;
						break;
				}
				transform.enableTransition = enableTransition;
			},
			// 切换自动播放状态
			toggleAutoPlay() {
				if (this.isAutoPlay) {
					this.stopAutoPlay();
				} else {
					this.startAutoPlay();
				}
			},
			// 开始自动播放
			startAutoPlay() {
				if (this.urlList.length <= 1) return;
				// 先清除之前的定时器，避免多个定时器同时运行
				if (this.autoPlayTimer) {
					clearInterval(this.autoPlayTimer);
					this.autoPlayTimer = null;
				}
				this.isAutoPlay = true;
				this.autoPlayTimer = setInterval(() => {
					this.next(false);
				}, this.autoPlayInterval);
			},
			// 停止自动播放
			stopAutoPlay() {
				this.isAutoPlay = false;
				if (this.autoPlayTimer) {
					clearInterval(this.autoPlayTimer);
					this.autoPlayTimer = null;
				}
			},
			// 增加播放速度（减少间隔时间）
			increaseSpeed() {
				if (this.autoPlayInterval > 1000) {
					this.autoPlayInterval -= 1000;
					if (this.isAutoPlay) {
						this.startAutoPlay();
					}
				}
			},
			// 减少播放速度（增加间隔时间）
			decreaseSpeed() {
				if (this.autoPlayInterval < 10000) {
					this.autoPlayInterval += 1000;
					if (this.isAutoPlay) {
						this.startAutoPlay();
					}
				}
			}
		},
		mounted() {
			this.deviceSupportInstall();
			if (this.appendToBody) {
				document.body.appendChild(this.$el);
			}
			// add tabindex then wrapper can be focusable via Javascript
			// focus wrapper so arrow key can't cause inner scroll behavior underneath
			this.$refs["el-image-viewer__wrapper"].focus();

			// prevent body scroll
			prevOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";
		},
		destroyed() {
			document.body.style.overflow = prevOverflow;
			// if appendToBody is true, remove DOM node after destroy
			if (this.appendToBody && this.$el && this.$el.parentNode) {
				this.$el.parentNode.removeChild(this.$el);
			}
		}
	});
}
</script>
<style lang="less">
.el-image-viewer__wrapper {
	.speed-text {
		-size: var(--ui--size, 16px);
	}
}

/* 图片加载时的毛玻璃效果 */
.el-image-viewer__canvas {
	position: relative;
}

.el-image-viewer__img-blur {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(20px);
	border-radius: 12px;
	z-index: 10;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	transition: all 0.3s ease;
}
</style>
