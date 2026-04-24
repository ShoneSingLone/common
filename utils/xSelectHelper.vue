<script lang="ts">
/**
 * 通过 xItem 实例获取内部的 xSelect 组件实例
 * @param xItem - xItem 组件实例
 * @param options - 可选配置
 * @param options.maxRetries - 最大重试次数，默认 10 次
 * @param options.interval - 重试间隔（毫秒），默认 100ms
 * @param options.timeout - 超时时间（毫秒），设置后忽略 maxRetries 和 interval
 * @returns Promise<Vue> xSelect 组件实例
 *
 * @example
 * // 方式 1: 通过 selector 获取
 * const xSelectVm = await getXSelectInstanceBySelector('select1');
 *
 * @example
 * // 方式 2: 通过 xItem 实例获取
 * const xItemVm = Vue._X_ITEM_VM_S['your-item-id'];
 * const xSelectVm = await getXSelectInstance(xItemVm);
 *
 * @example
 * // 方式 3: 在 onMounted 回调中使用
 * onMounted: async ({ xItem }) => {
 *   const xSelectVm = await getXSelectInstance(xItem);
 *   xSelectVm.changePopperPositionTo('body');
 * }
 */
export default async function () {
	/**
	 * 通过 xItem 实例获取 xSelect 实例
	 */
	async function getXSelectInstance(xItem, options = {}) {
		const { maxRetries = 10, interval = 100, timeout } = options;

		if (!xItem) {
			throw new Error("xItem 实例不存在");
		}

		// 获取 xItemSelect 实例
		const xItemSelectVm = await _.$ensure(() => xItem.childVm);
		if (!xItemSelectVm) {
			throw new Error("xItemSelect 实例不存在");
		}

		// 等待 xItemSelect 挂载完成
		await new Promise(resolve => setTimeout(resolve, interval));

		// 尝试获取 xSelect 实例的函数
		const tryGetXSelect = () => {
			// 优先使用 getXSelect 方法
			if (xItemSelectVm.getXSelect) {
				const xSelectVm = xItemSelectVm.getXSelect();
				if (xSelectVm) {
					return xSelectVm;
				}
			}

			// 降级方案：通过 $children 查找
			const xSelectVm = xItemSelectVm.$children?.find(
				child => child.$options?.name === "xSelect"
			);

			if (xSelectVm) {
				return xSelectVm;
			}

			throw new Error("xSelect 实例尚未挂载");
		};

		// 如果有 timeout 配置，使用 timeout 方式
		if (timeout) {
			const startTime = Date.now();
			while (Date.now() - startTime < timeout) {
				try {
					return tryGetXSelect();
				} catch (error) {
					await new Promise(resolve => setTimeout(resolve, interval));
				}
			}
			throw new Error(`获取 xSelect 实例超时（${timeout}ms）`);
		}

		// 使用重试机制获取实例
		let lastError;
		for (let i = 0; i < maxRetries; i++) {
			try {
				return tryGetXSelect();
			} catch (error) {
				lastError = error;
				if (i < maxRetries - 1) {
					await new Promise(resolve => setTimeout(resolve, interval));
				}
			}
		}

		throw lastError || new Error("获取 xSelect 实例失败");
	}

	/**
	 * 通过 selector 获取 xSelect 实例
	 */
	async function getXSelectInstanceBySelector(selector, options = {}) {
		if (!selector) {
			throw new Error("selector 不能为空");
		}

		// 尝试通过 data-form-item-id 获取
		let xItemVm = Vue._X_ITEM_VM_S[selector];

		// 如果没有找到，尝试通过 selector 查找 DOM 元素
		if (!xItemVm) {
			const xItemElement = document.querySelector(`[data-form-item-selector="${selector}"]`);
			if (xItemElement) {
				const itemId = xItemElement.getAttribute("data-form-item-id");
				if (itemId) {
					xItemVm = Vue._X_ITEM_VM_S[itemId];
				}
			}
		}

		if (!xItemVm) {
			throw new Error(`未找到 selector 为 "${selector}" 的 xItem 实例`);
		}

		return getXSelectInstance(xItemVm, options);
	}

	/**
	 * 批量获取多个 xSelect 实例
	 */
	async function batchGetXSelectInstances(selectors, options = {}) {
		const results = new Map();

		if (Array.isArray(selectors)) {
			// 如果是数组，判断是 selector 数组还是 xItem 实例数组
			const promises = selectors.map(async item => {
				try {
					let xSelectVm;
					if (typeof item === "string") {
						xSelectVm = await getXSelectInstanceBySelector(item, options);
						results.set(item, xSelectVm);
					} else {
						xSelectVm = await getXSelectInstance(item, options);
						results.set(`xItem_${item.cpt_id || results.size}`, xSelectVm);
					}
				} catch (error) {
					console.error(`获取 xSelect 实例失败：${item}`, error);
					results.set(
						typeof item === "string" ? item : `xItem_${item.cpt_id || results.size}`,
						null
					);
				}
			});

			await Promise.all(promises);
		} else if (typeof selectors === "object") {
			// 如果是对象，认为是 { [key]: selector|xItem } 的形式
			const entries = Object.entries(selectors);
			const promises = entries.map(async ([key, item]) => {
				try {
					let xSelectVm;
					if (typeof item === "string") {
						xSelectVm = await getXSelectInstanceBySelector(item, options);
					} else {
						xSelectVm = await getXSelectInstance(item, options);
					}
					results.set(key, xSelectVm);
				} catch (error) {
					console.error(`获取 xSelect 实例失败：${key}`, error);
					results.set(key, null);
				}
			});

			await Promise.all(promises);
		}

		return results;
	}

	// 导出所有函数
	return {
		getXSelectInstance,
		getXSelectInstanceBySelector,
		batchGetXSelectInstances
	};
}
</script>
