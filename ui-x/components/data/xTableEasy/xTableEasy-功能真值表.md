# xTableEasy 功能真值表

## 说明

这份文档用于建立 `vue-easytable-master` 与当前 `xTableEasy` 移植版本之间的**功能真值**。

> 注意：
>
> - 不直接相信 `xTableEasy.readme.md` 中的“已实现/待实现”勾选；
> - 以 **源库文档 + 当前组件代码 + business_doc 页面 + 实测结果** 为准；
> - 当前先搭文档骨架，状态先默认写为“待核对”。

建议后续每个功能点都按以下顺序核对：

1. 源库文档目录
2. 当前组件实现文件
3. business_doc 对应菜单 / 路由 / 文档页 / 示例页
4. 页面实测结果
5. 最终迁移动作

---

## 一、文档与页面映射规则

### 当前确认的映射链路

1. `statics/business_doc/router/MenuArray.vue`
   - 负责菜单结构
2. `statics/business_doc/router/routes.vue`
   - 负责路由与页面组件映射
3. `statics/business_doc/views/component/data/xTableEasy/`
   - 负责 xTableEasy 文档页、聚合页、示例页
4. `DemoAndCode`
   - 负责把“说明页”挂接到“具体示例页”

### 推荐理解

一个完整功能点通常对应：

- 菜单项
- 路由项
- 文档聚合页
- 1~N 个示例页
- 对应 `xTableEasy` 组件能力实现

### 当前风险

`routes.vue` 里存在部分**重复路径声明**，且部分路径分别指向：

- `xTableEasy.*.vue` 英文命名聚合页
- 中文命名旧示例页

后续需要核对：

- 最终是否保留双套结构
- 哪些文件是聚合页
- 哪些文件是旧页面
- 哪些页面应该作为最终文档入口

---

## 二、功能真值表

> 字段说明：
>
> - **源功能目录**：源库文档或示例对应目录
> - **当前组件对应文件**：优先写 xTableEasy 组件目录中的实现文件，先占位
> - **business_doc 对应页面**：当前文档工程中的页面入口
> - **当前状态**：待核对 / 部分迁移 / 基本可用 / 不可用
> - **主要风险**：先写已知风险或待确认点
> - **后续动作**：下一步核对 / 修复 / 补文档动作

