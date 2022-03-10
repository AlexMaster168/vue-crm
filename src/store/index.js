import { createStore } from "vuex"
import dateUtil from "@/utils/date.util"
import auth from "@/store/auth"
import currencyUtils from "@/utils/currency.utils"

const VUE_APP_FB_KEY = "49656929fa6f6834e9007f4334997cd3"

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
         const res = await fetch(`http://data.fixer.io/api/latest?access_key=${VUE_APP_FB_KEY}&symbols=USD,EUR,RUB`)
         return await res.json()
      },
   },
   modules: {
      auth,
   },
})