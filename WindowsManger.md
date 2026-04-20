在 common.ts 中新增
$ModalManager 多窗口管理模块，基于现有 \_.$openModal 能力封装一套完整的「打开 / 关闭 / 最小化 / 还原 / 拖动 / 最大化 / 置顶 / 记忆 / 快捷键」生命周期管理方案，并配套编写端到端自动化测试用例，确保所有 API 行为符合以下规范：

1. 核心 API 定义
    - `_.$ModalManager.open(windowId: string, config: WindowConfig): Promise<WindowInstance>`
      复用 $openModal 创建窗口，返回实例句柄；若 windowId 已存在则直接 resolve 现有实例。
    - `_.$ModalManager.minimize(windowId: string): void`
      将目标窗口可视状态置为最小化，DOM 节点保留但隐藏，记录最小化前位置与尺寸。
    - `_.$ModalManager.restore(windowId: string): void`
      将最小化窗口恢复至最小化前的几何状态；若窗口处于最大化，则先执行还原再恢复。
    - `_.$ModalManager.close(windowId: string): void`
      销毁对应 modal 实例，触发 before-close 钩子，持久化窗口最后几何信息到 localStorage。
    - `_.$ModalManager.closeAll(): void` 顺序调用所有已打开窗口的 close 方法，确保钩子正常执行，清空内存索引表。
    - `_.$ModalManager.getAllInstances(): WindowInstance[]` 返回当前存活窗口实例快照，顺序按 zIndex 升序排列。
    - `_.$ModalManager.getInstance(windowId: string): WindowInstance | null` 通过 windowId 获取对应的窗口实例。
    - `_.$ModalManager.maximize(windowId: string): void` 将窗口宽高设置为
      `window.innerWidth / innerHeight`，记录原几何用于后续 restore。
    - `_.$ModalManager.toTop(windowId: string): void` 通过 `PopupManager.nextZIndex()`
      获取最新 zIndex 并应用，并同步更新内部索引，保证点击任意窗口自动置顶。
2. 扩展功能实现细节 a) \_.$openModal 重构
    - 增加对 `options.windowId` 的支持。
    - 在创建实例后，自动执行 `instance.$el.setAttribute('data-window-id', options.windowId)`。
    - 在实例上绑定 `instance.windowId = options.windowId`，方便后续通过实例直接获取 ID。b) DOM 标识
    - 调用 open 时生成的窗口 DOM 元素需包含 `data-window-id` 属性，以便通过 jQuery 选择器（如
      `[data-window-id="xxx"]`）进行定位。c) 窗口拖动
    - 给 modal 根节点加 `v-draggable` 指令，限制在视口内，拖动时禁止文本选择，支持 ESC 取消拖动。c) 窗口最大化
    - 记录 `lastNormalGeometry`；再次调用 maximize 时若已最大化则恢复上一次正常尺寸。d) 窗口层级切换
    - 使用全局 `PopupManager.nextZIndex()`
      获取递增的 zIndex，调用 toTop 时获取新值并重新赋值，确保窗口始终处于最顶层。e) 窗口记忆
    - 关闭时将 `{ windowId, left, top, width, height, isMaximized }` 写入 `localStorage['win_mem_' + windowId]`；
    - open 时若存在记忆数据且 `config.remember !== false`，则以此数据为初始几何。f) 快捷键支持
    - 在 common.ts 初始化阶段绑定全局 keydown：Ctrl + W → 关闭当前置顶窗口；Ctrl + M
      → 最小化当前置顶窗口；确保不与浏览器默认冲突，支持 Mac Cmd 键映射。
3. 类型与接口约束
    ```ts
    interface WindowConfig extends ModalConfig {
    	windowId: string;
    	modal?: boolean;
    	remember?: boolean;
    	draggable?: boolean;
    	maximizable?: boolean;
    }
    interface WindowInstance {
    	windowId: string;
    	zIndex: number;
    	isMinimized: boolean;
    	isMaximized: boolean;
    	maximize(): void;
    	minimize(): void;
    	restore(): void;
    	close(): void;
    	toTop(): void;
    }
    ```
4. 测试用例要求
    - 覆盖范围：
        - 生命周期管理：窗口创建、销毁、资源释放及内存泄漏检测。
        - 状态管理：最小化、最大化、正常化、置顶、焦点切换。
        - 窗口间通信：数据传递、事件同步机制。
        - 异常处理：窗口创建失败、无效 windowId 处理。
    - 具体用例场景：
        - 正向流程：同时打开 3 个及以上独立窗口，验证其几何状态和数据的独立性。
        - 边界条件：同时创建最大数量（极限场景）窗口的稳定性及渲染表现。
        - 性能基准：窗口创建、销毁、最小化、还原的响应时间均需 < 200ms。
        - 记忆恢复：关闭浏览器/刷新页面后，验证窗口位置、尺寸及最大化状态的持久化与恢复。
    - 用例编写规范：
        - 每个用例需包含：**前置条件**、**操作步骤**、**预期结果**。
        - 提供测试数据构造工具，支持动态生成窗口配置参数（WindowConfig）。
    - 自动化要求：
        - 单元测试：对所有公开 API 做 100% 分支覆盖。
        - 集成测试：模拟用户完整路径，验证 localStorage 记忆。
        - 快捷键测试：模拟 Ctrl+W / Ctrl+M，验证行为与焦点窗口一致。
5. 交付标准
    - common.ts 新增代码行数 ≤ 400 行，零 eslint 错误，零 TypeScript 类型警告。
    - 所有测试用例通过，覆盖率 ≥ 90 %。
    - 提供 README 片段，列出所有公开 API 及使用示例。
