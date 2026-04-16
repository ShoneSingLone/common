<template>
	<div
		v-if="cpt_is_dev"
		class="x-dev-component"
		ref="rootRef"
		:style="componentStyle"
		@click="updateZIndex">
		<!-- 标题栏 - 可拖动和折叠控制 -->
		<div class="x-dev-header">
			<!-- 折叠/展开按钮 -->
			<button class="x-dev-toggle-btn" @click="toggleCollapse">{{
				isCollapsed ? "▶" : "▼"
			}}</button>
			<!-- 标题文本 -->
			<span :style="titleStyle" v-xmove="moveOptions">Debug Info</span>
			<!-- 关闭按钮 -->
			<button class="x-dev-close-btn" @click="closeComponent">×</button>
		</div>
		<!-- 内容区域 - 可折叠 -->
		<div class="x-dev-content" :style="contentStyle">
			<template v-if="$slots.default">
				<slot></slot>
			</template>
			<template v-else>
				<pre><code>{{ contentsText }}</code></pre>
			</template>
		</div>
	</div>
</template>

<script>
export default async function () {
	const [PopupManager] = await _.$importVue(["/common/libs/VuePopper/popupManager.vue"]);
	return defineComponent({
		props: ["contents"],
		setup(props, { emit, slots }) {
			// 组件根元素引用
			const rootRef = ref(null);

			// 可折叠状态 - 默认折叠
			const isCollapsed = ref(true);

			// 计算内容文本
			const contentsText = computed(() => {
				try {
					return JSON.stringify(props.contents, null, 2);
				} catch (error) {
					console.log(props.contents);
					return "error";
				}
			});

			// 标题文本样式
			const titleStyle = computed(() => ({
				fontWeight: "bold",
				fontSize: "14px",
				color: "#303133",
				flex: 1,
				marginLeft: "8px"
			}));

			// 组件位置样式
			const componentStyle = computed(() => ({
				left: `${position.x}px`,
				top: `${position.y}px`
			}));

			// 内容区域显示样式
			const contentStyle = computed(() => ({
				display: isCollapsed.value ? "none" : "block"
			}));

			// 折叠/展开切换
			const toggleCollapse = () => {
				// 点击时更新zIndex，保持置顶
				rootRef.value.style.zIndex = PopupManager.nextZIndex();
				isCollapsed.value = !isCollapsed.value;
			};

			// 关闭组件
			const closeComponent = () => {
				emit("close");
			};

			// 更新zIndex，保持置顶
			const updateZIndex = () => {
				rootRef.value.style.zIndex = PopupManager.nextZIndex();
			};

			// 位置状态用于拖动
			const position = reactive({ x: 20, y: 20 });

			// v-xmove 配置选项
			const moveOptions = {
				x: 0,
				y: 0,
				onStart({ $ele, clickInfo, clickEvent }) {
					// 检查点击目标，如果是按钮则不执行拖动
					if (
						clickEvent.target.tagName === "BUTTON" ||
						clickEvent.target.closest("button")
					) {
						// 是按钮点击，不执行拖动逻辑
						return false;
					}
					// 拖动时更新zIndex，保持置顶
					rootRef.value.style.zIndex = PopupManager.nextZIndex();
					// 记录初始位置
					this.x = position.x;
					this.y = position.y;
					// 阻止默认行为
					clickEvent.preventDefault();
				},
				onMoving: _.throttle(function ({ clickEvent, movingEvent }) {
					// 计算新位置
					const deltaX = movingEvent.clientX - clickEvent.clientX;
					const deltaY = movingEvent.clientY - clickEvent.clientY;
					// 更新响应式状态
					position.x = this.x + deltaX;
					position.y = this.y + deltaY;
				}, 70)
			};

			// 组件挂载时处理DOM
			onMounted(() => {
				// 确保组件在body中
				nextTick(() => {
					if (rootRef.value && rootRef.value.parentNode !== document.body) {
						// 将组件移到body中
						document.body.appendChild(rootRef.value);
					}
					// 初始化zIndex
					rootRef.value.style.zIndex = PopupManager.nextZIndex();
				});
			});

			// 组件销毁时清理资源
			onUnmounted(() => {
				// 清理DOM元素
				if (rootRef.value) {
					// 移除组件元素
					if (rootRef.value.parentNode) {
						rootRef.value.parentNode.removeChild(rootRef.value);
					}
					// 清空引用
					rootRef.value = null;
				}
			});

			return {
				rootRef,
				isCollapsed,
				contentsText,
				titleStyle,
				componentStyle,
				contentStyle,
				toggleCollapse,
				closeComponent,
				updateZIndex,
				position,
				moveOptions
			};
		},
		computed: {
			cpt_is_dev() {
				return localStorage.isDev === "DEV";
			}
		}
	});
}
</script>

<style scoped>
.x-dev-component {
	position: fixed;
	z-index: 9999;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
	width: 300px;
	font-family:
		Monaco,
		Menlo,
		Consolas,
		Courier New,
		monospace;
	font-size: 12px;
	transition: all 0.3s ease;
	pointer-events: auto;
}

.x-dev-header {
	padding: 8px 12px;
	background: #f5f7fa;
	border-bottom: 1px solid #e4e7ed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: move;
	border-radius: 4px 4px 0 0;
	user-select: none;
}

.x-dev-toggle-btn {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 14px;
	padding: 0 4px;
	color: #606266;
	transition: color 0.2s;
}

.x-dev-toggle-btn:hover {
	color: #409eff;
}

.x-dev-close-btn {
	background: none;
	border: none;
	cursor: pointer;
	font-size: 16px;
	padding: 0 4px;
	color: #909399;
	line-height: 1;
	transition: color 0.2s;
}

.x-dev-close-btn:hover {
	color: #f56c6c;
}

.x-dev-content {
	overflow: auto;
	transition: all 0.3s ease;
	max-height: 400px;
}

.x-dev-content pre {
	margin: 0;
	padding: 12px;
	background: #fafafa;
	color: #303133;
	line-height: 1.5;
	overflow-x: auto;
}

.x-dev-content code {
	color: #303133;
	word-break: break-all;
}
</style>
