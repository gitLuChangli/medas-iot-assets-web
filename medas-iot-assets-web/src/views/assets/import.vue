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
			<el-table :data="assets" border stripe size="mini" v-loading="listLoading" :max-height="clientHeight - 210" :fit="true">
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
				<af-table-column prop="building" label="樓棟" align="center" />
				<af-table-column prop="floor" label="樓層" align="center" />
				<af-table-column prop="xianti" label="線體" align="center" />
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
					:action="RES_URL + '/assets'"
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
	import { mapGetters } from 'vuex'
	import { importAssets } from '@/api/assetInventory'
	export default {
		computed: {
			...mapGetters([
				'clientHeight'
			])
		},
		data() {
			return {
				show_dialog: false,
				listLoading: false,
				show_table: false,
				assets: []
			}
		},
		methods: {
			templateClick: function (e) {
				window.open(`${this.RES_URL}/assets/template`)
			},
			clearClick: function (e) {
				this.assets.assets = []
				this.show_table = false
			},
			handlePreview: function (file) { },
			handleRemove: function (file, fileList) { },
			handleSuccess: function (response, file, fileList) {
				console.log(response)
				this.show_dialog = false
				if (response.code === 200) {
					this.assets = response.data
					this.show_table = true
					this.showSuccess(`上傳成功`)
				} else {
					this.showError(`上傳失敗`)
				}
			},
			importClick: function (e) {
				this.$confirm(`此操作將資產信息存儲在本系統中，確認無誤後，點擊保存。`, '提示', {
					confirmButtonText: '保存',
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
