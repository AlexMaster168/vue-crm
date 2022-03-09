<template>
   <form class="card auth-card" @submit.prevent="onSubmit()">
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
         <div :class="['input-field', {invalid: nError}]">
            <input
               id="name"
               type="text"
               v-model.trim="name"
            >
            <label for="name">Имя</label>
            <small v-if="nError">{{ nError }}</small>
         </div>
         <p>
            <label>
               <input :class="{invalid: aError}" type="checkbox" v-model.trim="agree" />
               <span>С правилами согласен</span>
            </label>
         </p>
         <small v-if="aError">{{ aError }}</small>
      </div>
      <div class="card-action">
         <div>
            <button
               :disabled="isSubmitting || isTooManyAttempts"
               class="btn waves-effect waves-light auth-submit"
               type="submit"
            >
               Зарегистрироваться
               <img class="drower-image" src="../assets/send.png" alt="send">
            </button>
            <div class="text-danger" v-if="isTooManyAttempts">
               Вы слишком часто пытаетесь войти в систему. Попробуйте позже
            </div>
         </div>

         <p class="center">
            Уже есть аккаунт?
            <router-link to="/login">Войти!</router-link>
         </p>
      </div>
   </form>
</template>

<script>
import { useRegisterForm } from "@/utils/validation/register-form"

export default {
   name: "register",
   setup() {
      return { ...useRegisterForm()}
   },
}
</script>

<style scoped>
small, .text-danger {
   color: red
}
</style>
