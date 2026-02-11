# xTableEasy 组件开发文档

## 项目概述

- **项目目标**：将 vue-easytable-master 项目移植为 xTableEasy 组件，符合 xUI 实现指南
- **组件入口**：statics\common\ui-x\components\data\xTableEasy\xTableEasy.vue
- **源文件参考**：statics\common\ui-x\components\data\xTableEasy\vue-easytable-master\packages\ve-table\src\index.jsx
- **文档位置**：statics\business_doc 项目中添加相关文档
- **测试工具**：使用 puppeteer-core 进行组件测试

## 开发标准

- **TDD 标准**：采用测试驱动开发，先写测试再实现功能
- **小步验证**：将复杂功能分解为最小的可测试单元，每个测试只验证一个具体行为
- **服务器状态**：服务器已启动，不用每次运行 npm run dev

### TDD 核心原则

1. **测试驱动开发**：
    - 先写测试用例，再实现功能
    - 每个测试只验证一个具体行为
    - 通过小而专注的测试用例逐步构建功能

2. **Red-Green-Refactor 循环**：
    - Red：编写失败的测试
    - Green：实现最小代码使测试通过
    - Refactor：重构代码，保持测试通过

3. **任务分解**：
    - 将复杂功能分解为最小的可测试单元
    - 每个测试只验证一个具体行为
    - 通过小步验证开发，确保每一步都可验证

### 开发流程

1. **文档先行**：
    - 先完善doc项目的文档
    - 再写使用puppeteer-core的测试用例
    - 严格按照TDD标准修改代码
    - 把代码的实现原理同步到doc的文档中

2. **功能点粒度**：
    - 按照表格宽度这种粒度处理
    - 先整理，再执行
    - 例如表格宽度就有"表格宽度"、"表格自动宽度"、"表格宽度固定"、"表格动态宽度（calc
      css 函数）"、"表格动态宽度（百分比）"这几个小DemoAndCode

3. **源文件对照**：
    - 应该先查看源文件，然后补全doc项目下的文档
    - 源文件位置：`statics\common\ui-x\components\data\xTableEasy\vue-easytable-master\examples\src\docs\zh\ve-table`
    - 对照源文件一一移植，确保功能完整性

## 开发计划

### 第一阶段：分析与规划

1. **分析 vue-easytable-master 项目结构**
    - 确定需要实现的功能点
    - 举一个例子 表格边框 应该有默认 横向边框 纵向边框 外边框 全边框 外边框+横向边框 外边框+纵向边框这些功能点，要对照源文件一一移植 边框圆角
    - 分析组件架构和核心功能

2. **创建 TDD 测试计划**
    - 为每个功能点编写测试用例
    - 建立测试验证流程

### 第三阶段：文档与完善

- **完善文档**：为所有功能点添加详细文档
- **示例代码**：提供完整的使用示例
- **性能优化**：确保组件性能良好
- **兼容性测试**：确保在不同环境下正常运行

## 测试指南

### puppeteer-core 配置

```javascript
const browser = await puppeteer.launch({
	headless: false,
	executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	args: ["--no-sandbox", "--disable-setuid-sandbox"],
	devtools: true
});

// 设置浏览器窗口大小
await page.setViewport({
	width: 1920,
	height: 1080
});
```

### 测试流程

1. **访问测试页面**：http://localhost:3002/#/component/data/x-table-easy
2. **展开示例**：点击“xTableEasy 表格”菜单，展开基础用法示例
3. **验证功能**：确保表格正确显示，功能正常运行
4. **逐步测试**：按照文档目录，逐个测试各个功能点

## 问题排查

- **对比源文件**：如果遇到问题，对比源文件和移植文件
- **逐步修复**：小步修改，每次修改后测试
- **调试工具**：使用浏览器开发者工具和 puppeteer 调试功能

## 文档结构

- **源文档参考**：statics\common\ui-x\components\data\xTableEasy\vue-easytable-master\examples\src\docs\zh
- **文档项目**：statics\business_doc（所有组件的文档）
- **菜单配置**：需在 statics\business_doc\router 下修改对应的菜单、目录

## 开发建议

- **保持同步**：定期与源项目进行对比，确保功能一致性
- **代码质量**：遵循项目编码规范，保持代码可读性
- **测试覆盖**：确保每个功能点都有对应的测试用例
- **文档更新**：及时更新文档，确保文档与代码同步

## 功能点清单

### 已实现功能

#### 表格基础

- [x] 表格宽度
    - [x] 表格宽度
    - [x] 表格自动宽度
    - [x] 表格宽度固定
    - [x] 表格动态宽度（calc css 函数）
    - [x] 表格动态宽度（百分比）
- [x] 表格高度
    - [x] 表格高度
    - [x] 表格自动高度
    - [x] 表格高度固定
    - [x] 表格动态高度
    - [x] 表格动态高度（百分比）
- [x] 表格边框
    - [x] 默认边框
    - [x] 横向边框
    - [x] 纵向边框
    - [x] 外边框
    - [x] 全边框
    - [x] 外边框+横向边框
    - [x] 外边框+纵向边框
    - [x] 边框圆角

#### 列功能

- [x] 列宽设置
    - [x] 无宽度
    - [x] 像素宽度
    - [x] 百分比宽度
- [x] 列宽拖动
- [x] 列固定
    - [x] 左固定
    - [x] 右固定
