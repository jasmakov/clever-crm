<template>
<Loader v-if="loading" />
<div class="row" v-else>
  <div class="col s12">
    <div class="card auth-card">
      <div class="card-content">
        <span class="card-title" style="text-align: center;">Страница пользователя</span>
      </div>
      <div class="card-action">
        <div>
          <a class="waves-effect waves-light btn auth-submit" style="margin-bottom: 20px;" @click.prevent="showaddwork">Создать рабочую область</a>
          <router-link class="waves-effect waves-light btn auth-submit" v-for="workAreaMe of allWorkAreasForme" :key="workAreaMe.id" :to="'/'+ workAreaMe.id">{{ workAreaMe.titleWork }}</router-link>
          <router-link class="waves-effect waves-light btn auth-submit blue" v-for="workArea of allWorkAreas" :key="workArea.id" :to="'/'+ workArea.id">{{ workArea.titleWork }}</router-link>
          <a class="waves-effect waves-light btn auth-submit" style="margin-top: 15px;" @click.prevent="logout">Выход</a>
        </div>
      </div>
    </div>
    <modal  name="add-workarea" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="40%"
            height="auto">
      <form @submit.prevent="submitWorkarea" style="padding: 15px">
        <div class="input-field" >
          <input
            id="name"
            type="text"
            v-model.trim="titleWork"
            :class="{invalid: ($v.titleWork.$dirty && !$v.titleWork.required) || ($v.titleWork.$dirty && !$v.titleWork.minLength)}"
          >
          <label for="name">Введите название категории</label>
          <small
            class="helper-text invalid"
            v-if="$v.titleWork.$dirty && !$v.titleWork.required"
          >Введите название рабочей области</small>
          <small
            class="helper-text invalid"
            v-else-if="$v.titleWork.$dirty && !$v.titleWork.minLength"
          >Введите еще {{$v.titleWork.$params.minLength.min - titleWork.length}} символов</small>
        </div>
        <div class="input-field">
          <button class="btn waves-effect waves-light" type="submit">
            Создать
          </button>
          <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="hide_showaddwork">
            Закрыть
          </div>
        </div>
      </form>
    </modal>
  </div>
</div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'choose',
  metaInfo: {
    title: 'Страница пользователя'
  },
  components: {

  },
  data: function () {
    return {
      loading: true,
      allWorkAreas: [],
      allWorkAreasForme: [],
      titleWork: ''
    }
  },
  validations: {
    titleWork: { required, minLength: minLength(6) }
  },
  async mounted () {
    const allWorkInv = await this.$store.dispatch('fetchWorkarea')
    for (const invIds of allWorkInv) {
      const Ids = {
        areaId: invIds.areaId,
        inviterId: invIds.inviterId
      }
      this.allWorkAreas = await this.$store.dispatch('fetchWorkareaForInv', Ids)
    }
    this.allWorkAreasForme = await this.$store.dispatch('fetAreaForMe')
    this.loading = false
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
    async showaddwork () {
      this.$modal.show('add-workarea')
    },
    async hide_showaddwork () {
      this.$modal.hide('add-workarea')
    },
    async submitWorkarea () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        titleWork: this.titleWork
      }
      try {
        const workArea = await this.$store.dispatch('createWorkarea', formData)
        this.$modal.hide('add-workarea')
        this.allWorkAreasForme.push(workArea)
        this.titleWork = ''
        this.$message('Рабочая область создана')
      } catch (e) {

      }
    }
  }
}
</script>
