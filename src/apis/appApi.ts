import apiService from "../services/apiService";

export interface StatusResult {
  openaiApi: boolean;
  stripeApi: boolean;
  stripeWebhook: boolean;
  plans: boolean;
}

const appApi = {
  status() {
    return apiService.get<StatusResult>("/app/status");
  },
};

export default appApi;
