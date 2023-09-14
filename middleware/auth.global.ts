import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("sb_token"); // get token from cookies

  // console.log('i am in', to.meta);
  if (token.value) {
    // check if value exists
    // todo verify if token is valid, before updating the state
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (
    authenticated.value &&
    token.value &&
    (to?.name === "index" ||
      to?.name === "about" ||
      to?.name === "service" ||
      to?.name === "contact" ||
      to?.name === "login" ||
      to?.name === "register")
  ) {
    console.log("auth dashboard login redirect");
    return navigateTo("/dashboard");
  }

  // if token doesn't exist redirect to log in
  if (
    !authenticated.value &&
    !token.value &&
    to?.name &&
    to?.name.match(/dashboard/g) !== null
  ) {
    abortNavigation();
    return navigateTo("/login");
  }

  // if (!token.value && to?.name !== 'login') {
  //   abortNavigation();
  //   return navigateTo('/login');
  // }
});
