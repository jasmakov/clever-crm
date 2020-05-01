<template>
  <form class="add_coloumn">
    <div class="input-field">
      <h6>Выбор столбцов</h6>
      <p v-for="column of GetAllCollumns" :key="column.groupId">
        <label v-if="column.field === 'moduleOrder' && checkStrSta.status !== '1'">
          <input type="checkbox" disabled>
          <span>{{column.headerName}}</span>
        </label>
        <label v-if="column.field === 'moduleOrder' && checkStrSta.status === '1'">
          <input type="checkbox" :id="column.field" :value="column.groupId" :checked="fetchColOff[column.groupId]" @click="check($event, column)">
          <span>{{column.headerName}}</span>
        </label>
        <label v-if="column.field !== 'numIdx' && column.field !== 'moduleOrder'">
          <input type="checkbox" :id="column.field" :value="column.groupId" :checked="fetchColOff[column.groupId]" @click="check($event, column)">
          <span>{{column.headerName}}</span>
        </label>
      </p>
      <span class="btn waves-effect waves-light" @click="hide">
        Закрыть
      </span>
    </div>
  </form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    GetAllCollumns: {
      type: Array,
      required: true
    },
    fetchColOff: {
      required: true
    }
  },
  data: () => ({
    select: null,
    items: [],
    checkStrSta: []
  }),
  validations: {
    title: { required }
  },
  async mounted () {
    const areaId = this.$route.params.areaId
    this.checkStrSta = await this.$store.dispatch('fetchStorageStatus', { areaId })
  },
  methods: {
    async check (e, column) {
      const id = e.target.value
      const areaId = this.$route.params.areaId
      const catId = this.$route.params.catId
      if (e.target.checked) {
        try {
          const getColbyId = await this.$store.dispatch('fetchColumnsById', { id })
          this.$store.dispatch('addColumns', { areaId, catId, id, getColbyId })
          this.$emit('updated', { ...getColbyId })
          this.$message('Вы добавили столбец')
        } catch (e) {}
      } else {
        try {
          this.$store.dispatch('deleteColumn', { areaId, catId, id })
          this.$emit('added', column)
          this.$message('Вы удалили столбец')
        } catch (e) {}
      }
    },
    async hide () {
      this.$modal.hide('add-col')
    }
  }
}
</script>
