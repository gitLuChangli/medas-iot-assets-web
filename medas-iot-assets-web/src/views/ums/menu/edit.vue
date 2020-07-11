<template>
    <div>
        <menu-detail :modify="true"></menu-detail>
    </div>
</template>
<script>
	import MenuDetail from './components/MenuDetail'
	export default {
		name: 'editMenu',
		components: { MenuDetail }
	}
</script>
