
const state = {
    userInfo: null,
    loading: true,
}

const getters = {
    getuserInfo(state) {
        return state.userInfo;
    },
    getLoading(state) {
        return state.loading;
    }
}

const actions = {
    LoginByUsername({ commit }, data) {
        commit('setUserInfo', data)
    },
    setLoading({ commit }, data) {
        commit('changeLoading', data)
    }
}

const mutations = {
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    changeLoading(state, val) {
        state.loading = val
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
