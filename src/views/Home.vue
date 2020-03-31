<template>
  <div>
    <div class="page-title">
      <ul>
        <li class="btn-small btn" @click.prevent="show_cat"><a href="#" class="waves-effect waves-light" v-tooltip="'Добавить категорию'"><i class="material-icons" style="color: #fff;">+</i></a></li>
      </ul>
    </div>
    <p class="center">
      Категорий нету. Создайте первую категорию
    </p>
    <modal  name="add-cat" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="20%"
            height="auto">
      <ModalCat :checkStrSta="checkStrSta" @created="addNewCategory" />
    </modal>
  </div>
</template>

<script>
import ModalCat from '../components/ModalCat'
export default {
  name: 'home',
  components: {
    ModalCat
  },
  data: function () {
    return {
      checkStrSta: []
    }
  },
  async mounted () {
    const areaId = this.$route.params.areaId
    this.checkStrSta = await this.$store.dispatch('fetchStorageCategory', { areaId })
    const categories = await this.$store.dispatch('fetchCategories', areaId)
    if (categories.length) {
      this.$router.push('/' + areaId + '/' + categories[0].id)
    }
  },
  methods: {
    async addNewCategory (category) {
      const areaId = this.$route.params.areaId
      this.$modal.hide('add-cat')
      this.$router.push('/' + areaId + '/' + category.id)
    },
    async show_cat () {
      this.$modal.show('add-cat')
    }
  }
}
</script>
