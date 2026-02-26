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

			const contents = computed(() => {
				// 检查是否有默认slot
				if (slots.default) {
					return slots.default();
				}
				try {
					return JSON.stringify(props.contents, null, 2);
				} catch (error) {
					console.log(props.contents);
					return "error";
				}
			});

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
				if (this.$el) {
					// 移除组件元素
					if (this.$el.parentNode) {
						this.$el.parentNode.removeChild(this.$el);
					}
					// 清空引用
					this.$el = null;
				}
			});

			// 位置状态用于拖动
			const position = reactive({ x: 20, y: 20 });

			return function () {
				return h(
					"div",
					{
						staticClass: "x-dev-component",
						ref: rootRef,
						// 只保留动态变化的位置样式
						style: {
							left: `${position.x}px`,
							top: `${position.y}px`
						},
						// 点击组件时更新zIndex，保持置顶
						onClick() {
							rootRef.value.style.zIndex = PopupManager.nextZIndex();
						}
					},
					[
						// 标题栏 - 可拖动和折叠控制
						h(
							"div",
							{
								staticClass: "x-dev-header"
							},
							[
								// 折叠/展开按钮
								h(
									"button",
									{
										staticClass: "x-dev-toggle-btn",
										onClick: toggleCollapse
									},
									isCollapsed.value ? "▶" : "▼"
								),
								// 标题文本
								h(
									"span",
									{
										style: {
											fontWeight: "bold",
											fontSize: "14px",
											color: "#303133",
											flex: 1,
											marginLeft: "8px"
										},
										// 使用v-xmove指令实现拖动，只应用在标题栏上
										directives: [{ name: "xmove", value: moveOptions }]
									},
									"Debug Info"
								),
								// 关闭按钮
								h(
									"button",
									{
										staticClass: "x-dev-close-btn",
										onClick: closeComponent
									},
									"×"
								)
							]
						),
						// 内容区域 - 可折叠
						h(
							"div",
							{
								staticClass: "x-dev-content",
								// 只保留动态变化的样式
								style: {
									display: isCollapsed.value ? "none" : "block"
								}
							},
							// 检查是否有默认slot
							slots.default
								? contents.value
								: [h("pre", {}, [h("code", {}, [contents.value])])]
						)
					]
				);
			};
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
