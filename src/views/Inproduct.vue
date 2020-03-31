<template>
  <Loader v-if="loading" />
  <div class="instorage" v-else>
    <Catbar :categories="categories" :rights="rights"/>
    <section>
      <router-link
        class="btn-small btn work_menu"
        style="float: left"
        :to="'/' + $route.params.areaId + '/products'">
        Назад
      </router-link>
    </section>
    <a
      class="btn-small btn work_menu"
      style="float: left; margin-bottom: 10px;"
      href="#" @click.prevent="showaddpos()">
      Добавить продукт
    </a>
    <ProductTable :key="productbyIdTable.length" :productbyIdTable="productbyIdTable" :categoryProduct="categoryProduct" />
    <modal  name="add-postor" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <ModalAddProPos @added="addPosition" :categoryStorage="categoryStorage"/>
    </modal>
  </div>
</template>

<script>
import ModalAddProPos from '../components/ModalAddProPos'
import ProductTable from '../components/ProductTable'
import Catbar from '../components/app/Catbar'
export default {
  name: 'instorage',
  metaInfo: {
    title: 'Готовая продукция'
  },
  data: () => ({
    productbyId: [],
    productbyIdTable: [],
    categoryProduct: [],
    categoryStorage: [],
    categories: [],
    rights: [],
    loading: true
  }),
  async mounted () {
    const id = await this.$route.params.proId
    const areaId = await this.$route.params.areaId
    this.categories = await this.$store.dispatch('fetchCategories', areaId)
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].storageAccept === 'mydvg1cool') {
      this.productbyId = await this.$store.dispatch('fetchProductsCategoryById', { id, areaId })
      this.productbyIdTable = await this.$store.dispatch('fetchProductsCategoryTableById', { proCatId: id, areaId })
      this.categoryProduct = await this.$store.dispatch('fetchProductsCategory', areaId)
      this.categoryStorage = await this.$store.dispatch('fetchStorageCategory', { areaId })
    } else {
      this.$router.push('/' + areaId)
    }
    this.loading = false
  },
  methods: {
    async showaddpos () {
      await this.$modal.show('add-postor')
    },
    async addPosition (position) {
      await this.productbyIdTable.push(position)
    }
  },
  components: {
    ModalAddProPos, ProductTable, Catbar
  }
}
</script>
