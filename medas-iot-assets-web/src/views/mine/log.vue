<template>
    <div>
<div class="content">
			<el-table :data="logs" size="mini">
                <el-table-column type="index" width="50" />
				<el-table-column prop="createTime" label="时间" />
				<el-table-column prop="ip" label="IP"  />
				<el-table-column prop="userAgent" label="浏览器" />
			</el-table>
			<el-pagination
				@current-change="pageChange"
				:current-page.sync="qp.pageNum"
				:page-size="qp.pageSize"
				layout="total, prev, pager, next"
				:hide-on-single-page="false"
				:total="total"
			/>
</div>
    </div>
</template>
<script>
import { queryMineLog } from '@/api/mine'
export default {
    data() {
        return {
            qp: {
                pageNum: 1,
                pageSize: 20
            },
            total: 0,
            logs: []
        }
    },
    mounted() {
        this.queryMineLog()
    },
    methods: {
        queryMineLog() {
            queryMineLog(this.qp).then(res => {
                if (res.data.code === 200) {
                    this.logs = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        sizeChange: function(v) {
            this.qp.pageSize = v
            this.queryMineLog()
        },
        pageChange: function(v) {
            this.qp.pageNum = v
            this.queryMineLog()
        }
    }
}
</script>
