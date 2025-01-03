import apiService from "../services/apiService";

type SettingName =
  | "app_name"
  | "tagline"
  | "favicon"
  | "website"
  | "openai_key"
  | "stripe_key"
  | "stripe_webhook_secret";

export interface SettingData {
  id: number;
  name: SettingName;
  value: string;
  created_at?: string;
  updated_at?: string;
}

export interface SettingUpdatePayload {
  value: any;
}

interface UpdateResult {
  updated: true;
}

const settingApi = {
  list() {
    return apiService.get<SettingData[]>("/settings/list");
  },

  update(name: SettingName, payload: SettingUpdatePayload) {
    return apiService.patch<UpdateResult>(`/settings/${name}/update`, payload);
  },
};

export default settingApi;
