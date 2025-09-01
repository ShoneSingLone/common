<template>
	<div :class="cpt_dialog_class" v-bind="$attrs" ref="refDialog" :style="cptRootStyle">
		<div class="xDialog-body">
			<slot />
		</div>
		<div class="xDialog-footer">
			<slot name="footer" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	/* --xDialog-wrapper-width */
	return {
		props: ["title"],
		inject: {
			INJECT_MODAL: {
				/* xModal */
				type: Object,
				default: () => {
					return { dialog_class: {} };
				}
			}
		},
		setup(props) {
			const INJECT_MODAL = inject("INJECT_MODAL");
			const { useAutoResize, useWindowSize } = _xUtils;
			const { height, width, sizer: refDialog } = useAutoResize(props);
			const { height: windowHeight, width: windowWidth } = useWindowSize();

			let origin = { height: 0, width: 0 };

			const cptRootStyle = computed(() => {
				const rootStyle = () => {
					let _height,
						_width,
						_style = {};

					if (origin.height && height.value > origin.height) {
						_height = origin.height;
						origin.height = 0;
						INJECT_MODAL.dialog_class.fullscreen = false;
					} else if (height.value > windowHeight.value) {
						origin.height = height.value;
						INJECT_MODAL.dialog_class.fullscreen = true;
					}

					if (origin.width && width.value > origin.width) {
						_width = origin.width;
						origin.width = 0;
						INJECT_MODAL.dialog_class.fullscreen = false;
					} else if (width.value > windowWidth.value) {
						/*TODO:*/
						origin.width = width.value;
						INJECT_MODAL.dialog_class.fullscreen = true;
					}

					if (_height) {
						_style.height = _height + "px";
					}
					if (_width) {
						_style.width = _width + "px";
					}
					return _style;
				};

				if (INJECT_MODAL.dialog_class.fullscreen) {
					/* 如果没有显示全屏的icon，resize之后要判断是否还原 */
					if (INJECT_MODAL.isShowFullScreen) {
						return {};
					} else {
						return rootStyle();
					}
				} else {
					return rootStyle();
				}
			});

			return { refDialog, cptRootStyle };
		},
		computed: {
			cpt_dialog_class() {
				const isShowFullScreen = _.$val(this, "INJECT_MODAL.dialog_class.fullscreen");
				return [
					"xDialog xDialog-wrapper",
					{
						fullscreen: isShowFullScreen
					}
				];
			}
		}
	};
}
</script>
<style lang="less">
.xDialog {
	--xDialog-padding: var(--ui-one);

	&.as-div {
		--xDialog-padding: 0;
	}

	&.xDialog-wrapper {
		display: flex;
		flex-flow: column nowrap;
		height: auto;
		height: var(--xDialog-wrapper-height, auto);
		width: var(--xDialog-wrapper-width, 600px);
		max-height: calc(100vh - 200px);
		min-width: unset;

		&.fullscreen {
			max-height: 100vh;
			width: 100vw;
			flex: 1;
			height: 1px;
		}

		&.xDialog-list-view {
			max-height: 100%;

			.xDialog-body {
				padding-top: 0;
				padding-left: 0;
				padding-right: 0;
			}

			.page-content-wrapper {
				// padding: 0;
			}
		}
	}

	.xDialog-body {
		height: 1px;
		flex: 1;
		overflow: auto;
		padding: var(--xDialog-padding);
		display: flex;
		flex-flow: column nowrap;
	}

	.xDialog-footer {
		padding: 0 var(--xDialog-padding) var(--xDialog-padding);
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		align-items: center;

		&:empty {
			display: none;
		}
	}
}
</style>
