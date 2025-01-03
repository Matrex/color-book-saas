import apiService from "../services/apiService";
import { UserData } from "./userApi";

export interface CreditData {
  id: number;
  user_id: number;
  page_creation: number;
  public_page: number;
  user: UserData;
  created_at: string;
  updated_at: string;
}

const creditApi = {
  read() {
    return apiService.get<CreditData>(`/credits/read`);
  },
};

export default creditApi;
