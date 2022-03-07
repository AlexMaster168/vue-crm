<template>
   <div class="app-main-layout">
      <Navbar @opening="isOpen = !isOpen" />
      <Sidebar :is-open="isOpen" />
      <main class="app-content" :class="{full: !isOpen}">
         <div class="app-page">
            <router-view />
         </div>
      </main>

      <div class="fixed-action-btn btn-large">
         <router-link class="btn-floating" to="/record">
            <img class="add-image" src="../assets/add.jpg" alt="add">
         </router-link>
      </div>
   </div>
</template>
<script>
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

export default {
   name: "main-layout",
   components: { Navbar, Sidebar },
   data: () => ({
      isOpen: true,
   }),
}
</script>