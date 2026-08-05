<template>
	<transition name="x-cache-reloader-fade">
		<div
			v-show="visible"
			class="x-cache-reloader-wrapper"
			:class="cpt_position_class"
			@mouseenter="on_hover_enter"
			@mouseleave="on_hover_leave">
			<div class="x-cache-reloader-card">
				<!-- 头部：图标 + 标题 + 版本号 + 关闭按钮 -->
				<div class="x-cache-reloader-header">
					<xIcon :icon="icon" class="x-cache-reloader-icon" />
					<div class="x-cache-reloader-title-wrap">
						<div class="x-cache-reloader-title">{{ title }}</div>
						<div v-if="cpt_version_label" class="x-cache-reloader-version">
							{{ cpt_version_label }}
						</div>
					</div>
					<xIcon
						v-if="cpt_can_dismiss"
						icon="close"
						class="x-cache-reloader-close"
						@click="dismiss" />
				</div>

				<!-- 更新日志列表 -->
				<ul v-if="changelog && changelog.length" class="x-cache-reloader-changelog">
					<li
						v-for="(item, index) in changelog"
						:key="index"
						:class="cpt_changelog_item_class(item)">
						<span class="x-cache-reloader-dot"></span>
						<span class="x-cache-reloader-text">{{ cpt_changelog_item_text(item) }}</span>
					</li>
				</ul>

				<!-- 底部：按钮区 + 倒计时 -->
				<div class="x-cache-reloader-footer">
					<xBtn
						v-if="cpt_can_dismiss"
						:configs="cpt_btn_dismiss" />
					<xBtn :configs="cpt_btn_reload" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		name: "xCacheReloader",
		props: {
			/* 当前版本号，默认读取 window.APP_VERSION */
			version: {
				type: String,
				default: ""
			},
			/* 更新亮点列表：字符串数组 或 { text, type } 对象数组 */
			changelog: {
				type: Array,
				default: () => []
			},
			/* 浮窗标题 */
			title: {
				type: String,
				default: "发现新版本"
			},
			/* 主按钮文案 */
			buttonText: {
				type: String,
				default: "立即体验"
			},
			/* 次按钮（忽略）文案，为空则不显示 */
			dismissText: {
				type: String,
				default: "稍后"
			},
			/* 倒计时秒数，到 0 自动触发重载；传 0 表示不自动重载 */
			countdown: {
				type: Number,
				default: 0
			},
			/* 倒计时结束后是否自动消失（不重载） */
			autoDismiss: {
				type: Boolean,
				default: false
			},
			/* 浮窗位置 */
			position: {
				type: String,
				default: "bottom-right"
			},
			/* 自定义图标名 */
			icon: {
				type: String,
				default: "refresh"
			},
			/* 需要同步清除的 localStorage key 列表 */
			clearStorageKeys: {
				type: Array,
				default: () => []
			},
			/* 重载前的钩子，支持 async，返回 false 可取消重载 */
			onBeforeReload: {
				type: Function,
				default: null
			},
			/* 执行清缓存+重载后的回调（重载前同步执行） */
			onReload: {
				type: Function,
				default: null
			},
			/* 用户点击"稀后"的回调 */
			onDismiss: {
				type: Function,
				default: null
			}
		},
		data() {
			return {
				visible: false,
				/* 剩余倒计时秒数 */
				remaining: 0,
				/* 倒计时定时器 */
				timer: null,
				/* 是否正在执行清缓存+重载（防止重复触发） */
				reloading: false
			};
		},
		computed: {
			/* 位置 class */
			cpt_position_class() {
				return "pos-" + this.position;
			},
			/* 版本号展示 */
			cpt_version_label() {
				const v = this.version || window.APP_VERSION || "";
				return v ? "v" + v : "";
			},
			/* 是否显示"稀后"按钮 */
			cpt_can_dismiss() {
				return !!this.dismissText;
			},
			/* 主按钮 configs：倒计时模式下文案带秒数 */
			cpt_btn_reload() {
				const vm = this;
				let label = vm.buttonText;
				if (vm.countdown > 0 && vm.remaining > 0) {
					label = vm.buttonText + "（" + vm.remaining + "s）";
				}
				return {
					label: label,
					preset: "blue",
					loading: vm.reloading,
					onClick: () => {
						vm.reload();
					}
				};
			},
			/* 次按钮 configs */
			cpt_btn_dismiss() {
				const vm = this;
				return {
					label: vm.dismissText,
					preset: "plain",
					onClick: () => {
						vm.dismiss();
					}
				};
			}
		},
		watch: {
			visible(val) {
				if (val) {
					this.start_countdown();
				} else {
					this.stop_countdown();
				}
			}
		},
		methods: {
			/* 手动弹出浮窗 */
			show() {
				this.visible = true;
				this.$emit("show");
				console.log("[xCacheReloader] show", {
					version: this.cpt_version_label,
					changelog: this.changelog
				});
			},
			/* 关闭浮窗（不重载） */
			dismiss() {
				this.visible = false;
				this.$emit("dismiss");
				if (typeof this.onDismiss === "function") {
					this.onDismiss();
				}
			},
			/* 立即执行清缓存 + 重载 */
			async reload() {
				if (this.reloading) return;
				this.reloading = true;

				/* 【需求】重载前钩子：返回 false 取消重载 */
				if (typeof this.onBeforeReload === "function") {
					try {
						const ok = await this.onBeforeReload();
						if (ok === false) {
							this.reloading = false;
							return;
						}
					} catch (e) {
						console.error("[xCacheReloader] onBeforeReload error", e);
						this.reloading = false;
						return;
					}
				}

				console.log("[xCacheReloader] 开始清缓存 + 重载", {
					version: this.cpt_version_label,
					clearStorageKeys: this.clearStorageKeys
				});

				/* 【需求】清空 IndexedDB 缓存（.vue 源码缓存等） */
				try {
					if (_.$idb) {
						await _.$idb.clear();
					}
				} catch (e) {
					console.error("[xCacheReloader] _.$idb.clear error", e);
				}

				/* 【需求】同步清除指定 localStorage key */
				if (this.clearStorageKeys && this.clearStorageKeys.length) {
					this.clearStorageKeys.forEach(key => {
						try {
							localStorage.removeItem(key);
						} catch (e) {
							console.error("[xCacheReloader] localStorage.removeItem error", key, e);
						}
					});
				}

				/* 重载前回调 */
				this.$emit("reload");
				if (typeof this.onReload === "function") {
					try {
						this.onReload();
					} catch (e) {
						console.error("[xCacheReloader] onReload error", e);
					}
				}

				/* 【需求】强制重新加载页面 */
				location.reload(true);
			},
			/* 倒计时相关 */
			start_countdown() {
				this.stop_countdown();
				if (this.countdown > 0) {
					this.remaining = this.countdown;
					this.timer = setInterval(() => {
						this.remaining--;
						if (this.remaining <= 0) {
							this.stop_countdown();
							if (this.autoDismiss) {
								this.dismiss();
							} else {
								this.reload();
							}
						}
					}, 1000);
				}
			},
			stop_countdown() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			/* hover 暂停倒计时 */
			on_hover_enter() {
				this.stop_countdown();
			},
			on_hover_leave() {
				if (this.visible && this.countdown > 0 && this.remaining > 0) {
					this.timer = setInterval(() => {
						this.remaining--;
						if (this.remaining <= 0) {
							this.stop_countdown();
							if (this.autoDismiss) {
								this.dismiss();
							} else {
								this.reload();
							}
						}
					}, 1000);
				}
			},
			/* changelog 项 class */
			cpt_changelog_item_class(item) {
				const type = (item && item.type) || "info";
				return "log-item log-item-" + type;
			},
			/* changelog 项文本 */
			cpt_changelog_item_text(item) {
				if (_.isString(item)) return item;
				return (item && item.text) || "";
			}
		},
		mounted() {
			/* 默认不可见，需调用 show() 或 v-model 控制 */
		},
		beforeDestroy() {
			this.stop_countdown();
		}
	});
}
</script>

