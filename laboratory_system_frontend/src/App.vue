<template>
    <user-component />
<router-view />
</template>

<script>
import UserComponent from './components/UserComponent.vue';
export default {
components: {
  UserComponent,
}
}
</script>

<style scoped>


</style>