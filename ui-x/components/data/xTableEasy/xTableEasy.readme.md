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

### 基础功能

- [ ] 基本表格渲染
- [ ] 列定义与配置
- [ ] 数据绑定
- [ ] 表格样式定制

### 高级功能

- [ ] 虚拟滚动
- [ ] 分页功能
- [ ] 排序功能
- [ ] 筛选功能
- [ ] 单元格编辑
- [ ] 行选择
- [ ] 复选框选择
- [ ] 固定列
- [ ] 合并单元格
- [ ] 自定义模板

### 性能优化

- [ ] 大数据量处理
- [ ] 渲染性能优化
- [ ] 内存使用优化

## 注意事项

- **容器高度**：确保表格容器有适当的高度设置
- **虚拟滚动**：使用虚拟滚动时需要设置 maxHeight 属性
- **事件处理**：正确处理表格相关事件
- **兼容性**：确保在不同浏览器环境下正常运行
