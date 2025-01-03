import apiService, { PaginateData } from "../services/apiService";
import urlUtil from "../utils/urlUtil";
import { ColoredData } from "./coloredApi";
import { UserData } from "./userApi";

export interface PageData {
  id: number;
  user_id: number;
  prompt: string;
  illustration: string;
  colored_count: number;
  favorited_count: number;
  trending: boolean;
  blocked: boolean;
  created_at: string;
  updated_at: string;
}

interface PaginatePayload {
  page: number;
  search: string;
  sort: string;
  scope: string;
}

export interface PaginateResult extends PageData {
  colored?: ColoredData;
  is_colored: boolean;
  is_favorited: boolean;
  is_owner: boolean;
  user: UserData;
}

interface ToggleResult {
  toggled: true;
}

interface GeneratePromptResult {
  prompt: string;
}

export interface CreatePayload {
  prompt: string;
}

export interface ReadResult extends PageData {
  colored?: ColoredData;
  is_colored: boolean;
  is_owner: boolean;
}

const pageApi = {
  paginate(payload: PaginatePayload) {
    const query = urlUtil.objectToQuery(payload);
    const url = `/pages/paginate?${query}`;
    return apiService.get<PaginateData<PaginateResult[]>>(url);
  },

  toggleFavorited(id: number) {
    return apiService.patch<ToggleResult>(`/pages/${id}/favorited/toggle`);
  },

  toggleBlocked(id: number) {
    return apiService.patch<ToggleResult>(`/pages/${id}/blocked/toggle`);
  },

  read(id: number) {
    return apiService.get<ReadResult>(`/pages/${id}/read`);
  },

  generatePrompt() {
    return apiService.get<GeneratePromptResult>(`/pages/prompt/generate`);
  },

  create(payload: CreatePayload) {
    return apiService.post<PageData>(`/pages/create`, payload);
  },
};

export default pageApi;
