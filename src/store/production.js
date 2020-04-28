import firebase from 'firebase/app'

export default {
  actions: {
    async addProductionForProduct ({ commit, dispatch }, { areaId, status }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/production`).update({ status })
            return { status }
          }
        } else {
          await firebase.database().ref(`/users/${uid}/workareas/${areaId}/production`).update({ status })
          return { status }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductsForProduction ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const catbIdtable = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/production/position`).once('value')).val() || {}
            return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
          }
        } else {
          const catbIdtable = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/production/position`).once('value')).val() || {}
          return Object.keys(catbIdtable).map(key => ({ ...catbIdtable[key], id: key }))
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addMultyProduct ({ commit, dispatch }, { areaId, proId, dateNow, titlepos, articlepos, unitstr, howhave, howleft, comment }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const product = await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/production/position`).push({
              proId,
              dateNow,
              titlepos,
              articlepos,
              unitstr,
              howhave,
              howleft,
              comment
            })
            return { proId, dateNow, titlepos, articlepos, unitstr, howhave, howleft, comment, id: product.key }
          }
        } else {
          const product = await firebase.database().ref(`/users/${uid}/workareas/${areaId}/production/position`).push({
            proId,
            dateNow,
            titlepos,
            articlepos,
            unitstr,
            howhave,
            howleft,
            comment
          })
          return { proId, dateNow, titlepos, articlepos, unitstr, howhave, howleft, comment, id: product.key }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchProductionStatus ({ commit, dispatch }, { areaId }) {
      try {
        const uid = await dispatch('getUid')
        const invForMeId = (await firebase.database().ref(`/users/${uid}/workareasInv`).orderByChild('areaId').equalTo(areaId).once('value')).val() || {}
        const takeId = Object.keys(invForMeId).map(key => ({ ...invForMeId[key], id: key }))
        if (takeId.length) {
          for (const inviter of takeId) {
            const categorystrbyid = (await firebase.database().ref(`/users/${inviter.inviterId}/workareas/${inviter.areaId}/production`).once('value')).val() || {}
            return { ...categorystrbyid }
          }
        } else {
          const categorystrbyid = (await firebase.database().ref(`/users/${uid}/workareas/${areaId}/production`).once('value')).val() || {}
          return { ...categorystrbyid }
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
