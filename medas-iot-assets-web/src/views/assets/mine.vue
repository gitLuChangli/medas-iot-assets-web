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
				<el-table-column prop="id" label="工單號" align="center" min-width="180px" />
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
				<el-table-column prop="createTime" label="創建時間" align="center" width="160px" />
				<el-table-column
					prop="note"
					label="備註"
					align="center"
					min-width="120px"
					:show-overflow-tooltip="true"
				/>
				<el-table-column label="操作" align="center" width="80px">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="detailClick(scope.row)">詳情</el-button>
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
	</div>
</template>
<script>
	import { mineOrders } from '@/api/assetInventory'
	export default {
		data() {
			return {
				listLoading: false,
				orders: [],
				qp: {
					page: 1,
					size: 15,
					start: null,
					end: null
				},
				timeRange: [],
				total: 0
			}
		},
		mounted() {
			this.queryInventory()
		},
		methods: {
			queryInventory() {
                this.listLoading = true
				let params = new URLSearchParams()
				if (this.qp.start !== null) {
					params.append('start', this.qp.start)
				}
				if (this.qp.end !== null) {
					params.append('end', this.qp.end)
				}
				mineOrders(params).then(res => {
					if (res.data.code === 200) {
						this.orders = res.data.data.list
						this.total = res.data.data.total
                    }
                    this.listLoading = false
				})
			},
			detailClick: function (row) {
				this.$router.push({ name: 'details', params: { details: row.items } })
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
			}
		}
	}
</script>
