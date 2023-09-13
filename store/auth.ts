import { defineStore } from "pinia";

interface UserLoginInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),

  actions: {
    async authenticateUser({ email, password }: UserLoginInterface) {
      // useFetch from backend API
      const { data }: any = await useFetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      });
      //   this.loading = pending;
      if (data.value) {
        const token = useCookie("sb_token"); // useCookie new hook in nuxt 3
        token.value = data?.value?.accessToken; // set token to cookie
        this.authenticated = true;
      }
    },
    logUserOut() {
      const token = useCookie("sb_token");
      this.authenticated = false;
      token.value = null;
    },
  },
});
