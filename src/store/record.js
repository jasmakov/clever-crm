import firebase from 'firebase/app'

export default {
  actions: {
    async createColoumn ({ commit, dispatch }, { categoryId, areaId, headerName, field, marryChildren, children, hide }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const newCol = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${categoryId}/columnDefs`).push({
              headerName,
              field,
              marryChildren,
              children,
              hide
            })
            return { headerName, field, marryChildren, children, hide, groupId: newCol.key }
          }
        } else {
          const newCol = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${categoryId}/columnDefs`).push({
            headerName,
            field,
            marryChildren,
            children,
            hide
          })
          return { headerName, field, marryChildren, children, hide, groupId: newCol.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateColSize ({ commit, dispatch }, { catid, areaId, colid, groid, width }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${catid}/columnDefs/${colid}/children/${groid}`).update({ width })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${catid}/columnDefs/${colid}/children/${groid}`).update({ width })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createEmptyRow ({ commit, dispatch }, { categoryId, areaId, fio, phoneNumberC, addressClient, tkClient, commentWrite, nameMod, muchMod, priceMod, status }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const empty = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${categoryId}/rowDefs`).push({
              fio,
              phoneNumberC,
              addressClient,
              tkClient,
              commentWrite,
              nameMod,
              muchMod,
              priceMod,
              status
            })
            return { fio, phoneNumberC, addressClient, tkClient, commentWrite, nameMod, muchMod, priceMod, status, id: empty.key }
          }
        } else {
          const empty = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${categoryId}/rowDefs`).push({
            fio,
            phoneNumberC,
            addressClient,
            tkClient,
            commentWrite,
            nameMod,
            muchMod,
            priceMod,
            status
          })
          return { fio, phoneNumberC, addressClient, tkClient, commentWrite, nameMod, muchMod, priceMod, status, id: empty.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateRecord ({ commit, dispatch }, { rowid, catid, areaId, fio, phoneNumberC, addressClient, tkClient, commentWrite }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${catid}/rowDefs/`).child(rowid).update({
              fio,
              phoneNumberC,
              addressClient,
              tkClient,
              commentWrite
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${catid}/rowDefs/`).child(rowid).update({
            fio,
            phoneNumberC,
            addressClient,
            tkClient,
            commentWrite
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateStatus ({ commit, dispatch }, { areaId, catid, rowid, status }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${catid}/rowDefs/`).child(rowid).update({
              status
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${catid}/rowDefs/`).child(rowid).update({
            status
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateModule ({ commit, dispatch }, { rowid, catid, areaId, nameMod, muchMod, priceMod }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${uid}/workareas/${inviter.inviterId}/records/${inviter.areaId}/rowDefs/`).child(rowid).update({
              nameMod,
              muchMod,
              priceMod
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${catid}/rowDefs/`).child(rowid).update({
            nameMod,
            muchMod,
            priceMod
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteRecord ({ commit, dispatch }, { id, rowid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentRef = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${id}/rowDefs/${rowid}`)
            currentRef.remove()
          }
        } else {
          const currentRef = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${id}/rowDefs/${rowid}`)
          currentRef.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const colCho = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${id}/rowDefs`).once('value')).val() || {}
            return Object.keys(colCho).map(key => ({ ...colCho[key], id: key }))
          }
        } else {
          const colCho = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${id}/rowDefs`).once('value')).val() || {}
          return Object.keys(colCho).map(key => ({ ...colCho[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchColumnForChoice ({ dispatch, commit }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const colCho = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/records/${id}/columnDefs`).once('value')).val() || {}
            return Object.keys(colCho).map(key => ({ ...colCho[key], groupId: key }))
          }
        } else {
          const colCho = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/records/${id}/columnDefs`).once('value')).val() || {}
          return Object.keys(colCho).map(key => ({ ...colCho[key], groupId: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
