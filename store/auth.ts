import { defineStore } from "pinia";

interface UserLoginInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    user: typeof window !== 'undefined' ? localStorage.getItem('user') : null,
  }),

  actions: {
    async authenticateUser({ email, password }: UserLoginInterface) {
      // useFetch from backend API
      const { data }: any = await useFetch("http://localhost:3009/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email,
          password,
        },
      }).catch((err) => {
        console.log(err);
      });

      if (!data.value) {
        throw createError({
          statusCode: 404,
          statusMessage: "Unauthenticated",
        });
      }

      //   this.loading = pending;
      if (data.value) {
        const token = useCookie("sb_token"); // useCookie new hook in nuxt 3
        token.value = data?.value?.accessToken; // set token to cookie
        if (process.client) {
          localStorage.setItem('user', JSON.stringify(data?.value?.email));
          localStorage.setItem('sb_token', JSON.stringify(data?.value?.accessToken));
        }
        this.authenticated = true;
      }
    },
    logUserOut() {
      const token = useCookie("sb_token");
      if (process.client) {
        localStorage.removeItem('user');
        localStorage.removeItem('sb_token');
      }
      this.authenticated = false;
      token.value = null;
    },
  },
});
