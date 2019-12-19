const routes = [
  { path: '/', name: 'home', component: resolve => require(['@/components/Home.vue'], resolve)}, 
  { path: '/login', name: 'Login', component: resolve => require(['@/components/Login.vue'], resolve)}, 
  { path: '/register', name: 'Register', component: resolve => require(['@/components/Register.vue'], resolve)}, 
  { path: '/404', meta: { title: "404", keepAlive: true}, component:  resolve => require(['@/pages/exception/404.vue'], resolve)},
  { path: '/403', meta: { title: "403", keepAlive: true}, component:  resolve => require(['@/pages/exception/403.vue'], resolve)},
  { path: '/500', meta: { title: "500", keepAlive: true}, component:  resolve => require(['@/pages/exception/500.vue'], resolve)},
  { path: '*', meta: { title: "404", keepAlive: true}, component:   resolve => require(['@/pages/exception/404.vue'], resolve)}
]

module.exports = routes;
