import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { catid, hide, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records/${catid}/columnDefs/`).child(id).update({ hide })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite })
        return { title, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
