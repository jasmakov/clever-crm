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
    async createPosotionStorage ({ commit, dispatch }, { strid, areaId, titlepos, amount, articlepos, realamount, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).push({
              titlepos,
              amount,
              realamount,
              articlepos,
              zeroNeed,
              comLength,
              howleft,
              unitstr,
              status,
              summPrice,
              salePrice,
              strid
            })
            return { titlepos, amount, realamount, articlepos, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice, strid, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).push({
            titlepos,
            amount,
            realamount,
            articlepos,
            comLength,
            zeroNeed,
            howleft,
            unitstr,
            status,
            summPrice,
            salePrice,
            strid
          })
          return { titlepos, amount, realamount, articlepos, comLength, zeroNeed, howleft, unitstr, status, summPrice, salePrice, strid, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addComponentsForMany ({ commit, dispatch }, { areaId, howleft, idpos, realamount, titlepos, zeroNeed, idmany }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components`).push({ howleft, idpos, realamount, titlepos, zeroNeed, idmany })
            return { howleft, idpos, realamount, titlepos, zeroNeed, idmany, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components`).push({ howleft, idpos, realamount, titlepos, zeroNeed, idmany })
          return { howleft, idpos, realamount, titlepos, zeroNeed, idmany, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createMoveTable ({ commit, dispatch }, { areaId, date, moveStatus, titlepos, articlepos, unitstr, howleft, howleftNow, washave, userMover }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/moveTable`).push({
              date,
              moveStatus,
              titlepos,
              articlepos,
              unitstr,
              howleft,
              washave,
              howleftNow,
              userMover
            })
            return { date, moveStatus, titlepos, articlepos, unitstr, howleft, washave, howleftNow, userMover, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/moveTable`).push({
            date,
            moveStatus,
            titlepos,
            articlepos,
            unitstr,
            howleft,
            washave,
            howleftNow,
            userMover
          })
          return { date, moveStatus, titlepos, articlepos, unitstr, howleft, washave, howleftNow, userMover, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStorageMove ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoriestr = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/moveTable`).once('value')).val() || {}
            return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
          }
        } else {
          const categoriestr = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/moveTable`).once('value')).val() || {}
          return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchComponentsForMany ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoriestr = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components`).once('value')).val() || {}
            return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
          }
        } else {
          const categoriestr = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components`).once('value')).val() || {}
          return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCompFromManyEdit ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentRef = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components/${id}`)
            currentRef.remove()
          }
        } else {
          const currentRef = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components/${id}`)
          currentRef.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCompForMany ({ commit, dispatch }, { id, areaId, zeroNeed }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components`).child(id).update({
              zeroNeed
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components`).child(id).update({
            zeroNeed
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchComponentsForManyOne ({ commit, dispatch }, { posid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoriestr = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components`).orderByChild('idmany').equalTo(posid).once('value')).val() || {}
            return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
          }
        } else {
          const categoriestr = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components`).orderByChild('idmany').equalTo(posid).once('value')).val() || {}
          return Object.keys(categoriestr).map(key => ({ ...categoriestr[key], id: key }))
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
    async updateStoragePosotionCategory ({ commit, dispatch }, { id, areaId, titlepos, unitstr, amount, realamount, articlepos, howleft }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).child(id).update({
              titlepos,
              unitstr,
              amount,
              realamount,
              articlepos,
              howleft
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).child(id).update({
            titlepos,
            unitstr,
            amount,
            realamount,
            articlepos,
            howleft
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changePosCategory ({ commit, dispatch }, { id, areaId, strid }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).child(id).update({
              strid
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).child(id).update({
            strid
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async insertCompInProduct ({ commit, dispatch }, { areaId, id, howleft }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).child(id).update({ howleft })
            return { id, howleft }
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).child(id).update({ howleft })
          return { id, howleft }
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
    async fetchProductsForModule ({ commit, dispatch }, { areaId, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/addProducts`).orderByChild('rowId').equalTo(rowId).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/addProducts`).orderByChild('rowId').equalTo(rowId).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addProduciton ({ commit, dispatch }, { areaId, titlepos, howhave, amount, salePrice, summPrice, status, editId, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const product = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/addProducts`).push({
              titlepos,
              howhave,
              amount,
              salePrice,
              summPrice,
              status,
              rowId,
              editId
            })
            return { titlepos, howhave, amount, salePrice, summPrice, rowId, status, editId, id: product.key }
          }
        } else {
          const product = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/addProducts`).push({
            titlepos,
            howhave,
            amount,
            salePrice,
            summPrice,
            status,
            rowId,
            editId
          })
          return { titlepos, howhave, amount, salePrice, summPrice, status, rowId, editId, id: product.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateProduciton ({ commit, dispatch }, { id, areaId, titlepos, howhave, amount, salePrice, summPrice, status, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/addProducts`).child(id).update({ titlepos, howhave, amount, salePrice, summPrice, status, rowId })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/addProducts`).child(id).update({ titlepos, howhave, amount, salePrice, summPrice, status, rowId })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteProduction ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentRef = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/addProducts/${id}`)
            currentRef.remove()
          }
        } else {
          const currentRef = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/addProducts/${id}`)
          currentRef.remove()
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
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).orderByChild('strid').equalTo(id).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], strId: id, id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).orderByChild('strid').equalTo(id).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], strId: id, id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchAllPosition ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchStoragePositionById ({ commit, dispatch }, { posid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const posstrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position`).child(posid).once('value')).val() || {}
            return { ...posstrbyid, posid }
          }
        } else {
          const posstrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position`).child(posid).once('value')).val() || {}
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
    async deleteStoragePosition ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentPos = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/position/${id}`)
            currentPos.remove()
          }
        } else {
          const currentPos = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/position/${id}`)
          currentPos.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deletePosFromMany ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentPos = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/storage/components`)
            currentPos.orderByChild('idpos').equalTo(id).on('child_added', (snapshot) => {
              snapshot.ref.remove()
            })
          }
        } else {
          const currentPos = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/storage/components`)
          currentPos.orderByChild('idpos').equalTo(id).on('child_added', (snapshot) => {
            snapshot.ref.remove()
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
