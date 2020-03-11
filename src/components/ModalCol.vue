<template>
  <form class="add_coloumn">
    <div class="input-field">
      <h6>Выбор столбцов</h6>
      <p v-for="column in columnDefsChoice" :key="column.groupId">
        <label>
          <input type="checkbox" :id="column.field" :value="column.groupId" :checked="!column.hide" @click="check($event)">
          <span>{{column.headerName}}</span>
        </label>
      </p>
      <span class="btn waves-effect waves-light" @click="hide">
        Закрыть
      </span>
    </div>
  </form>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
  props: {
    columnDefsChoice: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null
  }),
  validations: {
    title: { required }
  },
  methods: {
    check: function (e) {
      const idx = this.columnDefsChoice.findIndex(c => c.groupId === e.target.value)
      this.columnDefsChoice[idx].hide = !e.target.checked
      if (e.target.checked) {
        try {
          const categoryData = {
            catid: this.$route.params.catId,
            areaId: this.$route.params.areaId,
            hide: false,
            id: e.target.value,
            catData: e.target.id
          }
          this.$store.dispatch('updateCategory', categoryData)
          if (e.target.id === 'moduleOrder') {
            this.startMass = '0'
            for (let i = 0; i < 3; i++) {
              this.$store.dispatch('updateColForChild', {
                catid: this.$route.params.catId,
                areaId: this.$route.params.areaId,
                hide: false,
                id: e.target.value,
                childId: this.startMass++
              })
            }
          } else {
            this.$store.dispatch('updateColForChild', {
              catid: this.$route.params.catId,
              areaId: this.$route.params.areaId,
              hide: false,
              id: e.target.value,
              childId: '0'
            })
          }
          this.$message('Вы успешно изменили столбцы')
          this.$emit('updated', categoryData)
        } catch (e) {}
      } else {
        try {
          const categoryData = {
            catid: this.$route.params.catId,
            areaId: this.$route.params.areaId,
            hide: true,
            id: e.target.value,
            catData: e.target.id
          }
          this.$store.dispatch('updateCategory', categoryData)
          if (e.target.id === 'moduleOrder') {
            this.startMass = '0'
            for (let i = 0; i < 3; i++) {
              this.$store.dispatch('updateColForChild', {
                catid: this.$route.params.catId,
                areaId: this.$route.params.areaId,
                hide: true,
                id: e.target.value,
                childId: this.startMass++
              })
            }
          } else {
            this.$store.dispatch('updateColForChild', {
              catid: this.$route.params.catId,
              areaId: this.$route.params.areaId,
              hide: true,
              id: e.target.value,
              childId: '0'
            })
          }
          this.$message('Вы успешно изменили столбцы')
          this.$emit('updated', categoryData)
        } catch (e) {}
      }
    },
    async hide () {
      this.$modal.hide('add-col')
    }
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
  }
}
</script>
