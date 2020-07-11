<template>
	<div>
		<div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
		</div>
		<div class="content-500">
			<div
				v-for="(category, index) in categories"
				:key="'category' + category.id"
				:class="index === 0 ? 'top-line' : null"
			>
				<el-row class="table-layout" style="background: #F2F6FC;">
					<el-checkbox
						v-model="category.checked"
						:indeterminate="category.isIndeterminate"
						@change="handleCheckAllChange(category)"
					>{{category.name}}</el-checkbox>
				</el-row>
				<el-row class="table-layout">
					<el-col
						:span="8"
						v-for="resource in getResourceByCategory(category.id)"
						:key="resource.id"
						style="padding: 4px 0"
					>
						<el-checkbox
							v-model="resource.checked"
							@change="handleCheckChange(resource)"
						>{{resource.name}}</el-checkbox>
					</el-col>
				</el-row>
			</div>
			<div style="margin-top: 20px" align="center">
				<el-button type="primary" size="small" @click="saveClick">保存</el-button>
				<el-button size="small" @click="clearClick">清空</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	import { listResourceCategories } from '@/api/resourceCategory'
	import { fetchAllResourceList } from '@/api/resource'
	import { listResourceByRole, allocResource } from '@/api/role'
	export default {
		data() {
			return {
				resources: [],
				categories: [],
				roleId: null
			}
		},
		mounted() {
			this.roleId = this.$route.query.roleId
			if (this.roleId == null) return
			fetchAllResourceList().then(res => {
				if (res.data.code === 200) {
					this.resources = res.data.data
					for (var i = 0; i < this.resources.length; i++) {
						this.resources[i].checked = false
					}
					this.listCategories()
				}
			})
		},
		methods: {
			listCategories() {
				listResourceCategories().then(res => {
					if (res.data.code === 200) {
						this.categories = res.data.data
						for (var i = 0; i < this.categories.length; i++) {
							this.categories[i].checked = false
							this.categories[i].isIndeterminate = false
						}
                        this.queryRoleResources(this.roleId)                        
					}
				})
			},
			queryRoleResources() {
				listResourceByRole(this.roleId).then(res => {
					if (res.data.code === 200) {
                        var indexes = []
                        var categoryIndexes = []
						let roleResources = res.data.data
						for (var i = 0; i < roleResources.length; i++) {
                            indexes.push(roleResources[i].id)
                            if (categoryIndexes.indexOf(roleResources[i].categoryId) === -1) {
                                categoryIndexes.push(roleResources[i].categoryId)
                            }
						}
                        this.showRoleResources(indexes)
                        this.determinateCategory(categoryIndexes)
                        this.$forceUpdate()
					}
				})
			},
			showRoleResources(indexes) {
				for (var i = 0; i < this.resources.length; i++) {
					var id = this.resources[i].id
					if (indexes.indexOf(id) > -1) {
						this.resources[i].checked = true
					}
				}
            },
            determinateCategory(categoryIndexes) {
                for (var i = 0; i < this.categories.length; i++) {
                    var id = this.categories[i].id
                    if (categoryIndexes.indexOf(id) > -1) {
                        this.categories[i].isIndeterminate = this.isIndeterminate(id)
                        this.categories[i].checked = this.isAllChecked(id)
                    }
                }
            },
			backClick: function (e) {
				this.$router.back(-1)
			},
			saveClick: function (e) {
				this.$confirm(`是否分配資源`, `提示`, {
					confirmButtonText: '分配',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(_ => {
					var resourceIds = []
					for (var i = 0; i < this.resources.length; i++) {
						if (this.resources[i].checked) {
							resourceIds.push(this.resources[i].id)
						}
					}
					let params = new URLSearchParams()
					params.append('roleId', this.roleId)
					params.append('resourceIds', resourceIds)
					allocResource(params).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`分配成功`)
							this.backClick()
						} else {
							this.showError(`分配失敗`)
						}
					})
				})
			},
			clearClick: function (e) {
				this.categories.forEach(item => {
					item.checked = false
				})
				this.resources.forEach(item => {
					item.checked = false
				})
				this.$forceUpdate()
			},
			handleCheckAllChange: function (category) {
				for (var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].categoryId === category.id) {
						this.resources[i].checked = category.checked
					}
				}
				this.$forceUpdate()
			},
			getResourceByCategory: function (categoryid) {
				var categoryResources = []
				if (this.resources === null) return null
				for (var i = 0; i < this.resources.length; i++) {
					let resource = this.resources[i]
					if (resource.categoryId === categoryid) {
						categoryResources.push(resource)
					}
				}
				return categoryResources
			},
			isAllChecked(categoryid) {
				let categoryResources = this.getResourceByCategory(categoryid)
				if (categoryResources === null) return false
				let checkedCnt = 0
				for (var i = 0; i < categoryResources.length; i++) {
					if (categoryResources[i].checked === true) checkedCnt++
				}
				if (checkedCnt === 0) return false
				return checkedCnt === categoryResources.length
			},
			isIndeterminate: function (categoryid) {
				let categoryResources = this.getResourceByCategory(categoryid)
				if (categoryResources === null) return false
				let checkedCnt = 0
				for (var i = 0; i < categoryResources.length; i++) {
					if (categoryResources[i].checked === true) checkedCnt++
				}
				return !(checkedCnt === 0 || checkedCnt === categoryResources.length)
			},
			handleCheckChange: function (resource) {
				for (var i = 0; i < this.categories.length; i++) {
					if (this.categories[i].id === resource.categoryId) {
						this.categories[i].checked = this.isAllChecked(resource.categoryId)
						this.categories[i].isIndeterminate = this.isIndeterminate(resource.categoryId)
						break
					}
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style scoped>
	.table-layout {
		padding: 16px;
		border-left: 1px solid #dcdfe6;
		border-right: 1px solid #dcdfe6;
		border-bottom: 1px solid #dcdfe6;
	}

	.top-line {
		border-top: 1px solid #dcdfe6;
	}
</style>
