<template>
	<div>
		<div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
		</div>
		<div class="content-500">
			<el-tree
				:data="menuTreeList"
				show-checkbox
				default-expand-all
				node-key="id"
				ref="tree"
				highlight-current
				:props="defaultProps"
			/>
            <div style="margin-top: 20px" align="center">
                <el-button type="primary" size="small" @click="saveClick">保存</el-button>
                <el-button size="small" @click="clearClick">清空</el-button>
            </div>
		</div>
	</div>
</template>
<script>
    import { fetchTreeList } from '@/api/menu'
    import { listMenuByRole, allocMenu } from '@/api/role'
	export default {
		data() {
			return {
				menuTreeList: [],
				defaultProps: {
					children: 'children',
					label: 'title'
                },
                roleId: null
			}
        },
        mounted() {
            fetchTreeList().then(res => {
                if (res.data.code === 200) {
                    this.menuTreeList = res.data.data
                }
            })
            this.roleId = this.$route.query.roleId
            this.queryRoleMenus()
        },
		methods: {
            queryRoleMenus() {
                listMenuByRole(this.roleId).then(res => {
                    if (res.data.code === 200) {
                        let menus = res.data.data
                        let checkedIds = []
                        if (menus !== null && menus.length > 0) {
                            for (var i = 0; i < menus.length; i++) {
                                var menu = menus[i]
                                if (menu.parentId !== 0) {
                                    checkedIds.push(menu.id)
                                }
                            }
                            this.$refs.tree.setCheckedKeys(checkedIds)
                        }
                    }
                })
            },
			backClick: function (e) {
				this.$router.back(-1)
            },
            saveClick: function(e) {
                var checkedNodes = this.$refs.tree.getCheckedNodes()
                var checkedIds = []
                if (checkedNodes != null && checkedNodes.length > 0) {
                    for (var i = 0; i < checkedNodes.length; i++) {
                        var checkedNode = checkedNodes[i]
                        checkedIds.push(checkedNode.id)
                        if (checkedNode.parentId !== 0 && checkedIds.indexOf(checkedNode.parentId) === -1) {
                            checkedIds.push(checkedNode.parentId)
                        }
                    }
                }
                this.$confirm(`是否分配菜單`, `提示`, {
                    confirmButtonText: '分配',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(_ => {
                    let params = new URLSearchParams()
                    params.append('roleId', this.roleId)
                    params.append('menuIds', checkedIds)
                    allocMenu(params).then(res => {
                        if (res.data.code === 200) {
                            this.showSuccess(`分配成功`)
                            this.backClick()
                        } else {
                            this.showError(`分配失敗`)
                        }
                    })
                })
            },
            clearClick: function(e) {
                this.$refs.tree.setCheckedKeys([])
            }
		}
	}
</script>
