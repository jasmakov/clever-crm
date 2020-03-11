<template>
  <Loader v-if="loading" />
  <div class="instorage" v-else>
    <section>
      <router-link
        class="btn-small btn work_menu"
        style="float: right"
        :to="'/' + $route.params.areaId + '/products'">
        Готовая продукция
      </router-link>
      <router-link
        class="btn-small btn work_menu"
        style="float: left"
        :to="'/' + $route.params.areaId + '/storage'">
        Назад
      </router-link>
    </section>
    <div class="page-title" style="width: 100%;">
      <h3 style="text-align: center; width: 100%;">Внутренний склад - {{catbyId.titlestr}}</h3>
    </div>
    <a
      class="btn-small btn work_menu"
      style="float: left; margin-bottom: 10px;"
      href="#" @click.prevent="showaddpos()">
      Добавить позицию
    </a>
    <StorageTable :key="catbyIdTable.length" :catbyIdTable="catbyIdTable" :categoryStorage="categoryStorage"/>
    <modal  name="add-postor" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="40%"
            height="auto">
      <ModalAddStrPos @added="addPosition"/>
    </modal>
  </div>
</template>

<script>
import ModalAddStrPos from '../components/ModalAddStrPos'
import StorageTable from '../components/StorageTable'
export default {
  name: 'instorage',
  metaInfo: {
    title: 'Склад'
  },
  data: () => ({
    catbyId: [],
    catbyIdTable: [],
    categoryStorage: [],
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.strId
    const areaId = this.$route.params.areaId
    const rights = await this.$store.dispatch('fetchRights', { areaId })
    if (rights === 'Admin' || rights[0].storageAccept === 'mydvg1cool') {
      this.catbyId = await this.$store.dispatch('fetchStorageCategoryById', { id, areaId })
      this.catbyIdTable = await this.$store.dispatch('fetchStorageCategoryTableById', { id, areaId })
      this.categoryStorage = await this.$store.dispatch('fetchStorageCategory', { areaId })
    } else {
      this.$router.push('/' + areaId)
    }
    this.loading = false
  },
  methods: {
    async showaddpos () {
      this.$modal.show('add-postor')
    },
    addPosition (position) {
      this.catbyIdTable.push(position)
    }
  },
  components: {
    ModalAddStrPos, StorageTable
  }
}
</script>
