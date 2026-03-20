<template>
	<transition name="viewer-fade">
		<div
			v-xloading="loading"
			tabindex="-1"
			ref="el-image-viewer__wrapper"
			class="el-image-viewer__wrapper"
			:style="{ 'z-index': viewerZIndex }">
			<div
				ref="el-image-viewer__mask"
				class="el-image-viewer__mask"
				@click.self="handle_click_mask"
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
						@click="handleActions('anticlockwise')"></xIcon>
					<xIcon
						class="el-icon-refresh-right"
						icon="refresh-right"
						@click="handleActions('clockwise')"></xIcon>
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
			<div :class="{ 'el-image-viewer__canvas': true, hidden: isHiddenImg }">
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
				isHiddenImg: true,
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
				autoPlayTimer: null,
				// 屏幕常亮相关
				wakeLock: null,
				// 英雄动画相关状态
				originDom: null,
				isAnimating: false,
				// 动画起始位置和尺寸
				originRect: null,
				// 动画结束位置和尺寸
				targetRect: null,
				// 动画进度
				animationProgress: 0,
				// 动画持续时间（毫秒）
				animationDuration: 400
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
				// 如果正在进行英雄动画或有源DOM（说明刚刚动画结束），返回空对象
				// 这样可以确保我们通过 DOM 操作设置的居中样式不会被 Vue 的响应式系统覆盖
				if (this.isAnimating || this.originRect) {
					return {};
				}

				// 正常状态样式
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
			async hide() {
				// 如果正在动画，先取消动画
				if (this.isAnimating) {
					this.cancelAnimation();
				}

				if (this._origin_rect_for_hide) {
					// 如果有源DOM，播放关闭动画
					await this.closeHeroAnimation();
					this._origin_rect_for_hide = null;
				}

				// 直接隐藏，不播放关闭动画
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
			handle_click_mask() {
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
					case "clockwise":
						transform.deg += rotateDeg;
						break;
					case "anticlockwise":
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
				// 请求屏幕常亮
				this.requestWakeLock();
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
				// 释放屏幕常亮
				this.releaseWakeLock();
			},
			// 请求屏幕常亮
			requestWakeLock() {
				// 检查浏览器是否支持Wake Lock API
				if ("wakeLock" in navigator) {
					navigator.wakeLock
						.request("screen")
						.then(lock => {
							this.wakeLock = lock;
							// 监听释放事件
							lock.addEventListener("release", () => {
								this.wakeLock = null;
							});
						})
						.catch(err => {
							// 请求失败，可能是用户拒绝或浏览器不支持
							console.log("Wake Lock request failed:", err);
						});
				}
			},
			// 释放屏幕常亮
			releaseWakeLock() {
				if (this.wakeLock) {
					this.wakeLock.release().then(() => {
						this.wakeLock = null;
					});
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
			},

			// 计算动画的起始和结束值
			getAnimationValues() {
				// 起始值：源DOM的位置和尺寸
				const startLeft = this.originRect.left;
				const startTop = this.originRect.top;
				const startWidth = this.originRect.width;
				const startHeight = this.originRect.height;

				// 结束值：全屏预览的位置和尺寸
				const windowWidth = window.innerWidth;
				const windowHeight = window.innerHeight;

				// 计算结束位置和尺寸（居中显示）
				let endWidth, endHeight;
				if (isMobile) {
					// 移动端全屏显示
					endWidth = windowWidth * 0.9;
					endHeight = windowHeight * 0.8;
				} else {
					// 桌面端限制最大尺寸
					endWidth = Math.min(800, windowWidth * 0.8);
					endHeight = Math.min(600, windowHeight * 0.8);
				}

				const endLeft = (windowWidth - endWidth) / 2;
				const endTop = (windowHeight - endHeight) / 2;

				return {
					startLeft,
					startTop,
					startWidth,
					startHeight,
					endLeft,
					endTop,
					endWidth,
					endHeight
				};
			},

			// 切换到新图片的动画，与 hero_animation.html 完全一致
			switchToImageWithAnimation() {
				// 如果正在动画，先取消当前动画
				if (this.isAnimating) {
					this.cancelAnimation();
				}

				// 直接切换到新图片，不需要先关闭
				this.startHeroAnimation();
			},

			// 开始 FLIP 动画，与 hero_animation.html 完全一致
			async startHeroAnimation() {
				console.log("=== 开始英雄动画 ===");

				// 如果没有提供源DOM，直接显示
				if (!this.originDom) {
					console.log("没有提供源DOM，直接显示");
					this.isHiddenImg = false;
					this.isAnimating = false;
					// 确保 originRect 为 null，让 imgStyle 计算属性返回正常样式
					this.originRect = null;
					// 普通预览时，确保 mask 样式正确
					const mask = this.$refs["el-image-viewer__mask"];
					if (mask) {
						mask.style.opacity = "0.5";
						mask.style.pointerEvents = "auto";
					}
					return;
				}

				// 获取源DOM的位置和尺寸
				console.log("获取源DOM的位置和尺寸");
				const originElement =
					typeof this.originDom === "string" ? $(this.originDom)[0] : this.originDom;

				if (!originElement) {
					console.log("没有找到源DOM元素");
					this.isAnimating = false;
					return;
				}

				this.isAnimating = true;

				// 立即获取新卡片的位置信息
				console.log("立即获取源处的位置信息");
				const rect = originElement.getBoundingClientRect();
				// 保存源 DOM 信息，以便在动画过程中使用
				this.originRect = {
					left: rect.left,
					top: rect.top,
					width: rect.width,
					height: rect.height,
					// 保存对原始 DOM 的引用
					element: originElement
				};
				console.log("源DOM尺寸:", this.originRect);

				// 立即设置图片的初始位置和尺寸（无动画）
				console.log("立即设置图片的初始位置和尺寸");
				const previewImgDom = this.$refs.img;

				if (previewImgDom) {
					// 确保 DOM 更新完成，图片元素可用
					await _.$sleep(32);
					console.log("图片元素:", previewImgDom);
					console.log(
						"源图片自然尺寸:",
						previewImgDom.naturalWidth,
						"x",
						previewImgDom.naturalHeight
					);

					// 重置所有样式到初始状态（无动画）
					previewImgDom.style.transition = "none";
					previewImgDom.style.width = rect.width + "px";
					previewImgDom.style.height = rect.height + "px";
					previewImgDom.style.left = rect.left + "px";
					previewImgDom.style.top = rect.top + "px";
					previewImgDom.style.transform = "translate(0, 0)";
					previewImgDom.style.maxWidth = "none";
					previewImgDom.style.maxHeight = "none";

					// 强制刷新 DOM，确保样式更新生效
					console.log("强制刷新 DOM，确保样式更新生效");
					previewImgDom.getBoundingClientRect();
					this.isHiddenImg = false;

					// 显示覆盖层和预览 - 为 hero 动画设置 mask 样式
					console.log("显示覆盖层和预览");
					const mask = this.$refs["el-image-viewer__mask"];
					if (mask) {
						mask.style.opacity = "0.5";
						mask.style.pointerEvents = "auto";
					}
					previewImgDom.style.opacity = "1";
					previewImgDom.style.pointerEvents = "auto";
					// 开启动画
					console.log("开启动画");
					previewImgDom.style.transition = "all 0.42s cubic-bezier(0.2, 0, 0, 1)";

					// 根据源图片尺寸计算预览图尺寸，保持宽高比
					let targetWidth, targetHeight;
					const imgWidth = previewImgDom.naturalWidth || 800;
					const imgHeight = previewImgDom.naturalHeight || 600;
					const aspectRatio = imgWidth / imgHeight;

					// 计算最大可显示尺寸（限制在屏幕范围内）
					const maxWidth = window.innerWidth * 0.8;
					const maxHeight = window.innerHeight * 0.8;
					console.log("计算最大可显示尺寸:", maxWidth, "x", maxHeight);

					if (aspectRatio > 1) {
						console.log("宽屏图片");
						targetWidth = Math.min(imgWidth, maxWidth);
						targetHeight = targetWidth / aspectRatio;
						// 确保高度不超过最大高度
						if (targetHeight > maxHeight) {
							targetHeight = maxHeight;
							targetWidth = targetHeight * aspectRatio;
						}
					} else {
						console.log("竖屏图片");
						targetHeight = Math.min(imgHeight, maxHeight);
						targetWidth = targetHeight * aspectRatio;
						// 确保宽度不超过最大宽度
						if (targetWidth > maxWidth) {
							targetWidth = maxWidth;
							targetHeight = targetWidth / aspectRatio;
						}
					}
					console.log("目标尺寸:", targetWidth, "x", targetHeight);

					// 放大到中央
					console.log("放大到中央");
					previewImgDom.style.position = "fixed";
					previewImgDom.style.left = "50%";
					previewImgDom.style.top = "50%";
					previewImgDom.style.transform = "translate(-50%, -50%)";
					previewImgDom.style.width = targetWidth + "px";
					previewImgDom.style.height = targetHeight + "px";

					// 动画完成后更新状态
					setTimeout(() => {
						console.log("动画完成");
						this.isAnimating = false;
						// 确保动画结束后样式不会被覆盖
						if (previewImgDom) {
							// 重要：清除 originRect，让 imgStyle 计算属性返回正常样式
							$(previewImgDom).addClass("no-transition").removeAttr("style");

							this._origin_rect_for_hide = this.originRect;
							this.originRect = null;
							setTimeout(() => {
								$(previewImgDom).removeClass("no-transition");
								/* transition: 0.42s */
							}, 420);
						}
					}, 420);
				}
			},

			// 取消当前动画，与 hero_animation.html 一致
			cancelAnimation() {
				console.log("=== 取消动画 ===");
				const $img = this.$refs.img;
				if ($img) {
					// 强制停止所有动画
					$img.style.transition = "none";
					$img.getBoundingClientRect();
				}
				this.isAnimating = false;
				// 清理源 DOM 信息，防止动画过程中再次使用无效的 DOM 元素
				this.originRect = null;
				console.log("动画取消完成");
			},

			// 关闭动画，与 hero_animation.html 一致
			async closeHeroAnimation() {
				return new Promise(async resolve => {
					console.log("=== 开始关闭英雄动画 ===");
					if (!this._origin_rect_for_hide || this.isAnimating) {
						console.log("无原始位置信息或正在动画中，取消关闭");
						return;
					}

					this.isAnimating = true;
					console.log("原始位置信息:", this._origin_rect_for_hide);

					if (this.$refs?.img && this._origin_rect_for_hide) {
						console.log("开始动画回到原图位置");
						// 回到原图位置，使用保存的尺寸和位置信息，不依赖原始 DOM
						const $img = $(this.$refs?.img);

						$img.css({
							position: "fixed",
							width: $img.width() + "px",
							height: $img.height() + "px",
							left: $img.offset().left + "px",
							top: $img.offset().top + "px"
						});

						// await _.$sleep(1);
						$img[0].getBoundingClientRect();

						const { width, height, left, top } = this._origin_rect_for_hide;

						$img.css({
							width: width + "px",
							height: height + "px",
							left: left + "px",
							top: top + "px"
						});

						await _.$sleep(420);

						console.log("动画完成，隐藏覆盖层和预览");
						// 隐藏覆盖层和预览
						const mask = this.$refs["el-image-viewer__mask"];

						if (mask) {
							mask.style.opacity = "0";
						}

						this.isAnimating = false;
						this._origin_rect_for_hide = null; // 清理所有源 DOM 信息
						console.log("=== 英雄动画完全关闭 ===");
						resolve("=== 英雄动画完全关闭 ===");
					}
				});
			},

			// 动画帧更新方法
			animate() {
				const startTime = performance.now();

				const animateFrame = currentTime => {
					const elapsedTime = currentTime - startTime;
					const progress = Math.min(elapsedTime / this.animationDuration, 1);

					// 使用缓动函数使动画更自然
					this.animationProgress = this.easeInOutQuad(progress);

					if (progress < 1) {
						requestAnimationFrame(animateFrame);
					} else {
						// 动画结束，恢复正常状态
						this.isAnimating = false;
						this.originRect = null;
						this.targetRect = null;
					}
				};

				requestAnimationFrame(animateFrame);
			},

			// 缓动函数 - 先加速后减速
			easeInOutQuad(t) {
				return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
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

			// 检查是否需要开始英雄动画
			this.$nextTick(() => {
				this.startHeroAnimation();
			});
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
	&.hidden {
		opacity: 0;
	}
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

/* 预览图片基础样式 */
.el-image-viewer__img {
	&.no-transition {
		transition: none;
	}
	transition: all 0.42s cubic-bezier(0.2, 0, 0, 1);
	will-change: transform;
}
</style>
