<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	(function () /* 预览图片 */ {
		let instance;
		_.$previewImgs = async function (options, previewOptions = {}) {
			const ImageViewer = await _.$importVue("/common/ui-x/directives/xImg/ImageViewer.vue");
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			// 销毁之前的实例，确保每次只有一个ImageViewer实例
			if (instance && instance.$el) {
				instance.hide();
			}

			if (options.currentUrl) {
				options.index = _.findIndex(options.urlList, i => i === options.currentUrl) || 0;
			}

			// 处理originDom参数，支持DOM元素或选择器字符串
			if (options.originDom) {
				if (_.isString(options.originDom)) {
					// 如果是选择器字符串，尝试查找DOM元素
					options.originDom = document.querySelector(options.originDom);
				}
				// 确保是有效的DOM元素
				if (!options.originDom || !(options.originDom instanceof HTMLElement)) {
					options.originDom = null;
				}
			}

			// 确保options包含必要的回调
			const defaultOptions = {
				onClose: () => {
					// 默认的onClose回调，确保实例能正确清理
					if (instance && instance.$el) {
						instance.$destroy();
						if (instance.$el.parentNode) {
							instance.$el.parentNode.removeChild(instance.$el);
						}
					}
				},
				autoPlay: previewOptions.autoPlay || false
			};

			const mergedOptions = _.merge({}, defaultOptions, options);
			const ViewerConstructor = Vue.extend(ImageViewer);
			instance = new ViewerConstructor({
				data: mergedOptions
			});
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			return instance;
		};
	})();

	(function () /* ModalManager */ {
		const windowsRegistry = new Map();
		const state = Vue.observable({
			focusedWindowId: ""
		});
		let PopupManager;

		_.$ModalManager = {
			/**
			 * 获取当前焦点窗口 ID
			 * @returns {string}
			 */
			getFocusedId() {
				return state.focusedWindowId;
			},

			/**
			 * 打开一个窗口
			 * @param {Object} options 窗口配置
			 * @returns {Promise<any>} 返回窗口实例
			 */
			async open(options = {}) {
				if (!PopupManager) {
					PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");
				}
				const id = options.id || _.$ramdomStr(8);

				if (windowsRegistry.has(id)) {
					const vm = windowsRegistry.get(id);
					await this.toTop(id);
					return vm;
				}

				// 统一使用 mask 术语，默认不使用遮罩，允许点击其他窗口，且默认支持最小化
				if (options.mask === undefined) {
					options.mask = false;
				}

				const modalConfigs = _.merge(
					{
						minimizable: true,
						fullscreen: false,
						resize: true,
						keyboard: false,
						center: false,
						responsiveMaximize: false
					},
					options.modalConfigs
				);

				// 内存恢复：如果提供了 ID，尝试从本地存储恢复位置和大小
				if (options.id) {
					const savedState = _.$lStorage[`window_state_${id}`];
					if (savedState) {
						// 增加边界检查：确保至少有 100px 在视口内
						const winWidth = window.innerWidth;
						const winHeight = window.innerHeight;
						const isLeftValid =
							savedState.left < winWidth - 100 && savedState.left > -100;
						const isTopValid = savedState.top < winHeight - 100 && savedState.top > -50;

						if (isLeftValid && isTopValid) {
							options.style = _.merge({}, options.style, savedState);
						}
					}
				}

				// 级联定位逻辑：如果既没有显式传入坐标，也没有恢复坐标，则使用级联偏移
				if (
					!options.style ||
					(!_.$isInput(options.style.left) && !_.$isInput(options.style.top))
				) {
					const instances = this.getAllInstances();
					const offset = instances.length * 20;
					options.style = _.merge({}, options.style, {
						left: 50 + offset,
						top: 50 + offset
					});
				}

				// 调用 _.$openModal 打开窗口
				const modalVm = await _.$openModal(options, modalConfigs);
				modalVm.id = id;
				windowsRegistry.set(id, modalVm);

				// 初始置顶并设为焦点
				await this.toTop(id);

				// 监听销毁事件
				modalVm.$on("hook:beforeDestroy", () => {
					if (options.id) {
						// 优先从 options.style 获取最新的位置和大小（在 xModal.vue 中已实时同步）
						const style = options.style || {};
						const { top, left, width, height } = style;
						if (_.$isInput(top) || _.$isInput(left)) {
							_.$lStorage[`window_state_${id}`] = { top, left, width, height };
						}
					}
					windowsRegistry.delete(id);
					if (state.focusedWindowId === id) {
						state.focusedWindowId = "";
					}
				});

				return modalVm;
			},

			/**
			 * 关闭指定窗口
			 * @param {string} id 窗口 ID
			 */
			close(id) {
				const vm = windowsRegistry.get(id);
				if (vm) {
					if (_.isFunction(vm.close)) {
						vm.close();
					} else if (_.isFunction(vm.closeModal)) {
						vm.closeModal();
					} else if (_.isFunction(vm.$destroy)) {
						vm.$destroy();
					}
				}
			},

			/**
			 * 关闭所有已打开的窗口
			 */
			closeAll() {
				windowsRegistry.forEach((vm, id) => {
					this.close(id);
				});
				state.focusedWindowId = "";
			},

			/**
			 * 最小化窗口
			 * @param {string} id 窗口 ID
			 */
			minimize(id) {
				const vm = windowsRegistry.get(id);
				if (vm && _.isFunction(vm.minimize)) {
					vm.minimize();
					if (state.focusedWindowId === id) {
						state.focusedWindowId = "";
					}
				}
			},

			/**
			 * 还原窗口
			 * @param {string} id 窗口 ID
			 */
			restore(id) {
				const vm = windowsRegistry.get(id);
				if (vm && _.isFunction(vm.restore)) {
					vm.restore();
					this.toTop(id);
				}
			},

			/**
			 * 最大化窗口
			 * @param {string} id 窗口 ID
			 */
			maximize(id) {
				const vm = windowsRegistry.get(id);
				if (vm && _.isFunction(vm.maximize)) {
					vm.maximize();
					this.toTop(id);
				}
			},

			/**
			 * 将窗口置顶
			 * @param {string} id 窗口 ID
			 */
			async toTop(id) {
				const vm = windowsRegistry.get(id);
				if (vm) {
					state.focusedWindowId = id;
					// 如果 PopupManager 还没加载完，等待加载（通常 open 时已经加载好了）
					if (!PopupManager) {
						PopupManager = await _.$importVue(
							"/common/libs/VuePopper/popupManager.vue"
						);
					}
					if (PopupManager && _.isFunction(PopupManager.nextZIndex)) {
						const zIndex = PopupManager.nextZIndex();
						// 优先更新 Vue 实例上的属性以触发响应式更新
						if ("viewerZIndex" in vm) {
							vm.viewerZIndex = zIndex;
						} else {
							$(vm.$el).css("z-index", zIndex);
						}
					}
				}
			},

			/**
			 * 获取所有窗口实例
			 * @returns {any[]}
			 */
			getAllInstances() {
				return Array.from(windowsRegistry.values());
			},

			/**
			 * 获取指定 ID 的窗口实例
			 * @param {string} id 窗口 ID
			 * @returns {any|undefined}
			 */
			getInstance(id) {
				return windowsRegistry.get(id);
			}
		};

		// 全局键盘监听
		window.addEventListener("keydown", function (event) {
			const isCtrl = event.ctrlKey || event.metaKey;
			if (isCtrl) {
				const instances = _.$ModalManager.getAllInstances();
				if (instances.length === 0) return;

				// 按 zIndex 排序，获取最顶层的可见窗口，且开启了键盘快捷键
				const topInstance = _.chain(instances)
					.filter(
						vm =>
							vm.dialog_class &&
							!vm.dialog_class.minimized &&
							vm.isShowKeyboard === true
					)
					.sortBy(vm => {
						const zIndex = parseInt($(vm.$el).css("z-index")) || 0;
						return zIndex;
					})
					.last()
					.value();

				if (!topInstance) return;

				if (event.key.toLowerCase() === "w") {
					event.preventDefault();
					if (_.isFunction(topInstance.closeModal)) {
						topInstance.closeModal();
					}
				} else if (event.key.toLowerCase() === "m") {
					event.preventDefault();
					if (_.isFunction(topInstance.minimize)) {
						topInstance.minimize();
					}
				}
			}
		});
	})();

	(function () /* 弹窗 */ {
		_.$openModal = async function (options, modalConfigs) {
			modalConfigs = _.merge(
				{
					resize: false,
					keyboard: false,
					center: true,
					responsiveMaximize: false
				},
				modalConfigs
			);
			// 统一使用 mask 术语，默认开启遮罩
			if (options.mask === undefined) {
				options.mask = true;
			}
			const xModal = await _.$importVue("/common/ui-x/directives/xModal/xModal.vue", {
				options,
				modalConfigs
			});
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");
			xModal.parent = options.parent || Vue.forceUpdate.getVM();
			let instance = new Vue(xModal);
			if (options.windowId) {
				instance.windowId = options.windowId;
			}
			instance.$mount();
			document.body.appendChild(instance.$el);
			if (options.windowId) {
				instance.$el.setAttribute("data-window-id", options.windowId);
			}
			instance.viewerZIndex = PopupManager.nextZIndex();
			/*TODO:*/
			if (_.isFunction(PRIVATE_GLOBAL.x_open_modal_do_some_thing_before_open)) {
				PRIVATE_GLOBAL.x_open_modal_do_some_thing_before_open({ instance });
			}
			return instance;
		};
	})();
	(function () /* xDrawer */ {
		_.$openDrawer = async function (options) {
			const [xDrawer, PopupManager] = await _.$importVue([
				"/common/ui-x/directives/xDrawer/xDrawer.vue",
				"/common/libs/VuePopper/popupManager.vue"
			]);
			xDrawer.parent = options.parent || Vue.forceUpdate.getVM();
			const xDrawerComponent = Vue.extend(xDrawer);
			let instance = new xDrawerComponent({
				_parentListeners: {
					"update:visible"(val) {
						if (!val) {
							instance.closeModal();
						}
					}
				},
				propsData: _.merge(
					{
						destroyOnClose: true
					},
					options
				)
			});
			instance.ALLOW_MUTATING_A_PROP_DIRECTLY = true;
			instance.closeModal = () => {
				instance.$props.visible = false;
				instance.$nextTick(() => {
					setTimeout(() => {
						instance.$destroy();
					}, 600);
				});
			};
			const contentComponent = await _.$importVue(options.url, {
				OPTIONS: options,
				xDrawerVm: instance
			});
			instance.currentContentComponent = contentComponent;
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.viewerZIndex = PopupManager.nextZIndex();
			instance.$nextTick(() => {
				instance.$props.visible = true;
			});
			return instance;
		};
	})();

	(function () /* notification */ {
		let instances = [];
		let seed = 1;

		const getCurrentNotifyComponent = componentName => {
			if (!componentName) {
				return _.$importVue("/common/ui-x/directives/xNotification/xNotification.vue");
			}
			/* TODO:可以作为prop传递 在 xNotification 内部用vIf添加新的样式*/
		};

		_.$notify = async function (options) {
			const xNotification = await getCurrentNotifyComponent(
				_.$val(_xUtils, "globalConfigs.xNotification.componentName")
			);
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			const NotificationConstructor = Vue.extend(xNotification);
			options = _.merge({}, options);
			const userOnClose = options.onClose;
			const id = "notification_" + seed++;
			const position = options.position || "top-right";

			options.onClose = function () {
				_.$notify.close(id, userOnClose);
			};

			let instance = new NotificationConstructor({
				data: options
			});

			instance.id = id;
			instance.$mount();
			document.body.appendChild(instance.$el);
			instance.visible = true;
			instance.dom = instance.$el;
			instance.dom.style.zIndex = PopupManager.nextZIndex();

			let verticalOffset = options.offset || 0;
			instances
				.filter(item => item.position === position)
				.forEach(item => {
					verticalOffset += item.$el.offsetHeight + 16;
				});
			verticalOffset += 16;
			instance.verticalOffset = verticalOffset;
			instances.push(instance);
			return instance;
		};

		["success", "warning", "info", "error"].forEach(type => {
			_.$notify[type] = options => {
				if (typeof options === "string" || _.isFunction(options)) {
					options = {
						message: options
					};
				}
				options.type = type;
				return _.$notify(options);
			};
		});

		_.$notify.close = function (id, userOnClose) {
			let index = -1;
			const len = instances.length;
			const instance = instances.filter((instance, i) => {
				if (instance.id === id) {
					index = i;
					return true;
				}
				return false;
			})[0];
			if (!instance) return;

			if (typeof userOnClose === "function") {
				userOnClose(instance);
			}
			instances.splice(index, 1);
			instance.close();

			if (len > 1) {
				/* 调整其他Notify的位置 */
				const position = instance.position;
				const removedHeight = instance.dom.offsetHeight;
				for (let i = index; i < len - 1; i++) {
					if (instances[i].position === position) {
						instances[i].dom.style[instance.verticalProperty] =
							parseInt(instances[i].dom.style[instance.verticalProperty], 10) -
							removedHeight -
							16 +
							"px";
					}
				}
			}
		};

		_.$notify.closeAll = function () {
			for (let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		};
	})();

	(function () /* message */ {
		let instances = [];
		let seed = 1;

		const getCurrentMessageComponent = componentName => {
			if (!componentName) {
				return _.$importVue("/common/ui-x/directives/xMessage/xMessage.vue");
			}
		};

		_.$msg = async function (options) {
			const xMsg = await getCurrentMessageComponent(
				_.$val(_xUtils, "globalConfigs.xNotification.componentName")
			);
			const PopupManager = await _.$importVue("/common/libs/VuePopper/popupManager.vue");

			const MsgConstructor = Vue.extend(xMsg);

			if (_.isString(options) || _.isNumber(options)) {
				options = {
					message: options
				};
			}
			options = _.merge({}, options);

			const { message } = options;

			/* 如果页面当中有完全一样的提示信息，则不显示重复信息 */
			const isDuplicateMessage = _.some(
				instances,
				instance => message === $(instance.$el).find(".el-message__content").text()
			);

			if (isDuplicateMessage) {
				return;
			}

			const userOnClose = options.onClose;
			const id = "message_" + seed++;

			options.onClose = function () {
				_.$msg.close(id, userOnClose);
			};
			let instance = new MsgConstructor({
				data: options
			});

			instance.id = id;
			instance.$mount();
			document.body.appendChild(instance.$el);
			let verticalOffset = options.offset || 20;
			instances.forEach(item => {
				verticalOffset += item.$el.offsetHeight + 16;
			});
			instance.verticalOffset = verticalOffset;
			instance.visible = true;
			instance.$el.style.zIndex = PopupManager.nextZIndex();
			instances.push(instance);
			instance.$on("hook:beforeDestroy", () => {});

			return instance;
		};
		["success", "warning", "info", "error"].forEach(type => {
			_.$msg[type] = options => {
				if (isObject(options) && !isVNode(options)) {
					return _.$msg({
						...options,
						type
					});
				}
				return _.$msg({
					type,
					message: options
				});
			};
		});

		_.$msg.close = function (id, userOnClose) {
			let len = instances.length;
			let index = -1;
			let removedHeight;
			for (let i = 0; i < len; i++) {
				if (id === instances[i].id) {
					removedHeight = instances[i].$el.offsetHeight;
					index = i;
					if (typeof userOnClose === "function") {
						userOnClose(instances[i]);
					}
					instances.splice(i, 1);
					break;
				}
			}
			if (len <= 1 || index === -1 || index > instances.length - 1) return;
			for (let i = index; i < len - 1; i++) {
				let dom = instances[i].$el;
				dom.style["top"] = parseInt(dom.style["top"], 10) - removedHeight - 16 + "px";
			}
		};

		_.$msg.closeAll = function () {
			for (let i = instances.length - 1; i >= 0; i--) {
				instances[i].close();
			}
		};
	})();
}
</script>
