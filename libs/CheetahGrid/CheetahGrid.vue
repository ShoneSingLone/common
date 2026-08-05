<style lang="less">
/* ms */
.cheetah-grid__inline-input::-ms-clear {
	visibility: hidden;
}
.cheetah-grid__inline-input {
	position: absolute;
	box-sizing: border-box;
}

.cheetah-grid__inline-menu {
	position: fixed;
	color: rgba(0, 0, 0, 0.87);
	box-sizing: border-box;
	margin: -1px 0 0 -1px;
	padding: 8px 0;
	background-color: #fafafa;
	list-style-type: none;
	border-radius: 2px;
	border-width: 0;
	max-height: calc(100vh - 40px);
	overflow-y: auto;

	--cheetah-grid-inline-menu-cell-width: calc(
		var(--cheetah-grid-inline-menu-cell-right) - var(--cheetah-grid-inline-menu-cell-left)
	);
	--cheetah-grid-inline-menu-cell-height: calc(
		var(--cheetah-grid-inline-menu-cell-bottom) - var(--cheetah-grid-inline-menu-cell-top)
	);

	top: clamp(
		20px,
		calc(
			var(--cheetah-grid-inline-menu-cell-top) -
				var(--cheetah-grid-inline-menu-target-item-offset-top) - 8px
		),
		calc(100vh - 20px - var(--cheetah-grid-inline-menu-height))
	);
	left: var(--cheetah-grid-inline-menu-cell-left);
	width: calc(var(--cheetah-grid-inline-menu-cell-width) + 1px);
	transform-origin: center
		calc(
			var(--cheetah-grid-inline-menu-target-item-offset-top) +
				var(--cheetah-grid-inline-menu-target-item-height) / 2
		)
		0;
}
.cheetah-grid__inline-menu--hidden {
	box-shadow: none;
	opacity: 0;
	pointer-events: none;
}
.cheetah-grid__inline-menu--hidden * {
	pointer-events: none;
}
.cheetah-grid__inline-menu--shown {
	box-shadow:
		0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
	opacity: 1;
	animation: cheetah-grid__inline-menu--shown-animation 150ms ease-out;
}

@keyframes cheetah-grid__inline-menu--shown-animation {
	0% {
		opacity: 0;
		transform: scale(0.9);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
.cheetah-grid__inline-menu__menu-item {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	outline: none;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	padding: 0 16px;
	min-height: calc(var(--cheetah-grid-inline-menu-cell-height) + 1px);
}
.cheetah-grid__inline-menu__menu-item--empty {
	color: rgba(0, 0, 0, 0.38);
}
.cheetah-grid__inline-menu__menu-item::before {
	content: "";
	position: absolute;
	top: -50%;
	left: -50%;
	width: 200%;
	height: 200%;
	background-color: #000;
	opacity: 0;
	pointer-events: none;
	transition: opacity 15ms linear;
}
.cheetah-grid__inline-menu__menu-item:hover::before {
	opacity: 0.04;
}
.cheetah-grid__inline-menu__menu-item[data-select]::before {
	opacity: 0.04;
}
.cheetah-grid__inline-menu__menu-item:focus::before {
	opacity: 0.12;
}

/* ms */
.cheetah-grid__small-dialog-input__input::-ms-clear {
	visibility: hidden;
}

@keyframes cheetah-grid__small-dialog-input--hidden-animation {
	0% {
		opacity: 1;
	}
	99% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
.cheetah-grid__small-dialog-input {
	position: absolute;
	box-sizing: content-box;
	margin: -1px auto auto -1px;
	border-radius: 3px;
	background-color: #fafafa;
	transition:
		padding 150ms ease-out,
		box-shadow 150ms ease-out;
}
.cheetah-grid__small-dialog-input--hidden {
	box-shadow: none;
	padding: 0;
	pointer-events: none;
	animation: cheetah-grid__small-dialog-input--hidden-animation 150ms ease-out;
	opacity: 0;
}
.cheetah-grid__small-dialog-input--shown {
	box-shadow:
		0 3px 1px -2px rgba(0, 0, 0, 0.2),
		0 2px 2px 0 rgba(0, 0, 0, 0.14),
		0 1px 5px 0 rgba(0, 0, 0, 0.12);
	padding: 8px 24px;
}
.cheetah-grid__small-dialog-input__input {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 3px 2px 0 4px;
	border: none;
	border-bottom: solid 1px rgba(0, 0, 0, 0.87);
	outline: none;
	background-color: transparent;
	transition: all 300ms ease-out;
}
.cheetah-grid__small-dialog-input__input:focus {
	border-bottom: solid 1px #2196f3;
	box-shadow: 0 1px 0 0 #2196f3;
}
.cheetah-grid__small-dialog-input::after {
	content: "";
	font-family: Roboto;
	font-size: 12px;
	font-size: 0.75rem;
	min-height: 1em;
	line-height: 1;
	display: block;
	width: 100%;
	padding-top: 8px;
}
.cheetah-grid__small-dialog-input.helper-text--right-justified::after {
	text-align: right;
}
.cheetah-grid__small-dialog-input[data-helper-text]::after {
	content: attr(data-helper-text);
	color: rgba(0, 0, 0, 0.87);
}
.cheetah-grid__small-dialog-input[data-error-message] input {
	border-bottom: solid 1px #ff1744;
	box-shadow: 0 1px 0 0 #ff1744;
}
.cheetah-grid__small-dialog-input[data-error-message]::after {
	content: attr(data-error-message);
	color: #ff1744;
	text-align: left;
}

/**
 * core styles
 */
:root {
	--cheetah-grid-css-enable: 1;
}
.cheetah-grid .grid-scrollable {
	height: 100%;
	width: 100%;
	position: absolute;
	overflow: scroll;
}
.cheetah-grid .grid-scroll-end-point {
	opacity: 0;
	position: relative;
}
.cheetah-grid {
	position: relative;
	width: 100%;
	height: 100%;
}
.cheetah-grid > canvas {
	position: absolute;
	width: 0;
	height: 0;
}
.cheetah-grid .grid-focus-control {
	position: relative !important;
	width: 1px;
	height: 1px;
	opacity: 0;
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	pointer-events: none;
	max-width: 0;
	max-height: 0;
	float: none !important;
}
.cheetah-grid input.grid-focus-control::-ms-clear {
	visibility: hidden;
}
.cheetah-grid input.grid-focus-control.composition {
	opacity: 1;
	max-width: none;
	max-height: none;
}

.cheetah-grid__message-element {
	position: fixed;
	margin: -1px 0 0 0;
	box-sizing: border-box;
	border-radius: 0 0 3px 3px;
	border-width: 0;
	background-color: rgba(250, 250, 250, 0.85);
	padding: 8px 2px;
	pointer-events: none;
	user-select: none;
	border-top: solid 1px rgba(0, 0, 0, 0.87);
	color: rgba(0, 0, 0, 0.87);

	--cheetah-grid-message-element-cell-width: calc(
		var(--cheetah-grid-message-element-cell-right) -
			var(--cheetah-grid-message-element-cell-left)
	);

	top: var(--cheetah-grid-message-element-cell-bottom);
	left: var(--cheetah-grid-message-element-cell-left);
	width: var(--cheetah-grid-message-element-cell-width);
}
.cheetah-grid__message-element--hidden {
	display: none;
}
.cheetah-grid__message-element--shown {
	display: block;
}
.cheetah-grid__message-element__message {
	font-family: Roboto;
	font-size: 12px;
	font-size: 0.75rem;
	min-height: 1em;
	line-height: 1;
	display: block;
	width: 100%;
}

.cheetah-grid__error-message-element {
	border-top: solid 1px #ff1744;
	color: #ff1744;
}

.cheetah-grid__warning-message-element {
	border-top: solid 1px #dd2c00;
	color: #dd2c00;
}

@keyframes cheetah-grid__tooltip-element--shown-animation {
	0% {
		opacity: 0;
		transform: scale(0.8);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
.cheetah-grid__tooltip-element {
	position: fixed;
	box-sizing: border-box;
	border-radius: 3px;
	border-width: 0;
	background-color: #232f34;
	padding: 8px;
	pointer-events: none;
	user-select: none;
	color: #fff;
	margin: 0;

	--cheetah-grid-tooltip-element-cell-width: calc(
		var(--cheetah-grid-tooltip-element-cell-right) -
			var(--cheetah-grid-tooltip-element-cell-left)
	);

	top: var(--cheetah-grid-tooltip-element-cell-bottom);
	left: clamp(
		1px,
		calc(
			var(--cheetah-grid-tooltip-element-cell-left) +
				(var(--cheetah-grid-tooltip-element-cell-width) / 2) -
				var(--cheetah-grid-tooltip-element-width) / 2
		),
		calc(100vw - var(--cheetah-grid-tooltip-element-width) - 1px)
	);
	min-width: var(--cheetah-grid-tooltip-element-cell-width);
	max-width: calc(100vw - 16px);
}
.cheetah-grid__tooltip-element--hidden {
	opacity: 0;
	transition: opacity 75ms linear;
	transform-origin: center;
}
.cheetah-grid__tooltip-element--shown {
	opacity: 1;
	animation: cheetah-grid__tooltip-element--shown-animation 150ms ease-out;
}
.cheetah-grid__tooltip-element__content {
	font-family: Roboto;
	font-size: 12px;
	font-size: 0.75rem;
	min-height: 1em;
	line-height: 1;
	width: 100%;
	display: block;
	white-space: pre-wrap;
	margin: 0;
	box-sizing: border-box;
}
</style>
<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	/*! Cheetah Grid v2.1.1 | license MIT */
	PRIVATE_GLOBAL.cheetahGrid = {};
	(function (exports) {
		Object.defineProperty(exports, "__esModule", { value: true });
		//#region rolldown:runtime
		var __create = Object.create;
		var __defProp = Object.defineProperty;
		var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
		var __getOwnPropNames = Object.getOwnPropertyNames;
		var __getProtoOf = Object.getPrototypeOf;
		var __hasOwnProp = Object.prototype.hasOwnProperty;
		var __commonJS = (cb, mod) =>
			function () {
				return (
					mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
					mod.exports
				);
			};
		var __export = (target, all) => {
			for (var name in all)
				__defProp(target, name, {
					get: all[name],
					enumerable: true
				});
		};
		var __copyProps = (to, from, except, desc) => {
			if ((from && typeof from === "object") || typeof from === "function")
				for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
					key = keys[i];
					if (!__hasOwnProp.call(to, key) && key !== except)
						__defProp(to, key, {
							get: (k => from[k]).bind(null, key),
							enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
						});
				}
			return to;
		};
		var __toESM = (mod, isNodeMode, target) => (
			(target = mod != null ? __create(__getProtoOf(mod)) : {}),
			__copyProps(
				isNodeMode || !mod || !mod.__esModule
					? __defProp(target, "default", {
							value: mod,
							enumerable: true
						})
					: target,
				mod
			)
		);

		//#endregion

		//#region src/js/internal/utils.ts
		const isNode = typeof window === "undefined" || typeof window.window === "undefined";
		function analyzeUserAgent() {
			if (isNode)
				return {
					Edge: false,
					Chrome: false,
					Firefox: false,
					Safari: false
				};
			else {
				const ua = window.navigator.userAgent.toLowerCase();
				return {
					Edge: ua.indexOf("edge") > -1,
					Chrome: ua.indexOf("chrome") > -1 && ua.indexOf("edge") === -1,
					Firefox: ua.indexOf("firefox") > -1,
					Safari: ua.indexOf("safari") > -1 && ua.indexOf("edge") === -1
				};
			}
		}
		const { Chrome, Firefox, Edge, Safari } = analyzeUserAgent();
		function setReadonly$1(obj$1, name, value) {
			Object.defineProperty(obj$1, name, {
				enumerable: false,
				configurable: true,
				value
			});
		}
		function each(obj$1, fn) {
			for (const key in obj$1) fn(obj$1[key], key, obj$1);
		}
		function isObject(obj$1) {
			return obj$1 === Object(obj$1);
		}
		function omit(source, omits) {
			const result = {};
			for (const key in source) {
				if (omits.indexOf(key) >= 0) continue;
				Object.defineProperty(result, key, {
					get() {
						return source[key];
					},
					set(val) {
						source[key] = val;
					},
					configurable: true,
					enumerable: true
				});
			}
			return result;
		}
		function defaults(source, defs) {
			const keys = [];
			const result = {};
			for (const key in source) {
				keys.push(key);
				Object.defineProperty(result, key, {
					get() {
						const val = source[key];
						return val === void 0 ? defs[key] : val;
					},
					set(val) {
						source[key] = val;
					},
					configurable: true,
					enumerable: true
				});
			}
			for (const key in defs) {
				if (keys.indexOf(key) >= 0) continue;
				Object.defineProperty(result, key, {
					get() {
						const val = source[key];
						return val === void 0 ? defs[key] : val;
					},
					set(val) {
						source[key] = val;
					},
					configurable: true,
					enumerable: true
				});
			}
			return result;
		}
		function extend(...args) {
			const result = {};
			args.forEach(source => {
				for (const key in source)
					Object.defineProperty(result, key, {
						get() {
							return source[key];
						},
						set(val) {
							source[key] = val;
						},
						configurable: true,
						enumerable: true
					});
			});
			return result;
		}
		function isDescendantElement(root, target) {
			while (target.parentElement) {
				const p = target.parentElement;
				if (root === p) return true;
				target = p;
			}
			return false;
		}
		function applyChainSafe(obj$1, fn, ...names) {
			let value = obj$1;
			for (let i = 0; i < names.length && value != null; i++) value = fn(value, names[i]);
			return value;
		}
		function getChainSafe(obj$1, ...names) {
			return applyChainSafe(obj$1, (val, name) => val[name], ...names);
		}
		function getOrApply(value, ...args) {
			if (typeof value === "function") return value(...args);
			else return value;
		}
		function endsWith(str$1, searchString, position) {
			const subjectString = str$1.toString();
			if (
				typeof position !== "number" ||
				!isFinite(position) ||
				Math.floor(position) !== position ||
				position > subjectString.length
			)
				position = subjectString.length;
			position -= searchString.length;
			const lastIndex = subjectString.lastIndexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		}
		function genChars(s) {
			const re =
				/([\uD800-\uDBFF][\uDC00-\uDFFF]|\r\n|[^\uD800-\uDFFF])([\u180B-\u180D]|[\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])?/g;
			return {
				next() {
					const res = re.exec(s);
					return res !== null ? res[0] : null;
				}
			};
		}
		function genWords(s) {
			const re = /[!-~]+|[^!-~\s]+|\s+/g;
			return {
				next() {
					const res = re.exec(s);
					return res !== null ? res[0] : null;
				}
			};
		}
		function isPromise(data) {
			return Boolean(data && typeof data.then === "function");
		}
		function then(result, callback) {
			return isPromise(result) ? result.then(r => callback(r)) : callback(result);
		}
		function getKeyCode$1(e) {
			return e.keyCode || e.which;
		}
		function isTouchEvent$1(e) {
			return !!e.changedTouches;
		}
		function getIgnoreCase(obj$1, name) {
			if (obj$1[name]) return obj$1[name];
			const l = name.toLowerCase();
			if (obj$1[l]) return obj$1[l];
			const u = name.toLowerCase();
			if (obj$1[u]) return obj$1[u];
			for (const k in obj$1) if (k.toLowerCase() === l) return obj$1[k];
			return void 0;
		}
		function cancel(e) {
			e.preventDefault();
			e.stopPropagation();
		}
		function toBoxArray$1(obj$1) {
			if (!Array.isArray(obj$1)) return [obj$1, obj$1, obj$1, obj$1];
			if (obj$1.length === 3) return [obj$1[0], obj$1[1], obj$1[2], obj$1[1]];
			if (obj$1.length === 2) return [obj$1[0], obj$1[1], obj$1[0], obj$1[1]];
			if (obj$1.length === 1) return [obj$1[0], obj$1[0], obj$1[0], obj$1[0]];
			return obj$1;
		}
		function cellEquals(a, b) {
			return a.col === b.col && a.row === b.row;
		}
		function cellInRange(range, col, row) {
			return (
				range.start.col <= col &&
				col <= range.end.col &&
				range.start.row <= row &&
				row <= range.end.row
			);
		}
		const browser = {
			Edge,
			Chrome,
			Firefox,
			Safari,
			heightLimit: Chrome ? 16777216 : Firefox ? 17895588 : 10737433
		};
		const obj = {
			setReadonly: setReadonly$1,
			isObject
		};
		const str = {
			endsWith,
			genChars,
			genWords
		};
		const event = {
			getKeyCode: getKeyCode$1,
			isTouchEvent: isTouchEvent$1,
			cancel
		};
		const style = { toBoxArray: toBoxArray$1 };
		const emptyFn = Function.prototype;

		//#endregion
		//#region src/js/core/DG_EVENT_TYPE.ts
		/**
		 * DrawGrid event types
		 * @classdesc cheetahGrid.core.EVENT_TYPE
		 * @memberof cheetahGrid.core
		 */
		const DG_EVENT_TYPE = {
			CLICK_CELL: "click_cell",
			DBLCLICK_CELL: "dblclick_cell",
			DBLTAP_CELL: "dbltap_cell",
			MOUSEDOWN_CELL: "mousedown_cell",
			MOUSEUP_CELL: "mouseup_cell",
			SELECTED_CELL: "selected_cell",
			KEYDOWN: "keydown",
			MOUSEMOVE_CELL: "mousemove_cell",
			MOUSEENTER_CELL: "mouseenter_cell",
			MOUSELEAVE_CELL: "mouseleave_cell",
			MOUSEOVER_CELL: "mouseover_cell",
			MOUSEOUT_CELL: "mouseout_cell",
			TOUCHSTART_CELL: "touchstart_cell",
			CONTEXTMENU_CELL: "contextmenu_cell",
			INPUT_CELL: "input_cell",
			PASTE_CELL: "paste_cell",
			DELETE_CELL: "delete_cell",
			EDITABLEINPUT_CELL: "editableinput_cell",
			MODIFY_STATUS_EDITABLEINPUT_CELL: "modify_status_editableinput_cell",
			RESIZE_COLUMN: "resize_column",
			SCROLL: "scroll",
			FOCUS_GRID: "focus_grid",
			BLUR_GRID: "blur_grid"
		};

		//#endregion
		//#region src/js/columns/action/actionBind.ts
		const KEY_ENTER$7 = 13;
		const KEY_SPACE$1 = 32;
		function bindCellClickAction$1(grid, cellId, { action, mouseOver, mouseOut, area }) {
			function isTarget(col, row) {
				return grid.getLayoutCellId(col, row) === cellId;
			}
			let mouseIsInCell = null;
			let mouseOvered = null;
			function processMouseOver(e) {
				mouseOvered = e;
				if (mouseOver) {
					if (
						!mouseOver({
							col: e.col,
							row: e.row
						})
					)
						return;
				}
				grid.getElement().style.cursor = "pointer";
			}
			function processMouseOut(e) {
				if (mouseOut)
					mouseOut({
						col: e.col,
						row: e.row
					});
				mouseOvered = null;
				grid.getElement().style.cursor = "";
			}
			const disposables = [
				grid.listen(DG_EVENT_TYPE.CLICK_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					const sel = grid.selection.select;
					if (sel.col !== e.col || sel.row !== e.row) return;
					if (isPromise(grid.getRowRecord(e.row))) return;
					if (area) {
						if (!area(e)) return;
					}
					action({
						col: e.col,
						row: e.row
					});
				}),
				grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					if (isPromise(grid.getRowRecord(e.row))) return;
					mouseIsInCell = e;
					if (area) {
						if (!area(e)) return;
					}
					processMouseOver(e);
				}),
				grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, e => {
					if (
						!mouseIsInCell ||
						mouseIsInCell.col !== e.col ||
						mouseIsInCell.row !== e.row
					)
						return;
					if (!mouseOvered) processMouseOut(e);
				})
			];
			if (area)
				disposables.push(
					grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, e => {
						if (
							!mouseIsInCell ||
							mouseIsInCell.col !== e.col ||
							mouseIsInCell.row !== e.row
						)
							return;
						const isInArea = area(e);
						if (!mouseOvered) {
							if (!isInArea) return;
							processMouseOver(e);
						} else {
							if (isInArea) return;
							processMouseOut(e);
						}
					})
				);
			return disposables;
		}
		function bindCellKeyAction$1(grid, cellId, { action, acceptKeys = [] }) {
			function isTarget(col, row) {
				return grid.getLayoutCellId(col, row) === cellId;
			}
			acceptKeys = [...acceptKeys, KEY_ENTER$7, KEY_SPACE$1];
			return [
				grid.listen(DG_EVENT_TYPE.KEYDOWN, e => {
					var _grid$keyboardOptions;
					if (acceptKeys.indexOf(e.keyCode) === -1) return;
					if (
						((_grid$keyboardOptions = grid.keyboardOptions) === null ||
						_grid$keyboardOptions === void 0
							? void 0
							: _grid$keyboardOptions.moveCellOnEnter) &&
						e.keyCode === KEY_ENTER$7
					)
						return;
					const sel = grid.selection.select;
					if (!isTarget(sel.col, sel.row)) return;
					if (isPromise(grid.getRowRecord(sel.row))) return;
					action({
						col: sel.col,
						row: sel.row
					});
					event.cancel(e.event);
				})
			];
		}

		//#endregion
		//#region node_modules/@oxc-project/runtime/src/helpers/typeof.js
		var require_typeof = /* @__PURE__ */ __commonJS({
			"node_modules/@oxc-project/runtime/src/helpers/typeof.js": (exports, module) => {
				function _typeof$2(o) {
					"@babel/helpers - typeof";
					return (
						(module.exports = _typeof$2 =
							"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
								? function (o$1) {
										return typeof o$1;
									}
								: function (o$1) {
										return o$1 &&
											"function" == typeof Symbol &&
											o$1.constructor === Symbol &&
											o$1 !== Symbol.prototype
											? "symbol"
											: typeof o$1;
									}),
						(module.exports.__esModule = true),
						(module.exports["default"] = module.exports),
						_typeof$2(o)
					);
				}
				((module.exports = _typeof$2),
					(module.exports.__esModule = true),
					(module.exports["default"] = module.exports));
			}
		});

		//#endregion
		//#region node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js
		var require_toPrimitive = /* @__PURE__ */ __commonJS({
			"node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js": (exports, module) => {
				var _typeof$1 = require_typeof()["default"];
				function toPrimitive$1(t, r) {
					if ("object" != _typeof$1(t) || !t) return t;
					var e = t[Symbol.toPrimitive];
					if (void 0 !== e) {
						var i = e.call(t, r || "default");
						if ("object" != _typeof$1(i)) return i;
						throw new TypeError("@@toPrimitive must return a primitive value.");
					}
					return ("string" === r ? String : Number)(t);
				}
				((module.exports = toPrimitive$1),
					(module.exports.__esModule = true),
					(module.exports["default"] = module.exports));
			}
		});

		//#endregion
		//#region node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js
		var require_toPropertyKey = /* @__PURE__ */ __commonJS({
			"node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js": (exports, module) => {
				var _typeof = require_typeof()["default"];
				var toPrimitive = require_toPrimitive();
				function toPropertyKey$1(t) {
					var i = toPrimitive(t, "string");
					return "symbol" == _typeof(i) ? i : i + "";
				}
				((module.exports = toPropertyKey$1),
					(module.exports.__esModule = true),
					(module.exports["default"] = module.exports));
			}
		});

		//#endregion
		//#region node_modules/@oxc-project/runtime/src/helpers/defineProperty.js
		var require_defineProperty = /* @__PURE__ */ __commonJS({
			"node_modules/@oxc-project/runtime/src/helpers/defineProperty.js": (
				exports,
				module
			) => {
				var toPropertyKey = require_toPropertyKey();
				function _defineProperty$66(e, r, t) {
					return (
						(r = toPropertyKey(r)) in e
							? Object.defineProperty(e, r, {
									value: t,
									enumerable: !0,
									configurable: !0,
									writable: !0
								})
							: (e[r] = t),
						e
					);
				}
				((module.exports = _defineProperty$66),
					(module.exports.__esModule = true),
					(module.exports["default"] = module.exports));
			}
		});

		//#endregion
		//#region src/js/columns/action/BaseAction.ts
		var import_defineProperty$65 = /* @__PURE__ */ __toESM(require_defineProperty());
		var BaseAction$1 = class {
			constructor(option = {}) {
				(0, import_defineProperty$65.default)(this, "_disabled", void 0);
				this._disabled = option.disabled || false;
			}
			get disabled() {
				return this._disabled;
			}
			set disabled(disabled) {
				this._disabled = disabled;
				this.onChangeDisabledInternal();
			}
			onChangeDisabledInternal() {}
		};

		//#endregion
		//#region src/js/columns/action/action-utils.ts
		function isDisabledRecord(option, grid, row) {
			if (grid.disabled) return true;
			return getBooleanOptionOfRecord(option, grid, row);
		}
		function isReadOnlyRecord(option, grid, row) {
			if (grid.readOnly) return true;
			return getBooleanOptionOfRecord(option, grid, row);
		}
		function toggleValue(val) {
			if (typeof val === "number")
				if (val === 0) return 1;
				else return 0;
			else if (typeof val === "string") {
				if (val === "false") return "true";
				else if (val === "off") return "on";
				else if (/^0+$/.exec(val)) return val.replace(/^(0*)0$/, "$11");
				else if (val === "true") return "false";
				else if (val === "on") return "off";
				else if (/^0*1$/.exec(val)) return val.replace(/^(0*)1$/, "$10");
			}
			return !val;
		}
		function getBooleanOptionOfRecord(option, grid, row) {
			if (typeof option === "function") {
				const record = grid.getRowRecord(row);
				if (isPromise(record)) return true;
				return !!option(record);
			}
			return !!option;
		}

		//#endregion
		//#region src/js/columns/action/Action.ts
		var import_defineProperty$64 = /* @__PURE__ */ __toESM(require_defineProperty());
		var AbstractAction = class extends BaseAction$1 {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$64.default)(this, "_action", void 0);
				this._action = option.action || (() => {});
			}
			get editable() {
				return false;
			}
			get action() {
				return this._action;
			}
			set action(action) {
				this._action = action;
			}
			bindGridEvent(grid, cellId) {
				const state = this.getState(grid);
				const action = cell => {
					if (isDisabledRecord(this.disabled, grid, cell.row)) return;
					const record = grid.getRowRecord(cell.row);
					this._action(record, extend(cell, { grid }));
				};
				return [
					...bindCellClickAction$1(grid, cellId, {
						action,
						mouseOver: e => {
							if (isDisabledRecord(this.disabled, grid, e.row)) return false;
							state.mouseActiveCell = {
								col: e.col,
								row: e.row
							};
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
							return true;
						},
						mouseOut: e => {
							delete state.mouseActiveCell;
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
						},
						area: e => {
							if (!this.area) return true;
							const { event: event$1 } = e;
							const clientX = event$1.clientX || event$1.pageX + window.scrollX;
							const clientY = event$1.clientY || event$1.pageY + window.scrollY;
							const canvasRect = grid.canvas.getBoundingClientRect();
							const xInCanvas = clientX - canvasRect.left;
							const yInCanvas = clientY - canvasRect.top;
							const rect = grid.getCellRect(e.col, e.row);
							return this.area({
								col: e.col,
								row: e.row,
								grid,
								pointInCell: {
									x: xInCanvas - rect.left + grid.scrollLeft,
									y: yInCanvas - rect.top + grid.scrollTop
								},
								pointInDrawingCanvas: {
									x: xInCanvas,
									y: yInCanvas
								}
							});
						}
					}),
					...bindCellKeyAction$1(grid, cellId, { action })
				];
			}
			onPasteCellRangeBox() {}
			onDeleteCellRangeBox() {}
		};
		var Action = class Action extends AbstractAction {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$64.default)(this, "_area", void 0);
				this._area = option.area;
			}
			get area() {
				return this._area;
			}
			set area(area) {
				this._area = area;
			}
			clone() {
				return new Action(this);
			}
			getState(_grid) {
				return {};
			}
		};

		//#endregion
		//#region src/js/internal/symbolManager.ts
		var symbolManager_exports = {};
		__export(symbolManager_exports, {
			BRANCH_GRAPH_COLUMN_STATE_ID: () => BRANCH_GRAPH_COLUMN_STATE_ID,
			BUTTON_COLUMN_STATE_ID: () => BUTTON_COLUMN_STATE_ID,
			CHECK_COLUMN_STATE_ID: () => CHECK_COLUMN_STATE_ID,
			CHECK_HEADER_STATE_ID: () => CHECK_HEADER_STATE_ID,
			COLUMN_FADEIN_STATE_ID: () => COLUMN_FADEIN_STATE_ID,
			INLINE_INPUT_EDITOR_STATE_ID: () => INLINE_INPUT_EDITOR_STATE_ID,
			INLINE_MENU_EDITOR_STATE_ID: () => INLINE_MENU_EDITOR_STATE_ID,
			PROTECTED_SYMBOL: () => PROTECTED_SYMBOL,
			RADIO_COLUMN_STATE_ID: () => RADIO_COLUMN_STATE_ID,
			SMALL_DIALOG_INPUT_EDITOR_STATE_ID: () => SMALL_DIALOG_INPUT_EDITOR_STATE_ID,
			TREE_COLUMN_STATE_ID: () => TREE_COLUMN_STATE_ID
		});
		const PROTECTED_SYMBOL = Symbol("protected");
		const CHECK_COLUMN_STATE_ID = Symbol("chkcol.stateID");
		const RADIO_COLUMN_STATE_ID = Symbol("rdcol.stateID");
		const BUTTON_COLUMN_STATE_ID = Symbol("btncol.stateID");
		const COLUMN_FADEIN_STATE_ID = Symbol("col.fadein_stateID");
		const BRANCH_GRAPH_COLUMN_STATE_ID = Symbol("branch_graph_col.stateID");
		const TREE_COLUMN_STATE_ID = Symbol("tree_col.stateID");
		const SMALL_DIALOG_INPUT_EDITOR_STATE_ID = Symbol("small_dialog_input_editor.stateID");
		const INLINE_INPUT_EDITOR_STATE_ID = Symbol("inline_input_editor.stateID");
		const INLINE_MENU_EDITOR_STATE_ID = Symbol("inline_menu_editor.stateID");
		const CHECK_HEADER_STATE_ID = Symbol("check_header.stateID");

		//#endregion
		//#region src/js/columns/action/ButtonAction.ts
		var ButtonAction = class ButtonAction extends AbstractAction {
			constructor(option = {}) {
				super(option);
			}
			get area() {
				return void 0;
			}
			set area(_area) {}
			clone() {
				return new ButtonAction(this);
			}
			getState(grid) {
				let state = grid[BUTTON_COLUMN_STATE_ID];
				if (!state) {
					state = {};
					obj.setReadonly(grid, BUTTON_COLUMN_STATE_ID, state);
				}
				return state;
			}
		};

		//#endregion
		//#region src/js/columns/action/Editor.ts
		var import_defineProperty$63 = /* @__PURE__ */ __toESM(require_defineProperty());
		var Editor = class extends BaseAction$1 {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$63.default)(this, "_readOnly", void 0);
				this._readOnly = option.readOnly || false;
			}
			get editable() {
				return true;
			}
			get readOnly() {
				return this._readOnly;
			}
			set readOnly(readOnly) {
				this._readOnly = readOnly;
				this.onChangeReadOnlyInternal();
			}
			onChangeReadOnlyInternal() {}
		};

		//#endregion
		//#region src/js/internal/animate.ts
		function cubicBezier(x2, y2, x3, y3) {
			let step;
			const err = 1e-4;
			x2 *= 3;
			y2 *= 3;
			x3 *= 3;
			y3 *= 3;
			return function (t) {
				let p, a, b, c, d, x, s;
				if (t < 0 || 1 < t) throw new Error(`${t}`);
				p = step || t;
				do {
					a = 1 - p;
					b = a * a;
					c = p * p;
					d = c * p;
					x = x2 * b * p + x3 * a * c + d;
					s = t - x;
					p += s * 0.5;
				} while (err < Math.abs(s));
				step = p;
				return y2 * b * p + y3 * a * c + d;
			};
		}
		const EASINGS = {
			linear(p) {
				return p;
			},
			easeIn: cubicBezier(0.42, 0, 1, 1),
			easeOut: cubicBezier(0, 0, 0.58, 1),
			easeInOut: cubicBezier(0.42, 0, 0.58, 1)
		};
		const raf = isNode ? () => {} : window.requestAnimationFrame || (fn => setTimeout(fn, 1));
		function now() {
			return Date.now();
		}
		/**
		 * <pre>
		 * Animates.
		 * </pre>
		 * @function
		 * @param {number} duration animation time.
		 * @param {function} step step
		 * @param {function|string} easing easing
		 * @returns {object} Deferred object.
		 */
		function animate(duration, step, easing) {
			const startedAt = now();
			const easingFn =
				easing == null
					? EASINGS.easeInOut
					: typeof easing === "string"
						? EASINGS[easing]
						: easing;
			let canceledFlg = false;
			const createAnim = (resolve, reject) => {
				const anim = () => {
					const point = now() - startedAt;
					if (canceledFlg) {
						if (reject) reject();
					} else if (point >= duration) {
						step(1);
						if (resolve) resolve();
					} else {
						step(easingFn(point / duration));
						raf(anim);
					}
				};
				return anim;
			};
			const cancel$1 = () => {
				canceledFlg = true;
			};
			if (typeof Promise !== "undefined") {
				const result = new Promise((resolve, reject) => {
					const anim = createAnim(resolve, reject);
					step(0);
					anim();
				});
				result.cancel = cancel$1;
				return result;
			} else {
				const anim = createAnim(
					() => {},
					() => {}
				);
				step(0);
				anim();
				return { cancel: cancel$1 };
			}
		}

		//#endregion
		//#region src/js/columns/action/CheckEditor.ts
		var CheckEditor = class CheckEditor extends Editor {
			clone() {
				return new CheckEditor(this);
			}
			bindGridEvent(grid, cellId) {
				let _state = grid[CHECK_COLUMN_STATE_ID];
				if (!_state) {
					_state = {
						block: {},
						elapsed: {}
					};
					obj.setReadonly(grid, CHECK_COLUMN_STATE_ID, _state);
				}
				const state = _state;
				const action = cell => {
					const range = grid.getCellRange(cell.col, cell.row);
					const cellKey = `${range.start.col}:${range.start.row}`;
					if (
						isReadOnlyRecord(this.readOnly, grid, cell.row) ||
						isDisabledRecord(this.disabled, grid, cell.row) ||
						state.block[cellKey]
					)
						return;
					const ret = grid.doChangeValue(cell.col, cell.row, toggleValue);
					if (ret) {
						const onChange = () => {
							animate(200, point => {
								if (point === 1) delete state.elapsed[cellKey];
								else state.elapsed[cellKey] = point;
								grid.invalidateCellRange(range);
							});
						};
						if (isPromise(ret)) {
							state.block[cellKey] = true;
							ret.then(() => {
								delete state.block[cellKey];
								onChange();
							});
						} else onChange();
					}
				};
				function isTarget(col, row) {
					return grid.getLayoutCellId(col, row) === cellId;
				}
				return [
					...bindCellClickAction$1(grid, cellId, {
						action,
						mouseOver: e => {
							if (isDisabledRecord(this.disabled, grid, e.row)) return false;
							state.mouseActiveCell = {
								col: e.col,
								row: e.row
							};
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
							return true;
						},
						mouseOut: e => {
							delete state.mouseActiveCell;
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
						}
					}),
					...bindCellKeyAction$1(grid, cellId, {
						action: _e => {
							const selrange = grid.selection.range;
							const { col } = grid.selection.select;
							for (let { row } = selrange.start; row <= selrange.end.row; row++) {
								if (!isTarget(col, row)) continue;
								action({
									col,
									row
								});
							}
						}
					}),
					grid.listen(DG_EVENT_TYPE.PASTE_CELL, e => {
						if (e.multi) return;
						const selectionRange = grid.selection.range;
						if (!cellEquals(selectionRange.start, selectionRange.end)) return;
						if (!isTarget(e.col, e.row)) return;
						event.cancel(e.event);
						const pasteValue = e.normalizeValue.trim();
						grid.doGetCellValue(e.col, e.row, value => {
							const newValue = toggleValue(value);
							if (`${newValue}`.trim() === pasteValue)
								action({
									col: e.col,
									row: e.row
								});
							else if (isRejectValue$1(value, pasteValue)) {
								const record = grid.getRowRecord(e.row);
								if (!isPromise(record))
									grid.fireListeners("rejected_paste_values", {
										detail: [
											{
												col: e.col,
												row: e.row,
												record,
												define: grid.getColumnDefine(e.col, e.row),
												pasteValue
											}
										]
									});
							}
						});
					})
				];
			}
			onPasteCellRangeBox(grid, cell, value, context) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				const pasteValue = value.trim();
				grid.doGetCellValue(cell.col, cell.row, value$1 => {
					const newValue = toggleValue(value$1);
					if (`${newValue}`.trim() === pasteValue)
						grid.doChangeValue(cell.col, cell.row, toggleValue);
					else if (isRejectValue$1(value$1, pasteValue)) context.reject();
				});
			}
			onDeleteCellRangeBox() {}
		};
		function isRejectValue$1(oldValue, pasteValue) {
			if ((oldValue != null ? `${oldValue}`.trim() : "") === pasteValue) return false;
			const newValue = toggleValue(oldValue);
			return (
				`${newValue}`.trim() !== pasteValue &&
				`${toggleValue(newValue)}`.trim() !== pasteValue
			);
		}

		//#endregion
		//#region src/js/columns/action/BaseInputEditor.ts
		const KEY_ENTER$6 = 13;
		const KEY_F2$1 = 113;
		var BaseInputEditor = class extends Editor {
			constructor(option = {}) {
				super(option);
			}
			bindGridEvent(grid, cellId) {
				const open = cell => {
					if (
						isReadOnlyRecord(this.readOnly, grid, cell.row) ||
						isDisabledRecord(this.disabled, grid, cell.row)
					)
						return false;
					this.onOpenCellInternal(grid, cell);
					return true;
				};
				const input = (cell, value) => {
					if (
						isReadOnlyRecord(this.readOnly, grid, cell.row) ||
						isDisabledRecord(this.disabled, grid, cell.row)
					)
						return;
					this.onInputCellInternal(grid, cell, value);
				};
				function isTarget(col, row) {
					return grid.getLayoutCellId(col, row) === cellId;
				}
				return [
					grid.listen(DG_EVENT_TYPE.INPUT_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						input(
							{
								col: e.col,
								row: e.row
							},
							e.value
						);
					}),
					grid.listen(DG_EVENT_TYPE.PASTE_CELL, e => {
						if (e.multi) return;
						const selectionRange = grid.selection.range;
						if (!cellEquals(selectionRange.start, selectionRange.end)) return;
						if (!isTarget(e.col, e.row)) return;
						event.cancel(e.event);
						input(
							{
								col: e.col,
								row: e.row
							},
							e.normalizeValue
						);
					}),
					grid.listen(DG_EVENT_TYPE.DBLCLICK_CELL, cell => {
						if (!isTarget(cell.col, cell.row)) return;
						open({
							col: cell.col,
							row: cell.row
						});
					}),
					grid.listen(DG_EVENT_TYPE.DBLTAP_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						open({
							col: e.col,
							row: e.row
						});
						event.cancel(e.event);
					}),
					grid.listen(DG_EVENT_TYPE.KEYDOWN, e => {
						if (e.keyCode !== KEY_F2$1 && e.keyCode !== KEY_ENTER$6) return;
						const sel = grid.selection.select;
						if (!isTarget(sel.col, sel.row)) return;
						if (
							open({
								col: sel.col,
								row: sel.row
							})
						)
							e.stopCellMoving();
					}),
					grid.listen(DG_EVENT_TYPE.SELECTED_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						this.onChangeSelectCellInternal(
							grid,
							{
								col: e.col,
								row: e.row
							},
							e.selected
						);
					}),
					grid.listen(DG_EVENT_TYPE.SCROLL, () => {
						this.onGridScrollInternal(grid);
					}),
					grid.listen(DG_EVENT_TYPE.EDITABLEINPUT_CELL, cell => {
						if (!isTarget(cell.col, cell.row)) return false;
						if (
							isReadOnlyRecord(this.readOnly, grid, cell.row) ||
							isDisabledRecord(this.disabled, grid, cell.row)
						)
							return false;
						return true;
					}),
					grid.listen(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, cell => {
						if (!isTarget(cell.col, cell.row)) return;
						if (
							isReadOnlyRecord(this.readOnly, grid, cell.row) ||
							isDisabledRecord(this.disabled, grid, cell.row)
						)
							return;
						const range = grid.getCellRange(cell.col, cell.row);
						if (
							range.start.col !== range.end.col ||
							range.start.row !== range.end.row
						) {
							const { input: input$1 } = cell;
							const baseRect = grid.getCellRect(cell.col, cell.row);
							const rangeRect = grid.getCellRangeRect(range);
							input$1.style.top = `${(parseFloat(input$1.style.top) + (rangeRect.top - baseRect.top)).toFixed()}px`;
							input$1.style.left = `${(parseFloat(input$1.style.left) + (rangeRect.left - baseRect.left)).toFixed()}px`;
							input$1.style.width = `${rangeRect.width.toFixed()}px`;
							input$1.style.height = `${rangeRect.height.toFixed()}px`;
						}
						this.onSetInputAttrsInternal(
							grid,
							{
								col: cell.col,
								row: cell.row
							},
							cell.input
						);
					})
				];
			}
			onPasteCellRangeBox(grid, cell, value) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				grid.doChangeValue(cell.col, cell.row, () => {
					if (this.isSupportMultilineValue()) return value;
					return value.replace(/\r?\n/g, " ");
				});
			}
			onDeleteCellRangeBox(grid, cell) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				grid.doChangeValue(cell.col, cell.row, () => "");
			}
			isSupportMultilineValue() {
				return false;
			}
		};

		//#endregion
		//#region src/js/internal/EventHandler.ts
		var import_defineProperty$62 = /* @__PURE__ */ __toESM(require_defineProperty());
		/** @private */
		let nextId$1 = 1;
		var EventHandler = class {
			constructor() {
				(0, import_defineProperty$62.default)(this, "_listeners", {});
			}
			on(target, type, listener, ...options) {
				if (target.addEventListener) target.addEventListener(type, listener, ...options);
				const obj$1 = {
					target,
					type,
					listener,
					options
				};
				const id = nextId$1++;
				this._listeners[id] = obj$1;
				return id;
			}
			once(target, type, listener, ...options) {
				const id = this.on(
					target,
					type,
					(...args) => {
						this.off(id);
						listener(...args);
					},
					...options
				);
				return id;
			}
			tryWithOffEvents(target, type, call) {
				const list = [];
				try {
					each(this._listeners, obj$1 => {
						if (obj$1.target === target && obj$1.type === type) {
							if (obj$1.target.removeEventListener)
								obj$1.target.removeEventListener(
									obj$1.type,
									obj$1.listener,
									...obj$1.options
								);
							list.push(obj$1);
						}
					});
					call();
				} finally {
					list.forEach(obj$1 => {
						if (obj$1.target.addEventListener)
							obj$1.target.addEventListener(
								obj$1.type,
								obj$1.listener,
								...obj$1.options
							);
					});
				}
			}
			off(id) {
				if (id == null) return;
				const obj$1 = this._listeners[id];
				if (!obj$1) return;
				delete this._listeners[id];
				if (obj$1.target.removeEventListener)
					obj$1.target.removeEventListener(obj$1.type, obj$1.listener, ...obj$1.options);
			}
			fire(target, type, ...args) {
				each(this._listeners, obj$1 => {
					if (obj$1.target === target && obj$1.type === type)
						obj$1.listener.call(obj$1.target, ...args);
				});
			}
			hasListener(target, type) {
				let result = false;
				each(this._listeners, obj$1 => {
					if (obj$1.target === target && obj$1.type === type) result = true;
				});
				return result;
			}
			clear() {
				each(this._listeners, obj$1 => {
					if (obj$1.target.removeEventListener)
						obj$1.target.removeEventListener(
							obj$1.type,
							obj$1.listener,
							...obj$1.options
						);
				});
				this._listeners = {};
			}
			dispose() {
				this.clear();
				this._listeners = null;
			}
		};

		//#endregion
		//#region src/js/internal/dom.ts
		function createElement(tagName, { classList, text, html } = {}) {
			const element = document.createElement(tagName);
			if (classList)
				if (Array.isArray(classList)) element.classList.add(...classList);
				else element.classList.add(classList);
			if (text) element.textContent = text;
			else if (html) element.innerHTML = html;
			return element;
		}
		function empty(dom) {
			let c;
			while ((c = dom.firstChild)) dom.removeChild(c);
		}
		function isNode$1(arg) {
			return !!(arg.nodeType && arg.nodeName);
		}
		function toNode(arg) {
			if (isNode$1(arg)) return arg;
			const dom = createElement("div", { html: arg });
			return Array.prototype.slice.call(dom.childNodes);
		}
		function toNodeList(arg) {
			if (Array.isArray(arg)) {
				const result = [];
				arg.forEach(e => {
					result.push(...toNodeList(e));
				});
				return result;
			}
			const node = toNode(arg);
			return Array.isArray(node) ? node : [node];
		}
		function appendHtml(dom, inner) {
			toNodeList(inner).forEach(node => {
				dom.appendChild(node);
			});
		}
		function disableFocus(el) {
			el.dataset.disableBeforeTabIndex = `${el.tabIndex}`;
			el.tabIndex = -1;
			Array.prototype.slice.call(el.children, 0).forEach(disableFocus);
		}
		function isFocusable(el) {
			return el.tabIndex != null && el.tabIndex > -1;
		}
		function findPrevSiblingFocusable(el) {
			let n = el.previousSibling;
			while (n && !isFocusable(n)) n = n.previousSibling;
			return n;
		}
		function findNextSiblingFocusable(el) {
			let n = el.nextSibling;
			while (n && !isFocusable(n)) n = n.nextSibling;
			return n;
		}

		//#endregion
		//#region src/js/columns/action/internal/input-value-handler.ts
		function setInputValue(input, value) {
			const sign = input.type === "number" && value === "-";
			if (sign) {
				input.type = "";
				let handler$1 = new EventHandler();
				const dispose = () => {
					if (handler$1) {
						handler$1.dispose();
						handler$1 = null;
					}
				};
				handler$1.once(input, "input", _e => {
					input.type = "number";
					dispose();
				});
				handler$1.once(input, "blur", _e => {
					dispose();
				});
			}
			input.value = value !== null && value !== void 0 ? value : "";
		}

		//#endregion
		//#region src/js/columns/action/internal/InlineInputElement.ts
		var import_defineProperty$61 = /* @__PURE__ */ __toESM(require_defineProperty());
		const KEY_TAB$2 = 9;
		const KEY_ENTER$5 = 13;
		const CLASSNAME$6 = "cheetah-grid__inline-input";
		function createInputElement() {
			return createElement("input", { classList: CLASSNAME$6 });
		}
		function setInputAttrs$1(editor, _grid, input) {
			const { classList, type } = editor;
			if (classList) input.classList.add(...classList);
			input.type = type || "";
		}
		var InlineInputElement = class {
			static setInputAttrs(editor, grid, input) {
				setInputAttrs$1(editor, grid, input);
			}
			constructor() {
				(0, import_defineProperty$61.default)(this, "_handler", void 0);
				(0, import_defineProperty$61.default)(this, "_input", void 0);
				(0, import_defineProperty$61.default)(this, "_beforePropEditor", void 0);
				(0, import_defineProperty$61.default)(this, "_activeData", void 0);
				(0, import_defineProperty$61.default)(this, "_attaching", void 0);
				this._handler = new EventHandler();
				this._input = createInputElement();
				this._bindInputEvents();
			}
			dispose() {
				var _input$parentElement;
				const input = this._input;
				this.detach();
				this._handler.dispose();
				delete this._input;
				this._beforePropEditor = null;
				(_input$parentElement = input.parentElement) === null ||
					_input$parentElement === void 0 ||
					_input$parentElement.removeChild(input);
			}
			attach(grid, editor, col, row, value) {
				const input = this._input;
				const handler$1 = this._handler;
				if (this._beforePropEditor) {
					const { classList } = this._beforePropEditor;
					if (classList) input.classList.remove(...classList);
				}
				input.style.font = grid.font || "16px sans-serif";
				const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
				input.style.top = `${rect.top.toFixed()}px`;
				input.style.left = `${rect.left.toFixed()}px`;
				input.style.width = `${rect.width.toFixed()}px`;
				input.style.height = `${rect.height.toFixed()}px`;
				element.appendChild(input);
				setInputAttrs$1(editor, grid, input);
				setInputValue(input, value);
				this._activeData = {
					grid,
					col,
					row,
					editor
				};
				this._beforePropEditor = editor;
				const focus = () => {
					input.focus();
					const end = input.value.length;
					try {
						if (typeof input.selectionStart !== "undefined") {
							input.selectionStart = end;
							input.selectionEnd = end;
							return;
						}
					} catch (e) {}
					if (document.selection) {
						const range = input.createTextRange();
						range.collapse();
						range.moveEnd("character", end);
						range.moveStart("character", end);
						range.select();
					}
				};
				handler$1.tryWithOffEvents(input, "blur", () => {
					focus();
				});
				this._attaching = true;
				setTimeout(() => {
					delete this._attaching;
				});
			}
			detach(gridFocus) {
				if (this._isActive()) {
					const { grid, col, row } = this._activeData;
					const input = this._input;
					this._handler.tryWithOffEvents(input, "blur", () => {
						var _input$parentElement2;
						(_input$parentElement2 = input.parentElement) === null ||
							_input$parentElement2 === void 0 ||
							_input$parentElement2.removeChild(input);
					});
					const range = grid.getCellRange(col, row);
					grid.invalidateCellRange(range);
					if (gridFocus) grid.focus();
				}
				this._activeData = null;
			}
			doChangeValue() {
				if (!this._isActive()) return;
				const input = this._input;
				const { value } = input;
				const { grid, col, row } = this._activeData;
				grid.doChangeValue(col, row, () => value);
			}
			_isActive() {
				const input = this._input;
				if (!input || !input.parentElement) return false;
				if (!this._activeData) return false;
				return true;
			}
			_bindInputEvents() {
				const handler$1 = this._handler;
				const input = this._input;
				const stopPropagationOnly = e => e.stopPropagation();
				handler$1.on(input, "click", stopPropagationOnly);
				handler$1.on(input, "mousedown", stopPropagationOnly);
				handler$1.on(input, "touchstart", stopPropagationOnly);
				handler$1.on(input, "dblclick", stopPropagationOnly);
				handler$1.on(input, "compositionstart", _e => {
					input.classList.add("composition");
				});
				handler$1.on(input, "compositionend", _e => {
					input.classList.remove("composition");
				});
				handler$1.on(input, "keydown", e => {
					if (input.classList.contains("composition")) return;
					const keyCode = event.getKeyCode(e);
					if (keyCode === KEY_ENTER$5) this._onKeydownEnter(e);
					else if (keyCode === KEY_TAB$2) this._onKeydownTab(e);
				});
				handler$1.on(input, "blur", _e => {
					this.doChangeValue();
					this.detach();
				});
			}
			_onKeydownEnter(e) {
				var _grid$keyboardOptions;
				if (!this._isActive() || this._attaching) return;
				const { grid } = this._activeData;
				this.doChangeValue();
				this.detach(true);
				event.cancel(e);
				if (
					(_grid$keyboardOptions = grid.keyboardOptions) === null ||
					_grid$keyboardOptions === void 0
						? void 0
						: _grid$keyboardOptions.moveCellOnEnter
				)
					grid.onKeyDownMove(e);
			}
			_onKeydownTab(e) {
				var _grid$keyboardOptions2;
				if (!this._isActive()) return;
				const { grid } = this._activeData;
				if (
					!((_grid$keyboardOptions2 = grid.keyboardOptions) === null ||
					_grid$keyboardOptions2 === void 0
						? void 0
						: _grid$keyboardOptions2.moveCellOnTab)
				)
					return;
				this.doChangeValue();
				this.detach(true);
				grid.onKeyDownMove(e);
			}
		};

		//#endregion
		//#region src/js/columns/action/InlineInputEditor.ts
		var import_defineProperty$60 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$8 = INLINE_INPUT_EDITOR_STATE_ID;
		function getState$4(grid) {
			let state = grid[_$8];
			if (!state) {
				state = {};
				obj.setReadonly(grid, _$8, state);
			}
			return state;
		}
		let globalElement$2 = null;
		let bindGridCount$2 = 0;
		function attachInput$1(grid, cell, editor, value) {
			const state = getState$4(grid);
			if (!globalElement$2) globalElement$2 = new InlineInputElement();
			if (!state.element) {
				state.element = globalElement$2;
				bindGridCount$2++;
				grid.addDisposable({
					dispose() {
						bindGridCount$2--;
						if (!bindGridCount$2) {
							globalElement$2 === null ||
								globalElement$2 === void 0 ||
								globalElement$2.dispose();
							globalElement$2 = null;
							state.element = null;
						}
					}
				});
			}
			globalElement$2.attach(grid, editor, cell.col, cell.row, value);
		}
		function detachInput$1(gridFocus) {
			if (globalElement$2) globalElement$2.detach(gridFocus);
		}
		function doChangeValue(_grid) {
			if (globalElement$2) globalElement$2.doChangeValue();
		}
		var InlineInputEditor = class InlineInputEditor extends BaseInputEditor {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$60.default)(this, "_classList", void 0);
				(0, import_defineProperty$60.default)(this, "_type", void 0);
				this._classList = option.classList;
				this._type = option.type;
			}
			get classList() {
				if (!this._classList) return void 0;
				return Array.isArray(this._classList) ? this._classList : [this._classList];
			}
			set classList(classList) {
				this._classList = classList;
			}
			get type() {
				return this._type;
			}
			set type(type) {
				this._type = type;
			}
			clone() {
				return new InlineInputEditor(this);
			}
			onInputCellInternal(grid, cell, inputValue) {
				attachInput$1(grid, cell, this, inputValue);
			}
			onOpenCellInternal(grid, cell) {
				grid.doGetCellValue(cell.col, cell.row, value => {
					attachInput$1(grid, cell, this, value);
				});
			}
			onChangeSelectCellInternal(grid, _cell, _selected) {
				doChangeValue(grid);
				detachInput$1();
			}
			onGridScrollInternal(grid) {
				doChangeValue(grid);
				detachInput$1(true);
			}
			onChangeDisabledInternal() {
				detachInput$1(true);
			}
			onChangeReadOnlyInternal() {
				detachInput$1(true);
			}
			onSetInputAttrsInternal(grid, _cell, input) {
				InlineInputElement.setInputAttrs(this, grid, input);
			}
		};

		//#endregion
		//#region src/js/columns/action/internal/InlineMenuElement.ts
		var import_defineProperty$59 = /* @__PURE__ */ __toESM(require_defineProperty());
		const KEY_TAB$1 = 9;
		const KEY_ENTER$4 = 13;
		const KEY_UP$1 = 38;
		const KEY_DOWN$1 = 40;
		const KEY_ESC$1 = 27;
		const CLASSNAME$5 = "cheetah-grid__inline-menu";
		const ITEM_CLASSNAME = `${CLASSNAME$5}__menu-item`;
		const HIDDEN_CLASSNAME$3 = `${CLASSNAME$5}--hidden`;
		const SHOWN_CLASSNAME$3 = `${CLASSNAME$5}--shown`;
		const EMPTY_ITEM_CLASSNAME = `${ITEM_CLASSNAME}--empty`;
		const CSS_PROP_NAME_PREFIX$2 = "--cheetah-grid-inline-menu-";
		const CELL_TOP_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}cell-top`;
		const CELL_BOTTOM_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}cell-bottom`;
		const CELL_LEFT_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}cell-left`;
		const CELL_RIGHT_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}cell-right`;
		const ELEMENT_WIDTH_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}width`;
		const ELEMENT_HEIGHT_CSS_PROP_NAME$2 = `${CSS_PROP_NAME_PREFIX$2}height`;
		const TARGET_ITEM_OFFSET_TOP_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX$2}target-item-offset-top`;
		const TARGET_ITEM_HEIGHT_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX$2}target-item-height`;
		function findItemParents(target) {
			let el = target;
			while (el && !el.classList.contains(ITEM_CLASSNAME)) {
				el = el.parentElement;
				if (!el || el.classList.contains(CLASSNAME$5)) return null;
			}
			return el;
		}
		function createMenuElement() {
			const el = createElement("ul", { classList: CLASSNAME$5 });
			el.popover = "manual";
			return el;
		}
		function optionToLi({ classList, label, value, html }, index) {
			const item = createElement("li", { classList: ITEM_CLASSNAME });
			item.tabIndex = 0;
			item.dataset.valueindex = `${index}`;
			if (classList)
				item.classList.add(...(Array.isArray(classList) ? classList : [classList]));
			if (label) {
				const span = createElement("span", { text: label });
				item.appendChild(span);
			} else if (html) appendHtml(item, html);
			if (value === "" || value == null) item.classList.add(EMPTY_ITEM_CLASSNAME);
			return item;
		}
		function openMenu(grid, editor, col, row, value, options, menu) {
			const { classList } = editor;
			menu.classList.remove(SHOWN_CLASSNAME$3);
			menu.classList.add(HIDDEN_CLASSNAME$3);
			empty(menu);
			menu.style.font = grid.font || "16px sans-serif";
			let emptyItemEl = null;
			let valueItemEl = null;
			options.forEach((option, i) => {
				const item = optionToLi(option, i);
				menu.appendChild(item);
				if (option.value === value) {
					valueItemEl = item;
					item.dataset.select = "select";
				}
				if (item.classList.contains(EMPTY_ITEM_CLASSNAME)) emptyItemEl = item;
			});
			const focusEl = valueItemEl || emptyItemEl || menu.children[0];
			if (classList) menu.classList.add(...classList);
			const children = Array.prototype.slice.call(menu.children, 0);
			const focusIndex = children.indexOf(focusEl);
			const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
			element.appendChild(menu);
			menu.showPopover();
			focusEl.scrollIntoView({
				behavior: "instant",
				block: "center"
			});
			const { left: elementLeft, top: elementTop } = element.getBoundingClientRect();
			menu.style.setProperty(
				CELL_TOP_CSS_PROP_NAME$2,
				`${(elementTop + rect.top).toFixed()}px`
			);
			menu.style.setProperty(
				CELL_BOTTOM_CSS_PROP_NAME$2,
				`${(elementTop + rect.bottom).toFixed()}px`
			);
			menu.style.setProperty(
				CELL_LEFT_CSS_PROP_NAME$2,
				`${(elementLeft + rect.left).toFixed()}px`
			);
			menu.style.setProperty(
				CELL_RIGHT_CSS_PROP_NAME$2,
				`${(elementLeft + rect.right).toFixed()}px`
			);
			let offset = -menu.scrollTop;
			for (let i = 0; i < focusIndex; i++) {
				const { offsetHeight } = children[i];
				offset += offsetHeight;
			}
			menu.style.setProperty(TARGET_ITEM_OFFSET_TOP_CSS_PROP_NAME, `${offset}px`);
			menu.style.setProperty(TARGET_ITEM_HEIGHT_CSS_PROP_NAME, `${focusEl.offsetHeight}px`);
			const rootElementRect = menu.getBoundingClientRect();
			menu.style.setProperty(
				ELEMENT_WIDTH_CSS_PROP_NAME$2,
				`${rootElementRect.width.toFixed()}px`
			);
			menu.style.setProperty(
				ELEMENT_HEIGHT_CSS_PROP_NAME$2,
				`${rootElementRect.height.toFixed()}px`
			);
			if (focusEl) focusEl.focus();
			menu.classList.remove(HIDDEN_CLASSNAME$3);
			menu.classList.add(SHOWN_CLASSNAME$3);
		}
		function closeMenu(_grid, _col, _row, menu) {
			menu.classList.remove(SHOWN_CLASSNAME$3);
			menu.classList.add(HIDDEN_CLASSNAME$3);
			disableFocus(menu);
			menu.hidePopover();
		}
		var InlineMenuElement = class {
			constructor() {
				(0, import_defineProperty$59.default)(this, "_handler", void 0);
				(0, import_defineProperty$59.default)(this, "_menu", void 0);
				(0, import_defineProperty$59.default)(this, "_beforePropEditor", void 0);
				(0, import_defineProperty$59.default)(this, "_activeData", void 0);
				(0, import_defineProperty$59.default)(this, "_registerBodyClickListener", void 0);
				(0, import_defineProperty$59.default)(this, "_deregisterBodyClickListener", void 0);
				const handler$1 = (this._handler = new EventHandler());
				this._menu = createMenuElement();
				this._bindMenuEvents();
				let bodyClickListenerId;
				const deregisterBodyClickListener = (this._deregisterBodyClickListener = () =>
					handler$1.off(bodyClickListenerId));
				this._registerBodyClickListener = () => {
					deregisterBodyClickListener();
					bodyClickListenerId = handler$1.on(
						document.body,
						"click",
						this._onBodyClick.bind(this),
						{ capture: true }
					);
				};
			}
			dispose() {
				var _menu$parentElement;
				const menu = this._menu;
				this.detach();
				this._handler.dispose();
				delete this._menu;
				this._beforePropEditor = null;
				(_menu$parentElement = menu.parentElement) === null ||
					_menu$parentElement === void 0 ||
					_menu$parentElement.removeChild(menu);
			}
			attach(grid, editor, col, row, value, record) {
				const menu = this._menu;
				if (this._beforePropEditor) {
					const { classList } = this._beforePropEditor;
					if (classList) menu.classList.remove(...classList);
				}
				const options = editor.options(record);
				openMenu(grid, editor, col, row, value, options, menu);
				this._activeData = {
					grid,
					col,
					row,
					editor,
					options
				};
				this._beforePropEditor = editor;
				this._registerBodyClickListener();
			}
			detach(gridFocus) {
				if (this._isActive()) {
					const { grid, col, row } = this._activeData;
					const menu = this._menu;
					closeMenu(grid, col, row, menu);
					const range = grid.getCellRange(col, row);
					grid.invalidateCellRange(range);
					if (gridFocus) grid.focus();
				}
				this._activeData = null;
				this._deregisterBodyClickListener();
			}
			_doChangeValue(valueindex) {
				if (!this._isActive()) return;
				const { grid, col, row, options } = this._activeData;
				const option = options[Number(valueindex)];
				if (option) {
					const { value } = option;
					grid.doChangeValue(col, row, () => value);
				}
			}
			_isActive() {
				const menu = this._menu;
				if (!menu || !menu.parentElement) return false;
				if (!this._activeData) return false;
				return true;
			}
			_bindMenuEvents() {
				const handler$1 = this._handler;
				const menu = this._menu;
				const stopPropagationOnly = e => e.stopPropagation();
				handler$1.on(menu, "mousedown", stopPropagationOnly);
				handler$1.on(menu, "touchstart", stopPropagationOnly);
				handler$1.on(menu, "dblclick", stopPropagationOnly);
				handler$1.on(menu, "click", e => {
					e.stopPropagation();
					const item = findItemParents(e.target);
					if (!item) return;
					const { valueindex } = item.dataset;
					this._doChangeValue(valueindex || "");
					this.detach(true);
				});
				handler$1.on(menu, "keydown", e => {
					const item = findItemParents(e.target);
					if (!item) return;
					const keyCode = event.getKeyCode(e);
					if (keyCode === KEY_ENTER$4) this._onKeydownEnter(menu, item, e);
					else if (keyCode === KEY_ESC$1) {
						this.detach(true);
						event.cancel(e);
					} else if (keyCode === KEY_UP$1) {
						const n = findPrevSiblingFocusable(item);
						if (n) {
							n.focus();
							event.cancel(e);
						}
					} else if (keyCode === KEY_DOWN$1) {
						const n = findNextSiblingFocusable(item);
						if (n) {
							n.focus();
							event.cancel(e);
						}
					} else if (keyCode === KEY_TAB$1) this._onKeydownTab(menu, item, e);
				});
			}
			_onBodyClick(e) {
				const el = e.target;
				if (!el) return;
				if (this._menu.contains(el)) return;
				if (this._isActive()) {
					const { grid } = this._activeData;
					if (grid.getElement().contains(el)) return;
				}
				this.detach();
			}
			_onKeydownEnter(_menu, item, e) {
				const grid = this._isActive() ? this._activeData.grid : null;
				const { valueindex } = item.dataset;
				this._doChangeValue(valueindex || "");
				this.detach(true);
				event.cancel(e);
				if (grid) {
					var _grid$keyboardOptions;
					if (
						(_grid$keyboardOptions = grid.keyboardOptions) === null ||
						_grid$keyboardOptions === void 0
							? void 0
							: _grid$keyboardOptions.moveCellOnEnter
					)
						grid.onKeyDownMove(e);
				}
			}
			_onKeydownTab(menu, item, e) {
				if (this._isActive()) {
					var _grid$keyboardOptions2;
					const { grid } = this._activeData;
					if (
						(_grid$keyboardOptions2 = grid.keyboardOptions) === null ||
						_grid$keyboardOptions2 === void 0
							? void 0
							: _grid$keyboardOptions2.moveCellOnTab
					) {
						const { valueindex } = item.dataset;
						this._doChangeValue(valueindex || "");
						this.detach(true);
						grid.onKeyDownMove(e);
						return;
					}
				}
				if (!e.shiftKey) {
					if (!findNextSiblingFocusable(item)) {
						let n = menu.querySelector(`.${ITEM_CLASSNAME}`);
						if (!isFocusable(n)) n = findNextSiblingFocusable(n);
						if (n) {
							n.focus();
							event.cancel(e);
						}
					}
				} else if (!findPrevSiblingFocusable(item)) {
					const items = menu.querySelectorAll(`.${ITEM_CLASSNAME}`);
					let n = items[items.length - 1];
					if (!isFocusable(n)) n = findPrevSiblingFocusable(n);
					if (n) {
						n.focus();
						event.cancel(e);
					}
				}
			}
		};

		//#endregion
		//#region src/js/core/EventTarget.ts
		var import_defineProperty$58 = /* @__PURE__ */ __toESM(require_defineProperty());
		/** @private */
		const _$7 = Symbol("private");
		/** @private */
		let nextId = 1;
		/**
		 * event target.
		 */
		var EventTarget = class {
			constructor() {
				(0, import_defineProperty$58.default)(this, _$7, {
					listeners: {},
					listenerData: {}
				});
			}
			/**
			 * Adds an event listener.
			 * @param  {string} type The event type id.
			 * @param  {function} listener Callback method.
			 * @return {number} unique id for the listener.
			 */
			listen(type, listener) {
				const list = this[_$7].listeners[type] || (this[_$7].listeners[type] = []);
				list.push(listener);
				const id = nextId++;
				this[_$7].listenerData[id] = {
					type,
					listener,
					remove: () => {
						delete this[_$7].listenerData[id];
						const index = list.indexOf(listener);
						list.splice(index, 1);
						if (!this[_$7].listeners[type].length) delete this[_$7].listeners[type];
					}
				};
				return id;
			}
			/**
			 * Removes an event listener which was added with listen() by the id returned by listen().
			 * @param  {number} id the id returned by listen().
			 * @return {void}
			 */
			unlisten(id) {
				if (!this[_$7]) return;
				this[_$7].listenerData[id].remove();
			}
			addEventListener(type, listener) {
				this.listen(type, listener);
			}
			removeEventListener(type, listener) {
				if (!this[_$7]) return;
				each(this[_$7].listenerData, (obj$1, id) => {
					if (obj$1.type === type && obj$1.listener === listener) this.unlisten(id);
				});
			}
			hasListeners(type) {
				if (!this[_$7]) return false;
				return !!this[_$7].listeners[type];
			}
			/**
			 * Fires all registered listeners
			 * @param  {string}    type The type of the listeners to fire.
			 * @param  {...*} args fire arguments
			 * @return {*} the result of the last listener
			 */
			fireListeners(type, ...args) {
				if (!this[_$7]) return [];
				const list = this[_$7].listeners[type];
				if (!list) return [];
				return list.map(listener => listener.call(this, ...args)).filter(r => r != null);
			}
			dispose() {
				delete this[_$7];
			}
		};

		//#endregion
		//#region src/js/columns/style/BaseStyle.ts
		var import_defineProperty$57 = /* @__PURE__ */ __toESM(require_defineProperty());
		const STYLE_EVENT_TYPE = { CHANGE_STYLE: "change_style" };
		let defaultStyle$21;
		var BaseStyle = class BaseStyle extends EventTarget {
			static get EVENT_TYPE() {
				return STYLE_EVENT_TYPE;
			}
			static get DEFAULT() {
				return defaultStyle$21 ? defaultStyle$21 : (defaultStyle$21 = new BaseStyle());
			}
			constructor({
				bgColor,
				visibility,
				indicatorTopLeft,
				indicatorTopRight,
				indicatorBottomRight,
				indicatorBottomLeft
			} = {}) {
				super();
				(0, import_defineProperty$57.default)(this, "_bgColor", void 0);
				(0, import_defineProperty$57.default)(this, "_visibility", void 0);
				(0, import_defineProperty$57.default)(this, "_indicatorTopLeft", void 0);
				(0, import_defineProperty$57.default)(this, "_indicatorTopRight", void 0);
				(0, import_defineProperty$57.default)(this, "_indicatorBottomRight", void 0);
				(0, import_defineProperty$57.default)(this, "_indicatorBottomLeft", void 0);
				this._bgColor = bgColor;
				this._visibility = normalizeVisibility(visibility, void 0);
				this._indicatorTopLeft = normalizeIndicator(indicatorTopLeft);
				this._indicatorTopRight = normalizeIndicator(indicatorTopRight);
				this._indicatorBottomRight = normalizeIndicator(indicatorBottomRight);
				this._indicatorBottomLeft = normalizeIndicator(indicatorBottomLeft);
			}
			get bgColor() {
				return this._bgColor;
			}
			set bgColor(bgColor) {
				this._bgColor = bgColor;
				this.doChangeStyle();
			}
			get visibility() {
				return this._visibility;
			}
			set visibility(visibility) {
				const normalized = normalizeVisibility(visibility, this._visibility);
				if (this._visibility === normalized) return;
				this._visibility = normalized;
				this.doChangeStyle();
			}
			get indicatorTopLeft() {
				return this._indicatorTopLeft;
			}
			set indicatorTopLeft(indicatorTopLeft) {
				this._indicatorTopLeft = normalizeIndicator(indicatorTopLeft);
				this.doChangeStyle();
			}
			get indicatorTopRight() {
				return this._indicatorTopRight;
			}
			set indicatorTopRight(indicatorTopRight) {
				this._indicatorTopRight = normalizeIndicator(indicatorTopRight);
				this.doChangeStyle();
			}
			get indicatorBottomRight() {
				return this._indicatorBottomRight;
			}
			set indicatorBottomRight(indicatorBottomRight) {
				this._indicatorBottomRight = normalizeIndicator(indicatorBottomRight);
				this.doChangeStyle();
			}
			get indicatorBottomLeft() {
				return this._indicatorBottomLeft;
			}
			set indicatorBottomLeft(indicatorBottomLeft) {
				this._indicatorBottomLeft = normalizeIndicator(indicatorBottomLeft);
				this.doChangeStyle();
			}
			doChangeStyle() {
				this.fireListeners(STYLE_EVENT_TYPE.CHANGE_STYLE);
			}
			clone() {
				return new BaseStyle(this);
			}
		};
		function normalizeIndicator(indicator) {
			if (typeof indicator === "string") return { style: indicator };
			return indicator;
		}
		function normalizeVisibility(visibility, defaultValue) {
			if (visibility && visibility !== "visible" && visibility !== "hidden")
				return defaultValue;
			return visibility;
		}

		//#endregion
		//#region src/js/columns/style/StdBaseStyle.ts
		var import_defineProperty$56 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$20;
		var StdBaseStyle$1 = class StdBaseStyle$1 extends BaseStyle {
			static get DEFAULT() {
				return defaultStyle$20 ? defaultStyle$20 : (defaultStyle$20 = new StdBaseStyle$1());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$56.default)(this, "_textAlign", void 0);
				(0, import_defineProperty$56.default)(this, "_textBaseline", void 0);
				(0, import_defineProperty$56.default)(this, "_padding", void 0);
				this._textAlign = style$1.textAlign || "left";
				this._textBaseline = style$1.textBaseline || "middle";
				this._padding = style$1.padding;
			}
			get textAlign() {
				return this._textAlign;
			}
			set textAlign(textAlign) {
				this._textAlign = textAlign;
				this.doChangeStyle();
			}
			get textBaseline() {
				return this._textBaseline;
			}
			set textBaseline(textBaseline) {
				this._textBaseline = textBaseline;
				this.doChangeStyle();
			}
			get padding() {
				return this._padding;
			}
			set padding(padding) {
				this._padding = padding;
				this.doChangeStyle();
			}
			clone() {
				return new StdBaseStyle$1(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/Style.ts
		var import_defineProperty$55 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$19;
		var Style$1 = class Style$1 extends StdBaseStyle$1 {
			static get DEFAULT() {
				return defaultStyle$19 ? defaultStyle$19 : (defaultStyle$19 = new Style$1());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$55.default)(this, "_color", void 0);
				(0, import_defineProperty$55.default)(this, "_font", void 0);
				(0, import_defineProperty$55.default)(this, "_textOverflow", void 0);
				this._color = style$1.color;
				this._font = style$1.font;
				this._textOverflow = style$1.textOverflow || "clip";
			}
			get color() {
				return this._color;
			}
			set color(color) {
				this._color = color;
				this.doChangeStyle();
			}
			get font() {
				return this._font;
			}
			set font(font) {
				this._font = font;
				this.doChangeStyle();
			}
			get textOverflow() {
				return this._textOverflow;
			}
			set textOverflow(textOverflow) {
				this._textOverflow = textOverflow;
				this.doChangeStyle();
			}
			clone() {
				return new Style$1(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/ButtonStyle.ts
		var import_defineProperty$54 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$18;
		var ButtonStyle = class ButtonStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$18 ? defaultStyle$18 : (defaultStyle$18 = new ButtonStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
				(0, import_defineProperty$54.default)(this, "_buttonBgColor", void 0);
				const { buttonBgColor } = style$1;
				this._buttonBgColor = buttonBgColor;
			}
			get buttonBgColor() {
				return this._buttonBgColor;
			}
			set buttonBgColor(buttonBgColor) {
				this._buttonBgColor = buttonBgColor;
				this.doChangeStyle();
			}
			clone() {
				return new ButtonStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/CheckStyle.ts
		var import_defineProperty$53 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$17;
		var CheckStyle = class CheckStyle extends StdBaseStyle$1 {
			static get DEFAULT() {
				return defaultStyle$17 ? defaultStyle$17 : (defaultStyle$17 = new CheckStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
				(0, import_defineProperty$53.default)(this, "_uncheckBgColor", void 0);
				(0, import_defineProperty$53.default)(this, "_checkBgColor", void 0);
				(0, import_defineProperty$53.default)(this, "_borderColor", void 0);
				const { uncheckBgColor, checkBgColor, borderColor } = style$1;
				this._uncheckBgColor = uncheckBgColor;
				this._checkBgColor = checkBgColor;
				this._borderColor = borderColor;
			}
			get uncheckBgColor() {
				return this._uncheckBgColor;
			}
			set uncheckBgColor(uncheckBgColor) {
				this._uncheckBgColor = uncheckBgColor;
				this.doChangeStyle();
			}
			get checkBgColor() {
				return this._checkBgColor;
			}
			set checkBgColor(checkBgColor) {
				this._checkBgColor = checkBgColor;
				this.doChangeStyle();
			}
			get borderColor() {
				return this._borderColor;
			}
			set borderColor(borderColor) {
				this._borderColor = borderColor;
				this.doChangeStyle();
			}
			clone() {
				return new CheckStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/IconStyle.ts
		let defaultStyle$16;
		var IconStyle = class IconStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$16 ? defaultStyle$16 : (defaultStyle$16 = new IconStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
			}
			clone() {
				return new IconStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/ImageStyle.ts
		var import_defineProperty$52 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$15;
		var ImageStyle = class ImageStyle extends StdBaseStyle$1 {
			static get DEFAULT() {
				return defaultStyle$15 ? defaultStyle$15 : (defaultStyle$15 = new ImageStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
				(0, import_defineProperty$52.default)(this, "_imageSizing", void 0);
				(0, import_defineProperty$52.default)(this, "_margin", void 0);
				this._imageSizing = style$1.imageSizing;
				this._margin = style$1.margin || 4;
			}
			get imageSizing() {
				return this._imageSizing;
			}
			set imageSizing(imageSizing) {
				this._imageSizing = imageSizing;
				this.doChangeStyle();
			}
			get margin() {
				return this._margin;
			}
			set margin(margin) {
				this._margin = margin;
				this.doChangeStyle();
			}
			clone() {
				return new ImageStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/MenuStyle.ts
		var import_defineProperty$51 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$14;
		var MenuStyle = class MenuStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$14 ? defaultStyle$14 : (defaultStyle$14 = new MenuStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$51.default)(this, "_appearance", void 0);
				const { appearance } = style$1;
				this._appearance = appearance;
			}
			get appearance() {
				return this._appearance || "menulist-button";
			}
			set appearance(appearance) {
				this._appearance = appearance;
				this.doChangeStyle();
			}
			clone() {
				return new MenuStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/MultilineTextStyle.ts
		var import_defineProperty$50 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$13;
		var MultilineTextStyle = class MultilineTextStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$13
					? defaultStyle$13
					: (defaultStyle$13 = new MultilineTextStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textBaseline: "top" }));
				(0, import_defineProperty$50.default)(this, "_lineHeight", void 0);
				(0, import_defineProperty$50.default)(this, "_autoWrapText", void 0);
				(0, import_defineProperty$50.default)(this, "_lineClamp", void 0);
				this._lineHeight = style$1.lineHeight || "1em";
				this._autoWrapText = style$1.autoWrapText || false;
				this._lineClamp = style$1.lineClamp;
			}
			clone() {
				return new MultilineTextStyle(this);
			}
			get lineHeight() {
				return this._lineHeight;
			}
			set lineHeight(lineHeight) {
				this._lineHeight = lineHeight;
				this.doChangeStyle();
			}
			get lineClamp() {
				return this._lineClamp;
			}
			set lineClamp(lineClamp) {
				this._lineClamp = lineClamp;
				this.doChangeStyle();
			}
			get autoWrapText() {
				return this._autoWrapText;
			}
			set autoWrapText(autoWrapText) {
				this._autoWrapText = autoWrapText;
				this.doChangeStyle();
			}
		};

		//#endregion
		//#region src/js/columns/style/NumberStyle.ts
		let defaultStyle$12;
		var NumberStyle = class NumberStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$12 ? defaultStyle$12 : (defaultStyle$12 = new NumberStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "right" }));
			}
			clone() {
				return new NumberStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/PercentCompleteBarStyle.ts
		var import_defineProperty$49 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$11;
		const DEFAULT_BAR_COLOR = num => {
			if (num > 80) return "#20a8d8";
			if (num > 50) return "#4dbd74";
			if (num > 20) return "#ffc107";
			return "#f86c6b";
		};
		var PercentCompleteBarStyle = class PercentCompleteBarStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$11
					? defaultStyle$11
					: (defaultStyle$11 = new PercentCompleteBarStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$49.default)(this, "_barColor", void 0);
				(0, import_defineProperty$49.default)(this, "_barBgColor", void 0);
				(0, import_defineProperty$49.default)(this, "_barHeight", void 0);
				this._barColor = style$1.barColor || DEFAULT_BAR_COLOR;
				this._barBgColor = style$1.barBgColor || "#f0f3f5";
				this._barHeight = style$1.barHeight || 3;
			}
			get barColor() {
				return this._barColor;
			}
			set barColor(barColor) {
				this._barColor = barColor;
				this.doChangeStyle();
			}
			get barBgColor() {
				return this._barBgColor;
			}
			set barBgColor(barBgColor) {
				this._barBgColor = barBgColor;
				this.doChangeStyle();
			}
			get barHeight() {
				return this._barHeight;
			}
			set barHeight(barHeight) {
				this._barHeight = barHeight;
				this.doChangeStyle();
			}
			clone() {
				return new PercentCompleteBarStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/RadioStyle.ts
		var import_defineProperty$48 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$10;
		var RadioStyle = class RadioStyle extends StdBaseStyle$1 {
			static get DEFAULT() {
				return defaultStyle$10 ? defaultStyle$10 : (defaultStyle$10 = new RadioStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
				(0, import_defineProperty$48.default)(this, "_checkColor", void 0);
				(0, import_defineProperty$48.default)(this, "_uncheckBorderColor", void 0);
				(0, import_defineProperty$48.default)(this, "_checkBorderColor", void 0);
				(0, import_defineProperty$48.default)(this, "_uncheckBgColor", void 0);
				(0, import_defineProperty$48.default)(this, "_checkBgColor", void 0);
				const {
					checkColor,
					uncheckBorderColor,
					checkBorderColor,
					uncheckBgColor,
					checkBgColor
				} = style$1;
				this._checkColor = checkColor;
				this._uncheckBorderColor = uncheckBorderColor;
				this._checkBorderColor = checkBorderColor;
				this._uncheckBgColor = uncheckBgColor;
				this._checkBgColor = checkBgColor;
			}
			get checkColor() {
				return this._checkColor;
			}
			set checkColor(checkColor) {
				this._checkColor = checkColor;
				this.doChangeStyle();
			}
			get uncheckBorderColor() {
				return this._uncheckBorderColor;
			}
			set uncheckBorderColor(uncheckBorderColor) {
				this._uncheckBorderColor = uncheckBorderColor;
				this.doChangeStyle();
			}
			get checkBorderColor() {
				return this._checkBorderColor;
			}
			set checkBorderColor(checkBorderColor) {
				this._checkBorderColor = checkBorderColor;
				this.doChangeStyle();
			}
			get uncheckBgColor() {
				return this._uncheckBgColor;
			}
			set uncheckBgColor(uncheckBgColor) {
				this._uncheckBgColor = uncheckBgColor;
				this.doChangeStyle();
			}
			get checkBgColor() {
				return this._checkBgColor;
			}
			set checkBgColor(checkBgColor) {
				this._checkBgColor = checkBgColor;
				this.doChangeStyle();
			}
			clone() {
				return new RadioStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/style/TreeStyle.ts
		var import_defineProperty$47 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$9;
		var TreeStyle = class TreeStyle extends Style$1 {
			static get DEFAULT() {
				return defaultStyle$9 ? defaultStyle$9 : (defaultStyle$9 = new TreeStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$47.default)(this, "_lineStyle", void 0);
				(0, import_defineProperty$47.default)(this, "_lineColor", void 0);
				(0, import_defineProperty$47.default)(this, "_lineWidth", void 0);
				(0, import_defineProperty$47.default)(this, "_treeIcon", void 0);
				this._lineStyle = style$1.lineStyle;
				this._lineColor = style$1.lineColor;
				this._lineWidth = style$1.lineWidth;
				this._treeIcon = style$1.treeIcon;
			}
			clone() {
				return new TreeStyle(this);
			}
			get lineStyle() {
				return this._lineStyle;
			}
			set lineStyle(lineStyle) {
				this._lineStyle = lineStyle;
				this.doChangeStyle();
			}
			get lineColor() {
				return this._lineColor;
			}
			set lineColor(lineColor) {
				this._lineColor = lineColor;
				this.doChangeStyle();
			}
			get lineWidth() {
				return this._lineWidth;
			}
			set lineWidth(lineWidth) {
				this._lineWidth = lineWidth;
				this.doChangeStyle();
			}
			get treeIcon() {
				return this._treeIcon;
			}
			set treeIcon(treeIcon) {
				this._treeIcon = treeIcon;
				this.doChangeStyle();
			}
		};

		//#endregion
		//#region src/js/columns/style.ts
		var style_exports$2 = {};
		__export(style_exports$2, {
			BaseStyle: () => BaseStyle,
			ButtonStyle: () => ButtonStyle,
			CheckStyle: () => CheckStyle,
			EVENT_TYPE: () => EVENT_TYPE$2,
			IconStyle: () => IconStyle,
			ImageStyle: () => ImageStyle,
			MenuStyle: () => MenuStyle,
			MultilineTextStyle: () => MultilineTextStyle,
			NumberStyle: () => NumberStyle,
			PercentCompleteBarStyle: () => PercentCompleteBarStyle,
			RadioStyle: () => RadioStyle,
			Style: () => Style$1,
			TreeStyle: () => TreeStyle,
			of: () => of$7
		});
		const { EVENT_TYPE: EVENT_TYPE$2 } = BaseStyle;
		function of$7(columnStyle, record, StyleClassDef = Style$1) {
			if (columnStyle) {
				if (columnStyle instanceof BaseStyle) return columnStyle;
				else if (typeof columnStyle === "function")
					return of$7(columnStyle(record), record, StyleClassDef);
				else if (record && columnStyle in record)
					return of$7(record[columnStyle], record, StyleClassDef);
				return new StyleClassDef(columnStyle);
			} else return StyleClassDef.DEFAULT;
		}

		//#endregion
		//#region src/js/columns/indicator/type.ts
		let DrawIndicatorKind = /* @__PURE__ */ (function (DrawIndicatorKind$1) {
			DrawIndicatorKind$1[(DrawIndicatorKind$1["topLeft"] = 0)] = "topLeft";
			DrawIndicatorKind$1[(DrawIndicatorKind$1["topRight"] = 1)] = "topRight";
			DrawIndicatorKind$1[(DrawIndicatorKind$1["bottomRight"] = 2)] = "bottomRight";
			DrawIndicatorKind$1[(DrawIndicatorKind$1["bottomLeft"] = 3)] = "bottomLeft";
			return DrawIndicatorKind$1;
		})({});

		//#endregion
		//#region src/js/columns/indicator/triangle.ts
		const KIND_PROCESS_MAP = {
			[DrawIndicatorKind.topLeft]: {
				themeColor(helper) {
					return helper.theme.indicators.topLeftColor;
				},
				themeSize(helper) {
					return helper.theme.indicators.topLeftSize;
				},
				drawPath(ctx, rect, size) {
					const baseLeft = rect.left + 1;
					const baseTop = rect.top + 1;
					ctx.moveTo(baseLeft, baseTop);
					ctx.lineTo(baseLeft + size, baseTop);
					ctx.lineTo(baseLeft, baseTop + size);
				}
			},
			[DrawIndicatorKind.topRight]: {
				themeColor(helper) {
					return helper.theme.indicators.topRightColor;
				},
				themeSize(helper) {
					return helper.theme.indicators.topRightSize;
				},
				drawPath(ctx, rect, size) {
					const baseRight = rect.right - 2;
					const baseTop = rect.top + 1;
					ctx.moveTo(baseRight, baseTop);
					ctx.lineTo(baseRight - size, baseTop);
					ctx.lineTo(baseRight, baseTop + size);
				}
			},
			[DrawIndicatorKind.bottomRight]: {
				themeColor(helper) {
					return helper.theme.indicators.bottomRightColor;
				},
				themeSize(helper) {
					return helper.theme.indicators.bottomRightSize;
				},
				drawPath(ctx, rect, size) {
					const baseRight = rect.right - 2;
					const baseBottom = rect.bottom - 2;
					ctx.moveTo(baseRight, baseBottom);
					ctx.lineTo(baseRight - size, baseBottom);
					ctx.lineTo(baseRight, baseBottom - size);
				}
			},
			[DrawIndicatorKind.bottomLeft]: {
				themeColor(helper) {
					return helper.theme.indicators.bottomLeftColor;
				},
				themeSize(helper) {
					return helper.theme.indicators.bottomLeftSize;
				},
				drawPath(ctx, rect, size) {
					const baseLeft = rect.left + 1;
					const baseBottom = rect.bottom - 2;
					ctx.moveTo(baseLeft, baseBottom);
					ctx.lineTo(baseLeft + size, baseBottom);
					ctx.lineTo(baseLeft, baseBottom - size);
				}
			}
		};
		function drawTriangleIndicator(context, style$1, kind, helper) {
			const process = KIND_PROCESS_MAP[kind];
			if (!process) return;
			helper.drawBorderWithClip(context, ctx => {
				const rect = context.getRect();
				const color =
					style$1.color ||
					helper.getColor(process.themeColor(helper), context.col, context.row, ctx);
				const size =
					(style$1.size && Number(style$1.size)) ||
					process.themeSize(helper) ||
					rect.height / 6;
				ctx.fillStyle = color;
				ctx.beginPath();
				process.drawPath(ctx, rect, size);
				ctx.closePath();
				ctx.fill();
			});
		}

		//#endregion
		//#region src/js/columns/indicator/handlers.ts
		function getDrawIndicator(indicatorStyle) {
			const { style: style$1 } = indicatorStyle;
			if (style$1 === "triangle") return drawTriangleIndicator;
			return null;
		}

		//#endregion
		//#region src/js/columns/type/BaseColumn.ts
		var import_defineProperty$46 = /* @__PURE__ */ __toESM(require_defineProperty());
		const { setReadonly } = obj;
		function isFadeinWhenCallbackInPromise(column, grid) {
			if (column.fadeinWhenCallbackInPromise != null)
				return column.fadeinWhenCallbackInPromise;
			return !!grid.configure("fadeinWhenCallbackInPromise");
		}
		function getFadeinState(grid) {
			let state = grid[COLUMN_FADEIN_STATE_ID];
			if (!state) {
				state = { cells: {} };
				setReadonly(grid, COLUMN_FADEIN_STATE_ID, state);
			}
			return state;
		}
		function _generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase) {
			return point => {
				const state = getFadeinState(grid);
				const stateKey = `${row}:${col}`;
				if (point === 1) delete state.cells[stateKey];
				else state.cells[stateKey] = { opacity: point };
				drawCellBase();
				drawInternal();
				const cellState = state.cells[stateKey];
				if (cellState) {
					const ctx = context.getContext();
					ctx.globalAlpha = 1 - cellState.opacity;
					try {
						drawCellBase();
					} finally {
						ctx.globalAlpha = 1;
					}
				}
			};
		}
		const fadeinMgr = {
			animate(grid, col, row, context, drawInternal, drawCellBase) {
				const state = getFadeinState(grid);
				const activeFadeins = [
					_generateFadeinPointAction(grid, col, row, context, drawInternal, drawCellBase)
				];
				state.activeFadeins = activeFadeins;
				animate(500, point => {
					activeFadeins.forEach(f => f(point));
					if (point === 1) delete state.activeFadeins;
				});
			},
			margeAnimate(grid, col, row, context, drawInternal, drawCellBase) {
				const state = getFadeinState(grid);
				if (state.activeFadeins)
					state.activeFadeins.push(
						_generateFadeinPointAction(
							grid,
							col,
							row,
							context,
							drawInternal,
							drawCellBase
						)
					);
				else drawInternal();
			}
		};
		var BaseColumn = class {
			constructor(option) {
				(0, import_defineProperty$46.default)(this, "_fadeinWhenCallbackInPromise", void 0);
				this.onDrawCell = this.onDrawCell.bind(this);
				this._fadeinWhenCallbackInPromise =
					option === null || option === void 0
						? void 0
						: option.fadeinWhenCallbackInPromise;
			}
			get fadeinWhenCallbackInPromise() {
				return this._fadeinWhenCallbackInPromise;
			}
			get StyleClass() {
				return BaseStyle;
			}
			onDrawCell(cellValue, info, context, grid) {
				const { style: style$1, getRecord, drawCellBase } = info;
				const helper = grid.getGridCanvasHelper();
				drawCellBase();
				const record = getRecord();
				let promise;
				if (isPromise(record)) promise = record;
				else if (isPromise(cellValue)) promise = cellValue;
				else {
					const msg = info.getMessage();
					if (isPromise(msg)) promise = msg;
				}
				if (promise) {
					const start = Date.now();
					return Promise.all([
						record,
						cellValue,
						promise.then(() => cellValue).then(() => info.getMessage())
					]).then(({ 0: record$1, 1: val, 2: message }) => {
						const currentContext = context.toCurrentContext();
						const drawRect = currentContext.getDrawRect();
						if (!drawRect) return;
						const time = Date.now() - start;
						const drawInternal = () => {
							const currentContext$1 = context.toCurrentContext();
							const drawRect$1 = currentContext$1.getDrawRect();
							if (!drawRect$1) return;
							const actStyle = of$7(style$1, record$1, this.StyleClass);
							this.drawInternal(
								this.convertInternal(val),
								currentContext$1,
								actStyle,
								helper,
								grid,
								info
							);
							this.drawMessageInternal(
								message,
								currentContext$1,
								actStyle,
								helper,
								grid,
								info
							);
							this.drawIndicatorsInternal(
								currentContext$1,
								actStyle,
								helper,
								grid,
								info
							);
						};
						if (!isFadeinWhenCallbackInPromise(this, grid)) drawInternal();
						else {
							const { col, row } = context;
							if (time < 80)
								fadeinMgr.margeAnimate(
									grid,
									col,
									row,
									context,
									drawInternal,
									drawCellBase
								);
							else
								fadeinMgr.animate(
									grid,
									col,
									row,
									context,
									drawInternal,
									drawCellBase
								);
						}
					});
				} else {
					var _COLUMN_FADEIN_STATE_;
					const actStyle = of$7(style$1, record, this.StyleClass);
					this.drawInternal(
						this.convertInternal(cellValue),
						context,
						actStyle,
						helper,
						grid,
						info
					);
					this.drawMessageInternal(
						info.getMessage(),
						context,
						actStyle,
						helper,
						grid,
						info
					);
					this.drawIndicatorsInternal(context, actStyle, helper, grid, info);
					const { col, row } = context;
					const stateKey = `${col}:${row}`;
					const cellState =
						(_COLUMN_FADEIN_STATE_ = grid[COLUMN_FADEIN_STATE_ID]) === null ||
						_COLUMN_FADEIN_STATE_ === void 0
							? void 0
							: _COLUMN_FADEIN_STATE_.cells[stateKey];
					if (cellState) {
						const ctx = context.getContext();
						ctx.globalAlpha = 1 - cellState.opacity;
						try {
							drawCellBase();
						} finally {
							ctx.globalAlpha = 1;
						}
					}
					return void 0;
				}
			}
			convertInternal(value) {
				return value != null ? value : "";
			}
			drawMessageInternal(message, context, style$1, helper, grid, info) {
				info.messageHandler.drawCellMessage(message, context, style$1, helper, grid, info);
			}
			drawIndicatorsInternal(context, style$1, helper, grid, info) {
				const {
					indicatorTopLeft,
					indicatorTopRight,
					indicatorBottomRight,
					indicatorBottomLeft
				} = style$1;
				for (const { 0: indicatorStyle, 1: kind } of [
					[indicatorTopLeft, DrawIndicatorKind.topLeft],
					[indicatorTopRight, DrawIndicatorKind.topRight],
					[indicatorBottomRight, DrawIndicatorKind.bottomRight],
					[indicatorBottomLeft, DrawIndicatorKind.bottomLeft]
				])
					if (indicatorStyle) {
						var _getDrawIndicator;
						(_getDrawIndicator = getDrawIndicator(indicatorStyle)) === null ||
							_getDrawIndicator === void 0 ||
							_getDrawIndicator(context, indicatorStyle, kind, helper, grid, info);
					}
			}
			bindGridEvent(_grid, _cellId) {
				return [];
			}
			getCopyCellValue(value, _grid, _cell) {
				return value;
			}
		};

		//#endregion
		//#region src/js/columns/style/BranchGraphStyle.ts
		var import_defineProperty$45 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$8;
		const DEFAULT_BRANCH_COLORS = (_name, index) => {
			switch (index % 3) {
				case 0:
					return "#979797";
				case 1:
					return "#008fb5";
				case 2:
					return "#f1c109";
				default:
			}
			return "#979797";
		};
		var BranchGraphStyle = class BranchGraphStyle extends BaseStyle {
			static get DEFAULT() {
				return defaultStyle$8 ? defaultStyle$8 : (defaultStyle$8 = new BranchGraphStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$45.default)(this, "_branchColors", void 0);
				(0, import_defineProperty$45.default)(this, "_margin", void 0);
				(0, import_defineProperty$45.default)(this, "_circleSize", void 0);
				(0, import_defineProperty$45.default)(this, "_branchLineWidth", void 0);
				(0, import_defineProperty$45.default)(this, "_mergeStyle", void 0);
				this._branchColors = style$1.branchColors || DEFAULT_BRANCH_COLORS;
				this._margin = style$1.margin || 4;
				this._circleSize = style$1.circleSize || 16;
				this._branchLineWidth = style$1.branchLineWidth || 4;
				this._mergeStyle = style$1.mergeStyle === "straight" ? "straight" : "bezier";
			}
			get branchColors() {
				return this._branchColors;
			}
			set branchColors(branchColors) {
				this._branchColors = branchColors;
				this.doChangeStyle();
			}
			get margin() {
				return this._margin;
			}
			set margin(margin) {
				this._margin = margin;
				this.doChangeStyle();
			}
			get circleSize() {
				return this._circleSize;
			}
			set circleSize(circleSize) {
				this._circleSize = circleSize;
				this.doChangeStyle();
			}
			get branchLineWidth() {
				return this._branchLineWidth;
			}
			set branchLineWidth(branchLineWidth) {
				this._branchLineWidth = branchLineWidth;
				this.doChangeStyle();
			}
			get mergeStyle() {
				return this._mergeStyle;
			}
			set mergeStyle(mergeStyle) {
				this._mergeStyle = mergeStyle;
				this.doChangeStyle();
			}
			clone() {
				return new BranchGraphStyle(this);
			}
		};

		//#endregion
		//#region src/js/columns/type/BranchGraphColumn.ts
		var import_defineProperty$44 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$6 = BRANCH_GRAPH_COLUMN_STATE_ID;
		function getAllColumnData(grid, field, callback) {
			const { dataSource } = grid;
			const allData = [];
			let promise;
			for (let index = 0; index < dataSource.length; index++) {
				const data = dataSource.getField(index, field);
				if (isPromise(data)) {
					const dataIndex = allData.length;
					allData.push(void 0);
					if (!promise)
						promise = data.then(d => {
							allData[dataIndex] = d;
						});
					else
						promise = promise
							.then(() => data)
							.then(d => {
								allData[dataIndex] = d;
							});
				} else allData.push(data);
			}
			if (promise) promise.then(() => callback(allData));
			else callback(allData);
		}
		var BranchLine = class {
			constructor({ fromIndex, toIndex, colorIndex, point }) {
				(0, import_defineProperty$44.default)(this, "fromIndex", void 0);
				(0, import_defineProperty$44.default)(this, "toIndex", void 0);
				(0, import_defineProperty$44.default)(this, "colorIndex", void 0);
				(0, import_defineProperty$44.default)(this, "point", void 0);
				this.fromIndex = fromIndex;
				this.toIndex = toIndex;
				this.colorIndex = colorIndex;
				this.point = point;
			}
		};
		var BranchPoint = class BranchPoint {
			constructor({ index, commit: commit$1 = false, lines = [], tag }) {
				(0, import_defineProperty$44.default)(this, "index", void 0);
				(0, import_defineProperty$44.default)(this, "commit", void 0);
				(0, import_defineProperty$44.default)(this, "lines", void 0);
				(0, import_defineProperty$44.default)(this, "tag", void 0);
				this.index = index;
				this.commit = commit$1;
				this.lines = lines;
				this.tag = tag;
			}
			static mergeLines(lines) {
				const result = lines.filter(l => l.fromIndex != null && l.toIndex != null);
				const fromList = lines.filter(l => l.fromIndex != null && l.toIndex == null);
				const toList = lines.filter(l => l.fromIndex == null && l.toIndex != null);
				fromList.forEach(f => {
					for (let i = 0; i < toList.length; i++) {
						const t = toList[i];
						if (t.point) continue;
						if (f.colorIndex === t.colorIndex) {
							f.toIndex = t.toIndex;
							toList.splice(i, 1);
							break;
						}
					}
					result.push(f);
				});
				return result.concat(toList);
			}
			static merge(a, b) {
				if (!a) return b;
				return new BranchPoint({
					index: a.index,
					commit: a.commit || b.commit,
					lines: BranchPoint.mergeLines(a.lines.concat(b.lines)),
					tag: a.tag || b.tag
				});
			}
		};
		function joinLine(timeline, branchIndex) {
			const reverse = [...timeline].reverse();
			for (let i = 0; i < reverse.length; i++) {
				const f = reverse[i][branchIndex];
				if (f) {
					f.lines = BranchPoint.mergeLines(
						f.lines.concat([
							new BranchLine({
								toIndex: branchIndex,
								colorIndex: branchIndex
							})
						])
					);
					for (let j = 0; j < i; j++) {
						const tl = reverse[j];
						tl[branchIndex] = new BranchPoint({
							index: branchIndex,
							lines: [
								new BranchLine({
									fromIndex: branchIndex,
									toIndex: branchIndex,
									colorIndex: branchIndex
								})
							]
						});
					}
					return true;
				}
			}
			return false;
		}
		function branch({ timeline, branches }, from, to) {
			const fromIndex = from != null ? branches.indexOf(from) : -1;
			let toIndex = branches.indexOf(to);
			if (toIndex < 0) {
				toIndex = branches.length;
				branches.push(to);
			}
			function findBranchRootIndex() {
				for (let index = timeline.length - 1; index >= 0; index--) {
					const tl = timeline[index];
					const from$1 = tl[fromIndex];
					if (from$1 && from$1.commit) return index;
				}
				return -1;
			}
			if (fromIndex < 0) return new BranchPoint({ index: toIndex });
			else {
				const fromTargetIndex = findBranchRootIndex();
				if (fromTargetIndex === -1) return null;
				const branchTargetFromIndex = fromTargetIndex + 1;
				const branchPoint = new BranchPoint({
					index: toIndex,
					lines: [
						new BranchLine({
							fromIndex,
							colorIndex: toIndex
						})
					]
				});
				let point;
				let result = null;
				if (branchTargetFromIndex < timeline.length) {
					const targetLine = timeline[branchTargetFromIndex];
					point = targetLine[toIndex] = BranchPoint.merge(
						targetLine[toIndex],
						branchPoint
					);
				} else {
					point = branchPoint;
					result = branchPoint;
				}
				const from$1 = timeline[fromTargetIndex][fromIndex];
				from$1.lines = BranchPoint.mergeLines(
					from$1.lines.concat([
						new BranchLine({
							toIndex,
							colorIndex: toIndex,
							point
						})
					])
				);
				return result;
			}
		}
		function commit({ timeline, branches }, name) {
			const index = branches.indexOf(name);
			if (index < 0) return null;
			const result = new BranchPoint({
				index,
				commit: true
			});
			if (joinLine(timeline, index))
				result.lines = BranchPoint.mergeLines(
					result.lines.concat([
						new BranchLine({
							fromIndex: index,
							colorIndex: index
						})
					])
				);
			return result;
		}
		function commitTag({ branches }, name, tag) {
			let index = branches.indexOf(name);
			if (index < 0) {
				index = branches.length;
				branches.push(name);
			}
			return new BranchPoint({
				index,
				tag
			});
		}
		function commitMerge({ timeline, branches }, from, to) {
			const fromIndex = branches.indexOf(from);
			const toIndex = branches.indexOf(to);
			if (toIndex < 0 || fromIndex < 0)
				return new BranchPoint({
					index: toIndex,
					commit: true
				});
			const result = new BranchPoint({
				index: toIndex,
				commit: true,
				lines: [
					new BranchLine({
						fromIndex,
						colorIndex: fromIndex
					}),
					new BranchLine({
						fromIndex: toIndex,
						colorIndex: toIndex
					})
				]
			});
			const fromList = [...timeline];
			const fromTargetLine = fromList.pop();
			if (fromTargetLine)
				fromTargetLine[fromIndex] = BranchPoint.merge(
					fromTargetLine[fromIndex],
					new BranchPoint({
						index: toIndex,
						lines: [
							new BranchLine({
								toIndex,
								colorIndex: fromIndex
							})
						]
					})
				);
			if (joinLine(fromList, fromIndex) && fromTargetLine)
				fromTargetLine[fromIndex].lines = BranchPoint.mergeLines(
					fromTargetLine[fromIndex].lines.concat([
						new BranchLine({
							fromIndex,
							colorIndex: fromIndex
						})
					])
				);
			joinLine(timeline, toIndex);
			return result;
		}
		function calcCommand(info, command) {
			const { timeline } = info;
			const timelineData = [];
			const commands = Array.isArray(command) ? command : [command];
			commands.forEach(cmd => {
				if (!cmd) return;
				let point;
				if (cmd.command === "branch") {
					const from = obj.isObject(cmd.branch) ? cmd.branch.from : null;
					const to = obj.isObject(cmd.branch) ? cmd.branch.to : cmd.branch;
					point = branch(info, from, to);
				} else if (cmd.command === "commit") {
					const { branch: branch$1 } = cmd;
					point = commit(info, branch$1);
				} else if (cmd.command === "merge") {
					const { from, to } = cmd.branch;
					point = commitMerge(info, from, to);
				} else if (cmd.command === "tag") {
					const { branch: branch$1, tag } = cmd;
					point = commitTag(info, branch$1, tag);
				}
				if (point && point.index > -1)
					timelineData[point.index] = BranchPoint.merge(timelineData[point.index], point);
			});
			timeline.push(timelineData);
		}
		function calcBranchesInfo(start, grid, field) {
			const result = {
				branches: [],
				timeline: []
			};
			getAllColumnData(grid, field, data => {
				if (start !== "top") data = [...data].reverse();
				data.forEach(command => {
					calcCommand(result, command);
				});
			});
			return result;
		}
		function calcBranchXPoints(ctx, left, width, radius, branches, timeline) {
			let w = Math.max(width / branches.length + 1, 5);
			timeline.forEach(tl => {
				tl.forEach((p, index) => {
					if (index <= 0) return;
					if (p.tag) {
						const textWidth = ctx.measureText(p.tag).width;
						if (w * index + radius * 2 + 4 + textWidth > width)
							w = Math.max((width - radius * 2 - 4 - textWidth) / index, 5);
					}
				});
			});
			const result = [];
			let x = left;
			branches.forEach(() => {
				result.push(Math.ceil(x + radius));
				x += w;
			});
			return result;
		}
		function renderMerge(
			grid,
			ctx,
			x,
			y,
			upLineIndex,
			downLineIndex,
			colorIndex,
			{ branchXPoints, branchColors, branchLineWidth, mergeStyle },
			{ col, row, branches }
		) {
			if (upLineIndex != null || downLineIndex != null) {
				ctx.strokeStyle = getOrApply(branchColors, branches[colorIndex], colorIndex);
				ctx.lineWidth = branchLineWidth;
				ctx.lineCap = "round";
				ctx.beginPath();
				if (upLineIndex != null) {
					const upX = branchXPoints[upLineIndex];
					const upRect = grid.getCellRelativeRect(col, row - 1);
					const upY = upRect.top + upRect.height / 2;
					ctx.moveTo(upX, upY);
					if (mergeStyle === "bezier")
						ctx.bezierCurveTo(upX, (y + upY) / 2, x, (y + upY) / 2, x, y);
					else ctx.lineTo(x, y);
				} else ctx.moveTo(x, y);
				if (downLineIndex != null) {
					const downX = branchXPoints[downLineIndex];
					const downRect = grid.getCellRelativeRect(col, row + 1);
					const downY = downRect.top + downRect.height / 2;
					if (mergeStyle === "bezier")
						ctx.bezierCurveTo(x, (y + downY) / 2, downX, (y + downY) / 2, downX, downY);
					else ctx.lineTo(downX, downY);
				}
				ctx.stroke();
			}
		}
		/**
		 * BranchGraphColumn
		 *
		 * Data commands
		 * - master branch or orphan branch
		 *
		 * ```js
		 * {
		 * 	command: 'branch',
		 * 	branch: 'branch name A',
		 * }
		 * ```
		 *
		 * - commit
		 *
		 * ```js
		 * {
		 * 	command: 'commit',
		 * 	branch: 'branch name A'
		 * }
		 * ```
		 *
		 * - branch
		 *
		 * ```js
		 * {
		 * 	command: 'branch',
		 * 	branch: {
		 * 		from: 'branch name A',
		 * 		to: 'branch name B'
		 * 	}
		 * }
		 * ```
		 *
		 * - merge
		 *
		 * ```js
		 * {
		 * 	command: 'merge',
		 * 	branch: {
		 * 		from: 'branch name B',
		 * 		to: 'branch name A'
		 * 	}
		 * }
		 * ```
		 *
		 * - tag
		 *
		 * ```js
		 * {
		 * 	command: 'tag',
		 * 	branch: 'branch name A',
		 * 	tag: 'tag name'
		 * }
		 * ```
		 *
		 * @memberof cheetahGrid.columns.type
		 */
		var BranchGraphColumn = class BranchGraphColumn extends BaseColumn {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$44.default)(this, "_start", void 0);
				(0, import_defineProperty$44.default)(this, "_cache", void 0);
				this._start = option.start || "bottom";
				this._cache = option.cache != null ? option.cache : false;
			}
			get StyleClass() {
				return BranchGraphStyle;
			}
			clearCache(grid) {
				const internal = grid;
				delete internal[_$6];
			}
			onDrawCell(cellValue, info, context, grid) {
				if (this._cache) {
					const state = grid[_$6] || (grid[_$6] = /* @__PURE__ */ new Map());
					const { col, row } = context;
					const field = grid.getField(col, row);
					if (!state.has(field))
						state.set(field, calcBranchesInfo(this._start, grid, field));
				}
				return super.onDrawCell(cellValue, info, context, grid);
			}
			clone() {
				return new BranchGraphColumn(this);
			}
			get start() {
				return this._start;
			}
			get cache() {
				return this._cache;
			}
			drawInternal(_value, context, style$1, helper, grid, { drawCellBase }) {
				var _ref, _grid$_;
				const { col, row } = context;
				const field = grid.getField(col, row);
				const { timeline, branches } =
					(_ref = this._cache
						? (_grid$_ = grid[_$6]) === null || _grid$_ === void 0
							? void 0
							: _grid$_.get(field)
						: null) !== null && _ref !== void 0
						? _ref
						: calcBranchesInfo(this._start, grid, field);
				const { upLineIndexKey, downLineIndexKey } =
					this._start !== "top"
						? {
								upLineIndexKey: "toIndex",
								downLineIndexKey: "fromIndex"
							}
						: {
								upLineIndexKey: "fromIndex",
								downLineIndexKey: "toIndex"
							};
				const data =
					this._start !== "top"
						? timeline[timeline.length - (row - grid.frozenRowCount) - 1]
						: timeline[row - grid.frozenRowCount];
				const {
					branchColors,
					branchLineWidth,
					circleSize,
					mergeStyle,
					margin,
					bgColor,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const rect = context.getRect();
				const radius = circleSize / 2;
				const width = rect.width - margin * 2;
				helper.drawWithClip(context, ctx => {
					ctx.textAlign = "left";
					ctx.textBaseline = "middle";
					const branchXPoints = calcBranchXPoints(
						ctx,
						rect.left + margin,
						width,
						radius,
						branches,
						timeline
					);
					const y = rect.top + rect.height / 2;
					data.map((point, index) =>
						point
							? point.lines.map(line => ({
									colorIndex: line.colorIndex,
									upLineIndex: line[upLineIndexKey],
									downLineIndex: line[downLineIndexKey],
									pointIndex: index
								}))
							: []
					)
						.reduce((p, c) => p.concat(c), [])
						.sort((a, b) => b.colorIndex - a.colorIndex)
						.forEach(line => {
							const x = branchXPoints[line.pointIndex];
							renderMerge(
								grid,
								ctx,
								x,
								y,
								line.upLineIndex,
								line.downLineIndex,
								line.colorIndex,
								{
									margin,
									branchXPoints,
									branchLineWidth,
									branchColors,
									mergeStyle
								},
								{
									width,
									col,
									row,
									branches
								}
							);
						});
					data.forEach((p, index) => {
						if (p && p.commit) {
							const x = branchXPoints[index];
							ctx.fillStyle = getOrApply(branchColors, branches[index], index);
							ctx.beginPath();
							ctx.arc(x, y, radius, 0, Math.PI * 2, true);
							ctx.fill();
							ctx.closePath();
						}
					});
					data.forEach((p, index) => {
						if (p && p.tag) {
							ctx.fillStyle = getOrApply(branchColors, branches[index], index);
							ctx.fillText(p.tag, branchXPoints[index] + radius + 4, y);
						}
					});
				});
			}
		};

		//#endregion
		//#region src/js/internal/icons.ts
		const ICON_PROP_KEYS = [
			"content",
			"font",
			"color",
			"className",
			"tagName",
			"isLiga",
			"width",
			"src",
			"svg",
			"name",
			"path",
			"offsetTop",
			"offsetLeft"
		];
		function quote(name) {
			const quoted = [];
			const split = name.split(/,\s*/);
			for (let i = 0; i < split.length; i++) {
				const part = split[i].replace(/['"]/g, "");
				if (part.indexOf(" ") === -1 && !/^\d/.test(part)) quoted.push(part);
				else quoted.push(`'${part}'`);
			}
			return quoted.join(",");
		}
		const doms = {};
		const props = {};
		function getIconProps(tagName, className) {
			const tagProps = props[tagName] || (props[tagName] = {});
			if (tagProps[className]) return tagProps[className];
			const dom = doms[tagName] || (doms[tagName] = document.createElement(tagName));
			dom.className = className;
			dom.classList.add("cheetah-grid-icon");
			document.body.appendChild(dom);
			try {
				const beforeStyle = (document.defaultView || window).getComputedStyle(
					dom,
					"::before"
				);
				let content = beforeStyle.getPropertyValue("content");
				if (content.length >= 3 && (content[0] === '"' || content[0] === "'")) {
					if (content[0] === content[content.length - 1]) content = content.slice(1, -1);
				}
				let font = beforeStyle.getPropertyValue("font");
				if (!font)
					font = `${beforeStyle.getPropertyValue("font-style")} ${beforeStyle.getPropertyValue("font-variant")} ${beforeStyle.getPropertyValue("font-weight")} ${beforeStyle.getPropertyValue("font-size")}/${beforeStyle.getPropertyValue("line-height")} ${quote(beforeStyle.getPropertyValue("font-family"))}`;
				const color = beforeStyle.getPropertyValue("color");
				const width = dom.clientWidth;
				const isLiga =
					(beforeStyle.getPropertyValue("font-feature-settings") || "").indexOf("liga") >
					-1;
				return (tagProps[className] = {
					content,
					font,
					color,
					width,
					isLiga
				});
			} finally {
				document.body.removeChild(dom);
			}
		}
		function toPropArray(prop, count) {
			const result = [];
			if (Array.isArray(prop)) {
				result.push(...prop);
				for (let i = prop.length; i < count; i++) result.push(null);
			} else for (let i = 0; i < count; i++) result.push(prop);
			return result;
		}
		function toSimpleArray(iconProps) {
			if (!iconProps) return iconProps;
			else if (Array.isArray(iconProps)) return iconProps;
			const workData = {};
			let count = 0;
			ICON_PROP_KEYS.forEach(k => {
				const prop = iconProps[k];
				if (prop)
					if (Array.isArray(prop)) count = Math.max(count, prop.length);
					else count = Math.max(count, 1);
			});
			ICON_PROP_KEYS.forEach(k => {
				const arr = toPropArray(iconProps[k], count);
				workData[k] = arr;
			});
			const result = [];
			for (let i = 0; i < count; i++) {
				const data = {};
				ICON_PROP_KEYS.forEach(k => {
					const val = workData[k][i];
					data[k] = val;
				});
				result.push(data);
			}
			return result;
		}
		function normalize$1(iconProps) {
			const data = {};
			for (const k in iconProps) {
				if (k === "className") continue;
				if (isIconKey(k)) data[k] = iconProps[k];
			}
			if (iconProps.className) {
				const prop = getIconProps(iconProps.tagName || "i", iconProps.className);
				for (const k in prop)
					if (isIconKey(k)) {
						if (iconProps[k] == null) data[k] = prop[k];
					}
			}
			return data;
		}
		function toNormalizeArray(iconProps) {
			const icons$2 = toSimpleArray(iconProps);
			if (!icons$2) return icons$2;
			return icons$2.map(icon$1 => normalize$1(icon$1));
		}
		const iconPropKeys = ICON_PROP_KEYS;
		function isIconKey(k) {
			return ICON_PROP_KEYS.indexOf(k) >= 0;
		}

		//#endregion
		//#region src/js/columns/type/columnUtils.ts
		function loadIcons(icon$1, context, helper, callback) {
			let argIcon = void 0;
			if (icon$1)
				if (isPromise(icon$1))
					icon$1.then(i => {
						loadIcons(i, context.toCurrentContext(), helper, callback);
					});
				else {
					const iconList = toNormalizeArray(icon$1);
					iconList.forEach(i => {
						if (i.font && i.content) helper.testFontLoad(i.font, i.content, context);
					});
					argIcon = iconList;
				}
			callback(argIcon, context);
		}

		//#endregion
		//#region src/js/columns/type/Column.ts
		var Column = class Column extends BaseColumn {
			get StyleClass() {
				return Style$1;
			}
			clone() {
				return new Column(this);
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					color,
					font,
					bgColor,
					padding,
					textOverflow,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const textValue = value != null ? String(value) : "";
				helper.testFontLoad(font, textValue, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					helper.text(textValue, context$1, {
						textAlign,
						textBaseline,
						color,
						font,
						padding,
						textOverflow,
						icons: icons$2
					});
				});
			}
		};

		//#endregion
		//#region src/js/columns/type/ButtonColumn.ts
		var import_defineProperty$43 = /* @__PURE__ */ __toESM(require_defineProperty());
		var ButtonColumn = class ButtonColumn extends Column {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$43.default)(this, "_caption", void 0);
				this._caption = option.caption;
			}
			get StyleClass() {
				return ButtonStyle;
			}
			get caption() {
				return this._caption;
			}
			withCaption(caption) {
				const c = this.clone();
				c._caption = caption;
				return c;
			}
			clone() {
				return new ButtonColumn(this);
			}
			convertInternal(value) {
				return this._caption || super.convertInternal(value);
			}
			getCopyCellValue(value) {
				return this._caption || value;
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					bgColor,
					color,
					buttonBgColor,
					font,
					padding,
					textOverflow,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const textValue = value != null ? String(value) : "";
				helper.testFontLoad(font, textValue, context);
				const { col, row } = context;
				const range = grid.getCellRange(col, row);
				let active = false;
				const state = grid[BUTTON_COLUMN_STATE_ID];
				if (state)
					if (
						state.mouseActiveCell &&
						cellInRange(range, state.mouseActiveCell.col, state.mouseActiveCell.row)
					)
						active = true;
					else {
						const { select } = context.getSelection();
						if (cellInRange(range, select.col, select.row)) active = true;
					}
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					helper.button(textValue, context$1, {
						textAlign,
						textBaseline,
						bgColor: buttonBgColor,
						color,
						font,
						padding,
						shadow: active
							? {
									color: "rgba(0, 0, 0, 0.48)",
									blur: 6,
									offsetY: 3
								}
							: {},
						textOverflow,
						icons: icons$2
					});
				});
			}
		};

		//#endregion
		//#region src/js/columns/utils/index.ts
		function toBoolean(val) {
			if (typeof val === "string") {
				if (val === "false") return false;
				else if (val === "off") return false;
				else if (/^0+$/.exec(val)) return false;
			}
			return Boolean(val);
		}

		//#endregion
		//#region src/js/columns/type/CheckColumn.ts
		var CheckColumn = class CheckColumn extends BaseColumn {
			get StyleClass() {
				return CheckStyle;
			}
			clone() {
				return new CheckColumn(this);
			}
			convertInternal(value) {
				return toBoolean(value);
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase }) {
				var _grid$CHECK_COLUMN_ST;
				const {
					textAlign,
					textBaseline,
					padding,
					borderColor,
					checkBgColor,
					uncheckBgColor,
					bgColor,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const { col, row } = context;
				const range = grid.getCellRange(col, row);
				const cellKey = `${range.start.col}:${range.start.row}`;
				const elapsed =
					(_grid$CHECK_COLUMN_ST = grid[CHECK_COLUMN_STATE_ID]) === null ||
					_grid$CHECK_COLUMN_ST === void 0
						? void 0
						: _grid$CHECK_COLUMN_ST.elapsed[cellKey];
				const opt = {
					textAlign,
					textBaseline,
					borderColor,
					checkBgColor,
					uncheckBgColor,
					padding
				};
				if (elapsed != null) opt.animElapsedTime = elapsed;
				helper.checkbox(value, context, opt);
			}
		};

		//#endregion
		//#region src/js/columns/type/IconColumn.ts
		var import_defineProperty$42 = /* @__PURE__ */ __toESM(require_defineProperty());
		function repeatArray(val, count) {
			if (count === Infinity) count = 0;
			const a = [];
			for (let i = 0; i < count; i++) a.push(val);
			return a;
		}
		var IconColumn = class IconColumn extends Column {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$42.default)(this, "_tagName", void 0);
				(0, import_defineProperty$42.default)(this, "_className", void 0);
				(0, import_defineProperty$42.default)(this, "_content", void 0);
				(0, import_defineProperty$42.default)(this, "_name", void 0);
				(0, import_defineProperty$42.default)(this, "_iconWidth", void 0);
				this._tagName = option.tagName || "i";
				this._className = option.className;
				this._content = option.content;
				this._name = option.name;
				this._iconWidth = option.iconWidth;
			}
			get StyleClass() {
				return IconStyle;
			}
			clone() {
				return new IconColumn(this);
			}
			get tagName() {
				return this._tagName;
			}
			get className() {
				return this._className;
			}
			get content() {
				return this._content;
			}
			get name() {
				return this._name;
			}
			get iconWidth() {
				return this._iconWidth;
			}
			drawInternal(value, context, style$1, helper, grid, info) {
				const num = Number(value);
				if (!isNaN(num)) {
					const icon$1 = {};
					iconPropKeys.forEach(k => {
						icon$1[k] = style$1[k];
					});
					icon$1.className = this._className;
					icon$1.tagName = this._tagName;
					if (this._content) icon$1.content = this._content;
					icon$1.name = this._name;
					if (this._iconWidth) icon$1.width = this._iconWidth;
					info.getIcon = () => repeatArray(icon$1, num);
				} else info.getIcon = () => null;
				super.drawInternal("", context, style$1, helper, grid, info);
			}
		};

		//#endregion
		//#region src/js/internal/Rect.ts
		var import_defineProperty$41 = /* @__PURE__ */ __toESM(require_defineProperty());
		var Rect = class Rect {
			constructor(left, top, width, height) {
				(0, import_defineProperty$41.default)(this, "_left", void 0);
				(0, import_defineProperty$41.default)(this, "_top", void 0);
				(0, import_defineProperty$41.default)(this, "_width", void 0);
				(0, import_defineProperty$41.default)(this, "_height", void 0);
				(0, import_defineProperty$41.default)(this, "_right", void 0);
				(0, import_defineProperty$41.default)(this, "_bottom", void 0);
				this._left = left;
				this._top = top;
				this._width = width;
				this._height = height;
			}
			static bounds(left, top, right, bottom) {
				return new Rect(left, top, right - left, bottom - top);
			}
			static max(rect1, rect2) {
				return Rect.bounds(
					Math.min(rect1.left, rect2.left),
					Math.min(rect1.top, rect2.top),
					Math.max(rect1.right, rect2.right),
					Math.max(rect1.bottom, rect2.bottom)
				);
			}
			get left() {
				return this._left;
			}
			set left(left) {
				const { right } = this;
				this._left = left;
				this.right = right;
			}
			get top() {
				return this._top;
			}
			set top(top) {
				const { bottom } = this;
				this._top = top;
				this.bottom = bottom;
			}
			get width() {
				return this._width;
			}
			set width(width) {
				this._width = width;
				this._right = void 0;
			}
			get height() {
				return this._height;
			}
			set height(height) {
				this._height = height;
				this._bottom = void 0;
			}
			get right() {
				return this._right !== void 0
					? this._right
					: (this._right = this.left + this.width);
			}
			set right(right) {
				this._right = right;
				this.width = right - this.left;
			}
			get bottom() {
				return this._bottom !== void 0
					? this._bottom
					: (this._bottom = this.top + this.height);
			}
			set bottom(bottom) {
				this._bottom = bottom;
				this.height = bottom - this.top;
			}
			offsetLeft(offset) {
				this._left += offset;
				this._right = void 0;
			}
			offsetTop(offset) {
				this._top += offset;
				this._bottom = void 0;
			}
			copy() {
				return new Rect(this.left, this.top, this.width, this.height);
			}
			intersection(rect) {
				const x0 = Math.max(this.left, rect.left);
				const x1 = Math.min(this.left + this.width, rect.left + rect.width);
				if (x0 <= x1) {
					const y0 = Math.max(this.top, rect.top);
					const y1 = Math.min(this.top + this.height, rect.top + rect.height);
					if (y0 <= y1) return Rect.bounds(x0, y0, x1, y1);
				}
				return null;
			}
			contains(another) {
				return (
					this.left <= another.left &&
					this.left + this.width >= another.left + another.width &&
					this.top <= another.top &&
					this.top + this.height >= another.top + another.height
				);
			}
			inPoint(x, y) {
				return (
					this.left <= x &&
					this.left + this.width >= x &&
					this.top <= y &&
					this.top + this.height >= y
				);
			}
		};

		//#endregion
		//#region src/js/internal/canvases.ts
		const fontSizeCache = {};
		function getFontSize(ctx, font) {
			const fontName = font || ctx.font;
			if (fontSizeCache[fontName]) return fontSizeCache[fontName];
			const bk = ctx.font;
			ctx.canvas.style.letterSpacing = "normal";
			try {
				ctx.font = fontName;
				const em = ctx.measureText("あ").width;
				return (fontSizeCache[fontName] = {
					width: em,
					height: em
				});
			} finally {
				ctx.canvas.style.letterSpacing = "";
				ctx.font = bk;
			}
		}
		function calcBasePosition(
			ctx,
			rect,
			{
				offset = 0,
				padding: {
					left: paddingLeft = 0,
					right: paddingRight = 0,
					top: paddingTop = 0,
					bottom: paddingBottom = 0
				} = {}
			} = {}
		) {
			return calcStartPosition(ctx, rect, 0, 0, {
				offset,
				padding: {
					left: paddingLeft,
					right: paddingRight,
					top: paddingTop,
					bottom: paddingBottom
				}
			});
		}
		function calcStartPosition(
			ctx,
			rect,
			width,
			height,
			{
				offset = 0,
				padding: {
					left: paddingLeft = 0,
					right: paddingRight = 0,
					top: paddingTop = 0,
					bottom: paddingBottom = 0
				} = {}
			} = {}
		) {
			const textAlign = ctx.textAlign || "left";
			const textBaseline = ctx.textBaseline || "middle";
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			let x = rect.left + offset + paddingLeft;
			if (textAlign === "right" || textAlign === "end")
				x = rect.right - width - offset - paddingRight;
			else if (textAlign === "center")
				x = rect.left + (rect.width - width + paddingLeft - paddingRight) / 2;
			let y = rect.top + offset + paddingTop;
			if (
				textBaseline === "bottom" ||
				textBaseline === "alphabetic" ||
				textBaseline === "ideographic"
			)
				y = rect.bottom - height - offset - paddingBottom;
			else if (textBaseline === "middle")
				y = rect.top + (rect.height - height + paddingTop - paddingBottom) / 2;
			return {
				x,
				y
			};
		}

		//#endregion
		//#region src/js/internal/LRUCache.ts
		var import_defineProperty$40 = /* @__PURE__ */ __toESM(require_defineProperty());
		var LRUCache = class {
			constructor(cacheSize) {
				(0, import_defineProperty$40.default)(this, "_list", void 0);
				(0, import_defineProperty$40.default)(this, "_map", void 0);
				(0, import_defineProperty$40.default)(this, "_cacheSize", void 0);
				this._list = [];
				this._map = {};
				this._cacheSize = cacheSize || 50;
			}
			get(key) {
				const val = this._map[key];
				if (val) {
					const list = this._list;
					const idx = list.indexOf(key);
					list.splice(idx, 1);
					list.push(key);
				}
				return val;
			}
			put(key, value) {
				const list = this._list;
				const map = this._map;
				if (map[key]) {
					const idx = list.indexOf(key);
					list.splice(idx, 1);
				}
				map[key] = value;
				list.push(key);
				if (list.length > this._cacheSize) {
					const remKey = list.shift() || "";
					delete map[remKey];
				}
			}
		};

		//#endregion
		//#region src/js/internal/imgs.ts
		const allCache = {};
		function loadImage(src) {
			if (typeof Promise === "undefined") {
				console.error("Promise is not loaded. load Promise before this process.");
				return {
					then() {
						return this;
					}
				};
			}
			const img = new Image();
			const result = new Promise(resolve => {
				img.onload = () => {
					resolve(img);
				};
			});
			img.onerror = () => {
				const url = src.length > 200 ? `${src.slice(0, 200)}...` : src;
				console.warn(`cannot load: ${url}`);
				throw new Error(`IMAGE LOAD ERROR: ${url}`);
			};
			img.src = src;
			return result;
		}
		function getCacheOrLoad0(cache, src) {
			return then(src, src$1 => {
				const c = cache.get(src$1);
				if (c) return c;
				const result = loadImage(src$1).then(img => {
					cache.put(src$1, img);
					return img;
				});
				cache.put(src$1, result);
				return result;
			});
		}
		function getCacheOrLoad(cacheName, cacheSize, src) {
			const cache = allCache[cacheName] || (allCache[cacheName] = new LRUCache(cacheSize));
			return getCacheOrLoad0(cache, src);
		}

		//#endregion
		//#region src/js/columns/type/ImageColumn.ts
		const MAX_LRU_CACHE_SIZE = 50;
		function getImage(url) {
			return getCacheOrLoad("ImageColumn", MAX_LRU_CACHE_SIZE, url);
		}
		function calcKeepAspectRatioSize(width, height, maxWidth, maxHeight) {
			let newWidth = width;
			let newHeight = height;
			if (newWidth > maxWidth) {
				newWidth = maxWidth;
				newHeight = (newWidth * height) / width;
			}
			if (newHeight > maxHeight) {
				newHeight = maxHeight;
				newWidth = (newHeight * width) / height;
			}
			return {
				width: newWidth,
				height: newHeight
			};
		}
		var ImageColumn = class ImageColumn extends BaseColumn {
			get StyleClass() {
				return ImageStyle;
			}
			onDrawCell(cellValue, info, context, grid) {
				return super.onDrawCell(getImage(cellValue), info, context, grid);
			}
			clone() {
				return new ImageColumn(this);
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase }) {
				const { textAlign, textBaseline, padding, margin, bgColor, visibility } = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				if (value)
					helper.drawWithClip(context, ctx => {
						ctx.textAlign = textAlign;
						ctx.textBaseline = textBaseline;
						let rect = context.getRect();
						if (padding) {
							const paddingNums = helper.toBoxPixelArray(padding, context, void 0);
							const left = rect.left + paddingNums[3];
							const top = rect.top + paddingNums[0];
							const width = rect.width - paddingNums[1] - paddingNums[3];
							const height = rect.height - paddingNums[0] - paddingNums[2];
							rect = new Rect(left, top, width, height);
						}
						if (style$1.imageSizing === "keep-aspect-ratio") {
							const { width, height } = calcKeepAspectRatioSize(
								value.width,
								value.height,
								rect.width - margin * 2,
								rect.height - margin * 2
							);
							const pos = calcStartPosition(ctx, rect, width, height, {
								offset: margin
							});
							ctx.drawImage(
								value,
								0,
								0,
								value.width,
								value.height,
								pos.x,
								pos.y,
								width,
								height
							);
						} else
							ctx.drawImage(
								value,
								0,
								0,
								value.width,
								value.height,
								rect.left + margin,
								rect.top + margin,
								rect.width - margin * 2,
								rect.height - margin * 2
							);
					});
			}
		};

		//#endregion
		//#region src/js/internal/menu-items.ts
		/** @private */
		function extend$1(a, b) {
			const o = {};
			for (const k in a) o[k] = a[k];
			for (const k in b) o[k] = b[k];
			return o;
		}
		/**
		 * Normalize the given menu options.
		 * @param {*} options menu options to given
		 * @returns {Array} Normalized options
		 * @private
		 */
		function normalize(options) {
			if (!options) return [];
			if (Array.isArray(options))
				return options.map(e => extend$1(e, { label: e.caption || e.label }));
			if (typeof options === "string") return normalize(JSON.parse(options));
			const result = [];
			for (const k in options)
				result.push({
					value: k,
					label: options[k]
				});
			return result;
		}
		/**
		 * Normalize the given menu options.
		 * @param {*} options menu options to given
		 * @returns {Array} Normalized options
		 * @private
		 */
		function normalizeToFn(options) {
			if (typeof options === "function") return record => normalize(options(record));
			return () => normalize(options);
		}

		//#endregion
		//#region src/js/columns/type/MenuColumn.ts
		var import_defineProperty$39 = /* @__PURE__ */ __toESM(require_defineProperty());
		var MenuColumn = class MenuColumn extends BaseColumn {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$39.default)(this, "_options", void 0);
				this._options = normalize(option.options);
			}
			get StyleClass() {
				return MenuStyle;
			}
			clone() {
				return new MenuColumn(this);
			}
			get options() {
				return this._options;
			}
			withOptions(options) {
				const c = this.clone();
				c._options = normalize(options);
				return c;
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					font,
					bgColor,
					padding,
					textOverflow,
					appearance,
					visibility
				} = style$1;
				let { color } = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const convertedValue = this._convertInternal(value);
				const text = convertedValue != null ? String(convertedValue) : "";
				helper.testFontLoad(font, text, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					const basePadding = helper.toBoxPixelArray(padding || 0, context$1, font);
					const textPadding = basePadding.slice(0);
					textPadding[1] += 26;
					const iconPadding = basePadding.slice(0);
					iconPadding[1] += 8;
					if (color == null && (value == null || value === ""))
						color = "rgba(0, 0, 0, .38)";
					helper.text(text, context$1, {
						textAlign,
						textBaseline,
						color,
						font,
						padding: textPadding,
						textOverflow,
						icons: icons$2
					});
					if (appearance === "menulist-button")
						helper.text("", context$1, {
							textAlign: "right",
							textBaseline,
							color,
							font,
							icons: [
								{
									path: "M0 2 5 7 10 2z",
									width: 10,
									color: "rgba(0, 0, 0, .54)"
								}
							],
							padding: iconPadding
						});
					else if (appearance !== "none")
						console.warn(`unsupported appearance:${appearance}`);
				});
			}
			convertInternal(value) {
				return value;
			}
			_convertInternal(value) {
				const options = this._options;
				for (let i = 0; i < options.length; i++) {
					const option = options[i];
					if (option.value === value) {
						value = option.label;
						break;
					}
				}
				return super.convertInternal(value);
			}
			getCopyCellValue(value) {
				return this._convertInternal(value);
			}
		};

		//#endregion
		//#region src/js/columns/type/MultilineTextColumn.ts
		var MultilineTextColumn = class MultilineTextColumn extends BaseColumn {
			constructor(option = {}) {
				super(option);
			}
			get StyleClass() {
				return MultilineTextStyle;
			}
			clone() {
				return new MultilineTextColumn(this);
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					color,
					font,
					bgColor,
					padding,
					lineHeight,
					autoWrapText,
					lineClamp,
					textOverflow,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const textValue = value != null ? String(value) : "";
				const lines = textValue.replace(/\r?\n/g, "\n").replace(/\r/g, "\n").split("\n");
				helper.testFontLoad(font, textValue, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					helper.multilineText(lines, context$1, {
						textAlign,
						textBaseline,
						color,
						font,
						padding,
						lineHeight,
						autoWrapText,
						lineClamp,
						textOverflow,
						icons: icons$2
					});
				});
			}
		};

		//#endregion
		//#region src/js/columns/type/NumberColumn.ts
		var import_defineProperty$38 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultFormat;
		var NumberColumn = class NumberColumn extends Column {
			static get defaultFormat() {
				return defaultFormat || (defaultFormat = new Intl.NumberFormat());
			}
			static set defaultFormat(fmt) {
				defaultFormat = fmt;
			}
			/**
			 * @deprecated Use defaultFormat instead
			 */
			static get defaultFotmat() {
				return this.defaultFormat;
			}
			/**
			 * @deprecated Use defaultFormat instead
			 */
			static set defaultFotmat(fmt) {
				this.defaultFormat = fmt;
			}
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$38.default)(this, "_format", void 0);
				this._format = option.format;
			}
			get StyleClass() {
				return NumberStyle;
			}
			clone() {
				return new NumberColumn(this);
			}
			get format() {
				return this._format;
			}
			withFormat(format) {
				const c = this.clone();
				c._format = format;
				return c;
			}
			convertInternal(value) {
				const num = Number(value);
				if (isNaN(num)) {
					const convertedValue = super.convertInternal(value);
					return convertedValue != null ? String(convertedValue) : "";
				}
				const format = this._format || NumberColumn.defaultFormat;
				return format.format(num);
			}
		};

		//#endregion
		//#region src/js/columns/type/PercentCompleteBarColumn.ts
		var import_defineProperty$37 = /* @__PURE__ */ __toESM(require_defineProperty());
		const MARGIN = 2;
		var PercentCompleteBarColumn = class PercentCompleteBarColumn extends Column {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$37.default)(this, "_min", void 0);
				(0, import_defineProperty$37.default)(this, "_max", void 0);
				(0, import_defineProperty$37.default)(this, "_formatter", void 0);
				this._min = option.min || 0;
				this._max = option.max || this._min + 100;
				this._formatter = option.formatter || (v => v);
			}
			get StyleClass() {
				return PercentCompleteBarStyle;
			}
			clone() {
				return new PercentCompleteBarColumn(this);
			}
			get min() {
				return this.min;
			}
			get max() {
				return this.max;
			}
			get formatter() {
				return this.formatter;
			}
			drawInternal(value, context, style$1, helper, grid, info) {
				super.drawInternal(this._formatter(value), context, style$1, helper, grid, info);
				const { barColor, barBgColor, barHeight, visibility } = style$1;
				if (visibility === "hidden") return;
				let textValue = value != null ? String(value) : "";
				if (str.endsWith(textValue, "%")) textValue = textValue.slice(0, -1);
				const num = Number(textValue);
				if (isNaN(num)) return;
				const rate =
					num < this._min
						? 0
						: num > this._max
							? 1
							: (num - this._min) / (this._max - this._min);
				helper.drawWithClip(context, ctx => {
					const rect = context.getRect();
					const barMaxWidth = rect.width - MARGIN * 2 - 1;
					const barTop = rect.bottom - MARGIN - barHeight - 1;
					const barLeft = rect.left + MARGIN;
					ctx.fillStyle = getOrApply(barBgColor, rate * 100) || "#f0f3f5";
					ctx.beginPath();
					ctx.rect(barLeft, barTop, barMaxWidth, barHeight);
					ctx.fill();
					const barSize = Math.min(barMaxWidth * rate, barMaxWidth);
					ctx.fillStyle = getOrApply(barColor, rate * 100) || "#20a8d8";
					ctx.beginPath();
					ctx.rect(barLeft, barTop, barSize, barHeight);
					ctx.fill();
				});
			}
		};

		//#endregion
		//#region src/js/columns/type/RadioColumn.ts
		var RadioColumn = class RadioColumn extends BaseColumn {
			get StyleClass() {
				return RadioStyle;
			}
			clone() {
				return new RadioColumn(this);
			}
			convertInternal(value) {
				return toBoolean(value);
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase }) {
				var _grid$RADIO_COLUMN_ST;
				const {
					textAlign,
					textBaseline,
					padding,
					checkColor,
					uncheckBorderColor,
					checkBorderColor,
					uncheckBgColor,
					checkBgColor,
					bgColor,
					visibility
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				if (visibility === "hidden") return;
				const { col, row } = context;
				const range = grid.getCellRange(col, row);
				const cellKey = `${range.start.col}:${range.start.row}`;
				const elapsed =
					(_grid$RADIO_COLUMN_ST = grid[RADIO_COLUMN_STATE_ID]) === null ||
					_grid$RADIO_COLUMN_ST === void 0
						? void 0
						: _grid$RADIO_COLUMN_ST.elapsed[cellKey];
				const opt = {
					textAlign,
					textBaseline,
					checkColor,
					uncheckBorderColor,
					checkBorderColor,
					uncheckBgColor,
					checkBgColor,
					padding
				};
				if (elapsed != null) opt.animElapsedTime = elapsed;
				helper.radioButton(value, context, opt);
			}
		};

		//#endregion
		//#region src/js/plugins/icons.ts
		const icons = {};

		//#endregion
		//#region src/js/icons.ts
		const builtins = {
			get arrow_upward() {
				return {
					d: "M8 24l2.83 2.83L22 15.66V40h4V15.66l11.17 11.17L40 24 24 8 8 24z",
					width: 48,
					height: 48
				};
			},
			get arrow_downward() {
				return {
					d: "M40 24l-2.82-2.82L26 32.34V8h-4v24.34L10.84 21.16 8 24l16 16 16-16z",
					width: 48,
					height: 48
				};
			},
			get edit() {
				return {
					d: "M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z",
					width: 48,
					height: 48
				};
			},
			get add() {
				return {
					d: "M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z",
					width: 48,
					height: 48
				};
			},
			get star() {
				return {
					d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
					width: 24,
					height: 24
				};
			},
			get star_border() {
				return {
					d: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
					width: 24,
					height: 24
				};
			},
			get star_half() {
				return {
					d: "M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z",
					width: 24,
					height: 24
				};
			},
			get keyboard_arrow_down() {
				return {
					d: "M14.83 16.42L24 25.59l9.17-9.17L36 19.25l-12 12-12-12z",
					width: 48,
					height: 48
				};
			},
			get keyboard_arrow_left() {
				return {
					d: "M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z",
					width: 48,
					height: 48
				};
			},
			get keyboard_arrow_right() {
				return {
					d: "M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z",
					width: 48,
					height: 48
				};
			},
			get keyboard_arrow_up() {
				return {
					d: "M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z",
					width: 48,
					height: 48
				};
			},
			get chevron_left() {
				return {
					d: "M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z",
					width: 48,
					height: 48
				};
			},
			get chevron_right() {
				return {
					d: "M20 12l-2.83 2.83L26.34 24l-9.17 9.17L20 36l12-12z",
					width: 48,
					height: 48
				};
			},
			get expand_less() {
				return {
					d: "M24 16L12 28l2.83 2.83L24 21.66l9.17 9.17L36 28z",
					width: 48,
					height: 48
				};
			},
			get expand_more() {
				return {
					d: "M33.17 17.17L24 26.34l-9.17-9.17L12 20l12 12 12-12z",
					width: 48,
					height: 48
				};
			}
		};
		function get() {
			return extend(builtins, icons);
		}

		//#endregion
		//#region src/js/internal/path2DManager.ts
		var path2DManager_exports = {};
		__export(path2DManager_exports, { fill: () => fill });
		function fill(pathModule, ctx, x, y, w, h) {
			ctx.save();
			try {
				const { width, height } = pathModule;
				const { ud: upsideDown, x: offsetX = 0, y: offsetY = 0 } = pathModule;
				w = w || width;
				h = h || height;
				const xrate = w / width;
				const yrate = h / (upsideDown ? -height : height);
				x = x || 0;
				y = upsideDown ? (y || 0) + -height * yrate : y || 0;
				ctx.translate(x, y);
				ctx.scale(xrate, yrate);
				if (offsetX !== 0 || offsetY !== 0) ctx.translate(offsetX, offsetY);
				const path2d = (pathModule.path2d = pathModule.path2d || new Path2D(pathModule.d));
				ctx.fill(path2d);
			} finally {
				ctx.restore();
			}
		}

		//#endregion
		//#region src/js/element/Inline.ts
		var import_defineProperty$36 = /* @__PURE__ */ __toESM(require_defineProperty());
		function getWidth(ctx, content) {
			return ctx.measureText(content).width;
		}
		function breakWidth(ctx, content, itr, candidateIndex, width) {
			const chars = [];
			let ret = itr.next();
			for (let i = 0; i < candidateIndex && ret !== null; i++, ret = itr.next())
				chars.push(ret);
			let beforeWidth = getWidth(ctx, chars.join(""));
			if (beforeWidth > width)
				while (chars.length) {
					const c = chars.pop();
					beforeWidth -= getWidth(ctx, c || "");
					if (beforeWidth <= width) break;
				}
			else if (beforeWidth < width)
				while (ret !== null) {
					const charWidth = getWidth(ctx, ret);
					if (beforeWidth + charWidth > width) break;
					chars.push(ret);
					beforeWidth += charWidth;
					ret = itr.next();
				}
			const beforeContent = chars.join("").replace(/\s+$/, "");
			const afterContent = content.slice(beforeContent.length).replace(/^\s+/, "");
			return {
				before: beforeContent ? new Inline(beforeContent) : null,
				after: afterContent ? new Inline(afterContent) : null
			};
		}
		var Inline = class Inline {
			constructor(content) {
				(0, import_defineProperty$36.default)(this, "_content", void 0);
				this._content = content != null ? content : "";
			}
			width({ ctx }) {
				return getWidth(ctx, this._content);
			}
			font() {
				return null;
			}
			color() {
				return null;
			}
			canDraw() {
				return true;
			}
			onReady(_callback) {}
			draw({
				ctx,
				canvashelper,
				rect,
				offset,
				offsetLeft,
				offsetRight,
				offsetTop,
				offsetBottom
			}) {
				canvashelper.fillTextRect(
					ctx,
					this._content,
					rect.left,
					rect.top,
					rect.width,
					rect.height,
					{
						offset: offset + 1,
						padding: {
							left: offsetLeft,
							right: offsetRight,
							top: offsetTop,
							bottom: offsetBottom
						}
					}
				);
			}
			canBreak() {
				return !!this._content;
			}
			splitIndex(index) {
				const content = this._content;
				const itr = str.genChars(content);
				const chars = [];
				let ret = itr.next();
				for (let i = 0; i < index && ret !== null; i++, ret = itr.next()) chars.push(ret);
				const beforeContent = chars.join("");
				const afterContent = content.slice(beforeContent.length);
				return {
					before: beforeContent ? new Inline(beforeContent) : null,
					after: afterContent ? new Inline(afterContent) : null
				};
			}
			breakWord(ctx, width) {
				const content = this._content;
				const allWidth = this.width({ ctx });
				const candidate = Math.floor((this._content.length * width) / allWidth);
				const itr = str.genWords(content);
				return breakWidth(ctx, content, itr, candidate, width);
			}
			breakAll(ctx, width) {
				const content = this._content;
				const allWidth = this.width({ ctx });
				const candidate = Math.floor((this._content.length * width) / allWidth);
				const itr = str.genChars(content);
				return breakWidth(ctx, content, itr, candidate, width);
			}
			toString() {
				return this._content;
			}
		};

		//#endregion
		//#region src/js/element/InlineDrawer.ts
		var import_defineProperty$35 = /* @__PURE__ */ __toESM(require_defineProperty());
		var InlineDrawer = class extends Inline {
			constructor({ draw, width, color }) {
				super();
				(0, import_defineProperty$35.default)(this, "_draw", void 0);
				(0, import_defineProperty$35.default)(this, "_width", void 0);
				(0, import_defineProperty$35.default)(this, "_color", void 0);
				this._draw = draw;
				this._width = width;
				this._color = color;
			}
			width(_arg) {
				return this._width;
			}
			font() {
				return null;
			}
			color() {
				var _this$_color;
				return (_this$_color = this._color) !== null && _this$_color !== void 0
					? _this$_color
					: null;
			}
			canDraw() {
				return true;
			}
			onReady(_callback) {}
			draw({
				ctx,
				canvashelper,
				rect,
				offset,
				offsetLeft,
				offsetRight,
				offsetTop,
				offsetBottom
			}) {
				this._draw({
					ctx,
					canvashelper,
					rect,
					offset,
					offsetLeft,
					offsetRight,
					offsetTop,
					offsetBottom
				});
			}
			canBreak() {
				return false;
			}
			toString() {
				return "";
			}
		};

		//#endregion
		//#region src/js/internal/fonts.ts
		const loads = {};
		let load;
		let check;
		if (isNode) {
			load = function (_font, _testStr, callback) {
				callback();
			};
			check = function () {
				return false;
			};
		} else {
			const fontFaceSet = document.fonts;
			load = function (font, _testStr, callback) {
				if (loads.all || loads[font]) {
					callback();
					return;
				}
				fontFaceSet.ready.then(() => {
					loads.all = true;
				});
				fontFaceSet.load(font).then(() => {
					loads[font] = true;
					callback();
				});
			};
			check = function (font, testStr) {
				if (loads.all || loads[font]) return true;
				if (!fontFaceSet.check(font)) {
					load(font, testStr, () => {});
					return false;
				}
				return true;
			};
		}

		//#endregion
		//#region src/js/element/InlineIcon.ts
		var import_defineProperty$34 = /* @__PURE__ */ __toESM(require_defineProperty());
		var InlineIcon = class extends Inline {
			constructor(icon$1) {
				super();
				(0, import_defineProperty$34.default)(this, "_icon", void 0);
				this._icon = icon$1 || {};
			}
			width({ ctx }) {
				const icon$1 = this._icon;
				if (icon$1.width) return icon$1.width;
				if (icon$1.font && check(icon$1.font, icon$1.content || "")) {
					ctx.save();
					ctx.canvas.style.letterSpacing = "normal";
					try {
						ctx.font = icon$1.font || ctx.font;
						return ctx.measureText(icon$1.content || "").width;
					} finally {
						ctx.canvas.style.letterSpacing = "";
						ctx.restore();
					}
				}
				return 0;
			}
			font() {
				var _this$_icon$font;
				return (_this$_icon$font = this._icon.font) !== null && _this$_icon$font !== void 0
					? _this$_icon$font
					: null;
			}
			color() {
				var _this$_icon$color;
				return (_this$_icon$color = this._icon.color) !== null &&
					_this$_icon$color !== void 0
					? _this$_icon$color
					: null;
			}
			canDraw() {
				const icon$1 = this._icon;
				return icon$1.font ? check(icon$1.font, icon$1.content || "") : true;
			}
			onReady(callback) {
				const icon$1 = this._icon;
				if (icon$1.font && !check(icon$1.font, icon$1.content || ""))
					load(icon$1.font, icon$1.content || "", callback);
			}
			draw({
				ctx,
				canvashelper,
				rect,
				offset,
				offsetLeft,
				offsetRight,
				offsetTop,
				offsetBottom
			}) {
				const icon$1 = this._icon;
				if (icon$1.content) {
					ctx.canvas.style.letterSpacing = "normal";
					try {
						ctx.font = ctx.font;
						canvashelper.fillTextRect(
							ctx,
							icon$1.content,
							rect.left,
							rect.top,
							rect.width,
							rect.height,
							{
								offset: offset + 1,
								padding: {
									left: offsetLeft + (this._icon.offsetLeft || 0),
									right: offsetRight,
									top: offsetTop + (this._icon.offsetTop || 0),
									bottom: offsetBottom
								}
							}
						);
					} finally {
						ctx.canvas.style.letterSpacing = "";
					}
				}
			}
			canBreak() {
				return false;
			}
			toString() {
				return "";
			}
		};

		//#endregion
		//#region src/js/element/InlineImage.ts
		var import_defineProperty$33 = /* @__PURE__ */ __toESM(require_defineProperty());
		var InlineImage = class extends Inline {
			constructor({ src, width, height, imageLeft, imageTop, imageWidth, imageHeight }) {
				super();
				(0, import_defineProperty$33.default)(this, "_src", void 0);
				(0, import_defineProperty$33.default)(this, "_width", void 0);
				(0, import_defineProperty$33.default)(this, "_height", void 0);
				(0, import_defineProperty$33.default)(this, "_imageLeft", void 0);
				(0, import_defineProperty$33.default)(this, "_imageTop", void 0);
				(0, import_defineProperty$33.default)(this, "_imageWidth", void 0);
				(0, import_defineProperty$33.default)(this, "_imageHeight", void 0);
				(0, import_defineProperty$33.default)(this, "_onloaded", void 0);
				(0, import_defineProperty$33.default)(this, "_inlineImgPromise", null);
				(0, import_defineProperty$33.default)(this, "_inlineImg", null);
				this._src = src;
				this._width = width;
				this._height = height;
				this._imageLeft = imageLeft;
				this._imageTop = imageTop;
				this._imageWidth = imageWidth;
				this._imageHeight = imageHeight;
				this._onloaded = [];
				if (isPromise(src))
					src.then(s => {
						this._src = s;
						this._loadImage(s);
					});
				else this._loadImage(src);
			}
			_loadImage(src) {
				const img = (this._inlineImgPromise = getCacheOrLoad("InlineImage", 50, src));
				if (isPromise(img))
					img.then(i => {
						this._inlineImg = i;
						this._onloaded.forEach(fn => fn());
					});
				else this._inlineImg = img;
			}
			width(_arg) {
				var _this$_inlineImg$widt, _this$_inlineImg;
				return (
					this._width ||
					((_this$_inlineImg$widt =
						(_this$_inlineImg = this._inlineImg) === null || _this$_inlineImg === void 0
							? void 0
							: _this$_inlineImg.width) !== null && _this$_inlineImg$widt !== void 0
						? _this$_inlineImg$widt
						: 0)
				);
			}
			font() {
				return null;
			}
			color() {
				return null;
			}
			canDraw() {
				return !!this._inlineImg;
			}
			onReady(callback) {
				if (isPromise(this._src) || isPromise(this._inlineImgPromise))
					this._onloaded.push(() => callback());
			}
			draw({
				ctx,
				canvashelper,
				rect,
				offset,
				offsetLeft,
				offsetRight,
				offsetTop,
				offsetBottom
			}) {
				const img = this._inlineImg;
				canvashelper.drawInlineImageRect(
					ctx,
					img,
					this._imageLeft || 0,
					this._imageTop || 0,
					this._imageWidth || img.width,
					this._imageHeight || img.height,
					this._width || img.width,
					this._height || img.height,
					rect.left,
					rect.top,
					rect.width,
					rect.height,
					{
						offset: offset + 1,
						padding: {
							left: offsetLeft,
							right: offsetRight,
							top: offsetTop,
							bottom: offsetBottom
						}
					}
				);
			}
			canBreak() {
				return false;
			}
			toString() {
				return "";
			}
		};

		//#endregion
		//#region src/js/element/InlinePath2D.ts
		var import_defineProperty$32 = /* @__PURE__ */ __toESM(require_defineProperty());
		var InlinePath2D = class extends Inline {
			constructor({ path, width, height, color }) {
				super();
				(0, import_defineProperty$32.default)(this, "_path", void 0);
				(0, import_defineProperty$32.default)(this, "_width", void 0);
				(0, import_defineProperty$32.default)(this, "_height", void 0);
				(0, import_defineProperty$32.default)(this, "_color", void 0);
				this._path = new Path2D(path);
				this._width = width;
				this._height = height;
				this._color = color;
			}
			width(_arg) {
				return this._width;
			}
			font() {
				return null;
			}
			color() {
				var _this$_color;
				return (_this$_color = this._color) !== null && _this$_color !== void 0
					? _this$_color
					: null;
			}
			canDraw() {
				return true;
			}
			onReady(_callback) {}
			draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
				offset++;
				const padding = {
					left: offsetLeft,
					right: offsetRight,
					top: offsetTop,
					bottom: offsetBottom
				};
				ctx.save();
				try {
					ctx.beginPath();
					ctx.rect(rect.left, rect.top, rect.width, rect.height);
					ctx.clip();
					const pos = calcStartPosition(ctx, rect, this._width, this._height, {
						offset,
						padding
					});
					ctx.translate(pos.x, pos.y);
					ctx.fill(this._path);
				} finally {
					ctx.restore();
				}
			}
			canBreak() {
				return false;
			}
			toString() {
				return "";
			}
		};

		//#endregion
		//#region src/js/element/InlineSvg.ts
		function buildSvgDataUrl(svg) {
			const data = typeof svg === "string" ? svg : new XMLSerializer().serializeToString(svg);
			const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(data)}`;
			return url;
		}
		function getSvgElement(svg) {
			if (typeof svg === "string") {
				const parser = new DOMParser();
				return parser.parseFromString(svg, "image/svg+xml").children[0];
			} else return svg;
		}
		var InlineSvg = class extends InlineImage {
			constructor({ svg, width, height }) {
				var _svgElem$getAttribute, _svgElem$getAttribute2;
				const svgElem = then(svg, getSvgElement);
				const elmWidth = !isPromise(svgElem)
					? (_svgElem$getAttribute = svgElem.getAttribute("width")) !== null &&
						_svgElem$getAttribute !== void 0
						? _svgElem$getAttribute
						: void 0
					: void 0;
				const elmHeight = !isPromise(svgElem)
					? (_svgElem$getAttribute2 = svgElem.getAttribute("height")) !== null &&
						_svgElem$getAttribute2 !== void 0
						? _svgElem$getAttribute2
						: void 0
					: void 0;
				const numElmWidth = elmWidth != null ? Number(elmWidth) : void 0;
				const numElmHeight = elmHeight != null ? Number(elmHeight) : void 0;
				super({
					src: then(svg, buildSvgDataUrl),
					width: width || numElmWidth,
					height: height || numElmHeight,
					imageWidth: numElmWidth,
					imageHeight: numElmHeight
				});
			}
			canBreak() {
				return false;
			}
			toString() {
				return "";
			}
		};

		//#endregion
		//#region src/js/element/inlines.ts
		function drawRegisteredIcon(
			ctx,
			icon$1,
			drawWidth,
			drawHeight,
			left,
			top,
			width,
			height,
			{ offset = 2, padding } = {}
		) {
			const rect = {
				left,
				top,
				width,
				height,
				right: left + width,
				bottom: top + height
			};
			ctx.save();
			try {
				ctx.beginPath();
				ctx.rect(rect.left, rect.top, rect.width, rect.height);
				ctx.clip();
				const pos = calcStartPosition(ctx, rect, drawWidth, drawHeight, {
					offset,
					padding
				});
				fill(icon$1, ctx, pos.x, pos.y, drawWidth, drawHeight);
			} finally {
				ctx.restore();
			}
		}
		function isIconConstructorOption(icon$1) {
			if (icon$1.font && icon$1.content) return true;
			return false;
		}
		function isInlineImageConstructorOption(icon$1) {
			if (icon$1.src) return true;
			return false;
		}
		function isInlineSvgConstructorOption(icon$1) {
			if (icon$1.path) return true;
			return false;
		}
		function iconOf(icon$1) {
			if (icon$1 instanceof Inline) return icon$1;
			if (!icon$1) return null;
			if (isIconConstructorOption(icon$1)) return new InlineIcon(icon$1);
			if (isInlineImageConstructorOption(icon$1))
				return new InlineImage({
					src: icon$1.src,
					width: icon$1.width,
					height: icon$1.width
				});
			if (icon$1.svg)
				return new InlineSvg({
					svg: icon$1.svg,
					width: icon$1.width,
					height: icon$1.width
				});
			if (isInlineSvgConstructorOption(icon$1))
				return new InlinePath2D({
					path: icon$1.path,
					width: icon$1.width,
					height: icon$1.width,
					color: icon$1.color
				});
			const registeredIcons = get();
			if (icon$1.name && registeredIcons[icon$1.name]) {
				const registeredIcon = registeredIcons[icon$1.name];
				const width = icon$1.width || Math.max(registeredIcon.width, registeredIcon.height);
				return new InlineDrawer({
					draw({ ctx, rect, offset, offsetLeft, offsetRight, offsetTop, offsetBottom }) {
						drawRegisteredIcon(
							ctx,
							registeredIcon,
							width,
							width,
							rect.left,
							rect.top,
							rect.width,
							rect.height,
							{
								offset: offset + 1,
								padding: {
									left: offsetLeft,
									right: offsetRight,
									top: offsetTop,
									bottom: offsetBottom
								}
							}
						);
					},
					width,
					height: width,
					color: icon$1.color
				});
			}
			return new InlineIcon(icon$1);
		}
		function of$6(content) {
			if (content == null) return null;
			if (content instanceof Inline) return content;
			return new Inline(content);
		}
		function buildInlines$1(icons$2, inline) {
			const result = [];
			if (icons$2)
				result.push(...icons$2.map(icon$1 => iconOf(icon$1)).filter(i => i != null));
			if (Array.isArray(inline))
				result.push(...inline.map(il => of$6(il)).filter(i => i != null));
			else {
				const il = of$6(inline);
				if (il) result.push(il);
			}
			return result;
		}
		function string(inline) {
			return buildInlines$1(void 0, inline).join("");
		}

		//#endregion
		//#region src/js/ts-types-internal/grid-engine.ts
		let TreeLineKind = /* @__PURE__ */ (function (TreeLineKind$1) {
			TreeLineKind$1[(TreeLineKind$1["none"] = 0)] = "none";
			TreeLineKind$1[(TreeLineKind$1["vertical"] = 1)] = "vertical";
			TreeLineKind$1[(TreeLineKind$1["last"] = 2)] = "last";
			TreeLineKind$1[(TreeLineKind$1["start"] = 3)] = "start";
			TreeLineKind$1[(TreeLineKind$1["verticalBranch"] = 4)] = "verticalBranch";
			TreeLineKind$1[(TreeLineKind$1["horizontal"] = 5)] = "horizontal";
			TreeLineKind$1[(TreeLineKind$1["horizontalBranch"] = 6)] = "horizontalBranch";
			TreeLineKind$1[(TreeLineKind$1["lone"] = 7)] = "lone";
			return TreeLineKind$1;
		})({});

		//#endregion
		//#region src/js/columns/type/TreeColumn.ts
		var import_defineProperty$31 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$5 = TREE_COLUMN_STATE_ID;
		var TreeColumn = class TreeColumn extends Column {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$31.default)(this, "_cache", void 0);
				this._cache = option.cache != null ? option.cache : false;
			}
			get StyleClass() {
				return TreeStyle;
			}
			clearCache(grid) {
				const internal = grid;
				if (!internal[_$5]) return;
				delete internal[_$5].cache;
			}
			get drawnIconActionArea() {
				return param => {
					const internal = param.grid;
					const state = internal[_$5];
					if (!(state === null || state === void 0 ? void 0 : state.drawnIcons))
						return false;
					const drawnIcons = state.drawnIcons;
					return drawnIcons.area(param);
				};
			}
			onDrawCell(cellValue, info, context, grid) {
				const state = grid[_$5] || (grid[_$5] = {});
				if (this._cache && !state.cache) {
					const cache = state.cache || (state.cache = /* @__PURE__ */ new Map());
					const { col, row } = context;
					const field = grid.getField(col, row);
					if (!cache.has(field)) cache.set(field, new TreeColumnInfo(grid, field));
				}
				return super.onDrawCell(cellValue, info, context, grid);
			}
			clone() {
				return new TreeColumn(this);
			}
			get cache() {
				return this._cache;
			}
			getCopyCellValue(value) {
				const treeData = getTreeDataFromValue(value);
				return treeData.caption;
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase, getIcon }) {
				var _ref, _state$cache;
				const { textAlign, textBaseline, bgColor, padding, color, font, textOverflow } =
					style$1;
				if (bgColor) drawCellBase({ bgColor });
				const state = grid[_$5] || (grid[_$5] = {});
				if (state.drawnIcons) {
					const drawnIcons = state.drawnIcons;
					drawnIcons.delete(context);
				}
				const { col, row } = context;
				const field = grid.getField(col, row);
				const tci =
					(_ref = this._cache
						? (_state$cache = state.cache) === null || _state$cache === void 0
							? void 0
							: _state$cache.get(field)
						: null) !== null && _ref !== void 0
						? _ref
						: new TreeColumnInfo(grid, field);
				const info = tci.getInfo(value, row);
				helper.testFontLoad(font, info.caption, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					const rect = context$1.getRect();
					const basePadding = helper.toBoxPixelArray(padding || 0, context$1, font);
					const nestLevel = info.path.length;
					helper.drawWithClip(context$1, ctx => {
						const fontSize = getFontSize(ctx, font);
						const indentSize = fontSize.width;
						const top = rect.top + basePadding[0];
						const left = rect.left + basePadding[3];
						const height = rect.height - basePadding[0] - basePadding[2];
						const lineBaseline =
							textBaseline !== null && textBaseline !== void 0
								? textBaseline
								: ctx.textBaseline || "middle";
						let hLineY = top + height / 2;
						if (
							lineBaseline === "bottom" ||
							lineBaseline === "alphabetic" ||
							lineBaseline === "ideographic"
						)
							hLineY = top + height - fontSize.height / 2;
						else if (textBaseline === "middle") hLineY = top + height / 2;
						else hLineY = top + fontSize.height / 2;
						const definedTreeIcon =
							style$1.treeIcon ||
							helper.getStyleProperty(helper.theme.tree.treeIcon, col, row, ctx);
						const treeIcon =
							definedTreeIcon === "none"
								? null
								: definedTreeIcon === "chevron_right" ||
									  definedTreeIcon === "expand_more"
									? {
											name: definedTreeIcon,
											width: fontSize.width
										}
									: definedTreeIcon;
						let iconRect = null;
						if (treeIcon) {
							ctx.save();
							try {
								const treeLineLeft = left + indentSize * (nestLevel - 1);
								const vLineX = treeLineLeft + indentSize / 2;
								const size = iconOf(treeIcon).width({ ctx });
								iconRect = new Rect(
									vLineX - size / 2,
									hLineY - size / 2,
									size,
									size
								);
							} finally {
								ctx.restore();
							}
							const drawnIcons =
								state.drawnIcons || (state.drawnIcons = new DrawnIcons());
							drawnIcons.set(context$1, iconRect);
						}
						const lineStyle = style$1.lineStyle || helper.theme.tree.lineStyle;
						if (lineStyle !== "none") {
							const lineWidth = style$1.lineWidth || helper.theme.tree.lineWidth;
							const lineColor =
								style$1.lineColor ||
								helper.getColor(helper.theme.tree.lineColor, col, row, ctx);
							ctx.save();
							try {
								ctx.strokeStyle = lineColor;
								ctx.lineWidth = lineWidth;
								ctx.lineCap = "round";
								if (iconRect) {
									ctx.beginPath();
									ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
									ctx.rect(
										iconRect.right,
										iconRect.top,
										-iconRect.width,
										iconRect.height
									);
									ctx.clip();
								}
								info.getLines().forEach((line, index) => {
									const treeLineLeft = left + indentSize * index;
									const vLineX = treeLineLeft + indentSize / 2;
									const treeLineRight = treeLineLeft + indentSize;
									if (line !== TreeLineKind.none) {
										ctx.beginPath();
										if (line === TreeLineKind.vertical) {
											ctx.moveTo(vLineX, rect.top);
											ctx.lineTo(vLineX, rect.bottom);
										} else if (line === TreeLineKind.last) {
											ctx.moveTo(vLineX, rect.top);
											ctx.lineTo(vLineX, hLineY);
											ctx.lineTo(treeLineRight, hLineY);
										} else if (line === TreeLineKind.start) {
											ctx.moveTo(treeLineRight, hLineY);
											ctx.lineTo(vLineX, hLineY);
											ctx.lineTo(vLineX, rect.bottom);
										} else if (line === TreeLineKind.verticalBranch) {
											ctx.moveTo(vLineX, rect.top);
											ctx.lineTo(vLineX, rect.bottom);
											ctx.moveTo(vLineX, hLineY);
											ctx.lineTo(treeLineRight, hLineY);
										} else if (line === TreeLineKind.horizontal) {
											ctx.moveTo(treeLineLeft, hLineY);
											ctx.lineTo(treeLineRight, hLineY);
										} else if (line === TreeLineKind.horizontalBranch) {
											ctx.moveTo(treeLineLeft, hLineY);
											ctx.lineTo(treeLineRight, hLineY);
											ctx.moveTo(vLineX, hLineY);
											ctx.lineTo(vLineX, rect.bottom);
										} else if (line === TreeLineKind.lone) {
											ctx.moveTo(vLineX, hLineY);
											ctx.lineTo(treeLineRight, hLineY);
										}
										ctx.stroke();
									}
								});
							} finally {
								ctx.restore();
							}
						}
						if (treeIcon) {
							const iconLeftOffset = indentSize * (nestLevel - 1);
							const iconWidth = indentSize;
							const iconPadding = basePadding.slice(0);
							iconPadding[3] += iconLeftOffset;
							iconPadding[1] = rect.width - iconWidth - iconPadding[3];
							helper.text("", context$1, {
								textAlign: "center",
								textBaseline,
								color,
								font,
								icons: [treeIcon],
								padding: iconPadding
							});
						}
						const textPadding = basePadding.slice(0);
						textPadding[3] += nestLevel * indentSize;
						helper.text(info.caption, context$1, {
							textAlign,
							textBaseline,
							color,
							font,
							padding: textPadding,
							textOverflow,
							icons: icons$2
						});
					});
				});
			}
		};
		/**
		 * If the cell is a TreeColumn, gets the tree node information from the given cell.
		 */
		function getTreeNodeInfoAt({ grid, col, row }) {
			const field = grid.getField(col, row);
			if (!field)
				return {
					hasChildren: false,
					nodeType: "leaf"
				};
			const { dataSource } = grid;
			const currIndex = grid.getRecordIndexByRow(row);
			const value = dataSource.getField(currIndex, field);
			const treeData = getTreeDataFromValue(value);
			const hasChildren = hasChildrenByRecord(treeData, dataSource, field, currIndex);
			return {
				nodeType: hasChildren ? "branch" : treeData.nodeType || "leaf",
				hasChildren
			};
		}
		function hasChildrenByRecord(treeData, dataSource, field, recordIndex) {
			const next = dataSource.getField(recordIndex + 1, field);
			if (!next || isPromise(next)) return false;
			const nextParentPath = getParentPath(next);
			return (
				treeData.path.length === nextParentPath.length &&
				nextParentPath.every((p, i) => p === treeData.path[i])
			);
		}
		var TreeColumnInfo = class {
			constructor(grid, field) {
				(0, import_defineProperty$31.default)(this, "_cache", {});
				(0, import_defineProperty$31.default)(this, "_grid", void 0);
				(0, import_defineProperty$31.default)(this, "_field", void 0);
				this._grid = grid;
				this._field = field;
			}
			getInfo(value, row) {
				const { _field: field, _grid: grid, _cache: cache } = this;
				const currIndex = grid.getRecordIndexByRow(row);
				const { dataSource } = grid;
				const treeData = getTreeDataFromValue(value);
				const hasChildren = hasChildrenByRecord(treeData, dataSource, field, currIndex);
				return {
					caption: treeData.caption,
					path: treeData.path,
					getLines() {
						const currPath = [];
						const parentPath = treeData.path.slice(0, -1);
						const parentLines = parentPath.map((p, index) => {
							currPath.push(p);
							const isLast = index === parentPath.length - 1;
							if (hasNextSiblingWithCache(currPath))
								return isLast ? TreeLineKind.verticalBranch : TreeLineKind.vertical;
							else return isLast ? TreeLineKind.last : TreeLineKind.none;
						});
						let selfLine;
						if (hasChildren)
							selfLine =
								parentPath.length > 0
									? TreeLineKind.horizontalBranch
									: TreeLineKind.start;
						else
							selfLine =
								parentPath.length > 0 ? TreeLineKind.horizontal : TreeLineKind.lone;
						return parentLines.concat(selfLine);
					}
				};
				function hasNextSiblingWithCache(parentPath) {
					const has = hasNextSiblingFromCache(currIndex, parentPath.length);
					if (has != null) return has;
					const result = hasNextSibling(parentPath);
					for (let index = currIndex; index < result.end; index++)
						setNextSiblingToCache(index, parentPath.length, result.has);
					return result.has;
				}
				function hasNextSiblingFromCache(index, level) {
					const { hasNextSiblings } =
						cache[index] || (cache[index] = { hasNextSiblings: [] });
					return hasNextSiblings[level];
				}
				function setNextSiblingToCache(index, level, value$1) {
					const { hasNextSiblings } =
						cache[index] || (cache[index] = { hasNextSiblings: [] });
					hasNextSiblings[level] = value$1;
				}
				function hasNextSibling(parentPath) {
					const startIndex = currIndex + 1;
					for (let index = startIndex; index < dataSource.length; index++) {
						const data = dataSource.getField(index, field);
						if (isPromise(data))
							return {
								end: index,
								has: false
							};
						const nextPath = getParentPath(data);
						if (!nextPath.length)
							return {
								end: index,
								has: false
							};
						if (parentPath.every((p, i) => p === nextPath[i])) {
							if (parentPath.length < nextPath.length) {
								const has = hasNextSiblingFromCache(index, parentPath.length);
								if (has != null)
									return {
										end: index,
										has
									};
								continue;
							}
							return {
								end: index,
								has: true
							};
						}
						return {
							end: index,
							has: false
						};
					}
					return {
						end: dataSource.length,
						has: false
					};
				}
			}
		};
		function getTreeDataFromValue(value) {
			if (value != null)
				if (Array.isArray(value)) return getTreeDataFromValue({ path: value });
				else {
					var _ref2, _value$caption;
					if (Array.isArray(value.path))
						return {
							caption: String(
								(_ref2 =
									(_value$caption = value.caption) !== null &&
									_value$caption !== void 0
										? _value$caption
										: value.path[value.path.length - 1]) !== null &&
									_ref2 !== void 0
									? _ref2
									: ""
							),
							path: value.path,
							nodeType: value.nodeType
						};
					if (typeof value.path === "function")
						return getTreeDataFromValue({
							...value,
							path: value.path()
						});
				}
			return {
				caption: String(value !== null && value !== void 0 ? value : ""),
				path: [value]
			};
		}
		function getParentPath(value) {
			return getTreeDataFromValue(value).path.slice(0, -1);
		}
		var DrawnIcons = class {
			constructor() {
				(0, import_defineProperty$31.default)(
					this,
					"_drawnIcons",
					/* @__PURE__ */ new Map()
				);
			}
			set(cell, clipRect) {
				this._drawnIcons.set(`${cell.col}:${cell.row}`, clipRect);
			}
			delete(cell) {
				this._drawnIcons.delete(`${cell.col}:${cell.row}`);
			}
			area({ col, row, pointInDrawingCanvas: point }) {
				const key = `${col}:${row}`;
				const rect = this._drawnIcons.get(key);
				if (!rect) return false;
				return (
					rect.left <= point.x &&
					point.x <= rect.right &&
					rect.top <= point.y &&
					point.y <= rect.bottom
				);
			}
		};

		//#endregion
		//#region src/js/columns/type.ts
		var type_exports$1 = {};
		__export(type_exports$1, {
			BranchGraphColumn: () => BranchGraphColumn,
			ButtonColumn: () => ButtonColumn,
			CheckColumn: () => CheckColumn,
			Column: () => Column,
			IconColumn: () => IconColumn,
			ImageColumn: () => ImageColumn,
			MenuColumn: () => MenuColumn,
			MultilineTextColumn: () => MultilineTextColumn,
			NumberColumn: () => NumberColumn,
			PercentCompleteBarColumn: () => PercentCompleteBarColumn,
			RadioColumn: () => RadioColumn,
			TreeColumn: () => TreeColumn,
			of: () => of$5
		});
		const TYPES$1 = {
			DEFAULT: new Column(),
			NUMBER: new NumberColumn(),
			CHECK: new CheckColumn(),
			RADIO: new RadioColumn(),
			BUTTON: new ButtonColumn(),
			IMAGE: new ImageColumn(),
			MULTILINETEXT: new MultilineTextColumn()
		};
		function of$5(columnType) {
			if (!columnType) return TYPES$1.DEFAULT;
			else if (typeof columnType === "string") {
				const key = columnType.toUpperCase();
				return TYPES$1[key] || of$5(null);
			} else return columnType;
		}

		//#endregion
		//#region src/js/columns/action/InlineMenuEditor.ts
		var import_defineProperty$30 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$4 = INLINE_MENU_EDITOR_STATE_ID;
		function getState$3(grid) {
			let state = grid[_$4];
			if (!state) {
				state = {};
				obj.setReadonly(grid, _$4, state);
			}
			return state;
		}
		let globalElement$1 = null;
		let bindGridCount$1 = 0;
		function attachMenu(grid, cell, editor, value, record) {
			const state = getState$3(grid);
			if (!globalElement$1) globalElement$1 = new InlineMenuElement();
			if (!state.element) {
				state.element = globalElement$1;
				bindGridCount$1++;
				grid.addDisposable({
					dispose() {
						bindGridCount$1--;
						if (!bindGridCount$1) {
							globalElement$1 === null ||
								globalElement$1 === void 0 ||
								globalElement$1.dispose();
							globalElement$1 = null;
							state.element = null;
						}
					}
				});
			}
			globalElement$1.attach(grid, editor, cell.col, cell.row, value, record);
		}
		function detachMenu(gridFocus) {
			if (globalElement$1) globalElement$1.detach(gridFocus);
		}
		const KEY_ENTER$3 = 13;
		const KEY_F2 = 113;
		var InlineMenuEditor = class InlineMenuEditor extends Editor {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$30.default)(this, "_classList", void 0);
				(0, import_defineProperty$30.default)(this, "_options", void 0);
				this._classList = option.classList;
				this._options = normalizeToFn(option.options);
			}
			dispose() {}
			get classList() {
				if (!this._classList) return void 0;
				return Array.isArray(this._classList) ? this._classList : [this._classList];
			}
			set classList(classList) {
				this._classList = classList;
			}
			get options() {
				return this._options;
			}
			set options(options) {
				this._options = normalizeToFn(options);
			}
			clone() {
				return new InlineMenuEditor(this);
			}
			onChangeDisabledInternal() {
				detachMenu(true);
			}
			onChangeReadOnlyInternal() {
				detachMenu(true);
			}
			bindGridEvent(grid, cellId) {
				const open = cell => {
					if (
						isReadOnlyRecord(this.readOnly, grid, cell.row) ||
						isDisabledRecord(this.disabled, grid, cell.row)
					)
						return false;
					grid.doGetCellValue(cell.col, cell.row, value => {
						const record = grid.getRowRecord(cell.row);
						if (isPromise(record)) return;
						attachMenu(grid, cell, this, value, record);
					});
					return true;
				};
				function isTarget(col, row) {
					return grid.getLayoutCellId(col, row) === cellId;
				}
				return [
					grid.listen(DG_EVENT_TYPE.CLICK_CELL, cell => {
						if (!isTarget(cell.col, cell.row)) return;
						open({
							col: cell.col,
							row: cell.row
						});
					}),
					grid.listen(DG_EVENT_TYPE.KEYDOWN, e => {
						if (e.keyCode !== KEY_F2 && e.keyCode !== KEY_ENTER$3) return;
						const sel = grid.selection.select;
						if (!isTarget(sel.col, sel.row)) return;
						if (
							open({
								col: sel.col,
								row: sel.row
							})
						)
							e.stopCellMoving();
					}),
					grid.listen(DG_EVENT_TYPE.SELECTED_CELL, _e => {
						detachMenu();
					}),
					grid.listen(DG_EVENT_TYPE.SCROLL, () => {
						detachMenu(true);
					}),
					grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						if (
							isReadOnlyRecord(this.readOnly, grid, e.row) ||
							isDisabledRecord(this.disabled, grid, e.row)
						)
							return;
						grid.getElement().style.cursor = "pointer";
					}),
					grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						if (
							isReadOnlyRecord(this.readOnly, grid, e.row) ||
							isDisabledRecord(this.disabled, grid, e.row)
						)
							return;
						if (!grid.getElement().style.cursor)
							grid.getElement().style.cursor = "pointer";
					}),
					grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, e => {
						if (!isTarget(e.col, e.row)) return;
						grid.getElement().style.cursor = "";
					}),
					grid.listen(DG_EVENT_TYPE.PASTE_CELL, e => {
						if (e.multi) return;
						const selectionRange = grid.selection.range;
						if (!cellEquals(selectionRange.start, selectionRange.end)) return;
						if (!isTarget(e.col, e.row)) return;
						if (
							isReadOnlyRecord(this.readOnly, grid, e.row) ||
							isDisabledRecord(this.disabled, grid, e.row)
						)
							return;
						const record = grid.getRowRecord(e.row);
						if (isPromise(record)) return;
						const pasteOpt = this._pasteDataToOptionValue(
							e.normalizeValue,
							grid,
							e,
							record
						);
						if (pasteOpt) {
							event.cancel(e.event);
							then(
								grid.doChangeValue(e.col, e.row, () => pasteOpt.value),
								() => {
									const range = grid.getCellRange(e.col, e.row);
									grid.invalidateCellRange(range);
								}
							);
						} else
							grid.fireListeners("rejected_paste_values", {
								detail: [
									{
										col: e.col,
										row: e.row,
										record,
										define: grid.getColumnDefine(e.col, e.row),
										pasteValue: e.normalizeValue
									}
								]
							});
					})
				];
			}
			onPasteCellRangeBox(grid, cell, value, context) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				const record = grid.getRowRecord(cell.row);
				if (isPromise(record)) return;
				const pasteOpt = this._pasteDataToOptionValue(value, grid, cell, record);
				if (pasteOpt) grid.doChangeValue(cell.col, cell.row, () => pasteOpt.value);
				else context.reject();
			}
			onDeleteCellRangeBox(grid, cell) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				const record = grid.getRowRecord(cell.row);
				if (isPromise(record)) return;
				const pasteOpt = this._pasteDataToOptionValue("", grid, cell, record);
				if (pasteOpt) grid.doChangeValue(cell.col, cell.row, () => pasteOpt.value);
			}
			_pasteDataToOptionValue(value, grid, cell, record) {
				const options = this._options(record);
				const pasteOpt = _textToOptionValue(value, options);
				if (pasteOpt) return pasteOpt;
				const columnType = grid.getColumnType(cell.col, cell.row);
				if (hasOptions(columnType)) {
					const pasteValue = normalizePasteValueStr(value);
					const captionOpt = columnType.options.find(
						opt => normalizePasteValueStr(opt.label) === pasteValue
					);
					if (captionOpt) return _textToOptionValue(captionOpt.value, options);
				}
				return void 0;
			}
		};
		function _textToOptionValue(value, options) {
			const pasteValue = normalizePasteValueStr(value);
			const pasteOpt = options.find(opt => normalizePasteValueStr(opt.value) === pasteValue);
			if (pasteOpt) return pasteOpt;
			return void 0;
		}
		function normalizePasteValueStr(value) {
			if (value == null) return "";
			return `${value}`.trim();
		}
		function hasOptions(columnType) {
			if (columnType instanceof MenuColumn) return true;
			if (Array.isArray(columnType.options)) return true;
			return false;
		}

		//#endregion
		//#region src/js/columns/action/RadioEditor.ts
		var import_defineProperty$29 = /* @__PURE__ */ __toESM(require_defineProperty());
		var RadioEditor = class RadioEditor extends Editor {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$29.default)(this, "_group", void 0);
				(0, import_defineProperty$29.default)(this, "_checkAction", void 0);
				this._group = option.group;
				this._checkAction = option.checkAction;
			}
			clone() {
				return new RadioEditor(this);
			}
			/** @deprecated Use checkAction instead. */
			get group() {
				return this._group;
			}
			/** @deprecated Use checkAction instead. */
			set group(group) {
				this._group = group;
			}
			get checkAction() {
				return this._checkAction;
			}
			set checkAction(checkAction) {
				this._checkAction = checkAction;
			}
			bindGridEvent(grid, cellId) {
				let _state = grid[RADIO_COLUMN_STATE_ID];
				if (!_state) {
					_state = {
						block: {},
						elapsed: {}
					};
					obj.setReadonly(grid, RADIO_COLUMN_STATE_ID, _state);
				}
				const state = _state;
				const action = cell => {
					this._action(grid, cell);
				};
				function isTarget(col, row) {
					return grid.getLayoutCellId(col, row) === cellId;
				}
				return [
					...bindCellClickAction$1(grid, cellId, {
						action,
						mouseOver: e => {
							if (isDisabledRecord(this.disabled, grid, e.row)) return false;
							state.mouseActiveCell = {
								col: e.col,
								row: e.row
							};
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
							return true;
						},
						mouseOut: e => {
							delete state.mouseActiveCell;
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
						}
					}),
					...bindCellKeyAction$1(grid, cellId, { action }),
					grid.listen(DG_EVENT_TYPE.PASTE_CELL, e => {
						if (e.multi) return;
						const selectionRange = grid.selection.range;
						if (!cellEquals(selectionRange.start, selectionRange.end)) return;
						if (!isTarget(e.col, e.row)) return;
						event.cancel(e.event);
						const pasteValue = e.normalizeValue.trim();
						if (isRejectValue(pasteValue)) {
							const record = grid.getRowRecord(e.row);
							if (!isPromise(record))
								grid.fireListeners("rejected_paste_values", {
									detail: [
										{
											col: e.col,
											row: e.row,
											record,
											define: grid.getColumnDefine(e.col, e.row),
											pasteValue
										}
									]
								});
							return;
						}
						if (!toBoolean(pasteValue)) return;
						action({
							col: e.col,
							row: e.row
						});
					})
				];
			}
			onPasteCellRangeBox(grid, cell, value, context) {
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row)
				)
					return;
				const pasteValue = value.trim();
				if (isRejectValue(pasteValue)) {
					context.reject();
					return;
				}
				if (!toBoolean(pasteValue)) return;
				this._action(grid, {
					col: cell.col,
					row: cell.row
				});
			}
			onDeleteCellRangeBox() {}
			_action(grid, cell) {
				const state = grid[RADIO_COLUMN_STATE_ID];
				const range = grid.getCellRange(cell.col, cell.row);
				const cellKey = `${range.start.col}:${range.start.row}`;
				if (
					isReadOnlyRecord(this.readOnly, grid, cell.row) ||
					isDisabledRecord(this.disabled, grid, cell.row) ||
					state.block[cellKey]
				)
					return;
				grid.doGetCellValue(cell.col, cell.row, value => {
					if (toBoolean(value)) return;
					if (this._checkAction) {
						const record = grid.getRowRecord(cell.row);
						this._checkAction(record, extend(cell, { grid }));
						return;
					}
					if (this._group) {
						const state$1 = grid[RADIO_COLUMN_STATE_ID];
						const targets = this._group({
							grid,
							col: cell.col,
							row: cell.row
						});
						targets.forEach(({ col, row }) => {
							const range$1 = grid.getCellRange(col, row);
							const cellKey$1 = `${range$1.start.col}:${range$1.start.row}`;
							if (
								isReadOnlyRecord(this.readOnly, grid, cell.row) ||
								isDisabledRecord(this.disabled, grid, cell.row) ||
								state$1.block[cellKey$1]
							)
								return;
							actionCell(grid, col, row, col === cell.col && row === cell.row);
						});
						return;
					}
					const field = grid.getField(cell.col, cell.row);
					const recordStartRow = grid.getRecordStartRowByRecordIndex(
						grid.getRecordIndexByRow(cell.row)
					);
					/** Original DataSource */
					const { dataSource } = grid.dataSource;
					const girdRecords = getAllRecordsFromGrid(grid);
					for (let index = 0; index < dataSource.length; index++) {
						const record = dataSource.get(index);
						const showData = girdRecords.find(d => d.record === record);
						if (showData)
							actionCell(
								grid,
								cell.col,
								showData.row,
								showData.row === recordStartRow
							);
						else
							then(dataSource.getField(index, field), value$1 => {
								if (!toBoolean(value$1)) return;
								dataSource.setField(index, field, toggleValue(value$1));
							});
					}
				});
			}
		};
		function getAllRecordsFromGrid(grid) {
			const result = [];
			const { rowCount, recordRowCount } = grid;
			for (
				let targetRow = grid.frozenRowCount;
				targetRow < rowCount;
				targetRow += recordRowCount
			) {
				const record = grid.getRowRecord(targetRow);
				result.push({
					row: targetRow,
					record
				});
			}
			return result;
		}
		function actionCell(grid, col, row, flag) {
			grid.doGetCellValue(col, row, value => {
				if (toBoolean(value) === flag) return;
				const state = grid[RADIO_COLUMN_STATE_ID];
				const range = grid.getCellRange(col, row);
				const cellKey = `${range.start.col}:${range.start.row}`;
				const ret = grid.doChangeValue(col, row, toggleValue);
				if (ret) {
					const onChange = () => {
						animate(200, point => {
							if (point === 1) delete state.elapsed[cellKey];
							else state.elapsed[cellKey] = point;
							grid.invalidateCellRange(range);
						});
					};
					if (isPromise(ret)) {
						state.block[cellKey] = true;
						ret.then(() => {
							delete state.block[cellKey];
							onChange();
						});
					} else onChange();
				}
			});
		}
		function isRejectValue(pasteValue) {
			return toggleValue(toggleValue(pasteValue)) !== pasteValue;
		}

		//#endregion
		//#region src/js/columns/action/internal/SmallDialogInputElement.ts
		var import_defineProperty$28 = /* @__PURE__ */ __toESM(require_defineProperty());
		const CLASSNAME$4 = "cheetah-grid__small-dialog-input";
		const INPUT_CLASSNAME = `${CLASSNAME$4}__input`;
		const HIDDEN_CLASSNAME$2 = `${CLASSNAME$4}--hidden`;
		const SHOWN_CLASSNAME$2 = `${CLASSNAME$4}--shown`;
		const KEY_ENTER$2 = 13;
		const KEY_ESC = 27;
		function _focus(input, handler$1) {
			const focus = () => {
				input.focus();
				const end = input.value.length;
				try {
					if (typeof input.selectionStart !== "undefined") {
						input.selectionStart = end;
						input.selectionEnd = end;
						return;
					}
				} catch (e) {}
				if (document.selection) {
					const range = input.createTextRange();
					range.collapse();
					range.moveEnd("character", end);
					range.moveStart("character", end);
					range.select();
				}
			};
			handler$1.tryWithOffEvents(input, "blur", () => {
				focus();
			});
		}
		function createDialogElement() {
			const element = createElement("div", { classList: [CLASSNAME$4, HIDDEN_CLASSNAME$2] });
			const input = createElement("input", { classList: INPUT_CLASSNAME });
			input.readOnly = true;
			input.tabIndex = -1;
			element.appendChild(input);
			return element;
		}
		function bindProps(grid, dialog, input, editor) {
			const { classList, helperText } = editor;
			if (classList) dialog.classList.add(...classList);
			if (helperText && typeof helperText !== "function")
				dialog.dataset.helperText = helperText;
			setInputAttrs(editor, grid, input);
		}
		function unbindProps(_grid, dialog, input, editor) {
			const { classList } = editor;
			if (classList) dialog.classList.remove(...classList);
			delete dialog.dataset.helperText;
			input.type = "";
		}
		function setInputAttrs(editor, _grid, input) {
			const { type } = editor;
			input.type = type || "";
		}
		var SmallDialogInputElement = class {
			static setInputAttrs(editor, grid, input) {
				setInputAttrs(editor, grid, input);
			}
			constructor() {
				(0, import_defineProperty$28.default)(this, "_handler", void 0);
				(0, import_defineProperty$28.default)(this, "_dialog", void 0);
				(0, import_defineProperty$28.default)(this, "_input", void 0);
				(0, import_defineProperty$28.default)(this, "_beforePropEditor", void 0);
				(0, import_defineProperty$28.default)(this, "_activeData", void 0);
				(0, import_defineProperty$28.default)(this, "_attaching", void 0);
				(0, import_defineProperty$28.default)(this, "_beforeValue", void 0);
				this._handler = new EventHandler();
				this._dialog = createDialogElement();
				this._input = this._dialog.querySelector(`.${INPUT_CLASSNAME}`);
				this._bindDialogEvents();
			}
			dispose() {
				const dialog = this._dialog;
				this.detach();
				this._handler.dispose();
				delete this._dialog;
				delete this._input;
				this._beforePropEditor = null;
				if (dialog.parentElement) dialog.parentElement.removeChild(dialog);
			}
			attach(grid, editor, col, row, value) {
				const handler$1 = this._handler;
				const dialog = this._dialog;
				const input = this._input;
				if (this._beforePropEditor)
					unbindProps(grid, dialog, input, this._beforePropEditor);
				delete dialog.dataset.errorMessage;
				dialog.classList.remove(SHOWN_CLASSNAME$2);
				dialog.classList.add(HIDDEN_CLASSNAME$2);
				input.readOnly = true;
				input.tabIndex = 0;
				const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
				dialog.style.top = `${rect.top.toFixed()}px`;
				dialog.style.left = `${rect.left.toFixed()}px`;
				dialog.style.width = `${rect.width.toFixed()}px`;
				input.style.height = `${rect.height.toFixed()}px`;
				element.appendChild(dialog);
				setInputValue(input, value);
				input.style.font = grid.font || "16px sans-serif";
				const activeData = {
					grid,
					col,
					row,
					editor
				};
				this._onInputValue(input, activeData);
				_focus(input, handler$1);
				dialog.classList.add(SHOWN_CLASSNAME$2);
				dialog.classList.remove(HIDDEN_CLASSNAME$2);
				input.readOnly = false;
				bindProps(grid, dialog, input, editor);
				this._activeData = activeData;
				this._beforePropEditor = editor;
				this._attaching = true;
				setTimeout(() => {
					delete this._attaching;
				});
			}
			detach(gridFocus) {
				if (this._isActive()) {
					const dialog = this._dialog;
					const input = this._input;
					dialog.classList.remove(SHOWN_CLASSNAME$2);
					dialog.classList.add(HIDDEN_CLASSNAME$2);
					input.readOnly = true;
					input.tabIndex = -1;
					const { grid, col, row } = this._activeData;
					const range = grid.getCellRange(col, row);
					grid.invalidateCellRange(range);
					if (gridFocus) grid.focus();
				}
				this._activeData = null;
				this._beforeValue = null;
			}
			_doChangeValue() {
				if (!this._isActive()) return false;
				const input = this._input;
				const { value } = input;
				return then(this._validate(value), res => {
					if (res && value === input.value) {
						const { grid, col, row } = this._activeData;
						grid.doChangeValue(col, row, () => value);
						return true;
					}
					return false;
				});
			}
			_isActive() {
				const dialog = this._dialog;
				if (!dialog || !dialog.parentElement) return false;
				if (!this._activeData) return false;
				return true;
			}
			_bindDialogEvents() {
				const handler$1 = this._handler;
				const dialog = this._dialog;
				const input = this._input;
				const stopPropagationOnly = e => e.stopPropagation();
				handler$1.on(dialog, "click", stopPropagationOnly);
				handler$1.on(dialog, "dblclick", stopPropagationOnly);
				handler$1.on(dialog, "mousedown", stopPropagationOnly);
				handler$1.on(dialog, "touchstart", stopPropagationOnly);
				handler$1.on(input, "compositionstart", _e => {
					input.classList.add("composition");
				});
				handler$1.on(input, "compositionend", _e => {
					input.classList.remove("composition");
					this._onInputValue(input);
				});
				const onKeyupAndPress = _e => {
					if (input.classList.contains("composition")) return;
					this._onInputValue(input);
				};
				handler$1.on(input, "keyup", onKeyupAndPress);
				handler$1.on(input, "keypress", onKeyupAndPress);
				handler$1.on(input, "keydown", e => {
					if (input.classList.contains("composition")) return;
					const keyCode = event.getKeyCode(e);
					if (keyCode === KEY_ESC) {
						this.detach(true);
						event.cancel(e);
					} else if (keyCode === KEY_ENTER$2) this._onKeydownEnter(e);
					else this._onInputValue(input);
				});
			}
			_onKeydownEnter(e) {
				if (this._attaching) return;
				const input = this._input;
				const { value } = input;
				then(this._doChangeValue(), r => {
					if (r && value === input.value) {
						var _grid$keyboardOptions;
						const grid = this._isActive() ? this._activeData.grid : null;
						this.detach(true);
						if (
							grid === null ||
							grid === void 0 ||
							(_grid$keyboardOptions = grid.keyboardOptions) === null ||
							_grid$keyboardOptions === void 0
								? void 0
								: _grid$keyboardOptions.moveCellOnEnter
						)
							grid.onKeyDownMove(e);
					}
				});
				event.cancel(e);
			}
			_onInputValue(input, activeData) {
				const before = this._beforeValue;
				const { value } = input;
				if (before !== value) this._onInputValueChange(value, activeData);
				this._beforeValue = value;
			}
			_onInputValueChange(after, activeData) {
				activeData = activeData || this._activeData;
				const dialog = this._dialog;
				const { grid, col, row, editor } = activeData;
				if (typeof editor.helperText === "function") {
					const helperText = editor.helperText(after, {
						grid,
						col,
						row
					});
					if (helperText) dialog.dataset.helperText = helperText;
					else delete dialog.dataset.helperText;
				}
				if ("errorMessage" in dialog.dataset) this._validate(after, true);
			}
			_validate(value, inputOnly) {
				const dialog = this._dialog;
				const input = this._input;
				const { grid, col, row, editor } = this._activeData;
				let message = "";
				if (editor.inputValidator)
					message = editor.inputValidator(value, {
						grid,
						col,
						row
					});
				return then(message, message$1 => {
					if (!message$1 && editor.validator && !inputOnly)
						message$1 = editor.validator(value, {
							grid,
							col,
							row
						});
					return then(message$1, message$2 => {
						if (message$2 && value === input.value)
							dialog.dataset.errorMessage = message$2;
						else delete dialog.dataset.errorMessage;
						return !message$2;
					});
				});
			}
		};

		//#endregion
		//#region src/js/columns/action/SmallDialogInputEditor.ts
		var import_defineProperty$27 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$3 = SMALL_DIALOG_INPUT_EDITOR_STATE_ID;
		function getState$2(grid) {
			let state = grid[_$3];
			if (!state) {
				state = {};
				obj.setReadonly(grid, _$3, state);
			}
			return state;
		}
		let globalElement = null;
		let bindGridCount = 0;
		function attachInput(grid, cell, editor, value) {
			const state = getState$2(grid);
			if (!globalElement) globalElement = new SmallDialogInputElement();
			if (!state.element) {
				state.element = globalElement;
				bindGridCount++;
				grid.addDisposable({
					dispose() {
						bindGridCount--;
						if (!bindGridCount) {
							globalElement === null ||
								globalElement === void 0 ||
								globalElement.dispose();
							globalElement = null;
							state.element = null;
						}
					}
				});
			}
			globalElement.attach(grid, editor, cell.col, cell.row, value);
		}
		function detachInput(gridFocus) {
			if (globalElement) globalElement.detach(gridFocus);
		}
		var SmallDialogInputEditor = class SmallDialogInputEditor extends BaseInputEditor {
			constructor(option = {}) {
				super(option);
				(0, import_defineProperty$27.default)(this, "_helperText", void 0);
				(0, import_defineProperty$27.default)(this, "_inputValidator", void 0);
				(0, import_defineProperty$27.default)(this, "_validator", void 0);
				(0, import_defineProperty$27.default)(this, "_classList", void 0);
				(0, import_defineProperty$27.default)(this, "_type", void 0);
				this._helperText = option.helperText;
				this._inputValidator = option.inputValidator;
				this._validator = option.validator;
				this._classList = option.classList;
				this._type = option.type;
			}
			dispose() {}
			get classList() {
				if (!this._classList) return void 0;
				return Array.isArray(this._classList) ? this._classList : [this._classList];
			}
			set classList(classList) {
				this._classList = classList;
			}
			get type() {
				return this._type;
			}
			set type(type) {
				this._type = type;
			}
			get helperText() {
				return this._helperText;
			}
			get inputValidator() {
				return this._inputValidator;
			}
			get validator() {
				return this._validator;
			}
			clone() {
				return new SmallDialogInputEditor(this);
			}
			onInputCellInternal(grid, cell, inputValue) {
				attachInput(grid, cell, this, inputValue);
			}
			onOpenCellInternal(grid, cell) {
				grid.doGetCellValue(cell.col, cell.row, value => {
					attachInput(grid, cell, this, value);
				});
			}
			onChangeSelectCellInternal(_grid, _cell, _selected) {
				detachInput();
			}
			onGridScrollInternal(_grid) {
				detachInput(true);
			}
			onChangeDisabledInternal() {
				detachInput(true);
			}
			onChangeReadOnlyInternal() {
				detachInput(true);
			}
			onSetInputAttrsInternal(grid, _cell, input) {
				SmallDialogInputElement.setInputAttrs(this, grid, input);
			}
		};

		//#endregion
		//#region src/js/columns/action.ts
		var action_exports$1 = {};
		__export(action_exports$1, {
			ACTIONS: () => ACTIONS$1,
			Action: () => Action,
			BaseAction: () => BaseAction$1,
			ButtonAction: () => ButtonAction,
			CheckEditor: () => CheckEditor,
			Editor: () => Editor,
			InlineInputEditor: () => InlineInputEditor,
			InlineMenuEditor: () => InlineMenuEditor,
			RadioEditor: () => RadioEditor,
			SmallDialogInputEditor: () => SmallDialogInputEditor,
			of: () => of$4
		});
		var ImmutableCheckEditor = class extends CheckEditor {
			get disabled() {
				return this._disabled;
			}
			get readOnly() {
				return this._readOnly;
			}
		};
		var ImmutableRadioEditor = class extends RadioEditor {
			get disabled() {
				return this._disabled;
			}
			get readOnly() {
				return this._readOnly;
			}
		};
		var ImmutableInputEditor = class extends SmallDialogInputEditor {
			get disabled() {
				return this._disabled;
			}
			get readOnly() {
				return this._readOnly;
			}
		};
		const ACTIONS$1 = {
			CHECK: new ImmutableCheckEditor(),
			INPUT: new ImmutableInputEditor(),
			RADIO: new ImmutableRadioEditor()
		};
		function of$4(columnAction) {
			if (!columnAction) return void 0;
			else if (typeof columnAction === "string") {
				const key = columnAction.toUpperCase();
				return ACTIONS$1[key] || of$4(null);
			} else return columnAction;
		}

		//#endregion
		//#region src/js/columns.ts
		var columns_exports = {};
		__export(columns_exports, {
			action: () => action_exports$1,
			style: () => style_exports$2,
			type: () => type_exports$1
		});

		//#endregion
		//#region src/js/internal/calc.ts
		var calc_exports = {};
		__export(calc_exports, { toPx: () => toPx });
		const TYPE_PAREN = 0;
		const TYPE_UNIT = 1;
		const TYPE_OPERATOR = 2;
		const TYPE_NUMBER = 3;
		const NODE_TYPE_UNIT = 10;
		const NODE_TYPE_BINARY_EXPRESSION = 11;
		const NODE_TYPE_NUMBER = 12;
		const TABULATION = 9;
		const CARRIAGE_RETURN = 13;
		const LINE_FEED = 10;
		const FORM_FEED = 12;
		const SPACE = 32;
		const PERCENT = 37;
		const FULL_STOP = 46;
		const DIGIT_0 = 48;
		const DIGIT_9 = 57;
		const LATIN_CAPITAL_A = 65;
		const LATIN_CAPITAL_Z = 90;
		const LATIN_SMALL_A = 97;
		const LATIN_SMALL_Z = 122;
		function isUpperLetter(cp) {
			return cp >= LATIN_CAPITAL_A && cp <= LATIN_CAPITAL_Z;
		}
		function isLowerLetter(cp) {
			return cp >= LATIN_SMALL_A && cp <= LATIN_SMALL_Z;
		}
		function isLetter(cp) {
			return isLowerLetter(cp) || isUpperLetter(cp);
		}
		function isWhitespace(cp) {
			return (
				cp === TABULATION ||
				cp === LINE_FEED ||
				cp === FORM_FEED ||
				cp === CARRIAGE_RETURN ||
				cp === SPACE
			);
		}
		function isDigit(cp) {
			return cp >= DIGIT_0 && cp <= DIGIT_9;
		}
		function isDot(cp) {
			return cp === FULL_STOP;
		}
		function isUnit(cp) {
			return isLetter(cp) || cp === PERCENT;
		}
		function createError(calc) {
			return /* @__PURE__ */ new Error(`calc parse error: ${calc}`);
		}
		/**
		 * tokenize
		 * @param {string} calc calc expression
		 * @returns {Array} tokens
		 * @private
		 */
		function tokenize(calc) {
			const exp = calc.replace(/calc\(/g, "(").trim();
			const tokens = [];
			const len = exp.length;
			for (let index = 0; index < len; index++) {
				const c = exp[index];
				const cp = c.charCodeAt(0);
				if (c === "(" || c === ")")
					tokens.push({
						value: c,
						type: TYPE_PAREN
					});
				else if (c === "*" || c === "/")
					tokens.push({
						value: c,
						type: TYPE_OPERATOR
					});
				else if (c === "+" || c === "-") index = parseSign(c, index + 1) - 1;
				else if (isDigit(cp) || isDot(cp)) index = parseNum(c, index + 1) - 1;
				else if (isWhitespace(cp)) {
				} else throw createError(calc);
			}
			function parseSign(sign, start) {
				if (start < len) {
					const c = exp[start];
					const cp = c.charCodeAt(0);
					if (isDigit(cp) || isDot(cp)) return parseNum(sign + c, start + 1);
				}
				tokens.push({
					value: sign,
					type: TYPE_OPERATOR
				});
				return start;
			}
			function parseNum(num, start) {
				let index = start;
				for (; index < len; index++) {
					const c = exp[index];
					const cp = c.charCodeAt(0);
					if (isDigit(cp)) num += c;
					else if (c === ".") {
						if (num.indexOf(".") >= 0) throw createError(calc);
						num += c;
					} else if (isUnit(cp)) return parseUnit(num, c, index + 1);
					else break;
				}
				if (num === ".") throw createError(calc);
				tokens.push({
					value: parseFloat(num),
					type: TYPE_NUMBER
				});
				return index;
			}
			function parseUnit(num, unit, start) {
				let index = start;
				for (; index < len; index++) {
					const c = exp[index];
					const cp = c.charCodeAt(0);
					if (isUnit(cp)) unit += c;
					else break;
				}
				tokens.push({
					value: parseFloat(num),
					unit,
					type: TYPE_UNIT
				});
				return index;
			}
			return tokens;
		}
		const PRECEDENCE = {
			"*": 3,
			"/": 3,
			"+": 2,
			"-": 2
		};
		function lex(tokens, calc) {
			function buildBinaryExpNode(stack$1) {
				const right = stack$1.pop();
				const op = stack$1.pop();
				const left = stack$1.pop();
				if (
					!left ||
					!left.nodeType ||
					!op ||
					op.type !== TYPE_OPERATOR ||
					!right ||
					!right.nodeType
				)
					throw createError(calc);
				return {
					nodeType: NODE_TYPE_BINARY_EXPRESSION,
					left,
					op,
					right
				};
			}
			const stack = [];
			while (tokens.length) {
				const token = tokens.shift();
				if (token.type === TYPE_PAREN && token.value === "(") {
					let deep = 0;
					const closeIndex = tokens.findIndex(t => {
						if (t.type === TYPE_PAREN && t.value === "(") deep++;
						else if (t.type === TYPE_PAREN && t.value === ")") {
							if (!deep) return true;
							deep--;
						}
						return false;
					});
					if (closeIndex === -1) throw createError(calc);
					stack.push(lex(tokens.splice(0, closeIndex), calc));
					tokens.shift();
				} else if (token.type === TYPE_OPERATOR) {
					if (stack.length >= 3) {
						const beforeOp = stack[stack.length - 2].value;
						if (PRECEDENCE[token.value] <= PRECEDENCE[beforeOp])
							stack.push(buildBinaryExpNode(stack));
					}
					stack.push(token);
				} else if (token.type === TYPE_UNIT) {
					const { value: num, unit } = token;
					stack.push({
						nodeType: NODE_TYPE_UNIT,
						value: num,
						unit
					});
				} else if (token.type === TYPE_NUMBER)
					stack.push({
						nodeType: NODE_TYPE_NUMBER,
						value: token.value
					});
			}
			while (stack.length > 1) stack.push(buildBinaryExpNode(stack));
			return stack[0];
		}
		function parse(calcStr) {
			const tokens = tokenize(calcStr);
			return lex(tokens, calcStr);
		}
		function calcNode(node, context) {
			if (node.nodeType === NODE_TYPE_BINARY_EXPRESSION) {
				const left = calcNode(node.left, context);
				const right = calcNode(node.right, context);
				switch (node.op.value) {
					case "+":
						return left + right;
					case "-":
						return left - right;
					case "*":
						return left * right;
					case "/":
						return left / right;
					default:
						throw new Error(`calc error. unknown operator: ${node.op.value}`);
				}
			} else if (node.nodeType === NODE_TYPE_UNIT)
				switch (node.unit) {
					case "%":
						return (node.value * context.full) / 100;
					case "em":
						return node.value * context.em;
					case "px":
						return node.value;
					default:
						throw new Error(`calc error. unknown unit: ${node.unit}`);
				}
			else if (node.nodeType === NODE_TYPE_NUMBER) return node.value;
			throw new Error("calc error.");
		}
		function toPxInternal(value, context) {
			const ast = parse(value);
			return calcNode(ast, context);
		}
		function toPx(value, context) {
			if (typeof value === "string") return toPxInternal(value.trim(), context);
			return value - 0;
		}

		//#endregion
		//#region src/js/internal/hiDPI.ts
		const handler = new EventHandler();
		let ratio = 1;
		function setRatio() {
			if (isNode) ratio = 1;
			else {
				ratio = Math.ceil(window.devicePixelRatio || 1);
				if (ratio > 1 && ratio % 2 !== 0) ratio += 1;
			}
		}
		setRatio();
		if (!isNode) handler.on(window, "resize", setRatio);
		function transform(canvas) {
			const ctx = canvas.getContext("2d");
			const { getAttribute, setAttribute } = canvas;
			canvas.getAttribute = function (name) {
				let result = getAttribute.call(this, name);
				if (name === "width" || name === "height") result = `${Number(result) / ratio}`;
				return result;
			};
			canvas.setAttribute = function (name, val) {
				const wh = name === "width" || name === "height";
				if (wh) val = `${Number(val) * ratio}`;
				const result = setAttribute.call(this, name, val);
				if (wh) ctx.scale(ratio, ratio);
				return result;
			};
			Object.defineProperty(canvas, "width", {
				get() {
					return Number(canvas.getAttribute("width"));
				},
				set: val => {
					canvas.setAttribute("width", `${Math.floor(val)}`);
				},
				configurable: true,
				enumerable: true
			});
			Object.defineProperty(canvas, "height", {
				get() {
					return Number(canvas.getAttribute("height"));
				},
				set: val => {
					canvas.setAttribute("height", `${Math.floor(val)}`);
				},
				configurable: true,
				enumerable: true
			});
			const { drawImage } = ctx;
			ctx.drawImage = function (img, ...args) {
				if (img !== canvas || ratio === 1) return drawImage.call(this, img, ...args);
				this.save();
				try {
					this.scale(1 / ratio, 1 / ratio);
					if (args.length > 4) {
						args[4] *= ratio;
						args[5] *= ratio;
					} else {
						args[0] *= ratio;
						args[1] *= ratio;
					}
					return drawImage.call(this, img, ...args);
				} finally {
					this.restore();
				}
			};
			return canvas;
		}

		//#endregion
		//#region src/js/internal/style.ts
		function getScrollBarWidth() {
			const wrapper = document.createElement("div");
			const inner = document.createElement("div");
			const { style: wrapperStyle } = wrapper;
			wrapperStyle.position = "fixed";
			wrapperStyle.height = "50px";
			wrapperStyle.width = "50px";
			wrapperStyle.overflow = "scroll";
			wrapperStyle.opacity = "0";
			wrapperStyle.pointerEvents = "none";
			const { style: style$1 } = inner;
			style$1.height = "100%";
			style$1.width = "100%";
			inner.textContent = "x";
			wrapper.appendChild(inner);
			document.body.appendChild(wrapper);
			const wrapperWidth = wrapper.getBoundingClientRect().width;
			const innerWidth = inner.getBoundingClientRect().width;
			document.body.removeChild(wrapper);
			return Math.ceil(wrapperWidth - innerWidth);
		}
		function validateCSSLoaded() {
			const style$1 = getComputedStyle(document.body);
			if (style$1.getPropertyValue("--cheetah-grid-css-enable") !== "1")
				console.warn(`Cheetah Grid CSS is not enabled!
Please load 'cheetah-grid/main.css' before running the cheetah-grid script.

For example, if you bundle your application:

  import 'cheetah-grid/main.css'

For example, if you use CDN:

  <link rel="stylesheet" href="https://unpkg.com/cheetah-grid@2/main.css" />
`);
		}
		let SCROLLBAR_SIZE;
		function initDocumentInternal() {
			validateCSSLoaded();
			SCROLLBAR_SIZE = getScrollBarWidth() || 10;
			const style$1 = document.createElement("style");
			style$1.setAttribute("type", "text/css");
			style$1.setAttribute("data-name", "cheetah-grid");
			style$1.innerHTML = `
.cheetah-grid .grid-scroll-end-point {
	width: ${SCROLLBAR_SIZE}px;
	height: ${SCROLLBAR_SIZE}px;
}
.cheetah-grid > canvas {
	width: calc(100% - ${SCROLLBAR_SIZE}px);
	height: calc(100% - ${SCROLLBAR_SIZE}px);
}
`;
			document.body.appendChild(style$1);
		}
		let initDocumentVar = initDocumentInternal;
		function initDocument() {
			initDocumentVar();
			initDocumentVar = Function.prototype;
		}
		function getScrollBarSize() {
			return SCROLLBAR_SIZE;
		}

		//#endregion
		//#region src/js/internal/paste-utils.ts
		var paste_utils_exports = {};
		__export(paste_utils_exports, {
			normalizePasteValue: () => normalizePasteValue,
			parsePasteRangeBoxValues: () => parsePasteRangeBoxValues
		});
		function normalizePasteValue(text) {
			return text[text.length - 1] !== "\n"
				? text
				: text[text.length - 2] === "\r"
					? text.slice(0, -2)
					: text.slice(0, -1);
		}
		function parsePasteRangeBoxValues(value, option) {
			const normalizedValue = normalizePasteValue(value);
			const { values, colCount } = parseValues(normalizedValue, option);
			return {
				colCount,
				rowCount: values.length,
				getCellValue(offsetCol, offsetRow) {
					var _values$offsetRow$off, _values$offsetRow;
					return (_values$offsetRow$off =
						(_values$offsetRow = values[offsetRow]) === null ||
						_values$offsetRow === void 0
							? void 0
							: _values$offsetRow[offsetCol]) !== null &&
						_values$offsetRow$off !== void 0
						? _values$offsetRow$off
						: "";
				}
			};
		}
		function parseValues(text, { trimOnPaste }) {
			const len = text.length;
			const adjustCell = trimOnPaste ? cell$1 => cell$1.trim() : cell$1 => cell$1;
			let colCount = 1;
			let line = [];
			const values = [line];
			let cell = "";
			for (let index = 0; index < len; index++) {
				const char = text[index];
				if (char === "	") {
					line.push(adjustCell(cell));
					cell = "";
					continue;
				}
				if (char === "\n") {
					cell = adjustCell(cell);
					if (cell[cell.length - 1] === "\r") cell = cell.slice(0, -1);
					line.push(cell);
					colCount = Math.max(colCount, line.length);
					line = [];
					values.push(line);
					cell = "";
					continue;
				}
				if (char === '"' && !cell.trim()) {
					const quoted = processQuotedCell(index + 1);
					if (quoted) {
						({ cell } = quoted);
						index = quoted.next - 1;
						continue;
					}
				}
				cell += char;
			}
			line.push(adjustCell(cell));
			colCount = Math.max(colCount, line.length);
			return {
				values,
				colCount
			};
			function processQuotedCell(start) {
				let cell$1 = "";
				let index = start;
				while (index < len) {
					const char = text[index];
					if (char !== '"') {
						cell$1 += char;
						index++;
						continue;
					}
					if (text[index + 1] === '"') {
						cell$1 += '"';
						index += 2;
						continue;
					}
					let next = index + 1;
					while (next < len) {
						const c = text[next];
						if (c.trim()) return null;
						if (c === "	" || c === "\n") break;
						next++;
					}
					return {
						cell: cell$1,
						next
					};
				}
				return null;
			}
		}

		//#endregion
		//#region src/js/internal/NumberMap.ts
		var import_defineProperty$26 = /* @__PURE__ */ __toESM(require_defineProperty());
		const indexFirst = (arr, elm) => {
			let low = 0;
			let high = arr.length - 1;
			while (low <= high) {
				const i = Math.floor((low + high) / 2);
				if (arr[i] === elm) return i;
				else if (arr[i] > elm) high = i - 1;
				else low = i + 1;
			}
			return high < 0 ? 0 : high;
		};
		var NumberMap = class {
			constructor() {
				(0, import_defineProperty$26.default)(this, "_keys", []);
				(0, import_defineProperty$26.default)(this, "_vals", {});
				(0, import_defineProperty$26.default)(this, "_sorted", false);
			}
			put(key, value) {
				if (!(key in this._vals)) {
					this._keys.push(key);
					this._sorted = false;
				}
				this._vals[key] = value;
			}
			remove(key) {
				delete this._vals[key];
				const index = this._keys.indexOf(key);
				if (index < 0) return;
				this._keys.splice(index, 1);
				this._sorted = false;
			}
			get(key) {
				return this._vals[key];
			}
			has(key) {
				return this._vals[key] != null;
			}
			each(keyFrom, keyTo, fn) {
				const { _keys: keys } = this;
				const { length } = keys;
				if (!this._sorted) {
					keys.sort((a, b) => {
						if (a < b) return -1;
						if (a > b) return 1;
						return 0;
					});
					this._sorted = true;
				}
				for (let i = indexFirst(keys, keyFrom); i < length; i++) {
					const key = keys[i];
					if (keyFrom <= key && key <= keyTo) fn(this.get(key), key);
					else if (keyTo < key) return;
				}
			}
		};

		//#endregion
		//#region src/js/internal/Scrollable.ts
		var import_defineProperty$25 = /* @__PURE__ */ __toESM(require_defineProperty());
		const MAX_SCROLL = browser.heightLimit - 1e3;
		var Scrollable = class {
			constructor() {
				(0, import_defineProperty$25.default)(this, "_handler", void 0);
				(0, import_defineProperty$25.default)(this, "_scrollable", void 0);
				(0, import_defineProperty$25.default)(this, "_height", void 0);
				(0, import_defineProperty$25.default)(this, "_width", void 0);
				(0, import_defineProperty$25.default)(this, "_endPointElement", void 0);
				(0, import_defineProperty$25.default)(this, "_p", 1);
				this._handler = new EventHandler();
				this._scrollable = document.createElement("div");
				this._scrollable.classList.add("grid-scrollable");
				this._height = 0;
				this._width = 0;
				this._endPointElement = document.createElement("div");
				this._endPointElement.classList.add("grid-scroll-end-point");
				this._update();
				this._scrollable.appendChild(this._endPointElement);
			}
			calcTop(top) {
				const relativeTop = top - this.scrollTop;
				return this._scrollable.scrollTop + relativeTop;
			}
			getElement() {
				return this._scrollable;
			}
			setScrollSize(width, height) {
				this._width = width;
				this._height = height;
				this._update();
			}
			get scrollWidth() {
				return this._width;
			}
			set scrollWidth(width) {
				this._width = width;
				this._update();
			}
			get scrollHeight() {
				return this._height;
			}
			set scrollHeight(height) {
				this._height = height;
				this._update();
			}
			get scrollLeft() {
				return Math.max(Math.ceil(this._scrollable.scrollLeft), 0);
			}
			set scrollLeft(scrollLeft) {
				this._scrollable.scrollLeft = scrollLeft;
			}
			get scrollTop() {
				return Math.max(Math.ceil(this._scrollable.scrollTop / this._p), 0);
			}
			set scrollTop(scrollTop) {
				this._scrollable.scrollTop = scrollTop * this._p;
			}
			onScroll(fn) {
				this._handler.on(this._scrollable, "scroll", fn);
			}
			dispose() {
				this._handler.dispose();
			}
			_update() {
				let domHeight;
				const { offsetHeight, offsetWidth } = this._scrollable;
				if (this._height > MAX_SCROLL) {
					const sbSize = getScrollBarSize();
					const vScrollRange = MAX_SCROLL - offsetHeight + sbSize;
					const rScrollRange = this._height - offsetHeight + sbSize;
					this._p = vScrollRange / rScrollRange;
					domHeight = MAX_SCROLL;
				} else {
					this._p = 1;
					domHeight = this._height;
				}
				this._endPointElement.style.top = `${domHeight.toFixed()}px`;
				this._endPointElement.style.left = `${this._width.toFixed()}px`;
				if (this.scrollTop > this.scrollHeight - offsetHeight)
					this.scrollTop = this.scrollHeight - offsetHeight;
				if (this.scrollLeft > this.scrollWidth - offsetWidth)
					this.scrollLeft = this.scrollWidth - offsetWidth;
			}
		};

		//#endregion
		//#region src/js/core/DrawGrid.ts
		var import_defineProperty$24 = /* @__PURE__ */ __toESM(require_defineProperty());
		const { isTouchEvent, getKeyCode, cancel: cancelEvent } = event;
		/** @private */
		const _$2 = PROTECTED_SYMBOL;
		/** @private */
		function createRootElement() {
			const element = document.createElement("div");
			element.classList.add("cheetah-grid");
			return element;
		}
		/** @private */
		const KEY_BS = 8;
		/** @private */
		const KEY_TAB = 9;
		/** @private */
		const KEY_ENTER$1 = 13;
		/** @private */
		const KEY_END = 35;
		/** @private */
		const KEY_HOME = 36;
		/** @private */
		const KEY_LEFT = 37;
		/** @private */
		const KEY_UP = 38;
		/** @private */
		const KEY_RIGHT = 39;
		/** @private */
		const KEY_DOWN = 40;
		/** @private */
		const KEY_DEL = 46;
		/** @private */
		const KEY_ALPHA_A = 65;
		/** @private */
		function _vibrate(e) {
			if (navigator.vibrate && isTouchEvent(e)) navigator.vibrate(50);
		}
		/** @private */
		function _getTargetRowAt(absoluteY) {
			const internal = this.getTargetRowAtInternal(absoluteY);
			if (internal != null) return internal;
			const findBefore = (startRow, startBottom) => {
				let bottom$1 = startBottom;
				for (let row = startRow; row >= 0; row--) {
					const height = _getRowHeight.call(this, row);
					const top = bottom$1 - height;
					if (top <= absoluteY && absoluteY < bottom$1)
						return {
							top,
							row
						};
					bottom$1 = top;
				}
				return null;
			};
			const findAfter = (startRow, startBottom) => {
				let top = startBottom - _getRowHeight.call(this, startRow);
				const { rowCount } = this[_$2];
				for (let row = startRow; row < rowCount; row++) {
					const height = _getRowHeight.call(this, row);
					const bottom$1 = top + height;
					if (top <= absoluteY && absoluteY < bottom$1)
						return {
							top,
							row
						};
					top = bottom$1;
				}
				return null;
			};
			const candidateRow = Math.min(
				Math.ceil(absoluteY / this[_$2].defaultRowHeight),
				this.rowCount - 1
			);
			const bottom = _getRowsHeight.call(this, 0, candidateRow);
			if (absoluteY >= bottom) return findAfter(candidateRow, bottom);
			else return findBefore(candidateRow, bottom);
		}
		/** @private */
		function _getTargetColAt(grid, absoluteX) {
			let left = 0;
			const { colCount } = grid[_$2];
			for (let col = 0; col < colCount; col++) {
				const width = _getColWidth(grid, col);
				const right = left + width;
				if (right > absoluteX)
					return {
						left,
						col
					};
				left = right;
			}
			return null;
		}
		/** @private */
		function _getTargetFrozenRowAt(grid, absoluteY) {
			if (!grid[_$2].frozenRowCount) return null;
			let { top } = grid[_$2].scroll;
			const rowCount = grid[_$2].frozenRowCount;
			for (let row = 0; row < rowCount; row++) {
				const height = _getRowHeight.call(grid, row);
				const bottom = top + height;
				if (bottom > absoluteY)
					return {
						top,
						row
					};
				top = bottom;
			}
			return null;
		}
		/** @private */
		function _getTargetFrozenColAt(grid, absoluteX) {
			if (!grid[_$2].frozenColCount) return null;
			let { left } = grid[_$2].scroll;
			const colCount = grid[_$2].frozenColCount;
			for (let col = 0; col < colCount; col++) {
				const width = _getColWidth(grid, col);
				const right = left + width;
				if (right > absoluteX)
					return {
						left,
						col
					};
				left = right;
			}
			return null;
		}
		/** @private */
		function _getFrozenRowsRect(grid) {
			if (!grid[_$2].frozenRowCount) return null;
			const { top } = grid[_$2].scroll;
			let height = 0;
			const rowCount = grid[_$2].frozenRowCount;
			for (let row = 0; row < rowCount; row++) height += _getRowHeight.call(grid, row);
			return new Rect(grid[_$2].scroll.left, top, grid[_$2].canvas.width, height);
		}
		/** @private */
		function _getFrozenColsRect(grid) {
			if (!grid[_$2].frozenColCount) return null;
			const { left } = grid[_$2].scroll;
			let width = 0;
			const colCount = grid[_$2].frozenColCount;
			for (let col = 0; col < colCount; col++) width += _getColWidth(grid, col);
			return new Rect(left, grid[_$2].scroll.top, width, grid[_$2].canvas.height);
		}
		/** @private */
		function _getCellDrawing(grid, col, row) {
			if (!grid[_$2].drawCells[row]) return null;
			return grid[_$2].drawCells[row][col];
		}
		/** @private */
		function _putCellDrawing(grid, col, row, context) {
			if (!grid[_$2].drawCells[row]) grid[_$2].drawCells[row] = {};
			grid[_$2].drawCells[row][col] = context;
		}
		/** @private */
		function _removeCellDrawing(grid, col, row) {
			if (!grid[_$2].drawCells[row]) return;
			delete grid[_$2].drawCells[row][col];
			if (Object.keys(grid[_$2].drawCells[row]).length === 0) delete grid[_$2].drawCells[row];
		}
		/** @private */
		function _drawCell(
			ctx,
			col,
			absoluteLeft,
			width,
			row,
			absoluteTop,
			height,
			visibleRect,
			skipAbsoluteTop,
			skipAbsoluteLeft,
			drawLayers
		) {
			const rect = new Rect(
				absoluteLeft - visibleRect.left,
				absoluteTop - visibleRect.top,
				width,
				height
			);
			const drawRect = Rect.bounds(
				Math.max(absoluteLeft, skipAbsoluteLeft) - visibleRect.left,
				Math.max(absoluteTop, skipAbsoluteTop) - visibleRect.top,
				rect.right,
				rect.bottom
			);
			if (drawRect.height > 0 && drawRect.width > 0) {
				ctx.save();
				try {
					const cellDrawing = _getCellDrawing(this, col, row);
					if (cellDrawing) cellDrawing.cancel();
					const dcContext = new DrawCellContext(
						col,
						row,
						ctx,
						rect,
						drawRect,
						!!cellDrawing,
						this[_$2].selection,
						drawLayers
					);
					const p = this.onDrawCell(col, row, dcContext);
					if (isPromise(p)) {
						_putCellDrawing(this, col, row, dcContext);
						const pCol = col;
						dcContext._delayMode(this, () => {
							_removeCellDrawing(this, pCol, row);
						});
						p.then(() => {
							dcContext.terminate();
						});
					}
				} finally {
					ctx.restore();
				}
			}
		}
		/** @private */
		function _drawRow(
			grid,
			ctx,
			initFrozenCol,
			initCol,
			drawRight,
			row,
			absoluteTop,
			height,
			visibleRect,
			skipAbsoluteTop,
			drawLayers
		) {
			const { colCount } = grid[_$2];
			const drawOuter = (col, absoluteLeft$1) => {
				if (
					col >= colCount - 1 &&
					grid[_$2].canvas.width > absoluteLeft$1 - visibleRect.left
				) {
					const outerLeft = absoluteLeft$1 - visibleRect.left;
					ctx.save();
					ctx.beginPath();
					ctx.fillStyle = grid.underlayBackgroundColor || "#F6F6F6";
					ctx.rect(
						outerLeft,
						absoluteTop - visibleRect.top,
						grid[_$2].canvas.width - outerLeft,
						height
					);
					ctx.fill();
					ctx.restore();
				}
			};
			let skipAbsoluteLeft = 0;
			if (initFrozenCol) {
				let absoluteLeft$1 = initFrozenCol.left;
				const count = grid[_$2].frozenColCount;
				for (let { col } = initFrozenCol; col < count; col++) {
					const width = _getColWidth(grid, col);
					_drawCell.call(
						grid,
						ctx,
						col,
						absoluteLeft$1,
						width,
						row,
						absoluteTop,
						height,
						visibleRect,
						skipAbsoluteTop,
						0,
						drawLayers
					);
					absoluteLeft$1 += width;
					if (drawRight <= absoluteLeft$1) {
						drawOuter(col, absoluteLeft$1);
						return;
					}
				}
				skipAbsoluteLeft = absoluteLeft$1;
			}
			let absoluteLeft = initCol.left;
			for (let { col } = initCol; col < colCount; col++) {
				const width = _getColWidth(grid, col);
				_drawCell.call(
					grid,
					ctx,
					col,
					absoluteLeft,
					width,
					row,
					absoluteTop,
					height,
					visibleRect,
					skipAbsoluteTop,
					skipAbsoluteLeft,
					drawLayers
				);
				absoluteLeft += width;
				if (drawRight <= absoluteLeft) {
					drawOuter(col, absoluteLeft);
					return;
				}
			}
			drawOuter(colCount - 1, absoluteLeft);
		}
		/** @private */
		function _getInitContext() {
			return this._getInitContext();
		}
		/** @private */
		function _invalidateRect(grid, drawRect) {
			const visibleRect = _getVisibleRect(grid);
			const { rowCount } = grid[_$2];
			const ctx = _getInitContext.call(grid);
			const initRow = _getTargetRowAt.call(grid, Math.max(visibleRect.top, drawRect.top)) || {
				top: _getRowsHeight.call(grid, 0, rowCount - 1),
				row: rowCount
			};
			const initCol = _getTargetColAt(grid, Math.max(visibleRect.left, drawRect.left)) || {
				left: _getColsWidth(grid, 0, grid[_$2].colCount - 1),
				col: grid[_$2].colCount
			};
			const drawBottom = Math.min(visibleRect.bottom, drawRect.bottom);
			const drawRight = Math.min(visibleRect.right, drawRect.right);
			const initFrozenRow = _getTargetFrozenRowAt(
				grid,
				Math.max(visibleRect.top, drawRect.top)
			);
			const initFrozenCol = _getTargetFrozenColAt(
				grid,
				Math.max(visibleRect.left, drawRect.left)
			);
			const drawLayers = new DrawLayers();
			const drawOuter = (row, absoluteTop$1) => {
				if (
					row >= rowCount - 1 &&
					grid[_$2].canvas.height > absoluteTop$1 - visibleRect.top
				) {
					const outerTop = absoluteTop$1 - visibleRect.top;
					ctx.save();
					ctx.beginPath();
					ctx.fillStyle = grid.underlayBackgroundColor || "#F6F6F6";
					ctx.rect(
						0,
						outerTop,
						grid[_$2].canvas.width,
						grid[_$2].canvas.height - outerTop
					);
					ctx.fill();
					ctx.restore();
				}
			};
			let skipAbsoluteTop = 0;
			if (initFrozenRow) {
				let absoluteTop$1 = initFrozenRow.top;
				const count = grid[_$2].frozenRowCount;
				for (let { row } = initFrozenRow; row < count; row++) {
					const height = _getRowHeight.call(grid, row);
					_drawRow(
						grid,
						ctx,
						initFrozenCol,
						initCol,
						drawRight,
						row,
						absoluteTop$1,
						height,
						visibleRect,
						0,
						drawLayers
					);
					absoluteTop$1 += height;
					if (drawBottom <= absoluteTop$1) {
						drawOuter(row, absoluteTop$1);
						drawLayers.draw(ctx);
						return;
					}
				}
				skipAbsoluteTop = absoluteTop$1;
			}
			let absoluteTop = initRow.top;
			for (let { row } = initRow; row < rowCount; row++) {
				const height = _getRowHeight.call(grid, row);
				_drawRow(
					grid,
					ctx,
					initFrozenCol,
					initCol,
					drawRight,
					row,
					absoluteTop,
					height,
					visibleRect,
					skipAbsoluteTop,
					drawLayers
				);
				absoluteTop += height;
				if (drawBottom <= absoluteTop) {
					drawOuter(row, absoluteTop);
					drawLayers.draw(ctx);
					return;
				}
			}
			drawOuter(rowCount - 1, absoluteTop);
			drawLayers.draw(ctx);
		}
		/** @private */
		function _toPxWidth(grid, width) {
			return Math.round(toPx(width, grid[_$2].calcWidthContext));
		}
		/** @private */
		function _adjustColWidth(grid, col, orgWidth) {
			const limits = _getColWidthLimits(grid, col);
			return Math.max(_applyColWidthLimits(limits, orgWidth), 0);
		}
		/** @private */
		function _applyColWidthLimits(limits, orgWidth) {
			if (!limits) return orgWidth;
			if (limits.min) {
				if (limits.min > orgWidth) return limits.min;
			}
			if (limits.max) {
				if (limits.max < orgWidth) return limits.max;
			}
			return orgWidth;
		}
		/**
		 * Gets the definition of the column width.
		 * @param {DrawGrid} grid grid instance
		 * @param {number} col number of column
		 * @returns {string|number} width definition
		 * @private
		 */
		function _getColWidthDefine(grid, col) {
			const width = grid[_$2].colWidthsMap.get(col);
			if (width) return width;
			return grid.defaultColWidth;
		}
		/**
		 * Gets the column width limits.
		 * @param {DrawGrid} grid grid instance
		 * @param {number} col number of column
		 * @returns {object|null} the column width limits
		 * @private
		 */
		function _getColWidthLimits(grid, col) {
			const limit = grid[_$2].colWidthsLimit[col];
			if (!limit) return null;
			const result = {};
			if (limit.min) {
				result.min = _toPxWidth(grid, limit.min);
				result.minDef = limit.min;
			}
			if (limit.max) {
				result.max = _toPxWidth(grid, limit.max);
				result.maxDef = limit.max;
			}
			return result;
		}
		/**
		 * Checks if the given width definition is `auto`.
		 * @param {string|number} width width definition to check
		 * @returns {boolean} `true ` if the given width definition is `auto`
		 * @private
		 */
		function isAutoDefine(width) {
			return Boolean(width && typeof width === "string" && width.toLowerCase() === "auto");
		}
		/**
		 * Creates a formula to calculate the auto width.
		 * @param {DrawGrid} grid grid instance
		 * @returns {string} formula
		 * @private
		 */
		function _calcAutoColWidthExpr(grid, shortCircuit = true) {
			const fullWidth = grid[_$2].calcWidthContext.full;
			let sumMin = 0;
			const others = [];
			let autoCount = 0;
			const hasLimitsOnAuto = [];
			for (let col = 0; col < grid[_$2].colCount; col++) {
				const def = _getColWidthDefine(grid, col);
				const limits = _getColWidthLimits(grid, col);
				if (isAutoDefine(def)) {
					if (limits) {
						hasLimitsOnAuto.push(limits);
						if (limits.min) sumMin += limits.min;
					}
					autoCount++;
				} else {
					let expr = def;
					if (limits) {
						const orgWidth = _toPxWidth(grid, expr);
						const newWidth = _applyColWidthLimits(limits, orgWidth);
						if (orgWidth !== newWidth) expr = `${newWidth}px`;
						sumMin += newWidth;
					}
					others.push(expr);
				}
				if (shortCircuit && sumMin > fullWidth) return "0px";
			}
			if (hasLimitsOnAuto.length && others.length) {
				const autoPx =
					(fullWidth -
						_toPxWidth(
							grid,
							`calc(${others.map(c => (typeof c === "number" ? `${c}px` : c)).join(" + ")})`
						)) /
					autoCount;
				hasLimitsOnAuto.forEach(limits => {
					if (limits.min && autoPx < limits.min) {
						others.push(limits.minDef);
						autoCount--;
					} else if (limits.max && limits.max < autoPx) {
						others.push(limits.maxDef);
						autoCount--;
					}
				});
				if (shortCircuit && autoCount <= 0) return `${autoPx}px`;
			}
			if (others.length) {
				const strDefs = [];
				let num = 0;
				others.forEach(c => {
					if (typeof c === "number") num += c;
					else strDefs.push(c);
				});
				strDefs.push(`${num}px`);
				return `calc((100% - (${strDefs.join(" + ")})) / ${autoCount})`;
			} else return `${100 / autoCount}%`;
		}
		/**
		 * Calculate the pixels of width from the definition of width.
		 * @param {DrawGrid} grid grid instance
		 * @param {string|number} width width definition
		 * @returns {number} the pixels of width
		 * @private
		 */
		function _colWidthDefineToPxWidth(grid, width) {
			if (isAutoDefine(width)) return _toPxWidth(grid, _calcAutoColWidthExpr(grid));
			return _toPxWidth(grid, width);
		}
		/** @private */
		function _getColWidth(grid, col) {
			const width = _getColWidthDefine(grid, col);
			return _adjustColWidth(grid, col, _colWidthDefineToPxWidth(grid, width));
		}
		/** @private */
		function _setColWidth(grid, col, width) {
			if (width != null) grid[_$2].colWidthsMap.put(col, width);
			else grid[_$2].colWidthsMap.remove(col);
		}
		/**
		 * Overwrites the definition of a column whose width is set to `auto` with the current auto width formula.
		 * @param {DrawGrid} grid grid instance
		 * @returns {void}
		 * @private
		 */
		function _storeAutoColWidthExprs(grid) {
			let expr = null;
			for (let col = 0; col < grid[_$2].colCount; col++) {
				const def = _getColWidthDefine(grid, col);
				if (isAutoDefine(def))
					_setColWidth(grid, col, expr || (expr = _calcAutoColWidthExpr(grid, false)));
			}
		}
		/** @private */
		function _getColsWidth(grid, startCol, endCol) {
			const defaultColPxWidth = _colWidthDefineToPxWidth(grid, grid.defaultColWidth);
			const colCount = endCol - startCol + 1;
			let w = defaultColPxWidth * colCount;
			grid[_$2].colWidthsMap.each(startCol, endCol, (width, col) => {
				w +=
					_adjustColWidth(grid, col, _colWidthDefineToPxWidth(grid, width)) -
					defaultColPxWidth;
			});
			for (let col = startCol; col <= endCol; col++) {
				if (grid[_$2].colWidthsMap.has(col)) continue;
				const adj = _adjustColWidth(grid, col, defaultColPxWidth);
				if (adj !== defaultColPxWidth) w += adj - defaultColPxWidth;
			}
			return w;
		}
		/** @private */
		function _getRowHeight(row) {
			const internal = this.getRowHeightInternal(row);
			if (internal != null) return internal;
			const height = this[_$2].rowHeightsMap.get(row);
			if (height) return height;
			return this[_$2].defaultRowHeight;
		}
		/** @private */
		function _setRowHeight(grid, row, height) {
			if (height != null) grid[_$2].rowHeightsMap.put(row, height);
			else grid[_$2].rowHeightsMap.remove(row);
		}
		/** @private */
		function _getRowsHeight(startRow, endRow) {
			const internal = this.getRowsHeightInternal(startRow, endRow);
			if (internal != null) return internal;
			const rowCount = endRow - startRow + 1;
			let h = this[_$2].defaultRowHeight * rowCount;
			this[_$2].rowHeightsMap.each(startRow, endRow, height => {
				h += height - this[_$2].defaultRowHeight;
			});
			return h;
		}
		/** @private */
		function _getScrollWidth(grid) {
			return _getColsWidth(grid, 0, grid[_$2].colCount - 1);
		}
		/** @private */
		function _getScrollHeight(row) {
			const internal = this.getScrollHeightInternal(row);
			if (internal != null) return internal;
			let h = this[_$2].defaultRowHeight * this[_$2].rowCount;
			this[_$2].rowHeightsMap.each(0, this[_$2].rowCount - 1, height => {
				h += height - this[_$2].defaultRowHeight;
			});
			return h;
		}
		/** @private */
		function _onScroll(grid, _e) {
			const lastLeft = grid[_$2].scroll.left;
			const lastTop = grid[_$2].scroll.top;
			const moveX = grid[_$2].scrollable.scrollLeft - lastLeft;
			const moveY = grid[_$2].scrollable.scrollTop - lastTop;
			grid[_$2].scroll = {
				left: grid[_$2].scrollable.scrollLeft,
				top: grid[_$2].scrollable.scrollTop
			};
			const { focus } = grid[_$2].selection;
			const isFrozenCell = grid.isFrozenCell(focus.col, focus.row);
			if (
				isFrozenCell &&
				(((isFrozenCell === null || isFrozenCell === void 0 ? void 0 : isFrozenCell.col) &&
					moveX) ||
					((isFrozenCell === null || isFrozenCell === void 0
						? void 0
						: isFrozenCell.row) &&
						moveY))
			)
				grid.setFocusCursor(focus.col, focus.row);
			const visibleRect = _getVisibleRect(grid);
			if (Math.abs(moveX) >= visibleRect.width || Math.abs(moveY) >= visibleRect.height)
				_invalidateRect(grid, visibleRect);
			else {
				grid[_$2].context.drawImage(grid[_$2].canvas, -moveX, -moveY);
				if (moveX !== 0) {
					const redrawRect = visibleRect.copy();
					if (moveX < 0) {
						redrawRect.width = -moveX;
						if (grid[_$2].frozenColCount > 0) {
							const frozenRect = _getFrozenColsRect(grid);
							redrawRect.width += frozenRect.width;
						}
					} else if (moveX > 0) redrawRect.left = redrawRect.right - moveX;
					_invalidateRect(grid, redrawRect);
					if (moveX > 0) {
						if (grid[_$2].frozenColCount > 0)
							_invalidateRect(grid, _getFrozenColsRect(grid));
					}
				}
				if (moveY !== 0) {
					const redrawRect = visibleRect.copy();
					if (moveY < 0) {
						redrawRect.height = -moveY;
						if (grid[_$2].frozenRowCount > 0) {
							const frozenRect = _getFrozenRowsRect(grid);
							redrawRect.height += frozenRect.height;
						}
					} else if (moveY > 0) redrawRect.top = redrawRect.bottom - moveY;
					_invalidateRect(grid, redrawRect);
					if (moveY > 0) {
						if (grid[_$2].frozenRowCount > 0)
							_invalidateRect(grid, _getFrozenRowsRect(grid));
					}
				}
			}
		}
		/** @private */
		function _onKeyDownMove(e) {
			var _this$keyboardOptions, _this$keyboardOptions2, _this$keyboardOptions3;
			const keyCode = getKeyCode(e);
			const focusCell = e.shiftKey ? this.selection.focus : this.selection.select;
			const ctrlOrMeta = e.ctrlKey || e.metaKey;
			if (keyCode === KEY_LEFT) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, null, "W", e.shiftKey);
				else if (!hMove.call(this, "W", e.shiftKey)) return;
				cancelEvent(e);
			} else if (keyCode === KEY_UP) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, "N", null, e.shiftKey);
				else if (!vMove.call(this, "N", e.shiftKey)) return;
				cancelEvent(e);
			} else if (keyCode === KEY_RIGHT) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, null, "E", e.shiftKey);
				else if (!hMove.call(this, "E", e.shiftKey)) return;
				cancelEvent(e);
			} else if (keyCode === KEY_DOWN) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, "S", null, e.shiftKey);
				else if (!vMove.call(this, "S", e.shiftKey)) return;
				cancelEvent(e);
			} else if (keyCode === KEY_HOME) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, "N", "W", e.shiftKey);
				else move(this, null, "W", e.shiftKey);
				cancelEvent(e);
			} else if (keyCode === KEY_END) {
				if (e.altKey) return;
				if (ctrlOrMeta) move(this, "S", "E", e.shiftKey);
				else move(this, null, "E", e.shiftKey);
				cancelEvent(e);
			} else if (
				((_this$keyboardOptions = this.keyboardOptions) === null ||
				_this$keyboardOptions === void 0
					? void 0
					: _this$keyboardOptions.moveCellOnTab) &&
				keyCode === KEY_TAB
			) {
				if (e.altKey || ctrlOrMeta) return;
				let newCell = null;
				if (typeof this.keyboardOptions.moveCellOnTab === "function")
					newCell = this.keyboardOptions.moveCellOnTab({
						cell: focusCell,
						grid: this,
						event: e
					});
				if (newCell) _moveFocusCell.call(this, newCell.col, newCell.row, false);
				else if (e.shiftKey) {
					if (!hMove.call(this, "W", false)) {
						const row = this.getMoveUpRowByKeyDownInternal(focusCell);
						if (0 > row) return;
						_moveFocusCell.call(this, this.colCount - 1, row, false);
					}
				} else if (!hMove.call(this, "E", false)) {
					const row = this.getMoveDownRowByKeyDownInternal(focusCell);
					if (this.rowCount <= row) return;
					_moveFocusCell.call(this, 0, row, false);
				}
				cancelEvent(e);
			} else if (
				((_this$keyboardOptions2 = this.keyboardOptions) === null ||
				_this$keyboardOptions2 === void 0
					? void 0
					: _this$keyboardOptions2.moveCellOnEnter) &&
				keyCode === KEY_ENTER$1
			) {
				if (e.altKey || ctrlOrMeta) return;
				let newCell = null;
				if (typeof this.keyboardOptions.moveCellOnEnter === "function")
					newCell = this.keyboardOptions.moveCellOnEnter({
						cell: focusCell,
						grid: this,
						event: e
					});
				if (newCell) _moveFocusCell.call(this, newCell.col, newCell.row, false);
				else if (e.shiftKey) {
					if (!vMove.call(this, "N", false)) {
						const col = this.getMoveLeftColByKeyDownInternal(focusCell);
						if (0 > col) return;
						_moveFocusCell.call(this, col, this.rowCount - 1, false);
					}
				} else if (!vMove.call(this, "S", false)) {
					const col = this.getMoveRightColByKeyDownInternal(focusCell);
					if (this.colCount <= col) return;
					_moveFocusCell.call(
						this,
						col,
						Math.min(this.frozenRowCount, this.rowCount - 1),
						false
					);
				}
				cancelEvent(e);
			} else if (
				((_this$keyboardOptions3 = this.keyboardOptions) === null ||
				_this$keyboardOptions3 === void 0
					? void 0
					: _this$keyboardOptions3.selectAllOnCtrlA) &&
				keyCode === KEY_ALPHA_A
			) {
				if (e.altKey || e.shiftKey) return;
				if (!ctrlOrMeta) return;
				this.selection.range = {
					start: {
						col: 0,
						row: 0
					},
					end: {
						col: this.colCount - 1,
						row: this.rowCount - 1
					}
				};
				this.invalidate();
				cancelEvent(e);
			}
			function move(grid, vDir, hDir, shiftKeyFlg) {
				const row = vDir === "S" ? grid.rowCount - 1 : vDir === "N" ? 0 : focusCell.row;
				const col = hDir === "E" ? grid.colCount - 1 : hDir === "W" ? 0 : focusCell.col;
				_moveFocusCell.call(grid, col, row, shiftKeyFlg);
			}
			function vMove(vDir, shiftKeyFlg) {
				const { col } = focusCell;
				let row;
				if (vDir === "S") {
					row = this.getMoveDownRowByKeyDownInternal(focusCell);
					if (this.rowCount <= row) {
						this.makeVisibleCell(col, this.rowCount - 1);
						return false;
					}
				} else {
					row = this.getMoveUpRowByKeyDownInternal(focusCell);
					if (row < 0) {
						this.makeVisibleCell(col, 0);
						return false;
					}
				}
				_moveFocusCell.call(this, col, row, shiftKeyFlg);
				return true;
			}
			function hMove(hDir, shiftKeyFlg) {
				const { row } = focusCell;
				let col;
				if (hDir === "E") {
					col = this.getMoveRightColByKeyDownInternal(focusCell);
					if (this.colCount <= col) {
						this.makeVisibleCell(this.colCount - 1, row);
						return false;
					}
				} else {
					col = this.getMoveLeftColByKeyDownInternal(focusCell);
					if (col < 0) {
						this.makeVisibleCell(0, row);
						return false;
					}
				}
				_moveFocusCell.call(this, col, row, shiftKeyFlg);
				return true;
			}
		}
		/** @private */
		function _moveFocusCell(col, row, shiftKey) {
			const offset = this.getOffsetInvalidateCells();
			function extendRange(range) {
				if (offset > 0) {
					range.start.col -= offset;
					range.start.row -= offset;
					range.end.col += offset;
					range.end.row += offset;
				}
				return range;
			}
			const beforeRange = extendRange(this.selection.range);
			const beforeRect = this.getCellRangeRect(beforeRange);
			this.selection._setFocusCell(col, row, shiftKey);
			this.makeVisibleCell(col, row);
			this.focusCell(col, row);
			const afterRange = extendRange(this.selection.range);
			const afterRect = this.getCellRangeRect(afterRange);
			if (afterRect.intersection(beforeRect)) {
				const invalidateRect = Rect.max(afterRect, beforeRect);
				_invalidateRect(this, invalidateRect);
			} else {
				_invalidateRect(this, beforeRect);
				_invalidateRect(this, afterRect);
			}
		}
		/** @private */
		function _updatedSelection() {
			const { focusControl } = this[_$2];
			const { col: selCol, row: selRow } = this[_$2].selection.select;
			const results = this.fireListeners(DG_EVENT_TYPE.EDITABLEINPUT_CELL, {
				col: selCol,
				row: selRow
			});
			const editMode = results.findIndex(v => !!v) >= 0;
			focusControl.editMode = editMode;
			if (editMode) {
				focusControl.storeInputStatus();
				focusControl.setDefaultInputStatus();
				this.fireListeners(DG_EVENT_TYPE.MODIFY_STATUS_EDITABLEINPUT_CELL, {
					col: selCol,
					row: selRow,
					input: focusControl.input
				});
			}
		}
		/** @private */
		function _getMouseAbstractPoint(grid, evt) {
			let e;
			if (isTouchEvent(evt)) e = evt.changedTouches[0];
			else e = evt;
			const clientX = e.clientX || e.pageX + window.scrollX;
			const clientY = e.clientY || e.pageY + window.scrollY;
			const rect = grid[_$2].canvas.getBoundingClientRect();
			if (rect.right <= clientX) return null;
			if (rect.bottom <= clientY) return null;
			const x = clientX - rect.left + grid[_$2].scroll.left;
			const y = clientY - rect.top + grid[_$2].scroll.top;
			return {
				x,
				y
			};
		}
		/** @private */
		function _bindEvents() {
			const grid = this;
			const { handler: handler$1, element, scrollable } = grid[_$2];
			const getCellEventArgsSet = e => {
				const abstractPos = _getMouseAbstractPoint(grid, e);
				if (!abstractPos) return {};
				const cell = grid.getCellAt(abstractPos.x, abstractPos.y);
				if (cell.col < 0 || cell.row < 0)
					return {
						abstractPos,
						cell
					};
				const eventArgs = {
					col: cell.col,
					row: cell.row,
					event: e
				};
				return {
					abstractPos,
					cell,
					eventArgs
				};
			};
			const canResizeColumn = col => {
				if (grid[_$2].disableColumnResize) return false;
				const limit = grid[_$2].colWidthsLimit[col];
				if (!limit || !limit.min || !limit.max) return true;
				return limit.max !== limit.min;
			};
			handler$1.on(element, "mousedown", e => {
				const eventArgsSet = getCellEventArgsSet(e);
				const { abstractPos, eventArgs } = eventArgsSet;
				if (!abstractPos) return;
				if (eventArgs) {
					const results = grid.fireListeners(DG_EVENT_TYPE.MOUSEDOWN_CELL, eventArgs);
					if (results.findIndex(v => !v) >= 0) return;
				}
				if (e.buttons !== 1 && e.buttons !== 0) return;
				const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y);
				if (resizeCol >= 0 && canResizeColumn(resizeCol))
					grid[_$2].columnResizer.start(resizeCol, e);
				else grid[_$2].cellSelector.start(e);
			});
			handler$1.on(element, "mouseup", e => {
				if (!grid.hasListeners(DG_EVENT_TYPE.MOUSEUP_CELL)) return;
				const { eventArgs } = getCellEventArgsSet(e);
				if (eventArgs) grid.fireListeners(DG_EVENT_TYPE.MOUSEUP_CELL, eventArgs);
			});
			let doubleTapBefore = null;
			let longTouchId = null;
			let useTouch = null;
			function useTouchStart() {
				if (
					(useTouch === null || useTouch === void 0 ? void 0 : useTouch.timeoutId) != null
				)
					clearTimeout(useTouch.timeoutId);
				useTouch = {};
			}
			function useTouchEnd() {
				if (useTouch) {
					if (useTouch.timeoutId != null) clearTimeout(useTouch.timeoutId);
					useTouch.timeoutId = setTimeout(() => {
						useTouch = null;
					}, 400);
				}
			}
			handler$1.on(element, "touchstart", e => {
				useTouchStart();
				const { eventArgs } = getCellEventArgsSet(e);
				if (eventArgs) grid.fireListeners(DG_EVENT_TYPE.TOUCHSTART_CELL, eventArgs);
				if (!doubleTapBefore) {
					doubleTapBefore = eventArgs;
					setTimeout(() => {
						doubleTapBefore = null;
					}, 350);
				} else {
					if (
						eventArgs &&
						eventArgs.col === doubleTapBefore.col &&
						eventArgs.row === doubleTapBefore.row
					)
						grid.fireListeners(DG_EVENT_TYPE.DBLTAP_CELL, eventArgs);
					doubleTapBefore = null;
					if (e.defaultPrevented) return;
				}
				if (e.targetTouches.length > 1) return;
				longTouchId = setTimeout(() => {
					longTouchId = null;
					const abstractPos = _getMouseAbstractPoint(grid, e);
					if (!abstractPos) return;
					const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y, 15);
					if (resizeCol >= 0 && canResizeColumn(resizeCol))
						grid[_$2].columnResizer.start(resizeCol, e);
					else grid[_$2].cellSelector.start(e);
				}, 500);
			});
			function cancel$1(_e) {
				if (longTouchId) {
					clearTimeout(longTouchId);
					longTouchId = null;
				}
			}
			handler$1.on(element, "touchcancel", e => {
				cancel$1(e);
				useTouchEnd();
			});
			handler$1.on(element, "touchmove", cancel$1);
			handler$1.on(element, "touchend", e => {
				useTouchEnd();
				if (longTouchId) {
					clearTimeout(longTouchId);
					grid[_$2].cellSelector.select(e);
					longTouchId = null;
				}
			});
			let isMouseover = false;
			let mouseEnterCell = null;
			let mouseOverCell = null;
			function onMouseenterCell(cell, props$1) {
				grid.fireListeners(DG_EVENT_TYPE.MOUSEENTER_CELL, {
					...props$1,
					col: cell.col,
					row: cell.row
				});
				mouseEnterCell = cell;
			}
			function onMouseleaveCell(props$1) {
				const beforeMouseCell = mouseEnterCell;
				mouseEnterCell = null;
				if (beforeMouseCell)
					grid.fireListeners(DG_EVENT_TYPE.MOUSELEAVE_CELL, {
						...props$1,
						col: beforeMouseCell.col,
						row: beforeMouseCell.row
					});
				return beforeMouseCell || void 0;
			}
			function onMouseoverCell(cell, props$1) {
				grid.fireListeners(DG_EVENT_TYPE.MOUSEOVER_CELL, {
					...props$1,
					col: cell.col,
					row: cell.row
				});
				mouseOverCell = cell;
			}
			function onMouseoutCell(props$1) {
				const beforeMouseCell = mouseOverCell;
				mouseOverCell = null;
				if (beforeMouseCell)
					grid.fireListeners(DG_EVENT_TYPE.MOUSEOUT_CELL, {
						...props$1,
						col: beforeMouseCell.col,
						row: beforeMouseCell.row
					});
				return beforeMouseCell || void 0;
			}
			const scrollElement = scrollable.getElement();
			handler$1.on(scrollElement, "mouseover", _e => {
				isMouseover = true;
			});
			handler$1.on(scrollElement, "mouseout", event$1 => {
				isMouseover = false;
				onMouseoutCell({ event: event$1 });
			});
			handler$1.on(element, "mouseleave", event$1 => {
				onMouseleaveCell({ event: event$1 });
			});
			handler$1.on(element, "mousemove", e => {
				if (useTouch) return;
				const eventArgsSet = getCellEventArgsSet(e);
				const { abstractPos, eventArgs } = eventArgsSet;
				if (eventArgs) {
					const beforeMouseCell = mouseEnterCell;
					if (beforeMouseCell) {
						grid.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
						if (
							beforeMouseCell.col !== eventArgs.col ||
							beforeMouseCell.row !== eventArgs.row
						) {
							const enterCell = {
								col: eventArgs.col,
								row: eventArgs.row
							};
							const outCell = onMouseoutCell({
								related: enterCell,
								event: e
							});
							const leaveCell = onMouseleaveCell({
								related: enterCell,
								event: e
							});
							onMouseenterCell(enterCell, {
								related: leaveCell,
								event: e
							});
							if (isMouseover)
								onMouseoverCell(enterCell, {
									related: outCell,
									event: e
								});
						} else if (isMouseover && !mouseOverCell)
							onMouseoverCell(
								{
									col: eventArgs.col,
									row: eventArgs.row
								},
								{ event: e }
							);
					} else {
						const enterCell = {
							col: eventArgs.col,
							row: eventArgs.row
						};
						onMouseenterCell(enterCell, { event: e });
						if (isMouseover) onMouseoverCell(enterCell, { event: e });
						grid.fireListeners(DG_EVENT_TYPE.MOUSEMOVE_CELL, eventArgs);
					}
				} else {
					onMouseoutCell({ event: e });
					onMouseleaveCell({ event: e });
				}
				if (grid[_$2].columnResizer.moving(e) || grid[_$2].cellSelector.moving(e)) return;
				const { style: style$1 } = element;
				if (!abstractPos) {
					if (style$1.cursor === "col-resize") style$1.cursor = "";
					return;
				}
				const resizeCol = _getResizeColAt(grid, abstractPos.x, abstractPos.y);
				if (resizeCol >= 0 && canResizeColumn(resizeCol)) style$1.cursor = "col-resize";
				else if (style$1.cursor === "col-resize") style$1.cursor = "";
			});
			handler$1.on(element, "click", e => {
				if (grid[_$2].columnResizer.lastMoving(e) || grid[_$2].cellSelector.lastMoving(e))
					return;
				if (!grid.hasListeners(DG_EVENT_TYPE.CLICK_CELL)) return;
				const { eventArgs } = getCellEventArgsSet(e);
				if (!eventArgs) return;
				grid.fireListeners(DG_EVENT_TYPE.CLICK_CELL, eventArgs);
			});
			handler$1.on(element, "contextmenu", e => {
				if (!grid.hasListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL)) return;
				const { eventArgs } = getCellEventArgsSet(e);
				if (!eventArgs) return;
				grid.fireListeners(DG_EVENT_TYPE.CONTEXTMENU_CELL, eventArgs);
			});
			handler$1.on(element, "dblclick", e => {
				if (!grid.hasListeners(DG_EVENT_TYPE.DBLCLICK_CELL)) return;
				const { eventArgs } = getCellEventArgsSet(e);
				if (!eventArgs) return;
				grid.fireListeners(DG_EVENT_TYPE.DBLCLICK_CELL, eventArgs);
			});
			grid[_$2].focusControl.onKeyDown(evt => {
				grid.fireListeners(DG_EVENT_TYPE.KEYDOWN, evt);
			});
			grid[_$2].selection.listen(DG_EVENT_TYPE.SELECTED_CELL, data => {
				grid.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, data, data.selected);
			});
			scrollable.onScroll(e => {
				_onScroll(grid, e);
				grid.fireListeners(DG_EVENT_TYPE.SCROLL, { event: e });
			});
			grid[_$2].focusControl.onKeyDownMove(e => {
				_onKeyDownMove.call(grid, e);
			});
			grid.listen("copydata", range => {
				const copyRange = grid.getCopyRangeInternal(range);
				const copyLines = [];
				for (let { row } = copyRange.start; row <= copyRange.end.row; row++) {
					let copyLine = "";
					for (let { col } = copyRange.start; col <= copyRange.end.col; col++) {
						const copyCellValue = grid.getCopyCellValue(col, row, copyRange);
						let strCellValue;
						if (typeof copyCellValue === "string") strCellValue = copyCellValue;
						else if (
							copyCellValue == null ||
							(typeof Promise !== "undefined" && copyCellValue instanceof Promise)
						)
							strCellValue = "";
						else {
							strCellValue = `${copyCellValue}`;
							if (/^\[object .*\]$/.exec(strCellValue)) strCellValue = "";
						}
						copyLine += /[\t\n]/.test(strCellValue)
							? `"${strCellValue.replace(/"/g, '""')}"`
							: strCellValue;
						if (col < copyRange.end.col) copyLine += "	";
					}
					copyLines.push(copyLine);
				}
				return copyLines.join("\n");
			});
			grid[_$2].focusControl.onCopy(_e =>
				grid.fireListeners("copydata", grid[_$2].selection.range).find(r => r != null)
			);
			grid[_$2].focusControl.onPaste(({ value, event: event$1 }) => {
				const { trimOnPaste } = grid;
				const normalizedValue = normalizePasteValue(value);
				const { col, row } = grid[_$2].selection.select;
				const multi = /[\r\n\u2028\u2029\t]/.test(normalizedValue);
				let rangeBoxValues = null;
				const pasteCellEvent = {
					col,
					row,
					value,
					normalizeValue: trimOnPaste ? normalizedValue.trim() : normalizedValue,
					multi,
					get rangeBoxValues() {
						var _rangeBoxValues;
						return (_rangeBoxValues = rangeBoxValues) !== null &&
							_rangeBoxValues !== void 0
							? _rangeBoxValues
							: (rangeBoxValues = parsePasteRangeBoxValues(normalizedValue, {
									trimOnPaste
								}));
					},
					event: event$1
				};
				grid.fireListeners(DG_EVENT_TYPE.PASTE_CELL, pasteCellEvent);
			});
			grid[_$2].focusControl.onInput(value => {
				const { col, row } = grid[_$2].selection.select;
				grid.fireListeners(DG_EVENT_TYPE.INPUT_CELL, {
					col,
					row,
					value
				});
			});
			grid[_$2].focusControl.onDelete(event$1 => {
				const { col, row } = grid[_$2].selection.select;
				grid.fireListeners(DG_EVENT_TYPE.DELETE_CELL, {
					col,
					row,
					event: event$1
				});
			});
			grid[_$2].focusControl.onFocus(e => {
				grid.fireListeners(DG_EVENT_TYPE.FOCUS_GRID, e);
				grid[_$2].focusedGrid = true;
				const { col, row } = grid[_$2].selection.select;
				grid.invalidateCell(col, row);
			});
			grid[_$2].focusControl.onBlur(e => {
				grid.fireListeners(DG_EVENT_TYPE.BLUR_GRID, e);
				grid[_$2].focusedGrid = false;
				const { col, row } = grid[_$2].selection.select;
				grid.invalidateCell(col, row);
			});
		}
		/** @private */
		function _getResizeColAt(grid, abstractX, abstractY, offset = 5) {
			if (grid[_$2].frozenRowCount <= 0) return -1;
			const frozenRect = _getFrozenRowsRect(grid);
			if (!frozenRect.inPoint(abstractX, abstractY)) return -1;
			const cell = grid.getCellAt(abstractX, abstractY);
			const cellRect = grid.getCellRect(cell.col, cell.row);
			if (abstractX < cellRect.left + offset) return cell.col - 1;
			if (cellRect.right - offset < abstractX) return cell.col;
			return -1;
		}
		/** @private */
		function _getVisibleRect(grid) {
			const {
				scroll: { left, top },
				canvas: { width, height }
			} = grid[_$2];
			return new Rect(left, top, width, height);
		}
		/** @private */
		function _getScrollableVisibleRect(grid) {
			let frozenColsWidth = 0;
			if (grid[_$2].frozenColCount > 0) {
				const frozenRect = _getFrozenColsRect(grid);
				frozenColsWidth = frozenRect.width;
			}
			let frozenRowsHeight = 0;
			if (grid[_$2].frozenRowCount > 0) {
				const frozenRect = _getFrozenRowsRect(grid);
				frozenRowsHeight = frozenRect.height;
			}
			return new Rect(
				grid[_$2].scrollable.scrollLeft + frozenColsWidth,
				grid[_$2].scrollable.scrollTop + frozenRowsHeight,
				grid[_$2].canvas.width - frozenColsWidth,
				grid[_$2].canvas.height - frozenRowsHeight
			);
		}
		/** @private */
		function _toRelativeRect(grid, absoluteRect) {
			const rect = absoluteRect.copy();
			const visibleRect = _getVisibleRect(grid);
			rect.offsetLeft(-visibleRect.left);
			rect.offsetTop(-visibleRect.top);
			return rect;
		}
		/**
		 * managing mouse down moving
		 * @private
		 */
		var BaseMouseDownMover = class {
			constructor(grid) {
				(0, import_defineProperty$24.default)(this, "_grid", void 0);
				(0, import_defineProperty$24.default)(this, "_handler", void 0);
				(0, import_defineProperty$24.default)(this, "_events", void 0);
				(0, import_defineProperty$24.default)(this, "_started", void 0);
				(0, import_defineProperty$24.default)(this, "_moved", void 0);
				(0, import_defineProperty$24.default)(this, "_mouseEndPoint", void 0);
				this._grid = grid;
				this._handler = new EventHandler();
				this._events = {};
				this._started = false;
				this._moved = false;
			}
			moving(_e) {
				return !!this._started;
			}
			lastMoving(e) {
				if (this.moving(e)) return true;
				const last = this._mouseEndPoint;
				if (!last) return false;
				const pt = _getMouseAbstractPoint(this._grid, e);
				return pt != null && pt.x === last.x && pt.y === last.y;
			}
			_bindMoveAndUp(e) {
				const events = this._events;
				const handler$1 = this._handler;
				if (!isTouchEvent(e)) {
					events.mousemove = handler$1.on(document.body, "mousemove", e$1 =>
						this._mouseMove(e$1)
					);
					events.mouseup = handler$1.on(document.body, "mouseup", e$1 =>
						this._mouseUp(e$1)
					);
				} else {
					events.touchmove = handler$1.on(
						document.body,
						"touchmove",
						e$1 => this._mouseMove(e$1),
						{ passive: false }
					);
					events.touchend = handler$1.on(document.body, "touchend", e$1 =>
						this._mouseUp(e$1)
					);
					events.touchcancel = handler$1.on(document.body, "touchcancel", e$1 =>
						this._mouseUp(e$1)
					);
				}
				this._started = true;
				this._moved = false;
			}
			_mouseMove(e) {
				if (!isTouchEvent(e)) {
					if (e.buttons !== 1) {
						this._mouseUp(e);
						return;
					}
				}
				this._moved = this._moveInternal(e) || this._moved;
				cancelEvent(e);
			}
			_moveInternal(_e) {
				return false;
			}
			_mouseUp(e) {
				const events = this._events;
				const handler$1 = this._handler;
				handler$1.off(events.mousemove);
				handler$1.off(events.touchmove);
				handler$1.off(events.mouseup);
				handler$1.off(events.touchend);
				handler$1.off(events.touchcancel);
				this._started = false;
				this._upInternal(e);
				if (this._moved) {
					this._mouseEndPoint = _getMouseAbstractPoint(this._grid, e);
					setTimeout(() => {
						this._mouseEndPoint = null;
					}, 10);
				}
			}
			_upInternal(_e) {}
			dispose() {
				this._handler.dispose();
			}
		};
		/**
		 * managing cell selection operation with mouse
		 * @private
		 */
		var CellSelector = class extends BaseMouseDownMover {
			constructor(..._args) {
				super(..._args);
				(0, import_defineProperty$24.default)(this, "_cell", void 0);
			}
			start(e) {
				const cell = this._getTargetCell(e);
				if (!cell) return;
				_moveFocusCell.call(this._grid, cell.col, cell.row, e.shiftKey);
				this._bindMoveAndUp(e);
				this._cell = cell;
				cancelEvent(e);
				_vibrate(e);
			}
			select(e) {
				const cell = this._getTargetCell(e);
				if (!cell) return;
				_moveFocusCell.call(this._grid, cell.col, cell.row, e.shiftKey);
				this._cell = cell;
			}
			_moveInternal(e) {
				const cell = this._getTargetCell(e);
				if (!cell) return false;
				const { col: oldCol, row: oldRow } = this._cell;
				const { col: newCol, row: newRow } = cell;
				if (oldCol === newCol && oldRow === newRow) return false;
				const grid = this._grid;
				_moveFocusCell.call(grid, newCol, newRow, true);
				const makeVisibleCol = (() => {
					if (newCol < oldCol && 0 < newCol) return newCol - 1;
					else if (oldCol < newCol && newCol + 1 < grid.colCount) return newCol + 1;
					return newCol;
				})();
				const makeVisibleRow = (() => {
					if (newRow < oldRow && 0 < newRow) return newRow - 1;
					else if (oldRow < newRow && newRow + 1 < grid.rowCount) return newRow + 1;
					return newRow;
				})();
				if (makeVisibleCol !== newCol || makeVisibleRow !== newRow)
					grid.makeVisibleCell(makeVisibleCol, makeVisibleRow);
				this._cell = cell;
				return true;
			}
			_getTargetCell(e) {
				const grid = this._grid;
				const abstractPos = _getMouseAbstractPoint(grid, e);
				if (!abstractPos) return null;
				const cell = grid.getCellAt(abstractPos.x, abstractPos.y);
				if (cell.col < 0 || cell.row < 0) return null;
				return cell;
			}
		};
		/**
		 * managing row width changing operation with mouse
		 * @private
		 */
		var ColumnResizer = class extends BaseMouseDownMover {
			constructor(grid) {
				super(grid);
				(0, import_defineProperty$24.default)(this, "_targetCol", void 0);
				(0, import_defineProperty$24.default)(this, "_x", -1);
				(0, import_defineProperty$24.default)(this, "_preX", -1);
				(0, import_defineProperty$24.default)(this, "_invalidateAbsoluteLeft", -1);
				this._targetCol = -1;
			}
			start(col, e) {
				let pageX;
				if (!isTouchEvent(e)) ({ pageX } = e);
				else ({ pageX } = e.changedTouches[0]);
				this._x = pageX;
				this._preX = 0;
				this._bindMoveAndUp(e);
				this._targetCol = col;
				this._invalidateAbsoluteLeft = _getColsWidth(this._grid, 0, col - 1);
				cancelEvent(e);
				_vibrate(e);
			}
			_moveInternal(e) {
				const pageX = isTouchEvent(e) ? e.changedTouches[0].pageX : e.pageX;
				const x = pageX - this._x;
				const moveX = x - this._preX;
				this._preX = x;
				const pre = this._grid.getColWidth(this._targetCol);
				let afterSize = _adjustColWidth(this._grid, this._targetCol, pre + moveX);
				if (afterSize < 10 && moveX < 0) afterSize = 10;
				_storeAutoColWidthExprs(this._grid);
				_setColWidth(this._grid, this._targetCol, afterSize);
				const rect = _getVisibleRect(this._grid);
				rect.left = this._invalidateAbsoluteLeft;
				_invalidateRect(this._grid, rect);
				this._grid.fireListeners(DG_EVENT_TYPE.RESIZE_COLUMN, { col: this._targetCol });
				return true;
			}
			_upInternal(_e) {
				const grid = this._grid;
				if (grid.updateScroll()) grid.invalidate();
			}
		};
		/** @private */
		function setSafeInputValue(input, value) {
			const { type } = input;
			input.type = "";
			input.value = value;
			if (type) input.type = type;
		}
		const IGNORE_STORE_ATTRS = ["style", "readonly"];
		/**
		 * Manage focus
		 * @private
		 */
		var FocusControl = class extends EventTarget {
			constructor(grid, parentElement, scrollable, selection) {
				super();
				(0, import_defineProperty$24.default)(this, "_grid", void 0);
				(0, import_defineProperty$24.default)(this, "_scrollable", void 0);
				(0, import_defineProperty$24.default)(this, "_handler", void 0);
				(0, import_defineProperty$24.default)(this, "_input", void 0);
				(0, import_defineProperty$24.default)(this, "_isComposition", void 0);
				(0, import_defineProperty$24.default)(this, "_compositionEnd", void 0);
				(0, import_defineProperty$24.default)(this, "_inputStatus", void 0);
				(0, import_defineProperty$24.default)(this, "_keyDownMoveCallback", void 0);
				this._grid = grid;
				this._scrollable = scrollable;
				const handler$1 = (this._handler = new EventHandler());
				const input = (this._input = document.createElement("input"));
				input.classList.add("grid-focus-control");
				input.readOnly = true;
				parentElement.appendChild(input);
				handler$1.on(input, "compositionstart", _e => {
					input.classList.add("composition");
					input.style.font = grid.font || "16px sans-serif";
					this._isComposition = true;
					if (this._compositionEnd) {
						clearTimeout(this._compositionEnd);
						delete this._compositionEnd;
					}
					grid.focus();
				});
				let lastInputValue;
				const inputClear = storeLastInputValue => {
					lastInputValue = input.value;
					if (this._isComposition) return;
					if (lastInputValue !== "") setSafeInputValue(input, "");
					if (!storeLastInputValue) lastInputValue = "";
				};
				const handleCompositionEnd = () => {
					this._isComposition = false;
					input.classList.remove("composition");
					input.style.font = "";
					const { value } = input;
					inputClear(false);
					if (!input.readOnly) this.fireListeners("input", value);
					if (this._compositionEnd) {
						clearTimeout(this._compositionEnd);
						delete this._compositionEnd;
					}
				};
				handler$1.on(input, "compositionend", _e => {
					this._compositionEnd = setTimeout(handleCompositionEnd, 1);
				});
				selection.listen("before_hook", () => {
					if (this._compositionEnd) handleCompositionEnd();
				});
				handler$1.on(input, "keypress", e => {
					if (this._isComposition) return;
					if (!input.readOnly && e.key && e.key.length === 1)
						if (e.ctrlKey || e.metaKey) {
							if (e.key === "c") {
							} else if (e.key === "v") {
							}
						} else {
							if (e.key === " ") return;
							this.fireListeners("input", e.key);
							cancelEvent(e);
						}
					inputClear(true);
				});
				handler$1.on(input, "keydown", e => {
					var _this$_grid$keyboardO;
					if (this._isComposition) {
						if (this._compositionEnd) {
							handleCompositionEnd();
							cancelEvent(e);
						}
						return;
					}
					const keyCode = getKeyCode(e);
					let stopCellMove = false;
					const evt = {
						keyCode,
						event: e,
						stopCellMoving() {
							stopCellMove = true;
						}
					};
					this.fireListeners("keydown", evt);
					if (!input.readOnly && lastInputValue)
						this.fireListeners("input", lastInputValue);
					if (!stopCellMove) this.fireKeyDownMove(keyCode, e);
					if (
						((_this$_grid$keyboardO = this._grid.keyboardOptions) === null ||
						_this$_grid$keyboardO === void 0
							? void 0
							: _this$_grid$keyboardO.deleteCellValueOnDel) &&
						(keyCode === KEY_DEL || keyCode === KEY_BS)
					)
						this.fireListeners("delete", e);
					inputClear(true);
				});
				handler$1.on(input, "keyup", _e => {
					if (this._isComposition) {
						if (this._compositionEnd) handleCompositionEnd();
					}
					inputClear(true);
				});
				handler$1.on(input, "input", e => {
					if (e.data === " " || e.data === "　") this.fireListeners("input", e.data);
					inputClear(true);
				});
				if (browser.Edge)
					handler$1.once(document, "keydown", e => {
						var _dummyInput$parentEle;
						if (!isDescendantElement(parentElement, e.target)) return;
						const dummyInput = document.createElement("input");
						grid.getElement().appendChild(dummyInput);
						dummyInput.focus();
						input.focus();
						(_dummyInput$parentEle = dummyInput.parentElement) === null ||
							_dummyInput$parentEle === void 0 ||
							_dummyInput$parentEle.removeChild(dummyInput);
					});
				handler$1.on(document, "paste", e => {
					if (!isDescendantElement(parentElement, e.target)) return;
					let pasteText = void 0;
					const clipboardData = e.clipboardData;
					if (clipboardData.items) pasteText = clipboardData.getData("text/plain");
					else if (-1 !== Array.prototype.indexOf.call(clipboardData.types, "text/plain"))
						pasteText = clipboardData.getData("Text");
					if (pasteText != null && pasteText.length)
						this.fireListeners("paste", {
							value: pasteText,
							event: e
						});
				});
				handler$1.on(document, "copy", e => {
					if (this._isComposition) return;
					if (!isDescendantElement(parentElement, e.target)) return;
					setSafeInputValue(input, "");
					const data = this.fireListeners("copy").find(r => r != null);
					if (data != null) {
						cancelEvent(e);
						e.clipboardData.setData("text/plain", data);
					}
				});
				handler$1.on(input, "focus", e => {
					this.fireListeners("focus", e);
				});
				handler$1.on(input, "blur", e => {
					this.fireListeners("blur", e);
				});
			}
			fireKeyDownMove(keyCode, e) {
				var _this$_grid$keyboardO2, _this$_grid$keyboardO3, _this$_grid$keyboardO4;
				const fn = this._keyDownMoveCallback;
				if (!fn) return;
				if (this._isComposition) return;
				if (
					keyCode === KEY_LEFT ||
					keyCode === KEY_UP ||
					keyCode === KEY_RIGHT ||
					keyCode === KEY_DOWN ||
					keyCode === KEY_HOME ||
					keyCode === KEY_END
				)
					fn(e);
				else if (
					((_this$_grid$keyboardO2 = this._grid.keyboardOptions) === null ||
					_this$_grid$keyboardO2 === void 0
						? void 0
						: _this$_grid$keyboardO2.moveCellOnTab) &&
					keyCode === KEY_TAB
				)
					fn(e);
				else if (
					((_this$_grid$keyboardO3 = this._grid.keyboardOptions) === null ||
					_this$_grid$keyboardO3 === void 0
						? void 0
						: _this$_grid$keyboardO3.moveCellOnEnter) &&
					keyCode === KEY_ENTER$1
				)
					fn(e);
				else if (
					((_this$_grid$keyboardO4 = this._grid.keyboardOptions) === null ||
					_this$_grid$keyboardO4 === void 0
						? void 0
						: _this$_grid$keyboardO4.selectAllOnCtrlA) &&
					keyCode === KEY_ALPHA_A &&
					(e.ctrlKey || e.metaKey)
				)
					fn(e);
			}
			onKeyDownMove(fn) {
				this._keyDownMoveCallback = fn;
			}
			onKeyDown(fn) {
				return this.listen("keydown", fn);
			}
			onInput(fn) {
				return this.listen("input", fn);
			}
			onDelete(fn) {
				return this.listen("delete", fn);
			}
			onCopy(fn) {
				return this.listen("copy", fn);
			}
			onPaste(fn) {
				return this.listen("paste", fn);
			}
			onFocus(fn) {
				return this.listen("focus", fn);
			}
			onBlur(fn) {
				return this.listen("blur", fn);
			}
			focus() {
				this._input.focus();
			}
			setFocusRect(rect) {
				const input = this._input;
				const top = this._scrollable.calcTop(rect.top);
				input.style.top = `${(top - getScrollBarSize()).toFixed()}px`;
				input.style.left = `${rect.left.toFixed()}px`;
				input.style.width = `${rect.width.toFixed()}px`;
				input.style.height = `${rect.height.toFixed()}px`;
			}
			get editMode() {
				return !this._input.readOnly;
			}
			set editMode(editMode) {
				this._input.readOnly = !editMode;
			}
			resetInputStatus() {
				const el = this._input;
				if (!el.classList.contains("grid-focus-control--stored-status")) return;
				const composition = el.classList.contains("composition");
				const attrs = el.attributes;
				const removeNames = [];
				for (let i = 0, n = attrs.length; i < n; i++) {
					var _this$_inputStatus;
					const attr = attrs[i];
					if (IGNORE_STORE_ATTRS.indexOf(attr.name) >= 0) continue;
					if (
						!((_this$_inputStatus = this._inputStatus) === null ||
						_this$_inputStatus === void 0
							? void 0
							: _this$_inputStatus.hasOwnProperty(attr.nodeName))
					)
						removeNames.push(attr.name);
				}
				removeNames.forEach(removeName => {
					el.removeAttribute(removeName);
				});
				for (const name in this._inputStatus)
					el.setAttribute(name, this._inputStatus[name]);
				if (composition) {
					el.classList.add("composition");
					el.style.font = this._grid.font || "16px sans-serif";
				} else el.classList.remove("composition");
				el.classList.remove("grid-focus-control--stored-status");
			}
			storeInputStatus() {
				const el = this._input;
				if (el.classList.contains("grid-focus-control--stored-status")) return;
				const inputStatus = (this._inputStatus = {});
				const attrs = el.attributes;
				for (let i = 0, n = attrs.length; i < n; i++) {
					const attr = attrs[i];
					if (IGNORE_STORE_ATTRS.indexOf(attr.name) >= 0) continue;
					inputStatus[attr.name] = attr.value;
				}
				el.classList.add("grid-focus-control--stored-status");
			}
			setDefaultInputStatus() {}
			get input() {
				return this._input;
			}
			dispose() {
				super.dispose();
				this._handler.dispose();
			}
		};
		/**
		 * Selected area management
		 */
		var Selection = class extends EventTarget {
			constructor(grid) {
				super();
				(0, import_defineProperty$24.default)(this, "_grid", void 0);
				(0, import_defineProperty$24.default)(this, "_sel", void 0);
				(0, import_defineProperty$24.default)(this, "_focus", void 0);
				(0, import_defineProperty$24.default)(this, "_start", void 0);
				(0, import_defineProperty$24.default)(this, "_end", void 0);
				(0, import_defineProperty$24.default)(this, "_isWrapped", void 0);
				this._grid = grid;
				this._sel = {
					col: 0,
					row: 0
				};
				this._focus = {
					col: 0,
					row: 0
				};
				this._start = {
					col: 0,
					row: 0
				};
				this._end = {
					col: 0,
					row: 0
				};
			}
			get range() {
				const start = this._start;
				const end = this._end;
				const startCol = Math.min(start.col, end.col);
				const startRow = Math.min(start.row, end.row);
				const endCol = Math.max(start.col, end.col);
				const endRow = Math.max(start.row, end.row);
				return {
					start: {
						col: startCol,
						row: startRow
					},
					end: {
						col: endCol,
						row: endRow
					}
				};
			}
			set range(range) {
				this._callBeforeHooks();
				const startCol = Math.min(range.start.col, range.end.col);
				const startRow = Math.min(range.start.row, range.end.row);
				const endCol = Math.max(range.start.col, range.end.col);
				const endRow = Math.max(range.start.row, range.end.row);
				this._wrapFireSelectedEvent(() => {
					this._sel = {
						col: startCol,
						row: startRow
					};
					this._focus = {
						col: startCol,
						row: startRow
					};
					this._start = {
						col: startCol,
						row: startRow
					};
					this._end = {
						col: endCol,
						row: endRow
					};
					_updatedSelection.call(this._grid);
				});
			}
			get focus() {
				const { col, row } = this._focus;
				return {
					col,
					row
				};
			}
			get select() {
				const { col, row } = this._sel;
				return {
					col,
					row
				};
			}
			set select(cell) {
				this._callBeforeHooks();
				this._wrapFireSelectedEvent(() => {
					const { col = 0, row = 0 } = cell;
					this._setSelectCell(col, row);
					this._setFocusCell(col, row, true, true);
					_updatedSelection.call(this._grid);
				});
			}
			_setSelectCell(col, row) {
				this._wrapFireSelectedEvent(() => {
					this._sel = {
						col,
						row
					};
					this._start = {
						col,
						row
					};
				});
			}
			_setFocusCell(col, row, keepSelect, ignoreBeforeHook) {
				if (!ignoreBeforeHook) this._callBeforeHooks();
				this._wrapFireSelectedEvent(() => {
					if (!keepSelect) this._setSelectCell(col, row);
					this._focus = {
						col,
						row
					};
					this._end = {
						col,
						row
					};
				});
			}
			_wrapFireSelectedEvent(callback) {
				if (this._isWrapped) callback();
				else {
					this._isWrapped = true;
					try {
						const before = {
							col: this._sel.col,
							row: this._sel.row,
							selected: false,
							after: null
						};
						callback();
						const after = {
							col: this._sel.col,
							row: this._sel.row,
							selected: true,
							before: {
								col: before.col,
								row: before.row
							}
						};
						before.after = {
							col: after.col,
							row: after.row
						};
						this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, before);
						this.fireListeners(DG_EVENT_TYPE.SELECTED_CELL, after);
					} finally {
						this._isWrapped = false;
					}
				}
			}
			_updateGridRange() {
				const { rowCount, colCount } = this._grid;
				const points = [this._sel, this._focus, this._start, this._end];
				let needChange = false;
				for (let i = 0; i < points.length; i++)
					if (colCount <= points[i].col || rowCount <= points[i].row) {
						needChange = true;
						break;
					}
				if (!needChange) return false;
				this._wrapFireSelectedEvent(() => {
					points.forEach(p => {
						p.col = Math.min(colCount - 1, p.col);
						p.row = Math.min(rowCount - 1, p.row);
					});
				});
				return true;
			}
			_callBeforeHooks() {
				this.fireListeners("before_hook");
			}
		};
		/**
		 * This class manages the drawing process for each layer
		 */
		/** @private */
		var DrawLayers = class {
			constructor() {
				(0, import_defineProperty$24.default)(this, "_layers", void 0);
				this._layers = {};
			}
			addDraw(level, fn) {
				const l = this._layers[level] || (this._layers[level] = new DrawLayer(level));
				l.addDraw(fn);
			}
			draw(ctx) {
				const list = [];
				for (const k in this._layers) list.push(this._layers[k]);
				list.sort((a, b) => a.level - b.level);
				list.forEach(l => l.draw(ctx));
			}
		};
		/** @private */
		var DrawLayer = class {
			constructor(level) {
				(0, import_defineProperty$24.default)(this, "_level", void 0);
				(0, import_defineProperty$24.default)(this, "_list", void 0);
				this._level = level;
				this._list = [];
			}
			get level() {
				return this._level;
			}
			addDraw(fn) {
				this._list.push(fn);
			}
			draw(ctx) {
				this._list.forEach(fn => {
					ctx.save();
					try {
						fn(ctx);
					} finally {
						ctx.restore();
					}
				});
			}
		};
		/**
		 * Context of cell drawing
		 * @private
		 */
		var DrawCellContext = class DrawCellContext {
			/**
			 * constructor
			 * @param {number} col index of column
			 * @param {number} row index of row
			 * @param {CanvasRenderingContext2D} ctx context
			 * @param {Rect} rect rect of cell area
			 * @param {Rect} drawRect rect of drawing area
			 * @param {boolean} drawing `true` if drawing is in progress
			 * @param {object} selection the selection
			 * @param {Array} drawLayers array of draw layers
			 * @private
			 */
			constructor(col, row, ctx, rect, drawRect, drawing, selection, drawLayers) {
				(0, import_defineProperty$24.default)(this, "_col", void 0);
				(0, import_defineProperty$24.default)(this, "_row", void 0);
				(0, import_defineProperty$24.default)(this, "_mode", void 0);
				(0, import_defineProperty$24.default)(this, "_ctx", void 0);
				(0, import_defineProperty$24.default)(this, "_rect", void 0);
				(0, import_defineProperty$24.default)(this, "_drawRect", void 0);
				(0, import_defineProperty$24.default)(this, "_drawing", void 0);
				(0, import_defineProperty$24.default)(this, "_selection", void 0);
				(0, import_defineProperty$24.default)(this, "_drawLayers", void 0);
				(0, import_defineProperty$24.default)(this, "_childContexts", void 0);
				(0, import_defineProperty$24.default)(this, "_cancel", void 0);
				(0, import_defineProperty$24.default)(this, "_grid", void 0);
				(0, import_defineProperty$24.default)(this, "_onTerminate", void 0);
				(0, import_defineProperty$24.default)(this, "_rectFilter", null);
				this._col = col;
				this._row = row;
				this._mode = 0;
				this._ctx = ctx;
				this._rect = rect;
				this._drawRect = drawRect;
				this._drawing = drawing;
				this._selection = selection;
				this._drawLayers = drawLayers;
				this._childContexts = [];
			}
			get drawing() {
				if (this._mode === 0) return this._drawing;
				else return true;
			}
			get row() {
				return this._row;
			}
			get col() {
				return this._col;
			}
			cancel() {
				this._cancel = true;
				this._childContexts.forEach(ctx => {
					ctx.cancel();
				});
			}
			/**
			 * select status.
			 * @return {object} select status
			 */
			getSelection() {
				return {
					select: this._selection.select,
					range: this._selection.range
				};
			}
			/**
			 * Canvas context.
			 * @return {CanvasRenderingContext2D} Canvas context.
			 */
			getContext() {
				if (this._mode === 0) return this._ctx;
				else return _getInitContext.call(this._grid);
			}
			/**
			 * Rectangle of cell.
			 * @return {Rect} rect Rectangle of cell.
			 */
			getRect() {
				const rectFilter = this._rectFilter;
				return rectFilter ? rectFilter(this._getRectInternal()) : this._getRectInternal();
			}
			setRectFilter(rectFilter) {
				this._rectFilter = rectFilter;
			}
			/**
			 * Rectangle of Drawing range.
			 * @return {Rect} Rectangle of Drawing range.
			 */
			getDrawRect() {
				if (this._cancel) return null;
				if (this._mode === 0) return this._drawRect;
				else {
					if (this._isOutOfRange()) return null;
					const absoluteRect = this._grid.getCellRect(this._col, this._row);
					return this._toRelativeDrawRect(absoluteRect);
				}
			}
			_isOutOfRange() {
				const { colCount, rowCount } = this._grid;
				return colCount <= this._col || rowCount <= this._row;
			}
			/**
			 * get Context of current state
			 * @return {DrawCellContext} current DrawCellContext.
			 */
			toCurrentContext() {
				if (this._mode === 0) return this;
				else {
					const absoluteRect = this._grid.getCellRect(this._col, this._row);
					const rect = _toRelativeRect(this._grid, absoluteRect);
					const drawRect = this._isOutOfRange()
						? null
						: this._toRelativeDrawRect(absoluteRect);
					const context = new DrawCellContext(
						this._col,
						this._row,
						this.getContext(),
						rect,
						drawRect,
						this.drawing,
						this._selection,
						this._drawLayers
					);
					context.toCurrentContext = this.toCurrentContext.bind(this);
					this._childContexts.push(context);
					if (this._cancel) context.cancel();
					context._rectFilter = this._rectFilter;
					return context;
				}
			}
			addLayerDraw(level, fn) {
				this._drawLayers.addDraw(level, fn);
			}
			_toRelativeDrawRect(absoluteRect) {
				const visibleRect = _getVisibleRect(this._grid);
				let rect = absoluteRect.copy();
				if (!rect.intersection(visibleRect)) return null;
				const grid = this._grid;
				const isFrozenCell = grid.isFrozenCell(this._col, this._row);
				if (grid.frozenColCount >= 0 && (!isFrozenCell || !isFrozenCell.col)) {
					const fRect = grid.getCellRect(grid.frozenColCount - 1, this._row);
					rect = Rect.bounds(
						Math.max(rect.left, fRect.right),
						rect.top,
						rect.right,
						rect.bottom
					);
				}
				if (grid.frozenRowCount >= 0 && (!isFrozenCell || !isFrozenCell.row)) {
					const fRect = grid.getCellRect(this._col, grid.frozenRowCount - 1);
					rect = Rect.bounds(
						rect.left,
						Math.max(rect.top, fRect.bottom),
						rect.right,
						rect.bottom
					);
				}
				if (!rect.intersection(visibleRect)) return null;
				rect.offsetLeft(-visibleRect.left);
				rect.offsetTop(-visibleRect.top);
				return rect;
			}
			_delayMode(grid, onTerminate) {
				this._mode = 1;
				this._ctx = null;
				this._rect = null;
				this._drawRect = null;
				this._grid = grid;
				this._onTerminate = onTerminate;
			}
			/**
			 * terminate
			 * @return {void}
			 */
			terminate() {
				if (this._mode !== 0) {
					var _this$_onTerminate;
					(_this$_onTerminate = this._onTerminate) === null ||
						_this$_onTerminate === void 0 ||
						_this$_onTerminate.call(this);
				}
			}
			_getRectInternal() {
				if (this._mode === 0) return this._rect;
				else {
					if (this._rect) return this._rect;
					return this._grid.getCellRelativeRect(this._col, this._row);
				}
			}
		};
		/**
		 * DrawGrid
		 * @classdesc cheetahGrid.core.DrawGrid
		 * @memberof cheetahGrid.core
		 */
		var DrawGrid = class extends EventTarget {
			static get EVENT_TYPE() {
				return DG_EVENT_TYPE;
			}
			constructor(options = {}) {
				super();
				(0, import_defineProperty$24.default)(this, PROTECTED_SYMBOL, void 0);
				const {
					rowCount = 10,
					colCount = 10,
					frozenColCount = 0,
					frozenRowCount = 0,
					defaultRowHeight = 40,
					defaultColWidth = 80,
					font,
					underlayBackgroundColor,
					keyboardOptions,
					parentElement,
					disableColumnResize,
					trimOnPaste
				} = options;
				const protectedSpace = (this[_$2] = {});
				initDocument();
				protectedSpace.element = createRootElement();
				protectedSpace.scrollable = new Scrollable();
				protectedSpace.handler = new EventHandler();
				protectedSpace.selection = new Selection(this);
				protectedSpace.focusControl = new FocusControl(
					this,
					protectedSpace.scrollable.getElement(),
					protectedSpace.scrollable,
					protectedSpace.selection
				);
				protectedSpace.canvas = transform(document.createElement("canvas"));
				protectedSpace.context = protectedSpace.canvas.getContext("2d", { alpha: false });
				protectedSpace.rowCount = rowCount;
				protectedSpace.colCount = colCount;
				protectedSpace.frozenColCount = frozenColCount;
				protectedSpace.frozenRowCount = frozenRowCount;
				protectedSpace.defaultRowHeight = defaultRowHeight;
				protectedSpace.defaultColWidth = defaultColWidth;
				protectedSpace.font = font;
				protectedSpace.underlayBackgroundColor = underlayBackgroundColor;
				protectedSpace.keyboardOptions = keyboardOptions;
				protectedSpace.disableColumnResize = disableColumnResize;
				protectedSpace.trimOnPaste =
					trimOnPaste !== null && trimOnPaste !== void 0 ? trimOnPaste : false;
				protectedSpace.rowHeightsMap = new NumberMap();
				protectedSpace.colWidthsMap = new NumberMap();
				protectedSpace.colWidthsLimit = {};
				const getEm = () => getFontSize(protectedSpace.context, this.font).width;
				protectedSpace.calcWidthContext = {
					get full() {
						return protectedSpace.canvas.width;
					},
					get em() {
						return getEm();
					}
				};
				protectedSpace.columnResizer = new ColumnResizer(this);
				protectedSpace.cellSelector = new CellSelector(this);
				protectedSpace.drawCells = {};
				protectedSpace.cellTextOverflows = {};
				protectedSpace.focusedGrid = false;
				protectedSpace.element.appendChild(protectedSpace.canvas);
				protectedSpace.element.appendChild(protectedSpace.scrollable.getElement());
				protectedSpace.scroll = {
					left: 0,
					top: 0
				};
				this.updateScroll();
				if (parentElement) {
					parentElement.appendChild(protectedSpace.element);
					this.updateSize();
				} else this.updateSize();
				_bindEvents.call(this);
				this.bindEventsInternal();
			}
			/**
			 * Get root element.
			 * @returns {HTMLElement} root element
			 */
			getElement() {
				return this[_$2].element;
			}
			/**
			 * Get canvas element.
			 */
			get canvas() {
				return this[_$2].canvas;
			}
			/**
			 * Focus the grid.
			 * @return {void}
			 */
			focus() {
				const { col, row } = this[_$2].selection.select;
				this.focusCell(col, row);
			}
			hasFocusGrid() {
				return this[_$2].focusedGrid;
			}
			/**
			 * Get the selection instance.
			 */
			get selection() {
				return this[_$2].selection;
			}
			/**
			 * Get the number of rows.
			 */
			get rowCount() {
				return this[_$2].rowCount;
			}
			/**
			 * Set the number of rows.
			 */
			set rowCount(rowCount) {
				this[_$2].rowCount = rowCount;
				this.updateScroll();
				if (this[_$2].selection._updateGridRange()) {
					const { col, row } = this[_$2].selection.focus;
					this.makeVisibleCell(col, row);
					this.setFocusCursor(col, row);
				}
			}
			/**
			 * Get the number of columns.
			 */
			get colCount() {
				return this[_$2].colCount;
			}
			/**
			 * Set the number of columns.
			 */
			set colCount(colCount) {
				this[_$2].colCount = colCount;
				this.updateScroll();
				if (this[_$2].selection._updateGridRange()) {
					const { col, row } = this[_$2].selection.focus;
					this.makeVisibleCell(col, row);
					this.setFocusCursor(col, row);
				}
			}
			/**
			 * Get the number of frozen columns.
			 */
			get frozenColCount() {
				return this[_$2].frozenColCount;
			}
			/**
			 * Set the number of frozen columns.
			 */
			set frozenColCount(frozenColCount) {
				this[_$2].frozenColCount = frozenColCount;
			}
			/**
			 * Get the number of frozen rows.
			 */
			get frozenRowCount() {
				return this[_$2].frozenRowCount;
			}
			/**
			 * Set the number of frozen rows.
			 */
			set frozenRowCount(frozenRowCount) {
				this[_$2].frozenRowCount = frozenRowCount;
			}
			/**
			 * Get the default row height.
			 *
			 */
			get defaultRowHeight() {
				return this[_$2].defaultRowHeight;
			}
			/**
			 * Set the default row height.
			 */
			set defaultRowHeight(defaultRowHeight) {
				this[_$2].defaultRowHeight = defaultRowHeight;
			}
			/**
			 * Get the default column width.
			 */
			get defaultColWidth() {
				return this[_$2].defaultColWidth;
			}
			/**
			 * Set the default column width.
			 */
			set defaultColWidth(defaultColWidth) {
				this[_$2].defaultColWidth = defaultColWidth;
			}
			/**
			 * Get the font definition as a string.
			 */
			get font() {
				return this[_$2].font;
			}
			/**
			 * Set the font definition with the given string.
			 */
			set font(font) {
				this[_$2].font = font;
			}
			/**
			 * Get the background color of the underlay.
			 */
			get underlayBackgroundColor() {
				return this[_$2].underlayBackgroundColor;
			}
			/**
			 * Set the background color of the underlay.
			 */
			set underlayBackgroundColor(underlayBackgroundColor) {
				this[_$2].underlayBackgroundColor = underlayBackgroundColor;
			}
			/**
			 * If set to true, trim the pasted text on pasting.
			 */
			get trimOnPaste() {
				return this[_$2].trimOnPaste;
			}
			set trimOnPaste(trimOnPaste) {
				this[_$2].trimOnPaste = trimOnPaste;
			}
			get keyboardOptions() {
				var _this$_$keyboardOptio;
				return (_this$_$keyboardOptio = this[_$2].keyboardOptions) !== null &&
					_this$_$keyboardOptio !== void 0
					? _this$_$keyboardOptio
					: null;
			}
			set keyboardOptions(keyboardOptions) {
				this[_$2].keyboardOptions =
					keyboardOptions !== null && keyboardOptions !== void 0
						? keyboardOptions
						: void 0;
			}
			configure(name, value) {
				const cfg = this[_$2].config || (this[_$2].config = {});
				if (value != null) cfg[name] = value;
				return cfg[name];
			}
			/**
			 * Apply the changed size.
			 * @return {void}
			 */
			updateSize() {
				const { canvas } = this[_$2];
				canvas.style.width = "";
				canvas.style.height = "";
				const width = Math.floor(canvas.offsetWidth);
				const height = Math.floor(canvas.offsetHeight);
				canvas.width = width;
				canvas.height = height;
				canvas.style.width = `${width}px`;
				canvas.style.height = `${height}px`;
				const { focus } = this[_$2].selection;
				this[_$2].focusControl.setFocusRect(this.getCellRect(focus.col, focus.row));
			}
			/**
			 * Apply the changed scroll size.
			 * @return {boolean} `true` if there was a change in the scroll size
			 */
			updateScroll() {
				const { scrollable } = this[_$2];
				const newHeight = _getScrollHeight.call(this);
				const newWidth = _getScrollWidth(this);
				if (newHeight === scrollable.scrollHeight && newWidth === scrollable.scrollWidth)
					return false;
				scrollable.setScrollSize(newWidth, newHeight);
				this[_$2].scroll = {
					left: scrollable.scrollLeft,
					top: scrollable.scrollTop
				};
				const { focus } = this[_$2].selection;
				this[_$2].focusControl.setFocusRect(this.getCellRect(focus.col, focus.row));
				return true;
			}
			/**
			 * Get the row height of the given the row index.
			 * @param  {number} row The row index
			 * @return {number} The row height
			 */
			getRowHeight(row) {
				return _getRowHeight.call(this, row);
			}
			/**
			 * Set the row height of the given the row index.
			 * @param  {number} row The row index
			 * @param  {number} height The row height
			 * @return {void}
			 */
			setRowHeight(row, height) {
				_setRowHeight(this, row, height);
			}
			/**
			 * Get the column width of the given the column index.
			 * @param  {number} col The column index
			 * @return {number} The column width
			 */
			getColWidth(col) {
				return _getColWidth(this, col);
			}
			/**
			 * Set the column width of the given the column index.
			 * @param  {number} col The column index
			 * @param  {number} width The column width
			 * @return {void}
			 */
			setColWidth(col, width) {
				_setColWidth(this, col, width);
			}
			/**
			 * Get the column max width of the given the column index.
			 * @param  {number} col The column index
			 * @return {number} The column max width
			 */
			getMaxColWidth(col) {
				const obj$1 = this[_$2].colWidthsLimit[col];
				return (obj$1 && obj$1.max) || void 0;
			}
			/**
			 * Set the column max width of the given the column index.
			 * @param  {number} col The column index
			 * @param  {number} maxwidth The column max width
			 * @return {void}
			 */
			setMaxColWidth(col, maxwidth) {
				const obj$1 = this[_$2].colWidthsLimit[col] || (this[_$2].colWidthsLimit[col] = {});
				if (maxwidth != null) obj$1.max = maxwidth;
				else delete obj$1.max;
			}
			/**
			 * Get the column min width of the given the column index.
			 * @param  {number} col The column index
			 * @return {number} The column min width
			 */
			getMinColWidth(col) {
				const obj$1 = this[_$2].colWidthsLimit[col];
				return (obj$1 && obj$1.min) || void 0;
			}
			/**
			 * Set the column min width of the given the column index.
			 * @param  {number} col The column index
			 * @param  {number} minwidth The column min width
			 * @return {void}
			 */
			setMinColWidth(col, minwidth) {
				const obj$1 = this[_$2].colWidthsLimit[col] || (this[_$2].colWidthsLimit[col] = {});
				if (minwidth != null) obj$1.min = minwidth;
				else delete obj$1.min;
			}
			/**
			 * Get the rect of the cell.
			 * @param {number} col index of column, of the cell
			 * @param {number} row index of row, of the cell
			 * @returns {Rect} the rect of the cell.
			 */
			getCellRect(col, row) {
				const isFrozenCell = this.isFrozenCell(col, row);
				let absoluteLeft = _getColsWidth(this, 0, col - 1);
				const width = _getColWidth(this, col);
				if (isFrozenCell && isFrozenCell.col) absoluteLeft += this[_$2].scroll.left;
				let absoluteTop = _getRowsHeight.call(this, 0, row - 1);
				const height = _getRowHeight.call(this, row);
				if (isFrozenCell && isFrozenCell.row) absoluteTop += this[_$2].scroll.top;
				return new Rect(absoluteLeft, absoluteTop, width, height);
			}
			/**
			 * Get the relative rectangle of the cell.
			 * @param {number} col index of column, of the cell
			 * @param {number} row index of row, of the cell
			 * @returns {Rect} the rect of the cell.
			 */
			getCellRelativeRect(col, row) {
				return _toRelativeRect(this, this.getCellRect(col, row));
			}
			/**
			 * Get the rectangle of the cells area.
			 * @param {number} startCol index of the starting column, of the cell
			 * @param {number} startRow index of the starting row, of the cell
			 * @param {number} endCol index of the ending column, of the cell
			 * @param {number} endRow index of the ending row, of the cell
			 * @returns {Rect} the rect of the cells.
			 */
			getCellsRect(startCol, startRow, endCol, endRow) {
				const isFrozenStartCell = this.isFrozenCell(startCol, startRow);
				const isFrozenEndCell = this.isFrozenCell(endCol, endRow);
				let absoluteLeft = _getColsWidth(this, 0, startCol - 1);
				let width = _getColsWidth(this, startCol, endCol);
				if (isFrozenStartCell && isFrozenStartCell.col) {
					const scrollLeft = this[_$2].scroll.left;
					absoluteLeft += scrollLeft;
					if (!isFrozenEndCell || !isFrozenEndCell.col) {
						width -= scrollLeft;
						width = Math.max(
							width,
							_getColsWidth(this, startCol, this.frozenColCount - 1)
						);
					}
				}
				let absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
				let height = _getRowsHeight.call(this, startRow, endRow);
				if (isFrozenStartCell && isFrozenStartCell.row) {
					const scrollTop = this[_$2].scroll.top;
					absoluteTop += scrollTop;
					if (!isFrozenEndCell || !isFrozenEndCell.row) {
						height -= scrollTop;
						height = Math.max(
							height,
							_getColsWidth(this, startRow, this.frozenRowCount - 1)
						);
					}
				}
				return new Rect(absoluteLeft, absoluteTop, width, height);
			}
			getCellRangeRect(range) {
				return this.getCellsRect(
					range.start.col,
					range.start.row,
					range.end.col,
					range.end.row
				);
			}
			isFrozenCell(col, row) {
				const { frozenRowCount, frozenColCount } = this[_$2];
				const isFrozenRow = frozenRowCount > 0 && row < frozenRowCount;
				const isFrozenCol = frozenColCount > 0 && col < frozenColCount;
				if (isFrozenRow || isFrozenCol)
					return {
						row: isFrozenRow,
						col: isFrozenCol
					};
				else return null;
			}
			getRowAt(absoluteY) {
				const frozen = _getTargetFrozenRowAt(this, absoluteY);
				if (frozen) return frozen.row;
				const row = _getTargetRowAt.call(this, absoluteY);
				return row ? row.row : -1;
			}
			getColAt(absoluteX) {
				const frozen = _getTargetFrozenColAt(this, absoluteX);
				if (frozen) return frozen.col;
				const col = _getTargetColAt(this, absoluteX);
				return col ? col.col : -1;
			}
			getCellAt(absoluteX, absoluteY) {
				return {
					row: this.getRowAt(absoluteY),
					col: this.getColAt(absoluteX)
				};
			}
			/**
			 * Scroll to where cell is visible.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index
			 * @return {void}
			 */
			makeVisibleCell(col, row) {
				const isFrozenCell = this.isFrozenCell(col, row);
				if (isFrozenCell && isFrozenCell.col && isFrozenCell.row) return;
				const rect = this.getCellRect(col, row);
				const visibleRect = _getScrollableVisibleRect(this);
				if (visibleRect.contains(rect)) return;
				const { scrollable } = this[_$2];
				if (!isFrozenCell || !isFrozenCell.col) {
					if (rect.left < visibleRect.left)
						scrollable.scrollLeft -= visibleRect.left - rect.left;
					else if (visibleRect.right < rect.right)
						scrollable.scrollLeft -= visibleRect.right - rect.right;
				}
				if (!isFrozenCell || !isFrozenCell.row) {
					if (rect.top < visibleRect.top)
						scrollable.scrollTop -= visibleRect.top - rect.top;
					else if (visibleRect.bottom < rect.bottom)
						scrollable.scrollTop -= visibleRect.bottom - rect.bottom;
				}
			}
			/**
			 * Moves the focus cursor to the given cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index
			 * @return {void}
			 */
			setFocusCursor(col, row) {
				const { focusControl } = this[_$2];
				const oldEditMode = focusControl.editMode;
				focusControl.setFocusRect(this.getCellRect(col, row));
				_updatedSelection.call(this);
				if (oldEditMode && !focusControl.editMode) focusControl.resetInputStatus();
			}
			/**
			 * Focus the cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index
			 * @return {void}
			 */
			focusCell(col, row) {
				this.setFocusCursor(col, row);
				this[_$2].focusControl.focus();
			}
			/**
			 * Redraws the range of the given cell.
			 * @param  {number} col The column index of cell.
			 * @param  {number} row The row index of cell.
			 * @return {void}
			 */
			invalidateCell(col, row) {
				this.invalidateGridRect(col, row);
			}
			/**
			 * Redraws the range of the given cells.
			 * @param {number} startCol index of the starting column, of the cell
			 * @param {number} startRow index of the starting row, of the cell
			 * @param {number} endCol index of the ending column, of the cell
			 * @param {number} endRow index of the ending row, of the cell
			 * @return {void}
			 */
			invalidateGridRect(startCol, startRow, endCol = startCol, endRow = startRow) {
				const offset = this.getOffsetInvalidateCells();
				if (offset > 0) {
					startCol -= offset;
					startRow -= offset;
					endCol += offset;
					endRow += offset;
				}
				const visibleRect = _getVisibleRect(this);
				const cellsRect = this.getCellsRect(startCol, startRow, endCol, endRow);
				const invalidateTarget = visibleRect.intersection(cellsRect);
				if (invalidateTarget) {
					const { frozenColCount, frozenRowCount } = this[_$2];
					if (frozenColCount > 0 && endCol >= frozenColCount) {
						const frozenRect = _getFrozenColsRect(this);
						if (frozenRect.intersection(invalidateTarget))
							invalidateTarget.left = Math.min(
								frozenRect.right - 1,
								invalidateTarget.left
							);
					}
					if (frozenRowCount > 0 && endRow >= frozenRowCount) {
						const frozenRect = _getFrozenRowsRect(this);
						if (frozenRect.intersection(invalidateTarget))
							invalidateTarget.top = Math.min(
								frozenRect.bottom - 1,
								invalidateTarget.top
							);
					}
					_invalidateRect(this, invalidateTarget);
				}
			}
			invalidateCellRange(range) {
				this.invalidateGridRect(
					range.start.col,
					range.start.row,
					range.end.col,
					range.end.row
				);
			}
			/**
			 * Redraws the whole grid.
			 * @return {void}
			 */
			invalidate() {
				const visibleRect = _getVisibleRect(this);
				_invalidateRect(this, visibleRect);
			}
			/**
			 * Get the number of scrollable rows fully visible in the grid. visibleRowCount does not include the frozen rows counted by the frozenRowCount property. It does not include any partially visible rows on the bottom of the grid.
			 * @returns {number}
			 */
			get visibleRowCount() {
				const { frozenRowCount } = this;
				const visibleRect = _getVisibleRect(this);
				const visibleTop =
					frozenRowCount > 0
						? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
						: visibleRect.top;
				const initRow = _getTargetRowAt.call(this, visibleTop);
				if (!initRow) return 0;
				const startRow = Math.max(
					initRow.top >= visibleTop ? initRow.row : initRow.row + 1,
					frozenRowCount
				);
				let absoluteTop = _getRowsHeight.call(this, 0, startRow - 1);
				let count = 0;
				const { rowCount } = this;
				for (let row = startRow; row < rowCount; row++) {
					const height = _getRowHeight.call(this, row);
					const bottom = absoluteTop + height;
					if (visibleRect.bottom < bottom) break;
					count++;
					absoluteTop = bottom;
				}
				return count;
			}
			/**
			 * Get the number of scrollable columns fully visible in the grid. visibleColCount does not include the frozen columns counted by the frozenColCount property. It does not include any partially visible columns on the right of the grid.
			 * @returns {number}
			 */
			get visibleColCount() {
				const { frozenColCount } = this;
				const visibleRect = _getVisibleRect(this);
				const visibleLeft =
					frozenColCount > 0
						? visibleRect.left + _getColsWidth(this, 0, frozenColCount - 1)
						: visibleRect.left;
				const initCol = _getTargetColAt(this, visibleLeft);
				if (!initCol) return 0;
				const startCol = Math.max(
					initCol.left >= visibleLeft ? initCol.col : initCol.col + 1,
					frozenColCount
				);
				let absoluteLeft = _getColsWidth(this, 0, startCol - 1);
				let count = 0;
				const { colCount } = this;
				for (let col = startCol; col < colCount; col++) {
					const width = _getColWidth(this, col);
					const right = absoluteLeft + width;
					if (visibleRect.right < right) break;
					count++;
					absoluteLeft = right;
				}
				return count;
			}
			/**
			 * Get the index of the first row in the scrollable region that is visible.
			 * @returns {number}
			 */
			get topRow() {
				const { frozenRowCount } = this;
				const visibleRect = _getVisibleRect(this);
				const visibleTop =
					frozenRowCount > 0
						? visibleRect.top + _getRowsHeight.call(this, 0, frozenRowCount - 1)
						: visibleRect.top;
				const initRow = _getTargetRowAt.call(this, visibleTop);
				if (!initRow) return 0;
				return Math.max(
					initRow.top >= visibleTop ? initRow.row : initRow.row + 1,
					frozenRowCount
				);
			}
			/**
			 * Get the index of the first column in the scrollable region that is visible.
			 * @returns {number}
			 */
			get leftCol() {
				const { frozenColCount } = this;
				const visibleRect = _getVisibleRect(this);
				const visibleLeft =
					frozenColCount > 0
						? visibleRect.left + _getColsWidth(this, 0, frozenColCount - 1)
						: visibleRect.left;
				const initCol = _getTargetColAt(this, visibleLeft);
				if (!initCol) return 0;
				return Math.max(
					initCol.left >= visibleLeft ? initCol.col : initCol.col + 1,
					frozenColCount
				);
			}
			/**
			 * gets or sets the number of pixels that an element's content is scrolled vertically
			 */
			get scrollTop() {
				return this[_$2].scrollable.scrollTop;
			}
			set scrollTop(scrollTop) {
				this[_$2].scrollable.scrollTop = scrollTop;
			}
			/**
			 * gets or sets the number of pixels that an element's content is scrolled from its left edge
			 */
			get scrollLeft() {
				return this[_$2].scrollable.scrollLeft;
			}
			set scrollLeft(scrollLeft) {
				this[_$2].scrollable.scrollLeft = scrollLeft;
			}
			/**
			 * Get the value of cell with the copy action.
			 * <p>
			 * Please implement
			 * </p>
			 *
			 * @protected
			 * @param col Column index of cell.
			 * @param row Row index of cell.
			 * @param range Copy range.
			 * @return {string} the value of cell
			 */
			getCopyCellValue(_col, _row, _range) {
				return void 0;
			}
			/**
			 * Get the overflowed text in the cell rectangle, from the given cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index
			 * @return {string | null} The text overflowing the cell rect.
			 */
			getCellOverflowText(col, row) {
				const key = `${col}:${row}`;
				return this[_$2].cellTextOverflows[key] || null;
			}
			/**
			 * Set the overflowed text in the cell rectangle, to the given cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index
			 * @param  {string} overflowText The overflowed text in the cell rectangle.
			 * @return {void}
			 */
			setCellOverflowText(col, row, overflowText) {
				const key = `${col}:${row}`;
				if (overflowText)
					this[_$2].cellTextOverflows[key] =
						typeof overflowText === "string" ? overflowText.trim() : overflowText;
				else delete this[_$2].cellTextOverflows[key];
			}
			addDisposable(disposable) {
				if (!disposable || !disposable.dispose || typeof disposable.dispose !== "function")
					throw new Error("not disposable!");
				const disposables = (this[_$2].disposables = this[_$2].disposables || []);
				disposables.push(disposable);
			}
			/**
			 * Dispose the grid instance.
			 * @returns {void}
			 */
			dispose() {
				super.dispose();
				const protectedSpace = this[_$2];
				protectedSpace.handler.dispose();
				protectedSpace.scrollable.dispose();
				protectedSpace.focusControl.dispose();
				protectedSpace.columnResizer.dispose();
				protectedSpace.cellSelector.dispose();
				if (protectedSpace.disposables) {
					protectedSpace.disposables.forEach(disposable => disposable.dispose());
					protectedSpace.disposables = null;
				}
				const { parentElement } = protectedSpace.element;
				if (parentElement) parentElement.removeChild(protectedSpace.element);
			}
			getAttachCellsArea(range) {
				return {
					element: this.getElement(),
					rect: _toRelativeRect(this, this.getCellRangeRect(range))
				};
			}
			onKeyDownMove(evt) {
				_onKeyDownMove.call(this, evt);
			}
			bindEventsInternal() {}
			getTargetRowAtInternal(_absoluteY) {}
			getRowsHeightInternal(_startRow, _endRow) {}
			getRowHeightInternal(_row) {}
			getScrollHeightInternal(_row) {}
			getMoveLeftColByKeyDownInternal({ col }) {
				return col - 1;
			}
			getMoveRightColByKeyDownInternal({ col }) {
				return col + 1;
			}
			getMoveUpRowByKeyDownInternal({ row }) {
				return row - 1;
			}
			getMoveDownRowByKeyDownInternal({ row }) {
				return row + 1;
			}
			getOffsetInvalidateCells() {
				return 0;
			}
			getCopyRangeInternal(range) {
				return range;
			}
			_getInitContext() {
				const ctx = this[_$2].context;
				ctx.fillStyle = "white";
				ctx.strokeStyle = "black";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.lineWidth = 1;
				ctx.font = this.font || "16px sans-serif";
				return ctx;
			}
			fireListeners(type, ...event$1) {
				return super.fireListeners(type, ...event$1);
			}
		};

		//#endregion
		//#region src/js/core.ts
		var core_exports = {};
		__export(core_exports, {
			DrawGrid: () => DrawGrid,
			EVENT_TYPE: () => DG_EVENT_TYPE
		});

		//#endregion
		//#region src/js/internal/sort.ts
		var sort_exports = {};
		__export(sort_exports, {
			sort: () => sort,
			sortArray: () => sortArray,
			sortPromise: () => sortPromise
		});
		function createArray(get$1, length) {
			const array = new Array(length);
			for (let i = 0; i < length; i++) array[i] = get$1(i);
			return array;
		}
		function createArrayPromise(get$1, getField$1, length) {
			return new Promise(resolve => {
				const plist = [];
				const array = new Array(length);
				for (let i = 0; i < length; i++) {
					const data = get$1(i);
					const record = {
						v: data,
						f: data
					};
					array[i] = record;
					if (isPromise(data))
						plist.push(
							data.then(v => {
								record.v = v;
								record.f = v;
							})
						);
				}
				Promise.all(plist)
					.then(() => (getField$1 == null ? array : setArrayField(array, getField$1)))
					.then(resolve);
			});
		}
		function setArrayField(array, getField$1) {
			return new Promise(resolve => {
				const { length } = array;
				const plist = [];
				for (let i = 0; i < length; i++) {
					const record = array[i];
					const f = getField$1(record.v);
					if (isPromise(f))
						plist.push(
							f.then(v => {
								record.f = v;
							})
						);
					else record.f = f;
				}
				Promise.all(plist).then(() => resolve(array));
			});
		}
		function sortArray(array, compare) {
			Array.prototype.sort.call(array, compare);
		}
		function sort(get$1, set, length, compare, getField$1) {
			const old = createArray(get$1, length);
			if (getField$1 != null) old.sort((r1, r2) => compare(getField$1(r1), getField$1(r2)));
			else old.sort(compare);
			for (let i = 0; i < length; i++) set(i, old[i]);
		}
		function sortPromise(get$1, set, length, compare, getField$1) {
			if (typeof Promise !== "undefined")
				return createArrayPromise(get$1, getField$1, length).then(array => {
					array.sort((r1, r2) => compare(r1.f, r2.f));
					for (let i = 0; i < length; i++) set(i, array[i].v);
				});
			else {
				sort(get$1, set, length, compare, getField$1);
				const dummyPromise = {
					then(fn) {
						fn();
						return dummyPromise;
					},
					catch() {
						return dummyPromise;
					}
				};
				return dummyPromise;
			}
		}

		//#endregion
		//#region src/js/data/DataSource.ts
		var import_defineProperty$23 = /* @__PURE__ */ __toESM(require_defineProperty());
		var _DataSource;
		/** @private */
		function isFieldAssessor(field) {
			if (obj.isObject(field)) {
				if (field.get && field.set) return true;
			}
			return false;
		}
		/** @private */
		const EVENT_TYPE$1 = {
			UPDATE_LENGTH: "update_length",
			UPDATED_LENGTH: "updated_length",
			UPDATED_ORDER: "updated_order"
		};
		/** @private */
		function ascOrderFn(v1, v2) {
			if (v1 === v2) return 0;
			if (v1 == null) return v2 == null ? 0 : -1;
			if (v2 == null) return 1;
			return v1 > v2 ? 1 : -1;
		}
		function descOrderFn(v1, v2) {
			return ascOrderFn(v1, v2) * -1;
		}
		/** @private */
		function getValue(value, setPromiseBack) {
			const maybePromiseValue = getOrApply(value);
			if (isPromise(maybePromiseValue)) {
				const promiseValue = maybePromiseValue.then(r => {
					setPromiseBack(r);
					return r;
				});
				setPromiseBack(promiseValue);
				return promiseValue;
			} else return maybePromiseValue;
		}
		/** @private */
		function getField(record, field, setPromiseBack) {
			if (record == null) return void 0;
			if (isPromise(record)) return record.then(r => getField(r, field, setPromiseBack));
			const fieldGet = isFieldAssessor(field) ? field.get : field;
			if (fieldGet in record) {
				const fieldResult$1 = record[fieldGet];
				return getValue(fieldResult$1, setPromiseBack);
			}
			if (typeof fieldGet === "function") {
				const fieldResult$1 = fieldGet(record);
				return getValue(fieldResult$1, setPromiseBack);
			}
			const ss = String(fieldGet).split(".");
			if (ss.length <= 1) {
				const fieldResult$1 = record[fieldGet];
				return getValue(fieldResult$1, setPromiseBack);
			}
			const fieldResult = applyChainSafe(
				record,
				(val, name) => getField(val, name, emptyFn),
				...ss
			);
			return getValue(fieldResult, setPromiseBack);
		}
		/** @private */
		function setField(record, field, value) {
			if (record == null) return false;
			const fieldSet = isFieldAssessor(field) ? field.set : field;
			if (fieldSet in record) record[fieldSet] = value;
			else if (typeof fieldSet === "function") return fieldSet(record, value);
			else if (typeof fieldSet === "string") {
				const ss = `${fieldSet}`.split(".");
				let obj$1 = record;
				const { length } = ss;
				for (let i = 0; i < length; i++) {
					const f = ss[i];
					if (i === length - 1) obj$1[f] = value;
					else obj$1 = obj$1[f] || (obj$1[f] = {});
				}
			} else record[fieldSet] = value;
			return true;
		}
		/** @private */
		function _getIndex(sortedIndexMap, index) {
			if (!sortedIndexMap) return index;
			const mapIndex = sortedIndexMap[index];
			return mapIndex != null ? mapIndex : index;
		}
		/**
		 * grid data source
		 *
		 * @classdesc cheetahGrid.data.DataSource
		 * @memberof cheetahGrid.data
		 */
		var DataSource = class DataSource extends EventTarget {
			static get EVENT_TYPE() {
				return EVENT_TYPE$1;
			}
			static ofArray(array) {
				return new DataSource({
					get: index => array[index],
					length: array.length,
					source: array
				});
			}
			constructor(obj$1) {
				var _obj$source;
				super();
				(0, import_defineProperty$23.default)(this, "_get", void 0);
				(0, import_defineProperty$23.default)(this, "_length", void 0);
				(0, import_defineProperty$23.default)(this, "_source", void 0);
				(0, import_defineProperty$23.default)(this, "_sortedIndexMap", null);
				this._get =
					(obj$1 === null || obj$1 === void 0 ? void 0 : obj$1.get.bind(obj$1)) || void 0;
				this._length = (obj$1 === null || obj$1 === void 0 ? void 0 : obj$1.length) || 0;
				this._source =
					(_obj$source = obj$1 === null || obj$1 === void 0 ? void 0 : obj$1.source) !==
						null && _obj$source !== void 0
						? _obj$source
						: obj$1;
			}
			get source() {
				return this._source;
			}
			get(index) {
				return this.getOriginal(_getIndex(this._sortedIndexMap, index));
			}
			getField(index, field) {
				return this.getOriginalField(_getIndex(this._sortedIndexMap, index), field);
			}
			hasField(index, field) {
				return this.hasOriginalField(_getIndex(this._sortedIndexMap, index), field);
			}
			setField(index, field, value) {
				return this.setOriginalField(_getIndex(this._sortedIndexMap, index), field, value);
			}
			sort(field, order) {
				const sortedIndexMap = new Array(this._length);
				const orderFn = order !== "desc" ? ascOrderFn : descOrderFn;
				return sortPromise(
					index =>
						sortedIndexMap[index] != null
							? sortedIndexMap[index]
							: (sortedIndexMap[index] = index),
					(index, rel) => {
						sortedIndexMap[index] = rel;
					},
					this._length,
					orderFn,
					index => this.getOriginalField(index, field)
				).then(() => {
					this._sortedIndexMap = sortedIndexMap;
					this.fireListeners(EVENT_TYPE$1.UPDATED_ORDER);
				});
			}
			get length() {
				return this._length;
			}
			set length(length) {
				if (this._length === length) return;
				const results = this.fireListeners(EVENT_TYPE$1.UPDATE_LENGTH, length);
				if (results.findIndex(v => !v) >= 0) return;
				this._length = length;
				this.fireListeners(EVENT_TYPE$1.UPDATED_LENGTH, this._length);
			}
			get dataSource() {
				return this;
			}
			dispose() {
				super.dispose();
			}
			getOriginal(index) {
				return getValue(this._get(index), val => {
					this.recordPromiseCallBackInternal(index, val);
				});
			}
			getOriginalField(index, field) {
				if (field == null) return void 0;
				const record = this.getOriginal(index);
				return getField(record, field, val => {
					this.fieldPromiseCallBackInternal(index, field, val);
				});
			}
			hasOriginalField(index, field) {
				if (field == null) return false;
				if (typeof field === "function") return true;
				const record = this.getOriginal(index);
				return Boolean(record && field in record);
			}
			setOriginalField(index, field, value) {
				if (field == null) return false;
				const record = this.getOriginal(index);
				if (isPromise(record)) return record.then(r => setField(r, field, value));
				return setField(record, field, value);
			}
			fieldPromiseCallBackInternal(_index, _field, _value) {}
			recordPromiseCallBackInternal(_index, _record) {}
		};
		_DataSource = DataSource;
		(0, import_defineProperty$23.default)(
			DataSource,
			"EMPTY",
			new _DataSource({
				get() {},
				length: 0
			})
		);

		//#endregion
		//#region src/js/data/CachedDataSource.ts
		var import_defineProperty$22 = /* @__PURE__ */ __toESM(require_defineProperty());
		/** @private */
		function _setFieldCache(fCache, index, field, value) {
			const recCache = fCache[index] || (fCache[index] = /* @__PURE__ */ new Map());
			recCache.set(field, value);
		}
		/**
		 * grid data source for caching Promise data
		 *
		 * @classdesc cheetahGrid.data.CachedDataSource
		 * @memberof cheetahGrid.data
		 */
		var CachedDataSource = class CachedDataSource extends DataSource {
			static get EVENT_TYPE() {
				return DataSource.EVENT_TYPE;
			}
			static ofArray(array) {
				return new CachedDataSource({
					get: index => array[index],
					length: array.length,
					source: array
				});
			}
			constructor(opt) {
				super(opt);
				(0, import_defineProperty$22.default)(this, "_rCache", void 0);
				(0, import_defineProperty$22.default)(this, "_fCache", void 0);
				this._rCache = {};
				this._fCache = {};
			}
			getOriginal(index) {
				if (this._rCache && this._rCache[index]) return this._rCache[index];
				return super.getOriginal(index);
			}
			getOriginalField(index, field) {
				const rowCache = this._fCache && this._fCache[index];
				if (rowCache) {
					const cache = rowCache.get(field);
					if (cache) return cache;
				}
				return super.getOriginalField(index, field);
			}
			setOriginalField(index, field, value) {
				const fCache = this._fCache;
				if (fCache && fCache[index]) delete fCache[index];
				return super.setOriginalField(index, field, value);
			}
			clearCache() {
				if (this._rCache) this._rCache = {};
				if (this._fCache) this._fCache = {};
			}
			fieldPromiseCallBackInternal(index, field, value) {
				_setFieldCache(this._fCache, index, field, value);
			}
			recordPromiseCallBackInternal(index, record) {
				this._rCache[index] = record;
			}
			dispose() {
				super.dispose();
			}
		};

		//#endregion
		//#region src/js/data/FilterDataSource.ts
		var import_defineProperty$21 = /* @__PURE__ */ __toESM(require_defineProperty());
		/** @private */
		var DataSourceIterator = class {
			constructor(dataSource) {
				(0, import_defineProperty$21.default)(this, "_dataSource", void 0);
				(0, import_defineProperty$21.default)(this, "_curIndex", void 0);
				(0, import_defineProperty$21.default)(this, "_data", void 0);
				this._dataSource = dataSource;
				this._curIndex = -1;
				this._data = [];
			}
			hasNext() {
				const next = this._curIndex + 1;
				return this._dataSource.length > next;
			}
			next() {
				const next = this._curIndex + 1;
				const data = this._getIndexData(next);
				this._curIndex = next;
				return data;
			}
			movePrev() {
				this._curIndex--;
			}
			_getIndexData(index, nest) {
				const dataSource = this._dataSource;
				const data = this._data;
				if (index < data.length) return data[index];
				if (dataSource.length <= index) return void 0;
				const record = this._dataSource.get(index);
				data[index] = record;
				if (isPromise(record)) {
					record.then(val => {
						data[index] = val;
					});
					if (!nest) for (let i = 1; i <= 100; i++) this._getIndexData(index + i, true);
				}
				return record;
			}
		};
		/** @private */
		var FilterData = class {
			constructor(dc, original, filter) {
				(0, import_defineProperty$21.default)(this, "_owner", void 0);
				(0, import_defineProperty$21.default)(this, "_dataSourceItr", void 0);
				(0, import_defineProperty$21.default)(this, "_filter", void 0);
				(0, import_defineProperty$21.default)(this, "_filteredList", void 0);
				(0, import_defineProperty$21.default)(this, "_queues", void 0);
				(0, import_defineProperty$21.default)(this, "_cancel", false);
				this._owner = dc;
				this._dataSourceItr = new DataSourceIterator(original);
				this._filter = filter;
				this._filteredList = [];
				this._queues = [];
			}
			get(index) {
				if (this._cancel) return void 0;
				const filteredList = this._filteredList;
				if (index < filteredList.length) return filteredList[index];
				const queues = this._queues;
				const indexQueue = queues[index];
				if (indexQueue) return indexQueue;
				return queues[index] || this._findIndex(index);
			}
			cancel() {
				this._cancel = true;
			}
			_findIndex(index) {
				if (window.Promise) {
					const timeout = Date.now() + 100;
					let count = 0;
					return this._findIndexWithTimeout(index, () => {
						count++;
						if (count >= 100) {
							count = 0;
							return timeout < Date.now();
						}
						return false;
					});
				}
				return this._findIndexWithTimeout(index, () => false);
			}
			_findIndexWithTimeout(index, testTimeout) {
				const filteredList = this._filteredList;
				const filter = this._filter;
				const dataSourceItr = this._dataSourceItr;
				const queues = this._queues;
				while (dataSourceItr.hasNext()) {
					if (this._cancel) return void 0;
					const record = dataSourceItr.next();
					if (isPromise(record)) {
						dataSourceItr.movePrev();
						const queue = record.then(_value => {
							queues[index] = null;
							return this.get(index);
						});
						queues[index] = queue;
						return queue;
					}
					if (filter(record)) {
						filteredList.push(record);
						if (index < filteredList.length) return filteredList[index];
					}
					if (testTimeout()) {
						const promise = new Promise(resolve => {
							setTimeout(() => {
								resolve();
							}, 300);
						});
						const queue = promise.then(() => {
							queues[index] = null;
							return this.get(index);
						});
						queues[index] = queue;
						return queue;
					}
				}
				const dc = this._owner;
				dc.length = filteredList.length;
				return void 0;
			}
		};
		/**
		 * grid data source for filter
		 *
		 * @classdesc cheetahGrid.data.FilterDataSource
		 * @memberof cheetahGrid.data
		 */
		var FilterDataSource = class extends DataSource {
			static get EVENT_TYPE() {
				return DataSource.EVENT_TYPE;
			}
			constructor(dataSource, filter) {
				super(dataSource);
				(0, import_defineProperty$21.default)(this, "_dataSource", void 0);
				(0, import_defineProperty$21.default)(this, "_handler", void 0);
				(0, import_defineProperty$21.default)(this, "_filterData", null);
				this._dataSource = dataSource;
				this.filter = filter;
				const handler$1 = (this._handler = new EventHandler());
				handler$1.on(dataSource, DataSource.EVENT_TYPE.UPDATED_ORDER, () => {
					this.filter = this.filter;
				});
				each(DataSource.EVENT_TYPE, type => {
					handler$1.on(dataSource, type, (...args) => this.fireListeners(type, ...args));
				});
			}
			get filter() {
				var _this$_filterData;
				return (
					((_this$_filterData = this._filterData) === null || _this$_filterData === void 0
						? void 0
						: _this$_filterData._filter) || null
				);
			}
			set filter(filter) {
				if (this._filterData) this._filterData.cancel();
				this._filterData = filter ? new FilterData(this, this._dataSource, filter) : null;
				this.length = this._dataSource.length;
			}
			getOriginal(index) {
				if (!this._filterData) return super.getOriginal(index);
				return this._filterData.get(index);
			}
			sort(field, order) {
				return this._dataSource.sort(field, order);
			}
			get source() {
				return this._dataSource.source;
			}
			get dataSource() {
				return this._dataSource;
			}
			dispose() {
				this._handler.dispose();
				super.dispose();
			}
		};

		//#endregion
		//#region src/js/data.ts
		var data_exports = {};
		__export(data_exports, {
			CachedDataSource: () => CachedDataSource,
			DataSource: () => DataSource,
			FilterDataSource: () => FilterDataSource
		});

		//#endregion
		//#region src/js/header/action/BaseAction.ts
		var import_defineProperty$20 = /* @__PURE__ */ __toESM(require_defineProperty());
		var BaseAction = class BaseAction {
			constructor(option = {}) {
				(0, import_defineProperty$20.default)(this, "_disabled", void 0);
				this._disabled = !!option.disabled || false;
			}
			get disabled() {
				return this._disabled;
			}
			set disabled(disabled) {
				this._disabled = disabled;
				this.onChangeDisabledInternal();
			}
			clone() {
				return new BaseAction(this);
			}
			bindGridEvent(_grid, _cellId) {
				return [];
			}
			onChangeDisabledInternal() {}
		};

		//#endregion
		//#region src/js/header/action/actionBind.ts
		const KEY_ENTER = 13;
		const KEY_SPACE = 32;
		function bindCellClickAction(grid, cellId, { action, mouseOver, mouseOut }) {
			function isTarget(col, row) {
				return grid.getLayoutCellId(col, row) === cellId;
			}
			let inMouse;
			return [
				grid.listen(DG_EVENT_TYPE.CLICK_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					const sel = grid.selection.select;
					if (sel.col !== e.col || sel.row !== e.row) return;
					action({
						col: e.col,
						row: e.row
					});
				}),
				grid.listen(DG_EVENT_TYPE.MOUSEOVER_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					if (mouseOver) {
						if (
							!mouseOver({
								col: e.col,
								row: e.row
							})
						)
							return;
					}
					grid.getElement().style.cursor = "pointer";
					inMouse = true;
				}),
				grid.listen(DG_EVENT_TYPE.MOUSEMOVE_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					if (inMouse && !grid.getElement().style.cursor)
						grid.getElement().style.cursor = "pointer";
				}),
				grid.listen(DG_EVENT_TYPE.MOUSEOUT_CELL, e => {
					if (!isTarget(e.col, e.row)) return;
					if (mouseOut)
						mouseOut({
							col: e.col,
							row: e.row
						});
					grid.getElement().style.cursor = "";
					inMouse = false;
				})
			];
		}
		function bindCellKeyAction(grid, cellId, { action, acceptKeys = [] }) {
			function isTarget(col, row) {
				return grid.getLayoutCellId(col, row) === cellId;
			}
			acceptKeys = [...acceptKeys, KEY_ENTER, KEY_SPACE];
			return [
				grid.listen(DG_EVENT_TYPE.KEYDOWN, e => {
					var _grid$keyboardOptions;
					if (acceptKeys.indexOf(e.keyCode) === -1) return;
					if (
						((_grid$keyboardOptions = grid.keyboardOptions) === null ||
						_grid$keyboardOptions === void 0
							? void 0
							: _grid$keyboardOptions.moveCellOnEnter) &&
						e.keyCode === KEY_ENTER
					)
						return;
					const sel = grid.selection.select;
					if (!isTarget(sel.col, sel.row)) return;
					action({
						col: sel.col,
						row: sel.row
					});
					event.cancel(e.event);
				})
			];
		}

		//#endregion
		//#region src/js/header/action/CheckHeaderAction.ts
		function getState$1(grid) {
			let state = grid[CHECK_HEADER_STATE_ID];
			if (!state) {
				state = {
					elapsed: {},
					block: {}
				};
				obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
			}
			return state;
		}
		var CheckHeaderAction = class CheckHeaderAction extends BaseAction {
			clone() {
				return new CheckHeaderAction(this);
			}
			bindGridEvent(grid, cellId) {
				const state = getState$1(grid);
				const action = ({ col, row }) => {
					const range = grid.getCellRange(col, row);
					const cellKey = `${range.start.col}:${range.start.row}`;
					if (this.disabled || state.block[cellKey]) return;
					const checked = grid.getHeaderValue(range.start.col, range.start.row);
					grid.setHeaderValue(range.start.col, range.start.row, !checked);
					const onChange = () => {
						animate(200, point => {
							if (point === 1) delete state.elapsed[cellKey];
							else state.elapsed[cellKey] = point;
							grid.invalidateCellRange(range);
						});
					};
					onChange();
				};
				return [
					...bindCellClickAction(grid, cellId, {
						action,
						mouseOver: e => {
							if (this.disabled) return false;
							state.mouseActiveCell = {
								col: e.col,
								row: e.row
							};
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
							return true;
						},
						mouseOut: e => {
							delete state.mouseActiveCell;
							const range = grid.getCellRange(e.col, e.row);
							grid.invalidateCellRange(range);
						}
					}),
					...bindCellKeyAction(grid, cellId, { action })
				];
			}
		};

		//#endregion
		//#region src/js/header/action/SortHeaderAction.ts
		var import_defineProperty$19 = /* @__PURE__ */ __toESM(require_defineProperty());
		var SortHeaderAction = class SortHeaderAction extends BaseAction {
			constructor(option = {}) {
				var _option$sort;
				super(option);
				(0, import_defineProperty$19.default)(this, "_sort", void 0);
				this._sort =
					(_option$sort = option.sort) !== null && _option$sort !== void 0
						? _option$sort
						: true;
			}
			get sort() {
				return this._sort;
			}
			set sort(sort$1) {
				this._sort = sort$1;
				this.onChangeDisabledInternal();
			}
			clone() {
				return new SortHeaderAction(this);
			}
			_executeSort(newState, grid) {
				if (typeof this._sort === "function")
					this._sort({
						order: newState.order || "asc",
						col: newState.col,
						row: newState.row,
						grid
					});
				else if (
					typeof this._sort === "string" &&
					(this._sort !== "true" || hasTrueField(grid))
				) {
					const field = this._sort;
					grid.dataSource.sort(field, newState.order || "asc");
				} else {
					const fieldRow =
						Math.min(grid.recordRowCount - 1, newState.row) + grid.frozenRowCount;
					const field = grid.getField(newState.col, fieldRow);
					if (field == null) return;
					grid.dataSource.sort(field, newState.order || "asc");
				}
			}
			bindGridEvent(grid, cellId) {
				function isTarget(col, row) {
					return grid.getLayoutCellId(col, row) === cellId;
				}
				const action = cell => {
					if (this.disabled) return;
					const state = grid.sortState;
					let newState;
					const range = grid.getCellRange(cell.col, cell.row);
					if (isTarget(state.col, cell.row))
						newState = {
							col: range.start.col,
							row: range.start.row,
							order: state.order === "asc" ? "desc" : "asc"
						};
					else
						newState = {
							col: range.start.col,
							row: range.start.row,
							order: "asc"
						};
					grid.sortState = newState;
					this._executeSort(newState, grid);
					grid.invalidateGridRect(0, 0, grid.colCount - 1, grid.rowCount - 1);
				};
				return [
					...bindCellClickAction(grid, cellId, {
						action,
						mouseOver: _e => {
							if (this.disabled) return false;
							return true;
						}
					})
				];
			}
		};
		function hasTrueField(grid) {
			if (grid.dataSource.length > 0) {
				const record = grid.dataSource.get(0);
				return record != null && "true" in record;
			}
			return false;
		}

		//#endregion
		//#region src/js/header/action.ts
		var action_exports = {};
		__export(action_exports, {
			ACTIONS: () => ACTIONS,
			BaseAction: () => BaseAction,
			CheckHeaderAction: () => CheckHeaderAction,
			SortHeaderAction: () => SortHeaderAction,
			of: () => of$3,
			ofCell: () => ofCell$1
		});
		var ImmutableSortHeaderAction = class extends SortHeaderAction {
			get disabled() {
				return this._disabled;
			}
		};
		var ImmutableCheckHeaderAction = class extends CheckHeaderAction {
			get disabled() {
				return this._disabled;
			}
		};
		const ACTIONS = {
			SORT: new ImmutableSortHeaderAction(),
			CHECK: new ImmutableCheckHeaderAction()
		};
		function of$3(headerAction) {
			if (!headerAction) return void 0;
			else if (typeof headerAction === "string") {
				const key = headerAction.toUpperCase();
				return ACTIONS[key] || of$3(null);
			} else return headerAction;
		}
		function ofCell$1(headerCell) {
			if (headerCell.sort) {
				if (typeof headerCell.sort === "function") {
					const sortMethod = headerCell.sort;
					const sort$1 = ({ order, col, grid }) =>
						sortMethod.call(headerCell, order, col, grid);
					return new ImmutableSortHeaderAction({ sort: sort$1 });
				}
				if (typeof headerCell.sort === "string")
					return new ImmutableSortHeaderAction({ sort: headerCell.sort });
				return ACTIONS.SORT;
			}
			return of$3(headerCell.headerAction);
		}

		//#endregion
		//#region src/js/header/style/BaseStyle.ts
		var import_defineProperty$18 = /* @__PURE__ */ __toESM(require_defineProperty());
		const EVENT_TYPE = { CHANGE_STYLE: "change_style" };
		let defaultStyle$7;
		var BaseStyle$1 = class BaseStyle$1 extends EventTarget {
			static get EVENT_TYPE() {
				return EVENT_TYPE;
			}
			static get DEFAULT() {
				return defaultStyle$7 ? defaultStyle$7 : (defaultStyle$7 = new BaseStyle$1());
			}
			constructor({ bgColor } = {}) {
				super();
				(0, import_defineProperty$18.default)(this, "_bgColor", void 0);
				this._bgColor = bgColor;
			}
			get bgColor() {
				return this._bgColor;
			}
			set bgColor(bgColor) {
				this._bgColor = bgColor;
				this.doChangeStyle();
			}
			doChangeStyle() {
				this.fireListeners(EVENT_TYPE.CHANGE_STYLE);
			}
			clone() {
				return new BaseStyle$1(this);
			}
		};

		//#endregion
		//#region src/js/header/style/StdBaseStyle.ts
		var import_defineProperty$17 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$6;
		var StdBaseStyle = class StdBaseStyle extends BaseStyle$1 {
			static get DEFAULT() {
				return defaultStyle$6 ? defaultStyle$6 : (defaultStyle$6 = new StdBaseStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$17.default)(this, "_textAlign", void 0);
				(0, import_defineProperty$17.default)(this, "_textBaseline", void 0);
				this._textAlign = style$1.textAlign || "left";
				this._textBaseline = style$1.textBaseline || "middle";
			}
			get textAlign() {
				return this._textAlign;
			}
			set textAlign(textAlign) {
				this._textAlign = textAlign;
				this.doChangeStyle();
			}
			get textBaseline() {
				return this._textBaseline;
			}
			set textBaseline(textBaseline) {
				this._textBaseline = textBaseline;
				this.doChangeStyle();
			}
			clone() {
				return new StdBaseStyle(this);
			}
		};

		//#endregion
		//#region src/js/header/style/StdTextBaseStyle.ts
		var import_defineProperty$16 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$5;
		var StdTextBaseStyle = class StdTextBaseStyle extends StdBaseStyle {
			static get DEFAULT() {
				return defaultStyle$5 ? defaultStyle$5 : (defaultStyle$5 = new StdTextBaseStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$16.default)(this, "_color", void 0);
				(0, import_defineProperty$16.default)(this, "_font", void 0);
				(0, import_defineProperty$16.default)(this, "_padding", void 0);
				(0, import_defineProperty$16.default)(this, "_textOverflow", void 0);
				this._color = style$1.color;
				this._font = style$1.font;
				this._padding = style$1.padding;
				this._textOverflow = style$1.textOverflow || "ellipsis";
			}
			get color() {
				return this._color;
			}
			set color(color) {
				this._color = color;
				this.doChangeStyle();
			}
			get font() {
				return this._font;
			}
			set font(font) {
				this._font = font;
				this.doChangeStyle();
			}
			get padding() {
				return this._padding;
			}
			set padding(padding) {
				this._padding = padding;
				this.doChangeStyle();
			}
			get textOverflow() {
				return this._textOverflow;
			}
			set textOverflow(textOverflow) {
				this._textOverflow = textOverflow;
				this.doChangeStyle();
			}
			clone() {
				return new StdTextBaseStyle(this);
			}
		};

		//#endregion
		//#region src/js/header/style/CheckHeaderStyle.ts
		var import_defineProperty$15 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$4;
		var CheckHeaderStyle = class CheckHeaderStyle extends StdTextBaseStyle {
			static get DEFAULT() {
				return defaultStyle$4 ? defaultStyle$4 : (defaultStyle$4 = new CheckHeaderStyle());
			}
			constructor(style$1 = {}) {
				super(defaults(style$1, { textAlign: "center" }));
				(0, import_defineProperty$15.default)(this, "_uncheckBgColor", void 0);
				(0, import_defineProperty$15.default)(this, "_checkBgColor", void 0);
				(0, import_defineProperty$15.default)(this, "_borderColor", void 0);
				const { uncheckBgColor, checkBgColor, borderColor } = style$1;
				this._uncheckBgColor = uncheckBgColor;
				this._checkBgColor = checkBgColor;
				this._borderColor = borderColor;
			}
			get uncheckBgColor() {
				return this._uncheckBgColor;
			}
			set uncheckBgColor(uncheckBgColor) {
				this._uncheckBgColor = uncheckBgColor;
				this.doChangeStyle();
			}
			get checkBgColor() {
				return this._checkBgColor;
			}
			set checkBgColor(checkBgColor) {
				this._checkBgColor = checkBgColor;
				this.doChangeStyle();
			}
			get borderColor() {
				return this._borderColor;
			}
			set borderColor(borderColor) {
				this._borderColor = borderColor;
				this.doChangeStyle();
			}
			clone() {
				return new CheckHeaderStyle(this);
			}
		};

		//#endregion
		//#region src/js/header/style/StdMultilineTextBaseStyle.ts
		var import_defineProperty$14 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$3;
		var StdMultilineTextBaseStyle = class StdMultilineTextBaseStyle extends StdTextBaseStyle {
			static get DEFAULT() {
				return defaultStyle$3
					? defaultStyle$3
					: (defaultStyle$3 = new StdMultilineTextBaseStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$14.default)(this, "_lineHeight", void 0);
				(0, import_defineProperty$14.default)(this, "_autoWrapText", void 0);
				(0, import_defineProperty$14.default)(this, "_lineClamp", void 0);
				this._lineHeight = style$1.lineHeight || "1em";
				this._autoWrapText = style$1.autoWrapText || false;
				this._lineClamp = style$1.lineClamp;
			}
			clone() {
				return new StdMultilineTextBaseStyle(this);
			}
			get lineHeight() {
				return this._lineHeight;
			}
			set lineHeight(lineHeight) {
				this._lineHeight = lineHeight;
				this.doChangeStyle();
			}
			get lineClamp() {
				return this._lineClamp;
			}
			set lineClamp(lineClamp) {
				this._lineClamp = lineClamp;
				this.doChangeStyle();
			}
			get autoWrapText() {
				return this._autoWrapText;
			}
			set autoWrapText(autoWrapText) {
				this._autoWrapText = autoWrapText;
				this.doChangeStyle();
			}
		};

		//#endregion
		//#region src/js/header/style/MultilineTextHeaderStyle.ts
		let defaultStyle$2;
		var MultilineTextHeaderStyle = class MultilineTextHeaderStyle extends StdMultilineTextBaseStyle {
			static get DEFAULT() {
				return defaultStyle$2
					? defaultStyle$2
					: (defaultStyle$2 = new MultilineTextHeaderStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
			}
			clone() {
				return new MultilineTextHeaderStyle(this);
			}
		};

		//#endregion
		//#region src/js/header/style/SortHeaderStyle.ts
		var import_defineProperty$13 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle$1;
		var SortHeaderStyle = class SortHeaderStyle extends StdMultilineTextBaseStyle {
			static get DEFAULT() {
				return defaultStyle$1 ? defaultStyle$1 : (defaultStyle$1 = new SortHeaderStyle());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$13.default)(this, "_sortArrowColor", void 0);
				(0, import_defineProperty$13.default)(this, "_multiline", void 0);
				this._sortArrowColor = style$1.sortArrowColor;
				this._multiline = style$1.multiline;
			}
			get sortArrowColor() {
				return this._sortArrowColor;
			}
			set sortArrowColor(sortArrowColor) {
				this._sortArrowColor = sortArrowColor;
				this.doChangeStyle();
			}
			get multiline() {
				return !!this._multiline;
			}
			set multiline(multiline) {
				this._multiline = multiline;
				this.doChangeStyle();
			}
			clone() {
				return new SortHeaderStyle(this);
			}
		};

		//#endregion
		//#region src/js/header/style/Style.ts
		var import_defineProperty$12 = /* @__PURE__ */ __toESM(require_defineProperty());
		let defaultStyle;
		var Style = class Style extends StdMultilineTextBaseStyle {
			static get DEFAULT() {
				return defaultStyle ? defaultStyle : (defaultStyle = new Style());
			}
			constructor(style$1 = {}) {
				super(style$1);
				(0, import_defineProperty$12.default)(this, "_multiline", void 0);
				this._multiline = style$1.multiline;
			}
			get multiline() {
				return !!this._multiline;
			}
			set multiline(multiline) {
				this._multiline = multiline;
				this.doChangeStyle();
			}
			clone() {
				return new Style(this);
			}
		};

		//#endregion
		//#region src/js/header/style.ts
		var style_exports = {};
		__export(style_exports, {
			BaseStyle: () => BaseStyle$1,
			CheckHeaderStyle: () => CheckHeaderStyle,
			MultilineTextHeaderStyle: () => MultilineTextHeaderStyle,
			SortHeaderStyle: () => SortHeaderStyle,
			Style: () => Style,
			of: () => of$2
		});
		function of$2(headerStyle, StyleClass) {
			if (headerStyle) {
				if (headerStyle instanceof Style) return headerStyle;
				else if (typeof headerStyle === "function") return of$2(headerStyle(), StyleClass);
				return new StyleClass(headerStyle);
			} else return StyleClass.DEFAULT;
		}

		//#endregion
		//#region src/js/header/type/BaseHeader.ts
		var BaseHeader = class {
			constructor(_options = {}) {
				this.onDrawCell = this.onDrawCell.bind(this);
			}
			get StyleClass() {
				return BaseStyle$1;
			}
			onDrawCell(cellValue, info, context, grid) {
				const { style: style$1, drawCellBase } = info;
				const helper = grid.getGridCanvasHelper();
				drawCellBase();
				this.drawInternal(
					this.convertInternal(cellValue),
					context,
					of$2(style$1, this.StyleClass),
					helper,
					grid,
					info
				);
			}
			convertInternal(value) {
				if (typeof value === "function") value = value();
				return value != null ? `${value}` : "";
			}
			bindGridEvent(_grid, _cellId) {
				return [];
			}
			getCopyCellValue(value, _grid, _cell) {
				if (typeof value === "function") value = value();
				return value != null ? value : "";
			}
		};

		//#endregion
		//#region src/js/header/type/CheckHeader.ts
		function getState(grid) {
			let state = grid[CHECK_HEADER_STATE_ID];
			if (!state) {
				state = {
					elapsed: {},
					block: {}
				};
				obj.setReadonly(grid, CHECK_HEADER_STATE_ID, state);
			}
			return state;
		}
		var CheckHeader = class CheckHeader extends BaseHeader {
			get StyleClass() {
				return CheckHeaderStyle;
			}
			clone() {
				return new CheckHeader(this);
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					borderColor,
					checkBgColor,
					uncheckBgColor,
					bgColor,
					padding,
					color,
					font,
					textOverflow
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				const { col, row } = context;
				const range = grid.getCellRange(col, row);
				const cellKey = `${range.start.col}:${range.start.row}`;
				const {
					elapsed: { [cellKey]: elapsed }
				} = getState(grid);
				const checked = grid.getHeaderValue(range.start.col, range.start.row);
				const opt = {
					textAlign,
					textBaseline,
					borderColor,
					checkBgColor,
					uncheckBgColor
				};
				if (elapsed != null) opt.animElapsedTime = elapsed;
				const inlineCheck = helper.buildCheckBoxInline(!!checked, context, opt);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					let contents = [inlineCheck];
					contents = contents.concat(
						buildInlines$1(icons$2, value != null ? String(value) : "")
					);
					helper.text(contents, context$1, {
						textAlign,
						textBaseline,
						color,
						font,
						padding,
						textOverflow
					});
				});
			}
		};

		//#endregion
		//#region src/js/header/type/Header.ts
		var Header = class extends BaseHeader {
			get StyleClass() {
				return Style;
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					color,
					font,
					bgColor,
					padding,
					textOverflow,
					lineHeight,
					autoWrapText,
					lineClamp,
					multiline
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				const textValue = value != null ? String(value) : "";
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					if (multiline) {
						const multilines = textValue
							.replace(/\r?\n/g, "\n")
							.replace(/\r/g, "\n")
							.split("\n");
						helper.multilineText(multilines, context$1, {
							textAlign,
							textBaseline,
							color,
							font,
							padding,
							lineHeight,
							autoWrapText,
							lineClamp,
							textOverflow,
							icons: icons$2
						});
					} else
						helper.text(textValue, context$1, {
							textAlign,
							textBaseline,
							color,
							font,
							padding,
							textOverflow,
							icons: icons$2
						});
				});
			}
		};

		//#endregion
		//#region src/js/header/type/MultilineTextHeader.ts
		var MultilineTextHeader = class MultilineTextHeader extends BaseHeader {
			get StyleClass() {
				return MultilineTextHeaderStyle;
			}
			clone() {
				return new MultilineTextHeader(this);
			}
			drawInternal(value, context, style$1, helper, _grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline,
					color,
					font,
					bgColor,
					padding,
					lineHeight,
					autoWrapText,
					lineClamp,
					textOverflow
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				const textValue = value != null ? String(value) : "";
				const multilines = textValue
					.replace(/\r?\n/g, "\n")
					.replace(/\r/g, "\n")
					.split("\n");
				helper.testFontLoad(font, textValue, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					helper.multilineText(multilines, context$1, {
						textAlign,
						textBaseline,
						color,
						font,
						padding,
						lineHeight,
						autoWrapText,
						lineClamp,
						textOverflow,
						icons: icons$2
					});
				});
			}
		};

		//#endregion
		//#region src/js/header/type/SortHeader.ts
		var SortHeader = class extends BaseHeader {
			get StyleClass() {
				return SortHeaderStyle;
			}
			drawInternal(value, context, style$1, helper, grid, { drawCellBase, getIcon }) {
				const {
					textAlign,
					textBaseline = "middle",
					color,
					bgColor,
					font,
					padding,
					textOverflow,
					lineHeight,
					autoWrapText,
					lineClamp,
					sortArrowColor,
					multiline
				} = style$1;
				if (bgColor) drawCellBase({ bgColor });
				const textValue = value != null ? String(value) : "";
				helper.testFontLoad(font, textValue, context);
				loadIcons(getIcon(), context, helper, (icons$2, context$1) => {
					const state = grid.sortState;
					let order = void 0;
					const { col, row } = context$1;
					const range = grid.getCellRange(col, row);
					if (cellInRange(range, state.col, state.row)) ({ order } = state);
					const ctx = context$1.getContext();
					const arrowSize = getFontSize(ctx, font).width * 1.2;
					const trailingIcon = {
						name:
							order != null
								? order === "asc"
									? "arrow_downward"
									: "arrow_upward"
								: void 0,
						width: arrowSize,
						color:
							helper.getColor(
								sortArrowColor || helper.theme.header.sortArrowColor,
								col,
								row,
								ctx
							) || "rgba(0, 0, 0, 0.38)"
					};
					if (multiline) {
						const lines = textValue
							.replace(/\r?\n/g, "\n")
							.replace(/\r/g, "\n")
							.split("\n");
						helper.multilineText(lines, context$1, {
							textAlign,
							textBaseline,
							color,
							font,
							padding,
							lineHeight,
							autoWrapText,
							lineClamp,
							textOverflow,
							icons: icons$2,
							trailingIcon
						});
					} else
						helper.text(textValue, context$1, {
							textAlign,
							textBaseline,
							color,
							font,
							padding,
							textOverflow,
							icons: icons$2,
							trailingIcon
						});
				});
			}
		};

		//#endregion
		//#region src/js/header/type.ts
		var type_exports = {};
		__export(type_exports, {
			BaseHeader: () => BaseHeader,
			CheckHeader: () => CheckHeader,
			Header: () => Header,
			MultilineTextHeader: () => MultilineTextHeader,
			SortHeader: () => SortHeader,
			of: () => of$1,
			ofCell: () => ofCell
		});
		const TYPES = {
			DEFAULT: new Header(),
			SORT: new SortHeader(),
			CHECK: new CheckHeader(),
			MULTILINETEXT: new MultilineTextHeader()
		};
		function of$1(headerType) {
			if (!headerType) return TYPES.DEFAULT;
			else if (typeof headerType === "string") {
				const key = headerType.toUpperCase();
				return TYPES[key] || of$1(null);
			} else return headerType;
		}
		function ofCell(headerCell) {
			if (headerCell.sort) return TYPES.SORT;
			return of$1(headerCell.headerType);
		}

		//#endregion
		//#region src/js/headers.ts
		var headers_exports = {};
		__export(headers_exports, {
			action: () => action_exports,
			style: () => style_exports,
			type: () => type_exports
		});

		//#endregion
		//#region src/js/plugins/themes.ts
		const themes = {};

		//#endregion
		//#region src/js/register.ts
		var register_exports = {};
		__export(register_exports, {
			icon: () => icon,
			icons: () => icons$1,
			theme: () => theme$1
		});
		function register(obj$1, name, value) {
			const old = obj$1[name];
			obj$1[name] = value;
			return old;
		}
		function registers(obj$1, values) {
			for (const k in values) obj$1[k] = values[k];
		}
		function theme$1(name, theme$2) {
			if (theme$2 != null) return register(themes, name, theme$2);
			else return themes[name];
		}
		function icon(name, icon$1) {
			if (icon$1 != null) return register(icons, name, icon$1);
			else return icons[name];
		}
		function icons$1(icons$2) {
			return registers(icons, icons$2);
		}

		//#endregion
		//#region src/js/themes/theme.ts
		var import_defineProperty$11 = /* @__PURE__ */ __toESM(require_defineProperty());
		const _$1 = Symbol("private");
		function getProp(obj$1, superObj, names, defNames, convertForSuper, defaultValue) {
			const value = getChainSafe(obj$1, ...names) || getChainSafe(superObj, ...names);
			if (value) return value;
			if (!defNames) return value || defaultValue;
			const getChainSafeWithConvert = convertForSuper
				? (obj$2, ...names$1) => {
						const value$1 = getChainSafe(obj$2, ...names$1);
						if (!value$1) return value$1;
						return convertForSuper(value$1);
					}
				: getChainSafe;
			return (
				getChainSafeWithConvert(obj$1, ...defNames) ||
				getChainSafeWithConvert(superObj, ...defNames) ||
				defaultValue
			);
		}
		var Theme = class Theme {
			constructor(obj$1, superTheme) {
				(0, import_defineProperty$11.default)(this, _$1, void 0);
				(0, import_defineProperty$11.default)(this, "_checkbox", null);
				(0, import_defineProperty$11.default)(this, "_radioButton", null);
				(0, import_defineProperty$11.default)(this, "_button", null);
				(0, import_defineProperty$11.default)(this, "_tree", null);
				(0, import_defineProperty$11.default)(this, "_header", null);
				(0, import_defineProperty$11.default)(this, "_messages", null);
				(0, import_defineProperty$11.default)(this, "_indicators", null);
				this[_$1] = {
					obj: obj$1,
					superTheme
				};
			}
			get font() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["font"]);
			}
			get underlayBackgroundColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["underlayBackgroundColor"]);
			}
			get color() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["color"]);
			}
			get frozenRowsColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["frozenRowsColor"], ["color"]);
			}
			get defaultBgColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["defaultBgColor"]);
			}
			get frozenRowsBgColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["frozenRowsBgColor"], ["defaultBgColor"]);
			}
			get selectionBgColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["selectionBgColor"], ["defaultBgColor"]);
			}
			get highlightBgColor() {
				if (this.hasProperty(["highlightBgColor"])) {
					const { obj: obj$1, superTheme } = this[_$1];
					return getProp(obj$1, superTheme, ["highlightBgColor"]);
				}
				return args => {
					const color =
						args.row < args.grid.frozenRowCount
							? this.frozenRowsBgColor
							: this.defaultBgColor;
					if (typeof color === "function") return color(args);
					return color;
				};
			}
			get borderColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["borderColor"]);
			}
			get frozenRowsBorderColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["frozenRowsBorderColor"], ["borderColor"]);
			}
			get highlightBorderColor() {
				const { obj: obj$1, superTheme } = this[_$1];
				return getProp(obj$1, superTheme, ["highlightBorderColor"], ["borderColor"]);
			}
			get checkbox() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._checkbox ||
					(this._checkbox = {
						get uncheckBgColor() {
							return getCheckboxProp("uncheckBgColor", ["defaultBgColor"]);
						},
						get checkBgColor() {
							return getCheckboxProp(
								"checkBgColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get borderColor() {
							return getCheckboxProp(
								"borderColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						}
					})
				);
				function getCheckboxProp(prop, defNames, convertForSuper, defaultValue) {
					return getProp(
						obj$1,
						superTheme,
						["checkbox", prop],
						defNames,
						convertForSuper,
						defaultValue
					);
				}
			}
			get radioButton() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._radioButton ||
					(this._radioButton = {
						get checkColor() {
							return getRadioButtonProp("checkColor", ["color"]);
						},
						get uncheckBorderColor() {
							return getRadioButtonProp(
								"uncheckBorderColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get checkBorderColor() {
							return getRadioButtonProp(
								"checkBorderColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get uncheckBgColor() {
							return getRadioButtonProp("uncheckBgColor", ["defaultBgColor"]);
						},
						get checkBgColor() {
							return getRadioButtonProp("checkBgColor", ["defaultBgColor"]);
						}
					})
				);
				function getRadioButtonProp(prop, defNames, convertForSuper, defaultValue) {
					return getProp(
						obj$1,
						superTheme,
						["radioButton", prop],
						defNames,
						convertForSuper,
						defaultValue
					);
				}
			}
			get button() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._button ||
					(this._button = {
						get color() {
							return getButtonProp("color", ["color"]);
						},
						get bgColor() {
							return getButtonProp("bgColor", ["defaultBgColor"]);
						}
					})
				);
				function getButtonProp(prop, defNames) {
					return getProp(obj$1, superTheme, ["button", prop], defNames);
				}
			}
			get tree() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._tree ||
					(this._tree = {
						get lineStyle() {
							return getTreeProp("lineStyle", void 0, void 0, "solid");
						},
						get lineColor() {
							return getTreeProp(
								"lineColor",
								["borderColor"],
								colorsToColor,
								"#0000"
							);
						},
						get lineWidth() {
							return getTreeProp("lineWidth", void 0, void 0, 1);
						},
						get treeIcon() {
							return getTreeProp("treeIcon", void 0, void 0, args => {
								const { hasChildren, nodeType } = getTreeNodeInfoAt(args);
								if (hasChildren) return "expand_more";
								return nodeType === "branch" ? "chevron_right" : "none";
							});
						}
					})
				);
				function getTreeProp(prop, defNames, convertForSuper, defaultValue) {
					return getProp(
						obj$1,
						superTheme,
						["tree", prop],
						defNames,
						convertForSuper,
						defaultValue
					);
				}
			}
			get header() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._header ||
					(this._header = {
						get sortArrowColor() {
							return getProp(
								obj$1,
								superTheme,
								["header", "sortArrowColor"],
								["color"]
							);
						}
					})
				);
			}
			get messages() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._messages ||
					(this._messages = {
						get infoBgColor() {
							return getMessageProp("infoBgColor");
						},
						get errorBgColor() {
							return getMessageProp("errorBgColor");
						},
						get warnBgColor() {
							return getMessageProp("warnBgColor");
						},
						get boxWidth() {
							return getMessageProp("boxWidth");
						},
						get markHeight() {
							return getMessageProp("markHeight");
						}
					})
				);
				function getMessageProp(prop) {
					return getProp(obj$1, superTheme, ["messages", prop]);
				}
			}
			get indicators() {
				const { obj: obj$1, superTheme } = this[_$1];
				return (
					this._indicators ||
					(this._indicators = {
						get topLeftColor() {
							return getIndicatorsProp(
								"topLeftColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get topLeftSize() {
							return getIndicatorsProp("topLeftSize");
						},
						get topRightColor() {
							return getIndicatorsProp(
								"topRightColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get topRightSize() {
							return getIndicatorsProp("topRightSize");
						},
						get bottomRightColor() {
							return getIndicatorsProp(
								"bottomRightColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get bottomRightSize() {
							return getIndicatorsProp("bottomRightSize");
						},
						get bottomLeftColor() {
							return getIndicatorsProp(
								"bottomLeftColor",
								["borderColor"],
								colorsToColor,
								"#000"
							);
						},
						get bottomLeftSize() {
							return getIndicatorsProp("bottomLeftSize");
						}
					})
				);
				function getIndicatorsProp(prop, defNames, convertForSuper, defaultValue) {
					return getProp(
						obj$1,
						superTheme,
						["indicators", prop],
						defNames,
						convertForSuper,
						defaultValue
					);
				}
			}
			hasProperty(names) {
				const { obj: obj$1, superTheme } = this[_$1];
				return hasThemeProperty(obj$1, names) || hasThemeProperty(superTheme, names);
			}
			extends(obj$1) {
				return new Theme(obj$1, this);
			}
		};
		function hasThemeProperty(obj$1, names) {
			if (obj$1 instanceof Theme) return obj$1.hasProperty(names);
			else {
				let o = obj$1;
				if (!o) return false;
				for (let index = 0; index < names.length; index++) {
					const name = names[index];
					o = o[name];
					if (!o) return false;
				}
				return !!o;
			}
		}
		function colorsToColor(colors) {
			if (typeof colors === "function")
				return arg => {
					const val = colors(arg);
					return val ? colorsArrayToColor(val) : val;
				};
			return colorsArrayToColor(colors);
			function colorsArrayToColor(colors$1) {
				if (!Array.isArray(colors$1)) return colors$1;
				return colors$1.find(Boolean) || void 0;
			}
		}

		//#endregion
		//#region src/js/themes/BASIC.ts
		function DEFAULT_BG_COLOR(args) {
			const { row, grid } = args;
			if (row < grid.frozenRowCount) return "#FFF";
			const index = grid.getRecordIndexByRow(row);
			if (!(index & 1)) return "#FFF";
			else return "#F6F6F6";
		}
		const cacheLinearGradient = {};
		function getLinearGradient(context, left, top, right, bottom, colorStops) {
			let stop;
			const stopsKey = [];
			for (stop in colorStops) stopsKey.push(`${stop}@${colorStops[stop]}`);
			const key = `${left}/${top}/${right}/${bottom}/${stopsKey.join(",")}`;
			const ret = cacheLinearGradient[key];
			if (ret) return ret;
			const grad = context.createLinearGradient(left, top, left, bottom);
			for (stop in colorStops) grad.addColorStop(Number(stop), colorStops[stop]);
			return (cacheLinearGradient[key] = grad);
		}
		function FROZEN_ROWS_BG_COLOR(args) {
			const {
				col,
				grid,
				grid: { frozenRowCount },
				context
			} = args;
			const { left, top } = grid.getCellRelativeRect(col, 0);
			const { bottom } = grid.getCellRelativeRect(col, frozenRowCount - 1);
			return getLinearGradient(context, left, top, left, bottom, {
				0: "#FFF",
				1: "#D3D3D3"
			});
		}
		/**
		 * basic theme
		 * @name BASIC
		 * @memberof cheetahGrid.themes.choices
		 */
		var BASIC_default = {
			color: "#000",
			defaultBgColor: DEFAULT_BG_COLOR,
			frozenRowsBgColor: FROZEN_ROWS_BG_COLOR,
			selectionBgColor: "#CCE0FF",
			borderColor: "#000",
			highlightBorderColor: "#5E9ED6",
			checkbox: {
				uncheckBgColor: "#FFF",
				checkBgColor: "rgb(76, 73, 72)",
				borderColor: "#000"
			},
			radioButton: {
				checkColor: "rgb(76, 73, 72)",
				checkBorderColor: "#000",
				uncheckBorderColor: "#000",
				uncheckBgColor: "#FFF",
				checkBgColor: "#FFF"
			},
			button: {
				color: "#FFF",
				bgColor: "#2196F3"
			},
			header: { sortArrowColor: "rgba(0, 0, 0, 0.38)" },
			indicators: { topLeftColor: "#000" },
			underlayBackgroundColor: "#F6F6F6"
		};

		//#endregion
		//#region src/js/themes/MATERIAL_DESIGN.ts
		function FROZEN_ROWS_BORDER_COLOR(args) {
			const {
				row,
				grid: { frozenRowCount }
			} = args;
			if (frozenRowCount - 1 === row) return ["#f2f2f2", "#f2f2f2", "#ccc7c7", "#f2f2f2"];
			else return ["#f2f2f2"];
		}
		function BORDER_COLOR(args) {
			const { col, row, grid } = args;
			const { colCount, frozenColCount, recordRowCount } = grid;
			let top = "#ccc7c7";
			let bottom = "#ccc7c7";
			if (recordRowCount > 1) {
				const startRow = grid.getRecordStartRowByRecordIndex(grid.getRecordIndexByRow(row));
				const endRow = startRow + recordRowCount - 1;
				if (startRow !== row) top = null;
				if (endRow !== row) bottom = null;
			}
			if (frozenColCount - 1 === col) return [top, "#f2f2f2", bottom, null];
			if (colCount - 1 === col) return [top, "#f2f2f2", bottom, null];
			return [top, null, bottom, null];
		}
		/**
		 * material design theme
		 * @name MATERIAL_DESIGN
		 * @memberof cheetahGrid.themes.choices
		 */
		var MATERIAL_DESIGN_default = {
			color: "rgba(0, 0, 0, 0.87)",
			frozenRowsColor: "rgba(0, 0, 0, 0.54)",
			defaultBgColor: "#FFF",
			selectionBgColor: "#CCE0FF",
			borderColor: BORDER_COLOR,
			frozenRowsBorderColor: FROZEN_ROWS_BORDER_COLOR,
			highlightBorderColor: "#5E9ED6",
			checkbox: {
				checkBgColor: "rgb(76, 73, 72)",
				borderColor: "rgba(0, 0, 0, 0.26)"
			},
			radioButton: {
				checkColor: "rgb(76, 73, 72)",
				checkBorderColor: "rgb(76, 73, 72)",
				uncheckBorderColor: "rgb(189, 189, 189)"
			},
			button: {
				color: "#FFF",
				bgColor: "#2196F3"
			},
			header: { sortArrowColor: "rgba(0, 0, 0, 0.38)" },
			indicators: { topLeftColor: "#ccc7c7" },
			underlayBackgroundColor: "#FFF"
		};

		//#endregion
		//#region src/js/themes.ts
		var themes_exports = {};
		__export(themes_exports, {
			BASIC: () => BASIC,
			MATERIAL_DESIGN: () => MATERIAL_DESIGN,
			getChoices: () => getChoices,
			getDefault: () => getDefault,
			of: () => of,
			setDefault: () => setDefault,
			theme: () => theme
		});
		const BASIC = new Theme(BASIC_default);
		const MATERIAL_DESIGN = new Theme(MATERIAL_DESIGN_default);
		const builtin = {
			BASIC,
			MATERIAL_DESIGN
		};
		let defTheme = MATERIAL_DESIGN;
		const theme = { Theme };
		function of(value) {
			if (!value) return null;
			if (typeof value === "string") {
				const t = getIgnoreCase(getChoices(), value);
				if (t) return t;
				return null;
			}
			if (value instanceof Theme) return value;
			return new Theme(value);
		}
		function getDefault() {
			return defTheme;
		}
		function setDefault(defaultTheme) {
			defTheme = of(defaultTheme) || defTheme;
		}
		function getChoices() {
			return extend(builtin, themes);
		}

		//#endregion
		//#region src/js/tools/canvashelper.ts
		var canvashelper_exports = {};
		__export(canvashelper_exports, {
			drawButton: () => drawButton,
			drawCheckbox: () => drawCheckbox$1,
			drawInlineImageRect: () => drawInlineImageRect,
			drawRadioButton: () => drawRadioButton$1,
			fillCircle: () => fillCircle,
			fillRoundRect: () => fillRoundRect,
			fillTextRect: () => fillTextRect,
			measureCheckbox: () => measureCheckbox,
			measureRadioButton: () => measureRadioButton,
			roundRect: () => roundRect,
			strokeCircle: () => strokeCircle,
			strokeColorsRect: () => strokeColorsRect,
			strokeRoundRect: () => strokeRoundRect
		});
		const { ceil, PI } = Math;
		function strokeColorsRect(ctx, borderColors, left, top, width, height) {
			function strokeRectLines(positions) {
				for (let i = 0; i < borderColors.length; i++) {
					const color = borderColors[i];
					const preColor$1 = borderColors[i - 1];
					if (color) {
						if (preColor$1 !== color) {
							if (preColor$1) {
								ctx.strokeStyle = preColor$1;
								ctx.stroke();
							}
							const pos1 = positions[i];
							ctx.beginPath();
							ctx.moveTo(pos1.x, pos1.y);
						}
						const pos2 = positions[i + 1];
						ctx.lineTo(pos2.x, pos2.y);
					} else if (preColor$1) {
						ctx.strokeStyle = preColor$1;
						ctx.stroke();
					}
				}
				const preColor = borderColors[borderColors.length - 1];
				if (preColor) {
					ctx.strokeStyle = preColor;
					ctx.stroke();
				}
			}
			if (
				borderColors[0] === borderColors[1] &&
				borderColors[0] === borderColors[2] &&
				borderColors[0] === borderColors[3]
			) {
				if (borderColors[0]) {
					ctx.strokeStyle = borderColors[0];
					ctx.strokeRect(left, top, width, height);
				}
			} else
				strokeRectLines([
					{
						x: left,
						y: top
					},
					{
						x: left + width,
						y: top
					},
					{
						x: left + width,
						y: top + height
					},
					{
						x: left,
						y: top + height
					},
					{
						x: left,
						y: top
					}
				]);
		}
		function roundRect(ctx, left, top, width, height, radius) {
			ctx.beginPath();
			ctx.arc(left + radius, top + radius, radius, -PI, -0.5 * PI, false);
			ctx.arc(left + width - radius, top + radius, radius, -0.5 * PI, 0, false);
			ctx.arc(left + width - radius, top + height - radius, radius, 0, 0.5 * PI, false);
			ctx.arc(left + radius, top + height - radius, radius, 0.5 * PI, PI, false);
			ctx.closePath();
		}
		function fillRoundRect(ctx, left, top, width, height, radius) {
			roundRect(ctx, left, top, width, height, radius);
			ctx.fill();
		}
		function strokeRoundRect(ctx, left, top, width, height, radius) {
			roundRect(ctx, left, top, width, height, radius);
			ctx.stroke();
		}
		function fillCircle(ctx, left, top, width, height) {
			const min = Math.min(width, height) / 2;
			ctx.beginPath();
			ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}
		function strokeCircle(ctx, left, top, width, height) {
			const min = Math.min(width, height) / 2;
			ctx.beginPath();
			ctx.arc(left + min, top + min, min, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
		function fillTextRect(ctx, text, left, top, width, height, { offset = 2, padding } = {}) {
			const rect = {
				left,
				top,
				width,
				height,
				right: left + width,
				bottom: top + height
			};
			ctx.save();
			try {
				ctx.beginPath();
				ctx.rect(rect.left, rect.top, rect.width, rect.height);
				ctx.clip();
				const pos = calcBasePosition(ctx, rect, {
					offset,
					padding
				});
				ctx.fillText(text, pos.x, pos.y);
			} finally {
				ctx.restore();
			}
		}
		function drawInlineImageRect(
			ctx,
			image,
			srcLeft,
			srcTop,
			srcWidth,
			srcHeight,
			destWidth,
			destHeight,
			left,
			top,
			width,
			height,
			{ offset = 2, padding } = {}
		) {
			const rect = {
				left,
				top,
				width,
				height,
				right: left + width,
				bottom: top + height
			};
			ctx.save();
			try {
				ctx.beginPath();
				ctx.rect(rect.left, rect.top, rect.width, rect.height);
				ctx.clip();
				const pos = calcStartPosition(ctx, rect, destWidth, destHeight, {
					offset,
					padding
				});
				ctx.drawImage(
					image,
					srcLeft,
					srcTop,
					srcWidth,
					srcHeight,
					pos.x,
					pos.y,
					destWidth,
					destHeight
				);
			} finally {
				ctx.restore();
			}
		}
		/**
		 * Returns an object containing the width of the checkbox.
		 * @param  {CanvasRenderingContext2D} ctx canvas context
		 * @return {Object} Object containing the width of the checkbox
		 * @memberof cheetahGrid.tools.canvashelper
		 */
		function measureCheckbox(ctx) {
			return { width: getFontSize(ctx, null).width };
		}
		/**
		 * Returns an object containing the width of the radio button.
		 * @param  {CanvasRenderingContext2D} ctx canvas context
		 * @return {Object} Object containing the width of the radio button
		 * @memberof cheetahGrid.tools.canvashelper
		 */
		function measureRadioButton(ctx) {
			return { width: getFontSize(ctx, null).width };
		}
		/**
		 * draw Checkbox
		 * @param  {CanvasRenderingContext2D} ctx canvas context
		 * @param  {number} x The x coordinate where to start drawing the checkbox (relative to the canvas)
		 * @param  {number} y The y coordinate where to start drawing the checkbox (relative to the canvas)
		 * @param  {boolean|number} check checkbox check status
		 * @param  {object} option option
		 * @return {void}
		 * @memberof cheetahGrid.tools.canvashelper
		 */
		function drawCheckbox$1(
			ctx,
			x,
			y,
			check$1,
			{
				uncheckBgColor = "#FFF",
				checkBgColor = "rgb(76, 73, 72)",
				borderColor = "#000",
				boxSize = measureCheckbox(ctx).width
			} = {}
		) {
			const checkPoint = typeof check$1 === "number" ? (check$1 > 1 ? 1 : check$1) : 1;
			ctx.save();
			try {
				ctx.fillStyle = check$1 ? checkBgColor : uncheckBgColor;
				const leftX = ceil(x);
				const topY = ceil(y);
				const size = ceil(boxSize);
				fillRoundRect(ctx, leftX - 1, topY - 1, size + 1, size + 1, boxSize / 5);
				ctx.lineWidth = 1;
				ctx.strokeStyle = borderColor;
				strokeRoundRect(ctx, leftX - 0.5, topY - 0.5, size, size, boxSize / 5);
				if (check$1) {
					ctx.lineWidth = ceil(boxSize / 10);
					ctx.strokeStyle = uncheckBgColor;
					let leftWidth = boxSize / 4;
					let rightWidth = (boxSize / 2) * 0.9;
					const leftLeftPos = x + boxSize * 0.2;
					const leftTopPos = y + boxSize / 2;
					if (checkPoint < 0.5) leftWidth *= checkPoint * 2;
					ctx.beginPath();
					ctx.moveTo(leftLeftPos, leftTopPos);
					ctx.lineTo(leftLeftPos + leftWidth, leftTopPos + leftWidth);
					if (checkPoint > 0.5) {
						if (checkPoint < 1) rightWidth *= (checkPoint - 0.5) * 2;
						ctx.lineTo(
							leftLeftPos + leftWidth + rightWidth,
							leftTopPos + leftWidth - rightWidth
						);
					}
					ctx.stroke();
				}
			} finally {
				ctx.restore();
			}
		}
		/**
		 * draw Radio button
		 * @param  {CanvasRenderingContext2D} ctx canvas context
		 * @param  {number} x The x coordinate where to start drawing the radio button (relative to the canvas)
		 * @param  {number} y The y coordinate where to start drawing the radio button (relative to the canvas)
		 * @param  {boolean|number} check radio button check status
		 * @param  {object} option option
		 * @return {void}
		 * @memberof cheetahGrid.tools.canvashelper
		 */
		function drawRadioButton$1(
			ctx,
			x,
			y,
			check$1,
			{
				checkColor = "rgb(76, 73, 72)",
				borderColor = "#000",
				bgColor = "#FFF",
				boxSize = measureRadioButton(ctx).width
			} = {}
		) {
			const ratio$1 = typeof check$1 === "number" ? (check$1 > 1 ? 1 : check$1) : 1;
			ctx.save();
			try {
				ctx.fillStyle = bgColor;
				const leftX = ceil(x);
				const topY = ceil(y);
				const size = ceil(boxSize);
				fillCircle(ctx, leftX - 1, topY - 1, size + 1, size + 1);
				ctx.lineWidth = 1;
				ctx.strokeStyle = borderColor;
				strokeCircle(ctx, leftX - 0.5, topY - 0.5, size, size);
				if (check$1) {
					const checkSize = (size * ratio$1) / 2;
					const padding = (size - checkSize) / 2;
					ctx.fillStyle = checkColor;
					fillCircle(
						ctx,
						ceil((leftX - 0.5 + padding) * 100) / 100,
						ceil((topY - 0.5 + padding) * 100) / 100,
						ceil(checkSize * 100) / 100,
						ceil(checkSize * 100) / 100
					);
				}
			} finally {
				ctx.restore();
			}
		}
		/**
		 * draw Button
		 */
		function drawButton(ctx, left, top, width, height, option = {}) {
			const {
				backgroundColor = "#FFF",
				bgColor = backgroundColor,
				radius = 4,
				shadow = {}
			} = option;
			ctx.save();
			try {
				ctx.fillStyle = bgColor;
				if (shadow) {
					const {
						color = "rgba(0, 0, 0, 0.24)",
						blur = 1,
						offsetX = 0,
						offsetY = 2,
						offset: { x: ox = offsetX, y: oy = offsetY } = {}
					} = shadow;
					ctx.shadowColor = color;
					ctx.shadowBlur = blur;
					ctx.shadowOffsetX = ox;
					ctx.shadowOffsetY = oy;
				}
				fillRoundRect(ctx, ceil(left), ceil(top), ceil(width), ceil(height), radius);
			} finally {
				ctx.restore();
			}
		}

		//#endregion
		//#region src/js/tools.ts
		var tools_exports = {};
		__export(tools_exports, { canvashelper: () => canvashelper_exports });

		//#endregion
		//#region src/js/list-grid/layout-map/internal/utils.ts
		var import_defineProperty$10 = /* @__PURE__ */ __toESM(require_defineProperty());
		let seqId$2 = -1;
		function newEmptyHeaderData() {
			return {
				id: seqId$2--,
				define: {},
				headerType: of$1(null)
			};
		}
		function newEmptyColumnData() {
			return {
				id: seqId$2--,
				define: {},
				columnType: of$5(null),
				style: null
			};
		}
		var EmptyDataCache = class {
			constructor() {
				(0, import_defineProperty$10.default)(this, "headers", []);
				(0, import_defineProperty$10.default)(this, "columns", []);
			}
			getHeader(col, row) {
				const rows = this.headers[row] || (this.headers[row] = []);
				return rows[col] || (rows[col] = newEmptyHeaderData());
			}
			getBody(col, row) {
				const rows = this.columns[row] || (this.columns[row] = []);
				return rows[col] || (rows[col] = newEmptyColumnData());
			}
		};

		//#endregion
		//#region src/js/list-grid/layout-map/internal/simple-header-layout.ts
		var import_defineProperty$9 = /* @__PURE__ */ __toESM(require_defineProperty());
		let seqId$1 = 0;
		var SimpleHeaderLayoutMap = class {
			constructor(header) {
				(0, import_defineProperty$9.default)(this, "_headerObjects", void 0);
				(0, import_defineProperty$9.default)(this, "_headerObjectMap", void 0);
				(0, import_defineProperty$9.default)(this, "_headerCellIds", void 0);
				(0, import_defineProperty$9.default)(this, "_columns", void 0);
				(0, import_defineProperty$9.default)(this, "bodyRowCount", 1);
				(0, import_defineProperty$9.default)(this, "_emptyDataCache", new EmptyDataCache());
				this._columns = [];
				this._headerCellIds = [];
				this._headerObjects = this._addHeaders(0, header, []);
				this._headerObjectMap = this._headerObjects.reduce((o, e) => {
					o[e.id] = e;
					return o;
				}, {});
			}
			get columnWidths() {
				return this._columns;
			}
			get headerRowCount() {
				return this._headerCellIds.length;
			}
			get colCount() {
				return this._columns.length;
			}
			get headerObjects() {
				return this._headerObjects;
			}
			get columnObjects() {
				return this._columns;
			}
			getCellId(col, row) {
				if (this.headerRowCount <= row) return this._columns[col].id;
				return this._headerCellIds[row][col];
			}
			getHeader(col, row) {
				const id = this.getCellId(col, row);
				return this._headerObjectMap[id] || this._emptyDataCache.getHeader(col, row);
			}
			getBody(col, _row) {
				return this._columns[col] || this._emptyDataCache.getBody(col, 0);
			}
			getBodyLayoutRangeById(id) {
				for (let col = 0; col < this.colCount; col++)
					if (id === this._columns[col].id)
						return {
							start: {
								col,
								row: 0
							},
							end: {
								col,
								row: 0
							}
						};
				throw new Error(`can not found body layout @id=${id}`);
			}
			getCellRange(col, row) {
				const result = {
					start: {
						col,
						row
					},
					end: {
						col,
						row
					}
				};
				if (this.headerRowCount <= row) return result;
				const id = this.getCellId(col, row);
				for (let c = col - 1; c >= 0; c--) {
					if (id !== this.getCellId(c, row)) break;
					result.start.col = c;
				}
				for (let c = col + 1; c < this.colCount; c++) {
					if (id !== this.getCellId(c, row)) break;
					result.end.col = c;
				}
				for (let r = row - 1; r >= 0; r--) {
					if (id !== this.getCellId(col, r)) break;
					result.start.row = r;
				}
				for (let r = row + 1; r < this.headerRowCount; r++) {
					if (id !== this.getCellId(col, r)) break;
					result.end.row = r;
				}
				return result;
			}
			getRecordIndexByRow(row) {
				if (row < this.headerRowCount) return -1;
				else return row - this.headerRowCount;
			}
			getRecordStartRowByRecordIndex(index) {
				return this.headerRowCount + index;
			}
			_addHeaders(row, header, roots) {
				const results = [];
				const rowCells = this._headerCellIds[row] || this._newRow(row);
				header.forEach(hd => {
					const col = this._columns.length;
					const id = seqId$1++;
					const cell = {
						id,
						caption: hd.caption,
						field: hd.headerField || hd.field,
						headerIcon: hd.headerIcon,
						style: hd.headerStyle,
						headerType: ofCell(hd),
						action: ofCell$1(hd),
						define: hd
					};
					results[id] = cell;
					rowCells[col] = id;
					for (let r = row - 1; r >= 0; r--) this._headerCellIds[r][col] = roots[r];
					if (hd.columns)
						this._addHeaders(row + 1, hd.columns, [...roots, id]).forEach(c =>
							results.push(c)
						);
					else {
						const colDef = hd;
						this._columns.push({
							id: seqId$1++,
							field: colDef.field,
							width: colDef.width,
							minWidth: colDef.minWidth,
							maxWidth: colDef.maxWidth,
							icon: colDef.icon,
							message: colDef.message,
							columnType: of$5(colDef.columnType),
							action: of$4(colDef.action),
							style: colDef.style,
							define: colDef
						});
						for (let r = row + 1; r < this._headerCellIds.length; r++)
							this._headerCellIds[r][col] = id;
					}
				});
				return results;
			}
			_newRow(row) {
				const newRow = (this._headerCellIds[row] = []);
				if (!this._columns.length) return newRow;
				const prev = this._headerCellIds[row - 1];
				for (let col = 0; col < prev.length; col++) newRow[col] = prev[col];
				return newRow;
			}
		};

		//#endregion
		//#region src/js/list-grid/layout-map/internal/multi-layout.ts
		var import_defineProperty$8 = /* @__PURE__ */ __toESM(require_defineProperty());
		function normalizeLayout(layout) {
			if (Array.isArray(layout))
				return {
					header: layout,
					body: layout
				};
			return layout;
		}
		let seqId = 0;
		var LayoutObjectGrid = class {
			constructor(layout, transform$1) {
				(0, import_defineProperty$8.default)(this, "objects", []);
				(0, import_defineProperty$8.default)(this, "objectGrid", []);
				(0, import_defineProperty$8.default)(this, "objectMap", {});
				(0, import_defineProperty$8.default)(this, "columnCount", 0);
				(0, import_defineProperty$8.default)(this, "columnWidths", []);
				layout.forEach((rowLayout, row) => {
					let col = 0;
					rowLayout.forEach(cell => {
						var _cell$rowSpan, _cell$colSpan;
						const id = seqId++;
						const obj$1 = transform$1(cell, id);
						this.objects.push(obj$1);
						this.objectMap[id] = obj$1;
						col = this._findStartCell(col, row);
						const rowSpan = Number(
							(_cell$rowSpan = cell.rowSpan) !== null && _cell$rowSpan !== void 0
								? _cell$rowSpan
								: 1
						);
						const colSpan = Number(
							(_cell$colSpan = cell.colSpan) !== null && _cell$colSpan !== void 0
								? _cell$colSpan
								: 1
						);
						const endRow = row + rowSpan;
						const endCol = col + colSpan;
						for (let rowIndex = row; rowIndex < endRow; rowIndex++) {
							const objectGridRow = this._getObjectGridRow(rowIndex);
							for (let colIndex = col; colIndex < endCol; colIndex++)
								objectGridRow[colIndex] = obj$1;
						}
						if (colSpan === 1) this._setWidthDataIfAbsent(col, cell);
						this._useColumnIndex(endCol - 1);
						col = endCol;
					});
				});
			}
			get rowCount() {
				return this.objectGrid.length;
			}
			_findStartCell(col, row) {
				const objectGridRow = this._getObjectGridRow(row);
				for (let index = col; index < objectGridRow.length; index++)
					if (!objectGridRow[index]) return index;
				return objectGridRow.length;
			}
			_getObjectGridRow(row) {
				return this.objectGrid[row] || (this.objectGrid[row] = []);
			}
			_useColumnIndex(col) {
				if (this.columnCount > col) return;
				this.columnCount = col + 1;
			}
			_setWidthDataIfAbsent(col, cell) {
				if (!this.columnWidths[col]) {
					if (cell.width != null || cell.maxWidth != null || cell.minWidth != null)
						this.columnWidths[col] = {
							width: cell.width,
							maxWidth: cell.maxWidth,
							minWidth: cell.minWidth
						};
				}
			}
		};
		var MultiLayoutMap = class {
			constructor(layout) {
				(0, import_defineProperty$8.default)(this, "_header", void 0);
				(0, import_defineProperty$8.default)(this, "_body", void 0);
				(0, import_defineProperty$8.default)(this, "_columnWidths", []);
				(0, import_defineProperty$8.default)(this, "_columnCount", void 0);
				(0, import_defineProperty$8.default)(this, "_emptyDataCache", new EmptyDataCache());
				const hbLayouut = normalizeLayout(layout);
				const header = (this._header = new LayoutObjectGrid(hbLayouut.header, (hd, id) => {
					return {
						id,
						caption: hd.caption,
						field: hd.headerField || hd.field,
						headerIcon: hd.headerIcon,
						style: hd.headerStyle,
						headerType: ofCell(hd),
						action: ofCell$1(hd),
						define: hd
					};
				}));
				const body = (this._body = new LayoutObjectGrid(hbLayouut.body, (colDef, id) => {
					return {
						id,
						field: colDef.field,
						width: colDef.width,
						minWidth: colDef.minWidth,
						maxWidth: colDef.maxWidth,
						icon: colDef.icon,
						message: colDef.message,
						columnType: of$5(colDef.columnType),
						action: of$4(colDef.action),
						style: colDef.style,
						define: colDef
					};
				}));
				const columnCount = (this._columnCount = Math.max(
					header.columnCount,
					body.columnCount
				));
				for (let col = 0; col < columnCount; col++) {
					const widthDef = header.columnWidths[col] || body.columnWidths[col] || {};
					this._columnWidths[col] = widthDef;
				}
			}
			get columnWidths() {
				return this._columnWidths;
			}
			get headerRowCount() {
				return this._header.rowCount;
			}
			get bodyRowCount() {
				return this._body.rowCount;
			}
			get colCount() {
				return this._columnCount;
			}
			get headerObjects() {
				return this._header.objects;
			}
			get columnObjects() {
				return this._body.objects;
			}
			getCellId(col, row) {
				var _this$_header$objectG;
				if (this.headerRowCount <= row) {
					var _this$_body$objectGri;
					const bodyRow = row - this.headerRowCount;
					const bodyLayoutRow = bodyRow % this.bodyRowCount;
					return (_this$_body$objectGri = this._body.objectGrid[bodyLayoutRow]) ===
						null ||
						_this$_body$objectGri === void 0 ||
						(_this$_body$objectGri = _this$_body$objectGri[col]) === null ||
						_this$_body$objectGri === void 0
						? void 0
						: _this$_body$objectGri.id;
				}
				return (_this$_header$objectG = this._header.objectGrid[row]) === null ||
					_this$_header$objectG === void 0 ||
					(_this$_header$objectG = _this$_header$objectG[col]) === null ||
					_this$_header$objectG === void 0
					? void 0
					: _this$_header$objectG.id;
			}
			getHeader(col, row) {
				const id = this.getCellId(col, row);
				return this._header.objectMap[id] || this._emptyDataCache.getHeader(col, row);
			}
			getBody(col, row) {
				const id = this.getCellId(col, row);
				return this._body.objectMap[id] || this._emptyDataCache.getBody(col, row);
			}
			getBodyLayoutRangeById(id) {
				for (let row = 0; row < this.bodyRowCount; row++) {
					const objectGridRow = this._body.objectGrid[row];
					if (!objectGridRow) continue;
					for (let col = 0; col < this.colCount; col++) {
						var _objectGridRow$col;
						if (
							id ===
							((_objectGridRow$col = objectGridRow[col]) === null ||
							_objectGridRow$col === void 0
								? void 0
								: _objectGridRow$col.id)
						)
							return this._getCellRange(this._body, col, row, 0);
					}
				}
				throw new Error(`can not found body layout @id=${id}`);
			}
			getCellRange(col, row) {
				if (this.headerRowCount <= row) {
					const recordIndex = this.getRecordIndexByRow(row);
					const startRow = this.getRecordStartRowByRecordIndex(recordIndex);
					const bodyRow = row - this.headerRowCount;
					const bodyLayoutRow = bodyRow % this.bodyRowCount;
					return this._getCellRange(this._body, col, bodyLayoutRow, startRow);
				}
				return this._getCellRange(this._header, col, row, 0);
			}
			getRecordIndexByRow(row) {
				if (row < this.headerRowCount) return -1;
				else {
					const bodyRow = row - this.headerRowCount;
					return Math.floor(bodyRow / this.bodyRowCount);
				}
			}
			getRecordStartRowByRecordIndex(index) {
				return this.headerRowCount + index * this.bodyRowCount;
			}
			_getCellRange(layout, col, layoutRow, offsetRow) {
				var _objectGrid$layoutRow;
				const result = {
					start: {
						col,
						row: layoutRow + offsetRow
					},
					end: {
						col,
						row: layoutRow + offsetRow
					}
				};
				const { objectGrid } = layout;
				const id =
					(_objectGrid$layoutRow = objectGrid[layoutRow]) === null ||
					_objectGrid$layoutRow === void 0 ||
					(_objectGrid$layoutRow = _objectGrid$layoutRow[col]) === null ||
					_objectGrid$layoutRow === void 0
						? void 0
						: _objectGrid$layoutRow.id;
				if (id == null) return result;
				for (let c = col - 1; c >= 0; c--) {
					var _objectGrid$layoutRow2;
					if (
						id !==
						((_objectGrid$layoutRow2 = objectGrid[layoutRow]) === null ||
						_objectGrid$layoutRow2 === void 0 ||
						(_objectGrid$layoutRow2 = _objectGrid$layoutRow2[c]) === null ||
						_objectGrid$layoutRow2 === void 0
							? void 0
							: _objectGrid$layoutRow2.id)
					)
						break;
					result.start.col = c;
				}
				for (let c = col + 1; c < layout.columnCount; c++) {
					var _objectGrid$layoutRow3;
					if (
						id !==
						((_objectGrid$layoutRow3 = objectGrid[layoutRow]) === null ||
						_objectGrid$layoutRow3 === void 0 ||
						(_objectGrid$layoutRow3 = _objectGrid$layoutRow3[c]) === null ||
						_objectGrid$layoutRow3 === void 0
							? void 0
							: _objectGrid$layoutRow3.id)
					)
						break;
					result.end.col = c;
				}
				for (let r = layoutRow - 1; r >= 0; r--) {
					var _objectGrid$r;
					if (
						id !==
						((_objectGrid$r = objectGrid[r]) === null ||
						_objectGrid$r === void 0 ||
						(_objectGrid$r = _objectGrid$r[col]) === null ||
						_objectGrid$r === void 0
							? void 0
							: _objectGrid$r.id)
					)
						break;
					result.start.row = r + offsetRow;
				}
				for (let r = layoutRow + 1; r < layout.rowCount; r++) {
					var _objectGrid$r2;
					if (
						id !==
						((_objectGrid$r2 = objectGrid[r]) === null ||
						_objectGrid$r2 === void 0 ||
						(_objectGrid$r2 = _objectGrid$r2[col]) === null ||
						_objectGrid$r2 === void 0
							? void 0
							: _objectGrid$r2.id)
					)
						break;
					result.end.row = r + offsetRow;
				}
				return result;
			}
		};

		//#endregion
		//#region src/js/columns/message/messageUtils.ts
		function drawExclamationMarkBox(context, style$1, helper) {
			const { bgColor, color, boxWidth, markHeight } = style$1;
			const ctx = context.getContext();
			const rect = context.getRect();
			ctx.fillStyle = bgColor;
			const boxRect = rect.copy();
			boxRect.left = boxRect.right - (Number(boxWidth) || 24);
			ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
			const fillColor = color;
			const height = Number(markHeight) || 20;
			const width = height / 5;
			const left = boxRect.left + (boxRect.width - width) / 2;
			const top = boxRect.top + (boxRect.height - height) / 2;
			helper.fillRectWithState(new Rect(left, top, width, (height / 5) * 3), context, {
				fillColor
			});
			helper.fillRectWithState(
				new Rect(left, top + (height / 5) * 4, width, height / 5),
				context,
				{ fillColor }
			);
		}
		function drawInformationMarkBox(context, style$1, helper) {
			const { bgColor, color, boxWidth, markHeight } = style$1;
			const ctx = context.getContext();
			const rect = context.getRect();
			ctx.fillStyle = bgColor;
			const boxRect = rect.copy();
			boxRect.left = boxRect.right - (Number(boxWidth) || 24);
			ctx.fillRect(boxRect.left, boxRect.top, boxRect.width, boxRect.height - 1);
			const fillColor = color;
			const height = Number(markHeight) || 20;
			const width = height / 5;
			const left = boxRect.left + (boxRect.width - width) / 2;
			const top = boxRect.top + (boxRect.height - height) / 2;
			helper.fillRectWithState(new Rect(left, top, width, height / 5), context, {
				fillColor
			});
			helper.fillRectWithState(
				new Rect(left, top + (height / 5) * 2, width, (height / 5) * 3),
				context,
				{ fillColor }
			);
		}

		//#endregion
		//#region src/js/columns/message/BaseMessage.ts
		var import_defineProperty$7 = /* @__PURE__ */ __toESM(require_defineProperty());
		var BaseMessage = class {
			constructor(grid) {
				(0, import_defineProperty$7.default)(this, "_grid", void 0);
				(0, import_defineProperty$7.default)(this, "_messageElement", null);
				this._grid = grid;
			}
			dispose() {
				this.detachMessageElement();
				if (this._messageElement) this._messageElement.dispose();
				this._messageElement = null;
			}
			_getMessageElement() {
				return (
					this._messageElement ||
					(this._messageElement = this.createMessageElementInternal())
				);
			}
			attachMessageElement(col, row, message) {
				const messageElement = this._getMessageElement();
				messageElement.attach(this._grid, col, row, message);
			}
			moveMessageElement(col, row) {
				const messageElement = this._getMessageElement();
				messageElement.move(this._grid, col, row);
			}
			detachMessageElement() {
				const messageElement = this._getMessageElement();
				messageElement._detach();
			}
			drawCellMessage(message, context, style$1, helper, grid, info) {
				this.drawCellMessageInternal(message, context, style$1, helper, grid, info);
			}
		};

		//#endregion
		//#region src/js/columns/message/internal/MessageElement.ts
		var import_defineProperty$6 = /* @__PURE__ */ __toESM(require_defineProperty());
		const CLASSNAME$3 = "cheetah-grid__message-element";
		const MESSAGE_CLASSNAME$2 = `${CLASSNAME$3}__message`;
		const HIDDEN_CLASSNAME$1 = `${CLASSNAME$3}--hidden`;
		const SHOWN_CLASSNAME$1 = `${CLASSNAME$3}--shown`;
		const CSS_PROP_NAME_PREFIX$1 = "--cheetah-grid-message-element-";
		const CELL_TOP_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}cell-top`;
		const CELL_BOTTOM_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}cell-bottom`;
		const CELL_LEFT_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}cell-left`;
		const CELL_RIGHT_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}cell-right`;
		const ELEMENT_WIDTH_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}width`;
		const ELEMENT_HEIGHT_CSS_PROP_NAME$1 = `${CSS_PROP_NAME_PREFIX$1}height`;
		const LEFT_DIFF_CSS_PROP_NAME = "--cheetah-grid-message-element-left-diff";
		function createMessageDomElement() {
			const rootElement = createElement("div", {
				classList: [CLASSNAME$3, HIDDEN_CLASSNAME$1]
			});
			const messageElement = createElement("span", { classList: [MESSAGE_CLASSNAME$2] });
			rootElement.appendChild(messageElement);
			return rootElement;
		}
		var MessageElement = class {
			constructor() {
				(0, import_defineProperty$6.default)(this, "_handler", void 0);
				(0, import_defineProperty$6.default)(this, "_rootElement", void 0);
				(0, import_defineProperty$6.default)(this, "_messageElement", void 0);
				this._handler = new EventHandler();
				const rootElement = (this._rootElement = createMessageDomElement());
				this._messageElement = rootElement.querySelector(`.${MESSAGE_CLASSNAME$2}`);
				rootElement.popover = "manual";
			}
			dispose() {
				this.detach();
				this._handler.dispose();
				delete this._rootElement;
				delete this._messageElement;
			}
			attach(grid, col, row, message) {
				const rootElement = this._rootElement;
				const messageElement = this._messageElement;
				rootElement.classList.remove(SHOWN_CLASSNAME$1);
				rootElement.classList.add(HIDDEN_CLASSNAME$1);
				rootElement.hidePopover();
				messageElement.textContent = message.message;
				if (this._attachCell(grid, col, row)) this._adjustStyle(grid, col, row);
				else this._detach();
			}
			move(grid, col, row) {
				if (!this._attachCell(grid, col, row)) this._detach();
			}
			detach() {
				this._detach();
			}
			_detach() {
				const rootElement = this._rootElement;
				if (rootElement.parentElement) {
					rootElement.parentElement.removeChild(rootElement);
					rootElement.classList.remove(SHOWN_CLASSNAME$1);
					rootElement.classList.add(HIDDEN_CLASSNAME$1);
				}
				rootElement.hidePopover();
			}
			_attachCell(grid, col, row) {
				const rootElement = this._rootElement;
				const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
				const { frozenRowCount, frozenColCount } = grid;
				if (row >= frozenRowCount && frozenRowCount > 0) {
					const { rect: frozenRect } = grid.getAttachCellsArea(
						grid.getCellRange(col, frozenRowCount - 1)
					);
					if (rect.bottom < frozenRect.bottom) return false;
				} else if (rect.bottom < 0) return false;
				if (col >= frozenColCount && frozenColCount > 0) {
					const { rect: frozenRect } = grid.getAttachCellsArea(
						grid.getCellRange(frozenColCount - 1, row)
					);
					if (rect.left < frozenRect.right) return false;
				} else if (rect.left < 0) return false;
				const {
					height: offsetHeight,
					width: offsetWidth,
					left: elementLeft,
					top: elementTop
				} = element.getBoundingClientRect();
				if (offsetHeight < rect.bottom) return false;
				if (offsetWidth < rect.left) return false;
				rootElement.style.setProperty(
					CELL_TOP_CSS_PROP_NAME$1,
					`${(elementTop + rect.top).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_BOTTOM_CSS_PROP_NAME$1,
					`${(elementTop + rect.bottom).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_LEFT_CSS_PROP_NAME$1,
					`${(elementLeft + rect.left).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_RIGHT_CSS_PROP_NAME$1,
					`${(elementLeft + rect.right).toFixed()}px`
				);
				if (rootElement.parentElement !== element) element.appendChild(rootElement);
				const rootElementRect = rootElement.getBoundingClientRect();
				rootElement.style.setProperty(
					ELEMENT_WIDTH_CSS_PROP_NAME$1,
					`${rootElementRect.width.toFixed()}px`
				);
				rootElement.style.setProperty(
					ELEMENT_HEIGHT_CSS_PROP_NAME$1,
					`${rootElementRect.height.toFixed()}px`
				);
				rootElement.classList.add(SHOWN_CLASSNAME$1);
				rootElement.classList.remove(HIDDEN_CLASSNAME$1);
				return true;
			}
			/**
			 * If the message is placed outside the Grid, adjust its position.
			 */
			_adjustStyle(grid, col, row) {
				const rootElement = this._rootElement;
				const element = grid.getElement();
				const messageRect = rootElement.getBoundingClientRect();
				const elementRect = element.getBoundingClientRect();
				let messageLeft = messageRect.left;
				if (elementRect.right < messageRect.right) {
					const overflow = messageRect.right - elementRect.right;
					messageLeft -= overflow;
				}
				if (messageLeft < elementRect.left) messageLeft = elementRect.left;
				if (messageLeft !== messageRect.left) {
					const diff = messageRect.left - messageLeft;
					const { rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
					rootElement.style.left = `${(rect.left - diff).toFixed()}px`;
					const diffCss = `${diff.toFixed()}px`;
					rootElement.style.setProperty(LEFT_DIFF_CSS_PROP_NAME, diffCss);
				} else rootElement.style.removeProperty(LEFT_DIFF_CSS_PROP_NAME);
			}
		};

		//#endregion
		//#region src/js/columns/message/internal/ErrorMessageElement.ts
		const CLASSNAME$2 = "cheetah-grid__error-message-element";
		const MESSAGE_CLASSNAME$1 = `${CLASSNAME$2}__message`;
		var ErrorMessageElement = class extends MessageElement {
			constructor() {
				super();
				this._rootElement.classList.add(CLASSNAME$2);
				this._messageElement.classList.add(MESSAGE_CLASSNAME$1);
			}
		};

		//#endregion
		//#region src/js/columns/message/ErrorMessage.ts
		const RED_A100 = "#ff8a80";
		var ErrorMessage = class extends BaseMessage {
			createMessageElementInternal() {
				return new ErrorMessageElement();
			}
			drawCellMessageInternal(_message, context, style$1, helper, grid, _info) {
				const { bgColor } = style$1;
				const { select } = context.getSelection();
				if (
					!cellInRange(
						grid.getCellRange(context.col, context.row),
						select.col,
						select.row
					) ||
					!grid.hasFocusGrid()
				)
					helper.drawBorderWithClip(context, ctx => {
						drawExclamationMarkBox(
							context,
							{
								bgColor:
									helper.getColor(
										helper.theme.messages.errorBgColor,
										context.col,
										context.row,
										ctx
									) || RED_A100,
								color: bgColor,
								boxWidth: helper.theme.messages.boxWidth,
								markHeight: helper.theme.messages.markHeight
							},
							helper
						);
					});
			}
		};

		//#endregion
		//#region src/js/columns/message/InfoMessage.ts
		const GREY_L2 = "#e0e0e0";
		var InfoMessage = class extends BaseMessage {
			createMessageElementInternal() {
				return new MessageElement();
			}
			drawCellMessageInternal(_message, context, style$1, helper, grid, _info) {
				const { bgColor } = style$1;
				const { select } = context.getSelection();
				if (
					!cellInRange(
						grid.getCellRange(context.col, context.row),
						select.col,
						select.row
					) ||
					!grid.hasFocusGrid()
				)
					helper.drawBorderWithClip(context, ctx => {
						drawInformationMarkBox(
							context,
							{
								bgColor:
									helper.getColor(
										helper.theme.messages.infoBgColor,
										context.col,
										context.row,
										ctx
									) || GREY_L2,
								color: bgColor,
								boxWidth: helper.theme.messages.boxWidth,
								markHeight: helper.theme.messages.markHeight
							},
							helper
						);
					});
			}
		};

		//#endregion
		//#region src/js/list-grid/LG_EVENT_TYPE.ts
		const LG_EVENT_TYPE = extend(DG_EVENT_TYPE, {
			BEFORE_CHANGE_VALUE: "before_change_value",
			CHANGED_VALUE: "changed_value",
			CHANGED_HEADER_VALUE: "changed_header_value",
			REJECTED_PASTE_VALUES: "rejected_paste_values"
		});

		//#endregion
		//#region src/js/columns/message/internal/WarningMessageElement.ts
		const CLASSNAME$1 = "cheetah-grid__warning-message-element";
		const MESSAGE_CLASSNAME = `${CLASSNAME$1}__message`;
		var WarningMessageElement = class extends MessageElement {
			constructor() {
				super();
				this._rootElement.classList.add(CLASSNAME$1);
				this._messageElement.classList.add(MESSAGE_CLASSNAME);
			}
		};

		//#endregion
		//#region src/js/columns/message/WarningMessage.ts
		const DEEP_ORANGE_A100 = "#ff9e80";
		var WarningMessage = class extends BaseMessage {
			createMessageElementInternal() {
				return new WarningMessageElement();
			}
			drawCellMessageInternal(_message, context, style$1, helper, grid, _info) {
				const { bgColor } = style$1;
				const { select } = context.getSelection();
				if (
					!cellInRange(
						grid.getCellRange(context.col, context.row),
						select.col,
						select.row
					) ||
					!grid.hasFocusGrid()
				)
					helper.drawBorderWithClip(context, ctx => {
						drawExclamationMarkBox(
							context,
							{
								bgColor:
									helper.getColor(
										helper.theme.messages.warnBgColor,
										context.col,
										context.row,
										ctx
									) || DEEP_ORANGE_A100,
								color: bgColor,
								boxWidth: helper.theme.messages.boxWidth,
								markHeight: helper.theme.messages.markHeight
							},
							helper
						);
					});
			}
		};

		//#endregion
		//#region src/js/columns/message/MessageHandler.ts
		var import_defineProperty$5 = /* @__PURE__ */ __toESM(require_defineProperty());
		const EMPTY_MESSAGE = {
			type: "error",
			message: null
		};
		const MESSAGE_INSTANCE_FACTORY = {
			error(grid) {
				return new ErrorMessage(grid);
			},
			info(grid) {
				return new InfoMessage(grid);
			},
			warning(grid) {
				return new WarningMessage(grid);
			}
		};
		function normalizeMessage(message) {
			if (!message || isPromise(message)) return EMPTY_MESSAGE;
			if (typeof message === "string")
				return {
					type: "error",
					message,
					original: message
				};
			const type = message.type || "error";
			if (type && type in MESSAGE_INSTANCE_FACTORY)
				return {
					type: type.toLowerCase(),
					message: message.message,
					original: message
				};
			return {
				type: "error",
				message: `${message}`,
				original: message
			};
		}
		function hasMessage(message) {
			return !!normalizeMessage(message).message;
		}
		var MessageHandler = class {
			constructor(grid, getMessage) {
				(0, import_defineProperty$5.default)(this, "_grid", void 0);
				(0, import_defineProperty$5.default)(this, "_messageInstances", void 0);
				(0, import_defineProperty$5.default)(this, "_attachInfo", null);
				this._grid = grid;
				this._messageInstances = {};
				this._bindGridEvent(grid, getMessage);
			}
			dispose() {
				const messageInstances = this._messageInstances;
				for (const k in messageInstances) {
					var _messageInstances;
					(_messageInstances = messageInstances[k]) === null ||
						_messageInstances === void 0 ||
						_messageInstances.dispose();
				}
				delete this._messageInstances;
				delete this._attachInfo;
			}
			drawCellMessage(message, context, style$1, helper, grid, info) {
				if (!hasMessage(message)) return;
				const instance = this._getMessageInstanceOfMessage(message);
				instance.drawCellMessage(
					normalizeMessage(message),
					context,
					style$1,
					helper,
					grid,
					info
				);
			}
			_attach(col, row, message) {
				const info = this._attachInfo;
				const instance = this._getMessageInstanceOfMessage(message);
				if (info && info.instance !== instance) info.instance.detachMessageElement();
				instance.attachMessageElement(col, row, normalizeMessage(message));
				this._attachInfo = {
					col,
					row,
					instance
				};
			}
			_move(col, row) {
				const info = this._attachInfo;
				if (!info || info.col !== col || info.row !== row) return;
				const { instance } = info;
				instance.moveMessageElement(col, row);
			}
			_detach() {
				const info = this._attachInfo;
				if (!info) return;
				const { instance } = info;
				instance.detachMessageElement();
				this._attachInfo = null;
			}
			_bindGridEvent(grid, getMessage) {
				const onSelectMessage = sel => {
					const setMessageData = msg => {
						if (!hasMessage(msg)) this._detach();
						else this._attach(sel.col, sel.row, msg);
					};
					const message = getMessage(sel.col, sel.row);
					if (isPromise(message)) {
						this._detach();
						message.then(msg => {
							const newSel = grid.selection.select;
							if (newSel.col !== sel.col || newSel.row !== sel.row) return;
							setMessageData(msg);
						});
						return;
					}
					setMessageData(message);
				};
				grid.listen(LG_EVENT_TYPE.SELECTED_CELL, e => {
					if (!e.selected) return;
					if (e.before.col === e.col && e.before.row === e.row) return;
					onSelectMessage(e);
				});
				grid.listen(LG_EVENT_TYPE.SCROLL, () => {
					const sel = grid.selection.select;
					this._move(sel.col, sel.row);
				});
				grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, e => {
					if (!grid.hasFocusGrid()) return;
					const sel = grid.selection.select;
					if (sel.col !== e.col || sel.row !== e.row) return;
					onSelectMessage(e);
				});
				grid.listen(LG_EVENT_TYPE.FOCUS_GRID, _e => {
					const sel = grid.selection.select;
					onSelectMessage(sel);
				});
				grid.listen(LG_EVENT_TYPE.BLUR_GRID, _e => {
					this._detach();
				});
			}
			_getMessageInstanceOfMessage(message) {
				const messageInstances = this._messageInstances;
				const { type } = normalizeMessage(message);
				return (
					messageInstances[type] ||
					(messageInstances[type] = MESSAGE_INSTANCE_FACTORY[type](this._grid))
				);
			}
		};

		//#endregion
		//#region src/js/internal/color.ts
		var color_exports = {};
		__export(color_exports, { colorToRGB: () => colorToRGB });
		const rgbMap = {};
		function styleColorToRGB(color) {
			const dummy = document.createElement("div");
			const { style: style$1 } = dummy;
			style$1.color = color;
			style$1.position = "fixed";
			style$1.height = "1px";
			style$1.width = "1px";
			style$1.opacity = "0";
			document.body.appendChild(dummy);
			const { color: styleColor } = (document.defaultView || window).getComputedStyle(
				dummy,
				""
			);
			document.body.removeChild(dummy);
			return colorToRGB0(styleColor || "");
		}
		function hexToNum(hex) {
			return parseInt(hex, 16);
		}
		function createRGB(r, g, b, a = 1) {
			return {
				r,
				g,
				b,
				a
			};
		}
		function tripleHexToRGB({ 1: r, 2: g, 3: b }) {
			return createRGB(hexToNum(r + r), hexToNum(g + g), hexToNum(b + b));
		}
		function sextupleHexToRGB({ 1: r1, 2: r2, 3: g1, 4: g2, 5: b1, 6: b2 }) {
			return createRGB(hexToNum(r1 + r2), hexToNum(g1 + g2), hexToNum(b1 + b2));
		}
		function testRGB({ r, g, b, a }) {
			return (
				0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255 && 0 <= a && a <= 1
			);
		}
		function rateToByte(r) {
			return Math.ceil((r * 255) / 100);
		}
		const numberPattern = /((?:\+|-)?(?:\d+(?:\.\d+)?|\.\d+))/.source;
		const percentPattern = `${numberPattern}%`;
		const maybePercentPattern = `${numberPattern}(%?)`;
		function buildRgbWithCommaRegExp(bytePattern) {
			return new RegExp(
				`^rgba?\\(\\s*${bytePattern}\\s*,\\s*${bytePattern}\\s*,\\s*${bytePattern}\\s*\\)$`,
				"i"
			);
		}
		function buildRgbLv4RegExp(bytePattern) {
			return new RegExp(
				`^rgba?\\(\\s*${bytePattern}\\s+${bytePattern}\\s+${bytePattern}\\s*\\)$`,
				"i"
			);
		}
		function buildRgbaWithCommaRegExp(bytePattern, alphaPattern) {
			return new RegExp(
				`^rgba?\\(\\s*${bytePattern}\\s*,\\s*${bytePattern}\\s*,\\s*${bytePattern}\\s*,\\s*${alphaPattern}\\s*\\)$`,
				"i"
			);
		}
		function buildRgbaLv4RegExp(bytePattern, alphaPattern) {
			return new RegExp(
				`^rgba?\\(\\s*${bytePattern}\\s+${bytePattern}\\s+${bytePattern}\\s*/\\s*${alphaPattern}\\s*\\)$`,
				"i"
			);
		}
		function colorToRGB0(color) {
			if (/^#[0-9a-f]{3}$/i.exec(color)) return tripleHexToRGB(color);
			if (/^#[0-9a-f]{6}$/i.exec(color)) return sextupleHexToRGB(color);
			let ret =
				buildRgbWithCommaRegExp(numberPattern).exec(color) ||
				buildRgbLv4RegExp(numberPattern).exec(color);
			if (ret) {
				const rgb = createRGB(Number(ret[1]), Number(ret[2]), Number(ret[3]));
				if (testRGB(rgb)) return rgb;
			}
			ret =
				buildRgbWithCommaRegExp(percentPattern).exec(color) ||
				buildRgbLv4RegExp(percentPattern).exec(color);
			if (ret) {
				const rgb = createRGB(
					rateToByte(Number(ret[1])),
					rateToByte(Number(ret[2])),
					rateToByte(Number(ret[3]))
				);
				if (testRGB(rgb)) return rgb;
			}
			ret =
				buildRgbaWithCommaRegExp(numberPattern, maybePercentPattern).exec(color) ||
				buildRgbaLv4RegExp(numberPattern, maybePercentPattern).exec(color);
			if (ret) {
				const rgb = createRGB(
					Number(ret[1]),
					Number(ret[2]),
					Number(ret[3]),
					Number(ret[4]) / (ret[5] ? 100 : 1)
				);
				if (testRGB(rgb)) return rgb;
			}
			ret =
				buildRgbaWithCommaRegExp(percentPattern, maybePercentPattern).exec(color) ||
				buildRgbaLv4RegExp(percentPattern, maybePercentPattern).exec(color);
			if (ret) {
				const rgb = createRGB(
					rateToByte(Number(ret[1])),
					rateToByte(Number(ret[2])),
					rateToByte(Number(ret[3])),
					Number(ret[4]) / (ret[5] ? 100 : 1)
				);
				if (testRGB(rgb)) return rgb;
			}
			return null;
		}
		function colorToRGB(color) {
			if (typeof color !== "string") return createRGB(0, 0, 0, 0);
			color = color.toLowerCase().trim();
			if (rgbMap[color]) return rgbMap[color];
			return colorToRGB0(color) || (rgbMap[color] = styleColorToRGB(color));
		}

		//#endregion
		//#region src/js/GridCanvasHelper.ts
		var import_defineProperty$4 = /* @__PURE__ */ __toESM(require_defineProperty());
		const { toBoxArray } = style;
		const INLINE_ELLIPSIS = of$6("…");
		const TEXT_OFFSET = 2;
		const CHECKBOX_OFFSET = TEXT_OFFSET + 1;
		function invalidateCell(context, grid) {
			const { col, row } = context;
			grid.invalidateCell(col, row);
		}
		function getStyleProperty(color, col, row, grid, context) {
			return getOrApply(color, {
				col,
				row,
				grid,
				context
			});
		}
		function getFont(font, col, row, grid, context) {
			if (font == null) return void 0;
			return getOrApply(font, {
				col,
				row,
				grid,
				context
			});
		}
		function getThemeValue(grid, ...names) {
			const gridThemeValue = getChainSafe(grid.theme, ...names);
			if (gridThemeValue == null) return getChainSafe(getDefault(), ...names);
			if (typeof gridThemeValue !== "function") return gridThemeValue;
			let defaultThemeValue;
			return args => {
				const value = gridThemeValue(args);
				if (value != null) return value;
				defaultThemeValue = defaultThemeValue || getChainSafe(getDefault(), ...names);
				return getOrApply(defaultThemeValue, args);
			};
		}
		function testFontLoad(font, value, context, grid) {
			if (font) {
				if (!check(font, value)) {
					load(font, value, () => invalidateCell(context, grid));
					return false;
				}
			}
			return true;
		}
		function drawInlines(ctx, inlines, rect, offset, offsetTop, offsetBottom, col, row, grid) {
			function drawInline(inline, offsetLeft, offsetRight) {
				if (inline.canDraw()) {
					ctx.save();
					try {
						ctx.fillStyle = getStyleProperty(
							inline.color() || ctx.fillStyle,
							col,
							row,
							grid,
							ctx
						);
						ctx.font = inline.font() || ctx.font;
						inline.draw({
							ctx,
							canvashelper: canvashelper_exports,
							rect,
							offset,
							offsetLeft,
							offsetRight,
							offsetTop,
							offsetBottom
						});
					} finally {
						ctx.restore();
					}
				} else inline.onReady(() => grid.invalidateCell(col, row));
			}
			if (inlines.length === 1) {
				const inline = inlines[0];
				drawInline(inline, 0, 0);
			} else {
				const inlineWidths = inlines.map(inline => (inline.width({ ctx }) || 0) - 0);
				let offsetRight = inlineWidths.reduce((a, b) => a + b);
				let offsetLeft = 0;
				inlines.forEach((inline, index) => {
					const inlineWidth = inlineWidths[index];
					offsetRight -= inlineWidth;
					drawInline(inline, offsetLeft, offsetRight);
					offsetLeft += inlineWidth;
				});
			}
		}
		function buildInlines(icons$2, inline) {
			return buildInlines$1(icons$2, inline || "");
		}
		function inlineToString(inline) {
			return string(inline);
		}
		function getOverflowInline(textOverflow) {
			if (!isAllowOverflow(textOverflow) || textOverflow === "ellipsis")
				return INLINE_ELLIPSIS;
			textOverflow = textOverflow.trim();
			if (textOverflow.length === 1) return of$6(textOverflow[0]);
			return INLINE_ELLIPSIS;
		}
		function isAllowOverflow(textOverflow) {
			return Boolean(
				textOverflow && textOverflow !== "clip" && typeof textOverflow === "string"
			);
		}
		function getOverflowInlinesIndex(ctx, inlines, width) {
			const maxWidth = width - 3;
			let lineWidth = 0;
			for (let i = 0; i < inlines.length; i++) {
				const inline = inlines[i];
				const inlineWidth = (inline.width({ ctx }) || 0) - 0;
				if (lineWidth + inlineWidth > maxWidth)
					return {
						index: i,
						lineWidth,
						remWidth: maxWidth - lineWidth
					};
				lineWidth += inlineWidth;
			}
			return null;
		}
		function isOverflowInlines(ctx, inlines, width) {
			return !!getOverflowInlinesIndex(ctx, inlines, width);
		}
		function breakWidthInlines(ctx, inlines, width) {
			const indexData = getOverflowInlinesIndex(ctx, inlines, width);
			if (!indexData)
				return {
					beforeInlines: inlines,
					overflow: false,
					afterInlines: []
				};
			const { index, remWidth } = indexData;
			const inline = inlines[index];
			const beforeInlines = inlines.slice(0, index);
			const afterInlines = [];
			if (inline.canBreak()) {
				let { before, after } = inline.breakWord(ctx, remWidth);
				if (!before && !beforeInlines.length)
					({ before, after } = inline.breakAll(ctx, remWidth));
				if (!before && !beforeInlines.length) ({ before, after } = inline.splitIndex(1));
				if (before) beforeInlines.push(before);
				if (after) afterInlines.push(after);
				afterInlines.push(...inlines.slice(index + 1));
			} else {
				if (!beforeInlines.length) beforeInlines.push(inline);
				afterInlines.push(...inlines.slice(beforeInlines.length));
			}
			return {
				beforeInlines,
				overflow: true,
				afterInlines
			};
		}
		function truncateInlines(ctx, inlines, width, option) {
			const indexData = getOverflowInlinesIndex(ctx, inlines, width);
			if (!indexData)
				return {
					inlines,
					overflow: false
				};
			const { index, lineWidth } = indexData;
			const inline = inlines[index];
			const overflowInline = getOverflowInline(option);
			const ellipsisWidth = overflowInline.width({ ctx });
			const remWidth = width - lineWidth - ellipsisWidth;
			const result = inlines.slice(0, index);
			if (inline.canBreak()) {
				const { before } = inline.breakAll(ctx, remWidth);
				if (before) result.push(before);
			}
			result.push(overflowInline);
			return {
				inlines: result,
				overflow: true
			};
		}
		function _inlineRect(
			grid,
			ctx,
			inline,
			drawRect,
			col,
			row,
			{
				offset,
				color,
				textAlign,
				textBaseline,
				font,
				textOverflow,
				icons: icons$2,
				trailingIcon
			}
		) {
			ctx.fillStyle = getStyleProperty(color || ctx.fillStyle, col, row, grid, ctx);
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			ctx.font = font || ctx.font;
			let inlines = buildInlines(icons$2, inline);
			const trailingIconInline = trailingIcon ? iconOf(trailingIcon) : null;
			let inlineDrawRect = drawRect;
			let { width } = drawRect;
			let trailingIconWidth = 0;
			if (trailingIconInline) {
				trailingIconWidth = trailingIconInline.width({ ctx });
				width -= trailingIconWidth;
				inlineDrawRect = new Rect(drawRect.left, drawRect.top, width, drawRect.height);
			}
			if (isAllowOverflow(textOverflow) && isOverflowInlines(ctx, inlines, width)) {
				const { inlines: truncInlines, overflow } = truncateInlines(
					ctx,
					inlines,
					width,
					textOverflow
				);
				inlines = truncInlines;
				grid.setCellOverflowText(col, row, overflow && inlineToString(inline));
			} else grid.setCellOverflowText(col, row, false);
			drawInlines(ctx, inlines, inlineDrawRect, offset, 0, 0, col, row, grid);
			if (trailingIconInline) {
				let sumWidth = 0;
				inlines.forEach(inline$1 => {
					sumWidth += inline$1.width({ ctx });
				});
				const baseRect = new Rect(
					drawRect.left,
					drawRect.top,
					drawRect.width,
					drawRect.height
				);
				const trailingIconRect = baseRect.copy();
				if (width < sumWidth)
					trailingIconRect.left = trailingIconRect.right - trailingIconWidth - offset;
				else trailingIconRect.left += sumWidth;
				trailingIconRect.right = baseRect.right;
				drawInlines(
					ctx,
					[trailingIconInline],
					trailingIconRect,
					offset,
					0,
					0,
					col,
					row,
					grid
				);
			}
		}
		function _multiInlineRect(
			grid,
			ctx,
			multiInlines,
			drawRect,
			col,
			row,
			{
				offset,
				color,
				textAlign,
				textBaseline,
				font,
				lineHeight,
				autoWrapText,
				lineClamp,
				textOverflow,
				icons: icons$2,
				trailingIcon
			}
		) {
			ctx.fillStyle = getStyleProperty(color || ctx.fillStyle, col, row, grid, ctx);
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			ctx.font = font || ctx.font;
			if (lineClamp === "auto") {
				const rectHeight = drawRect.height - offset * 2 - 2;
				lineClamp = Math.max(Math.floor(rectHeight / lineHeight), 1);
			}
			const trailingIconInline = trailingIcon ? iconOf(trailingIcon) : null;
			let { width } = drawRect;
			let trailingIconWidth = 0;
			if (trailingIconInline) {
				trailingIconWidth = trailingIconInline.width({ ctx });
				width -= trailingIconWidth;
			}
			let buildedMultiInlines;
			if (autoWrapText || lineClamp > 0 || isAllowOverflow(textOverflow)) {
				buildedMultiInlines = [];
				const procLineClamp =
					lineClamp > 0
						? (inlines, hasNext) => {
								if (buildedMultiInlines.length + 1 >= lineClamp) {
									if (inlines.length === 0 && hasNext) {
										buildedMultiInlines.push([getOverflowInline(textOverflow)]);
										grid.setCellOverflowText(
											col,
											row,
											multiInlines.map(inlineToString).join("\n")
										);
									} else {
										const { inlines: truncInlines, overflow } = truncateInlines(
											ctx,
											inlines,
											width,
											textOverflow
										);
										buildedMultiInlines.push(
											hasNext && !overflow
												? truncInlines.concat([
														getOverflowInline(textOverflow)
													])
												: truncInlines
										);
										if (overflow || hasNext)
											grid.setCellOverflowText(
												col,
												row,
												multiInlines.map(inlineToString).join("\n")
											);
									}
									return false;
								}
								return true;
							}
						: () => true;
				const procLine = autoWrapText
					? (inlines, hasNext) => {
							if (!procLineClamp(inlines, hasNext)) return false;
							while (inlines.length) {
								if (!procLineClamp(inlines, hasNext)) return false;
								const { beforeInlines, afterInlines } = breakWidthInlines(
									ctx,
									inlines,
									width
								);
								buildedMultiInlines.push(beforeInlines);
								inlines = afterInlines;
							}
							return true;
						}
					: isAllowOverflow(textOverflow)
						? (inlines, hasNext) => {
								if (!procLineClamp(inlines, hasNext)) return false;
								const { inlines: truncInlines, overflow } = truncateInlines(
									ctx,
									inlines,
									width,
									textOverflow
								);
								buildedMultiInlines.push(truncInlines);
								if (overflow)
									grid.setCellOverflowText(
										col,
										row,
										multiInlines.map(inlineToString).join("\n")
									);
								return true;
							}
						: (inlines, hasNext) => {
								if (!procLineClamp(inlines, hasNext)) return false;
								buildedMultiInlines.push(inlines);
								return true;
							};
				grid.setCellOverflowText(col, row, false);
				for (let lineRow = 0; lineRow < multiInlines.length; lineRow++) {
					const inline = multiInlines[lineRow];
					const buildedInline = buildInlines(lineRow === 0 ? icons$2 : void 0, inline);
					if (!procLine(buildedInline, lineRow + 1 < multiInlines.length)) break;
				}
			} else {
				grid.setCellOverflowText(col, row, false);
				buildedMultiInlines = multiInlines.map((inline, lineRow) =>
					buildInlines(lineRow === 0 ? icons$2 : void 0, inline)
				);
			}
			let paddingTop = 0;
			let paddingBottom = lineHeight * (buildedMultiInlines.length - 1);
			if (ctx.textBaseline === "top" || ctx.textBaseline === "hanging") {
				const em = getFontSize(ctx, ctx.font).height;
				const pad = (lineHeight - em) / 2;
				paddingTop += pad;
				paddingBottom -= pad;
			} else if (
				ctx.textBaseline === "bottom" ||
				ctx.textBaseline === "alphabetic" ||
				ctx.textBaseline === "ideographic"
			) {
				const em = getFontSize(ctx, ctx.font).height;
				const pad = (lineHeight - em) / 2;
				paddingTop -= pad;
				paddingBottom += pad;
			}
			buildedMultiInlines.forEach(buildedInline => {
				drawInlines(
					ctx,
					buildedInline,
					drawRect,
					offset,
					paddingTop,
					paddingBottom,
					col,
					row,
					grid
				);
				paddingTop += lineHeight;
				paddingBottom -= lineHeight;
			});
			if (trailingIconInline) {
				let maxWidth = 0;
				buildedMultiInlines.forEach(buildedInline => {
					let sumWidth = 0;
					buildedInline.forEach(inline => {
						sumWidth += inline.width({ ctx });
					});
					maxWidth = Math.max(maxWidth, sumWidth);
				});
				const baseRect = new Rect(
					drawRect.left,
					drawRect.top,
					drawRect.width,
					drawRect.height
				);
				const trailingIconRect = baseRect.copy();
				if (width < maxWidth)
					trailingIconRect.left = trailingIconRect.right - trailingIconWidth - offset;
				else trailingIconRect.left += maxWidth;
				trailingIconRect.right = baseRect.right;
				drawInlines(
					ctx,
					[trailingIconInline],
					trailingIconRect,
					offset,
					0,
					0,
					col,
					row,
					grid
				);
			}
		}
		function calcElapsedColor(startColor, endColor, elapsedTime) {
			const startColorRGB = colorToRGB(startColor);
			const endColorRGB = colorToRGB(endColor);
			const getRGB = colorName => {
				const start = startColorRGB[colorName];
				const end = endColorRGB[colorName];
				if (elapsedTime >= 1) return end;
				if (elapsedTime <= 0) return start;
				const diff = start - end;
				return Math.ceil(start - diff * elapsedTime);
			};
			return `rgb(${getRGB("r")}, ${getRGB("g")}, ${getRGB("b")})`;
		}
		function drawCheckbox(
			ctx,
			rect,
			col,
			row,
			check$1,
			helper,
			{
				animElapsedTime = 1,
				uncheckBgColor = helper.theme.checkbox.uncheckBgColor,
				checkBgColor = helper.theme.checkbox.checkBgColor,
				borderColor = helper.theme.checkbox.borderColor,
				textAlign = "center",
				textBaseline = "middle"
			},
			positionOpt = {}
		) {
			const boxWidth = measureCheckbox(ctx).width;
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			const pos = calcStartPosition(ctx, rect, boxWidth + 1, boxWidth + 1, positionOpt);
			uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
			checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
			borderColor = helper.getColor(borderColor, col, row, ctx);
			if (0 < animElapsedTime && animElapsedTime < 1) {
				uncheckBgColor = check$1
					? uncheckBgColor
					: calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
				checkBgColor = check$1
					? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
					: checkBgColor;
			}
			drawCheckbox$1(ctx, pos.x, pos.y, check$1 ? animElapsedTime : false, {
				uncheckBgColor,
				checkBgColor,
				borderColor
			});
		}
		function drawRadioButton(
			ctx,
			rect,
			col,
			row,
			check$1,
			helper,
			{
				animElapsedTime = 1,
				checkColor = helper.theme.radioButton.checkColor,
				uncheckBorderColor = helper.theme.radioButton.uncheckBorderColor,
				checkBorderColor = helper.theme.radioButton.checkBorderColor,
				uncheckBgColor = helper.theme.radioButton.uncheckBgColor,
				checkBgColor = helper.theme.radioButton.checkBgColor,
				textAlign = "center",
				textBaseline = "middle"
			},
			positionOpt = {}
		) {
			const boxWidth = measureRadioButton(ctx).width;
			ctx.textAlign = textAlign;
			ctx.textBaseline = textBaseline;
			const pos = calcStartPosition(ctx, rect, boxWidth + 1, boxWidth + 1, positionOpt);
			checkColor = helper.getColor(checkColor, col, row, ctx);
			uncheckBorderColor = helper.getColor(uncheckBorderColor, col, row, ctx);
			checkBorderColor = helper.getColor(checkBorderColor, col, row, ctx);
			uncheckBgColor = helper.getColor(uncheckBgColor, col, row, ctx);
			checkBgColor = helper.getColor(checkBgColor, col, row, ctx);
			let borderColor = check$1 ? checkBorderColor : uncheckBorderColor;
			let bgColor = check$1 ? checkBgColor : uncheckBgColor;
			if (0 < animElapsedTime && animElapsedTime < 1) {
				borderColor = check$1
					? calcElapsedColor(uncheckBorderColor, checkBorderColor, animElapsedTime)
					: calcElapsedColor(checkBorderColor, uncheckBorderColor, animElapsedTime);
				bgColor = check$1
					? calcElapsedColor(uncheckBgColor, checkBgColor, animElapsedTime)
					: calcElapsedColor(checkBgColor, uncheckBgColor, animElapsedTime);
			}
			drawRadioButton$1(ctx, pos.x, pos.y, check$1 ? animElapsedTime : 1 - animElapsedTime, {
				checkColor,
				borderColor,
				bgColor
			});
		}
		var ThemeResolver = class {
			constructor(grid) {
				(0, import_defineProperty$4.default)(this, "_grid", void 0);
				(0, import_defineProperty$4.default)(this, "_checkbox", null);
				(0, import_defineProperty$4.default)(this, "_radioButton", null);
				(0, import_defineProperty$4.default)(this, "_button", null);
				(0, import_defineProperty$4.default)(this, "_tree", null);
				(0, import_defineProperty$4.default)(this, "_header", null);
				(0, import_defineProperty$4.default)(this, "_messages", null);
				(0, import_defineProperty$4.default)(this, "_indicators", null);
				this._grid = grid;
			}
			getThemeValue(...name) {
				return getThemeValue(this._grid, ...name);
			}
			get font() {
				return getThemeValue(this._grid, "font");
			}
			get underlayBackgroundColor() {
				return getThemeValue(this._grid, "underlayBackgroundColor");
			}
			get color() {
				return getThemeValue(this._grid, "color");
			}
			get frozenRowsColor() {
				return getThemeValue(this._grid, "frozenRowsColor");
			}
			get defaultBgColor() {
				return getThemeValue(this._grid, "defaultBgColor");
			}
			get frozenRowsBgColor() {
				return getThemeValue(this._grid, "frozenRowsBgColor");
			}
			get selectionBgColor() {
				return getThemeValue(this._grid, "selectionBgColor");
			}
			get highlightBgColor() {
				return getThemeValue(this._grid, "highlightBgColor");
			}
			get borderColor() {
				return getThemeValue(this._grid, "borderColor");
			}
			get frozenRowsBorderColor() {
				return getThemeValue(this._grid, "frozenRowsBorderColor");
			}
			get highlightBorderColor() {
				return getThemeValue(this._grid, "highlightBorderColor");
			}
			get checkbox() {
				const grid = this._grid;
				return (
					this._checkbox ||
					(this._checkbox = {
						get uncheckBgColor() {
							return getCheckboxProp("uncheckBgColor");
						},
						get checkBgColor() {
							return getCheckboxProp("checkBgColor");
						},
						get borderColor() {
							return getCheckboxProp("borderColor");
						}
					})
				);
				function getCheckboxProp(prop) {
					return getThemeValue(grid, "checkbox", prop);
				}
			}
			get radioButton() {
				const grid = this._grid;
				return (
					this._radioButton ||
					(this._radioButton = {
						get checkColor() {
							return getRadioButtonProp("checkColor");
						},
						get uncheckBorderColor() {
							return getRadioButtonProp("uncheckBorderColor");
						},
						get checkBorderColor() {
							return getRadioButtonProp("checkBorderColor");
						},
						get uncheckBgColor() {
							return getRadioButtonProp("uncheckBgColor");
						},
						get checkBgColor() {
							return getRadioButtonProp("checkBgColor");
						}
					})
				);
				function getRadioButtonProp(prop) {
					return getThemeValue(grid, "radioButton", prop);
				}
			}
			get button() {
				const grid = this._grid;
				return (
					this._button ||
					(this._button = {
						get color() {
							return getButtonProp("color");
						},
						get bgColor() {
							return getButtonProp("bgColor");
						}
					})
				);
				function getButtonProp(prop) {
					return getThemeValue(grid, "button", prop);
				}
			}
			get tree() {
				const grid = this._grid;
				return (
					this._tree ||
					(this._tree = {
						get lineStyle() {
							return getTreeProp("lineStyle");
						},
						get lineColor() {
							return getTreeProp("lineColor");
						},
						get lineWidth() {
							return getTreeProp("lineWidth");
						},
						get treeIcon() {
							return getTreeProp("treeIcon");
						}
					})
				);
				function getTreeProp(prop) {
					return getThemeValue(grid, "tree", prop);
				}
			}
			get header() {
				const grid = this._grid;
				return (
					this._header ||
					(this._header = {
						get sortArrowColor() {
							return getThemeValue(grid, "header", "sortArrowColor");
						}
					})
				);
			}
			get messages() {
				const grid = this._grid;
				return (
					this._messages ||
					(this._messages = {
						get infoBgColor() {
							return getMessageProp("infoBgColor");
						},
						get errorBgColor() {
							return getMessageProp("errorBgColor");
						},
						get warnBgColor() {
							return getMessageProp("warnBgColor");
						},
						get boxWidth() {
							return getMessageProp("boxWidth");
						},
						get markHeight() {
							return getMessageProp("markHeight");
						}
					})
				);
				function getMessageProp(prop) {
					return getThemeValue(grid, "messages", prop);
				}
			}
			get indicators() {
				const grid = this._grid;
				return (
					this._indicators ||
					(this._indicators = {
						get topLeftColor() {
							return getIndicatorsProp("topLeftColor");
						},
						get topLeftSize() {
							return getIndicatorsProp("topLeftSize");
						},
						get topRightColor() {
							return getIndicatorsProp("topRightColor");
						},
						get topRightSize() {
							return getIndicatorsProp("topRightSize");
						},
						get bottomRightColor() {
							return getIndicatorsProp("bottomRightColor");
						},
						get bottomRightSize() {
							return getIndicatorsProp("bottomRightSize");
						},
						get bottomLeftColor() {
							return getIndicatorsProp("bottomLeftColor");
						},
						get bottomLeftSize() {
							return getIndicatorsProp("bottomLeftSize");
						}
					})
				);
				function getIndicatorsProp(prop) {
					return getThemeValue(grid, "indicators", prop);
				}
			}
		};
		function strokeRect(ctx, color, left, top, width, height) {
			if (!Array.isArray(color)) {
				if (color) {
					ctx.strokeStyle = color;
					ctx.strokeRect(left, top, width, height);
				}
			} else {
				const borderColors = toBoxArray(color);
				strokeColorsRect(ctx, borderColors, left, top, width, height);
			}
		}
		function getPaddedRect(rect, padding, font, helper, context) {
			if (!padding) return rect;
			const {
				0: pTop,
				1: pRight,
				2: pBottom,
				3: pLeft
			} = helper.toBoxPixelArray(padding, context, font);
			const left = rect.left + pLeft;
			const top = rect.top + pTop;
			const width = rect.width - pRight - pLeft;
			const height = rect.height - pTop - pBottom;
			return new Rect(left, top, width, height);
		}
		var GridCanvasHelper = class {
			constructor(grid) {
				(0, import_defineProperty$4.default)(this, "_grid", void 0);
				(0, import_defineProperty$4.default)(this, "_theme", void 0);
				this._grid = grid;
				this._theme = new ThemeResolver(grid);
			}
			createCalculator(context, font) {
				return {
					calcWidth(width) {
						return toPx(width, {
							get full() {
								const rect = context.getRect();
								return rect.width;
							},
							get em() {
								return getFontSize(context.getContext(), font).width;
							}
						});
					},
					calcHeight(height) {
						return toPx(height, {
							get full() {
								const rect = context.getRect();
								return rect.height;
							},
							get em() {
								return getFontSize(context.getContext(), font).height;
							}
						});
					}
				};
			}
			getColor(color, col, row, ctx) {
				return getStyleProperty(color, col, row, this._grid, ctx);
			}
			getStyleProperty(style$1, col, row, ctx) {
				return getStyleProperty(style$1, col, row, this._grid, ctx);
			}
			toBoxArray(obj$1) {
				return toBoxArray(obj$1);
			}
			toBoxPixelArray(value, context, font) {
				if (typeof value === "string" || Array.isArray(value)) {
					const calculator = this.createCalculator(context, font);
					const box = toBoxArray(value);
					return [
						calculator.calcHeight(box[0]),
						calculator.calcWidth(box[1]),
						calculator.calcHeight(box[2]),
						calculator.calcWidth(box[3])
					];
				}
				return toBoxArray(value);
			}
			get theme() {
				return this._theme;
			}
			drawWithClip(context, draw) {
				const drawRect = context.getDrawRect();
				if (!drawRect) return;
				const ctx = context.getContext();
				ctx.save();
				try {
					ctx.beginPath();
					ctx.rect(drawRect.left, drawRect.top, drawRect.width, drawRect.height);
					ctx.clip();
					draw(ctx);
				} finally {
					ctx.restore();
				}
			}
			drawBorderWithClip(context, draw) {
				const drawRect = context.getDrawRect();
				if (!drawRect) return;
				const rect = context.getRect();
				const ctx = context.getContext();
				ctx.save();
				try {
					ctx.beginPath();
					let clipLeft = drawRect.left;
					let clipWidth = drawRect.width;
					if (drawRect.left === rect.left) {
						clipLeft += -1;
						clipWidth += 1;
					}
					let clipTop = drawRect.top;
					let clipHeight = drawRect.height;
					if (drawRect.top === rect.top) {
						clipTop += -1;
						clipHeight += 1;
					}
					ctx.rect(clipLeft, clipTop, clipWidth, clipHeight);
					ctx.clip();
					draw(ctx);
				} finally {
					ctx.restore();
				}
			}
			text(
				text,
				context,
				{
					padding,
					offset = TEXT_OFFSET,
					color,
					textAlign = "left",
					textBaseline = "middle",
					font,
					textOverflow = "clip",
					icons: icons$2,
					trailingIcon
				} = {}
			) {
				const { col, row } = context;
				if (!color) {
					({ color } = this.theme);
					const isFrozenCell = this._grid.isFrozenCell(col, row);
					if (isFrozenCell && isFrozenCell.row) color = this.theme.frozenRowsColor;
				}
				this.drawWithClip(context, ctx => {
					font = getFont(font, context.col, context.row, this._grid, ctx);
					const rect = getPaddedRect(context.getRect(), padding, font, this, context);
					_inlineRect(this._grid, ctx, text, rect, col, row, {
						offset,
						color,
						textAlign,
						textBaseline,
						font,
						textOverflow,
						icons: icons$2,
						trailingIcon
					});
				});
			}
			multilineText(
				lines,
				context,
				{
					padding,
					offset = TEXT_OFFSET,
					color,
					textAlign = "left",
					textBaseline = "middle",
					font,
					lineHeight = "1em",
					autoWrapText = false,
					lineClamp = 0,
					textOverflow = "clip",
					icons: icons$2,
					trailingIcon
				} = {}
			) {
				const { col, row } = context;
				if (!color) {
					({ color } = this.theme);
					const isFrozenCell = this._grid.isFrozenCell(col, row);
					if (isFrozenCell && isFrozenCell.row) color = this.theme.frozenRowsColor;
				}
				this.drawWithClip(context, ctx => {
					font = getFont(font, context.col, context.row, this._grid, ctx);
					const rect = getPaddedRect(context.getRect(), padding, font, this, context);
					const calculator = this.createCalculator(context, font);
					lineHeight = calculator.calcHeight(lineHeight);
					_multiInlineRect(this._grid, ctx, lines, rect, col, row, {
						offset,
						color,
						textAlign,
						textBaseline,
						font,
						lineHeight,
						autoWrapText,
						lineClamp,
						textOverflow,
						icons: icons$2,
						trailingIcon
					});
				});
			}
			fillText(
				text,
				x,
				y,
				context,
				{ color, textAlign = "left", textBaseline = "top", font } = {}
			) {
				const { col, row } = context;
				if (!color) {
					({ color } = this.theme);
					const isFrozenCell = this._grid.isFrozenCell(col, row);
					if (isFrozenCell && isFrozenCell.row) color = this.theme.frozenRowsColor;
				}
				const ctx = context.getContext();
				ctx.save();
				try {
					font = getFont(font, context.col, context.row, this._grid, ctx);
					ctx.fillStyle = getStyleProperty(color, col, row, this._grid, ctx);
					ctx.textAlign = textAlign;
					ctx.textBaseline = textBaseline;
					ctx.font = font || ctx.font;
					ctx.fillText(text, x, y);
				} finally {
					ctx.restore();
				}
			}
			fillCell(context, { fillColor = this.theme.defaultBgColor } = {}) {
				const rect = context.getRect();
				this.drawWithClip(context, ctx => {
					const { col, row } = context;
					ctx.fillStyle = getStyleProperty(fillColor, col, row, this._grid, ctx);
					ctx.beginPath();
					ctx.rect(rect.left, rect.top, rect.width, rect.height);
					ctx.fill();
				});
			}
			fillCellWithState(context, option = {}) {
				option.fillColor = this.getFillColorState(context, option);
				this.fillCell(context, option);
			}
			fillRect(rect, context, { fillColor = this.theme.defaultBgColor } = {}) {
				const ctx = context.getContext();
				ctx.save();
				try {
					const { col, row } = context;
					ctx.fillStyle = getStyleProperty(fillColor, col, row, this._grid, ctx);
					ctx.beginPath();
					ctx.rect(rect.left, rect.top, rect.width, rect.height);
					ctx.fill();
				} finally {
					ctx.restore();
				}
			}
			fillRectWithState(rect, context, option = {}) {
				option.fillColor = this.getFillColorState(context, option);
				this.fillRect(rect, context, option);
			}
			getFillColorState(context, option = {}) {
				const sel = context.getSelection();
				const { col, row } = context;
				if (!cellEquals(sel.select, context) && cellInRange(sel.range, col, row))
					return this.theme.selectionBgColor;
				if (option.fillColor) return option.fillColor;
				if (cellEquals(sel.select, context)) return this.theme.highlightBgColor;
				const isFrozenCell = this._grid.isFrozenCell(col, row);
				if (isFrozenCell && isFrozenCell.row) return this.theme.frozenRowsBgColor;
				return this.theme.defaultBgColor;
			}
			border(context, { borderColor = this.theme.borderColor, lineWidth = 1 } = {}) {
				const rect = context.getRect();
				this.drawBorderWithClip(context, ctx => {
					const { col, row } = context;
					const borderColors = getStyleProperty(borderColor, col, row, this._grid, ctx);
					if (lineWidth === 1) {
						ctx.lineWidth = 1;
						strokeRect(
							ctx,
							borderColors,
							rect.left - 0.5,
							rect.top - 0.5,
							rect.width,
							rect.height
						);
					} else if (lineWidth === 2) {
						ctx.lineWidth = 2;
						strokeRect(
							ctx,
							borderColors,
							rect.left,
							rect.top,
							rect.width - 1,
							rect.height - 1
						);
					} else {
						ctx.lineWidth = lineWidth;
						const startOffset = lineWidth / 2 - 1;
						strokeRect(
							ctx,
							borderColors,
							rect.left + startOffset,
							rect.top + startOffset,
							rect.width - lineWidth + 1,
							rect.height - lineWidth + 1
						);
					}
				});
			}
			borderWithState(context, option = {}) {
				const rect = context.getRect();
				const sel = context.getSelection();
				const { col, row } = context;
				if (cellEquals(sel.select, context)) {
					option.borderColor = this.theme.highlightBorderColor;
					option.lineWidth = 2;
					this.border(context, option);
				} else {
					const isFrozenCell = this._grid.isFrozenCell(col, row);
					if (
						isFrozenCell === null || isFrozenCell === void 0 ? void 0 : isFrozenCell.row
					)
						option.borderColor = this.theme.frozenRowsBorderColor;
					option.lineWidth = 1;
					this.border(context, option);
					const sel$1 = this._grid.selection.select;
					if (sel$1.col + 1 === col && sel$1.row === row)
						this.drawBorderWithClip(context, ctx => {
							const borderColors = toBoxArray(
								getStyleProperty(
									this.theme.highlightBorderColor,
									sel$1.col,
									sel$1.row,
									this._grid,
									ctx
								)
							);
							ctx.lineWidth = 1;
							ctx.strokeStyle = borderColors[1] || ctx.strokeStyle;
							ctx.beginPath();
							ctx.moveTo(rect.left - 0.5, rect.top);
							ctx.lineTo(rect.left - 0.5, rect.bottom);
							ctx.stroke();
						});
					else if (sel$1.col === col && sel$1.row + 1 === row)
						this.drawBorderWithClip(context, ctx => {
							const borderColors = toBoxArray(
								getStyleProperty(
									this.theme.highlightBorderColor,
									sel$1.col,
									sel$1.row,
									this._grid,
									ctx
								)
							);
							ctx.lineWidth = 1;
							ctx.strokeStyle = borderColors[0] || ctx.strokeStyle;
							ctx.beginPath();
							ctx.moveTo(rect.left, rect.top - 0.5);
							ctx.lineTo(rect.right, rect.top - 0.5);
							ctx.stroke();
						});
				}
			}
			buildCheckBoxInline(check$1, context, option = {}) {
				const self = this;
				const ctx = context.getContext();
				const boxWidth = measureCheckbox(ctx).width;
				return new InlineDrawer({
					draw,
					width: boxWidth + 3,
					height: boxWidth + 1,
					color: void 0
				});
				function draw({
					ctx: ctx$1,
					rect,
					offset,
					offsetLeft,
					offsetRight,
					offsetTop,
					offsetBottom
				}) {
					const { col, row } = context;
					drawCheckbox(ctx$1, rect, col, row, check$1, self, option, {
						offset: offset + (CHECKBOX_OFFSET - TEXT_OFFSET),
						padding: {
							left: offsetLeft + (CHECKBOX_OFFSET - TEXT_OFFSET),
							right: offsetRight,
							top: offsetTop,
							bottom: offsetBottom
						}
					});
				}
			}
			checkbox(
				check$1,
				context,
				{
					padding,
					animElapsedTime,
					offset = CHECKBOX_OFFSET,
					uncheckBgColor,
					checkBgColor,
					borderColor,
					textAlign,
					textBaseline
				} = {}
			) {
				this.drawWithClip(context, ctx => {
					const { col, row } = context;
					drawCheckbox(
						ctx,
						getPaddedRect(context.getRect(), padding, void 0, this, context),
						col,
						row,
						check$1,
						this,
						{
							animElapsedTime,
							uncheckBgColor,
							checkBgColor,
							borderColor,
							textAlign,
							textBaseline
						},
						{
							offset,
							padding: { left: CHECKBOX_OFFSET - TEXT_OFFSET }
						}
					);
				});
			}
			radioButton(
				check$1,
				context,
				{
					padding,
					animElapsedTime,
					offset = CHECKBOX_OFFSET,
					checkColor,
					uncheckBorderColor,
					checkBorderColor,
					uncheckBgColor,
					checkBgColor,
					textAlign,
					textBaseline
				} = {}
			) {
				this.drawWithClip(context, ctx => {
					const { col, row } = context;
					drawRadioButton(
						ctx,
						getPaddedRect(context.getRect(), padding, void 0, this, context),
						col,
						row,
						check$1,
						this,
						{
							animElapsedTime,
							checkColor,
							uncheckBorderColor,
							checkBorderColor,
							uncheckBgColor,
							checkBgColor,
							textAlign,
							textBaseline
						},
						{
							offset,
							padding: { left: CHECKBOX_OFFSET - TEXT_OFFSET }
						}
					);
				});
			}
			button(
				caption,
				context,
				{
					bgColor = this.theme.button.bgColor,
					padding,
					offset = TEXT_OFFSET,
					color = this.theme.button.color,
					textAlign = "center",
					textBaseline = "middle",
					shadow,
					font,
					textOverflow = "clip",
					icons: icons$2
				} = {}
			) {
				const rect = context.getRect();
				this.drawWithClip(context, ctx => {
					font = getFont(font, context.col, context.row, this._grid, ctx);
					const { col, row } = context;
					const { left, top, width, height } = getPaddedRect(
						rect,
						padding || rect.height / 8,
						font,
						this,
						context
					);
					bgColor = getStyleProperty(bgColor, context.col, context.row, this._grid, ctx);
					drawButton(ctx, left, top, width, height, {
						bgColor,
						radius: rect.height / 8,
						shadow
					});
					_inlineRect(
						this._grid,
						ctx,
						caption,
						new Rect(left, top, width, height),
						col,
						row,
						{
							offset,
							color,
							textAlign,
							textBaseline,
							font,
							textOverflow,
							icons: icons$2
						}
					);
				});
			}
			testFontLoad(font, value, context) {
				return testFontLoad(font, value, context, this._grid);
			}
		};

		//#endregion
		//#region src/js/tooltip/BaseTooltip.ts
		var import_defineProperty$3 = /* @__PURE__ */ __toESM(require_defineProperty());
		var BaseTooltip = class {
			constructor(grid) {
				(0, import_defineProperty$3.default)(this, "_grid", void 0);
				(0, import_defineProperty$3.default)(this, "_tooltipElement", void 0);
				this._grid = grid;
			}
			dispose() {
				this.detachTooltipElement();
				if (this._tooltipElement) this._tooltipElement.dispose();
				this._tooltipElement = void 0;
			}
			_getTooltipElement() {
				if (this._tooltipElement) return this._tooltipElement;
				return (this._tooltipElement = this.createTooltipElementInternal());
			}
			attachTooltipElement(col, row, content) {
				const tooltipElement = this._getTooltipElement();
				tooltipElement.attach(this._grid, col, row, content);
			}
			moveTooltipElement(col, row) {
				const tooltipElement = this._getTooltipElement();
				tooltipElement.move(this._grid, col, row);
			}
			detachTooltipElement() {
				const tooltipElement = this._getTooltipElement();
				tooltipElement._detach();
			}
		};

		//#endregion
		//#region src/js/tooltip/internal/TooltipElement.ts
		var import_defineProperty$2 = /* @__PURE__ */ __toESM(require_defineProperty());
		const CLASSNAME = "cheetah-grid__tooltip-element";
		const CONTENT_CLASSNAME = `${CLASSNAME}__content`;
		const HIDDEN_CLASSNAME = `${CLASSNAME}--hidden`;
		const SHOWN_CLASSNAME = `${CLASSNAME}--shown`;
		const CSS_PROP_NAME_PREFIX = "--cheetah-grid-tooltip-element-";
		const CELL_TOP_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}cell-top`;
		const CELL_BOTTOM_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}cell-bottom`;
		const CELL_LEFT_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}cell-left`;
		const CELL_RIGHT_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}cell-right`;
		const ELEMENT_WIDTH_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}width`;
		const ELEMENT_HEIGHT_CSS_PROP_NAME = `${CSS_PROP_NAME_PREFIX}height`;
		function createTooltipDomElement() {
			const rootElement = createElement("div", { classList: [CLASSNAME, HIDDEN_CLASSNAME] });
			const messageElement = createElement("pre", { classList: [CONTENT_CLASSNAME] });
			rootElement.appendChild(messageElement);
			rootElement.popover = "manual";
			return rootElement;
		}
		var TooltipElement = class {
			constructor() {
				(0, import_defineProperty$2.default)(this, "_handler", void 0);
				(0, import_defineProperty$2.default)(this, "_rootElement", void 0);
				(0, import_defineProperty$2.default)(this, "_messageElement", void 0);
				this._handler = new EventHandler();
				const rootElement = (this._rootElement = createTooltipDomElement());
				this._messageElement = rootElement.querySelector(`.${CONTENT_CLASSNAME}`);
			}
			dispose() {
				this.detach();
				const rootElement = this._rootElement;
				if (rootElement.parentElement) rootElement.parentElement.removeChild(rootElement);
				this._handler.dispose();
				delete this._rootElement;
				delete this._messageElement;
			}
			attach(grid, col, row, content) {
				const rootElement = this._rootElement;
				const messageElement = this._messageElement;
				rootElement.classList.remove(SHOWN_CLASSNAME);
				rootElement.classList.add(HIDDEN_CLASSNAME);
				rootElement.hidePopover();
				messageElement.textContent = content;
				if (!this._attachCell(grid, col, row)) this._detach();
			}
			move(grid, col, row) {
				if (!this._attachCell(grid, col, row)) this._detach();
			}
			detach() {
				this._detach();
			}
			_detach() {
				const rootElement = this._rootElement;
				if (rootElement.parentElement) {
					rootElement.classList.remove(SHOWN_CLASSNAME);
					rootElement.classList.add(HIDDEN_CLASSNAME);
				}
				rootElement.hidePopover();
			}
			_attachCell(grid, col, row) {
				const rootElement = this._rootElement;
				const { element, rect } = grid.getAttachCellsArea(grid.getCellRange(col, row));
				const { frozenRowCount, frozenColCount } = grid;
				if (row >= frozenRowCount && frozenRowCount > 0) {
					const { rect: frozenRect } = grid.getAttachCellsArea(
						grid.getCellRange(col, frozenRowCount - 1)
					);
					if (rect.bottom < frozenRect.bottom) return false;
				} else if (rect.bottom < 0) return false;
				if (col >= frozenColCount && frozenColCount > 0) {
					const { rect: frozenRect } = grid.getAttachCellsArea(
						grid.getCellRange(frozenColCount - 1, row)
					);
					if (rect.left < frozenRect.right) return false;
				} else if (rect.left < 0) return false;
				const {
					height: offsetHeight,
					width: offsetWidth,
					left: elementLeft,
					top: elementTop
				} = element.getBoundingClientRect();
				if (offsetHeight < rect.bottom) return false;
				if (offsetWidth < rect.left) return false;
				rootElement.style.setProperty(
					CELL_TOP_CSS_PROP_NAME,
					`${(elementTop + rect.top).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_BOTTOM_CSS_PROP_NAME,
					`${(elementTop + rect.bottom).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_LEFT_CSS_PROP_NAME,
					`${(elementLeft + rect.left).toFixed()}px`
				);
				rootElement.style.setProperty(
					CELL_RIGHT_CSS_PROP_NAME,
					`${(elementLeft + rect.right).toFixed()}px`
				);
				if (rootElement.parentElement !== element) element.appendChild(rootElement);
				rootElement.showPopover();
				const rootElementRect = rootElement.getBoundingClientRect();
				rootElement.style.setProperty(
					ELEMENT_WIDTH_CSS_PROP_NAME,
					`${rootElementRect.width.toFixed()}px`
				);
				rootElement.style.setProperty(
					ELEMENT_HEIGHT_CSS_PROP_NAME,
					`${rootElementRect.height.toFixed()}px`
				);
				rootElement.classList.add(SHOWN_CLASSNAME);
				rootElement.classList.remove(HIDDEN_CLASSNAME);
				return true;
			}
		};

		//#endregion
		//#region src/js/tooltip/Tooltip.ts
		var Tooltip = class extends BaseTooltip {
			createTooltipElementInternal() {
				return new TooltipElement();
			}
		};

		//#endregion
		//#region src/js/tooltip/TooltipHandler.ts
		var import_defineProperty$1 = /* @__PURE__ */ __toESM(require_defineProperty());
		const TOOLTIP_INSTANCE_FACTORY = {
			"overflow-text"(grid) {
				return new Tooltip(grid);
			}
		};
		function getTooltipInstanceInfo(grid, col, row) {
			const overflowText = grid.getCellOverflowText(col, row);
			if (overflowText)
				return {
					type: "overflow-text",
					content: overflowText
				};
			return null;
		}
		var TooltipHandler = class {
			constructor(grid) {
				(0, import_defineProperty$1.default)(this, "_grid", void 0);
				(0, import_defineProperty$1.default)(this, "_tooltipInstances", void 0);
				(0, import_defineProperty$1.default)(this, "_attachInfo", void 0);
				this._grid = grid;
				this._tooltipInstances = {};
				this._bindGridEvent(grid);
			}
			dispose() {
				const tooltipInstances = this._tooltipInstances;
				for (const k in tooltipInstances) tooltipInstances[k].dispose();
				delete this._tooltipInstances;
				this._attachInfo = null;
			}
			_attach(col, row) {
				const info = this._attachInfo;
				const instanceInfo = this._getTooltipInstanceInfo(col, row);
				if (info && (!instanceInfo || info.instance !== instanceInfo.instance)) {
					info.instance.detachTooltipElement();
					this._attachInfo = null;
				}
				if (!instanceInfo) return;
				const { instance } = instanceInfo;
				instance.attachTooltipElement(col, row, instanceInfo.content);
				const range = this._grid.getCellRange(col, row);
				this._attachInfo = {
					range,
					instance
				};
			}
			_move(col, row) {
				const info = this._attachInfo;
				if (!info || !cellInRange(info.range, col, row)) return;
				const { instance } = info;
				instance.moveTooltipElement(col, row);
			}
			_detach() {
				const info = this._attachInfo;
				if (!info) return;
				const { instance } = info;
				instance.detachTooltipElement();
				this._attachInfo = null;
			}
			_isAttachCell(col, row) {
				const info = this._attachInfo;
				if (!info) return false;
				return cellInRange(info.range, col, row);
			}
			_bindGridEvent(grid) {
				grid.listen(LG_EVENT_TYPE.MOUSEOVER_CELL, e => {
					if (e.related) {
						if (this._isAttachCell(e.col, e.row)) return;
					}
					this._attach(e.col, e.row);
				});
				grid.listen(LG_EVENT_TYPE.MOUSEOUT_CELL, e => {
					if (e.related) {
						if (this._isAttachCell(e.related.col, e.related.row)) return;
					}
					this._detach();
				});
				grid.listen(LG_EVENT_TYPE.SELECTED_CELL, e => {
					if (this._isAttachCell(e.col, e.row)) this._detach();
				});
				grid.listen(LG_EVENT_TYPE.SCROLL, () => {
					const info = this._attachInfo;
					if (!info) return;
					this._move(info.range.start.col, info.range.start.row);
				});
				grid.listen(LG_EVENT_TYPE.CHANGED_VALUE, e => {
					if (this._isAttachCell(e.col, e.row)) {
						this._detach();
						this._attach(e.col, e.row);
					}
				});
			}
			_getTooltipInstanceInfo(col, row) {
				const grid = this._grid;
				const tooltipInstances = this._tooltipInstances;
				const info = getTooltipInstanceInfo(grid, col, row);
				if (!info) return null;
				const { type } = info;
				const instance =
					tooltipInstances[type] ||
					(tooltipInstances[type] = TOOLTIP_INSTANCE_FACTORY[type](grid));
				return {
					instance,
					type,
					content: info.content
				};
			}
		};

		//#endregion
		//#region src/js/ListGrid.ts
		var import_defineProperty = /* @__PURE__ */ __toESM(require_defineProperty());
		/** @private */
		const _ = PROTECTED_SYMBOL;
		/** @private */
		function _getCellRange(grid, col, row) {
			return grid[_].layoutMap.getCellRange(col, row);
		}
		/** @private */
		function _updateRect(grid, col, row, context) {
			context.setRectFilter(rect => {
				let { left, right, top, bottom } = rect;
				const {
					start: { col: startCol, row: startRow },
					end: { col: endCol, row: endRow }
				} = _getCellRange(grid, col, row);
				for (let c = col - 1; c >= startCol; c--) left -= grid.getColWidth(c);
				for (let c = col + 1; c <= endCol; c++) right += grid.getColWidth(c);
				for (let r = row - 1; r >= startRow; r--) top -= grid.getRowHeight(r);
				for (let r = row + 1; r <= endRow; r++) bottom += grid.getRowHeight(r);
				return Rect.bounds(left, top, right, bottom);
			});
		}
		/** @private */
		function _getCellValue(grid, col, row) {
			if (row < grid[_].layoutMap.headerRowCount) {
				const { caption } = grid[_].layoutMap.getHeader(col, row);
				return typeof caption === "function" ? caption() : caption;
			} else {
				const { field } = grid[_].layoutMap.getBody(col, row);
				return _getField(grid, field, row);
			}
		}
		/** @private */
		function _setCellValue(grid, col, row, value) {
			if (row < grid[_].layoutMap.headerRowCount) return false;
			else {
				const { field } = grid[_].layoutMap.getBody(col, row);
				if (field == null) return false;
				const index = _getRecordIndexByRow(grid, row);
				return grid[_].dataSource.setField(index, field, value);
			}
		}
		/** @private */
		function _getCellMessage(grid, col, row) {
			if (row < grid[_].layoutMap.headerRowCount) return null;
			else {
				const { message } = grid[_].layoutMap.getBody(col, row);
				if (!message) return null;
				if (!Array.isArray(message)) return _getField(grid, message, row);
				const promises = [];
				for (let index = 0; index < message.length; index++) {
					const msg = _getField(grid, message[index], row);
					if (isPromise(msg)) promises.push(msg);
					else if (hasMessage(msg)) return msg;
				}
				if (!promises.length) return null;
				return new Promise((resolve, reject) => {
					promises.forEach(p => {
						p.then(msg => {
							if (hasMessage(msg)) resolve(msg);
						}, reject);
					});
				});
			}
		}
		function _getCellIcon0(grid, icon$1, row) {
			if (Array.isArray(icon$1)) return icon$1.map(i => _getCellIcon0(grid, i, row));
			if (!obj.isObject(icon$1) || typeof icon$1 === "function")
				return _getField(grid, icon$1, row);
			const retIcon = {};
			const iconOpt = icon$1;
			iconPropKeys.forEach(k => {
				if (iconOpt[k]) {
					const f = _getField(grid, iconOpt[k], row);
					if (f != null) retIcon[k] = f;
					else if (!_hasField(grid, iconOpt[k], row)) retIcon[k] = iconOpt[k];
				}
			});
			return retIcon;
		}
		/** @private */
		function _getCellIcon(grid, col, row) {
			if (row < grid[_].layoutMap.headerRowCount) {
				const { headerIcon } = grid[_].layoutMap.getHeader(col, row);
				if (headerIcon == null) return null;
				return headerIcon;
			} else {
				const { icon: icon$1 } = grid[_].layoutMap.getBody(col, row);
				if (icon$1 == null) return null;
				return _getCellIcon0(grid, icon$1, row);
			}
		}
		/** @private */
		function _getField(grid, field, row) {
			if (field == null) return null;
			if (row < grid[_].layoutMap.headerRowCount) return null;
			else {
				const index = _getRecordIndexByRow(grid, row);
				return grid[_].dataSource.getField(index, field);
			}
		}
		/** @private */
		function _hasField(grid, field, row) {
			if (field == null) return false;
			if (row < grid[_].layoutMap.headerRowCount) return false;
			else {
				const index = _getRecordIndexByRow(grid, row);
				return grid[_].dataSource.hasField(index, field);
			}
		}
		/** @private */
		function _onDrawValue(grid, cellValue, context, { col, row }, style$1, draw) {
			const helper = grid[_].gridCanvasHelper;
			const drawCellBg = ({ bgColor } = {}) => {
				const fillOpt = { fillColor: bgColor };
				helper.fillCellWithState(context, fillOpt);
			};
			const drawCellBorder = () => {
				if (context.col === grid.frozenColCount - 1) {
					const rect = context.getRect();
					helper.drawWithClip(context, ctx => {
						const borderColor =
							context.row >= grid.frozenRowCount
								? helper.theme.borderColor
								: helper.theme.frozenRowsBorderColor;
						const borderColors = helper.toBoxArray(
							helper.getColor(borderColor, context.col, context.row, ctx)
						);
						if (borderColors[1]) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = borderColors[1];
							ctx.beginPath();
							ctx.moveTo(rect.right - 2.5, rect.top);
							ctx.lineTo(rect.right - 2.5, rect.bottom);
							ctx.stroke();
						}
					});
				}
				_borderWithState(grid, helper, context);
			};
			const drawCellBase = ({ bgColor } = {}) => {
				drawCellBg({ bgColor });
				drawCellBorder();
			};
			const info = {
				getRecord: () => grid.getRowRecord(row),
				getIcon: () => _getCellIcon(grid, col, row),
				getMessage: () => _getCellMessage(grid, col, row),
				messageHandler: grid[_].messageHandler,
				style: style$1,
				drawCellBase,
				drawCellBg,
				drawCellBorder
			};
			return draw(cellValue, info, context, grid);
		}
		/** @private */
		function _borderWithState(grid, helper, context) {
			const { col, row } = context;
			const sel = grid.selection.select;
			const { layoutMap } = grid[_];
			const rect = context.getRect();
			const option = {};
			const selRecordIndex = layoutMap.getRecordIndexByRow(sel.row);
			const selId = layoutMap.getCellId(sel.col, sel.row);
			function isSelectCell(col$1, row$1) {
				if (col$1 === sel.col && row$1 === sel.row) return true;
				return (
					selId != null &&
					layoutMap.getCellId(col$1, row$1) === selId &&
					layoutMap.getRecordIndexByRow(row$1) === selRecordIndex
				);
			}
			if (isSelectCell(col, row)) {
				option.borderColor = helper.theme.highlightBorderColor;
				option.lineWidth = 2;
				helper.border(context, option);
			} else {
				option.lineWidth = 1;
				const isFrozenCell = grid.isFrozenCell(col, row);
				if (isFrozenCell === null || isFrozenCell === void 0 ? void 0 : isFrozenCell.row)
					option.borderColor = helper.theme.frozenRowsBorderColor;
				helper.border(context, option);
				if (col > 0 && isSelectCell(col - 1, row))
					helper.drawBorderWithClip(context, ctx => {
						const borderColors = helper.toBoxArray(
							helper.getColor(
								helper.theme.highlightBorderColor,
								sel.col,
								sel.row,
								ctx
							)
						);
						if (borderColors[1]) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = borderColors[1];
							ctx.beginPath();
							ctx.moveTo(rect.left - 0.5, rect.top);
							ctx.lineTo(rect.left - 0.5, rect.bottom);
							ctx.stroke();
						}
					});
				else if (row > 0 && isSelectCell(col, row - 1))
					helper.drawBorderWithClip(context, ctx => {
						const borderColors = helper.toBoxArray(
							helper.getColor(
								helper.theme.highlightBorderColor,
								sel.col,
								sel.row,
								ctx
							)
						);
						if (borderColors[0]) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = borderColors[0];
							ctx.beginPath();
							ctx.moveTo(rect.left, rect.top - 0.5);
							ctx.lineTo(rect.right, rect.top - 0.5);
							ctx.stroke();
						}
					});
			}
		}
		/** @private */
		function _refreshHeader(grid) {
			const protectedSpace = grid[_];
			if (protectedSpace.headerEvents)
				protectedSpace.headerEvents.forEach(id => grid.unlisten(id));
			const headerEvents = (grid[_].headerEvents = []);
			headerEvents.forEach(id => grid.unlisten(id));
			let layoutMap;
			if (
				protectedSpace.layout &&
				(!Array.isArray(protectedSpace.layout) || protectedSpace.layout.length > 0)
			)
				layoutMap = protectedSpace.layoutMap = new MultiLayoutMap(protectedSpace.layout);
			else {
				var _protectedSpace$heade;
				layoutMap = protectedSpace.layoutMap = new SimpleHeaderLayoutMap(
					(_protectedSpace$heade = protectedSpace.header) !== null &&
						_protectedSpace$heade !== void 0
						? _protectedSpace$heade
						: []
				);
			}
			layoutMap.headerObjects.forEach(cell => {
				const ids = cell.headerType.bindGridEvent(grid, cell.id);
				headerEvents.push(...ids);
				if (cell.style) {
					if (cell.style instanceof BaseStyle$1) {
						const id = cell.style.listen(BaseStyle$1.EVENT_TYPE.CHANGE_STYLE, () => {
							grid.invalidate();
						});
						headerEvents.push(id);
					}
				}
				if (cell.action) {
					const ids$1 = cell.action.bindGridEvent(grid, cell.id);
					headerEvents.push(...ids$1);
				}
			});
			layoutMap.columnObjects.forEach(col => {
				if (col.action) {
					const ids = col.action.bindGridEvent(grid, col.id);
					headerEvents.push(...ids);
				}
				if (col.columnType) {
					const ids = col.columnType.bindGridEvent(grid, col.id);
					headerEvents.push(...ids);
				}
				if (col.style) {
					if (col.style instanceof BaseStyle) {
						const id = col.style.listen(BaseStyle.EVENT_TYPE.CHANGE_STYLE, () => {
							grid.invalidate();
						});
						headerEvents.push(id);
					}
				}
			});
			for (let col = 0; col < layoutMap.columnWidths.length; col++) {
				const column = layoutMap.columnWidths[col];
				const { width, minWidth, maxWidth } = column;
				if (width && (typeof width === "string" || width > 0)) grid.setColWidth(col, width);
				else grid.setColWidth(col, null);
				if (minWidth && (typeof minWidth === "string" || minWidth > 0))
					grid.setMinColWidth(col, minWidth);
				else grid.setMinColWidth(col, null);
				if (maxWidth && (typeof maxWidth === "string" || maxWidth > 0))
					grid.setMaxColWidth(col, maxWidth);
				else grid.setMaxColWidth(col, null);
			}
			const { headerRowHeight } = grid[_];
			for (let row = 0; row < layoutMap.headerRowCount; row++) {
				const height = Array.isArray(headerRowHeight)
					? headerRowHeight[row]
					: headerRowHeight;
				if (height && height > 0) grid.setRowHeight(row, height);
				else grid.setRowHeight(row, null);
			}
			grid.colCount = layoutMap.colCount;
			_refreshRowCount(grid);
			grid.frozenRowCount = layoutMap.headerRowCount;
		}
		/** @private */
		function _refreshRowCount(grid) {
			const { layoutMap } = grid[_];
			grid.rowCount =
				grid[_].dataSource.length * layoutMap.bodyRowCount + layoutMap.headerRowCount;
		}
		/** @private */
		function _tryWithUpdateDataSource(grid, fn) {
			const { dataSourceEventIds } = grid[_];
			if (dataSourceEventIds) dataSourceEventIds.forEach(id => grid[_].handler.off(id));
			fn(grid);
			grid[_].dataSourceEventIds = [
				grid[_].handler.on(grid[_].dataSource, DataSource.EVENT_TYPE.UPDATED_LENGTH, () => {
					_refreshRowCount(grid);
					grid.invalidate();
				}),
				grid[_].handler.on(grid[_].dataSource, DataSource.EVENT_TYPE.UPDATED_ORDER, () => {
					grid.invalidate();
				})
			];
		}
		/** @private */
		function _setRecords(grid, records = []) {
			_tryWithUpdateDataSource(grid, () => {
				grid[_].records = records;
				const newDataSource = (grid[_].dataSource = CachedDataSource.ofArray(records));
				grid.addDisposable(newDataSource);
			});
		}
		/** @private */
		function _setDataSource(grid, dataSource) {
			_tryWithUpdateDataSource(grid, () => {
				if (dataSource)
					if (dataSource instanceof DataSource) grid[_].dataSource = dataSource;
					else {
						const newDataSource = (grid[_].dataSource = new CachedDataSource(
							dataSource
						));
						grid.addDisposable(newDataSource);
					}
				else grid[_].dataSource = DataSource.EMPTY;
				grid[_].records = null;
			});
		}
		/** @private */
		function _getRecordIndexByRow(grid, row) {
			const { layoutMap } = grid[_];
			return layoutMap.getRecordIndexByRow(row);
		}
		/** @private */
		function _onRangePaste(text, test = () => true) {
			const { layoutMap } = this[_];
			const selectionRange = this.selection.range;
			const { start } = this.getCellRange(selectionRange.start.col, selectionRange.start.row);
			const { end } = this.getCellRange(selectionRange.end.col, selectionRange.end.row);
			const values = parsePasteRangeBoxValues(text, { trimOnPaste: this.trimOnPaste });
			const pasteRowCount = Math.min(
				Math.max(end.row - start.row + 1, values.rowCount),
				this.rowCount - start.row
			);
			const pasteColCount = Math.min(
				Math.max(end.col - start.col + 1, values.colCount),
				this.colCount - start.col
			);
			let hasEditable = false;
			const actionColumnsBox = [];
			for (let bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
				const actionColumnsRow = [];
				actionColumnsBox.push(actionColumnsRow);
				for (let offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
					var _body$action;
					const body = layoutMap.getBody(
						start.col + offsetCol,
						bodyRow + layoutMap.headerRowCount
					);
					actionColumnsRow[offsetCol] = body;
					if (
						!hasEditable &&
						((_body$action = body.action) === null || _body$action === void 0
							? void 0
							: _body$action.editable)
					)
						hasEditable = true;
				}
			}
			if (!hasEditable) return;
			const startRow = layoutMap.getRecordStartRowByRecordIndex(
				layoutMap.getRecordIndexByRow(start.row)
			);
			const startRowOffset = start.row - startRow;
			let rejectedDetail = [];
			const addRejectedDetail = (cell, record, define, pasteValue) => {
				rejectedDetail.push({
					col: cell.col,
					row: cell.row,
					record,
					define,
					pasteValue
				});
			};
			let timeout = null;
			const processRejected = () => {
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(() => {
					if (rejectedDetail.length > 0) {
						this.fireListeners(LG_EVENT_TYPE.REJECTED_PASTE_VALUES, {
							detail: rejectedDetail
						});
						rejectedDetail = [];
					}
				}, 100);
			};
			let reject = addRejectedDetail;
			let duplicate = {};
			let actionRow = startRowOffset;
			let valuesRow = 0;
			for (let offsetRow = 0; offsetRow < pasteRowCount; offsetRow++) {
				let valuesCol = 0;
				for (let offsetCol = 0; offsetCol < pasteColCount; offsetCol++) {
					const { action, id, define } = actionColumnsBox[actionRow][offsetCol];
					if (
						!duplicate[id] &&
						(action === null || action === void 0 ? void 0 : action.editable)
					) {
						duplicate[id] = true;
						const col = start.col + offsetCol;
						const row = start.row + offsetRow;
						const cellValue = values.getCellValue(valuesCol, valuesRow);
						then(this.getRowRecord(row), record => {
							then(_getCellValue(this, col, row), oldValue => {
								if (
									test({
										grid: this,
										record,
										col,
										row,
										value: cellValue,
										oldValue
									})
								)
									action.onPasteCellRangeBox(
										this,
										{
											col,
											row
										},
										cellValue,
										{
											reject() {
												reject(
													{
														col,
														row
													},
													record,
													define,
													cellValue
												);
											}
										}
									);
							});
						});
					}
					valuesCol++;
					if (valuesCol >= values.colCount) valuesCol = 0;
				}
				actionRow++;
				if (actionRow >= layoutMap.bodyRowCount) {
					actionRow = 0;
					duplicate = {};
				}
				valuesRow++;
				if (valuesRow >= values.rowCount) valuesRow = 0;
			}
			const newEnd = {
				col: start.col + pasteColCount - 1,
				row: start.row + pasteRowCount - 1
			};
			this.selection.range = {
				start,
				end: newEnd
			};
			this.invalidateCellRange(this.selection.range);
			processRejected();
			reject = (cell, record, define, pasteValue) => {
				addRejectedDetail(cell, record, define, pasteValue);
				processRejected();
			};
		}
		/** @private */
		function _onRangeDelete() {
			const { layoutMap } = this[_];
			const selectionRange = this.selection.range;
			const { start } = this.getCellRange(selectionRange.start.col, selectionRange.start.row);
			const { end } = this.getCellRange(selectionRange.end.col, selectionRange.end.row);
			const deleteRowCount = Math.min(end.row - start.row + 1, this.rowCount - start.row);
			const deleteColCount = Math.min(end.col - start.col + 1, this.colCount - start.col);
			let hasEditable = false;
			const actionColumnsBox = [];
			for (let bodyRow = 0; bodyRow < layoutMap.bodyRowCount; bodyRow++) {
				const actionColumnsRow = [];
				actionColumnsBox.push(actionColumnsRow);
				for (let offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
					var _body$action2;
					const body = layoutMap.getBody(
						start.col + offsetCol,
						bodyRow + layoutMap.headerRowCount
					);
					actionColumnsRow[offsetCol] = body;
					if (
						!hasEditable &&
						((_body$action2 = body.action) === null || _body$action2 === void 0
							? void 0
							: _body$action2.editable)
					)
						hasEditable = true;
				}
			}
			if (!hasEditable) return;
			const startRow = layoutMap.getRecordStartRowByRecordIndex(
				layoutMap.getRecordIndexByRow(start.row)
			);
			const startRowOffset = start.row - startRow;
			let duplicate = {};
			let actionRow = startRowOffset;
			for (let offsetRow = 0; offsetRow < deleteRowCount; offsetRow++) {
				for (let offsetCol = 0; offsetCol < deleteColCount; offsetCol++) {
					const { action, id } = actionColumnsBox[actionRow][offsetCol];
					if (
						!duplicate[id] &&
						(action === null || action === void 0 ? void 0 : action.editable)
					) {
						duplicate[id] = true;
						const col = start.col + offsetCol;
						const row = start.row + offsetRow;
						then(this.getRowRecord(row), _record => {
							then(_getCellValue(this, col, row), _oldValue => {
								action.onDeleteCellRangeBox(this, {
									col,
									row
								});
							});
						});
					}
				}
				actionRow++;
				if (actionRow >= layoutMap.bodyRowCount) {
					actionRow = 0;
					duplicate = {};
				}
			}
			this.invalidateCellRange(selectionRange);
		}
		const gridMap = /* @__PURE__ */ new WeakMap();
		const resizeObserver =
			typeof ResizeObserver === "undefined"
				? {
						observe: () => {},
						unobserve: () => {}
					}
				: new ResizeObserver(entries => {
						for (const entry of entries)
							if (entry.contentBoxSize) {
								const grid = gridMap.get(entry.target);
								if (grid) {
									grid.updateSize();
									grid.updateScroll();
									grid.invalidate();
								}
							}
					});
		/**
		 * ListGrid
		 * @classdesc cheetahGrid.ListGrid
		 * @memberof cheetahGrid
		 */
		var ListGrid = class extends DrawGrid {
			static get EVENT_TYPE() {
				return LG_EVENT_TYPE;
			}
			/**
			 * constructor
			 *
			 * @constructor
			 * @param options Constructor options
			 */
			constructor(options = {}) {
				var _options$allowRangePa;
				super(omit(options, ["colCount", "rowCount", "frozenRowCount"]));
				(0, import_defineProperty.default)(this, _, this[_]);
				(0, import_defineProperty.default)(this, "disabled", false);
				(0, import_defineProperty.default)(this, "readOnly", false);
				const protectedSpace = this[_];
				protectedSpace.header = options.header || [];
				protectedSpace.layout = options.layout || [];
				protectedSpace.headerRowHeight = options.headerRowHeight || [];
				if (options.dataSource) _setDataSource(this, options.dataSource);
				else _setRecords(this, options.records);
				protectedSpace.allowRangePaste =
					(_options$allowRangePa = options.allowRangePaste) !== null &&
					_options$allowRangePa !== void 0
						? _options$allowRangePa
						: false;
				protectedSpace.sortState = {
					col: -1,
					row: -1,
					order: void 0
				};
				protectedSpace.gridCanvasHelper = new GridCanvasHelper(this);
				protectedSpace.theme = of(options.theme);
				protectedSpace.messageHandler = new MessageHandler(this, (col, row) =>
					_getCellMessage(this, col, row)
				);
				protectedSpace.tooltipHandler = new TooltipHandler(this);
				_refreshHeader(this);
				this.invalidate();
				const element = this.getElement();
				gridMap.set(element, this);
				resizeObserver.observe(element);
			}
			/**
			 * Dispose the grid instance.
			 * @returns {void}
			 */
			dispose() {
				const element = this.getElement();
				gridMap.delete(element);
				resizeObserver.unobserve(element);
				const protectedSpace = this[_];
				protectedSpace.messageHandler.dispose();
				protectedSpace.tooltipHandler.dispose();
				super.dispose();
			}
			/**
			 * Gets the define of the header.
			 */
			get header() {
				return this[_].header;
			}
			/**
			 * Sets the define of the header with the given data.
			 * <pre>
			 * column options
			 * -----
			 * caption: header caption
			 * field: field name
			 * width: column width
			 * minWidth: column min width
			 * maxWidth: column max width
			 * icon: icon definition
			 * message: message key name
			 * columnType: column type
			 * action: column action
			 * style: column style
			 * headerType: header type
			 * headerStyle: header style
			 * headerAction: header action
			 * headerField: header field name
			 * headerIcon: header icon definition
			 * sort: define sort setting
			 * -----
			 *
			 * multiline header
			 * -----
			 * caption: header caption
			 * columns: columns define
			 * -----
			 * </pre>
			 */
			set header(header) {
				this[_].header = header;
				_refreshHeader(this);
			}
			/**
			 * Gets the define of the layout.
			 */
			get layout() {
				return this[_].layout;
			}
			/**
			 * Sets the define of the layout with the given data.
			 */
			set layout(layout) {
				this[_].layout = layout;
				_refreshHeader(this);
			}
			/**
			 * Gets the define of the headerRowHeight.
			 */
			get headerRowHeight() {
				return this[_].headerRowHeight;
			}
			/**
			 * Sets the define of the headerRowHeight with the given data.
			 */
			set headerRowHeight(headerRowHeight) {
				this[_].headerRowHeight = headerRowHeight || [];
				_refreshHeader(this);
			}
			/**
			 * Get the row count per record
			 */
			get recordRowCount() {
				return this[_].layoutMap.bodyRowCount;
			}
			/**
			 * Get the records.
			 */
			get records() {
				return this[_].records || null;
			}
			/**
			 * Set the records from given
			 */
			set records(records) {
				if (records == null) return;
				_setRecords(this, records);
				_refreshRowCount(this);
				this.invalidate();
			}
			/**
			 * Get the data source.
			 */
			get dataSource() {
				return this[_].dataSource;
			}
			/**
			 * Set the data source from given
			 */
			set dataSource(dataSource) {
				_setDataSource(this, dataSource);
				_refreshRowCount(this);
				this.invalidate();
			}
			/**
			 * Get the theme.
			 */
			get theme() {
				return this[_].theme;
			}
			/**
			 * Set the theme from given
			 */
			set theme(theme$2) {
				this[_].theme = of(theme$2);
				this.invalidate();
			}
			/**
			 * If set to true to allow pasting of ranges.
			 */
			get allowRangePaste() {
				return this[_].allowRangePaste;
			}
			set allowRangePaste(allowRangePaste) {
				this[_].allowRangePaste = allowRangePaste;
			}
			/**
			 * Get the font definition as a string.
			 * @override
			 */
			get font() {
				return super.font || this[_].gridCanvasHelper.theme.font;
			}
			/**
			 * Set the font definition with the given string.
			 * @override
			 */
			set font(font) {
				super.font = font;
			}
			/**
			 * Get the background color of the underlay.
			 * @override
			 */
			get underlayBackgroundColor() {
				return (
					super.underlayBackgroundColor ||
					this[_].gridCanvasHelper.theme.underlayBackgroundColor
				);
			}
			/**
			 * Set the background color of the underlay.
			 * @override
			 */
			set underlayBackgroundColor(underlayBackgroundColor) {
				super.underlayBackgroundColor = underlayBackgroundColor;
			}
			/**
			 * Get the sort state.
			 */
			get sortState() {
				return this[_].sortState;
			}
			/**
			 * Sets the sort state.
			 * If `null` to set, the sort state is initialized.
			 */
			set sortState(sortState) {
				const oldState = this.sortState;
				let oldField;
				if (oldState.col >= 0 && oldState.row >= 0)
					oldField = this.getHeaderField(oldState.col, oldState.row);
				const newState = (this[_].sortState =
					sortState != null
						? sortState
						: {
								col: -1,
								row: -1,
								order: void 0
							});
				let newField;
				if (newState.col >= 0 && newState.row >= 0)
					newField = this.getHeaderField(newState.col, newState.row);
				if (oldField != null && oldField !== newField)
					this.setHeaderValue(oldState.col, oldState.row, void 0);
				if (newField != null)
					this.setHeaderValue(newState.col, newState.row, newState.order);
			}
			/**
			 * Get the header values.
			 */
			get headerValues() {
				return this[_].headerValues || (this[_].headerValues = /* @__PURE__ */ new Map());
			}
			/**
			 * Sets the header values.
			 */
			set headerValues(headerValues) {
				this[_].headerValues = headerValues || /* @__PURE__ */ new Map();
			}
			/**
			 * Get the field of the given column index.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index.
			 * @return {*} The field object.
			 */
			getField(col, row) {
				return this[_].layoutMap.getBody(
					col,
					row !== null && row !== void 0 ? row : this[_].layoutMap.headerRowCount
				).field;
			}
			/**
			 * Get the column define of the given column index.
			 * @param  {number} col The column index.
			 * @param  {number} row The row index.
			 * @return {*} The column define object.
			 */
			getColumnDefine(col, row) {
				return this[_].layoutMap.getBody(
					col,
					row !== null && row !== void 0 ? row : this[_].layoutMap.headerRowCount
				).define;
			}
			getColumnType(col, row) {
				return this[_].layoutMap.getBody(col, row).columnType;
			}
			getColumnAction(col, row) {
				return this[_].layoutMap.getBody(col, row).action;
			}
			/**
			 * Get the header field of the given header cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The header row index.
			 * @return {*} The field object.
			 */
			getHeaderField(col, row) {
				const hd = this[_].layoutMap.getHeader(col, row);
				return hd.field;
			}
			/**
			 * Get the header define of the given header cell.
			 * @param  {number} col The column index.
			 * @param  {number} row The header row index.
			 * @return {*} The header define object.
			 */
			getHeaderDefine(col, row) {
				const hd = this[_].layoutMap.getHeader(col, row);
				return hd.define;
			}
			/**
			 * Get the record of the given row index.
			 * @param  {number} row The row index.
			 * @return {object} The record.
			 */
			getRowRecord(row) {
				if (row < this[_].layoutMap.headerRowCount) return void 0;
				else return this[_].dataSource.get(_getRecordIndexByRow(this, row));
			}
			/**
			 * Get the record index of the given row index.
			 * @param  {number} row The row index.
			 */
			getRecordIndexByRow(row) {
				return _getRecordIndexByRow(this, row);
			}
			/**
			 * Gets the row index starting at the given record index.
			 * @param  {number} index The record index.
			 */
			getRecordStartRowByRecordIndex(index) {
				return this[_].layoutMap.getRecordStartRowByRecordIndex(index);
			}
			/**
			 * Get the column index of the given field.
			 * @param  {*} field The field.
			 * @return {number} The column index.
			 * @deprecated use `getCellRangeByField` instead
			 */
			getColumnIndexByField(field) {
				var _range$start$col;
				const range = this.getCellRangeByField(field, 0);
				return (_range$start$col =
					range === null || range === void 0 ? void 0 : range.start.col) !== null &&
					_range$start$col !== void 0
					? _range$start$col
					: null;
			}
			/**
			 * Get the column index of the given field.
			 * @param  {*} field The field.
			 * @param  {number} index The record index
			 * @return {number} The column index.
			 */
			getCellRangeByField(field, index) {
				const { layoutMap } = this[_];
				const colObj = layoutMap.columnObjects.find(col => col.field === field);
				if (colObj) {
					const layoutRange = layoutMap.getBodyLayoutRangeById(colObj.id);
					const startRow = layoutMap.getRecordStartRowByRecordIndex(index);
					return {
						start: {
							col: layoutRange.start.col,
							row: startRow + layoutRange.start.row
						},
						end: {
							col: layoutRange.end.col,
							row: startRow + layoutRange.end.row
						}
					};
				}
				return null;
			}
			/**
			 * Focus the cell.
			 * @param  {*} field The field.
			 * @param  {number} index The record index
			 * @return {void}
			 */
			focusGridCell(field, index) {
				var _this$getCellRangeByF;
				const {
					start: { col: startCol, row: startRow },
					end: { col: endCol, row: endRow }
				} = this.selection.range;
				const newFocus =
					(_this$getCellRangeByF = this.getCellRangeByField(field, index)) === null ||
					_this$getCellRangeByF === void 0
						? void 0
						: _this$getCellRangeByF.start;
				if (newFocus == null) return;
				this.focusCell(newFocus.col, newFocus.row);
				this.selection.select = newFocus;
				this.invalidateGridRect(startCol, startRow, endCol, endRow);
				this.invalidateCell(newFocus.col, newFocus.row);
			}
			/**
			 * Scroll to where cell is visible.
			 * @param  {*} field The field.
			 * @param  {number} index The record index
			 * @return {void}
			 */
			makeVisibleGridCell(field, index) {
				var _this$getCellRangeByF2, _cell$col, _cell$row;
				const cell =
					(_this$getCellRangeByF2 = this.getCellRangeByField(field, index)) === null ||
					_this$getCellRangeByF2 === void 0
						? void 0
						: _this$getCellRangeByF2.start;
				this.makeVisibleCell(
					(_cell$col = cell === null || cell === void 0 ? void 0 : cell.col) !== null &&
						_cell$col !== void 0
						? _cell$col
						: 0,
					(_cell$row = cell === null || cell === void 0 ? void 0 : cell.row) !== null &&
						_cell$row !== void 0
						? _cell$row
						: this[_].layoutMap.headerRowCount
				);
			}
			getGridCanvasHelper() {
				return this[_].gridCanvasHelper;
			}
			/**
			 * Get cell range information for a given cell.
			 * @param {number} col column index of the cell
			 * @param {number} row row index of the cell
			 * @returns {object} cell range info
			 */
			getCellRange(col, row) {
				return _getCellRange(this, col, row);
			}
			/**
			 * Get header range information for a given cell.
			 * @param {number} col column index of the cell
			 * @param {number} row row index of the cell
			 * @returns {object} cell range info
			 * @deprecated use `getCellRange` instead
			 */
			getHeaderCellRange(col, row) {
				return this.getCellRange(col, row);
			}
			getCopyCellValue(col, row, range) {
				const cellRange = _getCellRange(this, col, row);
				const startCol = range
					? Math.max(range.start.col, cellRange.start.col)
					: cellRange.start.col;
				const startRow = range
					? Math.max(range.start.row, cellRange.start.row)
					: cellRange.start.row;
				if (startCol !== col || startRow !== row) return "";
				const value = _getCellValue(this, col, row);
				if (row < this[_].layoutMap.headerRowCount) {
					const headerData = this[_].layoutMap.getHeader(col, row);
					return headerData.headerType.getCopyCellValue(value, this, {
						col,
						row
					});
				}
				const columnData = this[_].layoutMap.getBody(col, row);
				return columnData.columnType.getCopyCellValue(value, this, {
					col,
					row
				});
			}
			onDrawCell(col, row, context) {
				const { layoutMap } = this[_];
				let draw;
				let style$1;
				if (row < layoutMap.headerRowCount) {
					const hd = layoutMap.getHeader(col, row);
					draw = hd.headerType.onDrawCell;
					({ style: style$1 } = hd);
					_updateRect(this, col, row, context);
				} else {
					const column = layoutMap.getBody(col, row);
					draw = column.columnType.onDrawCell;
					({ style: style$1 } = column);
					_updateRect(this, col, row, context);
				}
				const cellValue = _getCellValue(this, col, row);
				if (this.rowCount <= row) return void 0;
				return _onDrawValue(
					this,
					cellValue,
					context,
					{
						col,
						row
					},
					style$1,
					draw
				);
			}
			doGetCellValue(col, row, valueCallback) {
				if (row < this[_].layoutMap.headerRowCount) return false;
				else {
					const value = _getCellValue(this, col, row);
					if (isPromise(value)) return false;
					valueCallback(value);
				}
				return true;
			}
			doChangeValue(col, row, changeValueCallback) {
				if (row < this[_].layoutMap.headerRowCount) return false;
				else {
					const record = this.getRowRecord(row);
					if (isPromise(record)) return false;
					const before = _getCellValue(this, col, row);
					if (isPromise(before)) return false;
					const after = changeValueCallback(before);
					if (after === void 0) return false;
					const { field } = this[_].layoutMap.getBody(col, row);
					this.fireListeners(LG_EVENT_TYPE.BEFORE_CHANGE_VALUE, {
						col,
						row,
						record,
						field,
						value: after,
						oldValue: before
					});
					return then(_setCellValue(this, col, row, after), ret => {
						if (ret) {
							const { field: field$1 } = this[_].layoutMap.getBody(col, row);
							this.fireListeners(LG_EVENT_TYPE.CHANGED_VALUE, {
								col,
								row,
								record,
								field: field$1,
								value: after,
								oldValue: before
							});
						}
						return ret;
					});
				}
			}
			doSetPasteValue(text, test) {
				_onRangePaste.call(this, text, test);
			}
			getHeaderValue(col, row) {
				const field = this.getHeaderField(col, row);
				return this.headerValues.get(field);
			}
			setHeaderValue(col, row, newValue) {
				const field = this.getHeaderField(col, row);
				const oldValue = this.headerValues.get(field);
				this.headerValues.set(field, newValue);
				this.fireListeners(LG_EVENT_TYPE.CHANGED_HEADER_VALUE, {
					col,
					row,
					field,
					value: newValue,
					oldValue
				});
			}
			getLayoutCellId(col, row) {
				return this[_].layoutMap.getCellId(col, row);
			}
			bindEventsInternal() {
				const grid = this;
				grid.listen(LG_EVENT_TYPE.SELECTED_CELL, e => {
					const range = _getCellRange(this, e.col, e.row);
					const {
						start: { col: startCol, row: startRow },
						end: { col: endCol, row: endRow }
					} = range;
					if (startCol !== endCol || startRow !== endRow) this.invalidateCellRange(range);
				});
				grid.listen(LG_EVENT_TYPE.PASTE_CELL, e => {
					if (!this[_].allowRangePaste) return;
					const { start, end } = this.selection.range;
					if (!e.multi && cellEquals(start, end)) return;
					const { layoutMap } = this[_];
					if (start.row < layoutMap.headerRowCount) return;
					event.cancel(e.event);
					_onRangePaste.call(this, e.normalizeValue);
				});
				grid.listen(LG_EVENT_TYPE.DELETE_CELL, e => {
					const { start } = this.selection.range;
					const { layoutMap } = this[_];
					if (start.row < layoutMap.headerRowCount) return;
					event.cancel(e.event);
					_onRangeDelete.call(this);
				});
			}
			getMoveLeftColByKeyDownInternal({ col, row }) {
				const {
					start: { col: startCol }
				} = _getCellRange(this, col, row);
				col = startCol;
				return super.getMoveLeftColByKeyDownInternal({
					col,
					row
				});
			}
			getMoveRightColByKeyDownInternal({ col, row }) {
				const {
					end: { col: endCol }
				} = _getCellRange(this, col, row);
				col = endCol;
				return super.getMoveRightColByKeyDownInternal({
					col,
					row
				});
			}
			getMoveUpRowByKeyDownInternal({ col, row }) {
				const {
					start: { row: startRow }
				} = _getCellRange(this, col, row);
				row = startRow;
				return super.getMoveUpRowByKeyDownInternal({
					col,
					row
				});
			}
			getMoveDownRowByKeyDownInternal({ col, row }) {
				const {
					end: { row: endRow }
				} = _getCellRange(this, col, row);
				row = endRow;
				return super.getMoveDownRowByKeyDownInternal({
					col,
					row
				});
			}
			getOffsetInvalidateCells() {
				return 1;
			}
			getCopyRangeInternal(range) {
				const { start } = this.getCellRange(range.start.col, range.start.row);
				const { end } = this.getCellRange(range.end.col, range.end.row);
				return {
					start,
					end
				};
			}
			fireListeners(type, ...event$1) {
				return super.fireListeners(type, ...event$1);
			}
		};

		//#endregion
		//#region src/js/get-internal.ts
		function getInternal() {
			console.warn("use internal!!");
			return {
				color: color_exports,
				sort: sort_exports,
				calc: calc_exports,
				symbolManager: symbolManager_exports,
				path2DManager: path2DManager_exports,
				pasteUtils: paste_utils_exports
			};
		}

		//#endregion
		//#region src/js/main.ts
		/** @private */
		function getIcons() {
			return get();
		}
		var main_default = {
			core: core_exports,
			tools: tools_exports,
			ListGrid,
			columns: columns_exports,
			headers: headers_exports,
			themes: themes_exports,
			data: data_exports,
			GridCanvasHelper,
			register: register_exports,
			get icons() {
				return getIcons();
			}
		};
		Object.defineProperty(themes_exports, "default", {
			enumerable: false,
			configurable: true,
			get() {
				return getDefault();
			},
			set(defaultTheme) {
				setDefault(defaultTheme);
			}
		});
		Object.defineProperty(themes_exports, "choices", {
			enumerable: false,
			configurable: true,
			get() {
				return getChoices();
			}
		});

		//#endregion
		exports.GridCanvasHelper = GridCanvasHelper;
		exports.ListGrid = ListGrid;
		exports._getInternal = getInternal;
		Object.defineProperty(exports, "columns", {
			enumerable: true,
			get: function () {
				return columns_exports;
			}
		});
		Object.defineProperty(exports, "core", {
			enumerable: true,
			get: function () {
				return core_exports;
			}
		});
		Object.defineProperty(exports, "data", {
			enumerable: true,
			get: function () {
				return data_exports;
			}
		});
		exports.default = main_default;
		exports.getIcons = getIcons;
		Object.defineProperty(exports, "headers", {
			enumerable: true,
			get: function () {
				return headers_exports;
			}
		});
		Object.defineProperty(exports, "register", {
			enumerable: true,
			get: function () {
				return register_exports;
			}
		});
		Object.defineProperty(exports, "themes", {
			enumerable: true,
			get: function () {
				return themes_exports;
			}
		});
		Object.defineProperty(exports, "tools", {
			enumerable: true,
			get: function () {
				return tools_exports;
			}
		});
	})(PRIVATE_GLOBAL.cheetahGrid);
}
</script>
