import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '../views/Layout/Layout'

export default new Router({
    routes: [{
            path: '/login',
            component: () =>
                import ('@/views/login/index'),
            hidden: true
        },
        {
            path: '',
            component: Layout,
            redirect: '/home',
            children: [{
                path: 'home',
                name: 'home',
                component: () =>
                    import ('@/views/home/index'),
                meta: { title: '首頁', icon: 'el-icon-s-data' }
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
                        import ('@/views/ums/role/index'),
                    meta: { title: '角色列表' }
                }, {
                    path: 'menu',
                    name: 'menu',
                    component: () =>
                        import ('@/views/ums/menu/index'),
                    meta: { title: '菜單列表' }
                },
                {
                    path: 'add-menu',
                    name: 'add-menu',
                    component: () =>
                        import ('@/views/ums/menu/add'),
                    meta: { title: '添加菜單' }
                },
                {
                    path: 'edit-menu',
                    name: 'edit-menu',
                    component: () =>
                        import ('@/views/ums/menu/edit'),
                    meta: { title: '修改菜單' }
                }

            ]
        }
    ]
})

/*
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            components: () =>
                import ('@/views/hone/index'),
            meta: { title: '首頁', icon: 'el-icon-s-data' }
        }]
    }
]

export default new Router({
    routes: [{
        path: '/',
        name: '首页',
        component: (resolve) => require(['@/components/admin'], resolve),
        children: [{
                path: '/user/',
                component: (resolve) => require(['@/components/user/list'], resolve)
            },
            {
                path: '/device/type',
                component: (resolve) => require(['@/components/device/type'], resolve)
            },
            {
                path: '/device/version',
                component: (resolve) => require(['@/components/device/version'], resolve)
            },
            {
                path: '/device/add',
                component: (resolve) => require(['@/components/device/add'], resolve)
            },
            {
                path: '/device/list',
                component: (resolve) => require(['@/components/device/list'], resolve)
            },
            {
                path: '/device/data',
                component: (resolve) => require(['@/components/device/data'], resolve)
            },
            {
                path: '/system/user',
                component: (resolve) => require(['@/components/system/user'], resolve)
            },
            {
                path: '/system/resource',
                component: (resolve) => require(['@/components/system/resource'], resolve)
            },
            {
                path: '/system/authority',
                component: (resolve) => require(['@/components/system/authority'], resolve)
            },
            {
                path: '/system/menu',
                component: (resolve) => require(['@/components/system/menu'], resolve)
            },
            {
                path: '/system/role',
                component: (resolve) => require(['@/components/system/role'], resolve)
            },
            {
                path: 'system/company',
                component: (resolve) => require(['@/components/system/company'], resolve)
            },
            {
                path: '/app/list',
                component: (resolve) => require(['@/components/app/list'], resolve)
            },
            {
                path: '/app/version',
                component: (resolve) => require(['@/components/app/version'], resolve)
            },
            {
                path: '/app/task',
                component: (resolve) => require(['@/components/app/task'], resolve)
            },
            {
                path: '/app/records',
                component: (resolve) => require(['@/components/app/records'], resolve)
            },
            {
                path: '/ums/role',
                component: (resolve) => require(['@/views/ums/role/index'], resolve)
            },
            {
                path: '/ums/menu',
                component: (resolve) => require(['@/views/ums/menu/index'], resolve)
            },
            {
                path: '/ums/menu/add',
                component: (resolve) => require(['@/views/ums/menu/add'], resolve)
            },
            {
                path: '/ums/menu/edit',
                component: (resolve) => require(['@/views/ums/menu/edit'], resolve)
            }
        ]
    }]
})
*/