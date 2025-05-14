<template>
    <option v-for="item in items" :value="item.id" :key="item.id" :selected="isSelected(item.id)">
      {{ item.name }}
    </option>
  </template>
  
  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      selected:{
          type: Number,
      }
    },
    data() {
      return {
        items: [],
      };
    },
    methods: {
      async getData() {
        try {
          const response = await this.$http.get(this.name + "/", {headers: {authorization: `Bearer ${localStorage.access_token}`}});
          this.items = response.data;
        } catch (error) {
          console.log(error);
        }
      },
      isSelected(id){
          return ""+id==""+this.selected
      }
    },
    created() {
      this.getData();
    },
  };
  </script>