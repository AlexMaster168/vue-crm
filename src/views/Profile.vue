<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
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
        <img class="drower-image" src="../assets/send.png" alt="send">
      </button>
    </form>
  </div>
</template>
