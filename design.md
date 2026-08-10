# 公共组件库 UI 设计规范

> **摘要：** 本文档定义 `statics/common` 公共组件库（`ui-x`）的设计令牌（Design Tokens）使用规范，说明 CSS 变量的体系结构、语义用途、使用场景与相互派生关系。组件视觉一律通过变量表达，不写具体数值，从而保证 common / Tiny 主题整体切换。

---

## 1. 变量体系结构

组件库的 CSS 变量分为四个命名域，各司其职：

| 命名域 | 形式 | 职责 | 来源 |
| --- | --- | --- | --- |
| 基础色板 | `--el-*` | Element 语义色板（主色、成功/警告/危险、文本、边框、填充、背景） | `style.common.vue` / `style.tiny.vue` |
| UI 语义令牌 | `--ui-*` | 组件级语义（品牌、文案、线条、图标、表单、列表、按钮、阴影、动效、层级） | 同一文件 |
| 主题私有令牌 | `--ti-*` | Tiny 主题私有语义，仅 `:root[data-theme="tiny"]` 内生效 | `style.tiny.vue` |
| 组件扩展令牌 | `--x{组件名}-*` | 单个组件私有视觉，允许组件自定义 | 组件自身或主题文件 |

**关系规则：**

- 组件样式只消费 `--el-*` / `--ui-*` 与自身 `--x*` 令牌；禁止直接消费 `--ti-*`（Tiny 专属，组件不得感知主题差异）。
- `--ti-*` 负责在 Tiny 主题下重新映射通用令牌的取值，组件无需改动。
- 组件新增视觉能力时，优先复用 `--el-*` / `--ui-*`；确需新语义时新增 `--x{组件名}-*`，并在 common / tiny 两份主题中各给一份取值。

## 2. 令牌语义与用途

### 2.1 色彩语义（`--el-color-*` / `--ui-*`）

| 语义 | 变量 | 用在什么地方 |
| --- | --- | --- |
| 主操作色 | `--el-color-primary` 及 `-hover` / `-active` / `-light-*` / `-dark-*` 衍生 | 按钮主色、选中态、链接、Focus 高亮；hover / active 用各自衍生层级 |
| 语义状态色 | `--el-color-success` / `--warning` / `--danger`（`--error`）/ `--info` | 成功、警告、危险、中性信息的图标、描边、轻背景（配 `-light-*` 系列） |
| 背景层级 | `--el-bg-color` / `--el-bg-color-page` / `--ui-global-bg` | 卡片与弹层面 / 页面基底 / 全局画布，用色阶分层代替分割线 |
| 文本层级 | `--el-text-color-primary` / `-regular` / `-secondary` / `-placeholder` / `-disabled` | 主文本、常规、辅助说明、占位符、禁用文案，语义降级 |
| 边框与分隔 | `--el-border-color` / `-light` / `-lighter` | 控件描边、细分隔线、卡片/浮层描边，按视觉轻重取用 |
| 填充底色 | `--el-fill-color-*` 系列 | 输入控件灰底、表头底色、hover 底色、禁用底色 |
| 品牌专用 | `--ui-brand` / `-hover` / `-active` 系列 | 品牌主色场景；与 `--el-color-primary` 可互为别名 |

### 2.2 排版令牌（`--ui-font-*`）

| 语义 | 变量 |
| --- | --- |
| 辅助/次要文本 | `--ui-font-size-sm` |
| 正文与控件默认 | `--ui-font-size`（md） |
| 卡片与页面标题 | `--ui-font-size-card-title` / `--page-title` |
| 弹窗标题 | `--ui-font-size-modal-title` |
| 字重与行高 | `--ui-font-title-weight` / `--ui-line-height-base` |

**关系：** 字号按「控件 < 正文 < 区块标题 < 弹窗标题」递进；标题统一用 `--ui-font-title-weight`，正文行高统一 `--ui-line-height-base`。

### 2.3 圆角与阴影令牌

| 语义 | 变量 |
| --- | --- |
| 小/标准/大圆角 | `--border-radius--mini` / `--border-radius--small` / `--border-radius` |
| 卡片圆角 / 全圆角 | `--ui-border-radius-card` / `--ui-border-radius-full` |
| 标准阴影 | `--normal-box-shadow` |

**关系与用法：**

- 控件与浮层用 `--border-radius`；卡片用 `--ui-border-radius-card`；胶囊、头像、开关用 `--ui-border-radius-full`。
- 浮起物（弹窗、下拉、气泡、悬浮卡片）用 `--normal-box-shadow`；非浮层禁止投影。
- Tiny 主题下上述圆角/阴影令牌被统一重置（圆角归零、阴影取消），组件因此自动适配。

