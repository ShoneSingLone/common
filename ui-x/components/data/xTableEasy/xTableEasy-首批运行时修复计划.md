# xTableEasy 首批运行时修复计划

## 目标

先处理当前已经明确、且会直接影响运行时稳定性的高风险问题，避免在后续继续移植时把基础问题叠加放大。

## 本批次修复状态

### 已完成

1. **清理 `xTableEasy.vue` 中残留的 TypeScript 类型标注**
    - 已移除当前运行时不支持的显式类型标注写法。
    - 同时把相关对象初始化改成更稳妥的纯 JavaScript 形式，避免编辑器把对象推断成空对象类型。

2. **修复 `header/header-filter-custom-content.vue` 与源实现的关键差异**
    - 已从字符串组件名 `h("ve-dropdown")`、`h("ve-icon")` 调整为显式组件导入方案。
    - 现在与源实现的依赖加载方式更接近，降低了对全局注册的依赖风险。

3. **完成一轮静态自查**
    - 已补齐以下 `.vue` 包装文件，使动态导入路径与当前目录结构对齐：
        - `selection/constant.vue`
        - `editor/constant.vue`
        - `locale/index.vue`
        - `utils/resize-observer-polyfill.vue`
    - 已执行内部 `.vue` 动态导入扫描：
        - 结果：`xTableEasy` 目录内未发现缺失的 `.vue` 动态导入。
    - 已执行方法级 `h()` 使用检查：
        - 结果：未发现新的疑似 `h` 作用域问题。

### 仍需进入运行时验证的项

1. **新补 `.vue` 包装文件是否在运行时完全可用**
    - 编辑器里仍有 ts-plugin 的 `multiple default exports` 误报。
    - 这一点需要以页面实际运行结果为准，而不能只看编辑器提示。

2. **`header-filter-custom-content.vue` 的运行时表现**
    - 虽然静态结构已对齐，但仍需在页面里确认筛选自定义是否真正可用。

3. **`business_doc` 的最终正式入口**
    - `routes.vue` 仍存在新旧页面并存、路径重复声明的情况。
    - 后续需要确认每个功能点的正式文档页与示例页归属。

## 当前结论

这批“首批运行时修复”对应的**静态修复项已经基本完成**，下一步不该继续盲改，而应该进入：

1. 页面运行时验证；
2. `xTableEasy.vue` 异步壳与 P0 功能链验证；
3. `business_doc` 文档入口统一。

## 下一步建议

1. 先对 `xTableEasy.vue` 做页面级运行时验证；
2. 再验证：
    - 单元格选择
    - 单元格编辑
    - 自定义筛选
    - 虚拟滚动
3. 同步确认 `business_doc` 中每个功能点最终采用哪一页作为正式入口。
