export default function currencyUtils(value, currency ) {
   return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency
   }).format(value)
}
