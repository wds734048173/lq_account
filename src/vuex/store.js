import Vue from 'vue'
import Vuex from 'vuex'
import com from './modules/com'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    // plugins: [createPersistedState({storage: window.sessionStorage})],
    plugins: [createPersistedState()],  //存储到localStorage
    modules: {
        com: com
    }
})