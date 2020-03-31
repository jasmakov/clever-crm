<template>
  <div style="height: 100%">
    <table>
      <thead>
      <tr>
        <th></th>
        <th>Наименование</th>
        <th>Артикул</th>
        <th>Цена</th>
        <th>Состав</th>
        <th>Действие</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(catysId, idx) of productbyIdTable" :key="catysId.id">
        <td>{{idx + 1}}</td>
        <td>{{catysId.titlepos}}</td>
        <td>{{catysId.articlepos}}</td>
        <td>{{catysId.amount}} руб.</td>
        <td>{{catysId.comLength}} компонент(а)</td>
        <td>
          <a class='dropdown-trigger btn' href='#' :data-target='catysId.id'>Выбрать действие</a>

          <!-- Dropdown Structure -->
          <ul :id='catysId.id' class='dropdown-content'>
            <li><a href="#!" @click.prevent="showeditpos(catysId.id)">Редактировать</a></li>
            <li><a href="#!" @click.prevent="showchangecat(catysId)">Перенести</a></li>
            <li><a href="#!" @click="deletePosition(catysId.id, catysId.titlepos)" >Удалить</a></li>
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
      <ModalEditPro :posbyId="posbyId" @edited="editPosition"/>
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
          <tr v-for="categorys of categoryProduct" :key="categorys.id">
            <td>{{categorys.titlepro}}</td>
            <td>
              <a href="#" class="btn waves-effect waves-light" style="color: #fff;" @click="changeCategory(categorys.id, categorys.titlepro, nextPos)">
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
import ModalEditPro from '../components/ModalEditPro'
export default {
  name: 'productable',
  props: {
    productbyIdTable: {
      required: true,
      type: Array
    },
    categoryProduct: {
      required: true,
      type: Array
    }
  },
  data: () => ({
    dropdown: null,
    posbyId: '',
    nextPos: []
  }),
  mounted () {
    const elems = document.querySelectorAll('.dropdown-trigger')
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(elems, {
      constrainWidth: false
    })
  },
  methods: {
    async deletePosition (id, title) {
      this.$confirm('Вы уверены что хотите удалить ' + title + '?').then(() => {
        const strId = this.$route.params.proId
        this.$store.dispatch('deleteProductPosition', { id, strId, areaId: this.$route.params.areaId })
        this.productbyIdTable.pop(id)
        this.$fire({
          title: title + ' - удален',
          type: 'success',
          timer: 3000
        })
      })
    },
    async changeCategory (catId, title, lastPos) {
      await this.$confirm('Вы уверены что хотите переместить "' + lastPos.titlepos + '" в "' + title + '" ?').then(() => {
        const newCatForPos = {
          comLength: lastPos.comLength,
          components: lastPos.components,
          strid: catId,
          areaId: this.$route.params.areaId,
          titlepos: lastPos.titlepos,
          amount: lastPos.amount,
          articlepos: lastPos.articlepos,
          howhave: lastPos.howhave,
          summPrice: lastPos.amount,
          salePrice: ''
        }
        this.$store.dispatch('changeCatergoryForProduct', newCatForPos)
        const strId = this.$route.params.proId
        const id = lastPos.id
        this.$store.dispatch('deleteProductPosition', { id, strId, areaId: this.$route.params.areaId })
        this.productbyIdTable.pop(lastPos.id)
        this.$fire({
          title: lastPos.titlepos + ' успешно перемещена в ' + title,
          type: 'success',
          timer: 3000
        })
        this.$modal.hide('copy-postor')
      })
    },
    async showeditpos (posid) {
      const id = this.$route.params.proId
      this.posbyId = await this.$store.dispatch('fetchProductPositionById', { id, posid, areaId: this.$route.params.areaId })
      this.$modal.show('edit-postor')
    },
    async showchangecat (posOne) {
      await this.$modal.show('copy-postor')
      this.nextPos = posOne
    },
    editPosition (editposition) {
      const idx = this.productbyIdTable.findIndex(c => c.id === editposition.id)
      this.productbyIdTable[idx].titlepos = editposition.titlepos
      this.productbyIdTable[idx].unitstr = editposition.unitstr
      this.productbyIdTable[idx].amount = editposition.amount
      this.productbyIdTable[idx].articlepos = editposition.articlepos
      this.productbyIdTable[idx].howleft = editposition.howleft
      this.updateCount++
    }
  },
  components: {
    ModalEditPro
  }
}
</script>
