<template>
	<div>
		<div class="toolbar">
			<el-button-group>
				<el-button icon="iconfont icon-excel" round size="mini" @click="templateClick">下載模板</el-button>
				<el-button icon="iconfont icon-excel" round size="mini" @click="show_dialog = true">上傳資產</el-button>
				<el-button icon="el-icon-delete" round size="mini" @click="clearClick"></el-button>
			</el-button-group>
			<el-button
				type="primary"
				icon="el-icon-folder-add"
				round
				class="btn"
				size="mini"
				@click="importClick"
			>保存</el-button>
		</div>
		<div class="content" v-show="show_table">
			<el-table :data="assets.assets" border stripe size="mini" v-loading="listLoading" :fit="true">
				<el-table-column type="index" width="50" align="center" fixed />
				<el-table-column
					prop="gzhNum"
					label="管制編號"
					align="center"
					fixed
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
				<af-table-column prop="operator" label="操作人" align="center" />
				<af-table-column prop="operateTime" label="操作時間" align="center" />
			</el-table>
		</div>
		<el-dialog
			title="上傳資源"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<div style="text-align: center;">
				<el-upload
					action="http://127.0.0.1:8001/assets"
					list-type="picture-card"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:on-success="handleSuccess"
				>
					<i class="el-icon-plus"></i>
				</el-upload>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { importAssets } from '@/api/assets'
	export default {
		data() {
			return {
				show_dialog: false,
				listLoading: false,
				show_table: false,
				assets: {
					companyId: '70321065267560448',
					assets: []
				}
			}
		},
		methods: {
			templateClick: function (e) {
				window.open(`http://127.0.0.1:8001/assets/template`)
			},
			clearClick: function (e) {
				this.assets.assets = []
			},
			handlePreview: function (file) { },
			handleRemove: function (file, fileList) { },
			handleSuccess: function (response, file, fileList) {
				console.log(response)
				this.show_dialog = false
				if (response.code === 200) {
					this.assets.assets = response.data
					this.show_table = true
					this.showSuccess(`上傳成功`)
				} else {
					this.showError(`上傳失敗`)
				}
			},
			importClick: function (e) {
				this.$confirm(`請先確認資產信息無誤后再保存。`, '提示', {
					confirmButtonText: '繼續保存',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					importAssets(this.assets).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`保存成功`)
							this.assets.assets = []
							this.show_table = false
						} else {
							this.showError(`保存失敗`)
						}
					})
                })
            }
		}
	}
</script>
<style scoped>
	.note {
		line-height: 40px;
	}
</style>
