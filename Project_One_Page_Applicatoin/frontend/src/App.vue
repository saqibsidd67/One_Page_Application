<script>
import axios from 'axios'
import { useLoggedInUser} from '../store/userLogin.js'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  data() {
    return {
      orgName: ''
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      if (res.data) {
        this.orgName = res.data.name
      } else {
        console.log('No data returned from API')
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  setup() {
    const store = useLoggedInUser();
    return { store }
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if.prevent="!store.isLoggedIn">
              <router-link to="/login">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >Login
              </router-link>
            </li>
            <li v-if="store.role === 'editor'">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="store.role === 'editor'">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="store.isLoggedIn">
              <!-- added a new list item with the search page for services-->
              <router-link to="/services"> 
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >check</span
                >
                Services
              </router-link>
            </li>
            <li v-if="store.isLoggedIn">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="store.isLoggedIn">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
              <li class="nav-item" v-if="store.isLoggedIn">
                <a href="">
                  <span @click.prevent="store.logout()" class="nav-link"><i class="material-icons">logout</i> Logout</span>
                </a>
              </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
