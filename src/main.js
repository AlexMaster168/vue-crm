import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import {index} from '@/store/index.js';
import "materialize-css/dist/js/materialize.min"

// initializeApp({
//    apiKey: "AIzaSyDqKS9r66hTGgi6Th2LHTvgVn-ovlvsXPI",
//    authDomain: "vue-crm-1a078.firebaseapp.com",
//    projectId: "vue-crm-1a078",
//    storageBucket: "vue-crm-1a078.appspot.com",
//    messagingSenderId: "568455330710",
//    appId: "1:568455330710:web:64ec3e1e7b6f29c6c5bbb7",
// })
createApp(App).use(index).use(router).mount("#app")
