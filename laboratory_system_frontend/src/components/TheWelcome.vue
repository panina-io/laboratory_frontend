<template>


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

p {
  font-size: 36px;
}
</style>