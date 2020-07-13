<template>
	<div>
		<div class="toolbar">
			<span>輸入搜索：</span>
			<el-input
				placeholder="請輸入名稱"
				v-model="qp.keyword"
				size="small"
				style="width: 250px"
				clearable
				@clear="queryRoles"
			>
				<el-button slot="append" icon="el-icon-search" @click="queryRoles"></el-button>
			</el-input>
			<el-button
				type="primary"
				icon="el-icon-plus"
				circle
				style="float: right; clear: both"
				size="mini"
				@click="newClick"
			/>
		</div>
		<div class="content">
			<el-table
				:data="roles"
				border
				stripe
				size="mini"
				v-loading="listLoading"
			>
				<el-table-column prop="name" label="角色名稱" align="center" />
				<el-table-column prop="description" label="描述" align="center" />
				<el-table-column prop="adminCount" label="用户数" align="center" />
				<el-table-column prop="createTime" label="添加時間" align="center" />
				<el-table-column label="操作" align="center" width="300px" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="menuClick(scope.row)">分配菜單</el-button>
						<el-button size="mini" type="text" @click="resourceClick(scope.row)">分配資源</el-button>
						<el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="狀態" width="60px" align="center" fixed="right">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							:width="32"
							@change="handleDisableChange(scope.row)"
							:active-value="1"
							:inactive-value="0"
						/>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="queryRoles"
				@current-change="queryRoles"
				:current-page.sync="qp.pageNum"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="qp.pageSize"
				layout="total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
		</div>
		<el-dialog
			:title="!modify ? '新增角色' : '修改角色'"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<el-form ref="role" :model="role" label-position="left" size="small" :rules="rules">
				<el-form-item label="角色名稱" prop="name">
					<el-input v-model="role.name" />
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="role.description" />
				</el-form-item>
				<el-form-item label="是否啟用">
					<el-radio-group v-model="role.status" style="width: 100%">
						<el-radio :label="1">是</el-radio>
						<el-radio :label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="saveClick">確定</el-button>
					<el-button size="small" v-if="!modify" @click="resetClick">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import { createRole, updateRole, fetchList, disableRole, deleteRole } from '../../../api/role.js'
	export default {
		data() {
			return {
				roles: [],
				show_dialog: false,
				modify: false,
				role: {
					id: '',
					name: '',
					description: '',
					adminCount: 0,
					status: 1
				},
				rules: {
					name: [{ required: true, message: '請輸入角色名稱', trigger: 'blur' }]
				},
				qp: {
					keyword: null,
					pageNum: 1,
					pageSize: 10
				},
				total: 0,
				listLoading: false
			}
		},
		mounted() {
			this.queryRoles()
		},
		methods: {
			clearCache() {
				this.role.id = ''
				this.role.name = ''
				this.role.description = ''
				this.role.status = 1
			},
			newClick: function (e) {
				this.show_dialog = true
				this.modify = false
			},
			handleDisableChange: function (val) {
				disableRole(val.id, val.status).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(val.status === 1 ? `啟用成功` : `禁用成功`)
					} else {
						this.showError(val.status === 1 ? `禁用成功` : `禁用失敗`)
					}
				})
			},
			menuClick: function (row) {
				this.$router.push(`/ums/role-menu?roleId=${row.id}`)
			},
			resourceClick: function (row) {
				this.$router.push(`/ums/role-resource?roleId=${row.id}`)
			},
			editClick: function (val) {
				this.role = Object.assign({}, val)
				this.show_dialog = true
				this.modify = true
			},
			deleteClick: function (val) {
				this.$confirm(`此操作將徹底刪除 <strong>${val.name}</strong>, 是否繼續？`, '提示', {
					confirmButtonText: '刪除',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteRole(val.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.queryRoles()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				})
			},
			saveClick: function (e) {
				this.$refs.role.validate(valid => {
					if (valid) {
						if (this.modify) {
							updateRole(this.role.id, this.role).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`修改成功`)
									this.show_dialog = false
									this.clearCache()
									this.queryRoles()
								} else {
									this.showError(`修改失敗`)
								}
							})
						} else {
							createRole(this.role).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`新增成功`)
									this.show_dialog = false
									this.clearCache()
									this.queryRoles()
								} else {
									this.showError(`修改成功`)
								}
							})
						}

					}
				})
			},
			resetClick: function (e) {
				this.$refs.role.restFields()
			},
			queryRoles() {
				this.listLoading = true
				fetchList(this.qp).then(res => {
					if (res.data.code === 200) {
						this.roles = res.data.data.list
						this.total = res.data.data.total
					} else {
						this.showError(`獲取失敗`)
					}
					this.listLoading = false
				})
			}
		}
	}
</script>
