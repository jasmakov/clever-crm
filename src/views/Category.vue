<template>
<Loader v-if="loading" />
<div v-else>
  <div class="page-title">
    <h3 :key="columnDefs.length + updateCount">
        <ul>
          <draggable draggable=".work_menu" @end="onEnd">
            <router-link
              v-for="minecategor in categories"
              :key="minecategor.id" tag="li"
              class="btn-small btn work_menu"
              active-class="active"
              :to="'/'+ minecategor.id"
            >
              <a href="#" class="waves-effect waves-light" style="color: #fff;" @click="Changepage(minecategor.id)" @dblclick="changeTitle(minecategor.id)" v-tooltip="'Дважды кликните чтобы изменить название'">{{minecategor.title}}
              </a>
              <span @click="deleteCategory(minecategor.id, minecategor.title)" class="Delete_Category">X</span>
            </router-link>
            <li class="btn-small btn" @click.prevent="show_cat"><a href="#" class="waves-effect waves-light" v-tooltip="'Добавить категорию'" style="padding: 6px;"><eva-icon name="plus" animation="pulse" fill="white"></eva-icon></a></li>
            <li class="btn-small btn" @click.prevent="show_adduser"><a href="#" class="waves-effect waves-light" v-tooltip="'Редактор прав'" style="padding: 6px;"><eva-icon name="person-add" animation="pulse" fill="white"></eva-icon></a></li>
          </draggable>
        </ul>
    </h3>
  </div>
  <div class="history-chart" :class="{ hide: !isHide }">
    <canvas ref="canvas"></canvas>
  </div>

  <section>
    <modal  name="add-col" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="20%"
            height="auto">
      <ModalCol :columnDefsChoice="columnDefsChoice" @updated="updateCol"/>
    </modal>
    <modal  name="add-cat" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="20%"
            height="auto">
      <ModalCat @created="addNewCategory" />
    </modal>
    <modal  name="add-user" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="30%"
            height="auto">
      <ModalAddUser :invatedUsers="invatedUsers" :categories="categories" @invated="addInvUser"/>
    </modal>
    <a href="#" @click.prevent="show" class="waves-effect waves-light btn-small" v-tooltip="'Редактировать столбцы'" style="padding: 6px;"><eva-icon name="browser" animation="pulse" fill="white"></eva-icon></a>
    <div style="height: 100%" :key="columnDefs.length + updateCount">
      <ag-grid-vue style="height: 600px;" class="ag-theme-balham" id="myGrid"
                   :gridOptions="gridOptions"
                   :columnDefs="columnDefsChoice"
                   :defaultColDef="defaultColDef"
                   :sideBar="sideBar"
                   :modules="modules"
                   :key="records.length + updateCount"
                   :suppressDragLeaveHidesColumns="true"
                   :stopEditingWhenGridLosesFocus="true"
                   :rowData="records"
                   @grid-ready="onGridReady"
                   @cell-value-changed="numberParser"
                   @columnResized="changeSize"
                   @dragStopped="changeDrag">
      </ag-grid-vue>
    </div>
  </section>
</div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import ModalCat from '../components/ModalCat'
import ModalCol from '../components/ModalCol'
import ModalAddUser from '../components/ModalAddUser'
import draggable from 'vuedraggable'

