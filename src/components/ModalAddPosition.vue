<template>
  <div>
  <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
    <h5 style="text-align: center; width: 100%;" v-if="status === '1'">ГОТОВЫЙ ПРОДУКТ (товар готовый к реализации)</h5>
    <h5 style="text-align: center; width: 100%;" v-if="status === '2'">Компонент (Деталь)</h5>
    <h5 style="text-align: center; width: 100%;" v-if="status === '3'">Готовый продукт и компонент</h5>
    <h5 style="text-align: center; width: 100%;" v-if="status === '4'">Многокомпонентный продукт</h5>
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
        v-model.number.trim="articlepos"
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
    <div class="input-field">
      <input
        id="howleft"
        type="number"
        v-model.number.trim="howleft"
        :class="{invalid: ($v.howleft.$dirty && !$v.howleft.required) || ($v.howleft.$dirty && !$v.howleft.minLength)}"
      >
      <label for="howleft">Остаток на текущий момент</label>
      <small
        class="helper-text invalid"
        v-if="$v.howleft.$dirty && !$v.howleft.required"
      >Введите остаток на текущий момент</small>
      <small
        class="helper-text invalid"
        v-else-if="$v.howleft.$dirty && !$v.howleft.minLength"
      >Введите еще {{$v.howleft.$params.minLength.min - howleft.length}} символов</small>
    </div>
    <div class="input-field">
      <select ref="select" v-model="unitstr" id="unit">
        <option value="Шт">Шт</option>
        <option value="М">Метр</option>
        <option value="См">См</option>
        <option value="Мм">Мм</option>
        <option value="Л">Литр</option>
        <option value="Г">Грамм</option>
        <option value="Кг">Килограмм</option>
        <option value="Мг">Миллиграмм</option>
      </select>
      <label for="unit">Выберите единицу измерения</label>
      <span
        v-if="$v.unitstr.$dirty && !$v.unitstr.required"
        class="helper-text invalid">
        Введите единицу измерения
      </span>
    </div>
    <div class="input-field" v-if="status !== '2'">
      <input
        id="amount"
        type="number"
        v-model.number.trim="amount"
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
    <div class="input-field" v-if="status !== '4'">
      <input
        id="realamount"
        type="number"
        v-model.number.trim="realamount"
        :class="{invalid: ($v.realamount.$dirty && !$v.realamount.required) || ($v.realamount.$dirty && !$v.realamount.minLength)}"
      >
      <label for="realamount">Себестоимость</label>
      <small
        class="helper-text invalid"
        v-if="$v.realamount.$dirty && !$v.realamount.required"
      >Введите остаток цену продажи</small>
      <small
        class="helper-text invalid"
        v-else-if="$v.realamount.$dirty && !$v.realamount.minLength"
      >Введите еще {{$v.realamount.$params.minLength.min - realamount.length}} символов</small>
    </div>
    <div class="input-field" v-if="status === '4'">
      <a href="#" class="btn waves-effect waves-light" @click="$modal.show('add-compbyid')">
        Выберите компонент (-ы) готового продукта
      </a>
      <p v-for="componts of allComponents" :key="componts.id">
        {{componts.titlepos}} - {{componts.zeroNeed}} {{componts.unitstr}}
      </p>
      <p>Себестоимость: {{realSummRa}} руб.</p>
    </div>
    <div class="input-field">
      <button class="btn waves-effect waves-light" type="submit">
        Сохранить
      </button>
      <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="$modal.hide('add-position')">
        Отмена
      </div>
    </div>
  </form>
  <modal  name="add-compbyid" transition="nice-modal-fade"
          :min-width="200"
          :min-height="300"
          :clickToClose="false"
          width="40%"
          height="auto">
    <div style="padding: 15px;">
      <div class="page-title" style="width: 100%;">
        <h3 style="text-align: center; width: 100%;">Выберите компонент</h3>
        <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="$modal.hide('add-compbyid')">
          X
        </div>
      </div>
      <ul class="components">
        <li v-for="category of catbyIdTable" :key="category.id + category.zeroNeed">
          <a v-if="category.status === '2' || category.status === '3'" class="btn-small btn work_menu" style="width: 100%" href="#" @click="addthiscomp(category)">
            {{category.titlepos}} ({{ category.zeroNeed }} - {{category.howleft}})
          </a>
        </li>
        <li class="add-components">
          <a class="btn-small btn work_menu" style="width: 100%" href="#" @click="addChoComp()">
            Добавить компоненты
          </a>
        </li>
      </ul>
    </div>
  </modal>
  </div>
