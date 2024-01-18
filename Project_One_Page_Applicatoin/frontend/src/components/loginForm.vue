<!-- This login page format taken from https://flowbite.com/blocks/marketing/login/ and edited -->
<!-- Create login page for app -->

<template> 
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                  </h1>
                  <form @submit.prevent="store.login(username, password)" class="space-y-4 md:space-y-6" novalidate="true">
                      <div>
                          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                          <input v-model="username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="janedoe" required="">
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                      </div>
                      <button type="submit" class="w-full bg-red-700 text-white rounded">Sign in</button>
                  </form>
              </div>
          </div>
      </div>
    </section>
    </template>
    
    <script>
    import { useLoggedInUser } from '../../store/userLogin';
    
    export default {
      data() {
        return {
          username: '',
          password: '',
          role: '',
        };
      },
      setup() {
        const store = useLoggedInUser();
        return { store };
      },
    };
    </script>
    

    