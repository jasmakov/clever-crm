<template>
<Loader v-if="loading" />
<div v-else>
  <Catbar :categories="categories" :rights="rights"/>
  <section>
    <StorBar/>
    <h4 style="text-align: center; width: 100%;">Ваши товары и комплектуюшие</h4>
    <ul>
        <router-link
          v-for="catstr in categoryStorage"
          :key="catstr.id" tag="li"
          class="btn-small btn work_menu stor_btn"
          active-class="active"
          :to="'/' + $route.params.areaId + '/storage/'+ catstr.id"
        >
          <span @click="changeTitle(catstr.id, catstr.titlestr)" class="Change_Category"><eva-icon name="edit" animation="pulse" fill="white"></eva-icon></span>
          <a href="#" class="waves-effect waves-light" style="color: #fff; padding: 20px;">{{catstr.titlestr}}
          </a>
          <span @click="deleteCategory(catstr.id, catstr.titlestr)" class="Delete_Category">X</span>
        </router-link>
        <li
          class="btn-small btn work_menu stor_btn"
          @click.prevent="showaddstor" v-tooltip="'Создать категорию'">
          <a href="#" class="add_categor">+</a>
        </li>
    </ul>
  </section>
  <modal  name="add-catstor" transition="nice-modal-fade"
          :min-width="200"
          :min-height="200"
          :clickToClose="false"
          width="40%"
          height="auto">
    <form @submit.prevent="submitStorage" style="padding: 15px">
      <div class="input-field" >
        <input
          id="name"
          type="text"
          v-model.trim="titlestr"
          :class="{invalid: ($v.titlestr.$dirty && !$v.titlestr.required)}"
        >
        <label for="name">Введите название категории</label>
        <small
          class="helper-text invalid"
          v-if="$v.titlestr.$dirty && !$v.titlestr.required"
        >Введите название категории</small>
      </div>
      <div class="input-field">
        <button class="btn waves-effect waves-light" type="submit">
          Добавить
        </button>
        <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="hide_showaddstor">
          Закрыть
        </div>
      </div>
    </form>
  </modal>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Catbar from '../components/app/Catbar'
import StorBar from '../components/app/StorBar'
export default {
  name: 'storage',
  metaInfo: {
    title: 'Склад'
  },
  data: () => ({
    loading: true,
    titlestr: '',
    categories: [],
    rights: [],
    categoryStorage: []
  }),
  validations: {
    titlestr: { required }
  },
  async mounted () {
    const areaId = this.$route.params.areaId
    this.categories = await this.$store.dispatch('fetchCategories', areaId)
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].storageAccept === 'mydvg1cool') {
      this.categoryStorage = await this.$store.dispatch('fetchStorageCategory', { areaId })
      this.loading = false
    } else {
      this.$router.push('/' + areaId)
    }
  },
  components: {
    StorBar,
    Catbar
  },
  methods: {
    async showaddstor () {
      this.$modal.show('add-catstor')
    },
    async hide_showaddstor () {
      this.$modal.hide('add-catstor')
    },
    async deleteCategory (id, title) {
      this.$confirm('Вы уверены что хотите удалить ' + title + '?').then(() => {
        this.$store.dispatch('deleteStorageCategory', { id, areaId: this.$route.params.areaId })
        this.categoryStorage.pop(id)
        this.$fire({
          title: title + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    changeTitle (id, title) {
      this.$prompt('Введите новое название. Старое название: ' + title).then((text) => {
        this.$store.dispatch('updateTitleStorage', { id, areaId: this.$route.params.areaId, titlestr: text })
        const idx = this.categoryStorage.findIndex(c => c.id === id)
        this.categoryStorage[idx].titlestr = text
        this.updateCount++
        this.$fire({
          title: 'Новое название "' + text + '" - сохранено!',
          type: 'success',
          timer: 3000
        })
      })
    },
    async submitStorage () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        areaId: this.$route.params.areaId,
        titlestr: this.titlestr
      }
      try {
        const storCateg = await this.$store.dispatch('createStorageCategory', formData)
        this.$modal.hide('add-catstor')
        this.categoryStorage.push(storCateg)
        this.titlestr = ''
        this.$message('Категория создана')
      } catch (e) {

      }
    }
  }
}
</script>
