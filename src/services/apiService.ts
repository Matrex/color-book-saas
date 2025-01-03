import axios, { AxiosError } from "axios";
import { alertStore } from "../stores/alertStore";
import { authStore } from "../stores/authStore";
import router from "../router";

export interface PaginateData<Data> {
  current_page: number;
  last_page: number;
  data: Data;
}

type Response<Body> = Promise<Body | null>;

function isStatusCode(error: unknown, code: number) {
  return (
    error instanceof AxiosError &&
    error.response &&
    error.response.status === code
  );
}

function client() {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_APP_URL}/api`,
    headers: {
      Authorization: `Bearer ${authStore().token}`,
    },
  });
  const handleError = (error: unknown) => {
    const message =
      error instanceof AxiosError && error.response
        ? error.response.data.message
        : error instanceof Error
        ? error.message
        : "Something went wrong!";
    const unauthorisedError = isStatusCode(error, 401);
    const forbiddenError = isStatusCode(error, 403);
    if (unauthorisedError) {
      authStore().removeToken();
      if (window.location.pathname != "/sign-in") {
        router.navigate("/sign-in");
      }
      alertStore().replace("danger", message, true);
    } else if (forbiddenError) {
      const code =
        error instanceof AxiosError && error.response
          ? String(error.response.data.code)
          : "";
      if (code === "NO_PAID_PLAN") {
        router.navigate("/checkout");
        alertStore().replace("danger", message, true);
      } else {
        alertStore().replace("danger", message);
      }
    } else {
      alertStore().replace("danger", message);
    }
    return Promise.resolve(null);
  };
  instance.interceptors.request.use((config) => config, handleError);
  instance.interceptors.response.use((response) => response.data, handleError);
  return instance;
}

const apiService = {
  post<Body>(url: string, data?: any): Response<Body> {
    return client().post(url, data);
  },

  get<Body>(url: string): Response<Body> {
    return client().get(url);
  },

  form<Body>(url: string, data: any): Response<Body> {
    const formData = new FormData();
    for (const field in data) formData.append(field, data[field]);
    return client().post(url, formData);
  },

  patch<Body>(url: string, data?: any): Response<Body> {
    return client().patch(url, data);
  },

  delete<Body>(url: string): Response<Body> {
    return client().delete(url);
  },
};

export default apiService;
