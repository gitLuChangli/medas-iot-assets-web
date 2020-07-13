<template>
	<div>
		<div class="toolbar">
			<el-button icon="el-icon-folder-add" round size="mini" @click="categoryClick">分類</el-button>
			<span style="margin-left: 32px;">資源分類查看：</span>
			<el-select
				v-model="qp.categoryId"
				clearable
				placeholder="全部"
				size="small"
				@change="listResources"
			>
				<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
			</el-select>
			<el-button type="primary" circle icon="el-icon-plus" class="btn" size="mini" @click="newClick"></el-button>
		</div>
		<div class="content">
			<el-table
				:data="resources"
				border
				stripe
				size="mini"
				v-loading="listLoading"
			>
				<el-table-column prop="url" label="資源路徑" />
				<el-table-column prop="name" label="名稱" align="center" />
				<el-table-column prop="description" label="描述" align="center" />
				<el-table-column prop="createTime" label="創建時間" align="center" />
				<el-table-column label="操作" align="center" width="150px" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="listResources"
				@current-change="listResources"
				:current-page.sync="qp.pageNum"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="qp.pageSize"
				layout="total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
		</div>
		<el-dialog
			:title="!modify ? '新增資源' : '修改資源'"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<el-form ref="resource" :model="resource" label-position="left" size="small" :rules="rules">
				<el-form-item label="資源名稱" prop="name">
					<el-input v-model="resource.name" />
				</el-form-item>
				<el-form-item label="資源路徑" prop="url">
					<el-input v-model="resource.url" />
				</el-form-item>
				<el-form-item label="資源分類" prop="categoryId">
					<el-select v-model="resource.categoryId" placeholder="全部" clearable style="width: 100%">
						<el-option v-for="item in categories" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述：">
					<el-input v-model="resource.description" type="textarea" :rows="2" style="width: 100%"></el-input>
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
	import { listResourceCategories } from '../../../api/resourceCategory.js'
	import { fetchList, createResource, updateResource, deleteResource } from '../../../api/resource.js'
	const defaultResource = {
		id: null,
		name: null,
		url: null,
		categoryId: null,
		description: ''
	}
	export default {
		data() {
			return {
				resources: [],
				listLoading: false,
				qp: {
					nameKeyword: null,
					urlKeyword: null,
					categoryId: null,
					pageNum: 1,
					pageSize: 10
				},
				total: 0,
				categories: [],
				resource: Object.assign({}, defaultResource),
				modify: false,
				show_dialog: false,
				rules: {
					name: [{ required: true, message: '請輸入資源名稱', trigger: 'blur' }],
					url: [{ required: true, message: '請輸入資源路徑', trigger: 'blur' }],
					categoryId: [{ required: true, message: '請選擇分類', trigger: 'change' }]
				}
			}
		},
		mounted() {
			listResourceCategories().then(res => {
				if (res.data.code === 200) {
					this.categories = res.data.data
				}
			})
			this.listResources()
		},
		methods: {
			newClick: function (e) {
				this.resource = Object.assign({}, defaultResource)
				this.show_dialog = true
				this.modify = false
			},
			categoryClick: function (e) {
				this.$router.push('/ums/category')
			},
			editClick: function (row) {
				this.resource = Object.assign({}, row)
				this.show_dialog = true
				this.modify = true
			},
			deleteClick: function (row) {
				this.$confirm(`此操作將徹底刪除 <strong>${row.name}</strong> 是否繼續？`, '提示', {
					confirmButtonText: '刪除',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteResource(row.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.listResources()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				})
			},
			listResources() {
				this.listLoading = true
				fetchList(this.qp).then(res => {
					if (res.data.code === 200) {
						this.resources = res.data.data.list
						this.total = res.data.data.total
					}
					this.listLoading = false
				})
			},
			saveClick: function (e) {
				this.$refs.resource.validate(valid => {
					if (valid) {
						if (this.modify) {
							updateResource(this.resource.id, this.resource).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`修改成功`)
									this.show_dialog = false
									this.listResources()
								} else {
									this.showError(`修改失敗`)
								}
							})
						} else {
							createResource(this.resource).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`新增成功`)
									this.show_dialog = false
									this.listResources()
								} else {
									this.showError(`新增失敗`)
								}
							})
						}
					}
				})
			},
			resetClick: function (e) {
				this.$refs.resource.resetFields()
			}
		}
	}
</script>
