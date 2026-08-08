import { settingsSeed } from "../mocks/settings.mock";
import type { Settings, UpdateSettingsInput } from "../types";
import { useApi, apiClient } from "@/lib/api/adapter";

export const settingsService = {
  get: async (): Promise<Settings> =>
    useApi ? await apiClient.get<Settings>("/settings") : settingsSeed,
  update: async (id: string, data: UpdateSettingsInput): Promise<Settings> =>
    useApi ? await apiClient.put<Settings>(`/settings/${id}`, data) : { ...settingsSeed, ...data },
};
