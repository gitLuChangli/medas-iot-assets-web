<template>
	<el-container class="container-main">
        <sidebar></sidebar>
        <el-container direction="vertical">
            <navbar></navbar>
            <app-main></app-main>
            <copyright></copyright>
        </el-container>
    </el-container>
</template>
<script>

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import Copyright from './components/Copyright'

export default {
    name: 'layout',
    components: {
        Navbar,
        Sidebar,
        AppMain,
        Copyright
    },
    computed: {

    },
    beforeMount() {
        console.log(`beforeMount`)
        this.$store.dispatch('CheckToken')
    },
    mounted() {
        this.$store.dispatch('SetClientHeight', document.documentElement.clientHeight)
        window.onresize = _ => {
            this.$store.dispatch('SetClientHeight', document.documentElement.clientHeight)
        }
    }
}
</script>
