<template>
    <div>
        <div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
		</div>
        <div class="content">
			<el-table :data="items" border stripe size="mini" style="margin-bottom: 16px" :max-height="clientHeight - 250">
				<el-table-column prop="gzhNum" label="管制編標" align="center" min-width="140" />
                <el-table-column prop="cchNum" label="財產編號" align="center" min-width="120" />
                <el-table-column prop="shbName" label="設備名稱" align="center" :show-overflow-tooltip="true" />
                <el-table-column prop="shbBrand" label="設備品牌" align="center" :show-overflow-tooltip="true" />
                <el-table-column prop="shbSpec" label="設備規格" align="center" min-width="200" :show-overflow-tooltip="true" />
                <el-table-column prop="completeTime" label="盤點時間" align="center" min-width="150" />
                <el-table-column prop="username" label="盤點人" align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row.username}} {{scope.row.nickname}}
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="備註" align="center" :show-overflow-tooltip="true" />
                <el-table-column prop="status" label="狀態" align="center">
                    <template slot-scope="scope">
                        <label style="color: #F56C6C" v-if="scope.row.status === 0">未盤點</label>
                        <label style="color: #409EFF" v-else>已盤點</label>
                    </template>
                </el-table-column>
			</el-table>
            <el-pagination
				@size-change="sizeChange"
				@current-change="pageChange"
				:current-page.sync="page"
				:page-sizes="[10, 15, 20, 25, 30, 50]"
				:page-size="size"
				layout="total, prev, pager, next"
				:hide-on-single-page="true"
				:total="total"
			/>
		</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'clientHeight'
        ])
    },
    data() {
        return {
            details: [],
            items: [],
            page: 1,
            size: 15,
            total: 0
        }
    },
    mounted() {
        this.details = this.$route.params.details
        this.total = this.details.length
        this.copy()
    },
    methods: {
        copy() {
            this.items = []
            var offset = (this.page - 1) * this.size
            var length = this.size
            if (offset + length > this.details.length) length = this.details.length - offset
            for (var i = 0; i < length; i++) {
                this.items.push(this.details[offset + i])
            }
        },
        backClick: function(e) {
            this.$router.back(-1)
        },
        sizeChange: function(val) {
            this.size = val
            this.copy()
        },
        pageChange: function(val) {
            this.page = val
            this.copy()
        }
    }
}
</script>
