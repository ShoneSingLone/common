# xItemCheck.vue Readonly 展示修复计划

## 需求背景
`xItemCheck.vue` 组件缺少针对 `readonly` 状态的独立展示逻辑，当前将 `readonly` 与 `disabled` 混淆处理。

## 修改文件
- `statics/common/ui-x/common/xItem/xItemCheck.vue`

## 修改内容

### 1. 新增 `cptReadonly` 计算属性（约 L35 后插入）
```javascript
cptReadonly() {
    return !!this.$attrs.readonly;
},
```
**说明**: 从 `$attrs` 中独立读取 readonly 状态，与 disabled 解耦。

### 2. 修改 `cptDisabled` 计算属性（L35-L46）
**移除** `readonly` 相关判断，仅保留真正的 disabled 逻辑：
```javascript
cptDisabled() {
    if (this.disabled) {
        return true;
    }
    if (hasOwn(this.$attrs, "disabled")) {
        return this.$attrs.disabled;
    }
    return false;
},
```
**【需求】2026-06-09**: 将 readonly 从 disabled 判断中剥离，实现独立的 readonly 语义。

### 3. 修改 `itemUseDefault` 方法（L107-L123）
在渲染 checkbox 时区分 readonly：
```javascript
itemUseDefault(item) {
    item = item || this.cptDefaultItem;
    const checkboxProps = {
        value: this.cptPrivateSet.has(item.value),
        label: item.label,
        onChange: isChecked => {
            this.setPrivateSet(item.value, isChecked);
        }
    };

    /* 【需求】2026-06-09: 区分 disabled 与 readonly 展示 */
    if (this.cptReadonly) {
        checkboxProps.readonly = true;  // checkbox 原生 readonly
    } else if (this.disabled) {
        checkboxProps.disabled = true;   // disabled 置灰
    }

    return h("xCheckbox", checkboxProps);
},
```

### 4. 修改 `itemUseBlockCheck` 方法（L124-158）
block 按钮模式下 readonly 保持视觉样式但禁用交互：
```javascript
itemUseBlockCheck(item) {
    const vm = this;
    let { value, label } = item || vm.cptDefaultItem;
    if (vm.cptRenderOption) {
        label = vm.cptRenderOption.call(vm.cpt_configs, item);
    }

    /* 【需求】2026-06-09: readonly 状态禁用点击但保持视觉样式 */
    const isReadonly = this.cptReadonly;

    return h(
        "xBtn",
        {
            label: label,
            key: value,
            disabled: this.cptDisabled,           // disabled 时置灰
            class: {
                "xItemCheck-item-wrapper flex middle itemUse-BlockCheck": true,
                "is-group-item": this.cpt_configs.isGroup,
                "is-readonly": isReadonly          // 新增 readonly 样式标记
            },
            preset: this.cptPrivateSet.has(value) ? "xItemCheck-selected" : "",
            nativeOn: {
                click: () => {
                    if (!isReadonly && !this.cptDisabled) {  // readonly/disabled 均拦截
                        const isChecked = !this.cptPrivateSet.has(value);
                        this.setPrivateSet(value, isChecked);
                    }
                }
            }
        },
        [
            label,
            hDiv({ staticClass: "xItemCheck-selected-icon-wrapper" }),
            h("xIcon", { icon: "icon_check" })
        ]
    );
},
```

### 5. 新增 readonly 样式（style 部分）
```less
/* 【需求】2026-06-09: readonly 状态样式 - 保持正常视觉但降低交互暗示 */
&.is-readonly {
    cursor: default;
    opacity: 0.85;

    &:hover {
        color: var(--el-button-hover-text-color);
        border-color: var(--el-button-hover-border-color);
        background-color: var(--el-button-hover-bg-color);
    }
}
```

## 行为对比表

| 状态 | 可交互? | 视觉样式 |
|------|---------|----------|
| 正常 | 可点击切换 | 正常样式 |
| disabled | 不可点击 | 置灰 + cursor: not-allowed |
| readonly | 不可点击 | 接近正常 + cursor: default + 微透明 |

## 测试要点
1. 单选模式（isGroup=false）+ readonly → checkbox 只读展示
2. 多选模式（isGroup=true）+ readonly → block 按钮只读展示
3. readonly 与 disabled 不冲突，disabled 优先级更高
4. readonly 下点击不触发值变更
