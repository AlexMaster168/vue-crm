<template>
   <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
         <span class="card-title">Домашняя бухгалтерия</span>
         <div :class="['input-field', {invalid: eError}]">
            <input
               id="email"
               type="text"
               v-model.trim="email"
            >
            <label for="email">Email</label>
            <small v-if="eError">{{ eError }}</small>
         </div>
         <div :class="['input-field', {invalid: pError}]">
            <input
               id="password"
               type="password"
               v-model.trim="password"
            >
            <label for="password">Пароль</label>
            <small v-if="pError">{{ pError }}</small>
         </div>
      </div>
      <div class="card-action">
         <div>
            <button
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
               Войти
               <img class="drower-image" src="../assets/send.png" alt="send">
            </button>
         </div>

         <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
         </p>
      </div>
   </form>
</template>

<script>

import { useLoginForm } from "@/utils/validation/login-form"

export default {
   name: "login",
   setup() {
      return { ...useLoginForm() }
   },
}
</script>

<style scoped>
small {
   color: red
}
</style>
