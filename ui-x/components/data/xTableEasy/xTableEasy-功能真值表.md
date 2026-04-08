# xTableEasy 功能真值表

## 说明

这份文档用于建立 `vue-easytable-master` 与当前 `xTableEasy` 移植版本之间的**功能真值**。

> 注意：
>
> - 不直接相信 `xTableEasy.readme.md` 中的“已实现/待实现”勾选；
> - 以 **源库文档 + 当前组件代码 + business_doc 页面 + 实测结果** 为准；
> - 当前先搭文档骨架，状态先默认写为“待核对”，但已确认的结构性风险会明确写出。

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
> - **当前组件对应文件**：优先写 xTableEasy 组件目录中的实现文件
> - **business_doc 对应页面**：当前文档工程中的页面入口
> - **当前状态**：待核对 / 部分迁移 / 基本可用 / 不可用
> - **主要风险**：先写已知风险或待确认点
> - **后续动作**：下一步核对 / 修复 / 补文档动作

| 功能域      | 功能点      | 源功能目录                                       | 当前组件对应文件                                                                                                                   | business_doc 对应页面                                         | 当前状态               | 主要风险                                                                                       | 后续动作                                        |
| ----------- | ----------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| 表格基础    | 基础用法    | `usage/` 或示例页                                | `xTableEasy.vue`                                                                                                                   | `DocDemoXTableEasy.vue` / `JiChuYongFa.vue`                   | 待核对                 | 首页仅挂了基础用法，能力覆盖面未知                                                             | 核对首页是否应补充目录导航                      |
| 表格基础    | 表格宽度    | `table-width/`                                   | `xTableEasy.vue`；`colgroup/index.vue`；`utils/index.vue`                                                                          | `xTableEasy.TableWidth.vue`                                   | 待核对                 | 需要核对 business_doc 与源示例颗粒度是否一致                                                   | 对照源目录补充子项映射                          |
| 表格基础    | 表格高度    | `table-height/`                                  | `xTableEasy.vue`；`body/index.vue`；`body/body-tr.vue`                                                                             | `xTableEasy.TableHeight.vue`                                  | 待核对                 | 高度与虚拟滚动存在联动                                                                         | 先核对 props 与示例行为                         |
| 表格基础    | 表格边框    | `table-border/`                                  | `xTableEasy.vue`；`easytable.css`                                                                                                  | `xTableEasy.TableBorder.vue`                                  | 待核对                 | 默认值历史上有争议                                                                             | 对照源库与当前样式实现                          |
| 表格基础    | 空数据      | `data-empty/`                                    | `xTableEasy.vue`；`body/index.vue`；`body/body-tr.vue`                                                                             | 暂未发现明确页面                                              | 待核对                 | business_doc 可能缺页                                                                          | 需要补页面入口或标记缺失                        |
| 表格基础    | loading     | `loading/`                                       | `xTableEasy.vue`                                                                                                                   | 暂未发现明确页面                                              | 待核对                 | 可能未接入文档页                                                                               | 检查是否仅源码支持未展示                        |
| 表头能力    | 表头固定    | `header-fixed/`                                  | `header/index.vue`；`header/header-tr.vue`；`header/header-th.vue`                                                                 | `xTableEasy.Header.Fixed.vue`                                 | 待核对                 | `fixedHeader / fixedFooter` 联动                                                               | 核对 props + 页面示例                           |
| 表头能力    | 表头分组    | `header-grouping/`                               | `util/index.vue(initGroupColumns)`；`header/index.vue`；`header/header-th.vue`                                                     | `xTableEasy.Header.Group.vue` 或旧页 `BiaoTouFenZu.vue`       | 待核对                 | 旧页/新页并存                                                                                  | 统一最终聚合页入口                              |
| 表头能力    | 表头隐藏    | `header-hidden/`                                 | `xTableEasy.vue`；`header/index.vue`                                                                                               | `xTableEasy.Header.Hidden.vue` 或旧页 `BiaoTouYinCang.vue`    | 待核对                 | 路由重复                                                                                       | 确认最终文档页                                  |
| 表头能力    | 排序        | `header-sort/`                                   | `header/index.vue`；`header/header-th.vue`；`util/index.vue`                                                                       | `xTableEasy.Sort.vue` 或旧页 `PaiXu.vue`                      | 待核对                 | 排序链路依赖事件分发                                                                           | 重点实测排序联动                                |
| 表头能力    | 筛选        | `header-filter/`                                 | `header/header-filter-content.vue`；`header/header-th.vue`                                                                         | `xTableEasy.Filter.vue` 或旧页 `ShaiXuan.vue`                 | 待核对                 | 需要核对是否完整对齐源能力                                                                     | 对照源过滤模式补表                              |
| 表头能力    | 自定义筛选  | `header-filter-custom/`                          | `header/header-filter-custom-content.vue`；`header/header-th.vue`                                                                  | `xTableEasy.Filter.Custom.vue` 或旧页 `ShaiXuanZiDingYi.vue`  | 待核对（存在结构风险） | 当前实现与源文件相比未显式导入 `VeDropdown / VeIcon`，改为字符串组件名，需确认全局注册是否可靠 | 核对运行时组件注册与页面行为                    |
| 列能力      | 列宽设置    | `column-width/`                                  | `xTableEasy.vue`；`colgroup/index.vue`                                                                                             | `xTableEasy.ColumnWidth.vue` / `LieKuanSheZhi.vue`            | 待核对                 | 新旧页面路径命名不完全统一                                                                     | 统一 `column_width / column_width_setting` 口径 |
| 列能力      | 列宽拖动    | `column-resize/`                                 | `column-resizer/index.vue`；`colgroup/index.vue`；`xTableEasy.vue`                                                                 | `xTableEasy.ColumnWidth.Dragging.vue` / `LieKuanTuoDong.vue`  | 待核对                 | 需要核对拖动句柄与宽度回写                                                                     | 页面重点验证                                    |
| 列能力      | 列固定      | `column-fixed/`                                  | `util/index.vue(setColumnFixed/cancelColumnFixed)`；`xTableEasy.vue`；`body/index.vue`；`header/header-th.vue`                     | `xTableEasy.Column.Fixed.vue` / `LieGuDing.vue`               | 待核对                 | 左右固定、自动宽度联动复杂                                                                     | 优先对照源库多场景                              |
| 列能力      | 列隐藏      | `column-hidden/`                                 | `util/index.vue(recursiveRemoveColumnByKey)`；`xTableEasy.vue`                                                                     | `xTableEasy.Column.Hidden.vue` / `LieYinCang.vue`             | 待核对                 | 默认隐藏与实例方法都要核                                                                       | 拆分“默认隐藏 / 动态显示”子项                   |
| 单元格能力  | 对齐        | `cell-align/`                                    | `body/body-td.vue`；`header/header-th.vue`；`footer/footer-td.vue`                                                                 | `xTableEasy.Cell.Align.vue` / `DanYuanGeDuiQi.vue`            | 待核对                 | 样例页可能存在旧实现                                                                           | 先看 prop 与 class 生效                         |
| 单元格能力  | 样式        | `cell-style/`                                    | `body/body-td.vue`；`body/body-tr.vue`；`header/header-th.vue`；`footer/footer-td.vue`                                             | `xTableEasy.Cell.Style.vue` / `DanYuanGeYangShi.vue`          | 待核对                 | 涉及 header/body/footer 多种样式入口                                                           | 分子项核对                                      |
| 单元格能力  | 自定义渲染  | `cell-custom/`                                   | `body/body-td.vue`；`header/header-th.vue`                                                                                         | `xTableEasy.Cell.Custom.vue` / `ZiDingYiDanYuanGeXuanRan.vue` | 待核对                 | 自定义渲染接口形式需核对                                                                       | 对照源文档 API                                  |
| 单元格能力  | 合并        | `cell-span/`                                     | `body/body-td.vue`；`footer/footer-td.vue`；`util/index.vue`                                                                       | `xTableEasy.Cell.Merge.vue` / `DanYuanGeHeBing.vue`           | 待核对                 | body/footer 合并规则不同                                                                       | 分开核对                                        |
| 单元格能力  | 省略        | `cell-ellipsis/`                                 | `body/body-td.vue`                                                                                                                 | 暂未发现明确页面                                              | 待核对                 | business_doc 可能缺文档页                                                                      | 判断是否要新增菜单                              |
| 单元格能力  | 选择        | `cell-selection/`                                | `selection/index.vue`；`selection/constant.vue`；`xTableEasy.vue`；`body/body-td.vue`                                              | `xTableEasy.Cell.Selection.vue` / `DaiYouXuanZeDeBiaoGe.vue`  | 待核对（已补依赖包装） | 已补 `selection/constant.vue`，需确认运行时可正常加载，编辑器的 ts-plugin 报错是否只是误报     | 优先做页面验证与运行时验证                      |
| 单元格能力  | 编辑        | `cell-edit/`                                     | `editor/index.vue`；`editor/constant.vue`；`xTableEasy.vue`；`body/body-td.vue`                                                    | `xTableEasy.Cell.Edit.vue` / `DanYuanGeBianJi.vue`            | 待核对（已补依赖包装） | 已补 `editor/constant.vue`，需确认运行时可正常加载，编辑器的 ts-plugin 报错是否只是误报        | 优先做页面验证与运行时验证                      |
| 单元格能力  | 自动填充    | `cell-autofill/`                                 | `selection/index.vue`；`selection/constant.vue`；`util/index.vue(cellAutofill)`；`xTableEasy.vue`                                  | `xTableEasy.Cell.Autofill.vue`                                | 待核对（已补依赖包装） | 仍受 `selection/index.vue` 运行时行为影响，需要联动验证                                        | 在选择功能可用后继续实测自动填充                |
| 行能力      | 操作列      | `operation-column/`                              | `body/body-td.vue`；`body/body-tr.vue`；`util/index.vue(isOperationColumn)`                                                        | `xTableEasy.Action.Column.vue` / `CaoZuoLie.vue`              | 待核对                 | 操作列与选择/固定列互相影响                                                                    | 重点实测                                        |
| 行能力      | 多选        | `row-checkbox/`                                  | `body/body-checkbox-content.vue`；`header/header-checkbox-content.vue`；`body/index.vue`                                           | `DaiYouXuanZeDeBiaoGe.vue`                                    | 待核对                 | 可能缺独立聚合页                                                                               | 补齐与源库对应关系                              |
| 行能力      | 单选        | `row-radio/`                                     | `body/body-radio-content.vue`；`body/index.vue`                                                                                    | `DaiYouXuanZeDeBiaoGe.vue`                                    | 待核对                 | 与多选共享页面，粒度不足                                                                       | 考虑拆文档子块                                  |
| 行能力      | 行展开      | `row-expand/`                                    | `body/index.vue`；`body/body-tr.vue`；`body/expand-tr.vue`；`body/expand-tr-icon.vue`                                              | `xTableEasy.Row.Expand.vue` 或 `examples/HangZhanKai.vue`     | 待核对                 | 路由重复且页面混用                                                                             | 确认最终展示页                                  |
| 行能力      | 行样式      | `row-style/`                                     | `body/index.vue`；`body/body-tr.vue`；`body/body-td.vue`                                                                           | `xTableEasy.Row.Style.vue` 或 `XingYangShiDingZhi.vue`        | 待核对                 | 点击高亮/悬停/斑马纹需拆开看                                                                   | 补子项                                          |
| Footer 能力 | Footer 汇总 | `footer-summary/`                                | `footer/index.vue`；`footer/footer-tr.vue`；`footer/footer-td.vue`                                                                 | 暂未发现明确完整聚合页                                        | 待核对                 | 功能可能在代码中但文档缺失                                                                     | 需要补文档/示例                                 |
| 剪贴板      | 剪贴板      | `clipboard/`                                     | `util/clipboard.vue`；`editor/index.vue`；`editor/constant.vue`；`selection/index.vue`；`selection/constant.vue`；`xTableEasy.vue` | `xTableEasy.Clipboard.vue`                                    | 待核对（已补依赖包装） | 仍需确认复制/粘贴/剪切链路在页面里是否真正可用                                                 | 先做选择/编辑链路验证，再做剪贴板分子项核对     |
| 右键菜单    | 上下文菜单  | `contextmenu/`                                   | `util/index.vue(setHeaderContextmenuOptions / setBodyContextmenuOptions)`；`xTableEasy.vue`                                        | `xTableEasy.Contextmenu.vue`                                  | 待核对                 | header/body 菜单不同                                                                           | 分 header/body 核对                             |
| 性能能力    | 虚拟滚动    | `virtual-scroll/`                                | `xTableEasy.vue`；`body/index.vue`；`body/body-tr.vue`；`body/body-tr-scrolling.vue`                                               | `xTableEasy.Virtual.Scroll.vue` 或 `XuNiGunDong.vue`          | 待核对                 | 行高同步、占位渲染复杂                                                                         | 列为高优先级实测项                              |
| 事件与方法  | 实例方法    | `instance-methods/` + `api/instance-methods.vue` | `xTableEasy.vue`；`selection/constant.vue`（包装 `selection/constant.js`）；`editor/constant.vue`（包装 `editor/constant.js`）     | 暂未发现明确页面                                              | 待核对                 | 文档和页面缺口较大，实例方法仍缺独立展示页                                                     | 后续补独立文档页                                |
| 事件与方法  | API 文档    | `api/`                                           | `xTableEasy.readme.md`；`README.md`；`xTableEasy-功能真值表.md`                                                                    | 暂未形成统一页面                                              | 待核对                 | 当前 API 说明不成体系                                                                          | 后续按功能真值表回填                            |
| 其他        | 分页        | `pagination/`                                    | 暂未发现当前组件目录明确支持文件                                                                                                   | 暂未发现 xTableEasy 当前文档页                                | 待核对                 | 可能源库有、当前未移植                                                                         | 明确是否纳入本轮范围                            |
| 其他        | 事件自定义  | `event-custom/`                                  | `xTableEasy.vue`；`body/body-tr.vue`；`header/header-th.vue`；`footer/footer-tr.vue`                                               | 暂未发现明确页面                                              | 待核对                 | 功能可能已在 props 中但无展示                                                                  | 补示例和文档                                    |

