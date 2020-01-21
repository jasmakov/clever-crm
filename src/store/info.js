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
    async inviteUser ({ commit, dispatch }, { email, uaccept, uId }) {
      try {
        const uid = await dispatch('getUid')
        const invuser = await firebase.database().ref(`/users/${uid}/invited`).push({ email, uaccept, uId })
        return { email, uaccept, uId, id: invuser.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchInvUser ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const invusers = (await firebase.database().ref(`/users/${uid}/invited`).once('value')).val() || {}
        return Object.keys(invusers).map(key => ({ ...invusers[key], id: key }))
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
    }
  },
  getters: {
    info: s => s.info
  }
}
