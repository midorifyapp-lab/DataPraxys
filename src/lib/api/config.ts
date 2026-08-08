export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL ?? "",
  timeout: 30000,
};

export const getApiBaseUrl = () => apiConfig.baseUrl.replace(/\/$/, "");