### 2.4 间距与尺寸令牌（`--ui-*`）

| 语义 | 变量 |
| --- | --- |
| 基础间距单元 | `--ui-half`（= 8px 语义基准） |
| 区块间距 | `--ui-one` |
| 标准控件高度 | `--ui-height` |
| 卡片内边距 | `--ui-card-body-padding` |
| 按钮三级内边距 | `--ui-btn-sm-padding` / `--ui-btn-padding` / `--ui-btn-lg-padding` |

**关系：** 间距以 `--ui-half` 为最小单元递增；控件高度、图标热区、按钮高度统一收敛到 `--ui-height`。

### 2.5 层级令牌（`--ui-z-index-*`）

| 语义 | 变量 |
| --- | --- |
| 框架 → 抽屉 → 弹窗 → 下拉 → 气泡 → 全屏覆盖 | `--ui-z-index-framework` / `-drawer` / `-modal` / `-dropdown` / `-pop-up` / `-full-page-overlay` |

**关系：** 层级从低到高严格递增，浮层组件必须取用对应语义令牌，禁止自定义魔数。

### 2.6 动效令牌（`--ui-animation-*`）

| 语义 | 变量 |
| --- | --- |
| 微反馈 / 标准过渡 / 大位移 | `--ui-animation-duration-fast` / `-base` / `-slow` |
| 缓动曲线 | `--ui-animation-ease-in-out-smooth` 等 `-ease-*` 系列 |

**关系：** 交互幅度越大时长越长；进入/退出统一使用平滑缓动系列。

### 2.7 组件级语义（`--ui-*` 专域）

| 语义 | 变量 | 用在什么地方 |
| --- | --- | --- |
| 表单控件 | `--ui-form-control-*`（bg / line / line-hover / line-active / interactive-outline） | 输入类控件背景、边框、hover 边框、focus 边框与高亮环 |
| 列表交互 | `--ui-list-item-*`（hover / active / selected / strip） | 表格与列表的行 hover、选中、斑马纹 |
| 禁用三件套 | `--ui-disabled-bg` / `--ui-disabled-text` / 禁用边框 | 一切禁用态视觉 |
| 图标 | `--ui-icon-fill*` / `--ui-icon-text` / `--ui-icon-bg` | 图标默认、hover、active 填充与文字色 |
| 滚动条 | `--ui-thumb` / `--ui-thumb-hover` | 滚动条滑块常态与 hover |
| 按钮通用 | `--ui-btn-common-*` | 次要按钮灰底与 hover / active |

## 3. 变量使用规则

- **一律引用变量**：颜色、圆角、阴影、字号、间距、层级、动效全部通过 `var(--xxx)` 表达，禁止写入具体数值或色值。
- **取语义不取值**：选择变量按「语义层级」而非「视觉像不像」，如辅助文字用 `--el-text-color-secondary`，不因色值接近而借用主文本变量。
- **状态派生**：hover / active / disabled 一律取对应 `-hover` / `-active` / `-disabled` 派生变量，禁止组件内自行压暗或提亮。
- **浮层专用**：只有模拟浮起的对象才使用 `--normal-box-shadow`，静态卡片与页面元素不投影。
- **主题自适应**：组件不得感知 `:root[data-theme="tiny"]`，只依赖通用令牌的取值变化完成主题切换。

## 4. 状态与令牌映射

| 状态 | 令牌组合 |
| --- | --- |
| Hover | 对应组件 `*-hover` 令牌，动效 `--ui-animation-duration-fast` |
| Active | 对应 `*-active` 令牌 + `scale(0.98)` 微缩 |
| Focus | 边框 `--ui-form-control-line-active` + `--ui-form-control-interactive-outline` 高亮环 |
| Disabled | `--ui-disabled-bg` + `--ui-disabled-text` + 禁用边框，禁止交互 |
| Loading | 骨架屏或加载符，保持布局稳定 |
| Empty | 低饱和图标 + 辅助文本 + CTA，禁止留白 |

## 5. 实施约束

- 组件视觉全部令牌化；确需新语义时新增 `--x{组件名}-*`，并补齐 common / tiny 双份取值。
- 演示页随主题切换呈现两套风格，验收时同时检查 common 与 Tiny。
- UI 描述保持抽象与业务无关，聚焦物理边界与视觉扫描线。

## 6. 变更记录

- 2026-08-10：创建本文档，定义 `--el-*` / `--ui-*` / `--ti-*` / `--x*` 变量体系结构与使用规则，说明各令牌语义、使用场景与派生关系。
