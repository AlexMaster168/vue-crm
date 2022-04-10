<template>
   <div class="col s12 m6">
      <div>
         <div class="page-subtitle">
            <h4>Редактировать</h4>
         </div>

         <form @submit.prevent="onSubmit">
            <div class="input-field">
               <select ref="select" v-model="current">
                  <option
                     v-for="c of categories"
                     :key="c.id"
                     :value="c.id"
                  >{{ c.title }}
                  </option>
               </select>
            </div>

            <div class="input-field">
               <input
                  id="name"
                  type="text"
                  v-model.trim="title"
                  :class="{invalid: tError}"
               >
               <label for="name">Название</label>
               <span
                  v-if="tError"
                  class="helper-text invalid"
               >
           {{ tError }}
          </span>
            </div>

            <div class="input-field">
               <input
                  id="limit"
                  type="number"
                  v-model.number="limit"
                  :class="{invalid: lError}"
               >
               <label for="limit">Лимит</label>
               <span
                  v-if="lError"
                  class="helper-text invalid"
               >
           {{ lError }}
          </span>
            </div>

            <button
               :disabled="isSubmitting || isTooManyAttempts"
               class="btn waves-effect waves-light"
               type="submit">
               Обновить
               <img class="drower-image" src="../assets/send.png" alt="send">
            </button>
            <div class="text-danger" v-if="isTooManyAttempts">
               Вы слишком часто пытаетесь войти в систему. Попробуйте позже
            </div>
         </form>
      </div>
   </div>
</template>

<script>

import { useCategoriesEditForm } from "@/utils/validation/categories-edit"

export default {
   setup() {
      return { ...useCategoriesEditForm() }
   },
   props: {
      categories: {
         type: Array,
         required: true,
      },
   },
   data: () => ({
      select: null,
      current: null,
   }),
   watch: {
      current(catId) {
         const { title, limit } = this.categories.find(c => c.id === catId)
         this.title = title
         this.limit = limit
      },
   },
   created() {
      const { id, title, limit } = this.categories[0]
      this.current = id
      this.title = title
      this.limit = limit
   },
   mounted() {
      alert(this.$refs.select)
   },
   unmounted() {
      if (this.select && this.select.destroy) {
         this.select.destroy()
      }
   },
}
</script>
