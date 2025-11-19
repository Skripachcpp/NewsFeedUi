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
  name: string;
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

  const login = async (name: string, password: string): Promise<AuthUserInfo | undefined> => {
    const token = await $fetch<string>(`${authApiUrl}/Auth/login`, {
      method: "POST",
      body: {
        username: name,
        password,
      },
    });

    if (token == null) return undefined;

    let info: AuthUserInfo = {
      token,
      name
    }

    userInfo.value = info;
    setInfoFromLocalStorage(info);
    return info;
  };

  const register = async (name: string, email: string, password: string): Promise<AuthUserInfo> => {
    const token = await $fetch<string>(`${authApiUrl}/Auth/register`, {
      method: "POST",
      body: {
        name,
        email,
        password,
      },
    });

    let info: AuthUserInfo = {
      token,
      name
    }
    
    setInfoFromLocalStorage(info);
    userInfo.value = info
    return info;
  };

  const logout = () => {
    setInfoFromLocalStorage(undefined);
    userInfo.value = undefined;

    navigateTo("/login");
  };

  const isAuthenticated = computed(() => !!userInfo.value);
  const token = computed(() => userInfo?.value?.token);

  return {
    token,
    userInfo,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
