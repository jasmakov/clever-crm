<template>
  <Loader v-if="loading" />
  <div v-else>
    <Catbar :categories="categories" :invited="invited" :myinviters="myinviters" :rights="rights"/>
    <section>
      <a href="#" @click.prevent="show" class="waves-effect waves-light btn-small" v-tooltip="'Редактировать столбцы'" style="padding: 6px;"><eva-icon name="browser" animation="pulse" fill="white"></eva-icon></a>
      <a href="#" @click.prevent="deleteRow" class="waves-effect waves-light btn-small" v-tooltip="'Удалить строку(ки)'" style="padding: 6px;"><eva-icon name="trash-2" animation="pulse" fill="white"></eva-icon></a>
      <div style="height: 100%" :key="columnDefsChoice.length + updateCount">
        <Loader v-if="loadingtable" />
        <ag-grid-vue style="height: 600px;" class="ag-theme-balham" :class="{ tablenone: loadingtable }" id="myGrid"
                     :gridOptions="gridOptions"
                     :columnDefs="columnDefsChoice"
                     :defaultColDef="defaultColDef"
                     :modules="modules"
                     :key="records.length + updateCount"
                     :rowData="newrecord"
                     :rowClassRules="rowClassRules"
                     :rowSelection="rowSelection"
                     @cellValueChanged="numberParser"
                     @cellDoubleClicked="editProduct"
                     @columnResized="changeSize"
                     @dragStopped="changeDrag">
        </ag-grid-vue>
        <a href="#" class="waves-effect waves-light" v-tooltip="'Редактор прав'" style="padding: 6px;"><eva-icon name="person-add" animation="pulse" fill="white"></eva-icon></a>
      </div>
      <modal  name="add-col" transition="nice-modal-fade"
              :min-width="200"
              :min-height="200"
              width="20%"
              height="auto">
        <ModalCol :columnDefsChoice="columnDefsChoice" @updated="updateCol"/>
      </modal>
      <modal  name="edit-module" transition="nice-modal-fade"
              :min-width="200"
              :min-height="200"
              width="80%"
              height="auto">
        <ModalProduct :productObj="productObj" :rowIdforProd="rowIdforProd" @moduled="updateModule"/>
      </modal>
      <modal  name="edit-status" transition="nice-modal-fade"
              :min-width="200"
              :min-height="200"
              width="60%"
              height="auto">
        <ModalStatus :rowIdforProd="rowIdforProd" @statused="updateStatus"/>
      </modal>
    </section>
  </div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import ModalCol from '../components/ModalCol'
import Catbar from '../components/app/Catbar'
import ModalProduct from '../components/ModalProduct'
import ModalStatus from '../components/ModalStatus'

