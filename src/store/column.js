import firebase from 'firebase/app'

export default {
  actions: {
    // Добавление столбцов
    async addColumns ({ commit, dispatch }, { areaId, catId, id, getColbyId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${catId}/columnDefs`).update({ [id]: getColbyId })
            return { getColbyId, groupId: getColbyId.id }
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${catId}/columnDefs`).update({ [id]: getColbyId })
          return { getColbyId, groupId: getColbyId.id }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Добавление нумерации
    async addNum ({ commit, dispatch }, { areaId, catId, getColbyId }) {
      try {
        const uid = await dispatch('getUid')
        const getId = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${catId}/columnDefs`).push({ ...getColbyId })
        return { getColbyId, id: getId.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Получение всех столбцов
    async fetchColumns ({ commit }) {
      try {
        const colCho = (await firebase.database().ref(`/columnDefs`).once('value')).val() || {}
        return Object.keys(colCho).map(key => ({ ...colCho[key], groupId: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Получение категории по ID
    async fetchColumnsById ({ commit }, { id }) {
      try {
        const colCho = (await firebase.database().ref(`/columnDefs`).child(id).once('value')).val() || {}
        return { ...colCho }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Получение столбцов для таблицы
    async fetchColumnForChoice ({ dispatch, commit }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const colCho = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${id}/columnDefs`).once('value')).val() || {}
            return Object.keys(colCho).map(key => ({ ...colCho[key], groupId: key }))
          }
        } else {
          const colCho = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${id}/columnDefs`).once('value')).val() || {}
          return Object.keys(colCho).map(key => ({ ...colCho[key], groupId: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteColumn ({ commit, dispatch }, { areaId, catId, id }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentRef = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${catId}/columnDefs/${id}`)
            currentRef.remove()
          }
        } else {
          const currentRef = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${catId}/columnDefs/${id}`)
          currentRef.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Получение столбцов для отключение столбцов
    async fetchColumnForOff ({ dispatch, commit }, { catId, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const colCho = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${catId}/columnDefs`).once('value')).val() || {}
            return { ...colCho }
          }
        } else {
          const colCho = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${catId}/columnDefs`).once('value')).val() || {}
          return { ...colCho }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // Редактирование размер столбцов
    async updateColSize ({ commit, dispatch }, { catid, areaId, colid, groid, width }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/categories/${catid}/columnDefs/${colid}/children/${groid}`).update({ width })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/categories/${catid}/columnDefs/${colid}/children/${groid}`).update({ width })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
