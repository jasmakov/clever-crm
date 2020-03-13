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
        const category = await this.$store.dispatch('createCategory', {
          areaId: await this.$route.params.areaId,
          title: this.title,
          numIdx: 0,
          fio: 1,
          phoneNumberC: 2,
          moduleOrder: 3,
          addressClient: 4,
          tkClient: 5,
          commentWrite: 6,
          status: 7
        })
        this.$v.$reset()
        this.$message('Вы создали новую категорию')
        this.$emit('created', category)
        await this.$store.dispatch('createEmptyRow', {
          categoryId: category.id,
          areaId: await this.$route.params.areaId,
          fio: '',
          phoneNumberC: '',
          addressClient: '',
          tkClient: '',
          nameMod: '',
          commentWrite: '',
          muchMod: '',
          priceMod: '',
          status: '0'
        })
        const childy = [
          [ { headerName: '', field: 'numIdx', width: 100, cellClass: 'cell-wrap-text', autoHeight: true, hide: false, editable: false, cellRenderer: 'agGroupCellRenderer', cellRendererParams: { checkbox: true } } ],
          [ { headerName: '', field: 'fio', width: 200, cellClass: 'cell-wrap-text', autoHeight: true, hide: false } ],
          [ { headerName: '', field: 'phoneNumberC', width: 100, cellClass: 'cell-wrap-text', autoHeight: true, hide: false } ],
          [
            { headerName: 'Наименование', field: 'nameMod', width: 100, cellClass: 'cell-wrap-text', autoHeight: true, hide: false, editable: false },
            { headerName: 'Количество', field: 'muchMod', width: 100, cellClass: 'cell-wrap-text', autoHeight: true, hide: false, editable: false },
            { headerName: 'Итоговая цена', field: 'priceMod', width: 100, cellClass: 'cell-wrap-text', autoHeight: true, hide: false, editable: false }
          ],
          [ { headerName: '', field: 'addressClient', width: 200, cellClass: 'cell-wrap-text', autoHeight: true, hide: false } ],
          [ { headerName: '', field: 'tkClient', width: 200, cellClass: 'cell-wrap-text', autoHeight: true, hide: false } ],
          [ { headerName: '', field: 'commentWrite', width: 200, cellClass: 'cell-wrap-text', autoHeight: true, hide: false } ],
          [ { headerName: '', field: 'status', width: 200, cellClass: 'cell-my-status', autoHeight: true, hide: false, editable: false } ]
        ]
        const tableCol = [
          { headerName: '№', field: 'numIdx', marryChildren: true, hide: false },
          { headerName: 'ФИО', field: 'fio', marryChildren: true, hide: false },
          { headerName: 'Телефон', field: 'phoneNumberC', marryChildren: true, hide: false },
          { headerName: 'Модуль "заказа товара"', field: 'moduleOrder', marryChildren: true, hide: false },
          { headerName: 'Адрес', field: 'addressClient', marryChildren: true, hide: false },
          { headerName: 'ТК', field: 'tkClient', marryChildren: true, hide: false },
          { headerName: 'Примечание', field: 'commentWrite', marryChildren: true, hide: false },
          { headerName: 'Статус', field: 'status', marryChildren: true, hide: false }
        ]
        this.numStart = '0'
        for (const coly of tableCol) {
          await this.$store.dispatch('createColoumn', {
            categoryId: category.id,
            areaId: await this.$route.params.areaId,
            headerName: coly.headerName,
            field: coly.field,
            marryChildren: coly.marryChildren,
            children: childy[this.numStart++],
            hide: coly.hide
          })
        }
      } catch (e) {}
    },
    async hide_cat () {
      this.$modal.hide('add-cat')
    }
  }
}
</script>
