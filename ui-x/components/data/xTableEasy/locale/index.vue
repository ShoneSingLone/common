<script lang="ts">
export default async function () {
	// 为 utils/index.vue 提供 locale 包装，避免直接依赖 .js 文件
	const localeModule = await _.$importVue("vue-easytable/packages/ve-locale");
	const locale = localeModule && localeModule.default ? localeModule.default : localeModule;

	function createI18N(compName) {
		return function (path, ...args) {
			let result = "";
			const messages = locale && _.isFunction(locale.getMessage) ? locale.getMessage() : {};

			if (messages[compName]) {
				const message = messages[compName][path];
				result = _.isFunction(message) ? message(...args) : message;
			} else {
				console.error(`can't find ${compName} in ${JSON.stringify(messages)}`);
			}

			return result;
		};
	}

	return {
		createI18N
	};
}
</script>
