# \_.$ensure 内存回收改动计划

## 目标

- 在 `_.$ensure` 中自动尝试获取当前 Vue 实例。
- 当获取到实例时，在实例销毁阶段自动清理定时器，避免轮询持续运行。
- 保持旧调用方式兼容，不要求业务代码立即改造。

## 实现步骤

1. 扩展 `_.$ensure` 的可选参数，支持显式传入 `vm`。
2. 若未传入 `vm`，尝试通过 `window.Vue.getCurrentInstance()` 获取实例代理。
3. 在 `_.$ensure` 内部增加统一的清理函数，清理轮询定时器和超时定时器。
4. 当存在 `vm` 时，绑定 `hook:beforeDestroy` 和 `hook:destroyed`，触发清理并中断后续轮询。
5. 在 Promise 结束（resolve/reject）时主动解绑销毁钩子，减少额外引用。

## 验收

- 组件销毁后，不会继续执行 `_.$ensure` 的轮询。
- 原有调用 `_.$ensure(fn, duration, gap)` 行为不变。
- 新增调用 `_.$ensure(fn, duration, gap, { vm: this })` 可强制绑定实例清理。
