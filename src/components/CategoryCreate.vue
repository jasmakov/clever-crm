<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="title" id="name">
            <option value="Работа с клиентами" :class="{invalid: $v.title.$dirty && !$v.title.required}" >
              Работа с клиентами
            </option>
          </select>
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            Введите название
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина {{$v.limit.$params.minValue.min}}
          </span>
        </div>
        <div class="input-field">
          <h6>Выбор столбцов</h6>
          <p>
            <label>
              <input type="checkbox" value="fio" v-model="fio">
              <span>ФИО</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="phoneNumberC" v-model="phoneNumberC">
              <span>Телефон</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="addressClient" v-model="addressClient">
              <span>Адрес</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="someBuy" v-model="someBuy">
              <span>Покупка</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="summDeal" v-model="summDeal">
              <span>Сумма сделки</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="tk" v-model="tkClient">
              <span>ТК</span>
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" value="commentWrite" v-model="commentWrite">
              <span>Примечание</span>
            </label>
          </p>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Создать
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: 'Работа с клиентами',
    select: null,
    limit: 10000000,
    fio: 'true',
    phoneNumberC: 'true',
    addressClient: 'true',
    someBuy: 'true',
    summDeal: 'true',
    tkClient: 'true',
    commentWrite: 'true'
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
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
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
          fio: this.fio,
          phoneNumberC: this.phoneNumberC,
          addressClient: this.addressClient,
          someBuy: this.someBuy,
          summDeal: this.summDeal,
          tkClient: this.tkClient,
          commentWrite: this.commentWrite
        })
        this.limit = 10000000
        this.$v.$reset()
        this.$message('Вы создали новую категорию')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>
