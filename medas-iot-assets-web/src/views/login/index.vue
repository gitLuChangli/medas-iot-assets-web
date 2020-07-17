<template>
	<div class="login-view">
		<div class="header">
			<img src="../../../static/ic_logo.png" class="logo" />
		</div>
		<div class="login">
			<p class="title">登入</p>
			<el-form ref="form" :model="form" :rules="rules" size="middle">
				<el-form-item prop="username">
					<el-input v-model="form.username" placeholder="請輸入用戶名" />
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						v-model="form.password"
						type="password"
						placeholder="請輸入密碼"
					/>
				</el-form-item>
				<el-form-item prop="verifyCode" v-if="verify">
					<el-input
						v-model="form.verifyCode"
						placeholder="請輸入驗證碼"
						style="width: 150px; float: left"
						@keyup.enter.native="onSubmit"
					/>
					<img :src="verCode" style="margin: 5px 16px;" @click="newVerCode" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="login-button" @click="onSubmit" :loading="logining">登入</el-button>
				</el-form-item>
			</el-form>
		</div>
		<p class="note">此網頁最好使用IE11瀏覽器、Edge瀏覽器、谷歌瀏覽器、蘋果瀏覽器、火狐瀏覽器等新式瀏覽器進行瀏覽。</p>
	</div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: 'W0515366',
                password: '12345678',
                verifyCode: ''
            },
            verCode: '',
            rules: {
                username: [{required: true, message: '請輸入用戶名', trigger: 'blur'}],
                password: [{required: true, message: '請輸入密碼', trigger: 'blur'}],
                verifyCode: [{required: true, message: '請輸入驗證碼', trigger: 'blur'}]
            },
            logining: false,
            login: '登入',
            verify: false
        }
	},
    methods: {
        newVerCode(e) {
			this.verCode = `http://127.0.0.1:8000/vcode?username=${this.form.username}&data=` + Date.parse(new Date())
        },
        onSubmit(e) {
            this.$refs.form.validate(valid => {
                if (valid) {
					this.logining = true
                    this.$axios({
						url: `/login`,
                        method: `post`,
						data: this.form
                    }).then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            switch (res.data.code) {
                                case 200:
									this.$store.dispatch('SetToken', res.data.data.token)
									this.$store.dispatch('SetTokenHead', res.data.data.tokenHead)
                                    self.location = '/'
                                    break
                                case 1000:
									this.verify = true
									this.newVerCode(null)
									this.showError(res.data.message)
                                    break
                                default:
									this.showError(res.data.message)
									if (this.verify) this.newVerCode(null)
                                    break
                            }
                        } else {
                            this.showError(`登入失敗`)
						}
						this.logining = false
                    }).catch(_ => {
						this.logining = false
					})
                }
            })
        }
    }
}
</script>
<style scoped>
.login-view {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow-y: auto;
	background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
}
.header {
	width: 100%;
	height: 60px;
	background: #393f4c;
	line-height: 60px;
	box-shadow: 0 3px 6px #00000016;
}
.logo {
	padding: 6px 16px;
	height: 48px;
}
.login {
	-webkit-border-radius: 5px;
	border-radius: 5px;
	-moz-border-radius: 5px;
	background-clip: padding-box;
	margin: 100px auto;
	width: 350px;
	padding: 32px;
	background: #fff;
	border: 1px solid #eaeaea;
	box-shadow: 0 3px 6px #00000016;
}
.title {
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	height: 64px;
}
.login-button {
	width: 100%;
	background: #6699ff;
	border: none;
}
.login-button:hover {
	background: #0252db;
}
.note {
	text-align: center;
	color: #00000090;
	font-size: 12px;
	font-weight: bolder;
	position: fixed;
	bottom: 80px;
	width: 100%;
	overflow: hidden;
}
</style>
