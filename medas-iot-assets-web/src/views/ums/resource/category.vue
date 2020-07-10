<template>
    <div>
        <div class="toolbar">
			<i class="el-icon-back" style="font-size: 24px;" @click="backClick" />
            <el-button
				type="primary"
				icon="el-icon-plus"
				circle
				style="float: right; clear: both"
				size="mini"
				@click="newClick"
			/>
		</div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        backClick: function(e) {
            this.$router.back(-1)
        },
        newClick: function(e) {
            
        }
    }
}
</script>
