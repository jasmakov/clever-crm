<template>
  <form class="add_coloumn">
    <div class="input-field">
      <h6>Выбор столбцов</h6>
      <p v-for="column in columnDefsChoice" :key="column.id">
        <label>
          <input type="checkbox" :value="column.id" :checked="!column.hide" @click="check($event)">
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
      if (e.target.checked) {
        try {
          const categoryData = {
            catid: this.$route.params.catId,
            hide: false,
            id: e.target.value
          }
          this.$store.dispatch('updateCategory', categoryData)
          this.$message('Вы успешно изменили столбцы')
          this.$emit('updated', categoryData)
        } catch (e) {}
      } else {
        try {
          const categoryData = {
            catid: this.$route.params.catId,
            hide: true,
            id: e.target.value
          }
          this.$store.dispatch('updateCategory', categoryData)
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
