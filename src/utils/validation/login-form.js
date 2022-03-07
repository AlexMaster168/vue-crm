import { useField, useForm } from "vee-validate"
import * as yup from "yup"
import { useRouter } from "vue-router"

export function useLoginForm() {
   const { handleSubmit } = useForm()
   const router = useRouter()
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

   const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
      "name",
      yup
         .string()
         .trim()
         .required("Пожалуйста введите имя")
         .min(MIN_LENGTH, `Имя не может быть меньше ${MIN_LENGTH} символов`),
   )

   const onSubmit = handleSubmit(() => {
      try {
         const formData = {
            email: this.email,
            password: this.password,
            name: this.name
         }
         console.log(formData)
         router.push("/")
      } catch (e) {
         console.log(e)
      }
   })

   return {
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      name,
      nError,
      nBlur,
      onSubmit
   }
}