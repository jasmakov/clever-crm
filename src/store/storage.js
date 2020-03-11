import firebase from 'firebase/app'

export default {
  actions: {
    async createStorageCategory ({ commit, dispatch }, { areaId, titlestr }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorystr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).push({ titlestr })
            return { titlestr, id: categorystr.key }
          }
        } else {
          const categorystr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).push({ titlestr })
          return { titlestr, id: categorystr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createStoragePosotionCategory ({ commit, dispatch }, { strid, areaId, titlepos, unitstr, choostatus, articlepos, howleft }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${strid}/position`).push({
              titlepos,
              unitstr,
              choostatus,
              articlepos,
              howleft
            })
            return { titlepos, unitstr, choostatus, articlepos, howleft, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${strid}/position`).push({
            titlepos,
            unitstr,
            choostatus,
            articlepos,
            howleft
          })
          return { titlepos, unitstr, choostatus, articlepos, howleft, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateStoragePosotionCategory ({ commit, dispatch }, { id, strid, areaId, titlepos, unitstr, choostatus, articlepos, howleft }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${strid}/position`).child(id).update({
              titlepos,
              unitstr,
              choostatus,
              articlepos,
              howleft
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${strid}/position`).child(id).update({
            titlepos,
            unitstr,
            choostatus,
            articlepos,
            howleft
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStorageCategory ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoriestr = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).once('value')).val() || {}
            return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
          }
        } else {
          const categoriestr = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).once('value')).val() || {}
          return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStorageCategoryById ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorystrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).child(id).once('value')).val() || {}
            return { ...categorystrbyid, id }
          }
        } else {
          const categorystrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).child(id).once('value')).val() || {}
          return { ...categorystrbyid, id }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStorageCategoryTableById ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${id}/position`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${id}/position`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStoragePositionById ({ commit, dispatch }, { id, posid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const posstrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${id}/position`).child(posid).once('value')).val() || {}
            return { ...posstrbyid, posid }
          }
        } else {
          const posstrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${id}/position`).child(posid).once('value')).val() || {}
          return { ...posstrbyid, posid }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTitleStorage ({ commit, dispatch }, { id, areaId, titlestr }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).child(id).update({ titlestr })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).child(id).update({ titlestr })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteStorageCategory ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentStr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${id}`)
            currentStr.remove()
          }
        } else {
          const currentStr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${id}`)
          currentStr.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteStoragePosition ({ commit, dispatch }, { id, strId, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentPos = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/${strId}/position/${id}`)
            currentPos.remove()
          }
        } else {
          const currentPos = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/${strId}/position/${id}`)
          currentPos.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
