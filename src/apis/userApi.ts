import apiService, { PaginateData } from "../services/apiService";
import urlUtil from "../utils/urlUtil";
import { PlanData } from "./planApi";
import { SubscriptionData } from "./subscriptionApi";

export interface UserData {
  id: number;
  name: string;
  email: string;
  blocked: boolean;
  admin: boolean;
  photo?: string;
  stripe_id?: string;
  plan?: PlanData;
  subscription?: SubscriptionData;
  created_at: string;
  updated_at: string;
}

export interface UserCreatePayload {
  name: string;
  email: string;
  photo?: string;
}

export interface UserCreateAdminPayload {
  name: string;
  email: string;
}

export interface UserSignUpPayload {
  name: string;
  email: string;
}

export interface UserSignInPayload {
  email: string;
}

export interface UserVerifyPayload {
  token: string;
  otp: string;
}

export interface UserUpdatePayload {
  name: string;
  photo: string;
  email: string;
}

export interface UserUpdateByIdPayload {
  name: string;
  photo: string;
  email: string;
}

interface CreateResult {
  created: true;
}

interface CreateAdminResult {
  token: string;
}

interface SignUpResult {
  token: string;
}

interface SignInResult {
  token: string;
}

interface VerifyResult {
  authToken: string;
  admin: boolean;
}

interface UpdateResult {
  updated: true;
}

interface UpdateByIdResult {
  updated: true;
}

interface PaginatePayload {
  page: number;
  search: string;
}

interface ToggleResult {
  toggled: true;
}

export interface PaginateResult extends UserData {
  plan: PlanData;
}

export interface ReadResult extends UserData {
  plan: PlanData;
}

const userApi = {
  create(payload: UserCreatePayload) {
    return apiService.post<CreateResult>("/users/create", payload);
  },

  createAdmin(payload: UserCreateAdminPayload) {
    return apiService.post<CreateAdminResult>("/users/admin/create", payload);
  },

  signUp(payload: UserSignUpPayload) {
    return apiService.post<SignUpResult>("/users/sign-up", payload);
  },

  signIn(payload: UserSignInPayload) {
    return apiService.post<SignInResult>("/users/sign-in", payload);
  },

  verify(payload: UserVerifyPayload) {
    return apiService.post<VerifyResult>("/users/verify", payload);
  },

  read() {
    return apiService.get<ReadResult>("/users/read");
  },

  readById(id: number) {
    return apiService.get<ReadResult>(`/users/${id}/read`);
  },

  update(payload: UserUpdatePayload) {
    return apiService.patch<UpdateResult>("/users/update", payload);
  },

  updateById(id: number, payload: UserUpdateByIdPayload) {
    return apiService.patch<UpdateByIdResult>(`/users/${id}/update`, payload);
  },

  paginate(payload: PaginatePayload) {
    const query = urlUtil.objectToQuery(payload);
    const url = `/users/paginate?${query}`;
    return apiService.get<PaginateData<PaginateResult[]>>(url);
  },

  toggleBlocked(id: number) {
    return apiService.patch<ToggleResult>(`/users/${id}/blocked/toggle`);
  },
};

export default userApi;
