<template>
  <div>
    <div class="page-title">
      <h3>
        <!--      <a href="#" @click="isHide = !isHide" class="waves-effect waves-light btn-small" v-tooltip="'Аналитика'"><i class="material-icons" style="color: #fff;">insert_chart</i></a>-->
        <router-link to="/categories" class="waves-effect waves-light btn-small" v-tooltip="'Добавить категорию'"><i class="material-icons" style="color: #fff;">+</i></router-link>
      </h3>
    </div>
    <div style="height: 100%">
      <ag-grid-vue style="height: 400px;" class="ag-theme-balham" id="myGrid"
                   :gridOptions="gridOptions"
                   @grid-ready="onGridReady"
                   :columnDefs="columnDefs"
                   :defaultColDef="defaultColDef"
                   :sideBar="sideBar"
                   :modules="modules"
                   :rowData="rowData"></ag-grid-vue>
    </div>
  </div>
</template>

<script>
import { AgGridVue } from '@ag-grid-community/vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
export default {
  name: 'home',
  components: {
    'ag-grid-vue': AgGridVue
  },
  data: function () {
    return {
      gridOptions: null,
      columnDefs: null,
      defaultColDef: null,
      sideBar: null,
      modules: AllCommunityModules,
      rowData: null
    }
  },
  beforeMount () {
    this.gridOptions = {
    }
    this.columnDefs = [
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' },
      { headerName: 'Make', field: 'make' }
    ]
    this.rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]
    this.defaultColDef = {
      editable: true,
      resizable: true,
      sortable: true
    }
    this.sideBar = 'filters'
  },
  mounted () {
  },
  methods: {
    onGridReady (params) {
      setInterval(fillAllCellsWithWidthMeasurement, 50)
    }
  }
}
function fillAllCellsWithWidthMeasurement () {
  document.querySelectorAll('.ag-cell').forEach(function (cell) {
    // eslint-disable-next-line no-unused-vars
    const width = cell.offsetWidth
  })
}
</script>
