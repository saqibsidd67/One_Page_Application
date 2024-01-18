<script>
import { useLoggedInUser } from '/store/userLogin.js' //DH: Import userLoggedIn function from store.js
import axios from 'axios' //DH: Import axios
const apiURL = import.meta.env.VITE_ROOT_API //DH: Set apiURL to root api

export default { //DH: Export default to allow other pages to import this page
  data() { 
    return {
      services: [], //DH: Create services array for all services
      filteredServices: [], //DH: Create filteredServices array for filtered services
      searchBy: '',
      serviceName: '',
      serviceStatus: '',
      serviceDescription: '',
    }
  },
  mounted() {
    this.getServices() //DH: Get all services on page load
  },
  setup() {
    const store = useLoggedInUser();
    return { store }
  },
  methods: {
    handleSubmitForm() { //DH: Search services by name or description
      let endpoint = ''
      if (this.searchBy === 'Service Name') { // if search by service name
        endpoint = `services/search/?name=${this.serviceName}&searchBy=name` // searching by service name
      }
      else if (this.searchBy === 'Service Description') { // if searching by service description
        endpoint=`services/search/?description=${this.serviceDescription}&searchBy=description` // search by service status
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => { //DH: GET request sent to API
        this.services = res.data //DH: Set services to response data
      })
    },
    //DH: GET all services from API
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
      this.services = res.data
      })
      window.scrollTo(0,0)
    },
    clearSearch() {
      // Resets all variables and gets all services
      this.searchBy = ''
      this.serviceName = ''
      this.getServices()
    },
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } }) // route to update service page
    },
    addService() {
      this.$router.push({ name: 'serviceform' }) //DH: Route to create service page
    },
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Services
      </h1>
      <div v-if="store.role === 'editor'"> <!--DH: If user is editor, display add service button -->
      <div class="px-10 pt-20">
      <h2 class="text-2xl font-bold">Add a New Service</h2>
      <div class="text-center">
      <!--DH: Add service button to route to add services form -->
      <button class="bg-red-700 text-white rounded"
            @click="addService"
            type="submit"> 
            Add New Service 
      </button>
      </div>
      </div>
      </div>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <!-- Displays Service Name search field -->
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <!--DH: Determine parameter to search by-->
            <option value="Service Name">Service Name</option>
            <option value="Service Description">Service Description</option>
          </select>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <!--DH: Search by service name-->
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="serviceName"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />
            </label>
        </div>
        <div class="flex flex-col" v-if="searchBy === 'Service Description'">
          <!--DH: Search by service description-->
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="serviceDescription"
            v-on:keyup.enter="handleSubmitForm"
            placeholder="Enter Service Descrpition"
          />
        </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!--DH: Display Found Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Description</th>
            </tr>
          </thead>
            <tbody class="divide-y divide-gray-300">
            <!--DH: If service is clicked, call editServices function with selected Object ID as param -->
            <tr
              @click="editService(service._id)"
              v-for="service in services"
              :key="service._id"
            >
              <td class="p-2 text-left" v-if="service.active === true">
                {{ service.name }} <!--DH: Display service name if service is active -->
              </td>
              <td class="p-2 text-left" v-if="service.active === true">
                {{ service.description}} <!--DH: Display service description if service is active -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
