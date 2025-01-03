import apiService from "../services/apiService";

export type PlanName = "free" | "starter" | "advanced";

export interface PlanData {
  id: number;
  name: PlanName;
  title: string;
  description: string;
  price: number;
  paid: boolean;
  discount: number;
  page_creation_limit: number;
  public_page_limit: number;
  stripe_price_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlanUpdatePayload {
  name: PlanName;
  title: string;
  description: string;
  price: number;
  pageCreationLimit: number;
  publicPageLimit: number;
  stripePriceId?: string;
}

interface UpdateResult {
  updated: true;
}

const planApi = {
  list() {
    return apiService.get<PlanData[]>("/plans/list");
  },

  listPaid() {
    return apiService.get<PlanData[]>("/plans/paid/list");
  },

  read(id: number) {
    return apiService.get<PlanData>(`/plans/${id}/read`);
  },

  update(payload: PlanUpdatePayload, id: number) {
    return apiService.post<UpdateResult>(`/plans/${id}/update`, payload);
  },
};

export default planApi;
