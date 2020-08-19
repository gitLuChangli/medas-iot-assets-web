<template>
	<div>
		<div class="toolbar" style="text-align: center">
			所屬部門：
			<el-cascader
				:options="companies"
				:props="cascader_props"
				clearable
				placeholder="請選擇部門"
				v-model="companyIds"
				size="small"
				style="width: 500px"
				@change="companyChange"
			/>
			<el-button
				type="primary"
				circle
				icon="el-icon-plus"
				style="float: right"
				size="mini"
				@click="newClick"
			/>
		</div>
		<div class="content">
			<el-table :data="users" border stripe size="mini">
				<el-table-column prop="username" label="工號" min-width="100" />
				<el-table-column prop="nickname" label="姓名" align="center" min-width="130" />
				<el-table-column prop="email" label="郵箱" align="center" />
				<el-table-column prop="phone" label="手機" align="center" />
				<el-table-column prop="ext" label="分機" align="center" />
				<el-table-column label="操作" width="200px" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="roleClick(scope.row)">角色</el-button>
						<el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
						<el-button size="mini" type="text" @click="resetClick(scope.row)">重置</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="狀態" width="60px" align="center" fixed="right">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							:width="32"
							@change="disableChange(scope.row)"
							:active-value="1"
							:inactive-value="0"
						/>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="queryUsers"
				@current-change="queryUsers"
				:current-page.sync="qp.pageNum"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="qp.pageSize"
				layout="total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
			<el-dialog
				:title="modify ? `修改用戶` : `添加用戶`"
				:visible.sync="show_dialog"
				custom-class="dialog-n"
				center
				:close-on-click-modal="false"
				:destroy-on-close="true"
				top="16px"
			>
				<el-form ref="user" :model="user" label-position="left" size="small" :rules="rules">
					<el-form-item label="工號" prop="username">
						<el-input v-model="user.username" :readonly="modify" />
					</el-form-item>
					<el-form-item label="姓名" prop="nickname">
						<el-input v-model="user.nickname" />
					</el-form-item>
					<el-form-item label="郵箱" prop="email">
						<el-input v-model="user.email" />
					</el-form-item>
					<el-form-item label="手機號">
						<el-input v-model="user.phone" />
					</el-form-item>
					<el-form-item label="分機號">
						<el-input v-model="user.ext" />
					</el-form-item>
					<el-form-item label="所屬部門" prop="companyIds">
						<el-cascader
							v-model="user.companyIds"
							:options="companies"
							style="width: 100%"
							size="small"
							:props="cascader_props"
						></el-cascader>
					</el-form-item>
					<el-form-item label="備註">
						<el-input v-model="user.note" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="saveClick">確定</el-button>
						<el-button @click="show_dialog = false">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<el-dialog
				title="用户角色"
				:visible.sync="show_dialog_role"
				center
				custom-class="dialog-n"
				:close-on-click-modal="false"
				:destroy-on-close="true"
			>
				<el-form ref="userRole" :model="userRole" label-position="left" size="small" :rules="rules">
					<el-form-item label="選擇角色">
						<el-select v-model="userRole.roleIds" multiple placeholder="請選擇" style="width: 100%">
							<el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="setRoleClick">確定</el-button>
						<el-button @click="show_dialog = false">取消</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import { queryCompanies } from '@/api/company'
	import { queryUsers, createUser, updateUser, deleteUser, disableUser, queryCompanyRelation, resetPassword, getUserRoles, updateUserRoles } from '@/api/user'
    import { fetchAllRoleList } from '@/api/role'
	const defaultUser = {
		id: null,
		username: null,
		nickname: null,
		email: null,
		phone: null,
		ext: null,
		note: null,
		companyIds: [],
		status: 1
	}
	const defaultUserRole = {
		adminId: null,
		roleIds: []
	}
	export default {
		data() {
			return {
				companies: [],
				companyIds: [],
				cascader_props: {
					label: 'name',
					value: 'id',
					children: 'descendants',
					checkStrictly: true
				},
				users: [],
				qp: {
					pageNum: 1,
					pageSize: 10,
					username: null,
					companyId: null
				},
				total: 0,
				show_dialog: false,
				modify: false,
				user: Object.assign({}, defaultUser),
				show_dialog_role: false,
				roles: [],
				userRole: Object.assign({}, defaultUserRole),
				rules: {
					username: [{ required: true, message: '請輸入工號', trigger: 'blur' }, { min: 8, max: 10, message: '長度在 8 到 10 個字符', trigger: 'blur' }],
					nickname: [{ required: true, message: '請輸入名稱', trigger: 'blur' }, { min: 2, max: 64, message: '長度在 2 到 640 個字符', trigger: 'blur' }],
					email: [{ required: true, message: '請輸入郵箱', trigger: 'blur' }],
					companyIds: [{ required: true, message: '請選擇部門', trigger: 'blur' }]
				}
			}
		},
		mounted() {
			queryCompanies().then(res => {
				if (res.data.code === 200) {
					this.companies = res.data.data
				}
			})
            this.queryUsers()
            fetchAllRoleList().then(res => {
                if (res.data.code === 200) {
                    this.roles = res.data.data
                }
            })
		},
		methods: {
			queryUsers() {
				queryUsers(this.qp).then(res => {
					if (res.data.code === 200) {
						this.users = res.data.data.list
						this.total = res.data.data.total
					}
				})
			},
			companyChange: function (e) {
				if (this.companyIds !== null && this.companyIds.length > 0) {
					this.qp.companyId = this.companyIds[this.companyIds.length - 1]
				} else {
					this.qp.companyId = null
				}
				this.queryUsers()
			},
			newClick: function (e) {
				this.user = Object.assign({}, defaultUser)
				this.show_dialog = true
				this.modify = false
			},
			roleClick: function (row) {
                getUserRoles(row.id).then(res => {
                    if (res.data.code === 200) {
						this.userRole.adminId = row.id
						if (res.data.data !== null) {
							let ids = []
							for (let i = 0; i < res.data.data.length; i++) {
								ids.push(res.data.data[i].id)
							}
							this.userRole.roleIds = ids
						}
                        this.show_dialog_role = true
                    } else {
                        this.showError(`獲取用戶角色信息失敗`)
                    }
                }).catch(() => {
                    this.showError(`獲取用戶角色信息失敗`)
                })
            },
			editClick: function (row) {
				queryCompanyRelation(row.id).then(res => {
					if (res.data.code === 200) {
						this.user = Object.assign({}, row)
						this.user.companyIds = res.data.data
						this.show_dialog = true
						this.modify = true
					} else {
						this.showError(`獲取部門關係失敗`)
					}
				})
			},
			resetClick: function (row) {
				this.$confirm(`此操作將重置：<strong>${row.username} ${row.nickname}</strong> 的密碼，是否繼續？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					resetPassword(row.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`重置成功`)
						} else {
							this.showError(`重置失敗`)
						}
					})
				})
			},
			deleteClick: function (row) {
				this.$confirm(`此操作將徹底刪除：<strong>${row.username} ${row.nickname}</strong> ，是否繼續？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteUser(row.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.queryUsers()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				}
				)
			},
			disableChange: function (row) {
				disableUser(row.id, row.status).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(row.status === 1 ? `啟用成功` : `禁用成功`)
					} else {
						this.showError(row.status === 1 ? `啟用失敗` : `禁用失敗`)
						row.status = row.status === 1 ? 0 : 1
					}
				})
			},
			saveClick: function (e) {
				this.$refs.user.validate(valid => {
					if (valid) {
						if (!this.modify) {
							createUser(this.user).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`添加成功`)
									this.queryUsers()
									this.show_dialog = false
								} else {
									this.showError(`添加失敗`)
								}
							})
						} else {
							updateUser(this.user.id, this.user).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`修改成功`)
									this.queryUsers()
									this.show_dialog = false
								} else {
									this.showError(`修改失敗`)
								}
							})
						}
					}
				})
			},
			setRoleClick: function (e) {
                let params = new URLSearchParams()
                params.append('adminId', this.userRole.adminId)
                params.append('roleIds', this.userRole.roleIds)
                updateUserRoles(params).then(res => {
                    if (res.data.code === 200) {
                        this.showSuccess(`設置成功`)
                        this.show_dialog_role = false
                    } else {
                        this.showError(`設置失敗`)
                    }
                })
            }
		}
	}
</script>
