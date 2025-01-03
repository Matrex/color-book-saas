import apiService, { PaginateData } from "../services/apiService";
import urlUtil from "../utils/urlUtil";
import { PageData } from "./pageApi";
import { UserData } from "./userApi";

export interface ColoredData {
  id: number;
  user_id: number;
  page_id: number;
  photo: string;
  preview: string;
  created_at: string;
  updated_at: string;
}

interface PaginatePayload {
  page: number;
  search: string;
}

export interface UpsertPayload {
  pageId: number;
  photo: string;
}

export interface PaginateResult extends ColoredData {
  user: UserData;
  page: PageData;
}

interface UpsertResult {
  photo: string;
  preview: string;
}

const coloredApi = {
  paginate(payload: PaginatePayload) {
    const query = urlUtil.objectToQuery(payload);
    const url = `/coloreds/paginate?${query}`;
    return apiService.get<PaginateData<PaginateResult[]>>(url);
  },

  upsert(payload: UpsertPayload) {
    return apiService.patch<UpsertResult>(`/coloreds/upsert`, payload);
  },
};

export default coloredApi;
