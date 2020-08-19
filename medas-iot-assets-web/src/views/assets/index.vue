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
		</div>
		<div class="content">
			<el-table
				:data="assets"
				border
				stripe
				size="mini"
				style="margin-bottom: 8px"
				v-loading="listLoading"
				:fit="true"
				:max-height="clientHeight - 250"
				ref="assetsTable"
				@selection-change="handleSelection"
				:row-key="rowKey"
			>
				<el-table-column type="selection" :reserve-selection="true" width="40" fixed />
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
				<af-table-column prop="building" label="樓棟" align="center" />
				<af-table-column prop="floor" label="樓層" align="center" />
				<af-table-column prop="xianti" label="線體" align="center" />
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
		<div
			class="toolbar"
			:class="sidebar.opened ? 'task-note' : 'task-note-w'"
			v-show="selectedRows.length > 0"
		>
			已選擇：{{selectedRows.length}} 件
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
		background: #e4e7ed;
	}
	.task-note-w {
		position: fixed;
		bottom: 0px;
		right: 0px;
		left: 66px;
		z-index: 99;
		overflow: hidden;
		background: #e4e7ed;
	}
</style>
<script>
	import { mapGetters } from 'vuex'
	import { queryAssets, createInventory } from '@/api/assetInventory'
	export default {
		computed: {
			...mapGetters([
				'sidebar',
				'clientHeight'
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
				assets: [],
				selected: 0,
				mapSelection: new Map(),
				selectedRows: []
			}
		},
		mounted() {
			this.queryAssets()
		},
		methods: {
			rowKey: function (row) {
				return row.id
			},
			queryAssets() {
				this.listLoading = true
				var params = Object.assign({}, this.qp)
				params.page = this.qp.page - 1
				queryAssets(params).then(res => {
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
			taskClick: function (e) {
				this.$confirm(`此操作將創建盤存工單，確認無誤後，點擊創建。`, '提示', {
					confirmButtonText: '創建',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					let assetIds = []
					this.selectedRows.forEach(element => {
						assetIds.push(element.id)
					})
					let params = new URLSearchParams()
					params.append('assetIds', assetIds)
					createInventory(params).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`創建盤存工單成功`)
							this.selectedRows = []
							this.$refs.assetsTable.clearSelection()
						} else {
							this.showError(`創建盤存工單失敗`)
						}
					})
				})
			},
			handleSelection: function (selection) {
				this.assets.forEach(element => {
					this.selectedRows.pop(element)
				})
				selection.forEach(element => {
					this.selectedRows.push(element)
				})
				console.log(this.selectedRows)
			}
		}
	}
</script>
