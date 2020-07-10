<template>
	<el-breadcrumb separator-class="el-icon-arrow-right" class="app-breadcrumb" separator="/">		
		<el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
			<span
				v-if="item.redirect === 'noredirect' || index == levelList.length-1"
				class="no-redirect"
			>{{item.meta.title}}</span>
			<router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
		</el-breadcrumb-item>		
	</el-breadcrumb>
</template>
<script>
	export default {
		name: 'Breadcrumb',
		created() {
            this.getBreadcrumb()
            console.log(`Breadcurmb load`)
		},
		data() {
			return {
				levelList: null
			}
		},
		watch: {
			$route() {
				this.getBreadcrumb()
			}
		},
		methods: {
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0]
				if (first && first.name !== 'home') {
					matched = [{ path: '/home', meta: { title: '首頁' } }].concat(matched)
				}
				this.levelList = matched
			}
		}
	}
</script>
<style scoped>
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;		
		line-height: 60px;
		margin-left: 10px;
	}
	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
</style>
