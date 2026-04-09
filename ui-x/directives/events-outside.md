# events-outside 与 clickoutside 指令的区别

## 核心功能对比

| 特性       | events-outside                            | clickoutside              |
| ---------- | ----------------------------------------- | ------------------------- |
| 事件类型   | 支持多种事件（可配置）                    | 只支持 click 事件         |
| 绑定值格式 | 对象 `{ events: [], callback: function }` | 直接是回调函数            |
| 灵活性     | 高，可自定义事件类型                      | 低，固定为 click 事件     |
| 实现复杂度 | 稍高，需要处理事件数组                    | 简单，只需处理 click 事件 |

## 具体实现区别

### events-outside 指令

- **多事件支持**：通过 `events` 数组可以指定多个事件类型（如 mousedown、mouseover 等）
- **对象参数**：绑定值是一个包含 `events` 和 `callback` 的对象
- **事件监听**：对每个指定的事件类型都添加监听器
- **存储方式**：使用 `el.__eventsOutside__` 存储事件处理函数

### clickoutside 指令

- **单一事件**：只监听 click 事件
- **直接回调**：绑定值直接是回调函数
- **事件监听**：只添加 click 事件监听器
- **存储方式**：使用 `el.__clickOutSide__` 存储事件处理函数

## 使用场景对比

1. **events-outside 适用场景**：
    - 需要监听多种外部事件时（如点击、鼠标悬停等）
    - 需要更灵活的事件控制
    - 替代多个 clickoutside 指令的场景

2. **clickoutside 适用场景**：
    - 只需要监听点击外部事件的简单场景
    - 代码简洁性要求较高的场景

## 代码示例对比

### events-outside 用法

```vue
<template>
	<button
		v-events-outside="{
			events: ['mousedown', 'mouseover'],
			callback: e => {
				/* 处理逻辑 */
			}
		}">
		删除
	</button>
</template>
```

### clickoutside 用法

```vue
<template>
	<button v-clickoutside="handleClickOutside">删除</button>
</template>
<script>
export default {
	methods: {
		handleClickOutside(e) {
			// 处理逻辑
		}
	}
};
</script>
```

## 结论

`events-outside` 指令是 `clickoutside`
指令的增强版，提供了更灵活的事件类型配置能力。它通过允许指定多个事件类型，使得指令的应用场景更加广泛，能够满足更多复杂的交互需求。当只需要监听点击外部事件时，`clickoutside`
指令仍然是更简洁的选择。

```
events outside
desc:绑定元素触发的事件不在指定事件中，将会触发。此指令可替代 clickoutside

--------------------vue 模板用法如下：-----------------------------------
<tempate>
    <button v-events-outside="{
        events:["mousedown","mouseover"],
        callback:(e)=>{} //
    }">删除</button>
</tempate>

--------------------vue jsx 用法如下：-----------------------------------
<script>
    export default{
        render(){
                const props = {
                        directives: [
                                        {
                                            name: "events-outside",
                                            value: {
                                                events: ["mousedown","mouseover"],
                                                callback: (e) => {
                                                    //
                                                },
                                            },
                                        }
                                    ]
                    };

            return (
                <div>
                    <button {...props}>删除</button>
                </div>
            )
        }
    }
</script>
```
