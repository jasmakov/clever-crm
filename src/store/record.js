import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records/${record.categoryId}`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createColoumn ({ commit, dispatch }, { categoryId, headerName, hide, field, width }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records/${categoryId}/columnDefs`).push({ headerName, hide, field, width })
        return { headerName, hide, field, width }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createEmptyRow ({ commit, dispatch }, { categoryId, fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/records/${categoryId}/rowDefs`).push({ fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite })
        return { fio, phoneNumberC, addressClient, someBuy, summDeal, tkClient, commentWrite }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records/${id}/rowDefs`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchColumn ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records/${id}/columnDefs`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key] }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchColumnForChoice ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records/${id}/columnDefs`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
