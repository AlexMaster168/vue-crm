<template>
   <div class="col s12 m6">
      <div>
         <div class="page-subtitle">
            <h4>Создать</h4>
         </div>

         <form @submit.prevent="onSubmit">
            <div class="input-field" :class="{invalid: tError}">
               <input
                  id="title"
                  type="text"
                  v-model.trim="title"
                  placeholder="Введите название"
               >
               <span
                  v-if="tError"
                  class="helper-text invalid"
               >
            {{ tError }}
          </span>
            </div>

            <div class="input-field" :class="{invalid: lError}">
               <input
                  id="limit"
                  type="number"
                  placeholder="Введите лимит"
                  v-model.number="limit"
               >
               <span
                  v-if="lError"
                  class="helper-text invalid"
               >
          {{ lError }}
          </span>
            </div>

            <button
               :disabled="isSubmitting || isTooManyAttempts"
               class="btn waves-effect waves-light" type="submit">
               Создать
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

import { useCategoriesForm } from "@/utils/validation/categories-form"

export default {
   setup() {
      return { ...useCategoriesForm() }
   },
}
</script>

<style scoped>
span {
   color: red
}
</style>
