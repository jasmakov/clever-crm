<template>
  <div>
    <div class="one-invuser">
      <h4>Редактирование прав</h4>
      <div class="row" v-for="invited in invatedUsers" :key="invited.id">
        <div class="col s7"><span>{{invited.email}}</span></div>
        <div class="col s5"><span><a href="#" @click="changeRights(invited.id)">Изменить права</a></span></div>
      </div>
    </div>
    <form @submit.prevent="submitHandler" style="padding: 0px 15px 15px 15px">
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Введите email</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите корретный Email</small>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        Добавить
      </button>
      <div class="btn waves-effect waves-light" style="float: right;" @click="hideinvuser">
        Закрыть
      </div>
    </form>
    <modal  name="rights-user" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="40%"
            height="auto">
      <div class="change_rights">
        <h4>Задать права</h4>
        <div class="row" v-for="category in categories" :key="category.id">
          <div class="col s6"><span>{{category.title}}</span></div>
          <div class="col s3">
            <div class="switch">
              <label>
                Чтение
                <input type="checkbox">
                <span class="lever"></span>
              </label>
            </div>
          </div>
          <div class="col s3">
            <div class="switch">
              <label>
                Правки
                <input type="checkbox">
                <span class="lever"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6"><span>Склад</span></div>
          <div class="col s3">
            <div class="switch">
              <label>
                Чтение
                <input type="checkbox">
                <span class="lever"></span>
              </label>
            </div>
          </div>
          <div class="col s3">
            <div class="switch">
              <label>
                Правки
                <input type="checkbox">
                <span class="lever"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="btn waves-effect waves-light" style="float: right; margin: 10px;" @click="hideRights">
          Закрыть
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import { email, required } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
  props: {
    invatedUsers: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    email: ''
  }),
  validations: {
    email: { email, required }
  },
  methods: {
    async hideinvuser () {
      this.$modal.hide('add-user')
    },
    async changeRights () {
      this.$modal.show('rights-user')
    },
    async hideRights () {
      this.$modal.hide('rights-user')
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const invuser = await this.$store.dispatch('inviteUser', {
          email: this.email,
          uaccept: '0',
          uId: ''
        })
        this.$v.$reset()
        this.$message('Вы пригласили пользователя')
        this.$emit('invated', invuser)
      } catch (e) {
      }
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  }
}
</script>
