<template>
  <div>
    <div class="page-title">
      <h3><router-link to="/" class="green-text">Главная</router-link> / Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">Вы еще не создали не одной категории</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  metaInfo: {
    title: 'CLEVERME CRM | Категории'
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.categories[idx].fio = category.fio
      this.categories[idx].phoneNumberC = category.phoneNumberC
      this.categories[idx].addressClient = category.addressClient
      this.categories[idx].someBuy = category.someBuy
      this.categories[idx].summDeal = category.summDeal
      this.categories[idx].tkClient = category.tkClient
      this.categories[idx].commentWrite = category.commentWrite
      this.updateCount++
    }
  }
}
</script>
