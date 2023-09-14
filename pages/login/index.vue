<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const { authenticateUser } = useAuthStore(); // use auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state 

const loginDataParams = ref({
    email: 'kam@jatri.co',
    password: '11112222'
})

const loginHandler = async() => {
  await authenticateUser(loginDataParams.value);
  // redirect to homepage if user is authenticated
  if (authenticated.value) { 
    router.push('/dashboard');
  } 
}
</script>

<template>
  <div> 
    <div class="h-screen bg-gray-100 flex justify-center">
      <div class="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
        <form @submit.prevent="loginHandler">    
          <div>
            <label for="email" class="block text-gray-800 font-bold"
              >Email:</label
            >
            <input
            v-model="loginDataParams.email"
              type="text"
              name="email"
              id="email"
              placeholder="@email"
              class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            /> 
          </div>

          <div class="mb-6">
            <label for="password" class="block text-gray-800 font-bold"
              >Password:</label
            >
            <input
            v-model="loginDataParams.password"
              type="password"
              name="password"
              id="password"
              placeholder="******"
              class="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            <a
              href="#"
              class="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
              >Forget Password</a
            >
          </div>
          <button
            class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            >Login</button
          >
        </form>
      </div>
    </div>
  </div>
</template>
