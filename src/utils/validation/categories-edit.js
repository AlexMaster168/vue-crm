import { useField, useForm } from "vee-validate"
import * as yup from "yup"
import { computed, watch } from "vue"

export function useCategoriesEditForm() {
   const { handleSubmit, isSubmitting, submitCount } = useForm()
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
      const categoryData = {
         title: title.value,
         limit: limit.value
      }
      await this.$store.dispatch('updateCategory', categoryData)
      this.$emit('updated', categoryData)
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