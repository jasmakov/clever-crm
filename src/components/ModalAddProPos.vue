<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Новый продукт</h3>
      </div>
      <form @submit.prevent="submitStorage" style="padding: 15px">
        <div class="input-field" >
          <input
            id="name"
            type="text"
            v-model.trim="titlepos"
            :class="{invalid: ($v.titlepos.$dirty && !$v.titlepos.required) || ($v.titlepos.$dirty && !$v.titlepos.minLength)}"
          >
          <label for="name">Наименование</label>
          <small
            class="helper-text invalid"
            v-if="$v.titlepos.$dirty && !$v.titlepos.required"
          >Введите Наименование</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.titlepos.$dirty && !$v.titlepos.minLength"
          >Введите еще {{$v.titlepos.$params.minLength.min - titlepos.length}} символов</small>
        </div>
        <div class="input-field" >
          <input
            id="article"
            type="number"
            v-model.trim="articlepos"
            :class="{invalid: ($v.articlepos.$dirty && !$v.articlepos.required) || ($v.articlepos.$dirty && !$v.articlepos.minLength)}"
          >
          <label for="article">Артикул</label>
          <small
            class="helper-text invalid"
            v-if="$v.articlepos.$dirty && !$v.articlepos.required"
          >Введите Наименование</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.articlepos.$dirty && !$v.articlepos.minLength"
          >Введите еще {{$v.articlepos.$params.minLength.min - articlepos.length}} символов</small>
        </div>
        <div class="input-field" >
          <input
            id="amount"
            type="number"
            v-model.trim="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minLength)}"
          >
          <label for="amount">Цена продажи</label>
          <small
            class="helper-text invalid"
            v-if="$v.amount.$dirty && !$v.amount.required"
          >Введите остаток цену продажи</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.amount.$dirty && !$v.amount.minLength"
          >Введите еще {{$v.amount.$params.minLength.min - amount.length}} символов</small>
        </div>
        <div class="input-field">
          <a href="#" class="btn waves-effect waves-light" @click="showaddcomp()">
            Выберите компонент (-ы) готового продукта
          </a>
          <p v-for="componts of allComponents" :key="componts.id">
            {{componts.titlepos}}
          </p>
        </div>
        <div class="input-field">
          <button class="btn waves-effect waves-light" type="submit">
            Добавить
          </button>
          <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="hide_showaddpos">
            Закрыть
          </div>
        </div>
      </form>
      <modal  name="add-comp" transition="nice-modal-fade"
              :min-width="200"
              :min-height="200"
              :clickToClose="false"
              width="40%"
              height="auto">
        <div style="padding: 15px;">
          <div class="page-title" style="width: 100%;">
            <h3 style="text-align: center; width: 100%;">Выберите категорию склада</h3>
          </div>
          <table>
            <thead>
            <tr>
              <th>Название категории склада</th>
              <th>Действие</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="categorystr of categoryStorage" :key="categorystr.id">
              <td>{{categorystr.titlestr}}</td>
              <td>
                <a
                class="btn-small btn work_menu"
                href="#" @click.prevent="showcompbyid(categorystr.id)">
                Выбрать компоненты
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </modal>
      <modal  name="add-compbyid" transition="nice-modal-fade"
              :min-width="200"
              :min-height="200"
              :clickToClose="false"
              width="40%"
              height="auto">
        <div style="padding: 15px;">
          <div class="page-title" style="width: 100%;">
            <h3 style="text-align: center; width: 100%;">Выберите компонент</h3>
          </div>
          <table>
            <thead>
            <tr>
              <th>Название категории склада</th>
              <th>Действие</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="category of catbyIdTable" :key="category.id">
              <td>{{category.titlepos}}</td>
              <td>
                <a
                  class="btn-small btn work_menu"
                  href="#" @click.prevent="addthiscomp(category)">
                  Выбрать компонент
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { numeric, required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    categoryStorage: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    select: null,
    selectstatus: null,
    catbyIdTable: [],
    allComponents: [],
    titlepos: '',
    amount: '',
    articlepos: ''
  }),
  validations: {
    titlepos: { required, minLength: minLength(2) },
    amount: { required },
    articlepos: { numeric, required, minLength: minLength(1) }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async hide_showaddpos () {
      this.$modal.hide('add-postor')
    },
    async showaddcomp () {
      this.$modal.show('add-comp')
    },
    async showcompbyid (id) {
      this.$modal.show('add-compbyid')
      this.catbyIdTable = await this.$store.dispatch('fetchStorageCategoryTableById', { id, areaId: this.$route.params.areaId })
    },
    async addthiscomp (component) {
      this.$modal.hide('add-compbyid')
      this.$modal.hide('add-comp')
      this.allComponents.push(component)
    },
    async submitStorage () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const compData = this.allComponents
      const formData = {
        comLength: compData.length,
        strid: this.$route.params.proId,
        areaId: this.$route.params.areaId,
        titlepos: this.titlepos,
        amount: this.amount,
        articlepos: this.articlepos,
        howhave: '1',
        summPrice: this.amount,
        salePrice: ''
      }
      try {
        const newPosPro = await this.$store.dispatch('createProductPosotionCategory', formData)
        for (const daco of compData) {
          await this.$store.dispatch('createProductCompCategory', {
            proid: newPosPro.id,
            strid: this.$route.params.proId,
            areaId: this.$route.params.areaId,
            articlepos: daco.articlepos,
            titlepos: daco.titlepos,
            compId: daco.id
          })
        }
        this.$modal.hide('add-postor')
        this.$message('Успешно добавлено')
        this.$emit('added', newPosPro)
      } catch (e) {

      }
    }
  }
}
</script>
