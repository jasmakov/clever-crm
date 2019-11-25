<template>
  <table>
    <thead>
    <tr>
      <th v-for="header in headers" :key="header" scope="col">
        {{ header }}
      </th>
    </tr>
    </thead>

    <draggable tag="tbody">
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          v-tooltip="'Посмотреть запись'"
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </draggable>
  </table>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'table-column-example',
  display: 'Table Column',
  order: 9,
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  data () {
    return {
      headers: ['#', 'Сумма', 'Дата', 'Категория', 'Тип', 'Открыть']
    }
  }
}
</script>
