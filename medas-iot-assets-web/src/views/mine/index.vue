<template>
	<div class="content-500 center">
		<i class="el-icon-user-solid pic" style="font-size: 48px;" v-if="mine.icon === null"></i>
		<img :src="mine.icon" class="pic" v-else />
		<p
			style="line-height: 2em; font-size: 14px; font-weight: bolder;"
		>{{mine.username}} / {{mine.nickname}}</p>
		<p>{{mine.companyName}}</p>
		<p class="item">
			<label>郵箱</label>
			{{mine.email}}
		</p>
		<p class="item">
			<label>分機</label>
			{{mine.ext}}
		</p>
		<p class="item">
			<label>手機</label>
			{{mine.phone}}
		</p>
		<p style="margin-top: 16px">
			<el-button type="primary" size="mini" @click="infoClick">修改</el-button>
			<el-button size="mini" @click="pwdClick">修改密碼</el-button>
		</p>

		<el-dialog
			title="修改信息"
			:visible.sync="show_dialog_info"
			center
			custom-class="dialog-n"
			:close-on-click-modal="false"
			:destroy-on-close="true"
		>
			<el-form ref="information" :model="information" label-position="left" size="small">
				<el-form-item label="郵箱">
					<el-input v-model="information.email" />
				</el-form-item>
				<el-form-item label="分機">
					<el-input v-model="information.ext" />
				</el-form-item>
				<el-form-item label="手機">
					<el-input v-model="information.phone" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="setInfoClick">確定</el-button>
					<el-button @click="show_dialog_info = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
			title="修改密碼"
			:visible.sync="show_dialog_pwd"
			center
			custom-class="dialog-n"
			:close-on-click-modal="false"
			:destroy-on-close="true"
		>
			<el-form ref="password" :model="password" label-position="left" size="small" :rules="rules">
				<el-form-item label="請輸入密碼" prop="password">
					<el-input v-model="password.password" type="password" />
				</el-form-item>
				<el-form-item label="請輸入新密碼" prop="newpwd">
					<el-input v-model="password.newpwd" type="password" />
				</el-form-item>
				<el-form-item label="再次輸入新密碼" prop="newpwd2">
					<el-input v-model="password.newpwd2" type="password" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="changePwdClick">確定</el-button>
					<el-button @click="show_dialog_pwd = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import { modifyMyselfInformation, modifyMyselfPassword } from '@/api/mine'
	export default {
		computed: {
			...mapGetters([
				'mine'
			])
		},
		data() {
			return {
				show_dialog_info: false,
				information: {
					email: '',
					phone: '',
					ext: '',
					password: '',
					newpwd: ''
				},
				password: {
					password: '',
					newpwd: '',
					newpwd2: ''
				},
				show_dialog_pwd: false,
				rules: {
					password: [{ message: '密碼不能為空', required: true, trigger: 'blur' }],
					newpwd: [{ message: '請輸入新密碼', required: true, trigger: 'blur' }],
					newpwd2: [{ message: '請再次輸入新密碼', required: true, trigger: 'blur' }]
				}
			}
		},
		methods: {
			infoClick: function (e) {
				this.information.email = this.mine.email
				this.information.phone = this.mine.phone
				this.information.ext = this.mine.ext
				this.show_dialog_info = true
			},
			pwdClick: function (e) {
				this.password.password = ''
				this.password.newpwd = ''
				this.password.newpwd2 = ''
				this.show_dialog_pwd = true
			},
			setInfoClick: function (e) {
				modifyMyselfInformation(this.information).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(`修改成功`)
						this.show_dialog_info = false
						this.$store.dispatch('MineInformation')
					} else {
						this.showError(`修改失敗`)
					}
				})
			},
			changePwdClick: function (e) {
				modifyMyselfPassword(this.password).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(`修改成功`)
						this.show_dialog_pwd = false
						this.$store.dispatch('Logout').then(_ => {
							self.location = '/#/login'
						})
					} else {
						this.showError(`失敗失敗`)
					}
				})
			}
		}
	}
</script>
<style scoped>
	.pic {
		width: 100px;
		height: 100px;
		border-radius: 50px;
		background: #f3f5f7f9;
		border: 3px solid #f3f5f7f9;
		text-align: center;
		line-height: 100px;
		color: #6699ff;
	}
	.center {
		text-align: center;
	}
	.item {
		line-height: 32px;
		text-align: start;
		width: 300px;
		margin-left: auto;
		margin-right: auto;
	}
	.item label {
		padding-right: 16px;
	}
</style>
