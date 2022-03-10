<template>
   <div>
      <div class="page-title">
         <h3>Счет</h3>

         <button class="btn waves-effect waves-light btn-small">
            <img class="drower-image" src="../assets/refresh.png" alt="refresh">
         </button>
      </div>

      <Loader v-if="loading" />

      <div v-else class="row">

         <HomeCurrency
            :rates="currency.rates"
            :date="currency.date"
         />
      </div>
   </div>
</template>

<script>
import HomeCurrency from "@/components/HomeCurrency"
import Loader from "@/components/Loader"

export default {
   name: "home",
   data:() => ({
      loading: true,
      currency: null
   }),
   components: {
      HomeCurrency, Loader
   },
   async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
   },
   methods: {
      async refresh() {
         this.loading = true
         this.currency = await this.$store.dispatch('fetchCurrency')
         this.loading = false
      }
   },
}
</script>
