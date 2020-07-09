<template>
	<div>
		<div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
		</div>
		<el-form
			class="form"
			ref="menu"
			:model="menu"
			size="small"
			label-position="left"
			style="width: 500px; margin: 16px auto; background: #ffffff; padding: 16px;"
			:rules="rules"
		>
			<el-form-item label="菜單名稱" prop="title">
				<el-input v-model="menu.title" />
			</el-form-item>
			<el-form-item label="上級菜單">
				<el-select v-model="menu.parentId" placeholder="請選擇菜單" style="width: 100%;">
					<el-option v-for="item in selectMenuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="前端名稱" prop="name">
				<el-input v-model="menu.name"></el-input>
			</el-form-item>
			<el-form-item label="前端圖標">
				<el-input v-model="menu.icon" :suffix-icon="menu.icon" style="width: 100%"></el-input>
			</el-form-item>
			<el-form-item label="是否顯示">
				<el-radio-group v-model="menu.hidden" style="width: 100%;">
					<el-radio :label="0">是</el-radio>
					<el-radio :label="1">否</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="menu.sort"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button v-if="!modify" @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { createMenu, updateMenu, getMenu, fetchList } from '../../../../api/menu.js'
	export default {
		name: 'MenuDetail',
		props: {
			modify: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				menu: {
					id: '',
					title: '',
					parentId: 0,
					name: '',
					icon: '',
					hidden: 0,
					sort: 0
				},
				selectMenuList: [],
				rules: {
					title: [
						{ required: true, message: '請輸入菜單名稱', trigger: 'blur' },
						{ min: 2, max: 140, message: '長度在 2 到 100 個字符', trigger: 'blur' }
					],
					name: [
						{ required: true, message: '請輸入前端名稱', trigger: 'blur' },
						{ min: 2, max: 140, message: '長度在 2 到 100 個字符', trigger: 'blur' }
					]
				}
			}
		},
		mounted() {
			if (this.modify) {
				getMenu(this.$router.query.id).then(res => {
					if (res.data.code === 200) {
						this.menu = res.data.data
					}
				})
			}
			this.getSelectMenuList()
		},
		methods: {
			getSelectMenuList() {
				fetchList(0, { pageSize: 100, pageNum: 1 }).then(res => {
					if (res.data.code === 200) {
                        if (res.data.data.list !== null && res.data.data.list.length > 0) {
                            this.selectMenuList = res.data.data.list
                        }
						this.selectMenuList.unshift({ id: 0, title: '無上級菜單' })
					}
				})
			},
			onSubmit: function (e) {
				this.$refs.menu.validate(valid => {
					if (valid) {
						if (this.modify) {
							updateMenu(this.menu.id, this.menu).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`修改成功`)
									this.backClick()
								} else {
									this.showSuccess(`修改失敗`)
								}
							})
						} else {
							createMenu(this.menu).then(res => {
								if (res.data.code === 200) {
									this.showSuccess(`創建成功`)
									this.backClick()
								} else {
									this.showError(`創建失敗`)
								}
							})
						}
					}
				})
			},
			resetForm: function (e) { },
			backClick: function (e) {
				this.$router.back(-1)
			}
		}
	}
</script>
