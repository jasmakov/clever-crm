<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Новая складская позиция</h3>
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
            id="howleft"
            type="number"
            v-model.trim="howleft"
            :class="{invalid: ($v.howleft.$dirty && !$v.howleft.required) || ($v.howleft.$dirty && !$v.howleft.minLength)}"
          >
          <label for="howleft">Остаток на текущий момент</label>
          <small
            class="helper-text invalid"
            v-if="$v.howleft.$dirty && !$v.howleft.required"
          >Введите остаток на текущий момент</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.howleft.$dirty && !$v.howleft.minLength"
          >Введите еще {{$v.howleft.$params.minLength.min - howleft.length}} символов</small>
        </div>
        <div class="input-field" >
          <select ref="select" v-model="unitstr" id="unit">
            <option value="Шт">Шт</option>
            <option value="М">Метр</option>
            <option value="См">См</option>
            <option value="Мм">Мм</option>
            <option value="Л">Литр</option>
            <option value="Г">Грамм</option>
            <option value="Кг">Килограмм</option>
            <option value="Мг">Миллиграмм</option>
          </select>
          <label for="unit">Выберите единицу измерения</label>
          <span
            v-if="$v.unitstr.$dirty && !$v.unitstr.required"
            class="helper-text invalid">
            Введите единицу измерения
          </span>
        </div>
        <div class="input-field" >
          <select ref="selectstatus" v-model="choostatus" id="choose_status" @change="selected_status(choostatus)">
            <option value="1">Готовый продукт</option>
            <option value="2">Компонент</option>
            <option value="3">Готовый продукт и компонент</option>
          </select>
          <label for="choose_status">Определите статус</label>
          <span
            v-if="$v.choostatus.$dirty && !$v.choostatus.required"
            class="helper-text invalid">
            Определите статус
          </span>
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
    </div>
  </div>
</template>

<script>
import { numeric, required, minLength } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    select: null,
    selectstatus: null,
    titlepos: '',
    unitstr: 'Шт',
    choostatus: '',
    articlepos: '',
    howleft: ''
  }),
  validations: {
    titlepos: { required, minLength: minLength(2) },
    unitstr: { required },
    choostatus: { required },
    articlepos: { numeric, required, minLength: minLength(1) },
    howleft: { numeric, required, minLength: minLength(1) }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    this.selectstatus = M.FormSelect.init(this.$refs.selectstatus)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
    if (this.selectstatus && this.selectstatus.destroy) {
      this.selectstatus.destroy()
    }
  },
  methods: {
    async hide_showaddpos () {
      this.$modal.hide('add-postor')
    },
    async selected_status (status) {
      if (status === '2' || status === '3') {

      }
    },
    async submitStorage () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        if (this.choostatus === '2' || this.choostatus === '3') {
          const formData = {
            strid: this.$route.params.strId,
            areaId: this.$route.params.areaId,
            titlepos: this.titlepos,
            unitstr: this.unitstr,
            choostatus: this.choostatus,
            articlepos: this.articlepos,
            howleft: this.howleft
          }
          const newPosStr = await this.$store.dispatch('createStoragePosotionCategory', formData)
          this.$modal.hide('add-postor')
          this.$message('Успешно добавлено')
          this.$emit('added', newPosStr)
        } if (this.choostatus === '1' || this.choostatus === '3') {
          const formData = {
            comLength: 0,
            strid: this.$route.params.proId,
            areaId: this.$route.params.areaId,
            titlepos: this.titlepos,
            amount: 0,
            articlepos: this.articlepos,
            howhave: '1',
            summPrice: 0,
            salePrice: ''
          }
          await this.$store.dispatch('createProductPosotionCategory', formData)
          this.$modal.hide('add-postor')
          this.$message('Успешно добавлено')
        }
      } catch (e) {

      }
    }
  }
}
</script>
