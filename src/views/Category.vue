<template>
<div>
  <div class="page-title">
    <h3 :key="categories.length">
      <a href="#" class="waves-effect waves-light btn-small" v-tooltip="'Добавить категорию'" @click.prevent="show_cat"><i class="material-icons" style="color: #fff;">+</i></a>
      <button
        v-for="minecategor in categories" :key="minecategor.id"
        v-tooltip="minecategor.title"
        class="btn-small btn"
        @click="Changepage(minecategor.id)"
      >
        {{minecategor.title}}
      </button>
    </h3>
  </div>
  <div class="history-chart" :class="{ hide: !isHide }">
    <canvas ref="canvas"></canvas>
  </div>
  <Loader v-if="loading" />

  <section v-else>
    <modal  name="add-col" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="15%"
            height="auto">
      <ModalCol :columnDefsChoice="columnDefsChoice" @updated="updateCol"/>
    </modal>
    <modal  name="add-cat" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="15%"
            height="auto">
      <ModalCat @created="addNewCategory" />
    </modal>
    <a href="#" @click.prevent="show" class="waves-effect waves-light btn-small" v-tooltip="'Редактировать столбцы'">+</a>
    <div style="height: 100%" :key="columnDefs.length + updateCount">
      <ag-grid-vue style="height: 400px;" class="ag-theme-balham" id="myGrid"
                   :gridOptions="gridOptions"
                   :columnDefs="columnDefs"
                   :defaultColDef="defaultColDef"
                   :sideBar="sideBar"
                   :modules="modules"
                   :rowData="records">
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
    const id = await this.$route.params.catId
    this.columnDefs = await this.$store.dispatch('fetchColumn', id)
    this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', id)
    this.records = await this.$store.dispatch('fetchRecords', id)
    this.catyg = await this.$store.dispatch('fetchCategoryById', id)
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
      this.$modal.hide('add-cat')
    },
    updateCol () {
      this.updateCount++
    },
    async Changepage (id) {
      await this.$router.push('/' + id + '/')
      this.records = await this.$store.dispatch('fetchRecords', id)
      this.columnDefsChoice = await this.$store.dispatch('fetchColumnForChoice', id)
      this.catyg = await this.$store.dispatch('fetchCategoryById', id)
      this.categories = await this.$store.dispatch('fetchCategories')
    },
    async show () {
      this.$modal.show('add-col')
    },
    async hide () {
      this.$modal.hide('add-col')
    },
    async show_cat () {
      this.$modal.show('add-cat')
    }
  },
  components: {
    ModalCat,
    ModalCol,
    'ag-grid-vue': AgGridVue
  }
}
</script>
