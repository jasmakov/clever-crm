<template>
  <table>
    <thead>
    <router-link to="/create" class="waves-effect waves-light btn-small" v-tooltip="'Создать запись'"><i class="material-icons" style="color: #fff;">add</i></router-link>
    <tr>
      <th scope="col">#</th>
      <th scope="col" v-if="catyg.fio != false">ФИО</th>
      <th scope="col" v-if="catyg.phoneNumberC != false">Телефон</th>
      <th scope="col" v-if="catyg.addressClient != false">Адрес</th>
      <th scope="col" v-if="catyg.someBuy != false">Покупка</th>
      <th scope="col" v-if="catyg.summDeal != false">Сумма сделки</th>
      <th scope="col" v-if="catyg.tkClient != false">ТК</th>
      <th scope="col" v-if="catyg.commentWrite != false">Примечание</th>
    </tr>
    </thead>

    <draggable tag="tbody">
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td v-if="catyg.fio != false">{{ record.fioadd }}</td>
      <td v-if="catyg.phoneNumberC != false">{{ record.phoneadd }}</td>
      <td v-if="catyg.addressClient != false">{{ record.addressadd }}</td>
      <td v-if="catyg.someBuy != false">{{ record.addbuy }}</td>
      <td v-if="catyg.summDeal != false">{{ record.amount | currency('RUB') }}</td>
      <td v-if="catyg.tkClient != false">{{ record.tkadd }}</td>
      <td v-if="catyg.commentWrite != false">{{ record.commentadd }}</td>
<!--      <td>{{ record.date | date('datetime') }}</td>-->
<!--      <td>{{ record.categoryName }}</td>-->
<!--      <td>-->
<!--        <span-->
<!--          :class="[record.typeClass]"-->
<!--          class="white-text badge"-->
<!--        >{{ record.typeText }}</span>-->
<!--      </td>-->
<!--      <td>-->
<!--        <button-->
<!--          v-tooltip="'Посмотреть запись'"-->
<!--          class="btn-small btn"-->
<!--          @click="$router.push('/detail/' + record.id)"-->
<!--        >-->
<!--          <i class="material-icons">open_in_new</i>-->
<!--        </button>-->
<!--      </td>-->
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
    },
    catyg: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  }
}
</script>
