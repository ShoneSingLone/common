<script lang="ts">
export default async function () {
	// prefix
	const PREFIX_CLS = "ve-contextmenu-";

	// comps name
	const COMPS_NAME = {
		VE_CONTEXTMENU: "VeContextmenu"
	};

	// emit events
	const EMIT_EVENTS = {
		ON_NODE_CLICK: "on-node-click"
	};

	// init data
	const INIT_DATA = {
		// PARENT_ID: 0,
		PARENT_DEEP: -1
	};

	// contextmenu types
	const CONTEXTMENU_NODE_TYPES = {
		// Separator
		SEPARATOR: "SEPARATOR"
	};

	// instance methods
	const INSTANCE_METHODS = {
		HIDE_CONTEXTMENU: "hideContextmenu"
	};

	return {
		PREFIX_CLS,
		COMPS_NAME,
		EMIT_EVENTS,
		INIT_DATA,
		CONTEXTMENU_NODE_TYPES,
		INSTANCE_METHODS
	};
}
</script>
