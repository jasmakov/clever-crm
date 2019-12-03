<template>
<div>
  <div class="page-title">
    <h3>Записи
      <a href="#" @click="isHide = !isHide" class="waves-effect waves-light btn-small" v-tooltip="'Аналитика'"><i class="material-icons" style="color: #fff;">insert_chart</i></a>
      <router-link to="/categories" class="waves-effect waves-light btn-small" v-tooltip="'Добавить категорию'"><i class="material-icons" style="color: #fff;">add</i></router-link>
      <button
        v-for="minecategor in categoryMine" :key="minecategor.id"
        v-tooltip="minecategor.title"
        class="btn-small btn"
        @click="submitHandler(minecategor.id)"
      >
        {{minecategor.title}}
      </button>
    </h3>
  </div>

  <div class="history-chart" :class="{ hide: !isHide }">
    <canvas ref="canvas"></canvas>
  </div>

  <Loader v-if="loading" />

  <p class="center" v-else-if="!records.length">
    Записей пока нет.
    <router-link to="/create">Добавьте первую</router-link>
  </p>

  <section v-else>
    <HistoryTable :records="items" :catyg="catyg" />
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
  </section>
</div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'
import { Pie } from 'vue-chartjs'

export default {
  name: 'home',
  metaInfo: {
    title: 'CLEVERME CRM | Записи'
  },
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    isHide: false,
    catyg: []
  }),
  async mounted () {
    const id = await this.$route.params.catId
    this.records = await this.$store.dispatch('fetchRecords', id)
    this.catyg = await this.$store.dispatch('fetchCategoryById', id)
    const categories = await this.$store.dispatch('fetchCategories')
    this.categoryMine = await this.$store.dispatch('fetchCategories')

    this.setup(categories)
    this.loading = false
  },
  methods: {
    async submitHandler (id) {
      await this.$router.push('/' + id + '/')
      this.records = await this.$store.dispatch('fetchRecords', id)
      this.catyg = await this.$store.dispatch('fetchCategoryById', id)
      const categories = await this.$store.dispatch('fetchCategories')
      this.setup(categories)
    },
    setup (categories) {
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход'
        }
      }))

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      })
    }
  },
  components: {
    HistoryTable
  }
}
</script>
