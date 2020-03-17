<template>
  <Loader v-if="loading" />
  <div v-else>
    <section>
      <router-link
        class="btn-small btn work_menu"
        style="float: left"
        active-class="active"
        :to="'/' + $route.params.areaId + '/storage'">
        Назад
      </router-link>
    </section>
    <div class="page-title" style="width: 100%;">
      <h3 style="text-align: center; width: 100%;">Готовая продукция</h3>
    </div>
    <section>
      <ul>
        <router-link
          v-for="catpro in categoryProduct"
          :key="catpro.id" tag="li"
          class="btn-small btn work_menu stor_btn"
          active-class="active"
          :to="'/' + $route.params.areaId + '/product/'+ catpro.id"
          v-tooltip="'Дважды кликните чтобы изменить название'"
        >
          <span @click="changeTitle(catpro.id, catpro.titlepro)" class="Change_Category"><eva-icon name="edit" animation="pulse" fill="white"></eva-icon></span>
          <a href="#" class="waves-effect waves-light" style="color: #fff; padding: 20px;">{{catpro.titlepro}}
          </a>
          <span @click="deleteCategory(catpro.id, catpro.titlepro)" class="Delete_Category">X</span>
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
            v-model.trim="titlepro"
            :class="{invalid: ($v.titlepro.$dirty && !$v.titlepro.required) || ($v.titlepro.$dirty && !$v.titlepro.minLength)}"
          >
          <label for="name">Введите название категории</label>
          <small
            class="helper-text invalid"
            v-if="$v.titlepro.$dirty && !$v.titlepro.required"
          >Введите название категории</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.titlepro.$dirty && !$v.titlepro.minLength"
          >Введите еще {{$v.titlepro.$params.minLength.min - titlepro.length}} символов</small>
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
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'storage',
  metaInfo: {
    title: 'Готовая продукция'
  },
  data: () => ({
    loading: true,
    titlepro: '',
    categoryProduct: []
  }),
  validations: {
    titlepro: { required, minLength: minLength(6) }
  },
  async mounted () {
    const areaId = this.$route.params.areaId
    const rights = await this.$store.dispatch('fetchRights', { areaId })
    if (rights === 'Admin' || rights[0].storageAccept === 'mydvg1cool') {
      this.categoryProduct = await this.$store.dispatch('fetchProductsCategory', areaId)
    } else {
      this.$router.push('/' + areaId)
    }
    this.loading = false
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
        this.$store.dispatch('deleteProductCategory', { id, areaId: this.$route.params.areaId })
        this.categoryProduct.pop(id)
        this.$fire({
          title: title + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    changeTitle (id, title) {
      this.$prompt('Введите новое название. Старое название: ' + title).then((text) => {
        this.$store.dispatch('updateTitleProducts', { id, areaId: this.$route.params.areaId, titlepro: text })
        const idx = this.categoryProduct.findIndex(c => c.id === id)
        this.categoryProduct[idx].titlepro = text
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
        titlepro: this.titlepro
      }
      try {
        const proCateg = await this.$store.dispatch('createProductCategory', formData)
        this.$modal.hide('add-catstor')
        this.categoryProduct.push(proCateg)
        this.titlepro = ''
        this.$message('Категория создана')
      } catch (e) {

      }
    }
  }
}
</script>
