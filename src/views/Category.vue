<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'category',
  metaInfo: {
    title: 'CLEVERME CRM '
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    const catall = await this.$store.dispatch('fetchCategories')
    if (!catall.length) {
      this.$router.push('/categories')
    } else {
      this.$router.push('/' + this.categories[0].id)
    }
  }
}
</script>
