<template>
	<div class="xSkeleton" :class="`xSkeleton--${type}`">
		<!-- table 骨架屏 -->
		<template v-if="type === 'table'">
			<div class="xSkeleton__header">
				<span
					v-for="(w, i) in cpt_col_widths"
					:key="'h' + i"
					class="xSkeleton__cell"
					:style="{ width: w }" />
			</div>
			<div class="xSkeleton__body">
				<div v-for="ri in rows" :key="'r' + ri" class="xSkeleton__row">
					<span
						v-for="(w, ci) in cpt_col_widths"
						:key="ci"
						class="xSkeleton__cell"
						:style="{ width: w }" />
				</div>
			</div>
		</template>

		<!-- list 骨架屏 -->
		<template v-else-if="type === 'list'">
			<div v-for="i in rows" :key="i" class="xSkeleton__list-item">
				<div class="xSkeleton__avatar" />
				<div class="xSkeleton__list-content">
					<div class="xSkeleton__text" :style="{ width: cpt_list_title_width(i) }" />
					<div
						class="xSkeleton__text xSkeleton__text--short"
						:style="{ width: cpt_list_sub_width(i) }" />
				</div>
			</div>
		</template>

		<!-- card 骨架屏 -->
		<template v-else-if="type === 'card'">
			<div class="xSkeleton--card">
				<div v-for="i in cpt_card_count" :key="i" class="xSkeleton__card">
					<div class="xSkeleton__text" :style="{ width: '60%' }" />
					<div class="xSkeleton__block" :style="{ height: '80px', margin: '12px 0' }" />
					<div class="xSkeleton__text xSkeleton__text--short" :style="{ width: '40%' }" />
				</div>
			</div>
		</template>

		<!-- form 骨架屏 -->
		<template v-else-if="type === 'form'">
			<div v-for="i in rows" :key="i" class="xSkeleton__form-row">
				<div class="xSkeleton__text" :style="{ width: cpt_form_label_width(i) }" />
				<div class="xSkeleton__cell" :style="{ width: cpt_form_input_width(i) }" />
			</div>
		</template>

		<!-- sidebar 骨架屏 -->
		<template v-else-if="type === 'sidebar'">
			<div
				v-for="i in rows"
				:key="i"
				class="xSkeleton__sidebar-item"
				:style="{ paddingLeft: cpt_sidebar_indent(i) + 'px' }">
				<div class="xSkeleton__text" :style="{ width: cpt_sidebar_text_width(i) }" />
			</div>
		</template>

		<!-- detail 骨架屏 -->
		<template v-else-if="type === 'detail'">
			<div class="xSkeleton--detail">
				<div
					class="xSkeleton__text"
					:style="{ width: '46%', height: '22px', marginBottom: '20px' }" />
				<div v-for="i in rows" :key="'d' + i" class="xSkeleton__form-row">
					<div class="xSkeleton__text" :style="{ width: cpt_detail_label_width(i) }" />
					<div class="xSkeleton__text" :style="{ width: cpt_detail_value_width(i) }" />
				</div>
				<div :style="{ height: '24px' }" />
				<div class="xSkeleton__text" :style="{ width: '100%', marginBottom: '8px' }" />
				<div class="xSkeleton__text" :style="{ width: '92%', marginBottom: '8px' }" />
				<div class="xSkeleton__text" :style="{ width: '68%' }" />
			</div>
		</template>

		<!-- 未知 type 降级为 table -->
		<div v-else class="xSkeleton__body">
			<div v-for="ri in rows" :key="'r' + ri" class="xSkeleton__row">
				<span class="xSkeleton__cell" :style="{ width: '100%' }" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	/* 【需求】2026-08-12 骨架屏视觉组件：6 种布局类型纯占位渲染，配合 _.$syncSkeleton 消费 */
	return defineComponent({
		props: {
			type: {
				type: String,
				default: "table"
			},
			rows: {
				type: Number,
				default: 5
			},
			cols: {
				type: Number,
				default: 4
			}
		},
		computed: {
			cpt_col_widths() {
				const base = ["28%", "16%", "22%", "18%", "16%"];
				return Array.from({ length: this.cols }, (_, i) => base[i % base.length]);
			},
			cpt_card_count() {
				return Math.min(this.rows, 6);
			}
		},
		methods: {
			cpt_list_title_width(i) {
				return 60 + ((i - 1) % 4) * 8 + "%";
			},
			cpt_list_sub_width(i) {
				return 40 + ((i - 1) % 3) * 10 + "%";
			},
			cpt_form_label_width(i) {
				return 20 + ((i - 1) % 3) * 5 + "%";
			},
			cpt_form_input_width(i) {
				return 50 + ((i - 1) % 2) * 10 + "%";
			},
			cpt_sidebar_indent(i) {
				return ((i - 1) % 4) * 12;
			},
			cpt_sidebar_text_width(i) {
				return 50 + ((i - 1) % 3) * 10 + "%";
			},
			cpt_detail_label_width(i) {
				return 16 + ((i - 1) % 3) * 4 + "%";
			},
			cpt_detail_value_width(i) {
				return 36 + ((i - 1) % 4) * 8 + "%";
			}
		}
	});
}
</script>

