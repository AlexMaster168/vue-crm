import axios from "axios"

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        return await axios.post(`https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories/users/${uid}/records.json`, record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({ commit }) {
      try {
        const records = await axios.get(`https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories/users/records.json`)
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  async fetchRecordById({dispatch, commit}, id) {
    try {
      const uid = await dispatch('getUid')
      const record = axios.get(`https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories/users/${uid}/records.json`)
      return {...record, id}
    } catch (e) {
      commit('setError', e)
      throw e
    }
  }
}
