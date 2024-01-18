<script>
import { useLoggedInUser } from '/store/userLogin.js' //DH: Import useLoggedInUser function from store.js
import axios from 'axios' // import axios
const apiURL = import.meta.env.VITE_ROOT_API //Set apiURL to the api url from .env file

export default {
  props: ['id'], //DH: import object ID
  setup() {
      const store = useLoggedInUser(); //DH: Call useLoggedInUser function to define permissions for user
      return { store }
  },
  data() {return {
      service: { //DH: Create service object default values
        name: '',
        status: true,
        description: ''
      },
    }
  },
  created() {
    axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => { //DH: Send GET request to API
      this.service = res.data // DH: Set service object to response data
    })
},
  methods: {
    async serviceUpdate() {
      if (this.store.role === 'editor') {
      axios.put(`${apiURL}/services/update/${this.$route.params.id}`, this.service).then((res) => { //DH: Send PUT request to API
      })
      .then(() => {
      alert('Service has been updated.') //DH: Alert user that service has been updated
      this.$router.push({ name: 'services' }) //DH: Route to services page
      })
    }
      else {
        alert('You do not have permission to update a service.') // DH: Alert user that they do not have permission to update a service
        this.$router.push({ name: 'services' }) // DH: Route to services page
      }
    },
},
}

</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Service
      </h1>
    </div>
    <div class="px-10 py-20">
      <form @submit.prevent="handleSubmitForm"> <!-- DH: Call handleSubmitForm on form submit -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Services To Update</h2>
        </div>
        <br>
          <!-- form field -->
          <div class="flex flex-col">
            <!-- DH: Service name field for selected service-->
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name"
              />
            </label>
          </div>
          <br>
          <!-- form field -->
          <div class="flex flex-col">
            <!-- DH: Description field for selected service-->
            <label class="block">
              <span class="text-gray-700">Service Description</span>
              <span style="color: #ff0000"></span>
              <input
                type="text"
                class="w-50 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.description"
              />
            </label>
            <br>
              <label>
              <span class="text-gray-700">Uncheck to Deactivate </span>
              <input type="checkbox" id="status" v-model="service.active">
              </label>
          </div>
          <br>

        <!-- grid container -->
        <!-- Service update and delete -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div class="flex justify-between mt-10 mr-20">
            <!--DH: Call serviceUpdate defined above on button click -->
            <button
              @click="serviceUpdate" 
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Service
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="$router.back()"
            >
              Go back
            </button>
          </div>
        </div>
      </form>
  </div>
  </main>
</template>