<style lang="less">
/* 【需求】2026-08-12 骨架屏全局样式：shimmer 动画 + 6 种预设布局，CSS 变量钩子对齐 xUI 设计令牌 */
:root {
	--x-skeleton-bg: #e8e8ed;
	--x-skeleton-shimmer-base: #e8e8ed;
	--x-skeleton-shimmer-highlight: #f5f5f7;
	--x-skeleton-radius: 6px;
	--x-skeleton-card-bg: #fff;
	--x-skeleton-card-border: #eee;
	--x-skeleton-card-radius: 8px;
}

@keyframes x-skeleton-shimmer {
	0% {
		background-position: -200% 0;
	}
	100% {
		background-position: 200% 0;
	}
}

.xSkeleton {
	padding: 16px;
	box-sizing: border-box;
}

.xSkeleton__cell,
.xSkeleton__text,
.xSkeleton__avatar,
.xSkeleton__block {
	background-color: var(--x-skeleton-bg);
	background-image: linear-gradient(
		90deg,
		var(--x-skeleton-shimmer-base) 25%,
		var(--x-skeleton-shimmer-highlight) 50%,
		var(--x-skeleton-shimmer-base) 75%
	);
	background-size: 200% 100%;
	animation: x-skeleton-shimmer 1.5s infinite;
	border-radius: var(--x-skeleton-radius);
}

.xSkeleton__cell {
	height: 14px;
	display: inline-block;
	vertical-align: middle;
}

.xSkeleton__text {
	height: 14px;
	margin-bottom: 8px;
}

.xSkeleton__text--short {
	height: 12px;
}

.xSkeleton__avatar {
	width: 36px;
	height: 36px;
	border-radius: 50%;
	flex-shrink: 0;
}

.xSkeleton__block {
	width: 100%;
}

/* table */
.xSkeleton--table .xSkeleton__header {
	margin-bottom: 12px;
	padding-bottom: 10px;
	border-bottom: 1px solid var(--x-skeleton-card-border);
}

.xSkeleton--table .xSkeleton__header .xSkeleton__cell {
	height: 16px;
	margin-right: 1%;
}

.xSkeleton--table .xSkeleton__row {
	margin-bottom: 10px;
}

.xSkeleton--table .xSkeleton__row .xSkeleton__cell {
	margin-right: 1%;
}

/* list */
.xSkeleton__list-item {
	display: flex;
	align-items: center;
	margin-bottom: 14px;
}

.xSkeleton__list-content {
	flex: 1;
	margin-left: 12px;
}

/* card */
.xSkeleton--card {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 16px;
}

.xSkeleton__card {
	padding: 16px;
	background: var(--x-skeleton-card-bg);
	border-radius: var(--x-skeleton-card-radius);
	border: 1px solid var(--x-skeleton-card-border);
}

/* form */
.xSkeleton__form-row {
	display: flex;
	align-items: center;
	margin-bottom: 14px;
	gap: 12px;
}

.xSkeleton__form-row .xSkeleton__cell {
	height: 32px;
}

/* sidebar */
.xSkeleton__sidebar-item {
	margin-bottom: 8px;
	padding: 6px 0;
}

/* detail */
.xSkeleton--detail {
	max-width: 800px;
}
</style>
