import axios from "axios"

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = {...getters.info, ...toUpdate}
        await axios.patch(`https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories/users/${uid}/info.json`, updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo({commit}) {
      try {
        const info = await axios.get(`https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories/users/info.json`)
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
