<template>
    <span>
      <login-form v-if="!isLoggedIn"/>
          <header v-else class="menu-main">
          <li class="dropdown"> 
            <a>Реактивы</a>
            <div class="dropdown-content">
              <router-link to="/reagent_lots">Список реактивов</router-link>
              <router-link to="/reagents_journal">История</router-link>
            </div>
          </li>
          <li class="dropdown"> 
            <a>Расходники анализаторов</a>
            <div class="dropdown-content">
              <router-link to="/analyzers_consumables_lots">Список расходников</router-link>
              <router-link to="/analyzers_consumables_journal">История</router-link>
            </div>
          </li>
          <li class="dropdown"> 
            <a>Параметры</a>
            <div class="dropdown-content">
              <router-link to="/analyzer_models">Анализаторы</router-link>
              <router-link to="/manufacturers">Производители</router-link>
              <router-link to="/indicators">Показатели</router-link>
              <router-link to="/rooms">Помещения</router-link>
              <router-link to="/refrigerators">Холодильники</router-link>
            </div>
          </li>
          <li class="out"><router-link to="/logout">Выйти</router-link></li>
        </header>
    </span>
  </template>
  
  
  <script>
  import LoginForm from './LoginForm.vue'
    export default {
      components:{LoginForm},
      computed : {
        isLoggedIn: function(){
          return this.$store.getters.isAuthenticated
        },
        userName: function(){
          return this.$store.getters.userName
        },
        showLink: function() {
          return !(this.$route.name == 'login' || this.$route.name == 'logout') 
        }
      }
    }
  </script>
  
  <style scoped>
  .username {
  color: #ffffff;
  font-weight: bolder;
  letter-spacing: 2px;
  font-size: 9px;
  text-transform: uppercase;
  transition: color .2s;
  display: inline-block;
  vertical-align: middle;
}

.out {
  position: relative;
  display: inline-block;
  padding-left: 15px;
  margin-left: 15px;
}

.out::before {
  content: "|";
  position: absolute;
  left: 0;
  color: rgba(255, 255, 255, 0.3);
}

/* Исправленные стили для выпадающего меню */
.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown > a {
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: 0; /* Изменил с right на left для правильного выравнивания */
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 2px;
  z-index: 1000; /* Увеличил для надежности */
}

.dropdown-content a {
  color: black;
  padding: 10px;
  text-decoration: none;
  display: block;
  text-align: left;
  font-size: 12px;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Главное исправление - правильные селекторы для hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover > a {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>