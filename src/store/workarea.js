import firebase from 'firebase/app'

export default {
  actions: {
    async createWorkarea ({ commit, dispatch }, { titleWork }) {
      try {
        const uid = await dispatch('getUid')
        const workarea = await firebase.database().ref(`/users/${uid}/workareas`).push({ titleWork })
        return { titleWork, id: workarea.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchWorkarea ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const workareasInv = (await firebase.database().ref(`/users/${uid}/workareasInv`).once('value')).val() || {}
        return Object.keys(workareasInv).map(key => ({ ...workareasInv[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetAreaForMe ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const workareas = (await firebase.database().ref(`/users/${uid}/workareas`).once('value')).val() || {}
        return Object.keys(workareas).map(key => ({ ...workareas[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchWorkareaForInv ({ commit, dispatch }, { areaId, inviterId }) {
      try {
        const workareasInv = (await firebase.database().ref(`/users/${inviterId}/workareas`).orderByChild(areaId).once('value')).val() || {}
        return Object.keys(workareasInv).map(key => ({ ...workareasInv[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
