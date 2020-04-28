<template>
  <Loader v-if="loading" />
  <div class="instorage" v-else>
    <Catbar :categories="categories" :rights="rights"/>
    <StorBar @fickthatshit="updatethatshit" />
    <h3 style="text-align: center; width: 100%;">Внутренний склад - {{catbyId.titlestr}}</h3>
    <router-link
      class="btn-small btn work_menu"
      style="float: left"
      :to="'/' + $route.params.areaId + '/storage'">
      Назад
    </router-link>
    <a
      class="btn-small btn work_menu"
      style="float: left; margin-bottom: 10px;"
      href="#" @click.prevent="showaddpos()">
      Добавить позицию
    </a>
    <StorageTable :key="catbyIdTable.length + updateCount" :catbyIdTable="catbyIdTable" :categoryStorage="categoryStorage"/>
    <modal  name="add-postor" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <ModalAddStrPos @added="addPosition" :catbyIdTable="catbyIdTable"/>
    </modal>
  </div>
</template>

<script>
import ModalAddStrPos from '../components/ModalAddStrPos'
import StorageTable from '../components/StorageTable'
import Catbar from '../components/app/Catbar'
import StorBar from '../components/app/StorBar'
export default {
  name: 'instorage',
  metaInfo: {
    title: 'Склад'
  },
  data: () => ({
    catbyId: [],
    catbyIdTable: [],
    categoryStorage: [],
    categories: [],
    rights: [],
    updateCount: 0,
    loading: true
  }),
  async mounted () {
    const id = this.$route.params.strId
    const areaId = this.$route.params.areaId
    this.categories = await this.$store.dispatch('fetchCategories', areaId)
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].storageAccept === 'mydvg1cool') {
      this.catbyId = await this.$store.dispatch('fetchStorageCategoryById', { id, areaId })
      this.catbyIdTable = await this.$store.dispatch('fetchStorageCategoryTableById', { id, areaId })
      this.categoryStorage = await this.$store.dispatch('fetchStorageCategory', { areaId })
    } else {
      this.$router.push('/' + areaId)
    }
    this.loading = false
  },
  methods: {
    updatethatshit (module) {
      const idx = this.catbyIdTable.findIndex(c => c.id === module.id)
      this.catbyIdTable[idx].howleft = module.howleft
      this.updateCount++
    },
    async showaddpos () {
      this.$modal.show('add-postor')
    },
    addPosition (position) {
      this.catbyIdTable.push(position)
    }
  },
  components: {
    StorBar, ModalAddStrPos, StorageTable, Catbar
  }
}
</script>
