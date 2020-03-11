<template>
  <div class="page-title">
    <h3>
      <ul>
        <draggable draggable=".work_menu" @end="onEnd">
          <router-link
            v-for="minecategor in categories"
            :key="minecategor.id" tag="li"
            class="btn-small btn work_menu"
            active-class="active"
            :to="minecategor.id"
          >
            <a href="#" class="waves-effect waves-light" style="color: #fff;" @dblclick="changeTitle(minecategor.id)" v-tooltip="'Дважды кликните чтобы изменить название'">{{minecategor.title}}
            </a>
            <span @click="deleteCategory(minecategor.id, minecategor.title)" class="Delete_Category">X</span>
          </router-link>
          <li class="btn-small btn" v-if="rights === 'Admin' || rights[0].createCategor === 'mydvg1cool'" @click.prevent="show_cat"><a href="#" class="waves-effect waves-light" v-tooltip="'Добавить категорию'" style="padding: 6px;"><eva-icon name="plus" animation="pulse" fill="white"></eva-icon></a></li>
          <li class="btn-small btn" v-if="rights === 'Admin'" @click.prevent="show_adduser"><a href="#" class="waves-effect waves-light" v-tooltip="'Редактор прав'" style="padding: 6px;"><eva-icon name="person-add" animation="pulse" fill="white"></eva-icon></a></li>
        </draggable>
      </ul>
    </h3>
    <modal  name="add-cat" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="20%"
            height="auto">
      <ModalCat @created="addNewCategory" />
    </modal>
    <modal  name="add-user" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            width="40%"
            height="auto">
      <ModalAddUser :myinviters="myinviters" @invated="addInvUser"/>
    </modal>
  </div>
</template>
<script>
import ModalCat from '../ModalCat'
import ModalAddUser from '../ModalAddUser'
import draggable from 'vuedraggable'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    invited: {
      type: Array,
      required: true
    },
    myinviters: {
      type: Array,
      required: true
    },
    rights: {
      type: Array,
      required: true
    }
  },
  data: () => ({

  }),
  async mounted () {
  },
  methods: {
    onEnd (draggedContext) {
      console.log(draggedContext)
    },
    addNewCategory (category) {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.categories.push(category)
        this.$modal.hide('add-cat')
      } else {
        this.$message('У вас нет прав')
      }
    },
    addInvUser (inviter) {
      this.myinviters.push(inviter)
    },
    async show_cat () {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$modal.show('add-cat')
      } else {
        this.$message('У вас нет прав')
      }
    },
    async show_adduser () {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$modal.show('add-user')
      } else {
        this.$message('У вас нет прав')
      }
    },
    changeTitle (id) {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$prompt('Введите новое название').then((text) => {
          this.$store.dispatch('updateTitle', { id, areaId: this.$route.params.areaId, title: text })
          const idx = this.categories.findIndex(c => c.id === id)
          this.categories[idx].title = text
          this.updateCount++
          this.$fire({
            title: 'Новое название "' + text + '" - сохранено!',
            type: 'success',
            timer: 3000
          })
        })
      } else {
        this.$message('У вас нет прав')
      }
    },
    deleteCategory (id, title) {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$confirm('Вы уверены что хотите удалить ' + title + '?').then(() => {
          this.$store.dispatch('deleteCategory', { id, areaId: this.$route.params.areaId })
          this.categories.pop(id)
          this.$fire({
            title: title + ' - удален',
            type: 'success',
            timer: 3000
          })
        })
      } else {
        this.$message('У вас нет прав')
      }
    }
  },
  components: {
    ModalCat,
    ModalAddUser,
    draggable
  }
}
</script>
