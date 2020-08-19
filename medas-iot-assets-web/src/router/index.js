import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/Layout'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        component: () =>
            import('@/views/login/index'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        /*
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () =>
                import('@/views/home/index'),
            meta: { title: '首頁', icon: 'el-icon-s-data' }
        }]
        */
       redirect: '/assets/mine'
    }, {
        path: '/assets',
        component: Layout,
        redirect: '/assets/list',
        name: 'assets',
        meta: { title: '固定資產', icon: 'el-icon-s-claim' },
        children: [{
            path: 'import',
            name: 'import',
            component: () =>
                import('@/views/assets/import'),
            meta: { title: '導入資產' }
        }, {
            path: 'list',
            name: 'list',
            component: () =>
                import('@/views/assets/index'),
            meta: { title: '資產列表' }
        }, {
            path: 'work',
            name: 'work',
            component: () =>
                import('@/views/assets/work'),
            meta: { title: '盘点工单' }
        }, {
            path: 'mine',
            name: 'mine',
            component: () =>
                import('@/views/assets/mine'),
            meta: { title: '我的工單' }
        }, {
            path: 'details',
            name: 'details',
            component: () =>
                import('@/views/assets/details'),
            meta: { title: '盤點清單' }
        }]
    },
    {
        path: '/ums',
        component: Layout,
        redirect: '/ums/role',
        name: 'ums',
        meta: { title: '系統管理', icon: 'el-icon-s-tools' },
        children: [{
            path: 'role',
            name: 'role',
            component: () =>
                import('@/views/ums/role/index'),
            meta: { title: '角色列表' }
        }, {
            path: 'role-menu',
            name: 'role-menu',
            component: () =>
                import('@/views/ums/role/role-menu'),
            meta: { title: '分配菜單' }
        }, {
            path: 'role-resource',
            name: 'role-resource',
            component: () =>
                import('@/views/ums/role/role-resource'),
            meta: { title: '分配資源' }
        }, {
            path: 'menu',
            name: 'menu',
            component: () =>
                import('@/views/ums/menu/index'),
            meta: { title: '菜單列表' }
        },
        {
            path: 'add-menu',
            name: 'add-menu',
            component: () =>
                import('@/views/ums/menu/add'),
            meta: { title: '添加菜單' }
        },
        {
            path: 'edit-menu',
            name: 'edit-menu',
            component: () =>
                import('@/views/ums/menu/edit'),
            meta: { title: '修改菜單' }
        },
        {
            path: 'resource',
            name: 'resource',
            component: () =>
                import('@/views/ums/resource/index'),
            meta: { title: '資源列表' }
        },
        {
            path: 'category',
            name: 'category',
            component: () =>
                import('@/views/ums/resource/category'),
            meta: { title: '資源分類' }
        }, {
            path: 'company',
            name: 'company',
            component: () =>
                import('@/views/ums/company/index'),
            meta: { title: '部門列表' }
        }, {
            path: 'admin',
            name: 'admin',
            component: () =>
                import('@/views/ums/admin/index'),
            meta: { title: '用戶列表' }
        }
        ]
    },
    {
        path: '/mine',
        component: Layout,
        redirect: '/mine/index',
        name: 'mine',
        meta: { title: '個人中心', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'index',
                name: 'index',
                component: () =>
                    import('@/views/mine/index'),
                meta: { title: '個人信息' }
            },
            {
                path: 'log',
                name: 'log',
                component: () =>
                    import('@/views/mine/log'),
                meta: { title: '操作日誌' }
            }
        ]
    }
    ]
})
