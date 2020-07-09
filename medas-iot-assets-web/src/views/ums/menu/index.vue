<template>
	<div>
		<div class="toolbar" style="text-align: center">
			<el-button type="primary el-icon-plus" circle class="btn" size="mini" @click="newClick" />
		</div>
		<div class="content">
			<el-table :data="menus" style="width: 100%; margin-bottom: 20px;" border stripe size="mini">
				<el-table-column prop="title" label="菜單名稱" align="center" />
				<el-table-column prop="level" label="菜單級數" align="center" />
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
							:active-value="0"
							:inactive-value="1"
						/>
					</template>
				</el-table-column>
                <el-table-column prop="order" label="排序" />
                <el-table-column label="下級">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="nextLeverClick(scope.row)">設置</el-button>
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
				:current-page.sync="qp.page"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="qp.size"
				layout="total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                menus: [],
                qp: {
                    page: 1,
                    size: 10
                },
                total: 0
			}
		},
		mounted() {

		},
		methods: {
			newClick: function (e) {
                this.$router.push('/ums/menu/add')
            },
            handleDisableChange: function(val) {},
            nextLeverClick: function(val) {},
            editClick: function(val) {},
            deleteClick: function(val) {},
            listMenus() {}
		}
	}
</script>