import apiService from "../services/apiService";

interface CheckoutPayload {
  priceId: string;
}

interface CheckoutResult {
  url: string;
}

interface CancelSubscriptionResult {
  canceled: true;
}

const stripeApi = {
  checkout(payload: CheckoutPayload) {
    return apiService.post<CheckoutResult>("/stripe/checkout", payload);
  },

  cancelSubscription() {
    return apiService.post<CancelSubscriptionResult>(
      "/stripe/subscription/cancel"
    );
  },
};

export default stripeApi;
