<script>
export default async function () {
	return defineComponent({
		props: ["contents"],
		setup(props, { emit }) {
			// 组件根元素引用
			const rootRef = ref(null);

			// 可折叠状态 - 默认折叠
			const isCollapsed = ref(true);

			const contents = computed(() => {
				try {
					return JSON.stringify(props.contents, null, 2);
				} catch (error) {
					console.log(props.contents);
					return "error";
				}
			});

			// 折叠/展开切换
			const toggleCollapse = () => {
				debugger;
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
					// 记录初始位置
					this.x = clickInfo.left;
					this.y = clickInfo.top;
					// 阻止默认行为
					// clickEvent.preventDefault();
					// clickEvent.stopPropagation();
				},
				onMoving: _.throttle(function ({ $ele, clickInfo, clickEvent, movingEvent }) {
					// 计算新位置
					const deltaX = movingEvent.clientX - clickEvent.clientX;
					const deltaY = movingEvent.clientY - clickEvent.clientY;
					// 更新位置

					$ele.css({ left: `${this.x + deltaX}px`, top: `${this.y + deltaY}px` });
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

			return function () {
				return h(
					"div",
					{
						staticClass: "x-dev-component",
						ref: rootRef,
						style: {
							position: "fixed",
							left: `20px`,
							top: `20px`,
							zIndex: 9999,
							background: "#ffffff",
							borderRadius: "4px",
							boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
							width: "300px",
							fontFamily: "Monaco, Menlo, Consolas, Courier New, monospace",
							fontSize: "12px",
							transition: "all 0.3s ease",
							pointerEvents: "auto"
						}, // 使用v-xmove指令实现拖动
						directives: [{ name: "xmove", value: moveOptions }]
					},
					[
						// 标题栏 - 可拖动和折叠控制
						h(
							"div",
							{
								staticClass: "x-dev-header",
								style: {
									padding: "8px 12px",
									background: "#f5f7fa",
									borderBottom: "1px solid #e4e7ed",
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									cursor: "move",
									borderRadius: "4px 4px 0 0",
									userSelect: "none"
								}
							},
							[
								// 折叠/展开按钮
								h(
									"button",
									{
										staticClass: "x-dev-toggle-btn",
										style: {
											background: "none",
											border: "none",
											cursor: "pointer",
											fontSize: "14px",
											padding: "0 4px",
											color: "#606266",
											transition: "color 0.2s"
										},
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
										}
									},
									"Debug Info"
								),
								// 关闭按钮
								h(
									"button",
									{
										staticClass: "x-dev-close-btn",
										style: {
											background: "none",
											border: "none",
											cursor: "pointer",
											fontSize: "16px",
											padding: "0 4px",
											color: "#909399",
											lineHeight: "1",
											transition: "color 0.2s"
										},
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
								style: {
									display: isCollapsed.value ? "none" : "block",
									maxHeight: "400px",
									overflow: "auto",
									transition: "all 0.3s ease"
								}
							},
							[
								h(
									"pre",
									{
										style: {
											margin: 0,
											padding: "12px",
											background: "#fafafa",
											color: "#303133",
											lineHeight: "1.5",
											overflowX: "auto"
										}
									},
									[
										h(
											"code",
											{
												style: {
													color: "#303133",
													wordBreak: "break-all"
												}
											},
											[contents.value]
										)
									]
								)
							]
						)
					]
				);
			};
		}
	});
}
</script>