export default {
  name: 'category',
  metaInfo: {
    title: 'CLEVERME CRM'
  },
  data: function () {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      rowHeight: null,
      defaultColDef: null,
      rowData: null,
      rowClassRules: null,
      rowSelection: null,
      columnDefsChoice: [],
      productCategory: [],
      allProduct: [],
      productObj: [],
      myinviters: [],
      invited: [],
      records: [],
      categories: [],
      newrecord: [],
      rights: [],
      loading: true,
      loadingtable: true,
      rowIdforProd: '',
      isHide: false,
      modules: AllCommunityModules,
      updateCount: 0
    }
  },
  async beforeMount () {
    this.gridOptions = {}
    this.defaultColDef = {
      editable: true,
      resizable: true,
      sortable: true
    }
    this.rowSelection = 'multiple'
    this.autoGroupColumnDef = {
      headerName: 'Athlete',
      field: 'athlete',
      width: 200,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true }
    }
  },
  async mounted () {
    const id = this.$route.params.catId
    const areaId = this.$route.params.areaId
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].rights[id].readCaty === 'mydvg1cool') {
      this.gridApi = this.gridOptions.api
      this.records = await this.$store.dispatch('fetchRecords', { id, areaId })
      let idx = 1
      for (const reco of this.records) {
        const allrecord = {
          numIdx: idx++,
          addressClient: reco.addressClient,
          commentWrite: reco.commentWrite,
          fio: reco.fio,
          muchMod: reco.muchMod,
          nameMod: reco.nameMod,
          phoneNumberC: reco.phoneNumberC,
          priceMod: reco.priceMod,
          tkClient: reco.tkClient,
          status: reco.status === '0' ? 'Выбрать статус' : reco.status === '1' ? 'В работе' : reco.status === '2' ? 'Думают' : reco.status === '3' ? 'Собран' : reco.status === '4' ? 'Выставлен счет' : reco.status === '5' ? 'Оплачен' : reco.status === '6' ? 'Отгружен' : reco.status === '7' ? 'Возврат' : reco.status === '8' ? 'Отменен' : '',
          id: reco.id
        }
        this.newrecord.push(allrecord)
      }
      this.rowClassRules = {
        'status_work': params => {
          const numSickDays = params.data.status
          return numSickDays === 'В работе'
        },
        'status_not': 'data.status === "Выбрать статус"',
        'status_think': 'data.status === "Думают"',
        'status_create': 'data.status === "Собран"',
        'status_payday': 'data.status === "Выставлен счет"',
        'status_alrpay': 'data.status === "Оплачен"',
        'status_mailed': 'data.status === "Отгружен"',
        'status_back': 'data.status === "Возврат"',
        'status_cancel': 'data.status === "Отменен"'
      }
      this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', { id, areaId })
    } else {
      this.$alert('У вас нету доступа к этой категории')
    }
    this.invited = await this.$store.dispatch('fetchInvited', areaId)
    this.categories = await this.$store.dispatch('fetchCategories', areaId)
    this.productCategory = await this.$store.dispatch('fetchProductsCategory', areaId)
    this.myinviters = await this.$store.dispatch('fetchInviterforInvite', areaId)
    this.loading = false
    const ColGrid = await this.gridOptions
    const catyg = await this.$store.dispatch('fetchCategoryById', { id, areaId })
    ColGrid.columnApi.moveColumn('fio', catyg.fio)
    ColGrid.columnApi.moveColumn('phoneNumberC', catyg.phoneNumberC)
    ColGrid.columnApi.moveColumn('moduleOrder', catyg.moduleOrder)
    ColGrid.columnApi.moveColumn('addressClient', catyg.addressClient)
    ColGrid.columnApi.moveColumn('tkClient', catyg.tkClient)
    ColGrid.columnApi.moveColumn('commentWrite', catyg.commentWrite)
    this.loadingtable = false
  },
  watch: {
    async $route (to) {
      this.loading = true
      const id = to.params.catId
      const areaId = this.$route.params.areaId
      this.rights = await this.$store.dispatch('fetchRights', { areaId })
      if (this.rights === 'Admin' || this.rights[0].rights[id].readCaty === 'mydvg1cool') {
        this.newrecord = []
        this.records = await this.$store.dispatch('fetchRecords', { id, areaId })
        let idx = 1
        for (const reco of this.records) {
          const allrecord = {
            numIdx: idx++,
            addressClient: reco.addressClient,
            commentWrite: reco.commentWrite,
            fio: reco.fio,
            muchMod: reco.muchMod,
            nameMod: reco.nameMod,
            phoneNumberC: reco.phoneNumberC,
            priceMod: reco.priceMod,
            tkClient: reco.tkClient,
            status: reco.status === '0' ? 'Выбрать статус' : reco.status === '1' ? 'В работе' : reco.status === '2' ? 'Думают' : reco.status === '3' ? 'Собран' : reco.status === '4' ? 'Выставлен счет' : reco.status === '5' ? 'Оплачен' : reco.status === '6' ? 'Отгружен' : reco.status === '7' ? 'Возврат' : reco.status === '8' ? 'Отменен' : '',
            id: reco.id
          }
          this.newrecord.push(allrecord)
        }
        this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', { id, areaId })
      } else {
        this.$alert('У вас нету доступа к этой категории')
      }
      this.loading = false
      this.loadingtable = true
      const catyg = await this.$store.dispatch('fetchCategoryById', { id, areaId })
      const ColGrid = await this.gridOptions
      ColGrid.columnApi.moveColumn('fio', catyg.fio)
      ColGrid.columnApi.moveColumn('phoneNumberC', catyg.phoneNumberC)
      ColGrid.columnApi.moveColumn('moduleOrder', catyg.moduleOrder)
      ColGrid.columnApi.moveColumn('addressClient', catyg.addressClient)
      ColGrid.columnApi.moveColumn('tkClient', catyg.tkClient)
      ColGrid.columnApi.moveColumn('commentWrite', catyg.commentWrite)
      this.loadingtable = false
    }
  },
  methods: {
    deleteRow () {
      this.loadingtable = true
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$confirm('Вы уверены что хотите удалить ?').then(() => {
          const selectedRows = this.gridOptions.api.getSelectedRows()
          for (const deleteItem of selectedRows) {
            const id = this.$route.params.catId
            const areaId = this.$route.params.areaId
            const rowid = deleteItem.id
            this.$store.dispatch('deleteRecord', { id, areaId, rowid })
            this.newrecord.splice(deleteItem.numIdx - 1, 1)
          }
          this.$fire({
            title: 'Успешно удалено',
            type: 'success',
            timer: 3000
          })
        })
      } else {
        this.$message('У вас нет прав')
      }
      this.loadingtable = false
    },
    updateCol (column) {
      const idx = this.columnDefsChoice.findIndex(c => c.groupId === column.id)
      if (column.catData === 'moduleOrder') {
        this.columnDefsChoice[idx].children[0].hide = column.hide
        this.columnDefsChoice[idx].children[1].hide = column.hide
        this.columnDefsChoice[idx].children[2].hide = column.hide
      } else {
        this.columnDefsChoice[idx].children[0].hide = column.hide
      }
      this.updateCount++
    },
    updateModule (module) {
      const idx = this.newrecord.findIndex(c => c.id === module.rowid)
      this.newrecord[idx].nameMod = module.nameMod
      this.newrecord[idx].muchMod = module.muchMod
      this.newrecord[idx].priceMod = module.priceMod
      this.updateCount++
    },
    updateStatus (module) {
      const idx = this.newrecord.findIndex(c => c.id === module.rowid)
      this.newrecord[idx].status = module.status === '0' ? 'Выбрать статус' : module.status === '1' ? 'В работе' : module.status === '2' ? 'Думают' : module.status === '3' ? 'Собран' : module.status === '4' ? 'Выставлен счет' : module.status === '5' ? 'Оплачен' : module.status === '6' ? 'Отгружен' : module.status === '7' ? 'Возврат' : module.status === '8' ? 'Отменен' : ''
      this.updateCount++
    },
    async show () {
      const id = this.$route.params.catId
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin' || rights[0].rights[id].writeCaty === 'mydvg1cool') {
        this.$modal.show('add-col')
      } else {
        this.$alert('У вас нету доступа к этой функции')
      }
    },
    async editProduct (params) {
      const id = this.$route.params.catId
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin' || rights[0].rights[id].writeCaty === 'mydvg1cool') {
        this.productObj = []
        this.rowIdforProd = params.data.id
        if (params.colDef.field === 'nameMod' || params.colDef.field === 'muchMod' || params.colDef.field === 'priceMod') {
          this.$modal.show('edit-module')
          for (const prodForAdd of this.productCategory) {
            const proCatId = prodForAdd.id
            const areaId = this.$route.params.areaId
            this.allProduct = await this.$store.dispatch('fetchProductsCategoryTableById', { proCatId, areaId })
            console.log(this.allProduct)
            for (const prody of this.allProduct) {
              this.productObj.push(prody)
            }
          }
        }
        if (params.colDef.field === 'status') {
          this.$modal.show('edit-status')
        }
      } else {
        this.$alert('У вас нету доступа к этой функции')
      }
    },
    async numberParser (params) {
      const id = this.$route.params.catId
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin' || rights[0].rights[id].writeCaty === 'mydvg1cool') {
        const recordData = {
          rowid: params.data.id,
          catid: await this.$route.params.catId,
          areaId: await this.$route.params.areaId,
          fio: params.colDef.field === 'fio' ? params.newValue : params.data.fio,
          phoneNumberC: params.colDef.field === 'phoneNumberC' ? params.newValue : params.data.phoneNumberC,
          addressClient: params.colDef.field === 'addressClient' ? params.newValue : params.data.addressClient,
          tkClient: params.colDef.field === 'tkClient' ? params.newValue : params.data.tkClient,
          commentWrite: params.colDef.field === 'commentWrite' ? params.newValue : params.data.commentWrite
        }
        this.$store.dispatch('updateRecord', recordData)
        const id = await this.$route.params.catId
        const areaId = this.$route.params.areaId
        const records = await this.$store.dispatch('fetchRecords', { id, areaId })
        const lastRecord = records[records.length - 1]
        if (lastRecord.fio !== '' || lastRecord.phoneNumberC !== '' || lastRecord.nameMod !== '' || lastRecord.muchMod !== '' || lastRecord.priceMod !== '' || lastRecord.addressClient !== '' || lastRecord.tkClient !== '' || lastRecord.commentWrite !== '') {
          const emptyRowData = {
            categoryId: id,
            areaId: areaId,
            fio: '',
            phoneNumberC: '',
            addressClient: '',
            tkClient: '',
            commentWrite: '',
            nameMod: '',
            muchMod: '',
            priceMod: '',
            status: '0'
          }
          const takerecord = await this.$store.dispatch('createEmptyRow', emptyRowData)
          takerecord.status = takerecord.status === '0' ? 'Выбрать статус' : ''
          const Idx = {
            numIdx: records.length + 1
          }
          const emptyValue = { ...takerecord, ...Idx }
          this.newrecord.push(emptyValue)
        }
        if (params.data.fio === '' & params.data.phoneNumberC === '' & params.data.addressClient === '' & params.data.tkClient === '' & params.data.commentWrite === '' & params.data.nameMod === '' & params.data.muchMod === '' & params.data.priceMod === '' & lastRecord.id !== params.data.id) {
          const rowid = params.data.id
          this.$store.dispatch('deleteRecord', { id, areaId, rowid })
        } else {
          console.log('Ничего не происходит')
        }
      } else {
        this.$alert('У вас нету для этого прав')
      }
    },
    async changeSize (params) {
      const id = this.$route.params.catId
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin' || rights[0].rights[id].writeCaty === 'mydvg1cool') {
        this.gridOptions.api.resetRowHeights()
        const getWidth = params.columns
        if (params.finished === true) {
          this.numStart = '0'
          for (const widy of getWidth) {
            const columnData = {
              catid: this.$route.params.catId,
              areaId: this.$route.params.areaId,
              colid: widy.parent.groupId,
              groid: [this.numStart++],
              width: widy.actualWidth
            }
            this.$store.dispatch('updateColSize', columnData)
          }
          this.$message('Размер колонок успешно изменен')
        }
      } else {
        this.$message('У вас нету для этого прав')
      }
    },
    async changeDrag (params) {
      const id = this.$route.params.catId
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin' || rights[0].rights[id].writeCaty === 'mydvg1cool') {
        const cols = params.columnApi.getAllDisplayedVirtualColumns()
        this.colStart = '0'
        for (const col of cols) {
          if (col.colDef.field !== '') {
            const field = col.colDef.field
            const updateColIdx = {
              catid: this.$route.params.catId,
              areaId: this.$route.params.areaId,
              field: field,
              colnum: this.colStart++
            }
            this.$store.dispatch('updateIdxColumn', updateColIdx)
          }
        }
        this.$message('Сохранено')
      } else {
        this.$message('У вас нету доступа')
      }
    }
  },
  components: {
    ModalProduct,
    ModalCol,
    ModalStatus,
    Catbar,
    'ag-grid-vue': AgGridVue
  }
}
</script>
