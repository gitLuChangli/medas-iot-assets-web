<template>
	<div>
		<div class="toolbar" style="text-align: center;">
			<span>時間範圍：</span>
			<el-date-picker
				v-model="timeRange"
				type="daterange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				value-format="yyyy-MM-dd"
				size="mini"
			/>
			<span style="margin-left: 16px;">盤點人工號：</span>
			<el-input placeholder="請輸入工號或工單號" v-model="qp.keyword" size="mini" style="width: 250px" clearable />
			<el-button
				type="primary"
				size="mini"
				circle
				icon="el-icon-search"
				style="margin: auto 16px;"
				@click="queryClick"
			/>
		</div>
		<div class="content">
			<el-table
				:data="orders"
				border
				stripe
				size="mini"
				v-loading="listLoading"
				style="margin-bottom: 12px;"
			>
				<el-table-column prop="num" label="工單號" align="center" min-width="180px" />
				<el-table-column label="盤點人工號" align="center" min-width="180px" :show-overflow-tooltip="true">
					<template slot-scope="scope">
						<label
							v-for="username in scope.row.usernames"
							:key="username"
							style="color: #409EFF; padding: 4px;"
						>{{username}}</label>
					</template>
				</el-table-column>
				<el-table-column prop="count" label="資產數量" align="center" />
				<el-table-column prop="counted" label="已盤點" align="center" />
				<el-table-column prop="status" label="工單狀態" align="center">
					<template slot-scope="scope">
						<label v-if="scope.row.status === 0" style="color: #F56C6C">未完成</label>
						<label v-else style="color: #409EFF">已完成</label>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="創建時間" align="center" width="160px" />
				<el-table-column prop="completeTime" label="完成時間" align="center" width="160px" />
				<el-table-column
					prop="note"
					label="備註"
					align="center"
					min-width="120px"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="操作" align="center" width="240px">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="detailClick(scope.row)">詳情</el-button>
						<el-button size="mini" type="text" @click="downloadClick(scope.row)">下載</el-button>
						<el-button size="mini" type="text" @click="userClick(scope.row)" :disabled="scope.row.status === 1">盤點人</el-button>
						<el-button
							size="mini"
							type="text"
							@click="completeClick(scope.row)"
							:disabled="scope.row.status === 1"
						>結單</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="sizeChange"
				@current-change="pageChange"
				:current-page.sync="qp.page"
				:page-sizes="[10, 15, 20, 25, 30, 50]"
				:page-size="qp.size"
				layout="sizes, total, prev, pager, next"
				:hide-on-single-page="true"
				:total="total"
			/>
		</div>
		<el-dialog
			title="分配盤點人"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:close-on-click-modal="false"
			:destroy-on-close="true"
		>
			<el-form ref="woUser" :model="woUser" label-position="left" size="small">
				<el-form-item>
					<el-select v-model="woUser.usernames" multiple placeholder="請選擇" style="width: 100%">
						<el-option
							v-for="item in users"
							:key="item.id"
							:label="item.username + item.nickname"
							:value="item.username"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="text-align: center">
					<el-button type="primary" @click="setUserClick">確定</el-button>
					<el-button @click="show_dialog = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import { queryInventory, setWorkers, completeInventory, deleteInventory, downloadMyWork } from '@/api/assetInventory'
	import { queryCompanyUsers } from '@/api/user'

	export default {
		data() {
			return {
				listLoading: false,
				orders: [],
				qp: {
					keyword: null,
					page: 1,
					size: 30,
					start: null,
					end: null
				},
				timeRange: [],
				total: 0,
				show_dialog: false,
				users: [],
				woUser: {
					id: null,
					usernames: []
				}
			}
		},
		mounted() {
			this.queryInventory()
		},
		methods: {
			queryInventory() {
				let params = new URLSearchParams()
				if (this.qp.start !== null) {
					params.append('start', this.qp.start)
				}
				if (this.qp.end !== null) {
					params.append('end', this.qp.end)
				}
				if (this.qp.keyword !== null) {
					params.append('keyword', this.qp.keyword)
				}
				queryInventory(params).then(res => {
					if (res.data.code === 200) {
						this.orders = res.data.data.list
						this.total = res.data.data.total
					}
				})
			},
			detailClick: function (row) {
				this.$router.push({ name: 'details', params: { details: row.items } })
			},
			userClick: function (row) {
				queryCompanyUsers().then(res => {
					if (res.data.code === 200) {
						this.users = res.data.data
						this.woUser.id = row.id
						this.woUser.usernames = row.usernames
						this.show_dialog = true
					}
				})
			},
			completeClick: function (row) {
				this.$prompt('備註', '提示', {
					confirmButtonText: '確定',
					cancelButtonText: '取消'
				}).then(({ value }) => {
					let params = new URLSearchParams()
					params.append('note', value)
					completeInventory(row.id, params).then(res => {
						if (res.data.code === 200) {
                            this.showSuccess(`結單成功`)
                            this.queryInventory()
						} else {
							this.showError(`結單失敗`)
						}
					})
				})
			},
			deleteClick: function (row) {
				this.$confirm(`此操作將永久刪除此工單，是否繼續？`, '提示', {
					confirmButtonText: '刪除',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(_ => {
					deleteInventory(row.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.queryInventory()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				})
			},
			setUserClick: function (e) {
				var params = new URLSearchParams()
				params.append('usernames', this.woUser.usernames)
				setWorkers(this.woUser.id, params).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(`分配成功`)
						this.queryInventory()
						this.show_dialog = false
					} else {
						this.showError(`分配失敗`)
					}
				})
			},
			sizeChange: function (val) {
				this.qp.size = val
				this.queryInventory()
			},
			pageChange: function (val) {
				this.qp.page = val
				this.queryInventory()
			},
			queryClick: function (e) {
				if (this.timeRange !== null && this.timeRange.length === 2) {
					this.qp.start = this.timeRange[0]
					this.qp.end = this.timeRange[1]
				} else {
					this.qp.start = null
					this.qp.end = null
				}
				this.queryInventory()
			},
			downloadClick: function(row) {
				downloadMyWork(row.id).then(res => {
					if (res.status === 200) {
						var blob = new Blob([res.data])
						var downloadElement = document.createElement('a')
						var href = window.URL.createObjectURL(blob) // 创建下载的链接
						downloadElement.href = href
						downloadElement.download = row.num + '.xlsx' // 下载后文件名
						document.body.appendChild(downloadElement)
						downloadElement.click() // 点击下载
						document.body.removeChild(downloadElement) // 下载完成移除元素
						window.URL.revokeObjectURL(href) // 释放掉blob对象
					}
				})
			}
		}
	}
</script>
