import firebase from 'firebase/app'

export default {
  actions: {
    async inviteNewUser ({ commit, dispatch }, { areaId, acceptKey, email, accepterId, status }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/invites`).push({ acceptKey, email, accepterId, status })
        return { acceptKey, email, accepterId, status, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInviterforInvite ({ commit, dispatch }, areaId) {
      try {
        const uid = await dispatch('getUid')
        const invited = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters`).once('value')).val() || {}
        return Object.keys(invited).map(key => ({ ...invited[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInviter ({ commit, dispatch }, { invid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invited = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/invites`).orderByChild('acceptKey').equalTo(invid).once('value')).val() || {}
        return Object.keys(invited).map(key => ({ ...invited[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInviter ({ commit, dispatch }, { acceptKey, email, areaId, jutId, status }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/invites`).child(jutId).update({ accepterId: uid, status })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
