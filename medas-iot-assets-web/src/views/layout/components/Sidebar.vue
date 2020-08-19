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
			'sidebar',
			'menus'
        ])
    },
    data() {
        return {
            menuData: []
        }
	},
	mounted() {
		this.menuData = []
		for (let i = 0; i < this.menus.length; i++) {
			let children = []
			for (let j = 0; j < this.menus[i].children.length; j++) {
				if (this.menus[i].children[j].hidden === 1) {
					children.push({
						name: this.menus[i].children[j].title,
						path: this.menus[i].children[j].name
					})
				}
			}
			this.menuData.push({
				name: this.menus[i].title,
				path: this.menus[i].name,
				icon: this.menus[i].icon,
				items: children
			})
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
