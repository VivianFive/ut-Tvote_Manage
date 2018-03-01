import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

import Layout from '../components/Layout/index_m.vue'

Vue.use(Router);


export const routerMap = [
  {
    path: '/',
    redirect: '/home/index',
    hidden: true,
    name: 'index'
  },
  {
    path: '/login',
    hidden: true,
    noDropDown: true,
    name: 'login',
    component: (resolve) => require(['@/views/login'],resolve)
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/index',
    content: '平台概况',
    name: 'home',
    icon: 'speedometer',
    noDropDown: true,
    //hidden: true, // 在侧边栏中不显示该菜单
    children: [{
      path: 'index',
      // name: 'homeIndex',
      component: (resolve) => require(['@/views/index'],resolve)
    }]
  },
  {
    path: '/draftResolution',
    component: Layout,
    redirect: '/draftResolution/index',
    name: 'draftResolution',
    content: '提案管理',
    icon: 'clipboard',
    noDropDown: true,
    children: [
      {
        path: 'index',
        // name: 'draftResolutionIndex',
        component: (resolve) => require(['@/views/draftResolution/index'], resolve)
      },
      {
        path: 'draftEdit',
        name: 'draftResolutionEdit',
        content: '提案编辑',
        component: (resolve) => require(['@/views/draftResolution/mngDraftEdit'], resolve)
      },
      {
        path: 'draftInfo',
        name: 'draftResolutionContent',
        content: '提案详情',
        component: (resolve) => require(['@/views/draftResolution/mngDraftEdit'], resolve)
      },{
        path:'draftProof',
        name:'draftProof',
        content:'提案佐证',
        component: (resolve) => require(['@/views/draftResolution/mngDraftEdit'],resolve)
      }
      /*{
        path: 'draftInfo',
        name: 'draftResolutionContent',
        content: '提案详情',
        component: (resolve) => require(['@/views/draftResolution/draftInfo'], resolve)
      },{
        path:'groupCapacity',
        name:'groupCapacityContent',
        content:'群体智能',
        component: (resolve) => require(['@/views/draftResolution/groupCapacity'],resolve)
      },*/
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'order',
    content: '订单管理',
    icon: 'document-text',
    noDropDown: true,
    children: [
      {
        path: 'index',
        // name: 'orderIndex',
        component: (resolve) => require(['@/views/order/index'], resolve)
      }
    ]
  },{
    path: '/user',
    component: Layout,
    redirect: '/user/normalUser',
    name: 'user',
    content: '用户管理',
    icon: 'ios-person',
    children: [
      {
        path: 'normalUser',
        name: 'normalUserIndex',
        content: '普通用户',
        component: (resolve) => require(['@/views/user/index'],resolve)
      },{
        path: 'userInfo',
        name: 'userInfo',
        hidden: true,
        content: '用户详情',
        component: (resolve) => require(['@/views/user/userInfo'],resolve)
      },{
        path: 'enterpriseInfo',
        name: 'enterpriseInfo',
        hidden: true,
        content: '用户详情',
        component: (resolve) => require(['@/views/user/enterpriseInfo'],resolve)
      },{
        path: 'enterpriseUser',
        name: 'enterpriseUserIndex',
        content: '企业用户',
        component: (resolve) => require(['@/views/user/enterpriseUser'],resolve)
      }
    ]
  },{
    path: '/audit',
    component: Layout,
    redirect: '/audit/draftResolution',
    name: 'audit',
    content: '审核管理',
    icon: 'android-done',
    meta: {
      menuIndex: 4
    },
    children: [
      {
        path: 'draftResolution',
        name: 'draftIndex',
        meta: {
          menuIndex: 4
        },
        content: '提案审核',
        component: (resolve) => require(['@/views/audit/draftResolution'],resolve)
      },{
        path: 'comment',
        name: 'commentIndex',
        meta: {
          menuIndex: 4
        },
        content: '评论审核',
        component: (resolve) => require(['@/views/audit/comment'],resolve)
      },{
        path: 'enterprise',
        name: 'enterpriseIndex',
        meta: {
          menuIndex: 4
        },
        content: '企业审核',
        component: (resolve) => require(['@/views/audit/enterprise'],resolve)
      },{
        path: 'draftAudit',
        name: 'draftAudit',
        hidden: true,
        content: '审核提案详情',
        component: (resolve) => require(['@/views/audit/draftAudit'],resolve)
      },{
        path: 'draftInfo',
        name: 'draftInfo',
        hidden: true,
        content: '查看提案详情',
        component: (resolve) => require(['@/views/audit/draftInfo'],resolve)
      }
    ]
  },{
    path: '/settings',
    component: Layout,
    redirect: '/settings/app',
    name: 'settings',
    content: '系统设置',
    icon: 'android-settings',
    meta: {
      menuIndex: 5
    },
    children: [
      {
        path: 'app',
        name: 'appSettings',
        content: 'app设置',
        meta: {
          menuIndex: 5
        },
        component: (resolve) => require(['@/views/settings/appSettings'],resolve)
      },{
        path: 'platform',
        name: 'platformSettings',
        content: '平台设置',
        meta: {
          menuIndex: 5
        },
        component: (resolve) => require(['@/views/settings/platformSettings'],resolve)
      },{
        path: 'version',
        name: 'version-mng',
        content: '版本管理',
        meta: {
          menuIndex: 5
        },
        component: (resolve) => require(['@/views/settings/versionMng'],resolve)
      }
    ]
  }
];

export default new Router({
  //scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
