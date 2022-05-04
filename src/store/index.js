import { createStore } from "vuex"
import dateUtil from "@/utils/date.util"
import auth from "@/store/auth"
import currencyUtils from "@/utils/currency.utils"
import category from "@/store/category"
import info from "@/store/info"
import record from "@/store/record"

export const index = createStore({
   state: {
      date: new Date(),
      error: null,
      currency: null,
      currencies: ["RUB", "USD", "EUR"],
   },
   getters: {
      filterDate(state) {
         return dateUtil(state.date, "datetime")
      },
      filterCurrency(state) {
         return currencyUtils(state.currency, ...state.currencies)
      },
      error: s => s.error,
   },
   mutations: {
      setSecond(state) {
         state.date = new Date()
      },
      setError(state, error) {
         state.error = error
      },
      clearError(state) {
         state.error = null
      },
   },
   actions: {
      setIntervalSecond({ commit }) {
         setInterval(() => {
            commit("setSecond")
         }, 1000)
      },
      async fetchCurrency() {
         const res = await fetch(`http://data.fixer.io/api/latest?access_key=49656929fa6f6834e9007f4334997cd3&symbols=USD,EUR,RUB`)
         return await res.json()
      },
   },
   modules: {
      auth, category, info, record
   },
})