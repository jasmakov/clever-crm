<template>
  <div class="col s12 m6">
    <div>
      <form @submit.prevent="submitHandler" style="padding: 15px">
        <div class="input-field" >
          <select ref="select" v-model="title" id="name">
            <option value="Работа с клиентами" :class="{invalid: $v.title.$dirty && !$v.title.required}">Работа с клиентами
            </option>
          </select>
          <label for="name">Выберите категорию</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid">
            Введите название
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Добавить
        </button>
        <div class="btn waves-effect waves-light" style="float: right;" @click="hide_cat">
          Закрыть
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    select: null,
    title: 'Работа с клиентами',
    fio: true,
    phoneNumberC: true,
    addressClient: true,
    someBuy: true,
    summDeal: true,
    tkClient: true,
    commentWrite: true
  }),
  validations: {
    title: { required }
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
          fio: 0,
          phoneNumberC: 1,
          addressClient: 2,
          someBuy: 3,
          summDeal: 4,
          tkClient: 5,
          commentWrite: 6
        })
        this.$v.$reset()
        this.$message('Вы создали новую категорию')
        this.$emit('created', category)
        await this.$store.dispatch('createEmptyRow', {
          categoryId: category.id,
          fio: '',
          phoneNumberC: '',
          addressClient: '',
          someBuy: '',
          summDeal: '',
          tkClient: '',
          commentWrite: ''
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'ФИО',
          hide: false,
          field: 'fio',
          width: 300
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'Телефон',
          hide: false,
          field: 'phoneNumberC',
          width: 200
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'Адрес',
          hide: false,
          field: 'addressClient',
          width: 200
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'Покупка',
          hide: false,
          field: 'someBuy',
          width: 200
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'Сумма сделки',
          hide: false,
          field: 'summDeal',
          width: 200
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'ТК',
          hide: false,
          field: 'tkClient',
          width: 200
        })
        await this.$store.dispatch('createColoumn', {
          categoryId: category.id,
          headerName: 'Примечание',
          hide: false,
          field: 'commentWrite',
          width: 300
        })
      } catch (e) {}
    },
    async hide_cat () {
      this.$modal.hide('add-cat')
    }
  }
}
</script>
