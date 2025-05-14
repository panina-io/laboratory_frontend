<template>
    <div class="modal-auth" style="text-align: center; font-size: 20px;">
      <h3 class="auth-text">Вы уверены, что хотите выйти?</h3>
      <div>
        <button type="button" class="auth" form="login_form" @click="onLogOut">Подтвердить</button>
    </div>
        <button type="button" class="auth" form="login_form" @click="onCancel" style="background-color: rgba(53, 54, 53, 0.747);">Отмена</button>
    </div>
</template>


<script>
 export default {
   methods: {
     async onLogOut() { 
       await this.$store.dispatch('removeToken')
       this.$router.push("/")
     },
     onCancel (){
        this.$router.push("/")
      }
   }
 }
</script>
