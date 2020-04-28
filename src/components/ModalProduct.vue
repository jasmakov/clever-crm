<template>
  <Loader v-if="loading" />
  <div class="row" v-else>
    <div class="page-title" style="width: 100%; margin-bottom: 15px; padding: 5px;">
      <h3 style="text-align: center; width: 100%;">Реализация товара</h3>
    </div>
    <form @submit.prevent="submitModule" class="col s12">
      <div class="row">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Доступно</th>
            <th>Цена</th>
            <th>Скидка(%)</th>
            <th>Сумма</th>
            <th></th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(item, idx) of items" :key="item.id + idx">
            <td>{{idx + 1}}</td>
            <td>
                <input :id="item.id+'titlepos'+idx" type="text" class="validate" placeholder="Наименование" v-model="item.titlepos" readonly>
            </td>
            <td>
                <input :id="item.id+'howhave'+idx"  type="number" class="validate" placeholder="Кол-во" v-model.number="item.howhave" @input="getHowHave(item.editId, item.howhave, item.amount, item.salePrice)">
            </td>
            <td>
                <input :id="item.id+'have'+idx"  type="number" class="validate" placeholder="Доступно" v-model="item.howleft" readonly>
            </td>
            <td>
                <input :id="item.id+'amount'+idx"  type="number" class="validate" min="0" placeholder="Цена" v-model.number="item.amount" @input="getHowHave(item.editId, item.howhave, item.amount, item.salePrice)">
            </td>
            <td>
                <input :id="item.id+'salePrice'+idx"  type="number" class="validate" min="0" max="100" placeholder="Скидка" v-model.number="item.salePrice" @input="getHowHave(item.editId, item.howhave, item.amount, item.salePrice)">
            </td>
            <td>
                <input :id="item.id+'summPrice'+idx"  type="text" class="validate" placeholder="Сумма" v-model="item.summPrice">
            </td>
            <td>
              <a href="#" class="waves-effect waves-light" v-tooltip="'Удалить продукт'" @click="deleteItem(item)"><eva-icon name="close"></eva-icon></a>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row" style="padding: 5px;">
          <div class="input-field col s8">
            <multi-list-select
              :list="GetAllWithoutComp"
              option-value="titlepos"
              option-text="titlepos"
              id="mySelectId"
              name="mySelectName"
              :selected-items="emptyStuff"
              placeholder="Введите название товара, артикул"
              @select="onSelect"
            >
            </multi-list-select>
          </div>
          <div class="input-field col s4">
            <model-select
              :options="options"
              v-model="status"
              placeholder="Выбрать статус"
            >
            </model-select>
            <small
              class="helper-text invalid"
              v-if="$v.status.$dirty && !$v.status.required"
            >Нужно выбрать статус</small>
            <div class="final-price">
              Итоговая цена : {{productSummStr}} руб.
            </div>
          </div>
        </div>
      </div>
      <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit" style="margin-right: 10px;">
          Сохранить
        </button>
        <div class="btn waves-effect waves-light" @click="hide_product">
          Закрыть
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { MultiListSelect, ModelSelect } from 'vue-search-select'
import reject from 'lodash/reject'
export default {
  props: {
    rowIdforProd: {
      required: true
    },
    statusForProd: {
      required: true
    }
  },
  validations: {
    status: { required }
  },
  data: () => ({
    loading: true,
    select: null,
    emptyStuff: [],
    items: [],
    status: '0',
    addProduct: [],
    allProduct: [],
    productSummStr: '',
    options: [
      { value: '0', text: 'Не отгружать' },
      { value: '1', text: 'Отгружать' },
      { value: '2', text: 'Бронь' }
    ]
  }),
  async mounted () {
    const areaId = this.$route.params.areaId
    this.allProduct = await this.$store.dispatch('fetchAllPosition', { areaId })
    this.addProduct = await this.$store.dispatch('fetchProductsForModule', { areaId, rowId: this.rowIdforProd })
    this.items = this.addProduct
    this.status = this.statusForProd
    const productSumm = Array.from(this.items, ({ summPrice }) => summPrice)
    this.productSummStr = 0
    for (const prodSumm of productSumm) {
      this.productSummStr = this.productSummStr + parseInt(prodSumm)
    }
    // eslint-disable-next-line no-undef
    M.updateTextFields()
    this.loading = false
  },
  computed: {
    GetAllWithoutComp: function () {
      return this.allProduct.filter(i => i.status !== '2')
    }
  },
  methods: {
    onSelect (items) {
      const newItem = {
        amount: items[0].amount,
        articlepos: items[0].articlepos,
        choostatus: items[0].choostatus,
        comLength: items[0].comLength,
        components: items[0].components,
        howleft: items[0].howleft,
        howhave: 1,
        realamount: items[0].realamount,
        salePrice: 0,
        status: items[0].status,
        summPrice: items[0].amount,
        titlepos: items[0].titlepos,
        unitstr: items[0].unitstr,
        zeroNeed: items[0].zeroNeed,
        strId: items[0].strId,
        editId: items[0].id + this.items.length,
        id: items[0].id
      }
      this.items.push(newItem)
    },
    deleteItem (option) {
      const areaId = this.$route.params.areaId
      this.$confirm('Вы уверены что хотите удалить ' + option.titlepos + '?').then(() => {
        this.$store.dispatch('deleteProduction', { id: option.id, areaId })
        this.items = reject(this.items, option)
        this.$fire({
          title: option.titlepos + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    getHowHave (proid, how, price, sale) {
      this.item = this.items.find(c => c.editId === proid)
      const summWithout = price * how
      const oneProcent = summWithout / 100 * sale
      this.item.summPrice = summWithout - oneProcent
      const productSumm = Array.from(this.items, ({ summPrice }) => summPrice)
      this.productSummStr = 0
      for (const prodSumm of productSumm) {
        this.productSummStr = this.productSummStr + parseInt(prodSumm)
      }
    },
    async submitModule () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const productsNames = Array.from(this.items, ({ titlepos }) => titlepos)
      const productNameStr = productsNames.join('; ')
      const productHowhave = Array.from(this.items, ({ howhave }) => howhave)
      this.productHowhaveStr = 0
      for (const prodHow of productHowhave) {
        this.productHowhaveStr = this.productHowhaveStr + parseInt(prodHow)
      }
      const productSumm = Array.from(this.items, ({ summPrice }) => summPrice)
      this.productSummStr = 0
      for (const prodSumm of productSumm) {
        this.productSummStr = this.productSummStr + parseInt(prodSumm)
      }
      const moduleData = {
        rowid: this.rowIdforProd,
        catid: await this.$route.params.catId,
        areaId: this.$route.params.areaId,
        nameMod: productNameStr,
        muchMod: this.productHowhaveStr,
        priceMod: this.productSummStr + ' Руб.',
        statusMod: this.status
      }
      try {
        for (const item of this.items) {
          const productData = {
            areaId: this.$route.params.areaId,
            id: item.id,
            titlepos: item.titlepos,
            howhave: item.howhave,
            amount: item.amount,
            salePrice: item.salePrice,
            summPrice: item.summPrice,
            status: this.status,
            rowId: this.rowIdforProd,
            editId: item.editId
          }
          if (this.addProduct.find(c => c.id === item.id).status === null) {
            this.$store.dispatch('addProduciton', productData)
          } else {
            this.$store.dispatch('updateProduciton', productData)
          }
          if (this.status === '1' || this.status === '2') {
            const howleft = item.howleft - item.howhave
            console.log(howleft, item.id)
            this.$store.dispatch('insertCompInProduct', { areaId: this.$route.params.areaId, id: item.id, howleft: howleft })
          }
        }
        this.$store.dispatch('updateModule', moduleData)
        this.$modal.hide('edit-module')
        this.$emit('moduled', moduleData)
      } catch (e) {}
    },
    async hide_product () {
      this.$modal.hide('edit-module')
    }
  },
  components: {
    MultiListSelect, ModelSelect
  }
}
</script>
