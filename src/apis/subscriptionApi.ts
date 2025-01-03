import apiService, { PaginateData } from "../services/apiService";
import urlUtil from "../utils/urlUtil";
import { PlanData } from "./planApi";
import { UserData } from "./userApi";

export interface SubscriptionData {
  id: number;
  user_id: number;
  plan_id: number;
  stripe_id: string;
  price: number;
  expire_at: string;
  canceled_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginateResult extends SubscriptionData {
  user: UserData;
  plan: PlanData;
}

interface PaginatePayload {
  page: number;
  search: string;
}

const subscriptionApi = {
  paginate(payload: PaginatePayload) {
    const query = urlUtil.objectToQuery(payload);
    const url = `/subscriptions/paginate?${query}`;
    return apiService.get<PaginateData<PaginateResult[]>>(url);
  },
};

export default subscriptionApi;
