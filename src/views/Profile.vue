<template>
  <div>
    <div class="page-title">
      <h3><router-link to="/" class="green-text">Главная</router-link> / Профиль</h3>
    </div>

    <form class="form">
      <div class="input-field">
        <input
          id="description"
          type="text"
        >
        <label for="description">Имя</label>
        <span
          class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
      </button>
    </form>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: 'CLEVERME CRM | Профиль'
  }
}
</script>
