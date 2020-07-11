<template>
	<div>
		<div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
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
				:data="categories"
				style="width: 100%; margin-bottom: 20px;"
				border
				stripe
				size="mini"
				v-loading="listLoading"
			>
				<el-table-column prop="name" label="名稱" align="center" />
				<el-table-column prop="createTime" label="創建時間" align="center" />
				<el-table-column prop="name" label="前端名稱" align="center" />
				<el-table-column prop="sort" label="排序" align="center" />
				<el-table-column label="操作" align="center" width="150px" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			:title="!modify ? '新增分類' : '修改分類'"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<el-form ref="category" :model="category" label-position="left" size="small" :rules="rules">
				<el-form-item label="名稱" prop="name">
					<el-input v-model="category.name" />
				</el-form-item>
				<el-form-item label="排序">
					<el-input v-model="category.sort" />
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
	import { listResourceCategories, createResourceCategory, updateResourceCategory, deleteResourceCategory } from '../../../api/resourceCategory.js'
	export default {
		data() {
			return {
				categories: [],
				listLoading: false,
				show_dialog: false,
				modify: false,
				category: {
					id: '',
					name: '',
					sort: 0
				},
				rules: {
					name: [{ required: true, message: '請輸入資源分類名稱', trigger: 'blur' }]
				}
			}
		},
		mounted() {
			this.listCategories()
		},
		methods: {
			backClick: function (e) {
				this.$router.back(-1)
			},
			clearCache() {
				this.category.id = ''
				this.category.name = ''
				this.category.sort = 0
			},
			newClick: function (e) {
				this.clearCache()
				this.show_dialog = true
				this.modify = false
			},
			editClick: function (row) {
                this.category = Object.assign({}, row)
                this.show_dialog = true
                this.modify = true
			},
			deleteClick: function (row) {
                this.$confirm(`此操作將徹底刪除 <strong>${row.name}</strong> 及其下級菜單, 是否繼續？`, '提示', {
					confirmButtonText: '刪除',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteResourceCategory(row.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.listCategories()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				})
			},
			listCategories() {
				this.listLoading = true
				listResourceCategories().then(res => {
					if (res.data.code === 200) {
						this.categories = res.data.data
					}
					this.listLoading = false
				})
			},
			saveClick: function (e) {
				this.$refs.category.validate(valid => {
					if (valid) {
						if (this.modify) {
							updateResourceCategory(this.category.id, this.category).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`修改成功`)
									this.show_dialog = false
									this.listCategories()
								} else {
									this.showError(`修改失败`)
								}
							})
						} else {
							createResourceCategory(this.category).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`新增成功`)
									this.show_dialog = false
									this.listCategories()
								} else {
									this.showError(`新增失败`)
								}
							})
						}
					}
				})
			},
			resetClick: function (e) {
				this.$refs.category.resetFields()
			}
		}
	}
</script>
