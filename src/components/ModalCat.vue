<template>
  <div class="col s12 m6">
    <Loader v-if="loading" />
    <div v-else>
      <form @submit.prevent="submitHandler" style="padding: 15px">
        <div class="input-field" >
          <select ref="select" v-model="title" id="name">
            <option value="Работа с клиентами" :class="{invalid: $v.title.$dirty && !$v.title.required}">Работа с клиентами
            </option>
            <option value="1" v-if="!checkStrSta.length">Склад</option>
            <option value="p1" v-if="!checkProdSta.length">Производство</option>
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
  props: {
    categories: {
      type: Array,
      required: true
    },
    checkStrSta: {
      required: true
    },
    checkProdSta: {
      required: true
    }
  },
  data: () => ({
    loading: false,
    select: null,
    title: 'Работа с клиентами',
    fio: true,
    phoneNumberC: true,
    addressClient: true,
    tkClient: true,
    commentWrite: true,
    moduleOrder: true
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
        if (this.title === '1') {
          await this.$store.dispatch('addStorage', {
            areaId: await this.$route.params.areaId,
            status: this.title
          })
          const category = {
            title: 'Склад',
            id: 'storage'
          }
          this.$emit('created', category)
          this.$message('Вы создали склад')
        }
        if (this.title === 'p1') {
          await this.$store.dispatch('addProductionForProduct', {
            areaId: await this.$route.params.areaId,
            status: this.title
          })
          const category = {
            title: 'Производство',
            id: 'production'
          }
          this.$emit('created', category)
          this.$message('Вы создали производство')
        }
        if (this.title === 'Работа с клиентами') {
          const category = await this.$store.dispatch('createCategory', {
            areaId: await this.$route.params.areaId,
            title: this.title + ' - ' + (this.categories.length + 1),
            numIdx: 0,
            fio: 1,
            phoneNumberC: 2,
            moduleOrder: 3,
            addressClient: 4,
            tkClient: 5,
            commentWrite: 6,
            status: 7
          })
          const getColbyId = {
            children: [
              {
                field: 'numIdx',
                headerName: '',
                width: 70,
                cellRenderer: 'agGroupCellRenderer',
                cellRendererParams: { checkbox: true },
                editable: false,
                lockPosition: true
              }
            ],
            headerName: '№'
          }
          await this.$store.dispatch('addNum', { areaId: this.$route.params.areaId, catId: category.id, getColbyId })
          this.$v.$reset()
          this.$message('Вы создали новую категорию')
          this.$emit('created', category)
        }
      } catch (e) {}
    },
    async hide_cat () {
      this.$modal.hide('add-cat')
    }
  }
}
</script>
