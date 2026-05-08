# $ensure 与 debounce 组合使用问题分析与解决方案

## 一、问题描述

在项目中发现，当 `debounce` 与 `$ensure` 组合使用时，虽然使用了防抖，但函数内部的 `$ensure` 仍会导致方法执行多遍。

**核心问题**：`$ensure` 没有提供取消机制，当防抖函数取消时，无法通知已经运行的 `$ensure` 停止等待。

---

## 二、问题原理分析

### 2.1 `$ensure` 工作机制

`$ensure` 是一个异步等待函数，核心逻辑如下：

```javascript
$ensure = async (fn_get_value, duration = 0, gap = 64, options = {}) => {
    return new Promise((resolve, reject) => {
        const checkValue = async () => {
            const value = await fn_get_value({ exeCount, handler, vm });
            if (value) {
                resolve(value); // 条件满足，resolve
            } else {
                timer = setTimeout(checkValue, gap); // 默认每64ms检查一次
            }
        };
        checkValue();
    });
};
```

### 2.2 问题场景

```javascript
const debouncedFn = _.debounce(async function() {
    await _.ensure(() => someCondition); // 开始等待
    doSomething(); // 条件满足后执行
}, 300);

// 用户快速连续触发
debouncedFn(); // 第1次调用 → 启动 $ensure
debouncedFn(); // 第2次调用（300ms内）→ 启动新的 $ensure
debouncedFn(); // 第3次调用（300ms内）→ 启动新的 $ensure

// 结果：3个 $ensure 实例同时运行，条件满足时都会执行 doSomething()
```

### 2.3 根本原因

1. `$ensure` **没有提供取消机制**
2. 防抖只能取消尚未执行的函数调用，**无法取消已启动的 Promise**
3. 多个 `$ensure` 实例独立运行，无法相互感知

---

## 三、解决方案

### 方案一：给 `$ensure` 添加取消机制（推荐）

**核心思路**：在返回的 Promise 上挂载 `cancel` 方法，允许外部取消等待。

**修改后的 `$ensure`**：

```javascript
$ensure = async (fn_get_value, duration = 0, gap = 64, options = {}) => {
    let cancelFn = null;
    
    const promise = new Promise((resolve, reject) => {
        let timer = null;
        let durationTimer = null;
        let isFinished = false;
        let isCanceled = false;

        // 新增：取消函数
        cancelFn = (reason = "ensure canceled") => {
            if (isFinished) return;
            isCanceled = true;
            clearTimers();
            isFinished = true;
            reject(new Error(reason));
        };

        const clearTimers = () => {
            if (timer) { clearTimeout(timer); timer = null; }
            if (durationTimer) { clearTimeout(durationTimer); durationTimer = null; }
        };

        const checkValue = async () => {
            if (isFinished || isCanceled) return; // 新增取消检查
            try {
                const value = await fn_get_value({ exeCount, handler, vm });
                if (isFinished || isCanceled) return;
                if (value) {
                    isFinished = true;
                    clearTimers();
                    resolve(value);
                } else {
                    timer = setTimeout(checkValue, gap);
                }
            } catch (error) {
                isFinished = true;
                clearTimers();
                reject(error);
            }
        };

        checkValue();
    });

    // 在 Promise 上挂载 cancel 方法
    promise.cancel = cancelFn;
    return promise;
};
```

**使用方式**：

```javascript
const debouncedFn = (() => {
    let currentEnsure = null;
    
    return _.debounce(async function() {
        // 取消之前的 ensure
        if (currentEnsure?.cancel) {
            currentEnsure.cancel();
        }
        
        currentEnsure = _.ensure(() => someCondition);
        try {
            await currentEnsure;
            doSomething();
        } catch (e) {
            if (e.message !== "ensure canceled") throw e; // 忽略取消错误
        }
    }, 300);
})();
```

### 方案二：增强 `_.$asyncDebounce`

**核心思路**：修改防抖函数，使其能自动取消之前的 Promise。

