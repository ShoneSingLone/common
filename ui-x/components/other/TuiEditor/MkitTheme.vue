<style lang="less">
.x-mkit-wrapper {
	width: 100%;
	.x-mkit-img {
		min-width: 100px;
		max-width: 90%;
		border: 1px solid var(--el-border-color-lighter);
		background-color: #fff;
		color: var(--el-text-color-primary);
		transition: 0.3s;
	}

	.tui-icon {
		width: 36px;
		height: 36px;
		background-size: 100%;
		&.excel {
			background: url(/common/ui-x/components/other/TuiEditor/imgs/excel.svg) no-repeat center;
		}

		&.file {
			background: url(/common/ui-x/components/other/TuiEditor/imgs/file.svg) no-repeat center;
		}
	}
}
</style>
<script lang="ts">
export default async function () {
	const [hljs] = await Promise.all([_.$importVue("/common/libs/highlight.vue")]);

	function newImageDomString({ title, alt, href, prefix, index }) {
		if (prefix) {
			/* 文件下载地址 :根据prefix改变图标 */
			return `<div class="x-mkit-wrapper flex middle center" title="${title}" alt="${alt}" style="background-color: var(--el-background-color-lighter);">
			<a href="${href}" target="_blank" class="x-mkit-img flex middle center vertical x-padding" download="${title}">
				<div class="tui-icon ${prefix}"></div> 
				<span>${title}</span>
			</a>
		</div>`;
		} else {
			return `<div class="x-mkit-wrapper flex middle center" title="${title}" alt="${alt}" data-x-mkit-wrapper-index="${index}">
	<img class="x-mkit-img pointer" src="${href}" >
</div>`;
		}
	}

	class PreprocessHTML {
		constructor(html) {
			this.html = html;
			this.img().a().codejs();
		}

		img() {
			const $html = $(this.html);
			const imgArray = $html.find("img");
			_.each(imgArray, (img, index) => {
				const {
					alt,
					src,
					dataset: { prefix }
				} = img;
				this.html = this.html.replace(
					img.outerHTML,
					newImageDomString({ title: alt, alt, href: src, prefix, index })
				);
			});
			return this;
		}

		a() {
			const $html = $(this.html);
			const aArray = $html.find("a");
			_.each(aArray, (aDom, index) => {
				const aDomOuterHTML = aDom.outerHTML;
				const outerHTML = $(aDom).attr({
					target: "_blank",
					"data-markdwon-a-index": index
				})[0].outerHTML;
				this.html = this.html.replace(aDomOuterHTML, outerHTML);
			});
			return this;
		}

		codejs() {
			const $html = $(this.html);
			const codeArray = $html.find("code[data-language='js']");
			_.each(codeArray, (codeDom, index) => {
				const $codeDom = $(codeDom);
				const codeDomOuterHTML = codeDom.outerHTML;
				$codeDom.addClass("hljs");
				let codeDomInnerHTML = String($codeDom[0].innerHTML);
				const innerHTML = hljs.highlightAuto(codeDomInnerHTML).value;
				/* => TODO:解析出问题 实体符的转换*/
				const innerHTMLReplaceGreatThan = innerHTML.replace(/=\&amp;gt;/g, "=>");
				/* => 解析出问题 */
				$codeDom[0].innerHTML = innerHTMLReplaceGreatThan;
				this.html = this.html.replace(codeDomOuterHTML, $codeDom[0].outerHTML);
			});
			return this;
		}
	}

	return {
		PreprocessHTML
	};
}
</script>
