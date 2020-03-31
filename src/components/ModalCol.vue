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
          <input type="checkbox" :id="column.field" :value="column.groupId" :checked="fetchColOff[column.groupId] && fetchColOff[column.groupId].hide === false" @click="check($event)">
          <span>{{column.headerName}}</span>
        </label>
        <label v-if="column.field !== 'numIdx' && column.field !== 'moduleOrder'">
          <input type="checkbox" :id="column.field" :value="column.groupId" :checked="fetchColOff[column.groupId] && fetchColOff[column.groupId].hide === false" @click="check($event)">
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
    async check (e) {
      const id = e.target.value
      const areaId = this.$route.params.areaId
      const catId = this.$route.params.catId
      if (e.target.checked) {
        try {
          const getMyCol = await this.$store.dispatch('fetchMyColById', { catId, areaId, id })
          if (id !== getMyCol.id) {
            const getColbyId = await this.$store.dispatch('fetchColumnsById', { id })
            await this.$store.dispatch('addColumns', { areaId, catId, id, getColbyId })
            this.$emit('updated', { ...getColbyId })
          } else {
            this.$store.dispatch('updateColForChild', {
              catid: this.$route.params.catId,
              areaId: this.$route.params.areaId,
              hide: false,
              id: e.target.value
            })
            this.$emit('added', { hide: false, id: e.target.value })
          }
        } catch (e) {}
      } else {
        try {
          this.$store.dispatch('updateColForChild', {
            catid: this.$route.params.catId,
            areaId: this.$route.params.areaId,
            hide: true,
            id: e.target.value
          })
          this.$emit('added', { hide: true, id: e.target.value })
          this.$message('Вы успешно изменили столбцы')
        } catch (e) {}
      }
    },
    async hide () {
      this.$modal.hide('add-col')
    }
  }
}
</script>
