<template>
  <div>
    <div class="one-invuser">
      <h4>Редактирование прав</h4>
      <div class="row" v-for="invited in myinviters" :key="invited.id">
        <div class="col s7"><span>{{invited.email}}</span></div>
        <div class="col s2"><span><a href="#" @click="linkInvite(invited.id)">Ссылка</a></span></div>
        <div class="col s3"><span><a href="#" @click="changeRights(invited.id)">Изменить права</a></span></div>
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
        <div class="row" v-for="category of takeMyInviters" :key="category.id">
          <div class="col s6"><span>{{category.categoryTitle}}</span></div>
          <div class="col s3">
            <div class="switch">
              <label>
                Чтение
                <input type="checkbox" :id="category.homeId" :value="category.id" :checked="category.readCaty === 'mydvg1cool'" @input="readAccept($event)">
                <span class="lever"></span>
              </label>
            </div>
          </div>
          <div class="col s3">
            <div class="switch">
              <label>
                Правки
                <input type="checkbox" :id="category.homeId" :value="category.id" :checked="category.writeCaty === 'mydvg1cool'" @input="writeAccept($event)">
                <span class="lever"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6"><span>Управление категориями</span></div>
          <div class="col s6">
            <div class="switch">
              <label>
                Дать доступ
                <input type="checkbox" :value="highright.id" :checked="highright.createCategor === 'mydvg1cool'" @input="giveAccept($event, 'category')">
                <span class="lever"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6"><span>Склад и готовая продукция</span></div>
          <div class="col s6">
            <div class="switch">
              <label>
                Дать доступ
                <input type="checkbox" :value="highright.id" :checked="highright.storageAccept === 'mydvg1cool'" @input="giveAccept($event, 'storage')">
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
    <modal  name="link-user" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="40%"
            height="auto">
      <div class="change_rights">
        <h4>Ссылка для приглашения</h4>
        <input type="text" v-model="enterLink" readonly>
        <div class="btn waves-effect waves-light" style="float: right; margin: 10px;" @click="hidelinkInvite">
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
    myinviters: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    email: '',
    enterLink: '',
    takeMyInviters: [],
    highright: []
  }),
  validations: {
    email: { email, required }
  },
  methods: {
    async readAccept (e) {
      if (e.target.checked === true) {
        const readCaty = {
          areaId: this.$route.params.areaId,
          id: e.target.id,
          catId: e.target.value,
          readCaty: 'mydvg1cool'
        }
        await this.$store.dispatch('updateRightsForMe', readCaty)
      } else {
        const readCaty = {
          areaId: this.$route.params.areaId,
          id: e.target.id,
          catId: e.target.value,
          readCaty: 'mydvg0'
        }
        await this.$store.dispatch('updateRightsForMe', readCaty)
      }
    },
    async writeAccept (e) {
      if (e.target.checked === true) {
        const writeCaty = {
          areaId: this.$route.params.areaId,
          id: e.target.id,
          catId: e.target.value,
          writeCaty: 'mydvg1cool'
        }
        await this.$store.dispatch('updateRightsForMeWrite', writeCaty)
      } else {
        const writeCaty = {
          areaId: this.$route.params.areaId,
          id: e.target.id,
          catId: e.target.value,
          writeCaty: 'mydvg0'
        }
        await this.$store.dispatch('updateRightsForMeWrite', writeCaty)
      }
    },
    async giveAccept (e, whisthi) {
      if (e.target.checked === true) {
        const areaId = this.$route.params.areaId
        const id = e.target.value
        if (whisthi === 'category') {
          const createCategor = 'mydvg1cool'
          await this.$store.dispatch('updateHighRight', { areaId, id, createCategor })
        }
        if (whisthi === 'storage') {
          const storageAccept = 'mydvg1cool'
          await this.$store.dispatch('updateHighRightTwo', { areaId, id, storageAccept })
        }
      } else {
        const areaId = this.$route.params.areaId
        const id = e.target.value
        if (whisthi === 'category') {
          const createCategor = 'mydvg0'
          await this.$store.dispatch('updateHighRight', { areaId, id, createCategor })
        }
        if (whisthi === 'storage') {
          const storageAccept = 'mydvg0'
          await this.$store.dispatch('updateHighRightTwo', { areaId, id, storageAccept })
        }
      }
    },
    async hideinvuser () {
      this.$modal.hide('add-user')
    },
    async changeRights (id) {
      const areaId = this.$route.params.areaId
      this.takeMyInviters = await this.$store.dispatch('fetchRightsForMe', { areaId, id })
      this.highright = await this.$store.dispatch('fetchHighRight', { areaId, id })
      this.$modal.show('rights-user')
    },
    async hideRights () {
      this.$modal.hide('rights-user')
    },
    async linkInvite (toinvId) {
      this.$modal.show('link-user')
      const areaId = this.$route.params.areaId
      this.enterLink = window.location.origin + '/enter/' + areaId + '/' + toinvId
    },
    async hidelinkInvite () {
      this.$modal.hide('link-user')
    },
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const inviteId = await this.$store.dispatch('inviteUser', {
          areaId: this.$route.params.areaId,
          email: this.email,
          status: '0'
        })
        await this.$store.dispatch('addAccept', {
          inviteId: inviteId.id,
          areaId: this.$route.params.areaId,
          email: this.email,
          accepterId: '',
          status: '0',
          createCategor: 'mydvg0',
          storageAccept: 'mydvg0'
        })
        const areaId = this.$route.params.areaId
        const catyGor = await this.$store.dispatch('fetchCategories', areaId)
        for (const kitty of catyGor) {
          await this.$store.dispatch('addRights', {
            areaId: areaId,
            inviteId: inviteId.id,
            categoryId: kitty.id,
            categoryTitle: kitty.title,
            readCaty: 'mydvg0',
            writeCaty: 'mydvg0'
          })
        }
        this.$v.$reset()
        this.$message('Вы пригласили пользователя')
        this.$emit('invated', inviteId)
      } catch (e) {
      }
    }
  },
  async mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  }
}
</script>
