<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
@import "../node_modules/@ag-grid-community/all-modules/dist/styles/ag-grid.css";
@import "../node_modules/@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
@import '../node_modules/vue-search-select/dist/VueSearchSelect.css';
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/style.css";
</style>
