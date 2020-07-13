<template>
	<div>
		<div class="toolbar">
            <span>輸入搜索：</span>
			<el-input
				placeholder="請輸入資產信息"
				v-model="qp.keyword"
				size="small"
				style="width: 250px"
				clearable
				@clear="queryAssets"
			>
				<el-button slot="append" icon="el-icon-search" @click="queryAssets"></el-button>
			</el-input>
			<el-button type="primary" icon="el-icon-upload2" circle class="btn" size="mini" @click="newClick" />
		</div>
	</div>
</template>
<script>
export default {
    data() {
        return {
            qp: {
                keyword: null
            }
        }
    },
    methods: {
        queryAssets: function(e) {},
        newClick: function(e) {}
    }
}
</script>
