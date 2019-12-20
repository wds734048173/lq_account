const routes = [
 { 
    path: '/', 
    name: 'Home', 
    component: resolve => require(['@/components/Home.vue'], resolve),
    redirect:'/user',
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
  { path: '/login', name: 'Login', component: resolve => require(['@/components/Login.vue'], resolve)}, 
  { path: '/register', name: 'Register', component: resolve => require(['@/components/Register.vue'], resolve)}, 
  { path: '/404', meta: { title: "404", keepAlive: true}, component:  resolve => require(['@/pages/exception/404.vue'], resolve)},
  { path: '/403', meta: { title: "403", keepAlive: true}, component:  resolve => require(['@/pages/exception/403.vue'], resolve)},
  { path: '/500', meta: { title: "500", keepAlive: true}, component:  resolve => require(['@/pages/exception/500.vue'], resolve)},
  { path: '*', meta: { title: "404", keepAlive: true}, component:   resolve => require(['@/pages/exception/404.vue'], resolve)}
]

module.exports = routes;
