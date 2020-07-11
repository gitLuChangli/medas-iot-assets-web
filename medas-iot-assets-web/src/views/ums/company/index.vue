<template>
	<div>
		<div class="toolbar">
			<el-button type="primary el-icon-plus" circle class="btn" size="mini" @click="showNewClick" />
		</div>
		<div class="content">
			<el-table
				:data="companies"
				border
				stripe
				size="mini"
				row-key="id"
				:tree-props="{ children: 'descendants' }"
			>
				<el-table-column prop="code" label="费用代碼" width="250" />
				<el-table-column prop="name" label="部門名稱" align="center" />
				<el-table-column prop="details" label="説明" align="center" />
				<el-table-column prop="area" label="園區" width="160" align="center" />
				<el-table-column label="操作" align="center" width="150px" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
						<el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="狀態" width="60px" align="center" fixed="right">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							:width="32"
							@change="handleDisableChange(scope.row)"
							:active-value="1"
							:inactive-value="0"
						/>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			:title="modify ? '修改部門' : '創建部門'"
			:visible.sync="show_dialog"
			center
			custom-class="dialog-n"
			:destroy-on-close="true"
			:close-on-click-modal="false"
		>
			<el-form ref="company" :model="company" size="small" label-position="left" :rules="rules">
				<el-form-item label="費用代碼" prop="feeCode">
					<el-input v-model="company.feeCode" />
				</el-form-item>
				<el-form-item label="部門名稱" prop="name">
					<el-input v-model="company.name" />
				</el-form-item>
				<el-form-item label="説明">
					<el-input v-model="company.note" />
				</el-form-item>
				<el-form-item label="廠區">
					<el-input v-model="company.area" />
				</el-form-item>
				<el-form-item label="所屬部門">
					<el-cascader
						:options="companies"
						:props="cascader_props"
						clearable
						v-model="company.ancestorIds"
						size="small"
						style="width: 100%"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="saveClick">確定</el-button>
					<el-button @click="resetClick" v-if="!modify">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import { saveCompany } from '@/api/company'

    const defaultCompany = {
        id: null,
        feeCode: null,
        name: null,
        area: null,
        note: null,
        status: 0,
        ancestorIds: []
    }
	export default {
		data() {
			return {
                companies: [],
                show_dialog: false,
                modify: false,
                company: Object.assign({}, defaultCompany),
                rules: {
                    name: [{ required: true, message: '請輸入部門名稱', trigger: 'blur' }],
                    feeCode: [{ required: true, message: '請輸入費用代碼', trigger: 'blur' }]
                },
                cascader_props: {
					label: 'name',
					value: 'id',
					children: 'descendants',
					checkStrictly: true
				}
			}
		},
		methods: {
            getCompanies() {

            },
			showNewClick: function (e) {
                this.company = Object.assign({}, defaultCompany)
                this.show_dialog = true
                this.modify = false
			},
			handleDisableChange: function (row) {

			},
			editClick: function (row) { },
			deleteClick: function (row) {

            },
            saveClick: function(e) {
                saveCompany(this.modify, this.company).then(res => {
                    if (res.data.code === 200) {
                        this.showSuccess(this.modify ? `修改成功` : `創建成功`)
                        this.show_dialog = false
                        this.getCompanies()
                    } else {
                        this.showError(this.modify ? `修改失敗` : `修改成功`)
                    }
                })
            },
            resetClick: function(e) {
                this.$refs.company.resetFields()
            }
		}
	}
</script>
