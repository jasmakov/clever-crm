<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >{{c.title}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null,
    fio: null,
    phoneNumberC: null,
    addressClient: null,
    someBuy: null,
    summDeal: null,
    tkClient: null,
    commentWrite: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  watch: {
    current (catId) {
      const { title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
      this.fio = fio
      this.phoneNumberC = phoneNumberC
      this.addressClient = addressClient
      this.someBuy = someBuy
      this.summDeal = summDeal
      this.tkClient = tkClient
      this.commentWrite = commentWrite
    }
  },
  created () {
    const { id, title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
    this.fio = fio
    this.phoneNumberC = phoneNumberC
    this.addressClient = addressClient
    this.someBuy = someBuy
    this.summDeal = summDeal
    this.tkClient = tkClient
    this.commentWrite = commentWrite
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
          fio: this.fio,
          phoneNumberC: this.phoneNumberC,
          addressClient: this.addressClient,
          someBuy: this.someBuy,
          summDeal: this.summDeal,
          tkClient: this.tkClient,
          commentWrite: this.commentWrite
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Вы успешно изменили категорию')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
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
  }
}
</script>
