<template>
  <div>
    <div class="page-title" style="width: 100%;">
      <h3>
        <ul class="work_switch">
          <router-link tag="li"
                       class="btn-small btn work_menu"
                       active-class="active"
                       :to="'/' + $route.params.areaId + '/move-table'"
          >
            Движение
          </router-link>
          <li class="btn-small btn work_menu" @click.prevent="addExtra">
            Оприходование
          </li>
          <li class="btn-small btn work_menu" @click.prevent="delExtra">
            Списание
          </li>
        </ul>
      </h3>
    </div>
    <modal  name="add-extra" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="80%"
            height="auto">
      <AddModule @phucked="addPositionProduct"/>
    </modal>
    <modal  name="del-extra" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="80%"
            height="auto">
      <DelModule @phucked="addPositionProduct"/>
    </modal>
  </div>
</template>

<script>
import AddModule from '../AddModule'
import DelModule from '../DelModule'
export default {
  data: () => ({
  }),
  methods: {
    async addExtra () {
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin') {
        this.$modal.show('add-extra')
      } else {
        this.$alert('У вас нету доступа к этой функции')
      }
    },
    async delExtra () {
      const areaId = this.$route.params.areaId
      const rights = await this.$store.dispatch('fetchRights', { areaId })
      if (rights === 'Admin') {
        this.$modal.show('del-extra')
      } else {
        this.$alert('У вас нету доступа к этой функции')
      }
    },
    addPositionProduct (module) {
      this.$emit('fickthatshit', module)
    }
  },
  computed: {
  },
  async mounted () {
  },
  components: {
    DelModule,
    AddModule
  }
}
</script>
