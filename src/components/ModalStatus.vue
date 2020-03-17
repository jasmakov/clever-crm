<template>
  <div class="col s12 m6" style="padding: 15px">
    <div>
      <div class="page-title" style="width: 100%; margin-bottom: 0; padding: 5px;">
        <h3 style="text-align: center; width: 100%;">Выбрать статус</h3>
      </div>
        <div class="input-field">
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #999999;" @click.prevent="submitHandler('1')">В работе</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #85c6de;" @click.prevent="submitHandler('2')">Думают</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #fede22;" @click.prevent="submitHandler('3')">Собран</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #bdae00;" @click.prevent="submitHandler('4')">Выставлен счет</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #a2c617;" @click.prevent="submitHandler('5')">Оплачен</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #008739;" @click.prevent="submitHandler('6')">Отгружен</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #e92919;" @click.prevent="submitHandler('7')">Возврат</a>
          <a href="#" class="waves-effect waves-light btn auth-submit" style="background: #000000;" @click.prevent="submitHandler('8')">Отменен</a>
        </div>
        <div class="btn waves-effect waves-light" style="float: right;" @click="hide_stat">
          Закрыть
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowIdforProd: {
      required: true
    }
  },
  data: () => ({
  }),
  methods: {
    async submitHandler (statusGet) {
      try {
        const moduleData = {
          rowid: this.rowIdforProd,
          catid: await this.$route.params.catId,
          areaId: this.$route.params.areaId,
          status: statusGet
        }
        this.$store.dispatch('updateStatus', moduleData)
        this.$modal.hide('edit-module')
        this.$emit('statused', moduleData)
        this.$modal.hide('edit-status')
      } catch (e) {}
    },
    async hide_stat () {
      this.$modal.hide('edit-status')
    }
  }
}
</script>