</template>

<script>
import { numeric, required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    status: {
      required: true
    },
    catbyIdTable: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    select: null,
    allComponents: [],
    realamountAllComp: [],
    titlepos: '',
    articlepos: null,
    realSummRa: null,
    unitstr: 'Шт',
    choostatus: '',
    realamount: null,
    amount: null,
    howleft: null
  }),
  validations: {
    titlepos: { required, minLength: minLength(2) },
    articlepos: { numeric, required, minLength: minLength(1) },
    amount: { numeric, required, minLength: minLength(1) },
    realamount: { numeric, required, minLength: minLength(1) },
    howleft: { numeric, required, minLength: minLength(1) },
    unitstr: { required }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    addthiscomp (component) {
      this.realamountAllComp = []
      const idx = this.catbyIdTable.findIndex(c => c.id === component.id)
      if (this.catbyIdTable[idx].zeroNeed < component.howleft) {
        this.catbyIdTable[idx].zeroNeed++
      }
    },
    addChoComp () {
      for (const choiceCom of this.catbyIdTable) {
        if (choiceCom.zeroNeed > 0) {
          const compData = {
            idpos: choiceCom.id,
            titlepos: choiceCom.titlepos,
            realamount: choiceCom.realamount,
            howleft: choiceCom.howleft,
            zeroNeed: choiceCom.zeroNeed,
            unitstr: choiceCom.unitstr
          }
          this.allComponents.push(compData)
          this.realamountAllComp.push(compData.realamount * choiceCom.zeroNeed)
        }
      }
      this.realSummRa = 0
      for (let i = 0; i < this.realamountAllComp.length; i++) {
        this.realSummRa = this.realSummRa + parseInt(this.realamountAllComp[i])
      }
      this.$modal.hide('add-compbyid')
    },
    async submitStorage () {
      if (this.status === '1' || this.status === '3') {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
      }
      if (this.status === '2') {
        if (this.$v.titlepos.$invalid && this.$v.articlepos.$invalid && this.$v.realamount.$invalid && this.$v.howleft.$invalid && this.$v.unitstr.$invalid) {
          this.$v.$touch()
          return
        }
      }
      if (this.status === '4') {
        if (this.$v.titlepos.$invalid && this.$v.articlepos.$invalid && this.$v.amount.$invalid && this.$v.howleft.$invalid && this.$v.unitstr.$invalid) {
          this.$v.$touch()
          return
        }
      }
      try {
        const formData = {
          comLength: 0,
          zeroNeed: 0,
          strid: this.$route.params.strId,
          areaId: this.$route.params.areaId,
          titlepos: this.titlepos,
          articlepos: this.articlepos,
          components: this.status === '4' ? this.allComponents : '',
          amount: this.status === '2' ? '' : this.amount,
          realamount: this.status === '4' ? this.realSummRa : this.realamount,
          howleft: this.howleft === '4' ? null : this.howleft,
          unitstr: this.unitstr === '4' ? '' : this.unitstr,
          status: this.status,
          summPrice: 0,
          salePrice: ''
        }
        const newposition = await this.$store.dispatch('createPosotionStorage', formData)
        this.$modal.hide('add-position')
        this.$modal.hide('add-postor')
        this.$emit('added', newposition)
        if (this.status === '4') {
          for (const comp of this.allComponents) {
            const howleft = comp.howleft - comp.zeroNeed * this.howleft
            this.$store.dispatch('insertCompInProduct', { areaId: this.$route.params.areaId, id: comp.idpos, howleft: howleft })
          }
        }
        this.$message('Успешно добавлено')
      } catch (e) {

      }
    }
  }
}
</script>
