<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	/* 【需求】2026-08-12 骨架屏视觉组件：纯占位渲染，无异步加载逻辑
	 * 6 种布局类型，通过 props (skeletonType/skeletonRows/skeletonCols) 切换
	 * 异步加载逻辑由 _.$syncSkeleton (functional component) 管理
	 */

	/** 各列不等宽，模拟真实表格列宽变化 */
	function colWidths(cols) {
		const base = ["28%", "16%", "22%", "18%", "16%"];
		return Array.from({ length: cols }, (_, i) => base[i % base.length]);
	}

	/** 根据 type 渲染对应布局的骨架屏 VNode
	 * 【需求】2026-08-12 props 统一加 skeleton 前缀（skeletonType/skeletonRows/skeletonCols），
	 * 方便父组件透传、减少字段冲突，与 $syncSkeleton 入参字段名保持一致
	 */
	function renderSkeleton(h, props) {
		const { skeletonType: type, skeletonRows: rows, skeletonCols: cols } = props;

		if (type === "table") {
			const widths = colWidths(cols);
			return h("div", { class: "xSkeleton xSkeleton--table" }, [
				h("div", { class: "xSkeleton__header" },
					widths.map((w, i) => h("span", { class: "xSkeleton__cell", style: { width: w }, key: "h" + i }))
				),
				h("div", { class: "xSkeleton__body" },
					Array.from({ length: rows }, (_, ri) =>
						h("div", { class: "xSkeleton__row", key: "r" + ri },
							widths.map((w, ci) => h("span", { class: "xSkeleton__cell", style: { width: w }, key: ci }))
						)
					)
				)
			]);
		}

		if (type === "list") {
			return h("div", { class: "xSkeleton xSkeleton--list" },
				Array.from({ length: rows }, (_, i) =>
					h("div", { class: "xSkeleton__list-item", key: i }, [
						h("div", { class: "xSkeleton__avatar" }),
						h("div", { class: "xSkeleton__list-content" }, [
							h("div", { class: "xSkeleton__text", style: { width: 60 + (i % 4) * 8 + "%" } }),
							h("div", { class: "xSkeleton__text xSkeleton__text--short", style: { width: 40 + (i % 3) * 10 + "%" } })
						])
					])
				)
			);
		}

		if (type === "card") {
			const count = Math.min(rows, 6);
			return h("div", { class: "xSkeleton xSkeleton--card" },
				Array.from({ length: count }, (_, i) =>
					h("div", { class: "xSkeleton__card", key: i }, [
						h("div", { class: "xSkeleton__text", style: { width: "60%" } }),
						h("div", { class: "xSkeleton__block", style: { height: "80px", margin: "12px 0" } }),
						h("div", { class: "xSkeleton__text xSkeleton__text--short", style: { width: "40%" } })
					])
				)
			);
		}

		if (type === "form") {
			return h("div", { class: "xSkeleton xSkeleton--form" },
				Array.from({ length: rows }, (_, i) =>
					h("div", { class: "xSkeleton__form-row", key: i }, [
						h("div", { class: "xSkeleton__text", style: { width: 20 + (i % 3) * 5 + "%" } }),
						h("div", { class: "xSkeleton__cell", style: { width: 50 + (i % 2) * 10 + "%" } })
					])
				)
			);
		}

		if (type === "sidebar") {
			return h("div", { class: "xSkeleton xSkeleton--sidebar" },
				Array.from({ length: rows }, (_, i) =>
					h("div", { class: "xSkeleton__sidebar-item", key: i, style: { paddingLeft: (i % 4) * 12 + "px" } }, [
						h("div", { class: "xSkeleton__text", style: { width: 50 + (i % 3) * 10 + "%" } })
					])
				)
			);
		}

		if (type === "detail") {
			return h("div", { class: "xSkeleton xSkeleton--detail" }, [
				h("div", { class: "xSkeleton__text", style: { width: "46%", height: "22px", marginBottom: "20px" } }),
				...Array.from({ length: rows }, (_, i) =>
					h("div", { class: "xSkeleton__form-row", key: "d" + i }, [
						h("div", { class: "xSkeleton__text", style: { width: 16 + (i % 3) * 4 + "%" } }),
						h("div", { class: "xSkeleton__text", style: { width: 36 + (i % 4) * 8 + "%" } })
					])
				),
				h("div", { style: { height: "24px" } }),
				h("div", { class: "xSkeleton__text", style: { width: "100%", marginBottom: "8px" } }),
				h("div", { class: "xSkeleton__text", style: { width: "92%", marginBottom: "8px" } }),
				h("div", { class: "xSkeleton__text", style: { width: "68%" } })
			]);
		}

		/* 未知 type 降级 */
		return h("div", { class: "xSkeleton xSkeleton--table" }, [
			h("div", { class: "xSkeleton__body" },
				Array.from({ length: rows }, (_, ri) =>
					h("div", { class: "xSkeleton__row", key: "r" + ri }, [
						h("span", { class: "xSkeleton__cell", style: { width: "100%" } })
					])
				)
			)
		]);
	}

	return defineComponent({
		props: {
			/* 【需求】2026-08-12 props 统一加 skeleton 前缀，方便透传、减少字段冲突 */
			skeletonType: {
				type: String,
				default: "table"
			},
			skeletonRows: {
				type: Number,
				default: 5
			},
			skeletonCols: {
				type: Number,
				default: 4
			}
		},
		render(h) {
			return renderSkeleton(h, this);
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
	0% { background-position: -200% 0; }
	100% { background-position: 200% 0; }
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
