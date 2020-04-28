<template>
  <Loader v-if="loading" />
  <div class="row" v-else>
    <div class="page-title" style="width: 100%; margin-bottom: 15px; padding: 5px;">
      <h3 style="text-align: center; width: 100%;">Оприходование (пополнение) склада</h3>
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
          </tr>
          </tbody>
        </table>
        <div class="row" style="padding: 5px;">
          <div class="input-field col s8">
            <multi-list-select
              :list="GetAllProducts"
              option-value="titlepos"
              option-text="titlepos"
              id="mySelectId"
              name="mySelectName"
              :selected-items="items"
              placeholder="Введите название товара, артикул"
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
    GetAllProducts: function () {
      return this.allProduction.filter(i => i.status !== '4')
    }
  },
  methods: {
    onChoice (items) {
      this.items = items
    },
    async submitModuleProd () {
      try {
        for (const item of this.items) {
          const currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '/') + ' ' + new Date().toJSON().slice(11, 19)
          const moveData = {
            areaId: this.$route.params.areaId,
            date: currentDateWithFormat,
            moveStatus: 'Оприходование (пополнение) склада',
            titlepos: item.titlepos,
            articlepos: item.articlepos,
            unitstr: item.unitstr,
            howleft: item.howhave,
            washave: item.howleft,
            howleftNow: item.howleft + item.howhave,
            userMover: this.$store.getters.info.email
          }
          this.$store.dispatch('createMoveTable', moveData)
          const howleft = item.howleft + item.howhave
          const addPositionProduct = this.$store.dispatch('insertCompInProduct', { areaId: this.$route.params.areaId, id: item.id, howleft: howleft })
          this.$emit('phucked', addPositionProduct)
          this.$message('Успешно')
        }
        this.$modal.hide('add-extra')
      } catch (e) {}
    },
    async hide_production () {
      this.$modal.hide('add-extra')
    }
  },
  components: {
    MultiListSelect
  }
}
</script>
