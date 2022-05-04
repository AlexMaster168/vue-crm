import { useField } from "vee-validate"
import * as yup from "yup"

export function useRecordForm() {
   const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
      "amount",
      yup
         .number()
         .required("Пожалуйста введите cумму")
         .min(6, "Пожалуйста введите от 6 символов"),
   )

   const { value: description, errorMessage: dError, handleBlur: dBlur } = useField(
      "description",
      yup
         .string()
         .required("Пожалуйста введите описания")
         .min(6, "Пожалуйста введите от 6 символов"),
   )

   return {
      amount,
      aError,
      aBlur,
      description,
      dError,
      dBlur,
   }
}