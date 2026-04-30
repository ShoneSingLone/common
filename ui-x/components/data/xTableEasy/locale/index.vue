<script lang="ts">
export default async function () {
	function createI18N(compName) {
		return function (path, ...args) {
			let result = "";
			const messages = {};

			if (messages[compName]) {
				const message = messages[compName][path];
				result = _.isFunction(message) ? message(...args) : message;
			}

			return result || path;
		};
	}

	return {
		createI18N
	};
}
</script>