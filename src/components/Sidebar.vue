<template>
   <ul class="sidenav app-sidenav" :class="{open: isOpen}">
      <li>
         <router-link
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            :exact="link.exact"
            active-class="active"
            class="waves-effect waves-orange pointer active">{{ link.title }}
         </router-link>
      </li>
   </ul>
</template>

<script>
export default {
   name: "Sidebar",
   props: ["isOpen"],
   data: () => ({
      links: [
         { title: "Счет", url: "/", exact: true },
         { title: "История", url: "/history" },
         { title: "Планирования", url: "/planning" },
         { title: "Новая запись", url: "/record" },
         { title: "Категории", url: "/categories" },
      ],
   }),
}
</script>

<style scoped>

</style>