export default {
  name: 'category',
  metaInfo: {
    title: 'CLEVERME CRM'
  },
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    isHide: false,
    catyg: [],
    gridOptions: null,
    columnDefs: [],
    columnDefsChoice: [],
    invatedUsers: [],
    invatedAllUsers: [],
    defaultColDef: null,
    sideBar: null,
    modules: AllCommunityModules,
    rowData: null,
    updateCount: 0
  }),
  beforeMount () {
    this.gridOptions = {

    }
    this.defaultColDef = {
      editable: true,
      resizable: true,
      sortable: true
    }
    this.sideBar = 'filters'
  },
  async mounted () {
    const id = this.$route.params.catId
    this.columnDefs = await this.$store.dispatch('fetchColumn', id)
    this.records = await this.$store.dispatch('fetchRecords', id)
    this.catyg = await this.$store.dispatch('fetchCategoryById', id)
    this.categories = await this.$store.dispatch('fetchCategories')
    this.invatedUsers = await this.$store.dispatch('fetchInvUser')
    this.loading = false
  },
  methods: {
    async onGridReady (params) {
      const id = this.$route.params.catId
      const catyg = await this.$store.dispatch('fetchCategoryById', id)
      this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', id)
      await params.columnApi.moveColumn('fio', catyg.fio)
      await params.columnApi.moveColumn('phoneNumberC', catyg.phoneNumberC)
      await params.columnApi.moveColumn('addressClient', catyg.addressClient)
      await params.columnApi.moveColumn('someBuy', catyg.someBuy)
      await params.columnApi.moveColumn('summDeal', catyg.summDeal)
      await params.columnApi.moveColumn('tkClient', catyg.tkClient)
      await params.columnApi.moveColumn('commentWrite', catyg.commentWrite)
    },
    onEnd (draggedContext) {
      console.log(draggedContext)
    },
    changeTitle (id) {
      this.$prompt('Введите новое название').then((text) => {
        this.$store.dispatch('updateTitle', { id, title: text })
        const idx = this.categories.findIndex(c => c.id === id)
        this.categories[idx].title = text
        this.updateCount++
        this.$fire({
          title: 'Новое название "' + text + '" - сохранено!',
          type: 'success',
          timer: 3000
        })
      })
    },
    deleteCategory (id, title) {
      this.$confirm('Вы уверены что хотите удалить ' + title + '?').then(() => {
        this.$store.dispatch('deleteCategory', { id })
        this.categories.pop(id)
        this.$fire({
          title: title + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    addNewCategory (category) {
      this.categories.push(category)
      this.$modal.hide('add-cat')
    },
    addInvUser (invuser) {
      this.invatedUsers.push(invuser)
    },
    updateCol (column) {
      const idx = this.columnDefsChoice.findIndex(c => c.id === column.id)
      this.columnDefsChoice[idx].hide = column.hide
      this.updateCount++
    },
    async Changepage (id) {
      // this.columnDefsChoice[1] = await this.$store.dispatch('fetchColumnForChoice', id)
      // this.records[1] = await this.$store.dispatch('fetchRecords', id)
      this.$router.push('/' + id + '/')
      this.records = await this.$store.dispatch('fetchRecords', id)
      this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', id)
      this.catyg = await this.$store.dispatch('fetchCategoryById', id)
      this.categories = await this.$store.dispatch('fetchCategories')
      this.updateCount++
    },
    async show () {
      this.$modal.show('add-col')
    },
    async show_cat () {
      this.$modal.show('add-cat')
    },
    async show_adduser () {
      this.$modal.show('add-user')
    },
    async numberParser (params) {
      const recordData = {
        rowid: params.data.id,
        catid: await this.$route.params.catId,
        fio: params.colDef.field === 'fio' ? params.newValue : params.data.fio,
        phoneNumberC: params.colDef.field === 'phoneNumberC' ? params.newValue : params.data.phoneNumberC,
        addressClient: params.colDef.field === 'addressClient' ? params.newValue : params.data.addressClient,
        someBuy: params.colDef.field === 'someBuy' ? params.newValue : params.data.someBuy,
        summDeal: params.colDef.field === 'summDeal' ? params.newValue : params.data.summDeal,
        tkClient: params.colDef.field === 'tkClient' ? params.newValue : params.data.tkClient,
        commentWrite: params.colDef.field === 'commentWrite' ? params.newValue : params.data.commentWrite
      }
      this.$store.dispatch('updateRecord', recordData)
      this.$message('Сохранено')
      const id = await this.$route.params.catId
      const records = await this.$store.dispatch('fetchRecords', id)
      const lastRecord = records[records.length - 1]
      if (lastRecord.fio !== '' || lastRecord.phoneNumberC !== '' || lastRecord.addressClient !== '' || lastRecord.someBuy !== '' || lastRecord.summDeal !== '' || lastRecord.tkClient !== '' || lastRecord.commentWrite !== '') {
        const emptyRowData = {
          categoryId: id,
          fio: '',
          phoneNumberC: '',
          addressClient: '',
          someBuy: '',
          summDeal: '',
          tkClient: '',
          commentWrite: ''
        }
        await this.$store.dispatch('createEmptyRow', emptyRowData)
        const newrecord = await this.$store.dispatch('fetchRecords', id)
        const emptyValue = newrecord[newrecord.length - 1]
        this.records.push(emptyValue)
      } if (params.data.fio === '' & params.data.phoneNumberC === '' & params.data.addressClient === '' & params.data.someBuy === '' & params.data.summDeal === '' & params.data.tkClient === '' & params.data.commentWrite === '' & lastRecord.id !== params.data.id) {
        const rowid = params.data.id
        this.$store.dispatch('deleteRecord', { id, rowid })
      } else {
        console.log('Ничего не происходит')
      }
    },
    async changeSize (params) {
      if (params.finished === true) {
        const columnData = {
          catid: await this.$route.params.catId,
          colid: params.column.colDef.id,
          width: params.column.actualWidth
        }
        this.$store.dispatch('updateColSize', columnData)
        this.$message('Размер колонок успешно изменен')
      }
    },
    changeDrag (params) {
      const cols = params.columnApi.getAllDisplayedVirtualColumns()
      console.log(cols[0].colDef.field)
      if (cols[0].colDef.field !== '') {
        const field = cols[0].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 0
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[1].colDef.field !== '') {
        const field = cols[1].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 1
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[2].colDef.field !== '') {
        const field = cols[2].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 2
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[3].colDef.field) {
        const field = cols[3].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 3
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[4].colDef.field !== '') {
        const field = cols[4].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 4
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[5].colDef.field !== '') {
        const field = cols[5].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 5
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      if (cols[6].colDef.field !== '') {
        const field = cols[6].colDef.field
        const updateColIdx = {
          catid: this.$route.params.catId,
          field: field,
          colnum: 6
        }
        this.$store.dispatch('updateIdxColumn', updateColIdx)
      }
      this.$message('Сохранено')
    }
  },
  components: {
    ModalCat,
    ModalCol,
    ModalAddUser,
    'ag-grid-vue': AgGridVue,
    draggable
  }
}
</script>
