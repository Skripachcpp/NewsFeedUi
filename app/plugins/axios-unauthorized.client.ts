import axios from "axios";

const AUTH_USER_KEY = "auth_user";

export default defineNuxtPlugin(() => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        const route = useRoute();
        if (route.path !== "/login" && route.path !== "/register") {
          localStorage.removeItem(AUTH_USER_KEY);
          const userState = useState<unknown>(AUTH_USER_KEY, () => undefined);
          userState.value = undefined;
          navigateTo("/login");
        }
      }
      return Promise.reject(error);
    }
  );
});
