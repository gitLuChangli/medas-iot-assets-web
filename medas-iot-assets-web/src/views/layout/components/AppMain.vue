<template>
	<el-main class="app-main">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</el-main>
</template>
<script>
export default {
    name: 'AppMain'
}
</script>
