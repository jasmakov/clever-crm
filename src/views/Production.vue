<template>
  <Loader v-if="loading" />
  <div v-else>
    <Catbar :categories="categories" :rights="rights"/>
    <section>
      <h4 style="text-align: center; width: 100%;">Производство</h4>
      <a href="#" @click.prevent="addProduction" class="waves-effect waves-light btn-small" v-tooltip="'Добавить продукцию'">Добавить продукцию</a>
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Дата/Время</th>
          <th>Наименование</th>
          <th>Артикул</th>
          <th>ед. изм.</th>
          <th>Кол-во</th>
          <th>Было</th>
          <th>Стало</th>
          <th>Примечание</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(move, idx) of productionTable" :key="move.id">
          <td>{{idx + 1}}</td>
          <td>{{move.dateNow}}</td>
          <td>{{move.titlepos}}</td>
          <td>{{move.articlepos}}</td>
          <td>{{move.unitstr}}</td>
          <td>{{move.howhave}}</td>
          <td>{{move.howleft}}</td>
          <td>{{move.howhave + move.howleft}}</td>
          <td>{{move.comment}}</td>
        </tr>
        </tbody>
      </table>
    </section>
    <modal  name="add-multprod" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="80%"
            height="auto">
      <ModalProduction @producted="addedProduction"/>
    </modal>
  </div>
</template>

<script>
import Catbar from '../components/app/Catbar'
import ModalProduction from '../components/ModalProduction'
export default {
  name: 'storage',
  metaInfo: {
    title: 'Производство'
  },
  data: () => ({
    loading: true,
    categories: [],
    rights: [],
    productionTable: []
  }),
  async mounted () {
    const areaId = this.$route.params.areaId
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].storageAccept === 'mydvg1cool') {
      this.categories = await this.$store.dispatch('fetchCategories', areaId)
      this.productionTable = await this.$store.dispatch('fetchProductsForProduction', { areaId })
      this.productionTable.reverse()
      this.loading = false
    } else {
      this.$router.push('/' + areaId)
    }
  },
  components: {
    Catbar, ModalProduction
  },
  methods: {
    async addProduction () {
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin') {
        this.$modal.show('add-multprod')
      } else {
        this.$alert('У вас нету доступа к этой функции')
      }
    },
    addedProduction (module) {
      this.productionTable.push(module)
    }
  }
}
</script>