---

## 三、本轮已确认的结构性风险

### 1. 已补齐一批缺失的 `.vue` 包装文件

本轮已补齐以下包装文件：

- `selection/constant.vue`
- `editor/constant.vue`
- `locale/index.vue`
- `utils/resize-observer-polyfill.vue`

这些文件的目的，是让当前 `async function + _.$importVue(...)` 体系下的导入路径能和实际文件结构对齐。

### 2. 已通过脚本完成一轮内部 `.vue` 动态导入扫描

本轮新增了脚本：

- `scripts/check-x-table-easy-imports.js`

扫描结果：

- 扫描到 `.vue` 文件数：`199`
- 命中内部 `.vue` 导入数：`102`
- 缺失导入数：`0`

这说明：

- **当前 `xTableEasy` 目录内的内部 `.vue` 动态导入路径，已经没有明显缺文件问题。**

### 3. 当前仍然保留的结构性风险

#### 3.1 `header-filter-custom-content.vue` 与源实现存在偏差

对照源文件 `header-filter-custom-content.jsx`，当前 `.vue` 版本存在以下差异：

- 没有像源实现那样显式导入 `VeDropdown` 与 `VeIcon`；
- 当前实现改成了 `h("ve-dropdown")` 和 `h("ve-icon")` 这种字符串组件名方式；
- 是否能稳定工作，取决于运行时是否已经做了全局注册。

