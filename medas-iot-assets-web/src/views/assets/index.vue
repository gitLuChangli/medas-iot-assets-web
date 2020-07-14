<template>
	<div>
		<div class="toolbar">
			<span>輸入搜索：</span>
			<el-input
				placeholder="請輸入資產信息"
				v-model="qp.keyword"
				size="small"
				style="width: 250px"
				clearable
				@clear="queryAssets"
			>
				<el-button slot="append" icon="el-icon-search" @click="queryAssets"></el-button>
			</el-input>
			<el-button
				type="primary"
				icon="el-icon-upload2"
				circle
				class="btn"
				size="mini"
				@click="newClick"
			/>
		</div>
		<div class="content">
			<el-table :data="assets" border stripe size="mini" v-loading="listLoading" :fit="true">
				<el-table-column type="selection" width="40" />
				<el-table-column type="index" width="50" align="center" fixed />
				<el-table-column
					prop="gzhNum"
					label="管制編號"
					align="center"
					width="200px"
					:show-overflow-tooltip="true"
				/>
				<af-table-column prop="cchNum" label="財產編號" align="center" />
				<af-table-column prop="shbName" label="設備名稱" align="center" />
				<af-table-column prop="shbBrand" label="設備品牌" align="center" />
				<af-table-column prop="shbSpec" label="設備規格" align="center" />
				<af-table-column prop="fyType" label="費用類型" align="center" />
				<af-table-column prop="unit" label="單位" align="center" />
				<af-table-column prop="price" label="單價" align="center" />
				<el-table-column prop="chshCode" label="廠商代碼" align="center" width="180px" />
				<af-table-column prop="chshName" label="廠商名稱" align="center" />
				<af-table-column prop="xqDepartment" label="需求部門" align="center" />
				<af-table-column prop="shbArea" label="設備面積" align="center" />
				<af-table-column prop="shbWeight" label="設備重量" align="center" />
				<af-table-column prop="shbSN" label="設備編號" align="center" />
				<af-table-column prop="project" label="所在專案" align="center" />
				<af-table-column prop="segment" label="專案段別" align="center" />
				<af-table-column prop="gzhName" label="工站名" align="center" />
				<af-table-column prop="shbStatus" label="設備狀態" align="center" />
				<af-table-column prop="building" label="樓棟" align="center" />
				<af-table-column prop="floor" label="樓層" align="center" />
				<af-table-column prop="xianti" label="線體" align="center" />
				<af-table-column prop="poNum" label="PO單號" align="center" />
				<af-table-column prop="lyEmp" label="領用工號" align="center" />
				<af-table-column prop="lyEmpName" label="領用姓名" align="center" />
				<af-table-column prop="dhTime" label="到貨時間" align="center" />
				<af-table-column prop="jyTime" label="檢驗時間" align="center" />
				<af-table-column prop="jyCycle" label="檢驗週期" align="center" />
				<af-table-column prop="note" label="備註" align="center" />
			</el-table>
			<el-pagination
				@size-change="sizeChange"
				@current-change="pageChange"
				:current-page.sync="qp.page"
				:page-sizes="[10, 15, 20, 25, 30, 50]"
				:page-size="qp.size"
				layout="sizes, total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
		</div>
		<div class="toolbar" :class="sidebar.opened ? 'task-note' : 'task-note-w'">
			已選擇：{{selected}} 件
			<el-button type="primary" size="mini" class="btn" @click="taskClick">創建盤點工單</el-button>
		</div>
	</div>
</template>
<style scoped>
	.task-note {
		position: fixed;
		bottom: 0px;
		right: 0px;
		left: 200px;
		z-index: 99;
		overflow: hidden;
		background: #E4E7ED;
	}
	.task-note-w {
		position: fixed;
		bottom: 0px;
		right: 0px;
		left: 66px;
		z-index: 99;
		overflow: hidden;
		background: #E4E7ED;
	}
</style>
<script>
	import { mapGetters } from 'vuex'
	import { queryAssets } from '@/api/assets'
	export default {
		computed: {
			...mapGetters([
				'sidebar'
			])
		},
		data() {
			return {
				qp: {
					keyword: null,
					page: 1,
					size: 15
				},
				total: 0,
				listLoading: false,
				companyId: '70321065267560448',
				assets: [],
				selected: 0
			}
		},
		mounted() {
			this.queryAssets()
		},
		methods: {
			queryAssets() {
				this.listLoading = true
				var params = Object.assign({}, this.qp)
				params.page = this.qp.page - 1
				queryAssets(this.companyId, params).then(res => {
					if (res.data.code === 200) {
						this.assets = res.data.data.list
						this.total = res.data.data.total
					} else {
						this.showError(`獲取失敗`)
					}
					this.listLoading = false
				}).catch(_ => {
					this.showError(`獲取失敗`)
					this.listLoading = false
				})
			},
			newClick: function (e) { },
			sizeChange: function (val) {
				this.qp.size = val
				this.queryAssets()
			},
			pageChange: function (val) {
				this.qp.page = val
				this.queryAssets()
			},
			taskClick: function (e) { }
		}
	}
</script>