- [x] 列隐藏

#### 表头功能

- [x] 表头固定
- [x] 表头分组
- [x] 表头隐藏

#### 文本处理

- [x] 长文本破坏布局
    - [x] normal 模式
    - [x] keep-all 模式
    - [x] break-all 模式
    - [x] break-word 模式

### 待实现功能

#### 筛选功能

- [ ] 筛选
- [ ] 筛选自定义

#### 排序功能

- [ ] 排序

#### 单元格功能

- [ ] 单元格对齐
- [ ] 单元格样式
- [ ] 单元格自定义
- [ ] 单元格合并
- [ ] 单元格选择
- [ ] 单元格自动填充
- [ ] 单元格编辑
- [ ] 单元格省略

#### 行功能

- [ ] 操作列
- [ ] 行序号
- [ ] 行单选
- [ ] 行多选
- [ ] 行展开
- [ ] 行样式

#### 其他功能

- [ ] Footer 汇总
- [ ] 分页
- [ ] 开启loading
- [ ] 虚拟滚动
- [ ] 事件自定义
- [ ] 空数据
- [ ] 实例方法
- [ ] API
- [ ] 剪贴板
- [ ] 右键菜单

## 注意事项

- **容器高度**：确保表格容器有适当的高度设置
- **虚拟滚动**：使用虚拟滚动时需要设置 maxHeight 属性
- **事件处理**：正确处理表格相关事件
- **兼容性**：确保在不同浏览器环境下正常运行

## 开发经验总结

### 常见问题与解决方案

1. **表头消失问题**：
    - 问题：表头行没有正确渲染
    - 原因：`initGroupColumns()` 函数中叶子列处理逻辑错误
    - 解决：移除不必要的循环，直接将列添加到对应层级

2. **长文本破坏布局**：
    - 问题：长文本不换行，破坏表格布局
    - 原因：td元素使用了`white-space: nowrap`样式
    - 解决：修改为`white-space: pre-wrap`，添加`word-break: inherit`，新增`wordBreakMode`属性

3. **列宽拖动不工作**：
    - 问题：列宽拖动功能不生效
    - 原因：colgroup组件使用了`col.width`而不是`col._columnResizeWidth`
    - 解决：更新colgroup组件使用`col._columnResizeWidth || col.width`

4. **固定列计算错误**：
    - 问题：hasLeftFixedColumn和hasRightFixedColumn计算错误
    - 原因：直接对colgroups（二维数组）调用some()
    - 解决：改为对colgroups[0]调用some()，使用可选链处理空数组

5. **表格样式计算问题**：
    - 问题：默认宽度没有设置为100%
    - 原因：tableStyle计算属性没有处理默认情况
    - 解决：当scrollWidth未提供时，默认返回"100%"

6. **边框属性默认值错误**：
    - 问题：边框属性默认值为true而不是false
    - 原因：与文档说明不一致
    - 解决：更新borderAround、borderX、borderY默认值为false

### 代码规范

1. **Vue文件规范**：
    - template中不可以使用反引号（`）
    - 项目不支持import语法，使用`_.$importVue`导入组件
    - 使用xUI基础组件（xInput、xBtn等）

2. **组件结构**：
    - xItem组件有xItem-wrapper class，可以匹配label
    - xItem有data-form-item-id，通过Vue.\_X_ITEM_VM_S可以获取xItem实例

3. **样式规范**：
    - 避免不必要的对象复制或克隆
    - 避免多层嵌套，提前返回
    - 使用适当的并发控制机制

4. **命名约定**：
    - 使用有意义的、描述性的名称
    - 遵循项目或语言的命名规范
    - 避免缩写和单字母变量（除非是约定俗成的）

### 测试规范

1. **测试文件位置**：
    - 所有测试文件都放在test目录下
    - 做好层级管理

2. **测试工具**：
    - 使用puppeteer-core进行测试
    - 配置Chrome浏览器路径
    - 使用`page.waitForTimeout`时替换为`await new Promise(resolve => setTimeout(resolve, 1000))`

3. **测试选择器**：
    - 使用正确的class选择器（如`.x-table-easy`）
    - 避免使用错误的选择器（如`.ve-table-container`）

### 文档规范

1. **文档结构**：
    - 每个功能点对应一个文档文件
    - 按照表格宽度这种粒度处理
    - 先整理，再执行

2. **文档内容**：
    - 包含DemoAndCode示例
    - 添加实现原理说明
    - 提供API文档
    - 包含使用方法

3. **文档同步**：
    - 先完善doc项目的文档
    - 再写测试用例
    - 严格按照TDD标准修改代码
    - 把代码的实现原理同步到doc的文档中

### 开发建议

1. **小步重构**：
    - 每次只做一个小改动，然后测试
    - 频繁提交，保持代码随时可工作

2. **测试保障**：
    - 重构前确保有足够的测试
    - 每次修改后运行测试，确保行为不变

3. **代码审查**：
    - 重构后进行代码审查，确保质量

4. **性能优化**：
    - 内存优化：避免不必要的对象创建，及时释放不再需要的资源
    - 计算优化：避免重复计算，使用适当的数据结构和算法
    - 延迟计算直到必要时

5. **并行优化**：
    - 识别可并行化的任务
    - 避免不必要的同步
    - 注意线程安全问题
