<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

const router = useRouter();
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logoutHandler = () => {
  logUserOut();
  router.push("/login");
};
</script>

<template>
  <header>
    <nav>
      <div class="">
        <div class="flex justify-between h-16 px-10 shadow items-center">
          <div class="flex items-center space-x-8">
            <NuxtLink to="/">
              <h1 class="text-xl lg:text-2xl font-bold cursor-pointer">
                Nuxt + Nest Auth
              </h1>
            </NuxtLink>

            <div
              v-if="!authenticated"
              class="hidden md:flex justify-around space-x-4"
            >
              <NuxtLink class="hover:text-indigo-600 text-gray-700" to="/"
                >Home</NuxtLink
              >
              <NuxtLink class="hover:text-indigo-600 text-gray-700" to="/about"
                >About</NuxtLink
              >
              <NuxtLink
                class="hover:text-indigo-600 text-gray-700"
                to="/service"
                >Service</NuxtLink
              >
              <NuxtLink
                class="hover:text-indigo-600 text-gray-700"
                to="/contact"
                >Contact</NuxtLink
              >
            </div>
            
            <div v-else class="hidden md:flex justify-around space-x-4">
              <NuxtLink
                class="hover:text-indigo-600 text-gray-700"
                to="/dashboard"
                >Dashboard</NuxtLink
              >
              <NuxtLink
                class="hover:text-indigo-600 text-gray-700"
                to="/dashboard/profile"
                >Profile</NuxtLink
              >
            </div>
          </div>
          <div class="flex space-x-4 items-center">
            <NuxtLink
              v-if="!authenticated"
              class="text-gray-800 text-sm"
              to="/login"
              >LOGIN</NuxtLink
            >
            <NuxtLink
              v-if="!authenticated"
              class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
              to="/register"
              >SIGNUP</NuxtLink
            >
            <button
              v-if="authenticated"
              @click="logoutHandler"
              class="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
