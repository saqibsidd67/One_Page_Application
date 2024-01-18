import { defineStore } from 'pinia'
import axios from 'axios'

const apiURL = import.meta.env.VITE_ROOT_API

export const useLoggedInUser = defineStore({
  id: 'loggedInUser',
  state: () => ({ //DH: default state for user login
    name: '',
    role: 0,
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {  //ML: login function
      try {
        console.log(username, password);
        const response = await axios.post(`${apiURL}/users/login`, {
          username: username,
          password: password,
        });
        console.log(response); //DH: setting user login state
        if (response && response.data) {
          this.name = response.data.username;
          this.role = response.data.role;
          this.isLoggedIn = true;
          console.log(response);
          this.$router.push('/');
        }
      } catch (error) { //DH: error handling
        console.log(error);
        if (error.response && error.response.status === 500) {
          alert('Internal server error. Please try again later.');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      }
    },
    logout() { //DH: logout function
      this.name = '';
      this.role = 0;
      this.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
});