<style lang="less">
.x-cache-reloader-wrapper {
	position: fixed;
	z-index: 9999;
	width: 360px;

	&.pos-bottom-right {
		right: 24px;
		bottom: 24px;
	}
	&.pos-top-right {
		right: 24px;
		top: 24px;
	}
	&.pos-bottom-left {
		left: 24px;
		bottom: 24px;
	}
	&.pos-top-left {
		left: 24px;
		top: 24px;
	}
}

.x-cache-reloader-card {
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	border: 1px solid var(--el-border-color-lighter, #e4e7ed);
	overflow: hidden;
}

.x-cache-reloader-header {
	display: flex;
	align-items: center;
	padding: 16px 16px 8px 16px;

	.x-cache-reloader-icon {
		width: 28px;
		height: 28px;
		font-size: 28px;
		color: var(--x-color-primary, #409eff);
		margin-right: 12px;
		flex-shrink: 0;
	}

	.x-cache-reloader-title-wrap {
		flex: 1;
		min-width: 0;
	}

	.x-cache-reloader-title {
		font-size: 16px;
		font-weight: 700;
		color: var(--el-text-color-primary, #303133);
		line-height: 22px;
	}

	.x-cache-reloader-version {
		font-size: 12px;
		color: var(--el-text-color-secondary, #909399);
		margin-top: 2px;
	}

	.x-cache-reloader-close {
		width: 16px;
		height: 16px;
		font-size: 16px;
		color: var(--el-text-color-secondary, #909399);
		cursor: pointer;
		flex-shrink: 0;

		&:hover {
			color: var(--el-text-color-primary, #303133);
		}
	}
}

.x-cache-reloader-changelog {
	list-style: none;
	margin: 0;
	padding: 4px 16px 8px 16px;
	max-height: 200px;
	overflow-y: auto;

	li {
		display: flex;
		align-items: flex-start;
		padding: 4px 0;
		font-size: 13px;
		line-height: 20px;
		color: var(--el-text-color-regular, #606266);

		.x-cache-reloader-dot {
			width: 6px;
			height: 6px;
			border-radius: 50%;
			margin: 7px 8px 0 0;
			flex-shrink: 0;
			background: var(--x-color-primary, #409eff);
		}

		&.log-item-success .x-cache-reloader-dot {
			background: #67c23a;
		}
		&.log-item-warning .x-cache-reloader-dot {
			background: #e6a23c;
		}
		&.log-item-error .x-cache-reloader-dot {
			background: #f56c6c;
		}
		&.log-item-info .x-cache-reloader-dot {
			background: #409eff;
		}
	}
}

.x-cache-reloader-footer {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
	padding: 8px 16px 16px 16px;
}

/* 过渡动画 */
.x-cache-reloader-fade-enter-active,
.x-cache-reloader-fade-leave-active {
	transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.x-cache-reloader-fade-enter,
.x-cache-reloader-fade-leave-to {
	opacity: 0;
	transform: translateY(20px) scale(0.95);
}
</style>
