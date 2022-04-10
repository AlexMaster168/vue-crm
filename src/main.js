import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import { index } from "@/store/index.js"
import "materialize-css/dist/js/materialize.min"

createApp(App).use(index).use(router).mount("#app")
