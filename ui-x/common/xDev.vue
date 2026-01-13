<script>
export default async function () {
	return defineComponent({
		props: ["contents"],
		setup(props, { emit }) {
			// 可折叠状态 - 默认折叠
			const isCollapsed = ref(true);
			// 位置状态用于拖动
			const position = ref({ x: 20, y: 20 });
			const isDragging = ref(false);
			let startX = 0;
			let startY = 0;

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
				isCollapsed.value = !isCollapsed.value;
			};

			// 关闭组件
			const closeComponent = () => {
				emit("close");
			};

			// 拖动相关事件
			const startDrag = e => {
				// 确保只在左键拖动时生效
				if (e.button !== 0) return;

				// 阻止默认行为，避免文本选择等干扰
				e.preventDefault();
				e.stopPropagation();

				// 设置拖动状态和初始位置
				isDragging.value = true;
				startX = e.clientX;
				startY = e.clientY;
				// 记录初始位置
				const initialX = position.value.x;
				const initialY = position.value.y;

				// 创建拖动过程中的鼠标移动事件处理函数
				const handleMouseMove = moveEvent => {
					moveEvent.preventDefault();
					moveEvent.stopPropagation();

					// 计算新位置
					const deltaX = moveEvent.clientX - startX;
					const deltaY = moveEvent.clientY - startY;

					// 更新位置
					position.value.x = initialX + deltaX;
					position.value.y = initialY + deltaY;
				};

				// 创建拖动结束的鼠标释放事件处理函数
				const handleMouseUp = upEvent => {
					upEvent.preventDefault();
					upEvent.stopPropagation();

					// 移除事件监听
					document.removeEventListener("mousemove", handleMouseMove);
					document.removeEventListener("mouseup", handleMouseUp);

					// 重置拖动状态
					isDragging.value = false;
				};

				// 添加临时事件监听
				document.addEventListener("mousemove", handleMouseMove);
				document.addEventListener("mouseup", handleMouseUp);
			};

			// 组件根元素引用
			const rootRef = ref(null);

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

			return function () {
				return h(
					"div",
					{
						staticClass: "x-dev-component",
						ref: rootRef,
						style: {
							position: "fixed",
							left: `${position.value.x}px`,
							top: `${position.value.y}px`,
							zIndex: 9999,
							background: "#ffffff",
							borderRadius: "4px",
							boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
							width: "300px",
							fontFamily: "Monaco, Menlo, Consolas, Courier New, monospace",
							fontSize: "12px",
							transition: "all 0.3s ease",
							pointerEvents: "auto"
						}
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
								},
								// 修复拖动事件，确保在标题栏按下时触发
								onMouseDown: e => {
									startDrag(e);
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
										onClick: toggleCollapse,
										onMouseEnter: e => {
											e.target.style.color = "#409eff";
										},
										onMouseLeave: e => {
											e.target.style.color = "#606266";
										}
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
										onClick: closeComponent,
										onMouseEnter: e => {
											e.target.style.color = "#f56c6c";
										},
										onMouseLeave: e => {
											e.target.style.color = "#909399";
										}
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
