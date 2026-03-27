E:\ghca_code\m2o\statics\common\ui-x\components\data\xTableEasy这里面有一个库E:\ghca_code\m2o\statics\common\ui-x\components\data\xTableEasy\vue-easytable-master

我想把它移植为我自己xUI框架的组件，现在已经有了一个xTableEasy.vue需要你检查并完成最终的移植工作，需要符合m2o的代码规范

- `i18n`是全局的，通过with语法注入，可以全局使用，运行时没有问题
- emitter 在vue.js里面已经做了修改，可以通过调用实例方法直接使用 log、dispatch、broadcast

# 移植
- `xTableEasy.readme.md`里面的只实现，如果不是你确认的，你就不要信。
- 先梳理功能
- 我的建议是可以按照原来的文件结构，移植
- 然后把js的文件改成.vue文件， 当然，要符合本项目的规范
- 你说的没错，最大的问题是异步壳转换是否完整`xTableEasy.vue` 现在是 `async function + _.$importVue(...)` 形式，这种移植方式本身没问题，但还要核对：依赖映射、返回解构顺序、局部工具模块替换是否完全对应源库。

