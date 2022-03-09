import axios from "axios"

const TOKEN_KEY = "jwt-token"
const VUE_APP_FB_KEY = "AIzaSyDqKS9r66hTGgi6Th2LHTvgVn-ovlvsXPI"

export default {
   state() {
      return {
         token: localStorage.getItem(TOKEN_KEY),
         currentUser: "",
      }
   },
   mutations: {
      setToken(state, token) {
         state.token = token
         localStorage.setItem(TOKEN_KEY, token)
      },
      setUser(state, email) {
         state.currentUser = email
      },
   },
   actions: {
      async login({ commit }, payload) {
         try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${VUE_APP_FB_KEY}`
            const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
            commit("setToken", data.idToken)
            commit("setUser", data.email)
         } catch (e) {
            throw new Error()
         }
      },
      async register({ commit }, payload) {
         try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${VUE_APP_FB_KEY}`
            const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
            commit("setToken", data.idToken)
            commit("setUser", data.email)
         } catch (e) {
            throw new Error()
         }
      },
      async logout(state) {
            state.token = null
            state.currentUser = ""
            localStorage.removeItem(TOKEN_KEY)
      },
   },
   getters: {
      token(state) {
         return state.token
      },
      isAuthenticated(state) {
         return !!state.token
      },
      getCurrentUser(state) {
         return state.currentUser
      },
   },
}