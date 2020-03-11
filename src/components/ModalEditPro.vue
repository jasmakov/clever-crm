<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Редактировать продукт</h3>
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
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="hide_showeditpos">
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
  props: {
    posbyId: {
      required: true
    }
  },
  data: () => ({
    select: null,
    selectstatus: null,
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
    this.titlepos = this.posbyId.titlepos
    this.amount = this.posbyId.amount
    this.articlepos = this.posbyId.articlepos
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async hide_showeditpos () {
      this.$modal.hide('edit-postor')
    },
    async submitStorage () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        id: this.posbyId.posid,
        strid: this.$route.params.proId,
        areaId: this.$route.params.areaId,
        titlepos: this.titlepos,
        amount: this.amount,
        articlepos: this.articlepos
      }
      try {
        await this.$store.dispatch('updateProductPosotionCategory', formData)
        this.$modal.hide('edit-postor')
        this.$message('Успешно сохранено')
        this.$emit('edited', formData)
      } catch (e) {

      }
    }
  }
}
</script>
