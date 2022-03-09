import { useField, useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed, watch } from "vue"

export function useLoginForm() {
   const { handleSubmit, isSubmitting, submitCount } = useForm()
   const router = useRouter()
   const store = useStore()
   const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
      "email",
      yup
         .string()
         .trim()
         .required("Пожалуйста введите email")
         .email("Необходимо ввести корректный email"),
   )

   const MIN_LENGTH = 6, MAX_LENGTH = 20

   const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
      "password",
      yup
         .string()
         .trim()
         .required("Пожалуйста введите пароль")
         .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
         .max(MAX_LENGTH, `Пароль не может быть больше ${MAX_LENGTH} символов`),
   )

   const isTooManyAttempts = computed(() => submitCount.value >= 3)

   watch(isTooManyAttempts, val => {
      if (val) {
         setTimeout(() => submitCount.value = 0, 2000)
      }
   })

   const onSubmit = handleSubmit(async () => {
      let formData = {
         email: email.value,
         password: password.value,
      }
      await store.dispatch("login", formData)
      await router.push("/")
   })

   return {
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
   }
}