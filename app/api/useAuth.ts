export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  userId: number;
}

export type AuthUserInfo = {
  token?: string;
  userInfo?: {
    name: string;
    id: number;
  };
};

const USER_KEY = "auth_user";

function getInfoFromLocalStorage(): AuthUserInfo | undefined {
  const userJson = localStorage.getItem(USER_KEY) ?? undefined;
  let userInfo = undefined;

  if (userJson) {
    try {
      userInfo = JSON.parse(userJson) as AuthUserInfo;
    } catch (e) {
      console.error("Не удалось получить данные о пользователе", e);
    }
  }

  return userInfo;
}

function setInfoFromLocalStorage(info?: AuthUserInfo) {
  if (info == null) localStorage.removeItem(USER_KEY);
  else localStorage.setItem(USER_KEY, JSON.stringify(info));
}

export const useAuth = () => {
  const config = useRuntimeConfig();
  const authApiUrl = config.public.authApiBaseUrl;

  const userInfo = useState<AuthUserInfo | undefined>(USER_KEY, () => undefined);
  userInfo.value = getInfoFromLocalStorage();

  const login = async (username: string, password: string): Promise<AuthUserInfo | undefined> => {
    const response = await $fetch<AuthResponse>(`${authApiUrl}/api/auth/login`, {
      method: "POST",
      body: {
        username,
        password,
      },
    });

    if (response?.token == null) return undefined;

    userInfo.value = {};
    userInfo.value.token = response.token;
    userInfo.value.userInfo = {
      id: response.userId,
      name: response.username,
    };

    setInfoFromLocalStorage(userInfo.value);

    return userInfo.value;
  };

  const register = async (username: string, email: string, password: string): Promise<AuthUserInfo> => {
    const response = await $fetch<AuthResponse>(`${authApiUrl}/api/auth/register`, {
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });

    userInfo.value = {};
    userInfo.value.token = response.token;
    userInfo.value.userInfo = {
      id: response.userId,
      name: response.username,
    };

    setInfoFromLocalStorage(userInfo.value);

    return userInfo.value;
  };

  const logout = () => {
    setInfoFromLocalStorage(undefined);
    userInfo.value = undefined;

    navigateTo("/login");
  };

  const isAuthenticated = computed(() => !!userInfo.value);

  return {
    userInfo,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
