<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ this.filterCurrency(record.amount) }}</td>
      <td>{{ this.filterDate(record.date)}}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span 
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn" 
          @click="$router.push('/detail/' + record.id)"
        >
          <img src="../assets/open.jpg" alt="open"/>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

import { mapGetters } from "vuex"

export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
   computed: {
     ...mapGetters(["filterCurrency", "filterDate"])
   }
}
</script>
