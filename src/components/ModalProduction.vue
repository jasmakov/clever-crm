<template>
  <Loader v-if="loading" />
  <div class="row" v-else>
    <div class="page-title" style="width: 100%; margin-bottom: 15px; padding: 5px;">
      <h3 style="text-align: center; width: 100%;">Произведено</h3>
    </div>
    <form @submit.prevent="submitModuleProd" class="col s12">
      <div class="row">
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Наименование</th>
            <th>Артикул</th>
            <th>Ед. изм.</th>
            <th>Кол-во</th>
            <th>Примечание</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="(item, idx) of items" :key="item.id + idx">
            <td>{{idx + 1}}</td>
            <td>
              <input :id="item.id+'titlepos'+idx" type="text" class="validate" placeholder="Наименование" v-model.trim="item.titlepos" readonly>
            </td>
            <td>
              <input :id="item.id+'articlepos'+idx"  type="number" class="validate" placeholder="Артикул" v-model.trim.number="item.articlepos" readonly>
            </td>
            <td>
              <input :id="item.id+'unitstr'+idx"  type="text" class="validate" placeholder="Ед. изм." v-model.trim="item.unitstr" readonly>
            </td>
            <td>
              <input :id="item.id+'howhave'+idx"  type="number" class="validate" min="0" placeholder="Кол-во" v-model.number.trim="item.howhave">
            </td>
            <td>
              <input :id="item.id+'comment'+idx"  type="text" class="validate" min="0" placeholder="Примечание" v-model.trim="item.comment">
            </td>
          </tr>
          </tbody>
        </table>
        <div class="row" style="padding: 5px;">
          <div class="input-field col s8">
            <multi-list-select
              :list="GetAllMultyComp"
              option-value="titlepos"
              option-text="titlepos"
              id="mySelectId"
              name="mySelectName"
              :selected-items="items"
              placeholder="Выбрать многокомпонентный товар"
              @select="onChoice"
            >
            </multi-list-select>
          </div>
          <div class="input-field col s4">
          </div>
        </div>
      </div>
      <div class="input-field col s12">
        <button class="btn waves-effect waves-light" type="submit" style="margin-right: 10px;">
          Сохранить
        </button>
        <div class="btn waves-effect waves-light" @click="hide_production">
          Закрыть
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { MultiListSelect } from 'vue-search-select'
export default {
  data: () => ({
    loading: true,
    items: []
  }),
  async mounted () {
    const areaId = this.$route.params.areaId
    this.allProduction = await this.$store.dispatch('fetchAllPosition', { areaId })
    // eslint-disable-next-line no-undef
    M.updateTextFields()
    this.loading = false
  },
  computed: {
    GetAllMultyComp: function () {
      return this.allProduction.filter(i => i.status === '4')
    }
  },
  methods: {
    onChoice (items) {
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
    async submitModuleProd () {
      try {
        for (const item of this.items) {
          const currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '/') + ' ' + new Date().toJSON().slice(11, 19)
          const movesData = {
            areaId: this.$route.params.areaId,
            date: currentDateWithFormat,
            moveStatus: 'Произведено',
            titlepos: item.titlepos,
            articlepos: item.articlepos,
            unitstr: item.unitstr,
            howleft: item.howhave,
            washave: item.howleft,
            howleftNow: item.howleft + item.howhave,
            userMover: this.$store.getters.info.email
          }
          this.$store.dispatch('createMoveTable', movesData)
          const productData = {
            areaId: this.$route.params.areaId,
            proId: item.id,
            dateNow: new Date().toJSON().slice(0, 10).replace(/-/g, '/') + ' ' + new Date().toJSON().slice(11, 19),
            titlepos: item.titlepos,
            articlepos: item.articlepos,
            unitstr: item.unitstr,
            howhave: item.howhave,
            howleft: item.howleft,
            comment: item.comment ? item.comment : ''
          }
          this.$store.dispatch('addMultyProduct', productData)
          this.$emit('producted', productData)
          const howleft = item.howhave + item.howleft
          this.$store.dispatch('insertCompInProduct', { areaId: this.$route.params.areaId, id: item.id, howleft: howleft })
          for (const comp of item.components) {
            const component = await this.$store.dispatch('fetchStoragePositionById', { posid: comp.idpos, areaId: this.$route.params.areaId })
            const howleftComp = component.howleft - comp.zeroNeed * item.howhave
            this.$store.dispatch('insertCompInProduct', { areaId: this.$route.params.areaId, id: comp.idpos, howleft: howleftComp })
          }
        }
        this.$modal.hide('add-multprod')
      } catch (e) {}
    },
    async hide_production () {
      this.$modal.hide('add-multprod')
    }
  },
  components: {
    MultiListSelect
  }
}
</script>
