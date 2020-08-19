<template>
	<el-footer class="footer">
		Copyright © {{year}} medasiot C次集團華南檢測中心 智能量測 / 物聯網
		<b>系統版本：1.0.0.1</b>
	</el-footer>
</template>
<script>
export default {
	name: 'Copyright',
	data() {
		return {
			year: new Date().getFullYear()
		}
	}
}
</script>
