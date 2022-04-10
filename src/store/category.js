import axios from "../axios/request"

const url = "https://vue-crm-1a078-default-rtdb.europe-west1.firebasedatabase.app/categories"

export default {
   actions: {
      async fetchCategories({ commit }) {
         try {
            const categories = await axios.get(`${url.json}`)
            return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
         } catch (e) {
            commit("setError", e)
            throw e
         }
      },
      async updateCategory({ commit }, { title, limit, id }) {
         try {
            await axios.put(`${url}/${id}.json`, { title, limit })
         } catch (e) {
            commit("setError", e)
            throw e
         }
      },
      async createCategory({ commit }, { title, limit }) {
         try {
            const id = Date.now()
            await axios.post(`${url.json}`, {
               title,
               limit,
            })
            return { title, limit, id }
         } catch (e) {
            commit("setError", e)
            throw e
         }
      },
   },
}

