<template>
  <div>
    <div class="page-title">
      <h3><router-link to="/" class="green-text">Главная</router-link> / Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link></p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="current">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <div class="input-field" v-if="fio != false">
        <input
          id="fio"
          type="text"
          v-model="fioadd"
          :class="{invalid: $v.fio.$dirty && !$v.fio.required}"
        >
        <label for="fio">ФИО</label>
        <span
          class="helper-text invalid"
          v-if="$v.fio.$dirty && !$v.fio.required"
        >
            Введите ФИО
          </span>
      </div>
      <div class="input-field" v-if="phoneNumberC != false">
        <input
          id="phoneNumberC"
          type="text"
          v-model="phoneadd"
          :class="{invalid: $v.phoneNumberC.$dirty && !$v.phoneNumberC.required}"
        >
        <label for="phoneNumberC">Телефон</label>
        <span
          class="helper-text invalid"
          v-if="$v.phoneNumberC.$dirty && !$v.phoneNumberC.required"
        >
            Введите телефон
          </span>
      </div>
      <div class="input-field" v-if="addressClient != false">
        <input
          id="addressClient"
          type="text"
          v-model="addressadd"
          :class="{invalid: $v.addressClient.$dirty && !$v.addressClient.required}"
        >
        <label for="addressClient">Адрес</label>
        <span
          class="helper-text invalid"
          v-if="$v.addressClient.$dirty && !$v.addressClient.required"
        >
            Введите адрес
          </span>
      </div>
      <div class="input-field" v-if="someBuy != false">
        <input
          id="someBuy"
          type="text"
          :class="{invalid: $v.someBuy.$dirty && !$v.someBuy.required}"
          v-model="addbuy"
        >
        <label for="someBuy">Покупка</label>
        <span
          class="helper-text invalid"
          v-if="$v.someBuy.$dirty && !$v.someBuy.required"
        >
            Введите покупку
          </span>
      </div>
      <div class="input-field" v-if="summDeal != false">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
            Минимальная значение {{$v.amount.$params.minValue.min}}
          </span>
      </div>
      <div class="input-field" v-if="tkClient != false">
        <input
          id="tkClient"
          type="text"
          v-model="tkadd"
          :class="{invalid: $v.tkClient.$dirty && !$v.tkClient.required}"
        >
        <label for="tkClient">ТК</label>
        <span
          class="helper-text invalid"
          v-if="$v.tkClient.$dirty && !$v.tkClient.required"
        >
            Введите ТК
          </span>
      </div>
      <div class="input-field" v-if="commentWrite != false">
        <input
          id="commentWrite"
          type="text"
          v-model="commentadd"
          :class="{invalid: $v.commentWrite.$dirty && !$v.commentWrite.required}"
        >
        <label for="tkClient">Примечание</label>
        <span
          class="helper-text invalid"
          v-if="$v.commentWrite.$dirty && !$v.commentWrite.required"
        >
            Введите примечание
          </span>
      </div>
<!--      <p>-->
<!--        <label>-->
<!--          <input-->
<!--            class="with-gap"-->
<!--            name="type"-->
<!--            type="radio"-->
<!--            value="income"-->
<!--            v-model="type"-->
<!--          />-->
<!--          <span>Доход</span>-->
<!--        </label>-->
<!--      </p>-->

<!--      <p>-->
<!--        <label>-->
<!--          <input-->
<!--            class="with-gap"-->
<!--            name="type"-->
<!--            type="radio"-->
<!--            value="outcome"-->
<!--            v-model="type"-->
<!--          />-->
<!--          <span>Расход</span>-->
<!--        </label>-->
<!--      </p>-->
      <button class="btn waves-effect waves-light" type="submit">
        Создать
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'record',
  metaInfo: {
    title: 'CLEVERME CRM | Создать запись'
  },
  data: () => ({
    loading: true,
    select: null,
    fioadd: null,
    phoneadd: null,
    addressadd: null,
    addbuy: null,
    tkadd: null,
    commentadd: null,
    current: null,
    categories: [],
    category: null,
    type: 'income',
    amount: null
  }),
  validations: {
    amount: { minValue: minValue(1) },
    fio: { required },
    phoneNumberC: { required },
    addressClient: { required },
    someBuy: { required },
    tkClient: { required },
    commentWrite: { required }
  },
  watch: {
    current (catId) {
      const { fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite } = this.categories.find(c => c.id === catId)
      this.fio = fio
      this.phoneNumberC = phoneNumberC
      this.addressClient = addressClient
      this.someBuy = someBuy
      this.summDeal = summDeal
      this.tkClient = tkClient
      this.commentWrite = commentWrite
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      const { id, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite } = this.categories[0]
      this.current = id
      this.fio = fio
      this.phoneNumberC = phoneNumberC
      this.addressClient = addressClient
      this.someBuy = someBuy
      this.summDeal = summDeal
      this.tkClient = tkClient
      this.commentWrite = commentWrite
    }

    setTimeout(() => {
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select)
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.current,
            amount: this.amount,
            type: this.type,
            fioadd: this.fioadd,
            phoneadd: this.phoneadd,
            addressadd: this.addressadd,
            addbuy: this.addbuy,
            tkadd: this.tkadd,
            commentadd: this.commentadd,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = null
          this.fioadd = null
          this.phoneadd = null
          this.addressadd = null
          this.addbuy = null
          this.tkadd = null
          this.commentadd = null
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
