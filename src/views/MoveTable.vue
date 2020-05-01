<template>
    <Loader v-if="loading" />
    <div v-else>
        <Catbar :categories="categories" :rights="rights"/>
        <div style="height: 100%">
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Дата/Время</th>
                    <th>Движение</th>
                    <th>Наименование</th>
                    <th>Артикул</th>
                    <th>Кол-во</th>
                    <th>Было</th>
                    <th>Текущий остаток</th>
                    <th>Исполнитель</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(move, idx) of storageMove" :key="move.id">
                    <td>{{idx + 1}}</td>
                    <td>{{move.date}}</td>
                    <td>{{move.moveStatus}}</td>
                    <td>{{move.titlepos}}</td>
                    <td>{{move.articlepos}}</td>
                    <td>{{move.howleft}} {{move.unitstr}}</td>
                    <td>{{move.washave}} {{move.unitstr}}</td>
                    <td>{{move.howleftNow}} {{move.unitstr}}</td>
                    <td>{{move.userMover}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Catbar from '../components/app/Catbar'
export default {
  name: 'move-table',
  metaInfo: {
    title: 'Cклад движение'
  },
  data: () => ({
    loading: true,
    categories: [],
    rights: [],
    storageMove: []
  }),
  async mounted () {
    const areaId = this.$route.params.areaId
    this.categories = await this.$store.dispatch('fetchCategories', areaId)
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    if (this.rights === 'Admin' || this.rights[0].storageAccept === 'mydvg1cool') {
      this.storageMove = await this.$store.dispatch('fetchStorageMove', { areaId })
      this.storageMove.reverse()
      this.loading = false
    } else {
      this.$router.push('/' + areaId)
    }
  },
  components: {
    Catbar
  }
}
</script>
