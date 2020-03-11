import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...toUpdate }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async inviteUser ({ commit, dispatch }, { areaId, email, status }) {
      try {
        const uid = await dispatch('getUid')
        const invuser = await firebase.database().ref(`/users/inviters`).push({ areaId, email, status, uid })
        return { areaId, email, status, uid, id: invuser.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addAccept ({ commit, dispatch }, { email, accepterId, areaId, inviteId, createCategor, storageAccept, status }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters`).child(inviteId).update({ email, accepterId, createCategor, storageAccept, status })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addRights ({ commit, dispatch }, { areaId, inviteId, categoryId, categoryTitle, readCaty, writeCaty }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters/${inviteId}/rights`).child(categoryId).update({ readCaty, writeCaty, categoryTitle })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRights ({ dispatch, commit }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const getRights = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/myinviters`).orderByChild('accepterId').equalTo(uid).once('value')).val() || {}
            return Object.keys(getRights).map(key => ({ ...getRights[key], id: key }))
          }
        } else {
          return 'Admin'
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRightsForMe ({ dispatch, commit }, { areaId, id }) {
      try {
        const uid = await dispatch('getUid')
        const getRights = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters/${id}/rights`).once('value')).val() || {}
        return Object.keys(getRights).map(key => ({ ...getRights[key], id: key, homeId: id }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchHighRight ({ dispatch, commit }, { areaId, id }) {
      try {
        const uid = await dispatch('getUid')
        const getRights = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters`).child(id).once('value')).val() || {}
        return { ...getRights, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async acceptInv ({ commit, dispatch }, { inviterId, areaId, status }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareasInv`).push({ areaId, inviterId, status })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRightsForMe ({ commit, dispatch }, { areaId, id, catId, readCaty }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters/${id}/rights`).child(catId).update({ readCaty })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRightsForMeWrite ({ commit, dispatch }, { areaId, id, catId, writeCaty }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters/${id}/rights`).child(catId).update({ writeCaty })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateHighRight ({ commit, dispatch }, { areaId, id, createCategor }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters`).child(id).update({ createCategor })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateHighRightTwo ({ commit, dispatch }, { areaId, id, storageAccept }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/workareas/${areaId}/myinviters`).child(id).update({ storageAccept })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateAccepted ({ commit, dispatch }, { inviterId, areaId, status, invid }) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${inviterId}/workareas/${areaId}/myinviters`).child(invid).update({ accepterId: uid, status })
        const mainInvite = await firebase.database().ref(`/users/inviters/${invid}`)
        mainInvite.remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInvUser ({ commit }, invid) {
      try {
        const invusers = (await firebase.database().ref(`/users/inviters`).child(invid).once('value')).val() || {}
        return { ...invusers, invid }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchMyInviters ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const myInvite = (await firebase.database().ref(`/users/${uid}/myinviters`).once('value')).val() || {}
        return Object.keys(myInvite).map(key => ({ ...myInvite[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
