<template>
  <nav class="navbar green lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <div class="logo">Учетка</div>
        <div class="search_row"><input type="search" placeholder="Поиск"></div>
        <span class="">{{date | date('datetime')}}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li v-if="rights === 'Admin'" @click.prevent="show_adduser"><a href="#" class="btn-small btn waves-effect waves-light" v-tooltip="'Настройка доступа к вашей рабочей области'">Настройка доступа</a></li>
        <li>
          Ваш статус: Админ
        </li>
        <li>
          <a
            class="dropdown-trigger"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{email}}
            <i class="material-icons right" style="font-size: 9pt;">&#9660;</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link to="/" class="black-text">
                Сменить рабочую область
              </router-link>
            </li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <modal  name="add-user" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <ModalAddUser :myinviters="myinviters" @invated="addInvUser"/>
    </modal>
  </nav>
</template>

<script>
import ModalAddUser from '../ModalAddUser'
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null,
    myinviters: [],
    invited: []
  }),
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
    addInvUser (inviter) {
      this.myinviters.push(inviter)
    },
    async show_adduser () {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$modal.show('add-user')
      } else {
        this.$message('У вас нет прав')
      }
    }
  },
  computed: {
    email () {
      return this.$store.getters.info.email
    }
  },
  async mounted () {
    const areaId = this.$route.params.areaId
    this.rights = await this.$store.dispatch('fetchRights', { areaId })
    this.invited = await this.$store.dispatch('fetchInvited', areaId)
    this.myinviters = await this.$store.dispatch('fetchInviterforInvite', areaId)
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  components: {
    ModalAddUser
  }
}
</script>
