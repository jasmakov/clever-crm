<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Редактировать складскую позицию</h3>
      </div>
      <form @submit.prevent="submitStorage" style="padding: 15px">
        <div class="input-field" >
          <span style="color: #5f5d5b;">Наименование</span>
          <input
                  id="name"
                  type="text"
                  v-model.trim="titlepos"
                  :class="{invalid: ($v.titlepos.$dirty && !$v.titlepos.required) || ($v.titlepos.$dirty && !$v.titlepos.minLength)}"
          >
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
          <span style="color: #5f5d5b;">Артикул</span>
          <input
                  id="article"
                  type="number"
                  v-model.trim="articlepos"
                  :class="{invalid: ($v.articlepos.$dirty && !$v.articlepos.required) || ($v.articlepos.$dirty && !$v.articlepos.minLength)}"
          >
          <small
                  class="helper-text invalid"
                  v-if="$v.articlepos.$dirty && !$v.articlepos.required"
          >Введите Артикул</small>
          <small
                  class="helper-text invalid"
                  v-else-if="$v.articlepos.$dirty && !$v.articlepos.minLength"
          >Введите еще {{$v.articlepos.$params.minLength.min - articlepos.length}} символов</small>
        </div>
        <div class="input-field">
          <span style="color: #5f5d5b;">Остаток на текущий момент</span>
          <input
                  id="howleft"
                  type="number"
                  v-model.number.trim="howleft"
                  :class="{invalid: ($v.howleft.$dirty && !$v.howleft.required) || ($v.howleft.$dirty && !$v.howleft.minLength)}"
          >
          <small
                  class="helper-text invalid"
                  v-if="$v.howleft.$dirty && !$v.howleft.required"
          >Введите остаток на текущий момент</small>
          <small
                  class="helper-text invalid"
                  v-else-if="$v.howleft.$dirty && !$v.howleft.minLength"
          >Введите еще {{$v.howleft.$params.minLength.min - howleft.length}} символов</small>
          <span style="color: #5f5d5b;">Выберите единицу измерения</span>
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
          <span
                  v-if="$v.unitstr.$dirty && !$v.unitstr.required"
                  class="helper-text invalid">
        Введите единицу измерения
      </span>
        </div>
        <div class="input-field" v-if="status !== '2'">
          <span style="color: #5f5d5b;">Цена продажи</span>
          <input
                  id="amount"
                  type="number"
                  v-model.trim="amount"
                  :class="{invalid: ($v.amount.$dirty && !$v.amount.required) || ($v.amount.$dirty && !$v.amount.minLength)}"
          >
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
          <span style="color: #5f5d5b;">Себестоимость</span>
          <input
                  id="realamount"
                  type="number"
                  v-model.trim="realamount"
                  :class="{invalid: ($v.realamount.$dirty && !$v.realamount.required) || ($v.realamount.$dirty && !$v.realamount.minLength)}"
          >
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
          <a href="#" class="btn waves-effect waves-light" @click="editCompForMany">
            Выберите компонент (-ы) готового продукта
          </a>
          <p v-for="componts of allComponents" :key="componts.id">
            {{componts.titlepos}} *{{componts.zeroNeed}}
          </p>
          <p>Себестоимость: {{realSummRa}} руб.</p>
        </div>
        <div class="input-field">
          <button class="btn waves-effect waves-light" type="submit">
            Сохранить
          </button>
          <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="$modal.hide('edit-postor')">
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
              <div v-if="category.status === '2' || category.status === '3'" class="btn-small btn work_menu" style="width: 100%">
                <a href="#" @click="delthiscomp(category)" class="waves-effect waves-light" v-tooltip="'-1 компонент'" style="padding: 6px;"><eva-icon name="minus" animation="pulse" fill="white"></eva-icon></a>
                {{category.titlepos}} ({{ category.zeroNeed }} - {{category.howleft}})
                <a href="#" @click="addthiscomp(category)" class="waves-effect waves-light" v-tooltip="'+1 компонент'" style="padding: 6px;"><eva-icon name="plus" animation="pulse" fill="white"></eva-icon></a>
              </div>
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
  </div>
</template>

