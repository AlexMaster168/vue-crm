<template>
   <div>
      <div class="page-title">
         <h3>Новая запись</h3>
      </div>

      <Loader v-if="loading" />

      <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>

      <form class="form" v-else @submit.prevent="handleSubmit">
         <div class="input-field" >
            <select ref="select" v-model="category">
               <option
                  v-for="c in categories"
                  :key="c.id"
                  :value="c.id"
               >{{c.title}}</option>
            </select>
            <label>Выберите категорию</label>
         </div>

         <p>
            <label>
               <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="income"
                  v-model="type"
               />
               <span>Доход</span>
            </label>
         </p>

         <p>
            <label>
               <input
                  class="with-gap"
                  name="type"
                  type="radio"
                  value="outcome"
                  v-model="type"
               />
               <span>Расход</span>
            </label>
         </p>

         <div :class="['input-field', {invalid: aError}]">
            <input
               id="amount"
               type="number"
               v-model.number="amount"
            >
            <label for="amount">Сумма</label>
            <small v-if="aError">{{ aError }}</small>
         </div>

         <div :class="['input-field', {invalid: dError}]">
            <input
               id="description"
               type="text"
               v-model="description"
            >
            <label for="description">Описание</label>
            <small v-if="dError">{{ dError }}</small>
         </div>

         <button class="btn waves-effect waves-light" type="submit">
            Создать
            <img class="drower-image" src="../assets/send.png" alt="send">
         </button>
      </form>
   </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Loader from "@/components/Loader"
import { useRecordForm } from "@/utils/validation/record"
export default {
   name: 'record',
   data: () => ({
      loading: true,
      select: null,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: ''
   }),
   setup() {
      return { ...useRecordForm()}
   },
   components: {Loader},
   async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if (this.categories.length) {
         this.category = this.categories[0].id
      }
   },
   computed: {
      ...mapGetters(['info']),
      canCreateRecord() {
         if (this.type === 'income') {
            return true
         }

         return this.info.bill >= this.amount
      }
   },
   methods: {
      async handleSubmit() {
         if (this.canCreateRecord) {
               await this.$store.dispatch('createRecord', {
                  categoryId: this.category,
                  amount: this.amount,
                  description: this.description,
                  type: this.type,
                  date: new Date().toJSON()
               })
               const bill = this.type === 'income'
                  ? this.info.bill + this.amount
                  : this.info.bill - this.amount

               await this.$store.dispatch('updateInfo', {bill})
               this.amount = 1
               this.description = ''
         } else {
            alert(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
         }
      }
   },
}
</script>

<style scoped>
small, .text-danger {
   color: red
}
</style>