```javascript
_.$asyncDebounce = (vm, func, delay = 1000) => {
    let timer;
    let promise = null;
    let cancelPrevious = null;

    return async function (...args) {
        // 取消之前的执行
        if (typeof cancelPrevious === 'function') {
            cancelPrevious();
        }
        
        if (timer) clearTimeout(timer);

        if (promise) {
            const previousReject = _reject;
            cancelPrevious = () => previousReject?.(new Error('canceled'));
            
            timer = setTimeout(() => {
                func.apply(vm, args)
                    .then(_resolve)
                    .catch(_reject);
            }, delay);
            return promise;
        } else {
            promise = new Promise((resolve, reject) => {
                _resolve = resolve;
                _reject = reject;
                timer = setTimeout(() => {
                    func.apply(vm, args)
                        .then(resolve)
                        .catch(reject);
                }, delay);
            });
            return promise;
        }
    };
};
```

### 方案三：使用 AbortController（现代浏览器）

**核心思路**：利用原生 `AbortController` API 实现取消。

```javascript
$ensure = async (fn_get_value, duration = 0, gap = 64, options = {}) => {
    const controller = options.controller || new AbortController();
    
    return new Promise((resolve, reject) => {
        let timer = null;
        let isFinished = false;

        controller.signal.addEventListener('abort', () => {
            if (isFinished) return;
            isFinished = true;
            clearTimeout(timer);
            reject(new Error('aborted'));
        });

        const checkValue = async () => {
            if (isFinished || controller.signal.aborted) return;
            // ... 检查逻辑
        };

        checkValue();
    });
};
```

---

## 四、影响范围评估

### 4.1 调用位置分布

| 模块类型 | 文件数量 | 典型场景 |
|---------|---------|---------|
| UI 组件 | 14 个 | `xInputNumber`、`xCascader`、`xTableVir` |
| 工具函数 | 4 个 | `common.ts`、`seed.js`、`xSelectHelper.vue` |
| 业务组件 | 4 个 | `use_mo_common.vue`、`Nprogress.vue` |

### 4.2 向后兼容性分析

| 评估维度 | 状态 | 说明 |
|---------|------|------|
| **API 兼容性** | ✅ 兼容 | 参数不变，返回值仍为 Promise |
| **行为兼容性** | ✅ 兼容 | 原有逻辑完全保留 |
| **新增功能** | ✅ 可选 | `cancel` 方法按需使用 |
| **TypeScript** | ⚠️ 需要更新 | 更新类型声明 |

### 4.3 风险评估

| 风险等级 | 风险描述 | 缓解措施 |
|---------|---------|---------|
| **低** | 返回值结构变化 | Promise 挂载方法不影响 `.then()`/`await` |
| **低** | 内存泄漏 | 已有 `clearTimers` 和 `unbindVmDestroyHook` |
| **中** | 并发调用冲突 | 每个调用独立，互不影响 |

---

## 五、推荐方案

**推荐采用方案一**，理由如下：

1. **最小侵入性**：只修改 `$ensure`，不需要修改使用它的代码
2. **灵活性高**：调用者自由决定是否需要取消功能
3. **向后兼容**：现有代码不受影响
4. **易于维护**：逻辑清晰，取消机制集中管理

---

## 六、修改步骤

1. **修改 `seed.js`**：在 `$ensure` 函数中添加取消机制
2. **更新类型声明**：添加 `cancel` 方法的 TypeScript 类型
3. **更新 `common.ts`**：同步修改（如果有重复实现）
4. **更新 `min/common.ts`**：同步压缩版本
5. **添加测试**：编写取消功能的测试用例

---

## 七、参考代码

### 7.1 当前 `$ensure` 位置

- 主要实现：`statics/common/libs/seed.js`（第 566-676 行）
- 其他引用：`statics/common/libs/common.ts`

### 7.2 调用示例

```javascript
// 基础用法（不受影响）
await _.ensure(() => condition);

// 带取消的用法（新增）
const ensurePromise = _.ensure(() => condition);
ensurePromise.cancel(); // 取消等待
```

---

**文档版本**: v1.0  
**创建日期**: 2026-05-08  
**适用范围**: `$ensure` 函数修改