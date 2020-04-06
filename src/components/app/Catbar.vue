<template>
  <div class="page-title">
    <h3>
      <ul class="work_switch">
        <draggable draggable=".work_menu" @end="onEnd">
          <router-link
            v-for="minecategor in categories"
            :key="minecategor.id" tag="li"
            class="btn-small btn work_menu"
            active-class="active"
            :to="'/' + $route.params.areaId + '/' + minecategor.id"
          >
            <a href="#" class="waves-effect waves-light" style="color: #fff;" @dblclick="changeTitle(minecategor.id)" v-tooltip="'Дважды кликните чтобы изменить название'">{{minecategor.title}}
            </a>
            <span @click="deleteCategory(minecategor.id, minecategor.title)" class="Delete_Category">X</span>
          </router-link>
          <router-link v-if="checkStrSta.status === '1'" tag="li" class="btn-small btn work_menu" active-class="active" :to="'/' + $route.params.areaId + '/storage'">
            <a href="#" class="waves-effect waves-light" style="color: #fff;">Склад</a>
          </router-link>
          <li class="btn-small btn" v-if="rights === 'Admin' || rights[0].createCategor === 'mydvg1cool'" @click.prevent="show_cat"><a href="#" class="waves-effect waves-light" v-tooltip="'Добавить категорию'" style="padding: 6px;"><eva-icon name="plus" animation="pulse" fill="white"></eva-icon></a></li>
        </draggable>
      </ul>
    </h3>
    <modal  name="add-cat" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="20%"
            height="auto">
      <ModalCat :checkStrSta="checkStrSta" @created="addNewCategory" />
    </modal>
  </div>
</template>
<script>
import ModalCat from '../ModalCat'
import draggable from 'vuedraggable'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    rights: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    checkStrSta: ''
  }),
  async mounted () {
    const areaId = this.$route.params.areaId
    this.checkStrSta = await this.$store.dispatch('fetchStorageStatus', { areaId })
  },
  methods: {
    onEnd (draggedContext) {
      console.log(draggedContext)
    },
    addNewCategory (category) {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.categories.push(category)
        const areaId = this.$route.params.areaId
        this.$router.push('/' + areaId + '/' + category.id)
        this.$modal.hide('add-cat')
      } else {
        this.$message('У вас нет прав')
      }
    },
    async show_cat () {
      if (this.rights === 'Admin' || this.rights[0].createCategor === 'mydvg1cool') {
        this.$modal.show('add-cat')
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
    draggable
  }
}
</script>
