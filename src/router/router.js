const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: resolve => require(['@/pages/Main.vue'], resolve),
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: resolve => require(['@/components/Home.vue'], resolve),
    // 方式一
    // children: [
      /*{
        path: '/user',
        name: 'User',
        component: resolve => require(['@/pages/user/User.vue'], resolve),
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import('@/pages/user/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: () => import('@/pages/user/Register.vue')
          }
        ]
      }, {
        path: '/enterprise',
        name: 'Enterprise',
        component: resolve => require(['@/pages/enterprise/Enterprise.vue'], resolve),
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import('@/pages/enterprise/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: () => import('@/pages/enterprise/Register.vue')
          }
        ]
      }, {
        path: '/school',
        name: 'School',
        component: resolve => require(['@/pages/school/School.vue'], resolve),
        children: [
          {
            path: 'login',
            name: 'Login',
            component: () => import('@/pages/school/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: () => import('@/pages/school/Register.vue')
          }
        ]
      }*/
    // ]
  // },
  // 方式二
  /*{
    path: '/user',
    name: 'User',
    component: resolve => require(['@/pages/user/User.vue'], resolve),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/user/Login.vue')
      }, {
        path: 'register',
        name: 'Reigster',
        component: () => import('@/pages/user/Register.vue')
      }
    ]
  }, {
    path: '/enterprise',
    name: 'Enterprise',
    component: resolve => require(['@/pages/enterprise/Enterprise.vue'], resolve),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/enterprise/Login.vue')
      }, {
        path: 'register',
        name: 'Reigster',
        component: () => import('@/pages/enterprise/Register.vue')
      }
    ]
  }, {
    path: '/school',
    name: 'School',
    component: resolve => require(['@/pages/school/School.vue'], resolve),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/school/Login.vue')
      }, {
        path: 'register',
        name: 'Reigster',
        component: () => import('@/pages/school/Register.vue')
      }
    ]
  },*/

  {
    path: '/user/login',
    name: 'UserLogin',
    component: resolve => require(['@/pages/user/Login.vue'], resolve),
  },
  {
    path: '/user/register',
    name: 'UserRegister',
    component: resolve => require(['@/pages/user/Register.vue'], resolve),
  },
  {
    path: '/enterprise/login',
    name: 'EnterpriseLogin',
    component: resolve => require(['@/pages/enterprise/Login.vue'], resolve),
  },
  {
    path: '/enterprise/register',
    name: 'EnterpriseRegister',
    component: resolve => require(['@/pages/enterprise/Register.vue'], resolve),
  },
  {
    path: '/school/login',
    name: 'SchoolLogin',
    component: resolve => require(['@/pages/school/Login.vue'], resolve),
  },
  {
    path: '/school/register',
    name: 'SchoolRegister',
    component: resolve => require(['@/pages/school/Register.vue'], resolve),
  },
  {
    path: '/enterpriseInfo',
    name: 'EnterpriseInfo',
    component: resolve => require(['@/pages/view/EnterpriseInfo.vue'], resolve)
  },
  {path: '/linkAccount', name: 'LinkAccount', component: resolve => require(['@/pages/view/LinkAccount.vue'], resolve)},
  {path: '/foundPass', name: 'FoundPass', component: resolve => require(['@/pages/view/FoundPass.vue'], resolve)},
  {
    path: '/foundPassStep2',
    name: 'FoundPassStep2',
    component: resolve => require(['@/pages/view/FoundPassStep2.vue'], resolve)
  },
  {path: '/wxlogin', name: 'Wxlogin', component: resolve => require(['@/pages/user/WxLogin.vue'], resolve)},
  {path: '/wxBind', name: 'WxBind', component: resolve => require(['@/pages/user/WxBind.vue'], resolve)},
  {path: '/selfManage', name: 'SelfManage', component: resolve => require(['@/pages/view/SelfManage.vue'], resolve)},
  {
    path: '/userAccountManage',
    name: 'UserAccountManage',
    component: resolve => require(['@/pages/view/UserAccountManage.vue'], resolve)
  },
  {
    path: '/entAccountManage',
    name: 'EntAccountManage',
    component: resolve => require(['@/pages/view/EntAccountManage.vue'], resolve)
  },
  {
    path: '/404',
    meta: {title: "404", keepAlive: true},
    component: resolve => require(['@/pages/exception/404.vue'], resolve)
  },
  {
    path: '/403',
    meta: {title: "403", keepAlive: true},
    component: resolve => require(['@/pages/exception/403.vue'], resolve)
  },
  {
    path: '/500',
    meta: {title: "500", keepAlive: true},
    component: resolve => require(['@/pages/exception/500.vue'], resolve)
  },
  {
    path: '*',
    meta: {title: "404", keepAlive: true},
    component: resolve => require(['@/pages/exception/404.vue'], resolve)
  }
]

module.exports = routes;
