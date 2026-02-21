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

function getInfoFromLocalStorage(storageKey: string): AuthUserInfo | undefined {
  const userJson = localStorage.getItem(storageKey) ?? undefined;
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

function setInfoFromLocalStorage(info: AuthUserInfo | undefined, storageKey: string) {
  if (info == null) localStorage.removeItem(storageKey);
  else localStorage.setItem(storageKey, JSON.stringify(info));
}

export const useAuth = () => {
  const config = useRuntimeConfig();
  const authApiUrl = config.public.authApiBaseUrl;
  const authUserStorageKey = config.public.authUserStorageKey || "auth_user";

  const userInfo = useState<AuthUserInfo | undefined>(authUserStorageKey, () => undefined);
  userInfo.value = getInfoFromLocalStorage(authUserStorageKey);

  const login = async (name: string, password: string): Promise<AuthUserInfo | undefined> => {
    const token = await $fetch<string>(`${authApiUrl}/auth/login`, {
      method: "POST",
      body: {
        username: name,
        password,
      },
    });

    if (token == null) return undefined;

    let info: AuthUserInfo = {
      token,
      name,
    };

    userInfo.value = info;
    setInfoFromLocalStorage(info, authUserStorageKey);
    return info;
  };

  const register = async (name: string, email: string, password: string): Promise<AuthUserInfo> => {
    const token = await $fetch<string>(`${authApiUrl}/auth/register`, {
      method: "POST",
      body: {
        name,
        email,
        password,
      },
    });

    let info: AuthUserInfo = {
      token,
      name,
    };

    setInfoFromLocalStorage(info, authUserStorageKey);
    userInfo.value = info;
    return info;
  };

  const logout = () => {
    setInfoFromLocalStorage(undefined, authUserStorageKey);
    userInfo.value = undefined;

    navigateTo("/");
  };

  const isAuthenticated = computed(() => !!userInfo.value);
  const token = computed(() => userInfo?.value?.token);
  const userName = computed(() => userInfo?.value?.name);

  return {
    token,
    userName,
    userInfo,
    isAuthenticated,
    login,
    register,
    logout,
  };
};
