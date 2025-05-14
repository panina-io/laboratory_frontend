<template>
    <div class="modal-auth" style="text-align: center; font-size: 20px;">
      <form id="login_form">
      <div><img src="@/assets/ssmu.png" height="200" /> </div> 
      <h3 class="auth-text">АВТОРИЗАЦИЯ</h3>
      <div class="text-field">
        <label class="text-field__label" for="login">Логин</label>
        <input
          class="text-field__input"
          type="text"
          size="50"
          form="login_form"
          v-model.lazy.trim="username"
        />
      </div>
      <div class="text-field">
        <label class="text-field__label" for="password">Пароль</label>
        <input
          class="text-field__input"
          type="password"
          size="50"
          form="login_form"
          v-model.lazy.trim="password"
        />
    </div>
    <div>
        <button type="button" class="auth" form="login_form" @click="onLogin">Вход</button>
    </div>
        <button type="button" class="auth" form="login_form" @click="onCancel">Отмена</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: ""
      };
    },
    methods: {
      async onLogin(){
        await this.$store.dispatch('obtainToken', {
          "username": this.username,
          "password": this.password
          })
        this.$router.push("/")
      },
      onCancel (){
        this.$router.push("/")
      }
    }
  }
  </script>
  
<style>
  .auth-text {
    color: #7d1212db;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;  
    font-size: 20px;
  }

  .modal-auth {
    padding: 50px;
    background: #ffffff5f;
    border: 1px solid rgb(51, 51, 51);
    border-radius: 5px;
    position: fixed; top: 40%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .auth {
    position: relative;
    margin-top: 1rem;
    background-color: #7d1212db;
    border-radius: 5px;
    border-color: transparent;
    color: white;
    padding: 10px;
    width: 100%;
    text-decoration: none;
    cursor: pointer;  
    font-size: 14px;  
  }
  .text-field {
  margin-bottom: 1rem;
  }

  .text-field__label {
  display: block;
  margin-bottom: 0.25rem;
  text-align: left;
  font-size: 16px;
  }
  .text-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 16px;
  font-weight: 400;
  color: #212529;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
}
</style>