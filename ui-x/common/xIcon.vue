<template>
	<xIcon
		v-if="cpt_img_inner === 'loading'"
		icon="loading"
		@click="handleClick"
		:data-origin-img-src="cpt_img" />
	<img
		v-else-if="cpt_img"
		:src="cpt_img_inner"
		@click="handleClick"
		:data-origin-img-src="cpt_img" />
	<svg
		v-else
		:data-icon-name="cptIconName"
		:class="['xIcon', cptIconName]"
		v-bind="$attrs"
		@click="handleClick"
		:fill="cptFill">
		<use :xlink:href="cptHref" />
		<animateTransform
			attributeName="transform"
			type="rotate"
			from="0 0 0"
			to="360 0 0"
			dur="3s"
			repeatCount="indefinite"
			v-if="cptNeedRotation" />
	</svg>
</template>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	PRIVATE_GLOBAL._xIcon_cached_img =
		PRIVATE_GLOBAL._xIcon_cached_img || _.$lStorage._xIcon_cached_img || {};
	/* icon对应 /assets/svg 文件夹下的文件名*/
	/* color 可以改变svg color 没有就继承父元素的color */
	const rotationIndefinite = (dur = 1.2) =>
		`<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="${dur}s" repeatCount="indefinite" />`;
	return defineComponent({
		componentName: "xIcon",
		/* 是否开启图片缓存 通过url保存为blob */
		props: {
			icon: String,
			color: String,
			/*  */
			checkSize: {
				type: [Boolean],
				default: false
			},
			img: String,
			/*是否需要缓存图片*/
			iscache: {
				type: [Boolean, String],
				default: false
			}
		},
		created() {
			const vm = this;
			const { cpt_current_img_prop, do_cache_img } = vm;

			(async (/*尝试获取img缓存数据*/) => {
				vm.cached_img_src = await _.$idb.get(cpt_current_img_prop);
			})();

			vm.$on("update_cached_img_src", async () => {
				vm.cached_img_src = await _.$idb.get(cpt_current_img_prop);
				if (!vm.cached_img_src) {
					if (
						!["pendding"].includes(
							PRIVATE_GLOBAL._xIcon_cached_img[cpt_current_img_prop]
						)
					) {
						/*保证是同步处理，同样的url只发送一次请求*/
						do_cache_img();
						/*用的是图片，并且需要缓存*/
					}
				}
			});
		},
		setup() {
			const vm = this;

			function updateSvgHeight() {
				try {
					const $el = $(vm.$el);
					let fontSize = $el.css("fontSize");
					[fontSize] = fontSize.match(/\d+(\.\d+)?/);
					// 设置SVG的高度
					$el.height(fontSize);
					$el.width(fontSize);
				} catch (error) {
					console.error(error);
				}
			}

			onMounted(() => {
				if (vm.checkSize) {
					updateSvgHeight();
				}
			});
		},
		data() {
			//
			return {
				cached_img_src: "",
				isLoaded: false
			};
		},
		computed: {
			cpt_current_img_prop({ cpt_img }) {
				return `xIcon_cached_img_${_.snakeCase(cpt_img)}`;
			},

			cptFill() {
				return this.useCurrentColor ? "currentColor" : "inherit";
			},
			useCurrentColor() {
				return _.$isInput(this.$attrs.useCurrentColor) && this.$attrs.useCurrentColor;
			},
			cptNeedRotation() {
				return this.cptHref === "#_svg_icon_loading";
			},
			/*通过img属性传入的原始url*/
			cpt_img() {
				if (this.img) {
					return _.$resolvePath(this.img || this.$attrs.img || "");
				} else {
					return "";
				}
			},
			/*经过处理后的用于展示的img url*/
			cpt_img_inner({
				iscache,
				cached_img_src,
				cpt_current_img_prop,
				cpt_img,
				do_cache_img
			}) {
				/*如果需要缓存*/
				if (iscache) {
					/*且已经缓存，直接用缓存的值*/
					if (cached_img_src) {
						return cached_img_src;
					}

					const imgStatus = PRIVATE_GLOBAL._xIcon_cached_img[cpt_current_img_prop];
					console.log(cpt_current_img_prop, imgStatus);

					if (["done"].includes(imgStatus)) {
						this.$emit("update_cached_img_src", "self");
					} else if (!["pendding"].includes(imgStatus)) {
						/*保证是同步处理，同样的url只发送一次请求*/
						do_cache_img();
						/*用的是图片，并且需要缓存*/
					}

					/*如果正在请求,临时用loading替代原有图片*/
					return "loading";
				} else {
					/*不需要缓慢，直接用原始的*/
					return cpt_img;
				}
			},
			cptIconUrl() {
				const url = _.$resolveSvgIcon(this.cptOriginIconName);
				return _.$resolvePath(url);
			},
			cptColor() {
				return this.color || this.$attrs.color || $(this.$el).css("color") || "inherit";
			},
			cptOriginIconName() {
				return this.icon || this.$attrs.icon || "loading";
			},
			cptIconName() {
				let iconName = this.cptOriginIconName;

				if (/^http/gi.test(iconName)) {
					return _.snakeCase(iconName);
				}
				return iconName;
			},
			cptHref() {
				if (!this.isLoaded) {
					return "#_svg_icon_loading";
				}
				return this.cptSelector;
			},
			cptSelector() {
				return `#_svg_icon_${this.cptIconName}`;
			},
			cptId() {
				return `_svg_icon_${this.cptIconName}`;
			}
		},
		watch: {
			cptIconName: {
				immediate: true,
				handler(iconName) {
					this.loadSVG();
				}
			},
			cptColor: {
				immediate: true,
				handler(cptColor) {
					this.resetIconColor();
				}
			}
		},
		methods: {
			async_set_chched_img_src(src) {
				const { cpt_current_img_prop } = this;
				PRIVATE_GLOBAL._xIcon_cached_img[cpt_current_img_prop] = "done";
				_.$lStorage._xIcon_cached_img = PRIVATE_GLOBAL._xIcon_cached_img;
				this.cached_img_src = src;
				this.$root.broadcast("xIcon", "update_cached_img_src");
			},
			do_cache_img() {
				const { cpt_current_img_prop, async_do_cache_img } = this;
				PRIVATE_GLOBAL._xIcon_cached_img[cpt_current_img_prop] = "pendding";
				_.$lStorage._xIcon_cached_img = PRIVATE_GLOBAL._xIcon_cached_img;
				async_do_cache_img();
			},
			async async_do_cache_img() {
				const vm = this;
				const { cpt_current_img_prop, cpt_img, async_set_chched_img_src } = vm;
				let cached_img_src = "";
				try {
					cached_img_src = await _.$idb.get(vm.cpt_current_img_prop);
					if (!cached_img_src) {
						cached_img_src = await new Promise(async resolve => {
							_.$ajax.downloadOctetStream({
								url: cpt_img,
								resolveResult: blob => {
									const reader = new FileReader();
									reader.onload = async () => {
										const base64Data = reader.result;
										await _.$idb.set(cpt_current_img_prop, base64Data);
										resolve(base64Data);
									};
									reader.readAsDataURL(blob);
								}
							});
						});
					}
				} catch (error) {
					console.error(error);
				} finally {
					cached_img_src && async_set_chched_img_src(cached_img_src);
				}
			},

			resetIconColor() {
				// $(this.$el).css("color", this.cptColor);
			},
			handleClick(event) {
				if (this.$listeners.click) {
					this.$listeners.click(event);
				}
			},
			async loadSVG() {
				this.isLoaded = await (async () => {
					// 校验关键变量是否有效
					if (!this.cptSelector || !this.cptIconUrl) {
						console.error("cptSelector 或 cptIconUrl 无效");
						return false;
					}

					let isLoaded = false;

					try {
						const $svg = $(this.cptSelector);

						// 如果目标 SVG 已存在，直接返回成功
						if ($svg.length > 0) {
							isLoaded = true;
						} else {
							/* useXui xIconUseSvgInit 保证 $("#__SVG_SPRITE_NODE__")*/
							// 确保 SVG 容器存在
							const $svgWrapper = $("#__SVG_SPRITE_NODE__");
							if (!$svgWrapper.length) {
								console.error("__SVG_SPRITE_NODE__ 不存在");
								return false;
							}

							// 加载 SVG 内容
							const svgContent = await _.$loadText(this.cptIconUrl);
							if (!svgContent.includes("<svg ")) {
								console.warn("加载的 SVG 内容无效");
								return false;
							}

							// 解析并处理 SVG 内容
							const $svgContent = $(svgContent);
							const width = $svgContent.attr("width") || "";
							const height = $svgContent.attr("height") || "";

							$svgContent
								.attr({
									id: this.cptId,
									fill: "inherit",
									viewBox: width && height ? `0 0 ${width} ${height}` : undefined
								})
								.removeAttr("width")
								.removeAttr("height");

							// 将 SVG 内容追加到容器中
							$svgWrapper.append($svgContent);

							// 如果是加载图标，添加旋转效果
							if (this.cptIconName === "loading") {
								const rotationElement = rotationIndefinite(3);
								if (rotationElement) {
									$svgWrapper.append(rotationElement);
								}
							}

							isLoaded = true;
						}
					} catch (error) {
						console.error("加载 SVG 时发生错误:", error.message);
						return false; // 明确返回失败状态
					}

					return isLoaded;
				})();
			}
		}
	});
}
</script>
<style lang="less">
.xIcon {
	display: inline-block;
	width: var(--xIcon-width, 16px);
	height: var(--xIcon-height, 16px);
}
</style>
