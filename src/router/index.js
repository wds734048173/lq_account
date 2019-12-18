import Vue from 'vue'
import Router from 'vue-router'
import routes from '../router/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: routes
})

// export default router