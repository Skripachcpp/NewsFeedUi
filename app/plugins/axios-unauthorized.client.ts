import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const authUserStorageKey = config.public.authUserStorageKey || "auth_user";

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const route = useRoute();
        if (route.path !== "/login" && route.path !== "/register") {
          localStorage.removeItem(authUserStorageKey);
          navigateTo("/login");
        }
      }
      return Promise.reject(error);
    },
  );
});
