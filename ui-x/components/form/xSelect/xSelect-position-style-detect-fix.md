# xSelect changePopperPositionTo 增强 position 样式检测

## 需求背景

`changePopperPositionTo` 方法存在两处 position 样式检测缺陷：

1. **入口处 `alreadyInTargetState`（原 L544）**：只检测 `parentNode`
   是否正确，DOM 位置对了就直接 return，**跳过所有定位修复逻辑**。但此时 popper 元素可能没有 position 定位样式（如 destroyPopper 后、从未 createPopper 过），导致下拉框"消失"
2. **`checkPopperPosition`**：同样只检查 parentNode，未验证 position 样式是否已设置

## 问题根因分析

| 场景                             | 原因                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| **destroyPopper 后重新定位**     | `popperJS.destroy()` 会清空 `style.position/top/left/transform`（见 popper.js L212-225） |
| **popperJS 实例不存在**          | 原代码仅在有 `popper.popperJS` 时才调用 `updatePopper()`，否则跳过定位                   |
| **GPU 加速模式**                 | `gpuAcceleration: true` 时用 `translate3d` 定位，需同时检查 transform                    |
| **DOM 移动后 popperJS 状态过期** | 同步移动 DOM 后 popperJS 内部 offsetParent 引用可能过期                                  |

## 修改方案（已执行）

### 文件：`statics/common/ui-x/components/form/xSelect/xSelect.vue`

### 1. 修复入口状态检测 `alreadyInTargetState`（L542-568）

**核心问题**：原来只看 parentNode → 对了就 return → 跳过定位修复

**修改后**：parentNode 正确 + position 样式完整 → 才 return

```javascript
// 检查当前状态是否已经是目标状态（parentNode + position 样式双重检测）
const currentInBody = popperElm.parentNode === document.body;
const parentNodeMatch = isAppendToBody ? currentInBody : !currentInBody;

// 【修复】即使 parentNode 正确，仍需检测 position 样式是否已设置
let hasPositionStyle = false;
if (parentNodeMatch) {
	const computed = window.getComputedStyle(popperElm);
	const pos = computed.position;
	hasPositionStyle = pos === "absolute" || pos === "fixed";
	if (hasPositionStyle) {
		// 有 position 但无 top/left/transform 偏移值也视为无效
		const top = popperElm.style.top;
		const left = popperElm.style.left;
		const transform = popperElm.style.transform;
		hasPositionStyle =
			(top && top !== "") || (left && left !== "") || (transform && transform !== "" && transform !== "none");
	}
}

if (parentNodeMatch && hasPositionStyle) {
	return; // 只有两者都满足才真正"已在目标状态"
}
```

### 2. 增强 `checkPopperPosition` 方法（L660-713）

- 用 `getComputedStyle` 替代 `element.style` 检测 position（因为 CSS class 设置的 position 在 element.style 中读不到）
- 分层检测：先查 computed.position → 再查内联 style 的 top/left/transform 偏移值
- 不再排除 `0px` 值（参考元素在视口顶部时 top 本身就是 0）
- 补充了 `left` 的检测

### 3. 增加 position 补偿机制（L610-627）

- popperJS 不存在时广播触发 createPopper
- DOM 移动后若仍无 position 样式 → `doDestroy(true)` 强制销毁 + `$nextTick` 广播重建

### 4. 重试逻辑优化（L633-634）

- 重试前主动 `broadcast("xSelectDropdown", "updatePopper")` 触发 popper 创建

## 影响范围

- 仅影响 `xSelect.vue` 的 `changePopperPositionTo` 和 `checkPopperPosition` 两个方法
- 向下兼容：原有 parentNode 检测保留，新增检测为叠加条件

## 验证方式

1. 打开 xSelect 下拉框 → 切换 appendToBody 模式 → 控制台应看到 position 样式被正确检测
2. destroyPopper 后再次打开 → 验证 position 样式能正确恢复（不再提前 return）
3. 多次快速切换 body/self 模式 → 验证重试机制正常工作
