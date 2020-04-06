<template>
  <div class="col s12 m6">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Новая складская позиция</h3>
        <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="$modal.hide('add-postor')">
          X
        </div>
      </div>
      <ul class="choice_compstatus">
        <li><a href="#" class="btn-small btn work_menu" @click.prevent="position_status('1')">Готовый продукт (товар к реализации)</a></li>
        <li><a href="#" class="btn-small btn work_menu" @click.prevent="position_status('2')">Компонент (деталь)</a></li>
        <li><a href="#" class="btn-small btn work_menu" @click.prevent="position_status('3')">Готовый продукт и компонент</a></li>
        <li><a href="#" class="btn-small btn work_menu" @click.prevent="position_status('4')">Многокомпонентный товар</a></li>
      </ul>
    </div>
    <modal  name="add-position" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <ModalAddPosition :status="status" :catbyIdTable="catbyIdTable" @added="addPosition" />
    </modal>
  </div>
</template>

<script>
import ModalAddPosition from './ModalAddPosition'
export default {
  props: {
    catbyIdTable: {
      required: true,
      type: Array
    }
  },
  components: { ModalAddPosition },
  data: () => ({
    status: ''
  }),
  validations: {
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  methods: {
    addPosition (position) {
      this.$emit('added', position)
    },
    async position_status (status) {
      this.status = status
      this.$modal.show('add-position')
    }
  }
}
</script>
