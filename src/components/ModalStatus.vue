<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Выбрать статус</h3>
      </div>
      <form @submit.prevent="submitHandler" style="padding: 15px">
        <div class="input-field" >
          <select ref="select" v-model="status" id="name">
            <option value="1">В работе</option>
            <option value="2">Думают</option>
            <option value="3">Собран</option>
            <option value="4">Выставлен счет</option>
            <option value="5">Оплачен</option>
            <option value="6">Отгружен</option>
            <option value="7">Возврат</option>
            <option value="8">Отменен</option>
          </select>
          <label for="name">Выберите статус</label>
          <span
            v-if="$v.status.$dirty && !$v.status.required"
            class="helper-text invalid">
            Нужно выбрать статус
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Сохранить
        </button>
        <div class="btn waves-effect waves-light" style="float: right;" @click="hide_stat">
          Закрыть
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    rowIdforProd: {
      required: true
    }
  },
  data: () => ({
    select: null,
    status: ''
  }),
  validations: {
    status: { required }
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
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const moduleData = {
          rowid: this.rowIdforProd,
          catid: await this.$route.params.catId,
          areaId: this.$route.params.areaId,
          status: this.status
        }
        this.$store.dispatch('updateStatus', moduleData)
        this.$modal.hide('edit-module')
        this.$emit('statused', moduleData)
        this.$modal.hide('edit-status')
      } catch (e) {}
    },
    async hide_stat () {
      this.$modal.hide('edit-status')
    }
  }
}
</script>
