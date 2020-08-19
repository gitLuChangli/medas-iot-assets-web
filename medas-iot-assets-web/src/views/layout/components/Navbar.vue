<template>
	<el-header class="header">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb></breadcrumb>
		<el-dropdown class="dd">
			<el-button class="btn">
				<el-avatar :size="size" :src="avatar" class="icon"></el-avatar>
				<span>{{mine.username}} / {{mine.nickname}}</span>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</el-button>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="infoClick">
					<i class="el-icon-user" />個人信息
				</el-dropdown-item>
				<el-dropdown-item @click.native="logoutClick">
					<i class="el-icon-switch-button" />登出
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<el-badge :value="v" class="u-bage" :hidden="v == 0">
			<i class="el-icon-message-solid" />
		</el-badge>
		<i class="el-icon-monitor menu-btn" style="float: right" />
	</el-header>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Hamburger from '@/components/Hamburger'
	import Breadcrumb from '@/components/Breadcrumb'
	export default {
		name: 'Navbar',
		components: {
			Breadcrumb,
			Hamburger
		},
		computed: {
			...mapGetters([
				'sidebar',
				'avatar',
				'mine'
			])
		},
		data() {
			return {
				opened: false,
				size: 28,
				v: 0
			}
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch('ToggleSideBar')
			},
			logoutClick: function(e) {
				console.log(`logout click`)
				this.$store.dispatch('Logout').then(_ => {
					self.location = '/#/login'
				})
			},
			infoClick: function(e) {
				self.location = '/#/mine/index'
			}
		}
	}
</script>
<style scoped>
	.bc {
		line-height: 60px;
		padding-left: 16px;
		float: left;
	}
	.dd {
		float: right;
		background: transparent;
	}
	.dd .btn {
		height: 59px;
		margin: 0px;
		padding: 0px 8px;
		line-height: 60px;
		border: none;
	}
	.dd .icon {
		margin: 16px 6px;
		padding: 0px;
		float: left;
	}
</style>
