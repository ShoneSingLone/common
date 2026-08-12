<template>
	<div>
		<!-- 主菜单面板 -->
		<div
			v-show="visible"
			class="x-contextmenu"
			ref="menu"
			:style="cptRootStyle"
			@contextmenu.prevent
			@mouseleave="handleMenuLeave">
			<!-- content 模式：完全自定义渲染 -->
			<xRender v-if="content" :render="content" />
			<!-- menus 模式：默认菜单渲染 -->
			<template v-else>
				<template v-for="(item, idx) in menus">
					<div
						v-if="item.type === 'divider' || item.divider"
						class="x-contextmenu-divider"></div>
					<div
						v-else-if="item.render"
						class="x-contextmenu-item"
						:class="cptItemClass(item)"
						:ref="'item_' + idx"
						:key="item.id || idx"
						@click.stop="handleItemClick(item)"
						@mouseenter="handleItemEnter(idx, item)">
						<xRender :render="item.render" :payload="item" />
					</div>
					<div
						v-else
						class="x-contextmenu-item"
						:class="cptItemClass(item)"
						:ref="'item_' + idx"
						:key="item.id || idx"
						@click.stop="handleItemClick(item)"
						@mouseenter="handleItemEnter(idx, item)">
						<xIcon
							v-if="item.icon"
							:icon="item.icon"
							:size="14"
							class="x-contextmenu-icon" />
						<span class="x-contextmenu-label">{{ item.label }}</span>
						<span v-if="item.children" class="x-contextmenu-arrow">▶</span>
					</div>
				</template>
			</template>
		</div>

		<!-- 子菜单面板（仅 menus 模式下使用） -->
		<div
			v-if="!content && cpt_subVisible"
			class="x-contextmenu"
			:style="cptSubStyle"
			@contextmenu.prevent
			@mouseenter="clearSubTimer"
			@mouseleave="handleSubLeave">
			<template v-for="(subItem, subIdx) in cpt_activeSub.children">
				<div
					v-if="subItem.type === 'divider' || subItem.divider"
					class="x-contextmenu-divider"></div>
				<div
					v-else
					class="x-contextmenu-item"
					:class="cptItemClass(subItem)"
					:key="subItem.id || subIdx"
					@click.stop="handleItemClick(subItem)">
					<xIcon
						v-if="subItem.icon"
						:icon="subItem.icon"
						:size="14"
						class="x-contextmenu-icon" />
					<span class="x-contextmenu-label">{{ subItem.label }}</span>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	return defineComponent({
		data() {
			return {
				visible: false,
				x: 0,
				y: 0,
				menus: [],
				content: null /* Function | VNode — 完全自定义菜单内容，替换默认 menus 渲染 */,
				onNodeClick: null,
				onClose: null,
				refId: "",
				/* 子菜单状态 */
				cpt_activeSub: null,
				cpt_subX: 0,
				cpt_subY: 0,
				cpt_subTimer: null
			};
		},
		computed: {
			/* 主菜单定位（viewport 边界检测） */
			cptRootStyle() {
				const { x, y, menus } = this;
				const panelWidth = 180;
				const itemCount = menus?.length || 0;
				const dividerCount =
					menus?.filter(m => m.type === "divider" || m.divider).length || 0;
				const panelHeight = (itemCount - dividerCount) * 32 + dividerCount * 5;
				const vw = _.$single.win.width();
				const vh = _.$single.win.height();
				let px = x;
				let py = y;
				if (px + panelWidth > vw) px = vw - panelWidth - 8;
				if (py + panelHeight > vh) py = vh - panelHeight - 8;
				if (px < 0) px = 0;
				if (py < 0) py = 0;
				return { left: px + "px", top: py + "px" };
			},
			cpt_subVisible() {
				return this.visible && this.cpt_activeSub;
			},
			/* 子菜单定位（位于父菜单项右侧） */
			cptSubStyle() {
				const { cpt_activeSub, cpt_subX, cpt_subY } = this;
				if (!cpt_activeSub) return {};
				const subWidth = 180;
				const subCount = cpt_activeSub.children?.length || 0;
				const subHeight = subCount * 32;
				const vw = _.$single.win.width();
				const vh = _.$single.win.height();
				let sx = cpt_subX;
				let sy = cpt_subY;
				if (sx + subWidth > vw) sx = sx - subWidth - 180; /* 折返到左侧 */
				if (sy + subHeight > vh) sy = vh - subHeight - 8;
				if (sx < 0) sx = 8;
				if (sy < 0) sy = 8;
				return { left: sx + "px", top: sy + "px" };
			}
		},
		methods: {
			show() {
				this.visible = true;
			},
			hide() {
				this.visible = false;
				this.cpt_activeSub = null;
				if (this.onClose) this.onClose();
			},
			setPosition(x, y) {
				this.x = x;
				this.y = y;
			},
			/* 菜单项 hover → 显示子菜单 */
			handleItemEnter(idx, item) {
				if (!item.children) {
					this.cpt_activeSub = null;
					return;
				}
				this.clearSubTimer();
				this.cpt_activeSub = item;
				const itemEl = this.$refs["item_" + idx];
				if (itemEl && itemEl[0]) {
					const rect = itemEl[0].getBoundingClientRect();
					this.cpt_subX = rect.right;
					this.cpt_subY = rect.top;
				}
			},
			/* 菜单项点击 */
			handleItemClick(item) {
				if (item.disabled) return;
				if (item.children) return;
				if (this.onNodeClick) this.onNodeClick(item);
				this.hide();
			},
			cptItemClass(item) {
				return {
					"x-contextmenu-item--disabled": item.disabled,
					"x-contextmenu-item--has-sub": !!item.children
				};
			},
			/* 离开主菜单区域 → 延迟关闭子菜单 */
			handleMenuLeave() {
				this.cpt_subTimer = setTimeout(() => {
					this.cpt_activeSub = null;
				}, 200);
			},
			/* 进入子菜单 → 取消关闭定时器 */
			handleSubLeave() {
				this.cpt_subTimer = setTimeout(() => {
					this.cpt_activeSub = null;
				}, 200);
			},
			clearSubTimer() {
				if (this.cpt_subTimer) {
					clearTimeout(this.cpt_subTimer);
					this.cpt_subTimer = null;
				}
			}
		},
		beforeDestroy() {
			this.clearSubTimer();
		}
	});
}
</script>

<style lang="less">
/* ===== 右键菜单通用样式 ===== */
.x-contextmenu {
	position: fixed;
	z-index: 3000;
	min-width: 160px;
	padding: 4px 0;
	background: var(--color-surface-container, #fff);
	border: 1px solid var(--el-border-color-lighter, #e4e7ed);
	border-radius: 8px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
	font-size: 13px;
	user-select: none;
}

.x-contextmenu-item {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 12px;
	cursor: pointer;
	transition: background-color 0.12s ease;
	white-space: nowrap;

	&:hover {
		background: var(--color-surface-variant, #f5f5f5);
	}

	&--disabled {
		color: var(--el-text-color-placeholder, #c0c4cc);
		cursor: not-allowed;
		pointer-events: none;
	}

	&--has-sub {
		position: relative;
	}
}

.x-contextmenu-icon {
	flex-shrink: 0;
}

.x-contextmenu-label {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
}

.x-contextmenu-arrow {
	margin-left: 16px;
	font-size: 10px;
	opacity: 0.6;
}

.x-contextmenu-divider {
	height: 1px;
	margin: 4px 8px;
	background: var(--el-border-color-lighter, #e4e7ed);
}
</style>
