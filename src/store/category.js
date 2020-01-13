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
    async updateIdxColumn ({ commit, dispatch }, { catid, field, colnum }) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/categories/`).child(catid).update({ [field]: colnum })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCategory ({ commit, dispatch }, { id }) {
      try {
        const uid = await dispatch('getUid')
        const currentRef = await firebase.database().ref(`/users/${uid}/categories/${id}`)
        currentRef.remove()
        const deleteRecord = await firebase.database().ref(`/users/${uid}/records/${id}`)
        deleteRecord.remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTitle ({ commit, dispatch }, { id, title }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories/`).child(id).update({ title })
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
