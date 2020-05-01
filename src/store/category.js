import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }, areaId) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        for (const inviter of takeId) {
          const categories = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories`).once('value')).val() || {}
          return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
        }
        const categories = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInvited ({ commit, dispatch }, areaId) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/invited`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        for (const inviter of takeId) {
          const categories = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories`).child(id).once('value')).val() || {}
          return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
        }
        const category = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateIdxColumn ({ commit, dispatch }, { catid, areaId, field, colnum }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            return await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/`).child(catid).update({ [field]: colnum })
          }
        } else {
          return await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/`).child(catid).update({ [field]: colnum })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCategory ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentRef = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${id}`)
            currentRef.remove()
            const deleteRecord = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${id}`)
            deleteRecord.remove()
          }
        } else {
          const currentRef = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${id}`)
          currentRef.remove()
          const deleteRecord = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${id}`)
          deleteRecord.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTitle ({ commit, dispatch }, { id, areaId, title }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/`).child(id).update({ title })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/`).child(id).update({ title })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { areaId, title }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const category = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories`).push({ title })
            return { title, id: category.key }
          }
        } else {
          const category = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories`).push({ title })
          return { title, id: category.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
