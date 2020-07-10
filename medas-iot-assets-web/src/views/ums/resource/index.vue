<template>
    <div>
        <div class="toolbar">
            <el-button icon="el-icon-folder-add" round size="mini" @click="categoryClick">分類</el-button>
            <el-button
                type="primary"
                circle
                icon="el-icon-plus"
                class="btn"
                size="mini"
                @click="newClick"
            ></el-button>
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
        newClick: function(e) {

        },
        categoryClick: function(e) {
            this.$router.push('/ums/category')
        }
    }
}
</script>
