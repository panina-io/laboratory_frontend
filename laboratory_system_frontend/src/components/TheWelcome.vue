<template>
  <div>
    <div>
      <div v-if="!isLoggedIn"> 
        <router-link v-if="!isLoggedIn" :to="{name: 'login'}">Пожалуйста, авторизуйтесь</router-link>
      </div>
      <span v-else>Добро пожаловать, {{ userName }}</span>
    </div>
  </div>

</template>

<script>

export default {
  computed: {
    isLoggedIn: function(){
        return this.$store.getters.isAuthenticated
    },  
    userName: function(){
        return this.$store.getters.userName
    },
  },
    methods: {
     async onLogIn() { 
       this.$router.push("/login")
     },
  },
}
</script>

<style scoped>
div {
    text-align: center;
    text-decoration: none;
    letter-spacing: 2px;
    font-size: 17px;
    text-transform: uppercase;
    transition: color .2s;
}

p {
  font-size: 36px;
}
</style>