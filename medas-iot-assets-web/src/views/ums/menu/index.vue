<template>
    <div>
        <div class="toolbar">
            <i class="el-icon-back" style="font-size: 24px;" @click="backClick" v-if="parentId > 0"></i>
            <el-button
                type="primary"
				icon="el-icon-plus"
                circle
                class="btn"
                size="mini"
                @click="newClick"
            />
        </div>
        <div class="content">
            <el-table
                :data="menus"
                border
                stripe
                size="mini"
                v-loading="listLoading"
            >
                <el-table-column prop="title" label="菜單名稱" align="center" />
                <el-table-column label="菜單級數" align="center">
                    <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
                </el-table-column>
                <el-table-column prop="name" label="前端名稱" align="center" />
                <el-table-column label="前端圖標" align="center">
                    <template slot-scope="scope">
                        <i :class="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column label="是否顯示" width="100px" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.hidden"
                            :width="32"
                            @change="handleDisableChange(scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                        />
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" align="center" />
                <el-table-column label="設置" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            :disabled="scope.row.level | disableNextLevel"
                            @click="nextLeverClick(scope.row)"
                        >查看下級</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150px" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="editClick(scope.row)">修改</el-button>
                        <el-button size="mini" type="text" @click="deleteClick(scope.row)">刪除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="listMenus"
                @current-change="listMenus"
                :current-page.sync="qp.pageNum"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="qp.pageSize"
                layout="total, prev, pager, next"
                :hide-on-single-page="false"
                :total="total"
            />
        </div>
    </div>
</template>
<script>
	import { fetchList, updateHidden, deleteMenu } from '../../../api/menu.js'
	export default {
		data() {
			return {
				menus: [],
				qp: {
					pageNum: 1,
					pageSize: 10
				},
				total: 0,
				listLoading: false,
				parentId: 0
			}
		},
		mounted() {
			this.getList()
		},
		watch: {
			$route(route) {
				this.getList()
			}
		},
		methods: {
			getList() {
				this.listLoading = true
				if (this.$route.query.parentId != null) {
					this.parentId = this.$route.query.parentId
				} else {
					this.parentId = 0
				}
				fetchList(this.parentId, this.qp).then(res => {
					if (res.data.code === 200) {
						this.menus = res.data.data.list
						this.total = res.data.data.total
					}
					this.listLoading = false
				})
			},
			newClick: function (e) {
				this.$router.push('/ums/add-menu')
			},
			handleDisableChange: function (val) {
				updateHidden(val.id, val.hidden).then(res => {
					if (res.data.code === 200) {
						this.showSuccess(val.hidden === 1 ? `顯示成功` : `隱藏成功`)
						this.getList()
					} else {
						this.showError(val.hidden === 1 ? `顯示失敗` : `隱藏失敗`)
					}
				})
			},
			nextLeverClick: function (val) {
				this.$router.push({ path: '/ums/menu', query: { parentId: val.id } })
			},
			editClick: function (val) {
				this.$router.push({ path: '/ums/edit-menu', query: { id: val.id } })
			},
			deleteClick: function (val) {
				this.$confirm(`此操作將徹底刪除 <strong>${val.name}</strong> 及其下級菜單, 是否繼續？`, '提示', {
					confirmButtonText: '刪除',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					deleteMenu(val.id).then(res => {
						if (res.data.code === 200) {
							this.showSuccess(`刪除成功`)
							this.getList()
						} else {
							this.showError(`刪除失敗`)
						}
					})
				})
			},
			listMenus() { },
			backClick() {
				this.$router.back(-1)
			}
		},
		filters: {
			levelFilter(value) {
				if (value === 0) {
				return '一級'
				} else if (value === 1) {
				return '二級'
				}
			},
			disableNextLevel(value) {
				if (value === 0) {
				return false
				} else {
				return true
				}
			}
		}
	}
</script>
