import firebase from 'firebase/app'

export default {
  actions: {
    async createProductCategory ({ commit, dispatch }, { areaId, titlepro }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorypro = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products`).push({ titlepro })
            return { titlepro, id: categorypro.key }
          }
        } else {
          const categorypro = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products`).push({ titlepro })
          return { titlepro, id: categorypro.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createProductPosotionCategory ({ commit, dispatch }, { strid, areaId, titlepos, amount, articlepos, comLength, howhave, summPrice, salePrice }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${strid}/product`).push({
              titlepos,
              amount,
              articlepos,
              comLength,
              howhave,
              summPrice,
              salePrice
            })
            return { titlepos, amount, articlepos, comLength, howhave, summPrice, salePrice, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${strid}/product`).push({
            titlepos,
            amount,
            articlepos,
            comLength,
            howhave,
            summPrice,
            salePrice
          })
          return { titlepos, amount, articlepos, comLength, howhave, summPrice, salePrice, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async changeCatergoryForProduct ({ commit, dispatch }, { strid, areaId, titlepos, amount, articlepos, comLength, components, howhave, summPrice, salePrice }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoryposstr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${strid}/product`).push({
              titlepos,
              amount,
              articlepos,
              comLength,
              components,
              howhave,
              summPrice,
              salePrice
            })
            return { titlepos, amount, articlepos, comLength, components, howhave, summPrice, salePrice, id: categoryposstr.key }
          }
        } else {
          const categoryposstr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${strid}/product`).push({
            titlepos,
            amount,
            articlepos,
            comLength,
            components,
            howhave,
            summPrice,
            salePrice
          })
          return { titlepos, amount, articlepos, comLength, components, howhave, summPrice, salePrice, id: categoryposstr.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createProductCompCategory ({ commit, dispatch }, { areaId, articlepos, titlepos, howNeed, compId, catStrId, strid, proid }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorycomp = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${strid}/product/${proid}/components`).push({
              articlepos,
              titlepos,
              howNeed,
              compId,
              catStrId
            })
            return { articlepos, titlepos, howNeed, compId, id: categorycomp.key }
          }
        } else {
          const categorycomp = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${strid}/product/${proid}/components`).push({
            articlepos,
            titlepos,
            howNeed,
            compId,
            catStrId
          })
          return { articlepos, titlepos, howNeed, compId, id: categorycomp.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductPositionById ({ commit, dispatch }, { id, posid, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const posstrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${id}/product`).child(posid).once('value')).val() || {}
            return { ...posstrbyid, posid }
          }
        } else {
          const posstrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${id}/product`).child(posid).once('value')).val() || {}
          return { ...posstrbyid, posid }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchComponentsFromProd ({ commit, dispatch }, { proCatId, areaId, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const posstrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${proCatId}/product/${rowId}/components`).once('value')).val() || {}
            return Object.keys(posstrbyid).map(key => ({ ...posstrbyid[key], id: key }))
          }
        } else {
          const posstrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${proCatId}/product/${rowId}/components`).once('value')).val() || {}
          return Object.keys(posstrbyid).map(key => ({ ...posstrbyid[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateProductPosotionCategory ({ commit, dispatch }, { id, strid, areaId, titlepos, amount, articlepos }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${strid}/product`).child(id).update({
              titlepos,
              amount,
              articlepos
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${strid}/product`).child(id).update({
            titlepos,
            amount,
            articlepos
          })
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
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${id}/addProducts/${rowId}/${strid}`).update({
              titlepos,
              howhave,
              amount,
              salePrice,
              summPrice
            })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${id}/addProducts/${rowId}/${strid}`).update({
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
    async fetchProductsForModule ({ commit, dispatch }, { proCatId, areaId, rowId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${proCatId}/addProducts/${rowId}`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${proCatId}/addProducts/${rowId}`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductsCategory ({ commit, dispatch }, areaId) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categoriepro = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products`).once('value')).val() || {}
            return Object.keys(categoriepro).map(key => ({ ...categoriepro[key], id: key }))
          }
        } else {
          const categoriepro = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products`).once('value')).val() || {}
          return Object.keys(categoriepro).map(key => ({ ...categoriepro[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductsCategoryById ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorystrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products`).child(id).once('value')).val() || {}
            return { ...categorystrbyid, id }
          }
        } else {
          const categorystrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products`).child(id).once('value')).val() || {}
          return { ...categorystrbyid, id }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductsCategoryTableById ({ commit, dispatch }, { proCatId, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${proCatId}/product`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${proCatId}/product`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key, proCatId: proCatId }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTitleProducts ({ commit, dispatch }, { id, titlepro, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products`).child(id).update({ titlepro })
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products`).child(id).update({ titlepro })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteProductCategory ({ commit, dispatch }, { id, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentStr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${id}`)
            currentStr.remove()
          }
        } else {
          const currentStr = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${id}`)
          currentStr.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteProductPosition ({ commit, dispatch }, { id, strId, areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const currentStr = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/products/${id}`)
            currentStr.remove()
          }
        } else {
          const currentPos = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/products/${strId}/product/${id}`)
          currentPos.remove()
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
