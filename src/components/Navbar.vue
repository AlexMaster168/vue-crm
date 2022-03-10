<template>
   <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
         <div class="navbar-left">
            <a href="#" @click.prevent="$emit('opening')">
               <button>
                  <img class="drower-image" src="../assets/drower.png" alt="drower" />
               </button>
            </a>
            <span class="black-text">{{ this.filterDate }}</span>
         </div>

         <ul class="right">
            <li>
               <button @click="dropdown = !dropdown">
                  <img class="drower-image" src="../assets/drower.png" alt="drower" />
                  {{ this.getCurrentUser }}
               </button>
            </li>
         </ul>
      </div>
      <div class="dropdown" v-if="dropdown">
         <li>
            <router-link to="/profile" class="black-text">
               <img class="drower-image" src="../assets/profile.png" alt="Profile">Профиль
            </router-link>
         </li>
         <li class="divider" tabindex="-1"></li>
         <li>
            <a href="#" class="black-text" @click.prevent="this.logoutHandler()">
               <img class="drower-image" src="../assets/exit.png" alt="Exit">Выйти
            </a>
         </li>
      </div>
   </nav>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex"

export default {
   data: () => ({
      dropdown: false,
   }),
   methods: {
      ...mapActions(["setIntervalSecond"]),
      ...mapMutations(["logout"]),
      logoutHandler() {
         this.logout()
         this.$router.push("/login?message=logout")
      },
   },
   computed: { ...mapGetters(["filterDate", "getCurrentUser"]) },
   mounted() {
      this.setIntervalSecond()
   },
}
</script>
