<template>
  <div style="height: 100%">
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Наименование</th>
        <th>Артикул</th>
        <th>Ед.изм.</th>
        <th>Остаток</th>
        <th>Стоимость</th>
        <th>Себестоимость</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(catysId, idx) of catbyIdTable" :key="catysId.id">
        <td>{{ catbyIdTable.length - idx }}</td>
        <td>{{catysId.titlepos}}</td>
        <td>{{catysId.articlepos}}</td>
        <td>{{catysId.unitstr}}</td>
        <td>{{catysId.howleft}}</td>
        <td v-if="catysId.status !== '2'">{{catysId.amount}} руб.</td>
        <td class="dontHave" v-else></td>
        <td>{{catysId.realamount}} руб.</td>
        <td v-if="catysId.status === '1'">Готовый продукт</td>
        <td v-if="catysId.status === '2'">Компонент</td>
        <td v-if="catysId.status === '3'">Готовый продукт и компонент</td>
        <td v-if="catysId.status === '4'">Многокомпонентный товар</td>
        <td>
          <a class='dropdown-trigger btn' href='#' :data-target='catysId.id'>Выбрать действие</a>
          <!-- Dropdown Structure -->
          <ul :id='catysId.id' class='dropdown-content'>
            <li><a href="#!" @click.prevent="showeditpos(catysId.id)">Редактировать</a></li>
            <li><a href="#!" @click.prevent="showchangecat(catysId)">Перенести</a></li>
            <li><a href="#!" @click="deletePosition(catysId)" >Удалить</a></li>
          </ul>
        </td>
      </tr>
      </tbody>
    </table>
    <modal  name="edit-postor" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <ModalEditPos :posbyId="posbyId" :compForMany="compForMany" :catbyIdTable="catbyIdTable" @edited="editPosition"/>
    </modal>
    <modal  name="copy-postor" transition="nice-modal-fade"
            :min-width="200"
            :min-height="200"
            :clickToClose="false"
            width="40%"
            height="auto">
      <div style="padding: 15px;">
        <div class="page-title" style="width: 100%;">
          <h3 style="text-align: center; width: 100%;">Выберите категорию для позиции "{{nextPos.titlepos}}"</h3>
          <div class="btn waves-effect waves-light" style="float: right;" @click.prevent="$modal.hide('copy-postor')">
            X
          </div>
        </div>
        <table>
          <thead>
          <tr>
            <th>Название категории</th>
            <th>Действие</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="categorys of getCatForChange" :key="categorys.id">
            <td>{{categorys.titlestr}}</td>
            <td>
              <a href="#" class="btn waves-effect waves-light" style="color: #fff;" @click="changeCategory(categorys.id, categorys.titlestr, nextPos)">
                Перенести
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </modal>
  </div>
</template>
<script>
import ModalEditPos from '../components/ModalEditPos'
import reject from 'lodash/reject'
export default {
  name: 'storagetable',
  props: {
    catbyIdTable: {
      required: true,
      type: Array
    },
    categoryStorage: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    dropdown: null,
    compForMany: [],
    posbyId: '',
    nextPos: ''
  }),
  mounted () {
    const elems = document.querySelectorAll('.dropdown-trigger')
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(elems, {
      constrainWidth: false
    })
  },
  computed: {
    getCatForChange: function () {
      return this.categoryStorage.filter(i => i.id !== this.$route.params.strId)
    }
  },
  methods: {
    async deletePosition (option) {
      this.$confirm('Вы уверены что хотите удалить ' + option.titlepos + '?').then(() => {
        this.$store.dispatch('deleteStoragePosition', { id: option.id, areaId: this.$route.params.areaId })
        if (option.status === '2') {
          this.$store.dispatch('deletePosFromMany', { id: option.id, areaId: this.$route.params.areaId })
        }
        this.$emit('deleted', option)
        this.$fire({
          title: option.titlepos + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    changeCategory (catId, title, lastPos) {
      this.$confirm('Вы уверены что хотите переместить "' + lastPos.titlepos + '" в "' + title + '" ?').then(() => {
        const id = lastPos.id
        this.$store.dispatch('changePosCategory', { id, areaId: this.$route.params.areaId, strid: catId })
        this.catbyIdTable = reject(this.catbyIdTable, lastPos)
        this.$fire({
          title: lastPos.titlepos + ' успешно перемещена в ' + title,
          type: 'success',
          timer: 3000
        })
        this.$modal.hide('copy-postor')
      })
    },
    async showeditpos (posid) {
      this.posbyId = await this.$store.dispatch('fetchStoragePositionById', { posid, areaId: this.$route.params.areaId })
      this.compForMany = await this.$store.dispatch('fetchComponentsForManyOne', { posid, areaId: this.$route.params.areaId })
      this.$modal.show('edit-postor')
    },
    async showchangecat (posOne) {
      this.$modal.show('copy-postor')
      this.nextPos = posOne
    },
    editPosition (editposition) {
      const idx = this.catbyIdTable.findIndex(c => c.id === editposition.id)
      this.catbyIdTable[idx].titlepos = editposition.titlepos
      this.catbyIdTable[idx].unitstr = editposition.unitstr
      this.catbyIdTable[idx].amount = editposition.amount
      this.catbyIdTable[idx].realamount = editposition.realamount
      this.catbyIdTable[idx].choostatus = editposition.choostatus
      this.catbyIdTable[idx].articlepos = editposition.articlepos
      this.catbyIdTable[idx].howleft = editposition.howleft
      this.updateCount++
    }
  },
  components: {
    ModalEditPos
  }
}
</script>