| 功能域 | 功能点 | 源功能目录 | 当前组件对应文件 | business_doc 对应页面 | 当前状态 | 主要风险 | 后续动作 |
|---|---|---|---|---|---|---|---|
| 表格基础 | 基础用法 | `usage/` 或示例页 | `xTableEasy.vue` | `DocDemoXTableEasy.vue` / `JiChuYongFa.vue` | 待核对 | 首页仅挂了基础用法，能力覆盖面未知 | 核对首页是否应补充目录导航 |
| 表格基础 | 表格宽度 | `table-width/` | `xTableEasy.vue` | `xTableEasy.TableWidth.vue` | 待核对 | 需要核对 business_doc 与源示例颗粒度是否一致 | 对照源目录补充子项映射 |
| 表格基础 | 表格高度 | `table-height/` | `xTableEasy.vue` | `xTableEasy.TableHeight.vue` | 待核对 | 高度与虚拟滚动存在联动 | 先核对 props 与示例行为 |
| 表格基础 | 表格边框 | `table-border/` | `xTableEasy.vue` | `xTableEasy.TableBorder.vue` | 待核对 | 默认值历史上有争议 | 对照源库与当前样式实现 |
| 表格基础 | 空数据 | `data-empty/` | `xTableEasy.vue` / body 相关文件 | 暂未发现明确页面 | 待核对 | business_doc 可能缺页 | 需要补页面入口或标记缺失 |
| 表格基础 | loading | `loading/` | `xTableEasy.vue` | 暂未发现明确页面 | 待核对 | 可能未接入文档页 | 检查是否仅源码支持未展示 |
| 表头能力 | 表头固定 | `header-fixed/` | `header/` | `xTableEasy.Header.Fixed.vue` | 待核对 | fixedHeader / fixedFooter 联动 | 核对 props + 页面示例 |
| 表头能力 | 表头分组 | `header-grouping/` | `header/` + `util/` | `xTableEasy.Header.Group.vue` 或旧页 `BiaoTouFenZu.vue` | 待核对 | 旧页/新页并存 | 统一最终聚合页入口 |
| 表头能力 | 表头隐藏 | `header-hidden/` | `header/` | `xTableEasy.Header.Hidden.vue` 或旧页 `BiaoTouYinCang.vue` | 待核对 | 路由重复 | 确认最终文档页 |
| 表头能力 | 排序 | `header-sort/` | `header/` + `util/` | `xTableEasy.Sort.vue` 或旧页 `PaiXu.vue` | 待核对 | 排序链路依赖事件分发 | 重点实测排序联动 |
| 表头能力 | 筛选 | `header-filter/` | `header/` | `xTableEasy.Filter.vue` 或旧页 `ShaiXuan.vue` | 待核对 | 需要核对是否完整对齐源能力 | 对照源过滤模式补表 |
| 表头能力 | 自定义筛选 | `header-filter-custom/` | `header/` | `xTableEasy.Filter.Custom.vue` 或旧页 `ShaiXuanZiDingYi.vue` | 待核对 | 自定义 UI/插槽能力需核实 | 核对文档说明与实现 |
| 列能力 | 列宽设置 | `column-width/` | `colgroup/` + `xTableEasy.vue` | `xTableEasy.ColumnWidth.vue` / `LieKuanSheZhi.vue` | 待核对 | 新旧页面路径命名不完全统一 | 统一“column_width/column_width_setting”口径 |
| 列能力 | 列宽拖动 | `column-resize/` | `column-resizer/` | `xTableEasy.ColumnWidth.Dragging.vue` / `LieKuanTuoDong.vue` | 待核对 | 需要核对拖动句柄与宽度回写 | 页面重点验证 |
| 列能力 | 列固定 | `column-fixed/` | `util/` + body/header 相关 | `xTableEasy.Column.Fixed.vue` / `LieGuDing.vue` | 待核对 | 左右固定、自动宽度联动复杂 | 优先对照源库多场景 |
| 列能力 | 列隐藏 | `column-hidden/` | `util/` + `xTableEasy.vue` | `xTableEasy.Column.Hidden.vue` / `LieYinCang.vue` | 待核对 | 默认隐藏与实例方法都要核 | 拆分“默认隐藏/动态显示”子项 |
| 单元格能力 | 对齐 | `cell-align/` | body/header cell 相关 | `xTableEasy.Cell.Align.vue` / `DanYuanGeDuiQi.vue` | 待核对 | 样例页可能存在旧实现 | 先看 prop 与 class 生效 |
| 单元格能力 | 样式 | `cell-style/` | body/header/footer | `xTableEasy.Cell.Style.vue` / `DanYuanGeYangShi.vue` | 待核对 | 涉及 header/body/footer 多种样式入口 | 分子项核对 |
| 单元格能力 | 自定义渲染 | `cell-custom/` | body/header 相关 | `xTableEasy.Cell.Custom.vue` / `ZiDingYiDanYuanGeXuanRan.vue` | 待核对 | 自定义渲染接口形式需核对 | 对照源文档 API |
| 单元格能力 | 合并 | `cell-span/` | util/body/footer | `xTableEasy.Cell.Merge.vue` / `DanYuanGeHeBing.vue` | 待核对 | body/footer 合并规则不同 | 分开核对 |
| 单元格能力 | 省略 | `cell-ellipsis/` | body cell 相关 | 暂未发现明确页面 | 待核对 | business_doc 可能缺文档页 | 判断是否要新增菜单 |
| 单元格能力 | 选择 | `cell-selection/` | `selection/` | `xTableEasy.Cell.Selection.vue` / `DaiYouXuanZeDeBiaoGe.vue` | 待核对 | 依赖 rowKey、事件链 | 页面实测优先 |
| 单元格能力 | 编辑 | `cell-edit/` | `editor/` | `xTableEasy.Cell.Edit.vue` / `DanYuanGeBianJi.vue` | 待核对 | 编辑与选择/快捷键耦合高 | 先核对基础编辑 |
| 单元格能力 | 自动填充 | `cell-autofill/` | `selection/` + util | `xTableEasy.Cell.Autofill.vue` | 待核对 | 功能存在但文档链路可能不完整 | 重点核对示例缺口 |
| 行能力 | 操作列 | `operation-column/` | body/header/util | `xTableEasy.Action.Column.vue` / `CaoZuoLie.vue` | 待核对 | 操作列与选择/固定列互相影响 | 重点实测 |
| 行能力 | 多选 | `row-checkbox/` | body/header 选择相关 | `DaiYouXuanZeDeBiaoGe.vue` | 待核对 | 可能缺独立聚合页 | 补齐与源库对应关系 |
| 行能力 | 单选 | `row-radio/` | body 选择相关 | `DaiYouXuanZeDeBiaoGe.vue` | 待核对 | 与多选共享页面，粒度不足 | 考虑拆文档子块 |
| 行能力 | 行展开 | `row-expand/` | body 相关 | `xTableEasy.Row.Expand.vue` 或 `examples/HangZhanKai.vue` | 待核对 | 路由重复且页面混用 | 确认最终展示页 |
| 行能力 | 行样式 | `row-style/` | body 相关 | `xTableEasy.Row.Style.vue` 或 `XingYangShiDingZhi.vue` | 待核对 | 点击高亮/悬停/斑马纹需拆开看 | 补子项 |
| Footer 能力 | Footer 汇总 | `footer-summary/` | `footer/` | 暂未发现明确完整聚合页 | 待核对 | 功能可能在代码中但文档缺失 | 需要补文档/示例 |
| 剪贴板 | 剪贴板 | `clipboard/` | util + editor + selection | `xTableEasy.Clipboard.vue` | 待核对 | copy/paste/cut/delete 要拆项 | 后续分子项核对 |
| 右键菜单 | 上下文菜单 | `contextmenu/` | util + contextmenu 相关 | `xTableEasy.Contextmenu.vue` | 待核对 | header/body 菜单不同 | 分 header/body 核对 |
| 性能能力 | 虚拟滚动 | `virtual-scroll/` | body + `xTableEasy.vue` | `xTableEasy.Virtual.Scroll.vue` 或 `XuNiGunDong.vue` | 待核对 | 行高同步、占位渲染复杂 | 列为高优先级实测项 |
| 事件与方法 | 实例方法 | `instance-methods/` + `api/instance-methods.vue` | `xTableEasy.vue` | 暂未发现明确页面 | 待核对 | 文档和页面缺口较大 | 后续补独立文档页 |
| 事件与方法 | API 文档 | `api/` | `xTableEasy.readme.md` / 待补 | 暂未形成统一页面 | 待核对 | 当前 API 说明不成体系 | 后续按功能真值表回填 |
| 其他 | 分页 | `pagination/` | 未见当前组件目录明确支持 | 暂未发现 xTableEasy 当前文档页 | 待核对 | 可能源库有、当前未移植 | 明确是否纳入本轮范围 |
| 其他 | 事件自定义 | `event-custom/` | `eventCustomOption` 相关 | 暂未发现明确页面 | 待核对 | 功能可能已在 props 中但无展示 | 补示例和文档 |

---

## 三、当前优先核对建议

### P0：优先级最高

1. `xTableEasy.vue` 异步壳完整性
2. 表格宽度 / 高度 / 边框
3. 列宽拖动 / 列固定 / 列隐藏
4. 表头固定 / 分组 / 排序 / 筛选
5. 单元格选择 / 编辑 / 自动填充
6. 虚拟滚动

### P1：第二优先级

1. 右键菜单
2. 剪贴板
3. 行展开
4. 行样式
5. 操作列

### P2：第三优先级

1. Footer 汇总
2. API 文档
3. 实例方法文档
4. 空数据 / loading / 事件自定义 / 分页

---

## 四、下一步执行建议

### 当前建议先做的事

1. 先补全这份真值表中的“当前组件对应文件”列；
2. 再核对每个功能点对应的源目录与 business_doc 页面是否齐全；
3. 然后开始第一轮真正的代码核查：
   - 先根组件异步壳
   - 再 P0 功能链

### 当前建议暂缓的事

1. 暂不直接修改大量业务文档内容；
2. 暂不直接相信历史“已实现”勾选；
3. 暂不直接清理旧示例页，先确认新旧页面职责。
