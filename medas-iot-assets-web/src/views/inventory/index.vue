<template>
	<div>
		<div class="content">
			<el-table :data="orders" border stripe size="mini" v-loading="listLoading">
				<el-table-column prop="id" label="單號" align="center" />
                <el-table-column prop="count" label="資產數量" align="center" />
                <el-table-column prop="counted" label="已盤點數量" align="center" />
                <el-table-column prop="status" label="工單狀態" align="center" />
                <el-table-column prop="createTime" label="創建時間" align="center" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import { queryInventory } from '@/api/inventory'

	export default {
		data() {
			return {
				listLoading: false,
                orders: [],
                companyId: '70321065267560448',
                qp: {
                    page: 1,
                    size: 0
                }
			}
        },
        mounted() {
            queryInventory(this.companyId, this.qp).then(res => {
                if (res.data.code === 200) {
                    this.orders = res.data.data.list
                }
            })
        }
	}
</script>
