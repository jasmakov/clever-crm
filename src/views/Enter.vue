<template>
  <div>

  </div>
</template>

<script>
export default {
  name: 'enter',
  components: {

  },
  data: function () {
    return {

    }
  },
  async mounted () {
    const invid = await this.$route.params.invId
    const invaters = await this.$store.dispatch('fetchInvUser', invid)
    if (invaters.email === this.$store.getters.info.email) {
      this.$confirm('Вы действительно хотите принять приглашение ?').then(() => {
        this.$store.dispatch('acceptInv', {
          invid: invid,
          inviterId: invaters.uid,
          areaId: this.$route.params.areaId,
          status: '1'
        })
        this.$store.dispatch('updateAccepted', {
          invid: invid,
          inviterId: invaters.uid,
          areaId: this.$route.params.areaId,
          status: '1'
        })
        this.$fire({
          title: 'Успешно',
          type: 'success',
          timer: 3000
        })
        this.$router.push('/')
      })
    }
  },
  methods: {

  }
}
</script>