这类问题不会只靠静态阅读直接定性为 bug，**但已经足够列为结构性风险，必须页面验证**。

#### 3.2 编辑器里的 ts-plugin 报错疑似误报

新补的 `.vue` 包装文件在编辑器里出现了：

- `A module cannot have multiple default exports`

但从文件内容和现有同类 `constant.vue` 写法看：

- 写法与 `util/constant.vue` 保持一致；
- 当前脚本扫描没有发现新的内部 `.vue` 缺口；
- 因此这更像是 **IDE / ts-plugin 对这种异步壳写法的不兼容误报**，暂时不作为阻塞结论。

#### 3.3 `business_doc` 路由存在重复路径声明

`statics/business_doc/router/routes.vue` 中，同一个 `x-table-easy` 功能路径存在多次声明，并分别指向：

- 英文命名的聚合页
- 中文命名的旧示例页

这会导致：

- 菜单与路由归属容易混乱；
- 后续“同步开发文档 + 测试”时，难以判断哪个页面才是最终入口；
- 在做自动化验证时，路径唯一性不足。

---

## 四、当前优先核对建议

### P0：优先级最高

1. `xTableEasy.vue` 异步壳完整性
2. 表格宽度 / 高度 / 边框
3. 列宽拖动 / 列固定 / 列隐藏
4. 表头固定 / 分组 / 排序 / 筛选
5. 单元格选择 / 编辑 / 自动填充
6. 虚拟滚动
7. 新补 `.vue` 包装文件的运行时有效性确认

### P1：第二优先级

1. 右键菜单
2. 剪贴板
3. 行展开
4. 行样式
5. 操作列
6. `header-filter-custom-content.vue` 运行时组件注册验证

### P2：第三优先级

1. Footer 汇总
2. API 文档
3. 实例方法文档
4. 空数据 / loading / 事件自定义 / 分页
5. `business_doc` 新旧页面入口统一

---

## 五、下一步执行建议

### 当前建议先做的事

1. 继续补全这份真值表中剩余功能点的“当前组件对应文件”列；
2. 开始第一轮真正的代码核查：
    - 先根组件异步壳
    - 再 P0 功能链
3. 重点验证新补 `.vue` 包装文件在页面运行时是否有效；
4. 同时明确 `business_doc` 中每个功能点最终采用哪一页作为正式文档入口。
5. 对 `header-filter-custom-content.vue` 做针对性页面验证，确认字符串组件名写法是否可靠。

### 当前建议暂缓的事

1. 暂不直接修改大量业务文档内容；
2. 暂不直接相信历史“已实现”勾选；
3. 暂不直接清理旧示例页，先确认新旧页面职责。
