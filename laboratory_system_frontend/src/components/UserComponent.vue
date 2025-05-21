<template>
    <span>
      <login-form v-if="!isLoggedIn"/>
          <header v-else class="menu-main">
          <div class="menu-container">
          <li class="dropdown"> 
            <a>Реактивы</a>
            <div class="dropdown-content">
              <router-link to="/reagent_lots">Список реактивов</router-link>
              <router-link to="/reagents_journal">История</router-link>
              <a style="cursor: pointer;" @click="downloadReagentsMap">Стеллажная карта</a>
            </div>
          </li>
          <li class="dropdown"> 
            <a>Расходники анализаторов</a>
            <div class="dropdown-content">
              <router-link to="/analyzers_consumables_lots">Список расходников</router-link>
              <router-link to="/analyzers_consumables_journal">История</router-link>
              <a style="cursor: pointer;" @click="downloadConsumablesMap">Стеллажная карта</a>
            </div>
          </li>
          <li class="dropdown"> 
            <a>Администрирование</a>
            <div class="dropdown-content">
              <router-link to="/analyzer_models">Анализаторы</router-link>
              <router-link to="/manufacturers">Производители</router-link>
              <router-link to="/indicators">Показатели</router-link>
              <router-link to="/rooms">Помещения</router-link>
              <router-link to="/refrigerator_models">Модели холодильников</router-link>
              <router-link to="/refrigerators">Холодильники</router-link>
            </div>
          </li>
          <li class="out"><router-link to="/logout">Выйти</router-link></li>
        </div>
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
      },
      methods: {
        async downloadReagentsMap() {
          try {
            const response = await this.$http.get('/export-reagents/', {
            responseType: 'blob',
            headers: {
            Authorization: `Bearer ${localStorage.access_token}`
          }
          });

            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Стеллажная карта реактивов.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error("Ошибка при скачивании Excel:", error);
            alert("Не удалось выгрузить файл.");
          }
        },
        async downloadConsumablesMap() {
          try {
            const response = await this.$http.get('/export_consumables/', {
            responseType: 'blob',
            headers: {
            Authorization: `Bearer ${localStorage.access_token}`
          }
          });

            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Стеллажная карта расходников для анализаторов.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            console.error("Ошибка при скачивании Excel:", error);
            alert("Не удалось выгрузить файл.");
          }
        },
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

.menu-container {
  display: flex;              
  align-items: center;                 
  padding: 0 20px;            
}

.out {
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  color: #ffffff;
  font-size: 16px;
  font-style: bold;
}

.out:hover{
  background-color: rgba(255, 255, 255, 0.1);
}


.dropdown {
  display: inline-block;
  position: relative;
}

.dropdown > a {
  color: white;
  text-align: center;
  padding: 10px 8px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: 0; 
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 2px;
  z-index: 1000;
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


.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover > a {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>