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
      <ModalCat @created="addNewCategory" />
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

    }
  },
  async mounted () {
    const categories = await this.$store.dispatch('fetchCategories')
    if (categories.length) {
      this.$router.push('/' + categories[0].id)
    }
  },
  methods: {
    async addNewCategory (category) {
      await this.$modal.hide('add-cat')
      await this.$router.push('/' + category.id)
    },
    async show_cat () {
      this.$modal.show('add-cat')
    }
  }
}
</script>
