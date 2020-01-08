const routes = [
 { 
    path: '/', 
    name: 'Home', 
    component: resolve => require(['@/components/Home.vue'], resolve),
    redirect:'/user/login',
    children:[
      {
        path: '/user',
        name: 'User',
        component: resolve => require(['@/pages/user/User.vue'], resolve),
        children: [
          {
            path: 'login',
            name: 'Login',
            component: ()=> import('@/pages/user/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: ()=> import('@/pages/user/Register.vue')
          }
        ]
      }, {
        path: '/enterprise',
        name: 'Enterprise',
        component: resolve => require(['@/pages/enterprise/Enterprise.vue'], resolve),
        redirect:'/enterprise/login',
        children: [
          {
            path: 'login',
            name: 'Login',
            component: ()=> import('@/pages/enterprise/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: ()=> import('@/pages/enterprise/Register.vue')
          }
        ]
      }, {
        path: '/school',
        name: 'School',
        component: resolve => require(['@/pages/school/School.vue'], resolve),
        redirect:'/school/login',
        children: [
          {
            path: 'login',
            name: 'Login',
            component: ()=> import('@/pages/school/Login.vue')
          }, {
            path: 'register',
            name: 'Reigster',
            component: ()=> import('@/pages/school/Register.vue')
          }
        ]
      }
    ]
  }, 
  { path: '/enterpriseInfo', name: 'EnterpriseInfo', component: resolve => require(['@/pages/view/EnterpriseInfo.vue'], resolve)}, 
  { path: '/linkAccount', name: 'LinkAccount', component: resolve => require(['@/pages/view/LinkAccount.vue'], resolve)}, 
  { path: '/foundPass', name: 'FoundPass', component: resolve => require(['@/pages/view/FoundPass.vue'], resolve)}, 
  { path: '/foundPassStep2', name: 'FoundPassStep2', component: resolve => require(['@/pages/view/FoundPassStep2.vue'], resolve)}, 
  { path: '/wxlogin', name: 'Wxlogin', component: resolve => require(['@/pages/user/WxLogin.vue'], resolve)}, 
  { path: '/accountManage', name: 'AccountManage', component: resolve => require(['@/pages/view/AccountManage.vue'], resolve)}, 
  { path: '/404', meta: { title: "404", keepAlive: true}, component:  resolve => require(['@/pages/exception/404.vue'], resolve)},
  { path: '/403', meta: { title: "403", keepAlive: true}, component:  resolve => require(['@/pages/exception/403.vue'], resolve)},
  { path: '/500', meta: { title: "500", keepAlive: true}, component:  resolve => require(['@/pages/exception/500.vue'], resolve)},
  { path: '*', meta: { title: "404", keepAlive: true}, component:   resolve => require(['@/pages/exception/404.vue'], resolve)}
]

module.exports = routes;
