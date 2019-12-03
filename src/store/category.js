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
    async updateCategory ({ commit, dispatch }, { title, limit, id, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite })
        return { title, limit, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
