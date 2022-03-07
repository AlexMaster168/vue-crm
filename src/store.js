import { createStore } from "vuex"
import dateUtil from "@/utils/date.util"

export const store = createStore({
   state: {
      date: new Date(),
   },
   getters: {
      filterDate(state) {
         return dateUtil(state.date, "datetime")
      },
   },
   mutations: {
      setSecond(state) {
         state.date = new Date()
      },
   },
   actions: {
      setIntervalSecond({ commit }) {
         setInterval(() => {
            commit("setSecond")
         }, 1000)
      },
   },
})
