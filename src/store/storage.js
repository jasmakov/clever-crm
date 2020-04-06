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
            const categorystr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records`).push({ titlestr })
            return { titlestr, id: categorystr.key }
          }
        } else {
          const categorystr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records`).push({ titlestr })
          return { titlestr, id: categorystr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createPosotionStorage ({ commit, dispatch }, { strid, areaId, titlepos, amount, articlepos, components, realamount, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${strid}/position`).push({
              titlepos,
              amount,
              realamount,
              articlepos,
              components,
              zeroNeed,
              comLength,
              howleft,
              unitstr,
              status,
              summPrice,
              salePrice
            })
            return { titlepos, amount, realamount, articlepos, components, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${strid}/position`).push({
            titlepos,
            amount,
            realamount,
            articlepos,
            components,
            comLength,
            zeroNeed,
            howleft,
            unitstr,
            status,
            summPrice,
            salePrice
          })
          return { titlepos, amount, realamount, articlepos, components, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addStorage ({ commit, dispatch }, { areaId, status }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).update({ status })
            return { status }
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).update({ status })
          return { status }
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
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${strid}/position`).push({
              titlepos,
              unitstr,
              choostatus,
              articlepos,
              zeroNeed: 0,
              howleft
            })
            return { titlepos, unitstr, choostatus, articlepos, zeroNeed: 0, howleft, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${strid}/position`).push({
            titlepos,
            unitstr,
            choostatus,
            articlepos,
            zeroNeed: 0,
            howleft
          })
          return { titlepos, unitstr, choostatus, articlepos, zeroNeed: 0, howleft, id: categoryposstr.key }
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
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${strid}/position`).child(id).update({
              titlepos,
              unitstr,
              choostatus,
              articlepos,
              howleft
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${strid}/position`).child(id).update({
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
            const categoriestr = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records`).once('value')).val() || {}
            return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
          }
        } else {
          const categoriestr = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records`).once('value')).val() || {}
          return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductsForModule ({ commit, dispatch }, { proCatId, areaId, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${proCatId}/addProducts/${rowId}`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${proCatId}/addProducts/${rowId}`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateProduciton ({ commit, dispatch }, { id, strid, areaId, titlepos, howhave, amount, salePrice, summPrice, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${id}/addProducts/${rowId}/${strid}`).update({
              titlepos,
              howhave,
              amount,
              salePrice,
              summPrice
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${id}/addProducts/${rowId}/${strid}`).update({
            titlepos,
            howhave,
            amount,
            salePrice,
            summPrice
          })
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
            const categorystrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records`).child(id).once('value')).val() || {}
            return { ...categorystrbyid, id }
          }
        } else {
          const categorystrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records`).child(id).once('value')).val() || {}
          return { ...categorystrbyid, id }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStorageStatus ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorystrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage`).once('value')).val() || {}
            return { ...categorystrbyid }
          }
        } else {
          const categorystrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage`).once('value')).val() || {}
          return { ...categorystrbyid }
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
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${id}/position`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], strId: id, id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${id}/position`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], strId: id, id: key }))
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
            const posstrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${id}/position`).child(posid).once('value')).val() || {}
            return { ...posstrbyid, posid }
          }
        } else {
          const posstrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${id}/position`).child(posid).once('value')).val() || {}
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
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records`).child(id).update({ titlestr })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records`).child(id).update({ titlestr })
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
            const currentStr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${id}`)
            currentStr.remove()
          }
        } else {
          const currentStr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${id}`)
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
            const currentPos = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/records/${strId}/position/${id}`)
            currentPos.remove()
          }
        } else {
          const currentPos = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/records/${strId}/position/${id}`)
          currentPos.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
