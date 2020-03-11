<template>
  <div class="row">
    <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
      <h3 style="text-align: center; width: 100%;">Реализация товара</h3>
    </div>
      <div class="row">
        <div class="input-field col s12">
          <multi-list-select
            :list="productObj"
            option-value="titlepos"
            option-text="titlepos"
            id="mySelectId"
            name="mySelectName"
            :selected-items="items"
            placeholder="Выбрать продукт"
            @select="onSelect"
          >
          </multi-list-select>
        </div>
      </div>
    <form @submit.prevent="submitModule" class="col s12">
      <div class="row">
        <table>
          <thead>
          <tr>
            <th></th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Доступно</th>
            <th>Цена</th>
            <th>Скидка</th>
            <th>Сумма</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(item, idx) of items" :key="item.id">
            <td>{{idx + 1}}</td>
            <td>
                <input id="product_name" type="text" class="validate" placeholder="Наименование" v-model="item.titlepos" readonly>
            </td>
            <td>
                <input id="product_much" type="number" class="validate" placeholder="Кол-во" v-model.number="item.howhave" @input="getHowHave(item.id, item.howhave, item.amount, item.salePrice)">
            </td>
            <td>
                <input id="product_have" type="number" class="validate" placeholder="Доступно" readonly>
            </td>
            <td>
                <input id="product_price" type="number" class="validate" min="0" placeholder="Цена" v-model.number="item.amount">
            </td>
            <td>
                <input id="product_sale" type="number" class="validate" min="0" max="100" placeholder="Скидка" v-model.number="item.salePrice" @input="getSale(item.id, item.amount, item.howhave, item.salePrice)">
            </td>
            <td>
                <input id="product_summ" type="text" class="validate" placeholder="Сумма" v-model="item.summPrice">
            </td>
          </tr>
          </tbody>
        </table>
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
import { MultiListSelect } from 'vue-search-select'
export default {
  props: {
    productObj: {
      type: Array,
      required: true
    },
    rowIdforProd: {
      required: true
    }
  },
  data: () => ({
    items: []
  }),
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  methods: {
    onSelect (items) {
      this.items = items
    },
    getHowHave (proid, how, price, sale) {
      this.item = this.productObj.find(c => c.id === proid)
      const summWithout = price * how
      const oneProcent = summWithout / 100 * sale
      this.item.summPrice = summWithout - oneProcent
    },
    getSale (proid, price, how, sale) {
      this.item = this.productObj.find(c => c.id === proid)
      const summWithout = price * how
      const oneProcent = summWithout / 100 * sale
      this.item.summPrice = summWithout - oneProcent
    },
    async submitModule () {
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
        priceMod: this.productSummStr + ' Руб.'
      }
      try {
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
    MultiListSelect
  }
}
</script>
