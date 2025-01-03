import apiService from "../services/apiService";

export interface AnalyticCounters {
  week: {
    users: number;
    pages: number;
    coloreds: number;
    subscriptions: number;
  };
  total: {
    users: number;
    pages: number;
    coloreds: number;
    subscriptions: number;
  };
}

export interface AnalyticCharts {
  users: {
    name: string;
    users: number;
  }[];
  pages: {
    name: string;
    pages: number;
  }[];
  coloreds: {
    name: string;
    coloreds: number;
  }[];
  subscriptions: {
    name: string;
    subscriptions: number;
  }[];
}

const analyticApi = {
  counters() {
    return apiService.get<AnalyticCounters>("/analytics/counters");
  },

  charts() {
    return apiService.get<AnalyticCharts>("/analytics/charts");
  },
};

export default analyticApi;
