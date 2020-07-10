<template>
	<el-aside :class="sidebar.opened ? 'l-200' : 'l-66'">
		<div class="logo-container">
			<img
				:src="sidebar.opened ? '../../static/ic_logo.png' :'../../static/ic_logo2.png'"
				:class="sidebar.opened ? 'logo' : 'logo2'"
			/>
		</div>
		<el-menu
			background-color="#393f4c"
			text-color="#ebf6f7"
			active-text-color="#ffffff"
			style="border: none"
			show-timeout="100"
			hide-timeout="100"
			:router="true"
			:unique-opened="true"
			:collapse="!sidebar.opened"
			:default-active="$route.path"
			:collapse-transition="false"
		>
			<el-submenu :index="item.path" v-for="(item, index) in menuData" :key="index">
				<template slot="title">
					<i :class="item.icon"></i>
					<span>{{item.name}}</span>
				</template>
				<el-menu-item
					v-for="(item2, index2) in item.items"
					:key="index2"
					:index="item2.path"
				>{{item2.name}}</el-menu-item>
			</el-submenu>
		</el-menu>
	</el-aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'sidebar'
        ])
    },
    data() {
        return {          
            menuData: [
					{
						name: '首頁',
						path: '/',
						icon: 'el-icon-s-data',
						items: [
							{
								name: '主控台',
								path: '/main'
							},
							{
								name: '監控台',
								path: '/view'
							},
							{
								name: '工作台',
								path: '/workspace'
							}
						]
					},
					{
						name: '用戶管理',
						path: '/user',
						icon: 'el-icon-s-custom',
						items: [
							{
								name: '用戶列表',
								path: '/user/'
							}
						]
					},
					{
						name: '應用管理',
						path: '/app',
						icon: 'el-icon-s-promotion',
						items: [
							{
								name: '應用列表',
								path: '/app/list'
							},
							{
								name: '應用版本',
								path: '/app/version'
							},
							{
								name: '安排升級',
								path: '/app/task'
							},
							{
								name: '升級記錄',
								path: '/app/records'
							}
						]
					},
					{
						name: '消息管理',
						path: '/msg',
						icon: 'el-icon-s-comment',
						items: []
					},
					{
						name: '設備管理',
						path: '/device/',
						icon: 'el-icon-cpu',
						items: [
							{
								name: '設備類型',
								path: '/device/type'
							},
							{
								name: '設備版本',
								path: '/device/version'
							},
							{
								name: '錄入設備',
								path: '/device/add'
							},
							{
								name: '設備列表',
								path: '/device/list'
							},
							{
								name: '生產數據',
								path: '/device/data'
							},
							{
								name: '異常數據',
								path: '/device/exception'
							}
						]
					},
					{
						name: '系統管理',
						path: '/system',
						icon: 'el-icon-s-tools',
						items: [{
							name: '角色列表',
							path: '/ums/role'
						},
						{
							name: '菜單列表',
							path: '/ums/menu'
						},
						{
							name: '資源列表',
							path: '/ums/resource'
						},
						{
							name: '部門列表',
							path: '/ums/company'
						},
						{
							name: '用戶列表',
							path: '/ums/user'
						}]
					},
					{
						name: '個人中心',
						path: '/me',
						icon: 'el-icon-s-help',
						items: []
					}
				]
        }
    },
    methods: {        
    }
}
</script>
<style scoped>
.l-200 {
    width: 200px !important;
    background: #393f4c !important;
}
.l-66 {
    width: 66px !important;
    background: #393f4c !important;
}
</style>