<script>
import { numeric, required, minLength } from 'vuelidate/lib/validators'
import reject from 'lodash/reject'
export default {
  props: {
    catbyIdTable: {
      required: true,
      type: Array
    },
    posbyId: {
      required: true
    },
    compForMany: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    select: null,
    allComponents: [],
    realamountAllComp: [],
    compNow: [],
    titlepos: '',
    articlepos: '',
    realSummRa: '0',
    unitstr: 'Шт',
    realamount: '',
    amount: '',
    howleft: '',
    status: ''
  }),
  validations: {
    titlepos: { required, minLength: minLength(2) },
    articlepos: { numeric, required, minLength: minLength(1) },
    amount: { numeric, required, minLength: minLength(1) },
    realamount: { numeric, required, minLength: minLength(1) },
    howleft: { numeric, required, minLength: minLength(1) },
    unitstr: { required }
  },
  async mounted () {
    this.titlepos = this.posbyId.titlepos
    this.articlepos = this.posbyId.articlepos
    this.amount = this.posbyId.amount
    this.realamount = this.posbyId.realamount
    this.realSummRa = this.posbyId.realamount
    this.unitstr = this.posbyId.unitstr
    this.howleft = this.posbyId.howleft
    this.status = this.posbyId.status
    this.allComponents = this.compForMany
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
    addthiscomp (component) {
      this.realamountAllComp = []
      const idx = this.catbyIdTable.findIndex(c => c.id === component.id)
      this.catbyIdTable[idx].zeroNeed++
    },
    delthiscomp (component) {
      this.realamountAllComp = []
      const idx = this.catbyIdTable.findIndex(c => c.id === component.id)
      this.catbyIdTable[idx].zeroNeed--
    },
    addChoComp () {
      this.realamountAllComp = []
      const tableComp = this.catbyIdTable.filter(i => i.status === '2')
      for (const choiceCom of tableComp) {
        if (choiceCom.zeroNeed > 0) {
          const compData = {
            idpos: choiceCom.id,
            titlepos: choiceCom.titlepos,
            realamount: choiceCom.realamount,
            howleft: choiceCom.howleft,
            zeroNeed: choiceCom.zeroNeed,
            unitstr: choiceCom.unitstr
          }
          if (this.allComponents.filter(c => c.idpos === choiceCom.id).length) {
            const idx = this.allComponents.findIndex(c => c.idpos === choiceCom.id)
            this.allComponents[idx].zeroNeed = choiceCom.zeroNeed
          } else {
            this.allComponents.push(compData)
          }
          this.realamountAllComp.push(compData.realamount * choiceCom.zeroNeed)
        } if (choiceCom.zeroNeed < 1) {
          const idx = this.allComponents.findIndex(c => c.idpos === choiceCom.id)
          this.$store.dispatch('deleteCompFromManyEdit', { id: choiceCom.id, areaId: this.$route.params.areaId })
          this.allComponents = reject(this.allComponents, this.allComponents[idx])
        }
      }
      this.realSummRa = 0
      for (let i = 0; i < this.realamountAllComp.length; i++) {
        this.realSummRa = this.realSummRa + parseInt(this.realamountAllComp[i])
      }
      this.$modal.hide('add-compbyid')
    },
    editCompForMany () {
      this.$modal.show('add-compbyid')
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
      const formData = {
        id: this.posbyId.posid,
        areaId: this.$route.params.areaId,
        titlepos: this.titlepos,
        unitstr: this.unitstr,
        amount: this.amount,
        realamount: this.status === '4' ? this.realSummRa : this.realamount,
        articlepos: this.articlepos,
        howleft: this.howleft
      }
      try {
        await this.$store.dispatch('updateStoragePosotionCategory', formData)
        this.$modal.hide('edit-postor')
        this.$message('Успешно сохранено')
        for (const components of this.allComponents) {
          if (this.status === '4') {
            if (this.compForMany.filter(c => c.id === components.id)[0].id) {
              await this.$store.dispatch('updateCompForMany', {
                id: components.id,
                areaId: this.$route.params.areaId,
                zeroNeed: components.zeroNeed
              })
            } else {
              await this.$store.dispatch('addComponentsForMany', {
                areaId: this.$route.params.areaId,
                howleft: components.howleft,
                idpos: components.idpos,
                realamount: components.realamount,
                titlepos: components.titlepos,
                zeroNeed: components.zeroNeed,
                idmany: this.posbyId.posid
              })
            }
            const howleft = components.howleft - components.zeroNeed * this.howleft
            await this.$store.dispatch('insertCompInProduct', {
              areaId: this.$route.params.areaId,
              id: components.idpos,
              howleft: howleft
            })
          }
        }
        if (formData.howleft !== this.posbyId.howleft) {
          const currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '/') + ' ' + new Date().toJSON().slice(11, 19)
          const moveData = {
            areaId: this.$route.params.areaId,
            date: currentDateWithFormat,
            moveStatus: 'Редактирование',
            titlepos: this.titlepos,
            articlepos: this.articlepos,
            unitstr: this.unitstr,
            howleft: formData.howleft - this.posbyId.howleft,
            washave: this.posbyId.howleft,
            howleftNow: formData.howleft,
            userMover: this.$store.getters.info.email
          }
          this.$store.dispatch('createMoveTable', moveData)
        }
        this.$emit('edited', formData)
      } catch (e) {

      }
    }
  }
}
</script>
