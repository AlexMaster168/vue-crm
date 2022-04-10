import { useField, useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { computed, watch } from "vue"

export function useCategoriesForm() {
   const { handleSubmit, isSubmitting, submitCount } = useForm()
   const router = useRouter()
   const store = useStore()
   const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
      "title",
      yup
         .string()
         .trim()
         .required("Пожалуйста введите название категории")
         .min(6, "Пожалуйста введите от 6 символов"),
   )

   const { value: limit, errorMessage: lError, handleBlur: lBlur } = useField(
      "limit",
      yup
         .number()
         .required("Пожалуйста введите лимит"),
   )

   const isTooManyAttempts = computed(() => submitCount.value >= 3)

   watch(isTooManyAttempts, val => {
      if (val) {
         setTimeout(() => submitCount.value = 0, 2000)
      }
   })

   const onSubmit = handleSubmit(async () => {
      let formData = {
         title: title.value,
         limit: limit.value,
      }
      let data = await store.dispatch("createCategory", formData)
      await router.push("/")
      title.value = ""
      limit.value = ""
      this.$emit("created", data)
   })

   return {
      title,
      tError,
      tBlur,
      limit,
      lError,
      lBlur,
      onSubmit,
      isSubmitting,
      isTooManyAttempts,
   }
}