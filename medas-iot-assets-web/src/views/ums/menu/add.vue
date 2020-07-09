<template>
	<menu-detail :modify="false"></menu-detail>
</template>
<script>
	import MenuDetail from './components/MenuDetail'
	export default {
		name: 'addMenu',
		components: { MenuDetail }
	}
</script>