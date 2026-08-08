import { apiClient } from "./client";

export const useApi = (import.meta.env?.VITE_USE_API ?? "false") === "true";

export { apiClient };

// Helper: services can import { useApi, apiClient } to switch implementations.
