import { createStore } from "vuex"
import axios from 'axios';

const hostname = 'http://localhost:8000'
const endpoint = hostname + '/api/auth/jwt/create/'


export default createStore({
  state: {
    access_token: localStorage.access_token || '',
    username:  localStorage.username || '',
  },
  getters: {
    isAuthenticated: state => !!state.access_token,    
    userName: state => state.username,    
  },
  mutations: {
    updateToken(state, payload){
      localStorage.setItem('access_token', payload.newToken)
      localStorage.setItem('username', payload.userName)
      state.access_token = payload.newToken
      state.username = payload.userName
    },
    removeToken(state){
      localStorage.removeItem('access_token');
      state.access_token = '';
      state.username = '';
    }
  },
  actions:{
    async obtainToken(_, login){
      axios.post(endpoint, {
        'username': login.username,
        'password': login.password})
        .then(response => {
          this.commit('updateToken', {"newToken": response.data.access, "userName": login.username})
        })
        .catch((error)=>{
            console.log(error);
            throw("Неверное имя пользователя или пароль");
          })
    },
    removeToken() {
      this.commit('removeToken')
    },
  }
})